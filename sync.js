/* Đồng bộ tiến độ học giữa các thiết bị bằng Firebase (Auth email + Firestore, gói miễn phí).
   Không gọi AI. Nếu chưa dán cấu hình vào data/firebase-config.js thì mô-đun này tự tắt và app vẫn chạy bình thường. */
(function () {
  "use strict";
  var CFG = window.FIREBASE_CONFIG;
  var BASE = "https://www.gstatic.com/firebasejs/10.12.2/";
  var st = { enabled: !!(CFG && CFG.apiKey && CFG.projectId), ready: false, user: null, busy: false, last: null, err: "" };
  var ctx = null, fbp = null, timer = null, listeners = [];

  /* ---------- Gộp dữ liệu hai thiết bị (hàm thuần, có thể kiểm thử) ---------- */
  function num(a, b) { return Math.max(+a || 0, +b || 0); }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  function mapMax(a, b) {
    a = a || {}; b = b || {}; var o = {};
    Object.keys(a).concat(Object.keys(b)).forEach(function (k) { o[k] = num(a[k], b[k]); });
    return o;
  }
  function merge(L, R) {
    L = L || {}; R = R || {};
    var lr = L.resetAt || "", rr = R.resetAt || "";
    if (lr !== rr) return clone(lr > rr ? L : R); // một bên đã bị xóa sau bên kia: bên cũ hơn bị bỏ
    var newer = (L.updatedAt || 0) >= (R.updatedAt || 0) ? L : R, older = newer === L ? R : L;
    var out = clone(newer); // cài đặt đơn lẻ (mục tiêu, giao diện, giọng đọc...) lấy từ bên mới hơn
    out.updatedAt = num(L.updatedAt, R.updatedAt);
    out.xp = num(L.xp, R.xp);
    // số câu mỗi ngày: lấy giá trị lớn hơn của từng chỉ số
    out.days = {};
    Object.keys(L.days || {}).concat(Object.keys(R.days || {})).forEach(function (k) {
      if (out.days[k]) return;
      var a = (L.days || {})[k] || {}, b = (R.days || {})[k] || {};
      out.days[k] = { done: num(a.done, b.done), correct: num(a.correct, b.correct), wrong: num(a.wrong, b.wrong), cards: num(a.cards, b.cards) };
    });
    // lịch ôn: mục nào được làm nhiều lần hơn thì là bản mới hơn
    out.srs = {};
    Object.keys(L.srs || {}).concat(Object.keys(R.srs || {})).forEach(function (k) {
      if (out.srs[k]) return;
      var a = (L.srs || {})[k], b = (R.srs || {})[k];
      out.srs[k] = !a ? b : !b ? a : ((b.seen || 0) > (a.seen || 0) ? b : (a.seen || 0) > (b.seen || 0) ? a : (newer === L ? a : b));
    });
    out.errors = mapMax(L.errors, R.errors);
    out.topics = {};
    Object.keys(L.topics || {}).concat(Object.keys(R.topics || {})).forEach(function (k) {
      if (out.topics[k]) return;
      var a = (L.topics || {})[k], b = (R.topics || {})[k];
      if (!a || !b) { out.topics[k] = clone(a || b); return; }
      var pick = (b.attempts || 0) > (a.attempts || 0) ? b : (a.attempts || 0) > (b.attempts || 0) ? a : (newer === L ? a : b);
      out.topics[k] = { last: pick.last, best: num(a.best, b.best), attempts: num(a.attempts, b.attempts) };
    });
    var seen = {}; out.reports = [];
    (L.reports || []).concat(R.reports || []).forEach(function (r) { var key = r.id + "|" + r.at; if (!seen[key]) { seen[key] = 1; out.reports.push(r); } });
    out.badges = {};
    Object.keys(L.badges || {}).concat(Object.keys(R.badges || {})).forEach(function (k) {
      var a = (L.badges || {})[k], b = (R.badges || {})[k]; out.badges[k] = !a ? b : !b ? a : (a < b ? a : b);
    });
    out.lvl = {};
    Object.keys(L.lvl || {}).concat(Object.keys(R.lvl || {})).forEach(function (k) { if (!out.lvl[k]) out.lvl[k] = mapMax((L.lvl || {})[k], (R.lvl || {})[k]); });
    out.deck = Object.assign({}, older.deck || {}, newer.deck || {});
    var nl = L.notes || "", nr = R.notes || "";
    out.notes = nl === nr ? nl : !nl ? nr : !nr ? nl : nl.indexOf(nr) >= 0 ? nl : nr.indexOf(nl) >= 0 ? nr : (newer === L ? nr + "\n---\n" + nl : nl + "\n---\n" + nr);
    out.selfwrite = {};
    Object.keys(L.selfwrite || {}).concat(Object.keys(R.selfwrite || {})).forEach(function (k) {
      if (out.selfwrite[k]) return;
      var a = (L.selfwrite || {})[k] || [], b = (R.selfwrite || {})[k] || [], n = Math.max(a.length, b.length), arr = [];
      for (var i = 0; i < n; i++) { var x = newer === L ? a[i] : b[i], y = newer === L ? b[i] : a[i]; arr[i] = x || y || ""; }
      out.selfwrite[k] = arr;
    });
    var pa = L.placement, pb = R.placement;
    if (pa || pb) out.placement = !pa ? pb : !pb ? pa : (((pa.at || "") + (pa.time || "")) >= ((pb.at || "") + (pb.time || "")) ? pa : pb);
    return out;
  }

  /* ---------- Trạng thái và Firebase ---------- */
  function emit() { listeners.forEach(function (f) { try { f(); } catch (e) { /* bỏ qua */ } }); }
  var MSG = {
    "auth/invalid-email": "Email không hợp lệ.",
    "auth/missing-password": "Hãy nhập mật khẩu.",
    "auth/user-not-found": "Sai email hoặc mật khẩu.", "auth/wrong-password": "Sai email hoặc mật khẩu.", "auth/invalid-credential": "Sai email hoặc mật khẩu.",
    "auth/email-already-in-use": "Email này đã có tài khoản. Hãy bấm Đăng nhập.",
    "auth/weak-password": "Mật khẩu cần ít nhất 6 ký tự.",
    "auth/network-request-failed": "Không có mạng. Hãy thử lại khi có kết nối.",
    "auth/too-many-requests": "Thử quá nhiều lần. Hãy chờ một lúc rồi thử lại.",
    "auth/operation-not-allowed": "Chưa bật đăng nhập bằng Email/Mật khẩu trong Firebase.",
    "auth/api-key-not-valid.-please-pass-a-valid-api-key.": "Cấu hình Firebase chưa đúng (apiKey).",
    "auth/invalid-api-key": "Cấu hình Firebase chưa đúng (apiKey).",
    "permission-denied": "Firestore từ chối quyền truy cập. Hãy kiểm tra lại phần Rules.",
    "unavailable": "Không kết nối được máy chủ. Sẽ thử lại sau."
  };
  function fail(e) { var c = (e && e.code) || ""; st.err = MSG[c] || ("Lỗi: " + (c || (e && e.message) || "không rõ")); st.busy = false; emit(); return Promise.reject(e); }
  function load() {
    if (!fbp) {
      fbp = Promise.all([import(BASE + "firebase-app.js"), import(BASE + "firebase-auth.js"), import(BASE + "firebase-firestore.js")]).then(function (m) {
        var app = m[0].initializeApp(CFG);
        return { A: m[1], F: m[2], auth: m[1].getAuth(app), db: m[2].getFirestore(app) };
      });
    }
    return fbp;
  }
  function syncNow() {
    if (!st.enabled || !st.user || !ctx) return Promise.resolve();
    if (st.busy) return Promise.resolve();
    st.busy = true; st.err = ""; emit();
    return load().then(function (f) {
      var ref = f.F.doc(f.db, "users", st.user.uid);
      return f.F.getDoc(ref).then(function (snap) {
        var local = ctx.get(), remoteStr = snap.exists() ? snap.data().data : null, remote = remoteStr ? JSON.parse(remoteStr) : null;
        var merged = remote ? merge(local, remote) : local, ms = JSON.stringify(merged);
        if (ms !== JSON.stringify(local)) ctx.set(merged);
        if (ms === remoteStr) return null;
        return f.F.setDoc(ref, { data: ms, updatedAt: Date.now(), v: 1 });
      });
    }).then(function () { st.busy = false; st.last = new Date(); emit(); }, fail).catch(function () { /* đã ghi lỗi vào trạng thái */ });
  }
  function touch() { // gọi sau mỗi lần lưu tiến độ: gom lại rồi đẩy lên sau vài giây
    if (!st.enabled || !st.user) return;
    clearTimeout(timer); timer = setTimeout(syncNow, 4000);
  }
  function init(c) {
    ctx = c;
    if (!st.enabled) return;
    load().then(function (f) {
      f.A.onAuthStateChanged(f.auth, function (u) {
        st.ready = true; st.user = u ? { uid: u.uid, email: u.email } : null; emit();
        if (u) syncNow();
      });
    }).catch(function (e) { st.ready = true; st.err = "Không tải được thư viện Firebase (cần mạng lần đầu)."; emit(); });
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") syncNow(); else if (st.user) { clearTimeout(timer); syncNow(); } });
    window.addEventListener("online", syncNow);
  }
  function authCall(fn) { st.err = ""; st.busy = true; emit(); return load().then(function (f) { return fn(f); }).then(function () { st.busy = false; emit(); }, fail).catch(function () { /* đã ghi lỗi */ }); }
  window.NRSync = {
    merge: merge, init: init, touch: touch, syncNow: syncNow, state: function () { return st; }, onChange: function (f) { listeners.push(f); },
    signIn: function (e, p) { return authCall(function (f) { return f.A.signInWithEmailAndPassword(f.auth, e, p); }); },
    signUp: function (e, p) { return authCall(function (f) { return f.A.createUserWithEmailAndPassword(f.auth, e, p); }); },
    signOut: function () { return authCall(function (f) { return f.A.signOut(f.auth); }); },
    resetPassword: function (e) { return authCall(function (f) { return f.A.sendPasswordResetEmail(f.auth, e).then(function () { st.err = "Đã gửi email đặt lại mật khẩu (xem cả thư rác)."; }); }); }
  };
})();
