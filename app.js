/* Ngài Richard - Công dân toàn cầu: web học tiếng Anh (bản đầu).
   Không gọi AI lúc học; toàn bộ tiến độ lưu trong localStorage của trình duyệt. */
(function () {
  "use strict";

  /* ---------- Tiện ích ---------- */
  var APP_VERSION = "v27"; // đổi cùng CACHE trong sw.js và ?v= trong index.html mỗi lần phát hành
  var KEY = "nrcdtc.v1";
  var INTERVALS = [0, 1, 3, 7, 14, 30]; // số ngày chờ theo "hộp" (spaced repetition)
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var dkey = function (d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
  var today = function () { return dkey(new Date()); };
  var parseKey = function (k) { var p = k.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); };
  var addDays = function (k, n) { var d = parseKey(k); d.setDate(d.getDate() + n); return dkey(d); };
  var shuffle = function (a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  var norm = function (s) { return String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim(); };
  // Ngày ghi nhận dạng yyyy-mm-dd (lưu trữ) -> dd-mm-yyyy, kèm giờ nếu có.
  var fmtDT = function (at, time) {
    var p = String(at || "").split("-"), d = p.length === 3 ? p[2] + "-" + p[1] + "-" + p[0] : String(at || "");
    return d + (time ? " lúc " + time : "");
  };
  var nowHM = function () { var n = new Date(); return pad(n.getHours()) + ":" + pad(n.getMinutes()); };
  var WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  /* ---------- Dữ liệu nội dung ---------- */
  var GR = window.GRAMMAR || [];
  var VO = window.VOCAB || [];
  var TL = window.TAG_LABELS || {};
  var GP = window.GRAMMAR_PLUS || {};
  var SEE = window.GRAMMAR_SEE || {}; // bài nên xem thêm của các chủ điểm cũ
  var VC = window.VOCAB_CEFR || {}; // bậc CEFR ước lượng của từng chủ đề từ vựng
  var RANK = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
  var CEFR_NAME = { A1: "Nền tảng câu tiếng Anh", A2: "Mở rộng thì và cấu trúc", B1: "Câu phức cơ bản" };
  var LV = { e: "Dễ", m: "Vừa", h: "Khó" };
  // Gắn bậc CEFR, mức khó, lỗi thường gặp, câu hỏi mới vào từng chủ đề, rồi xếp lộ trình theo bậc.
  GR.forEach(function (t) {
    t.see = t.see || SEE[t.id];
    var p = GP[t.id]; if (!p) { t.cefr = t.cefr || "A1"; t.questions.forEach(function (q) { q.lv = q.lv || "m"; }); return; }
    t.cefr = p.cefr; t.formula = p.formula; t.walk = p.walk; t.mistakes = p.mistakes; t.check = p.check;
    t.questions.forEach(function (q, i) { q.lv = p.lv.charAt(i) || "m"; });
    p.more.forEach(function (q) { t.questions.push(q); });
  });
  GR.map(function (t, i) { return [t, i]; }).sort(function (a, b) { return (RANK[a[0].cefr] - RANK[b[0].cefr]) || (a[1] - b[1]); })
    .forEach(function (x, i) { GR[i] = x[0]; });
  var Q = {}; // id đầy đủ -> câu hỏi
  GR.forEach(function (t) {
    t.questions.forEach(function (q) { Q["g:" + t.id + ":" + q.id] = Object.assign({ gid: t.id }, q); });
  });
  var GE = window.GRAMMAR_EXPLAIN || {};
  var W = {}; // id đầy đủ -> từ
  VO.forEach(function (t) {
    t.sets.forEach(function (s) {
      s.words.forEach(function (w) { W["v:" + t.id + ":" + w.w] = Object.assign({ tid: t.id, sid: s.id, cefr: (window.WORD_CEFR || {})[t.id + ":" + w.w] || "" }, w); });
    });
  });

  var PHR = window.PHRASES || [];
  var PH = {}; // id -> mẫu câu giao tiếp
  PHR.forEach(function (t) {
    TL["mau-cau-" + t.id] = "Mẫu câu: " + t.title;
    t.items.forEach(function (r, i) { PH["p:" + t.id + ":" + i] = { tid: t.id, en: r[0], vi: r[1] }; });
  });

  /* ---------- Trạng thái lưu trữ ---------- */
  function defaults() {
    return { version: 1, goal: 10, theme: null, voice: null, xp: 0, days: {}, srs: {}, errors: {}, topics: {}, reports: [], badges: {}, lvl: {}, deck: {}, notes: "", selfwrite: {}, resetAt: "", updatedAt: 0 };
  }
  function load() {
    try { var r = JSON.parse(localStorage.getItem(KEY)); return Object.assign(defaults(), r || {}); }
    catch (e) { return defaults(); }
  }
  var S = load();
  function save() {
    S.updatedAt = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* bỏ qua */ }
    if (window.NRSync) NRSync.touch(); // đồng bộ lên đám mây (nếu đã đăng nhập)
  }
  function day(k) { return S.days[k] || (S.days[k] = { done: 0, correct: 0, wrong: 0, cards: 0 }); }
  function dayOf(k) { return S.days[k] || { done: 0, correct: 0, wrong: 0, cards: 0 }; }

  /* ---------- Ghi nhận học tập ---------- */
  function bump(id, ok) {
    var e = S.srs[id] || { box: 0, due: today(), seen: 0, ok: 0 };
    e.seen++;
    if (ok) { e.ok++; e.box = Math.min(5, e.box + 1); } else { e.box = 0; }
    e.due = addDays(today(), INTERVALS[e.box]);
    S.srs[id] = e;
  }
  function recordAnswer(id, ok, tag) {
    var d = day(today()); d.done++;
    if (ok) { d.correct++; S.xp += 10; } else { d.wrong++; if (tag) S.errors[tag] = (S.errors[tag] || 0) + 1; }
    bump(id, ok); checkBadges(); save();
  }
  function recordCard(id, ok) {
    var d = day(today()); d.done++; d.cards++; S.xp += 5;
    bump(id, ok); checkBadges(); save();
  }
  function dueIds() {
    var t = today();
    return Object.keys(S.srs).filter(function (id) { return S.srs[id].due <= t && (Q[id] || W[id] || PH[id] || S.deck[id]); });
  }
  /* ---------- Bộ thẻ riêng (+ Ôn tập) ---------- */
  function addDeck(f, b) {
    f = String(f || "").trim(); b = String(b || "").trim();
    if (!f || !b) return false;
    var id = "d:" + norm(f);
    if (S.deck[id]) return false;
    S.deck[id] = { f: f, b: b }; S.srs[id] = { box: 0, due: today(), seen: 0, ok: 0 }; save();
    return true;
  }
  function forceReview(id) { S.srs[id] = { box: 0, due: today(), seen: (S.srs[id] || {}).seen || 0, ok: (S.srs[id] || {}).ok || 0 }; save(); }
  function lvBest(t, l) { var r = S.lvl["g:" + t.id]; return r && r[l] ? r[l] : 0; }
  function stars(t) { return ["e", "m", "h"].filter(function (l) { return lvBest(t, l) >= 80; }).length; }
  function starHtml(n) { return '<span class="stars" aria-label="' + n + ' trên 3 sao">' + "★".repeat(n) + "☆".repeat(3 - n) + "</span>"; }
  function gDone(t) { var r = S.topics["g:" + t.id]; return (r && r.last >= 80) || stars(t) >= 2; }
  function totals() {
    var c = 0, w = 0, n = 0;
    Object.keys(S.days).forEach(function (k) { c += S.days[k].correct; w += S.days[k].wrong; n += S.days[k].done; });
    return { c: c, w: w, n: n };
  }
  function streak() {
    var k = today();
    if (dayOf(k).done < S.goal) k = addDays(k, -1);
    var n = 0;
    while (dayOf(k).done >= S.goal) { n++; k = addDays(k, -1); }
    return n;
  }

  function bestStreak() { // chuỗi ngày đủ mục tiêu dài nhất từ trước đến nay
    var ks = Object.keys(S.days).filter(function (x) { return S.days[x].done >= S.goal; }).sort(), best = 0, run = 0, prev = null;
    ks.forEach(function (x) { run = prev && addDays(prev, 1) === x ? run + 1 : 1; if (run > best) best = run; prev = x; });
    return Math.max(best, streak());
  }

  /* ---------- Huy hiệu ---------- */
  var BADGES = [
    { id: "first", name: "Bước đầu tiên", desc: "Làm câu đầu tiên", test: function () { return totals().n >= 1; } },
    { id: "goal", name: "Đủ mục tiêu", desc: "Đạt mục tiêu 1 ngày", test: function () { return Object.keys(S.days).some(function (k) { return S.days[k].done >= S.goal; }); } },
    { id: "streak3", name: "3 ngày liền", desc: "Streak 3 ngày", test: function () { return streak() >= 3; } },
    { id: "streak7", name: "7 ngày liền", desc: "Streak 7 ngày", test: function () { return streak() >= 7; } },
    { id: "streak30", name: "30 ngày liền", desc: "Streak 30 ngày", test: function () { return streak() >= 30; } },
    { id: "xp100", name: "100 XP", desc: "Tích lũy 100 XP", test: function () { return S.xp >= 100; } },
    { id: "topic", name: "Chủ đề vững", desc: "Đạt từ 80% ở một bài", test: function () { return Object.keys(S.topics).some(function (k) { return S.topics[k].last >= 80; }); } }
  ];
  function checkBadges() {
    BADGES.forEach(function (b) {
      if (!S.badges[b.id] && b.test()) { S.badges[b.id] = today(); toast("Huy hiệu mới: " + b.name); }
    });
  }

  /* ---------- Giao diện chung ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  function currentTheme() {
    if (S.theme) return S.theme;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme() {
    var t = currentTheme();
    document.documentElement.setAttribute("data-theme", t);
    $("#themeBtn").innerHTML = t === "dark" ? SUN : MOON;
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", t === "dark" ? "#0b0f16" : "#dce9fb");
  }
  function setTheme(t) { S.theme = t; save(); applyTheme(); }
  $("#themeBtn").addEventListener("click", function () { setTheme(currentTheme() === "dark" ? "light" : "dark"); route(); });

  function renderNav(active) {
    var due = dueIds().length;
    var items = [["", "Tổng quan"], ["grammar", "Ngữ pháp"], ["vocab", "Từ vựng"], ["phrases", "Mẫu câu"], ["review", "Ôn tập"], ["settings", "Cài đặt"]];
    $("#nav").innerHTML = items.map(function (it) {
      var badge = it[0] === "review" && due ? '<span class="badge">' + due + "</span>" : "";
      return '<a href="#/' + it[0] + '" class="' + (active === it[0] ? "active" : "") + '">' + it[1] + badge + "</a>";
    }).join("");
  }
  /* Giọng đọc: chọn rõ một giọng tiếng Anh-Mỹ có sẵn trên thiết bị, ưu tiên giọng chất lượng cao. */
  var NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|junior|organ|princess|ralph|trinoids|whisper|zarvox|fred|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|superstar|jester|kathy|wobble|bubbles|bad news|good news/i;
  var PREFER = /premium|enhanced|natural|neural|google us english|samantha|ava|allison|nicky|zoe|evan|alex|aaron|joelle|noelle|susan/i;
  function englishVoices() {
    if (!("speechSynthesis" in window)) return [];
    return speechSynthesis.getVoices().filter(function (v) { return /^en($|[-_])/i.test(v.lang) && !NOVELTY.test(v.name); });
  }
  function scoreVoice(v) {
    var sc = 0;
    if (/^en[-_]US$/i.test(v.lang)) sc += 50; else if (/^en($|[-_])/i.test(v.lang)) sc += 10;
    if (/premium|enhanced|natural|neural/i.test(v.name)) sc += 40;
    if (PREFER.test(v.name)) sc += 20;
    if (!v.localService) sc += 0; // giọng mạng của trình duyệt (vd Google) cũng được chấp nhận
    return sc;
  }
  function pickVoice() {
    var vs = englishVoices();
    if (S.voice) {
      var m = speechSynthesis.getVoices().filter(function (v) { return v.name === S.voice; })[0];
      if (m) return m;
    }
    vs.sort(function (a, b) { return scoreVoice(b) - scoreVoice(a); });
    return vs[0] || null;
  }
  function speak(text) {
    if (!("speechSynthesis" in window)) { toast("Trình duyệt này chưa hỗ trợ giọng đọc."); return; }
    var go = function () {
      var v = pickVoice();
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text); u.rate = .85;
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; } // không có giọng riêng thì để máy tự chọn theo en-US
      speechSynthesis.speak(u);
    };
    if (speechSynthesis.getVoices().length) go();
    else {
      var done = false, fire = function () { if (done) return; done = true; speechSynthesis.onvoiceschanged = null; go(); };
      speechSynthesis.onvoiceschanged = fire; setTimeout(fire, 500); speechSynthesis.getVoices(); // chờ tối đa 0,5 giây rồi vẫn đọc
    }
  }
  function pill(st) { return '<span class="pill ' + st[1] + '">' + st[0] + "</span>"; }

  /* ---------- Trạng thái chủ đề ---------- */
  function gStatus(t) {
    var r = S.topics["g:" + t.id];
    if (!r && !stars(t) && !S.lvl["g:" + t.id]) return ["Chưa học", "none"];
    return gDone(t) ? ["Vững", "good"] : ["Đang yếu", "warn"];
  }
  function vStatus(t) {
    var ws = []; t.sets.forEach(function (s) { ws = ws.concat(s.words); });
    var seen = ws.filter(function (w) { return S.srs["v:" + t.id + ":" + w.w]; });
    if (!seen.length) return ["Chưa học", "none"];
    var m = ws.filter(function (w) { return (S.srs["v:" + t.id + ":" + w.w] || { box: 0 }).box >= 3; }).length;
    return m / ws.length >= .8 ? ["Vững", "good"] : ["Đang yếu", "warn"];
  }

  /* ---------- Gợi ý bài tiếp theo, kiểm tra đầu vào, luyện lỗi ---------- */
  function nextGrammar() {
    for (var i = 0; i < GR.length; i++) {
      var t = GR[i], r = S.topics["g:" + t.id] || S.lvl["g:" + t.id], known = S.placement && S.placement.skip !== false && S.placement.byTopic[t.id] === 1;
      if (gDone(t)) continue;
      if (!r && known) continue;
      return t;
    }
    return null;
  }
  function gHint(t) {
    var p = S.placement; if (!p) return "";
    var out = p.byTopic[t.id] === 1 ? ' <span class="pill good">Đúng cả 2 câu đầu vào</span>' : "";
    var nx = nextGrammar();
    return out + (nx && nx.id === t.id ? ' <span class="pill warn">Bài tiếp theo</span>' : "");
  }
  function weakTags() {
    return Object.keys(S.errors).filter(function (t) { return !/^(tu-vung|mau-cau)-/.test(t) && S.errors[t] > 0; })
      .sort(function (a, b) { return S.errors[b] - S.errors[a]; }).slice(0, 3);
  }
  function weakCard() {
    var tg = weakTags(); if (!tg.length) return "";
    return '<div class="card" style="max-width:640px;margin:16px auto"><p class="eyebrow">Luyện lỗi hay sai</p><p class="muted">' +
      tg.map(function (t) { return esc(TL[t] || t); }).join(" · ") + '</p><div class="actions"><a class="btn" href="#/review/weak">Luyện ngay</a></div></div>';
  }
  function viewWeak() {
    var tg = weakTags();
    var ids = Object.keys(Q).filter(function (id) { return tg.indexOf(Q[id].tag) >= 0; });
    if (!tg.length || !ids.length) {
      return '<div class="card empty" style="max-width:560px;margin:20px auto"><h1>Chưa có lỗi nào để luyện</h1><p class="muted" style="margin-top:8px">Làm vài bài ngữ pháp trước, app sẽ ghi lại những chỗ Ngài hay sai.</p><div class="actions" style="justify-content:center"><a class="btn" href="#/grammar">Ngữ pháp</a></div></div>';
    }
    var cfg = {
      title: "Luyện lỗi hay sai", exit: "#/review", nav: "review",
      build: function () { return shuffle(ids).slice(0, 12).map(function (id) { return mkQuestion(id); }); }
    };
    cfg.cfg = cfg; startSession(cfg); return null;
  }
  /* ---------- Kiểm tra đầu vào: xếp bậc CEFR thích ứng, 3 giai đoạn ---------- */
  var PL_LEVELS = ["A1", "A2", "B1"];
  var dispLv = function (l) { return l || "dưới A1"; };
  function plPool(level, lv, banned) { // câu chưa dùng ở lần làm trước được ưu tiên
    var out = [];
    GR.forEach(function (t) {
      if (t.cefr !== level) return;
      t.questions.forEach(function (q) { if (!lv || q.lv === lv) out.push({ t: t.id, id: "g:" + t.id + ":" + q.id }); });
    });
    out = shuffle(out);
    return out.filter(function (x) { return !banned[x.id]; }).concat(out.filter(function (x) { return banned[x.id]; }));
  }
  function plPick(pool, n, taken) { // chọn n câu, ưu tiên mỗi chủ đề một câu
    var res = [], usedT = {};
    [0, 1].forEach(function (pass) {
      pool.forEach(function (x) {
        if (res.length >= n || taken[x.id]) return;
        if (pass === 0 && usedT[x.t]) return;
        res.push(x); usedT[x.t] = 1; taken[x.id] = 1;
      });
    });
    return res;
  }
  function viewPlacement() {
    var st = null, banned = {}, bannedW = {};
    (S.placeUsed || []).forEach(function (id) { banned[id] = 1; });
    (S.placeWords || []).forEach(function (id) { bannedW[id] = 1; });
    var base = function () { return SESS && SESS.items ? SESS.items.length : 0; };
    function batch1(L) {
      var items = [];
      ["e", "m", "h"].forEach(function (lv) {
        plPick(plPool(L, lv, banned), 2, st.taken).forEach(function (x) { var it = mkQuestion(x.id); it.topic = x.t; it.grp = "L:" + L; items.push(it); });
      });
      st.stage = 1; st.label = "Giai đoạn 1/3 · Dò bậc ngữ pháp, bậc " + L; st.bs = base(); st.bl = items.length;
      return items;
    }
    function scan(s) {
      var hi = st.passed.length ? st.passed[st.passed.length - 1] : null, focus = [];
      if (st.stop) { focus.push(st.stop); if (hi) focus.push(hi); }
      else if (hi) { focus.push(hi); if (PL_LEVELS.indexOf(hi) > 0) focus.push(PL_LEVELS[PL_LEVELS.indexOf(hi) - 1]); }
      else focus.push("A1");
      var asked = {}; s.items.forEach(function (it) { asked[it.id] = 1; });
      var items = [];
      focus.forEach(function (L) {
        GR.forEach(function (t) {
          if (t.cefr !== L || items.length >= 16) return;
          var need = 2 - ((s.byTopic[t.id] || { n: 0 }).n);
          if (need <= 0) return;
          var qs = shuffle(t.questions.filter(function (q) { return !asked["g:" + t.id + ":" + q.id]; }));
          var mid = qs.filter(function (q) { return q.lv === "m"; }), rest = qs.filter(function (q) { return q.lv !== "m"; });
          var fresh = function (a) { return a.filter(function (q) { return !banned["g:" + t.id + ":" + q.id]; }).concat(a.filter(function (q) { return banned["g:" + t.id + ":" + q.id]; })); };
          fresh(mid).concat(fresh(rest)).slice(0, Math.min(need, 16 - items.length)).forEach(function (q) {
            var it = mkQuestion("g:" + t.id + ":" + q.id); it.topic = t.id; it.grp = "S2"; items.push(it);
          });
        });
      });
      st.stage = 2; st.label = "Giai đoạn 2/3 · Quét chủ đề"; st.bs = base(); st.bl = items.length || 1;
      return items;
    }
    function vocabItems() {
      var items = [], counts = { A1: 7, A2: 7, B1: 6 };
      PL_LEVELS.forEach(function (L) {
        var pool = shuffle(Object.keys(W).filter(function (id) { return W[id].cefr === L; }));
        pool = pool.filter(function (id) { return !bannedW[id]; }).concat(pool.filter(function (id) { return bannedW[id]; }));
        pool.slice(0, counts[L]).forEach(function (id) {
          var w = W[id], opts = [];
          shuffle(pool).forEach(function (x) { if (opts.length < 3 && W[x].vi !== w.vi && opts.indexOf(W[x].vi) < 0) opts.push(W[x].vi); });
          items.push({ kind: "mc", id: id, q: "“" + w.w + "” nghĩa là gì?", options: shuffle(opts.concat([w.vi])), answer: w.vi,
            explain: w.w + " " + w.ipa + " = " + w.vi + ". Ví dụ: " + w.ex + " (" + w.exVi + ")", tag: "tu-vung-" + w.tid, grp: "V:" + L, noRecord: true });
        });
      });
      st.stage = 3; st.label = "Giai đoạn 3/3 · Từ vựng"; st.bs = base(); st.bl = items.length;
      return items;
    }
    function more(s) {
      if (st.phase === 1) {
        if (st.cur) {
          var g = s.grp["L:" + st.cur] || { ok: 0, n: 0 };
          st.scores[st.cur] = g.ok;
          if (g.ok >= 5) st.passed.push(st.cur); else { st.stop = st.cur; st.phase = 2; }
          st.cur = null;
        }
        if (st.phase === 1) {
          if (st.li < PL_LEVELS.length) { st.cur = PL_LEVELS[st.li++]; return batch1(st.cur); }
          st.phase = 2;
        }
      }
      if (st.phase === 2) { st.phase = 3; var sc = scan(s); if (sc.length) return sc; }
      if (st.phase === 3) { st.phase = 4; return vocabItems(); }
      return null;
    }
    function progress(s) {
      var frac = Math.min(1, (s.i - st.bs) / (st.bl || 1)), pct;
      if (st.stage === 1) pct = ((st.li - 1) + frac) / PL_LEVELS.length * 33;
      else pct = (st.stage - 1) * 33 + frac * 33;
      return { pct: Math.round(Math.min(100, pct)), text: st.label };
    }
    function result(s) {
      var R = { at: today(), time: nowHM(), gl: st.passed.length ? st.passed[st.passed.length - 1] : "", vl: "", scores: st.scores, stop: st.stop, byTopic: {}, tinfo: {}, vs: {} };
      for (var i = 0; i < PL_LEVELS.length; i++) {
        var g = s.grp["V:" + PL_LEVELS[i]]; if (g) R.vs[PL_LEVELS[i]] = g.ok + "/" + g.n;
        if (g && g.n && g.ok / g.n >= 0.7) R.vl = PL_LEVELS[i]; else break;
      }
      GR.forEach(function (t) {
        var b = s.byTopic[t.id];
        if (!b || !b.n) {
          if (st.passed.indexOf(t.cefr) >= 0) { R.tinfo[t.id] = { st: "likely", ok: 0, n: 0 }; R.byTopic[t.id] = 1; } // bậc đã vượt, chưa hỏi chủ đề này: coi là có vẻ ổn
          else R.tinfo[t.id] = { st: "none", ok: 0, n: 0 };
          return;
        }
        var r = b.ok / b.n, passedLv = st.passed.indexOf(t.cefr) >= 0;
        var stt = r === 1 && (b.n >= 2 || passedLv) ? "green" : r >= 0.5 ? "yellow" : "red";
        R.byTopic[t.id] = stt === "green" ? 1 : r; R.tinfo[t.id] = { st: stt, ok: b.ok, n: b.n };
      });
      var maxRank = RANK[st.stop || (st.passed.length ? PL_LEVELS[Math.min(PL_LEVELS.length - 1, PL_LEVELS.indexOf(R.gl) + 1)] : "A1")] || 1;
      R.path = [];
      ["red", "yellow", "none"].forEach(function (k) {
        GR.forEach(function (t) { if (R.tinfo[t.id].st === k && (k !== "none" || RANK[t.cefr] <= maxRank) && R.path.length < 10) R.path.push(t.id); });
      });
      return R;
    }
    var statLabel = { green: "Vững", likely: "Có vẻ vững", yellow: "Nên ôn", red: "Cần học", none: "Chưa kiểm tra" };
    var cfg = {
      title: "Kiểm tra đầu vào", exit: "#/grammar", nav: "grammar",
      build: function () {
        st = { phase: 1, li: 1, cur: PL_LEVELS[0], passed: [], stop: null, scores: {}, taken: {}, stage: 1, label: "", bs: 0, bl: 1 };
        return batch1(PL_LEVELS[0]);
      },
      more: function (s) { return more(s); },
      progress: function (s) { return progress(s); },
      onFinish: function (pct, s) {
        var R = result(s); cfg._R = R;
        var prev = S.placement && S.placement.gl !== undefined ? S.placement : null;
        R.prev = prev ? { at: prev.at, time: prev.time, gl: prev.gl, vl: prev.vl } : null;
        S.placement = Object.assign({}, R, { pct: pct, start: R.path[0] || null, skip: S.placement && S.placement.skip === false ? false : true });
        S.placeHist = (S.placeHist || []).concat([{ at: R.at, time: R.time, gl: R.gl, vl: R.vl, pct: pct }]).slice(-10);
        S.placeUsed = s.items.filter(function (it) { return it.id.charAt(0) === "g"; }).map(function (it) { return it.id; });
        S.placeWords = s.items.filter(function (it) { return it.id.charAt(0) === "v"; }).map(function (it) { return it.id; });
      },
      extra: function () {
        var R = cfg._R; if (!R) return "";
        var lvl = PL_LEVELS.map(function (L) {
          var sc = R.scores[L];
          return L + " " + (sc === undefined ? "chưa làm" : sc + "/6 " + (sc >= 5 ? "✓" : "✗"));
        }).join(" · ");
        var notes = ["Mỗi bậc chỉ 6 câu nên kết quả dùng để chọn điểm bắt đầu, không phải chứng chỉ."];
        if (R.gl === "B1") notes.push("App mới có 2 chủ đề B1 nên kết quả B1 chưa chắc.");
        if (GR.some(function (t) { return R.tinfo[t.id].st === "likely"; })) notes.push("Chủ đề chưa hỏi ở bậc đã vượt qua được coi là có vẻ vững; có thể mở bài để chắc hơn.");
        if (R.stop && R.scores[R.stop] === 4) notes.push("Bậc " + R.stop + " sát ngưỡng (4/6), có thể làm lại sau vài bài ôn.");
        if (!R.gl) notes.push("Chưa vượt bậc A1, nên bắt đầu từ các bài A1.");
        var cmp = R.prev ? '<p class="muted">Lần trước (' + fmtDT(R.prev.at, R.prev.time) + "): ngữ pháp " + dispLv(R.prev.gl) + ", từ vựng " + dispLv(R.prev.vl) + ".</p>" : "";
        var map = GR.map(function (t) {
          var f = R.tinfo[t.id];
          return '<a class="tchip ' + f.st + '" href="#/grammar/' + t.id + '"><span class="cefr small">' + t.cefr + "</span> " + esc(t.title) + "<small>" + statLabel[f.st] + (f.n ? " · " + f.ok + "/" + f.n : "") + "</small></a>";
        }).join("");
        var path = R.path.length ? "<ol class=\"plpath\">" + R.path.map(function (id) {
          var t = GR.filter(function (x) { return x.id === id; })[0];
          return '<li><a href="#/grammar/' + id + '">' + esc(t.title) + "</a> <small class=\"muted\">" + statLabel[R.tinfo[id].st] + "</small></li>";
        }).join("") + "</ol>" : '<p class="muted">Không có bài nào cần học gấp.</p>';
        return '<div class="plres"><div class="plgrid"><div class="plbox"><span class="lbl">Bậc ngữ pháp</span><div class="big">' + esc(dispLv(R.gl)) + "</div><small class=\"muted\">" + lvl + '</small></div>' +
          '<div class="plbox"><span class="lbl">Bậc từ vựng</span><div class="big">' + esc(dispLv(R.vl)) + '</div><small class="muted">' + PL_LEVELS.map(function (L) { return L + " " + (R.vs[L] || "–"); }).join(" · ") + "</small></div></div>" +
          cmp + '<ul class="plnotes">' + notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>" +
          '<h3 style="margin-top:16px">Bản đồ chủ đề</h3><div class="tmap">' + map + "</div>" +
          '<h3 style="margin-top:16px">Lộ trình gợi ý</h3><p class="muted">Cần học trước, rồi nên ôn, rồi các bài chưa kiểm tra.</p>' + path +
          '<p class="muted" style="margin-top:8px">Ẩn bài đã vững khỏi gợi ý "Bài tiếp theo": <a href="#/placement/skip"><b>' + (S.placement.skip === false ? "đang tắt, bấm để bật" : "đang bật, bấm để tắt") + "</b></a></p></div>" +
          (R.path[0] ? '<div class="actions"><a class="btn" href="#/grammar/' + R.path[0] + '">Học bài đầu tiên</a></div>' : "");
      }
    };
    cfg.cfg = cfg; startSession(cfg); return null;
  }
  function togglePlacementSkip() {
    if (S.placement) { S.placement.skip = S.placement.skip === false; save(); toast(S.placement.skip === false ? "Đã tắt ẩn bài vững." : "Đã bật ẩn bài vững."); }
    location.hash = "#/grammar"; return null;
  }

  /* ---------- Màn hình: Tổng quan ---------- */
  var dashSel = null;
  function viewDashboard() {
    var k = today(), d = dayOf(k), g = S.goal;
    var pct = Math.min(100, Math.round(d.done / g * 100));
    var tot = totals();
    var acc = tot.c + tot.w ? Math.round(tot.c / (tot.c + tot.w) * 100) : null;
    var due = dueIds().length, st = streak();
    var msg = d.done >= g ? "Đã đủ mục tiêu hôm nay, streak được giữ." : "Còn " + (g - d.done) + " câu nữa để giữ streak.";
    var level = Math.floor(S.xp / 200) + 1, toNext = 200 - (S.xp % 200);
    var nt = nextGrammar();
    var nextHtml = '<div class="actions">' + (nt ? '<a class="btn small" href="#/grammar/' + nt.id + '">Bài tiếp theo: ' + esc(nt.title) + "</a>" : "") +
      (S.placement ? "" : '<a class="btn ghost small" href="#/placement">Làm kiểm tra đầu vào</a>') + "</div>";

    // Biểu đồ 7 ngày
    var cols = [], max = Math.max(g, 1);
    for (var i = 6; i >= 0; i--) { var kk = addDays(k, -i); max = Math.max(max, dayOf(kk).done); }
    for (i = 6; i >= 0; i--) {
      kk = addDays(k, -i); var n = dayOf(kk).done;
      cols.push('<div class="col"><b>' + (n || "") + '</b><i class="' + (n >= g ? "hit" : "") + '" style="height:' + Math.max(3, Math.round(n / max * 100)) + '%"></i><span>' + WD[parseKey(kk).getDay()] + "</span></div>");
    }
    // Lịch 28 ngày
    var cal = [];
    for (i = 27; i >= 0; i--) {
      kk = addDays(k, -i); var nn = dayOf(kk).done;
      cal.push('<i class="' + (nn >= g ? "on" : nn > 0 ? "part" : "") + (i === 0 ? " now" : "") + '" title="' + kk + ": " + nn + ' câu"></i>');
    }
    // Báo cáo tuần
    function wk(from) {
      var n = 0, c = 0, w = 0;
      for (var j = from; j < from + 7; j++) { var x = dayOf(addDays(k, -j)); n += x.done; c += x.correct; w += x.wrong; }
      return { n: n, acc: c + w ? Math.round(c / (c + w) * 100) : null };
    }
    var a = wk(0), b = wk(7);
    var best = bestStreak(), studied = Object.keys(S.days).filter(function (x) { return S.days[x].done > 0; }).length;
    var mon = addDays(k, -((parseKey(k).getDay() + 6) % 7)), wdots = [], wkHit = 0;
    for (i = 0; i < 7; i++) {
      kk = addDays(mon, i); var nw = dayOf(kk).done; if (nw >= g) wkHit++;
      wdots.push('<div class="wd ' + (nw >= g ? "hit" : nw > 0 ? "part" : "") + (kk === k ? " now" : "") + (kk > k ? " fut" : "") + '" title="' + kk + ": " + nw + ' câu"><i></i><span>' + WD[parseKey(kk).getDay()] + "</span></div>");
    }
    var goals = [5, 10, 20, 30]; if (goals.indexOf(g) < 0) { goals.push(g); goals.sort(function (x, y) { return x - y; }); }
    var chips = goals.map(function (n) { return '<button class="chip ' + (g === n ? "on" : "") + '" data-goal="' + n + '" type="button">' + n + "</button>"; }).join("");
    function delta(x, y, unit) {
      if (x === null || y === null) return '<span class="delta muted">chưa có dữ liệu tuần trước</span>';
      var df = x - y; if (!df) return '<span class="delta muted">bằng tuần trước</span>';
      return '<span class="delta ' + (df > 0 ? "up" : "down") + '">' + (df > 0 ? "+" : "") + df + unit + " so với tuần trước</span>";
    }

    // Danh sách chủ đề + chi tiết
    var list = [];
    GR.forEach(function (t) { list.push({ key: "g:" + t.id, kind: "Ngữ pháp", title: t.title, st: gStatus(t), href: "#/grammar/" + t.id, topic: t }); });
    VO.forEach(function (t) { list.push({ key: "v:" + t.id, kind: "Từ vựng", title: t.title, st: vStatus(t), href: "#/vocab/" + t.id, topic: t }); });
    if (!dashSel || !list.some(function (x) { return x.key === dashSel; })) dashSel = list.length ? list[0].key : null;
    var sel = list.filter(function (x) { return x.key === dashSel; })[0];

    var errs = Object.keys(S.errors).sort(function (p, q) { return S.errors[q] - S.errors[p]; }).slice(0, 5);
    var emax = errs.length ? S.errors[errs[0]] : 1;
    var errHtml = errs.length ? errs.map(function (e) {
      return '<div class="errrow"><div style="display:flex;justify-content:space-between"><span>' + esc(TL[e] || e) + "</span><b>" + S.errors[e] + ' lần</b></div><div class="bar"><i style="width:' + Math.round(S.errors[e] / emax * 100) + '%"></i></div></div>';
    }).join("") : '<p class="muted">Chưa có lỗi nào được ghi nhận. Làm một bài để bắt đầu.</p>';
    var bdg = BADGES.map(function (x) {
      return '<div class="bdg ' + (S.badges[x.id] ? "on" : "") + '"><b>' + esc(x.name) + "</b>" + esc(x.desc) + "</div>";
    }).join("");

    return '' +
      '<section class="grid hero">' +
        '<div class="card"><div class="hello"><img class="avatar big" src="icons/avatar-160.png" alt="" width="64" height="64"><div><p class="eyebrow">' + (function (dd) { return DAYS_FULL[dd.getDay()] + ", " + pad(dd.getDate()) + "-" + pad(dd.getMonth() + 1) + "-" + dd.getFullYear(); })(parseKey(k)) + '</p><h1>Xin chào, Ngài Richard</h1></div></div>' +
          '<div class="stats3">' +
            '<div><span class="lbl">Streak</span><div class="big">' + st + '<small> ngày</small></div></div>' +
            '<div><span class="lbl">Hôm nay</span><div class="big">' + d.done + '<small> / ' + g + "</small></div></div>" +
            '<div><span class="lbl">Chính xác</span><div class="big">' + (acc === null ? "–" : acc + "%") + "</div></div>" +
          "</div>" +
          '<div class="bar"><i style="width:' + pct + '%"></i></div><p class="muted" style="margin-top:10px">' + msg + "</p>" +
          '<p class="muted" style="margin-top:6px">Streak dài nhất <b>' + best + "</b> ngày · đã học <b>" + studied + "</b> ngày</p>" +
          '<div class="goalrow"><span class="lbl">Mục tiêu mỗi ngày (số mục)</span><div class="chips">' + chips + "</div></div>" + nextHtml + "</div>" +
        '<div class="card heroR"><span class="lbl">XP · Cấp ' + level + '</span><div class="big">' + S.xp + '<small> XP</small></div>' +
          '<p class="muted">Còn ' + toNext + ' XP để lên cấp ' + (level + 1) + '</p>' +
          '<div style="margin-top:18px"><span class="lbl">Cần ôn hôm nay</span><div class="big">' + due + '<small> mục</small></div></div>' +
          '<div class="actions"><a class="btn" href="#/review">' + (due ? "Ôn ngay" : "Xem mục ôn tập") + "</a></div></div>" +
        clockCard(d.done, g) +
      "</section>" +
      '<section class="card" style="margin-top:16px"><h2>Lộ trình CEFR</h2><p class="muted">Số bài ngữ pháp đã vững và số sao theo từng bậc.</p>' + ["A1", "A2", "B1"].map(function (c) {
        var n = GR.filter(function (x) { return x.cefr === c; }), dn = n.filter(gDone).length, st = n.reduce(function (a, t) { return a + stars(t); }, 0);
        return '<div class="crow"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><span><span class="cefr small">' + c + "</span> " + esc(CEFR_NAME[c]) + "</span><b>" + dn + "/" + n.length + " bài vững · " + st + "/" + n.length * 3 + ' sao</b></div><div class="bar"><i style="width:' + (n.length ? Math.round(dn / n.length * 100) : 0) + '%"></i></div></div>';
      }).join("") + "</section>" +
      placementCard() +
      '<section class="grid two">' +
        '<div class="card"><h2>7 ngày gần đây</h2><p class="muted">Số câu và thẻ mỗi ngày. Cột xanh chanh là ngày đủ mục tiêu.</p><div class="chart">' + cols.join("") + "</div>" +
          '<h3 style="margin-top:18px">Mục tiêu tuần: ' + wkHit + "/5 ngày đạt mục tiêu</h3><p class=\"muted\">Học đủ mục tiêu ít nhất 5 ngày mỗi tuần (T2 đến CN) là một thói quen tốt.</p>" +
          '<div class="wdots">' + wdots.join("") + "</div>" + (wkHit >= 5 ? '<p class="delta up" style="margin-top:8px">Đã đạt mục tiêu tuần này!</p>' : "") + "</div>" +
        '<div class="card"><h2>Báo cáo tuần</h2>' +
          '<div class="report"><div><span class="lbl">Số câu tuần này</span><div class="big">' + a.n + "</div>" + delta(a.n, b.n, " câu") + "</div>" +
          '<div><span class="lbl">Chính xác</span><div class="big">' + (a.acc === null ? "–" : a.acc + "%") + "</div>" + delta(a.acc, b.acc, "%") + "</div></div>" +
          '<h3 style="margin-top:18px">Lịch 28 ngày</h3><div class="cal">' + cal.join("") + "</div></div>" +
      "</section>" +
      '<section class="panel">' +
        '<div><h2>Tiến độ theo chủ đề</h2>' + list.map(function (x) {
          return '<div class="row ' + (x.key === dashSel ? "active" : "") + '" data-sel="' + x.key + '"><div><b>' + esc(x.title) + "</b><small>" + x.kind + "</small></div>" + pill(x.st) + "</div>";
        }).join("") + "</div>" +
        '<div class="detail">' + (sel ? "<h3>" + esc(sel.title) + '</h3><p class="muted">' + sel.kind + " · " + sel.st[0] + '</p><div class="actions"><a class="btn dark small" href="' + sel.href + '">Mở chủ đề</a></div>' : "") +
          '<h3 style="margin-top:20px">Lỗi hay sai</h3>' + errHtml + (errs.length ? '<div class="actions"><a class="btn dark small" href="#/review/weak">Luyện các lỗi này</a></div>' : "") +
          '<h3 style="margin-top:20px">Huy hiệu</h3><div class="badges">' + bdg + "</div></div>" +
      "</section>";
  }
  /* ---------- Đồng hồ kim ở Tổng quan, vòng cung quanh mặt là tiến độ hôm nay ---------- */
  var DAYS_FULL = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  var clockRaf = null, clockTimer = null;
  function clockCard(done, goal) {
    var p = Math.max(0, Math.min(1, goal ? done / goal : 0)), R = 92, C = 2 * Math.PI * R, ticks = "";
    for (var i = 0; i < 60; i++) {
      var hour = i % 5 === 0, a = i * 6 * Math.PI / 180, r1 = 80, r2 = hour ? 71 : 75;
      var x1 = 100 + r1 * Math.sin(a), y1 = 100 - r1 * Math.cos(a), x2 = 100 + r2 * Math.sin(a), y2 = 100 - r2 * Math.cos(a);
      ticks += '<line x1="' + x1.toFixed(2) + '" y1="' + y1.toFixed(2) + '" x2="' + x2.toFixed(2) + '" y2="' + y2.toFixed(2) + '" stroke="' + (i === 0 ? "#dcf84a" : hour ? "#eef2f8" : "rgba(238,242,248,.35)") + '" stroke-width="' + (hour ? 2.4 : 1) + '" stroke-linecap="round"/>';
    }
    return '<div class="card clockcard"><svg class="clk" viewBox="0 0 200 200" role="img" aria-label="Đồng hồ kim. Tiến độ hôm nay ' + done + " trên " + goal + ' mục">' +
      '<circle cx="100" cy="100" r="98" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>' +
      '<circle cx="100" cy="100" r="' + R + '" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="3"/>' +
      '<circle cx="100" cy="100" r="' + R + '" fill="none" stroke="#dcf84a" stroke-width="3" stroke-linecap="round" stroke-dasharray="' + (C * p).toFixed(1) + " " + C.toFixed(1) + '" transform="rotate(-90 100 100)"/>' +
      ticks +
      '<g id="clkH"><line x1="100" y1="108" x2="100" y2="58" stroke="#eef2f8" stroke-width="5" stroke-linecap="round"/></g>' +
      '<g id="clkM"><line x1="100" y1="110" x2="100" y2="38" stroke="#eef2f8" stroke-width="3.2" stroke-linecap="round"/></g>' +
      '<g id="clkS"><line x1="100" y1="116" x2="100" y2="30" stroke="#dcf84a" stroke-width="1.6" stroke-linecap="round"/></g>' +
      '<circle cx="100" cy="100" r="5.5" fill="#dcf84a"/><circle cx="100" cy="100" r="2" fill="#14171c"/></svg>' +
      '<div class="clkdig"><b id="clkT">--:--</b><span id="clkD"></span><span class="clkp">Hôm nay ' + done + " / " + goal + " mục</span></div></div>";
  }
  function startClock() {
    if (clockRaf) { cancelAnimationFrame(clockRaf); clockRaf = null; }
    if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
    var H = $("#clkH"), M = $("#clkM"), S_ = $("#clkS"), T = $("#clkT"), D = $("#clkD"); if (!H) return;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, lastMin = -1;
    var rot = function (g, deg) { g.setAttribute("transform", "rotate(" + deg.toFixed(2) + " 100 100)"); };
    function stop() { if (clockRaf) cancelAnimationFrame(clockRaf); clockRaf = null; if (clockTimer) clearInterval(clockTimer); clockTimer = null; }
    function tick() {
      if (!document.getElementById("clkH")) { stop(); return false; } // đã rời trang Tổng quan thì dừng
      var n = new Date(), ms = n.getMilliseconds(), sec = n.getSeconds() + (reduce ? 0 : ms / 1000), min = n.getMinutes() + sec / 60, hr = (n.getHours() % 12) + min / 60;
      rot(S_, sec * 6); rot(M, min * 6); rot(H, hr * 30);
      if (n.getMinutes() !== lastMin) {
        lastMin = n.getMinutes();
        T.textContent = pad(n.getHours()) + ":" + pad(n.getMinutes());
        D.textContent = DAYS_FULL[n.getDay()] + ", " + pad(n.getDate()) + "-" + pad(n.getMonth() + 1) + "-" + n.getFullYear();
      }
      return true;
    }
    function frame() { if (tick()) clockRaf = requestAnimationFrame(frame); }
    frame();
    clockTimer = setInterval(tick, 250); // dự phòng khi trình duyệt giảm tốc khung hình
  }
  function placementCard() {
    var P = S.placement; if (!P || P.gl === undefined) return "";
    var H = S.placeHist || [], last = H[H.length - 1], prev = H[H.length - 2];
    var idx = function (l) { return l ? ["A1", "A2", "B1"].indexOf(l) + 1 : 0; };
    var diff = function (a, b, name) { if (!prev) return ""; var d = idx(a) - idx(b); return name + (d > 0 ? " tăng " + d + " bậc" : d < 0 ? " giảm " + (-d) + " bậc" : " giữ nguyên"); };
    var cmp = prev ? '<p class="muted">So với lần trước (' + fmtDT(prev.at, prev.time) + "): " + [diff(last.gl, prev.gl, "ngữ pháp"), diff(last.vl, prev.vl, "từ vựng")].join(", ") + ".</p>" : '<p class="muted">Làm lại sau vài tuần để so sánh tiến bộ.</p>';
    return '<section class="card" style="margin-top:16px"><h2>Kết quả kiểm tra đầu vào</h2><div class="plgrid" style="margin-top:10px"><div class="plbox"><span class="lbl">Bậc ngữ pháp</span><div class="big">' + esc(dispLv(P.gl)) +
      '</div></div><div class="plbox"><span class="lbl">Bậc từ vựng</span><div class="big">' + esc(dispLv(P.vl)) + "</div></div></div>" + cmp +
      (H.length ? '<div class="phist">' + H.map(function (h) { return '<div class="prow"><span>' + fmtDT(h.at, h.time) + "</span><span>NP " + esc(dispLv(h.gl)) + " · TV " + esc(dispLv(h.vl)) + '</span><div class="bar"><i style="width:' + h.pct + '%"></i></div><b>' + h.pct + "%</b></div>"; }).join("") + "</div>" : "") +
      '<div class="actions"><a class="btn small ghost" href="#/placement">Làm lại</a></div></section>';
  }
  function bindDashboard() {
    startClock();
    document.querySelectorAll("[data-goal]").forEach(function (el) {
      el.addEventListener("click", function () { S.goal = Number(el.getAttribute("data-goal")); save(); toast("Đã đặt mục tiêu " + S.goal + " mục mỗi ngày."); $("#view").innerHTML = viewDashboard(); bindDashboard(); });
    });
    document.querySelectorAll("[data-sel]").forEach(function (el) {
      el.addEventListener("click", function () { dashSel = el.getAttribute("data-sel"); $("#view").innerHTML = viewDashboard(); bindDashboard(); });
    });
  }

  /* ---------- Màn hình: Ngữ pháp ---------- */
  function viewGrammarList() {
    var banner = '<div class="card" style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><h3>Kiểm tra đầu vào</h3><p class="muted">' +
      (S.placement && S.placement.gl !== undefined ? "Lần gần nhất " + fmtDT(S.placement.at, S.placement.time) + ": ngữ pháp " + dispLv(S.placement.gl) + ", từ vựng " + dispLv(S.placement.vl) + ". Làm lại sau vài tuần để xem tiến bộ."
        : S.placement ? "Bản cũ làm ngày " + fmtDT(S.placement.at) + ". Làm lại để biết bậc CEFR." : "Khoảng 15 phút: xác định bậc ngữ pháp, bậc từ vựng và chủ đề nào nên học trước.") +
      '</p></div><a class="btn" href="#/placement">' + (S.placement ? "Làm lại" : "Bắt đầu") + "</a></div>";
    var tools = '<div class="card" style="margin-top:16px"><h3>Công cụ ôn luyện</h3><div class="actions" style="margin-top:10px">' +
      '<a class="btn small" href="#/grammar/mix/A1">Ôn tổng hợp A1</a><a class="btn small" href="#/grammar/mix/A2">Ôn tổng hợp A2</a><a class="btn small" href="#/grammar/mix/B1">Ôn tổng hợp B1</a><a class="btn small ghost" href="#/grammar/mix/all">Trộn tất cả</a>' +
      '<a class="btn small ghost" href="#/book">Đối chiếu sách Murphy (115 unit)</a><a class="btn small ghost" href="#/appendix">Phụ lục tra cứu</a></div></div>';
    var out = '<h1 style="margin-top:12px">Ngữ pháp</h1><p class="muted">Học theo bậc CEFR từ A1. Mỗi bài có lý thuyết, lỗi thường gặp và bài tập ba mức Dễ, Vừa, Khó. Qua 80% mỗi mức thì được 1 sao.</p>' + banner + tools;
    var cur = null;
    GR.forEach(function (t) {
      if (t.cefr !== cur) {
        if (cur) out += "</div>";
        cur = t.cefr;
        var n = GR.filter(function (x) { return x.cefr === cur; });
        var done = n.filter(gDone).length;
        out += '<h2 class="cefrh"><span class="cefr">' + cur + "</span> " + esc(CEFR_NAME[cur] || "") + '<small>' + done + "/" + n.length + ' bài vững</small></h2><div class="topics">';
      }
      var r = S.topics["g:" + t.id];
      out += '<div class="card topic">' + pill(gStatus(t)) + gHint(t) + '<span class="cefr small">' + t.cefr + "</span>" + starHtml(stars(t)) + "<h2>" + esc(t.title) + '</h2><p class="muted">' + esc(t.summary) + "</p>" +
        (r ? '<p class="muted" style="margin-top:8px">Lần gần nhất ' + r.last + "% · tốt nhất " + r.best + "%</p>" : "") +
        '<div class="actions"><a class="btn" href="#/grammar/' + t.id + '">Học bài</a><a class="btn ghost" href="#/grammar/' + t.id + '/quiz/all">Làm bài (' + t.questions.length + " câu)</a></div></div>";
    });
    return out + "</div>";
  }
  function viewLesson(id) {
    var t = GR.filter(function (x) { return x.id === id; })[0];
    if (!t) return viewNotFound();
    var add = function (en, vi) { return '<button class="addrev" type="button" data-f="' + esc(en) + '" data-b="' + esc(vi) + '">+ Ôn tập</button>'; };
    var hasMist = t.mistakes && t.mistakes.length;
    var html = '<div class="lesson"><a class="back" href="#/grammar">← Ngữ pháp</a><h1>' + esc(t.title) + ' <span class="cefr">' + t.cefr + "</span></h1>" +
      '<div class="card core"><div><p class="eyebrow">Trọng tâm</p><p>' + esc(t.summary) + "</p></div>" +
      (t.formula ? '<div class="formula"><p class="eyebrow">Cấu trúc chính</p><b>' + esc(t.formula) + "</b></div>" : "") + "</div>";
    t.sections.forEach(function (s) {
      if (hasMist && /lỗi/i.test(s.heading)) return; // đã có phần "Lỗi thường gặp" dạng Sai/Đúng bên dưới
      var table = s.table ? '<table class="t"><thead><tr>' + s.table[0].map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        s.table.slice(1).map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>" : "";
      html += '<div class="card sec"><h2>' + esc(s.heading) + "</h2><p>" + esc(s.body) + "</p>" + table +
        '<ul class="ex">' + s.examples.map(function (e) { return "<li><div><b>" + esc(e.en) + "</b><span>" + esc(e.vi) + "</span></div>" + add(e.en, e.vi) + "</li>"; }).join("") + "</ul></div>";
    });
    if (t.walk) {
      html += '<div class="card sec"><h2>Phân tích ví dụ</h2><p class="muted">Đọc câu tiếng Anh trước, đoán nghĩa, rồi xem phần giải thích.</p>' +
        t.walk.map(function (e, i) {
          return '<div class="walk"><div class="walkhead"><b>' + esc(e.en) + "</b>" + add(e.en, e.vi) + '</div><div class="walkrow"><span class="lbl">Nghĩa</span><span>' + esc(e.vi) + '</span></div>' +
            '<div class="walkrow"><span class="lbl">Cấu trúc và ngữ cảnh</span><span>' + esc(e.note) + "</span></div></div>";
        }).join("") + "</div>";
    }
    if (hasMist) {
      html += '<div class="card sec"><h2>Lỗi thường gặp</h2><p class="muted">Đối chiếu câu sai với câu đúng để nhớ lý do.</p>' +
        t.mistakes.map(function (m) {
          return '<div class="mist"><div class="mrow bad"><span class="lbl">Chưa đúng</span><b>' + esc(m.wrong) + '</b></div><div class="mrow good"><span class="lbl">Đã sửa</span><b>' + esc(m.right) +
            "</b>" + add(m.right, m.why) + '</div><p class="muted">' + esc(m.why) + "</p></div>";
        }).join("") + "</div>";
    }
    if (t.check) {
      html += '<div class="card sec"><h2>Nhẩm nhanh trước khi làm bài</h2><p class="muted">Bốn câu tự hỏi khi gặp một câu bài tập. Đọc phần gợi ý bên dưới, hiểu rồi thì tích vào ô.</p><ul class="check">' + t.check.map(function (c, i) {
        var pr = c.split(" || ");
        return '<li><label><input type="checkbox"> <span><b>' + esc(pr[0]) + "</b>" + (pr[1] ? "<small>" + esc(pr[1]) + "</small>" : "") + "</span></label></li>";
      }).join("") + "</ul></div>";
    }
    var nq = function (l) { return t.questions.filter(function (q) { return q.lv === l; }).length; };
    html += '<div class="card sec"><h2>Làm bài kiểm tra</h2><p class="muted">Chọn mức. Đúng từ 80% thì được sao của mức đó.</p><div class="lvls">' +
      ["e", "m", "h"].map(function (l, i) {
        var b = lvBest(t, l);
        return '<a class="lvbtn" href="#/grammar/' + t.id + "/quiz/" + l + '"><b>' + LV[l] + "</b><span class=\"stars\">" + "★".repeat(i + 1) + "☆".repeat(2 - i) + "</span><small>" + nq(l) + " câu" + (b ? " · tốt nhất " + b + "%" : "") + "</small>" + (b >= 80 ? '<i class="got">Đã đạt</i>' : "") + "</a>";
      }).join("") + '<a class="lvbtn all" href="#/grammar/' + t.id + '/quiz/all"><b>Tất cả</b><span>Trộn mọi mức</span><small>' + t.questions.length + ' câu</small></a></div><div class="actions"><a class="btn ghost small" href="#/grammar/' + t.id + '/order">Sắp xếp từ thành câu</a></div></div>';
    if (t.selfWrite) {
      var sw = (S.selfwrite && S.selfwrite[t.id]) || [];
      html += '<div class="card sec" id="selfWrite" data-tid="' + t.id + '"><h2>Viết về bạn</h2><p class="muted">Tự viết câu của riêng bạn để nhớ lâu hơn. App không chấm; viết xong hãy bấm xem bài mẫu để so sánh.</p>' +
        t.selfWrite.map(function (q, i) {
          return '<div class="sw"><b>' + esc(q[0]) + '</b><textarea class="input" data-sw="' + i + '" rows="2" placeholder="Viết câu tiếng Anh của bạn…">' + esc(sw[i] || "") + '</textarea>' +
            '<button class="link" type="button" data-swshow="' + i + '">Xem bài mẫu</button><p class="swmodel" hidden><b>Bài mẫu:</b> ' + esc(q[1]) + "</p></div>";
        }).join("") + "</div>";
    }
    if (t.see && t.see.length) {
      var links = t.see.map(function (id) { var o = GR.filter(function (x) { return x.id === id; })[0]; return o ? '<a class="btn ghost small" href="#/grammar/' + o.id + '">' + esc(o.title) + "</a>" : ""; }).join("");
      if (links) html += '<div class="card sec"><h2>Xem thêm</h2><p class="muted">Các bài liên quan nên học tiếp.</p><div class="actions">' + links + "</div></div>";
    }
    return html + "</div>";
  }
  function bindLesson() {
    var swc = $("#selfWrite");
    if (swc) {
      swc.querySelectorAll("textarea[data-sw]").forEach(function (ta) {
        ta.addEventListener("input", function () {
          var tid = swc.getAttribute("data-tid"), arr = (S.selfwrite[tid] = S.selfwrite[tid] || []);
          arr[Number(ta.getAttribute("data-sw"))] = ta.value; save();
        });
      });
      swc.querySelectorAll("[data-swshow]").forEach(function (b) {
        b.addEventListener("click", function () { var m = b.parentNode.querySelector(".swmodel"); m.hidden = !m.hidden; b.textContent = m.hidden ? "Xem bài mẫu" : "Ẩn bài mẫu"; });
      });
    }
    document.querySelectorAll(".addrev").forEach(function (b) {
      b.addEventListener("click", function () {
        var ok = addDeck(b.getAttribute("data-f"), b.getAttribute("data-b"));
        toast(ok ? "Đã thêm vào Ôn tập." : "Mục này đã có trong Ôn tập.");
        if (ok) { b.textContent = "✓ Đã thêm"; b.disabled = true; renderNav("grammar"); }
      });
    });
  }

  /* ---------- Màn hình: Từ vựng ---------- */
  function viewVocabList() {
    return '<h1 style="margin-top:12px">Từ vựng</h1><p class="muted">Học theo thẻ chủ đề. Mỗi lượt 10 từ, có nút nghe phát âm.</p><div class="topics">' +
      VO.map(function (t) {
        var n = 0; t.sets.forEach(function (s) { n += s.words.length; });
        return '<div class="card topic">' + pill(vStatus(t)) + (VC[t.id] ? '<span class="cefr small">' + VC[t.id] + "</span>" : "") + "<h2>" + esc(t.title) + '</h2><p class="muted">' + esc(t.summary) + " · " + n + ' từ</p><div class="actions"><a class="btn" href="#/vocab/' + t.id + '">Mở chủ đề</a></div></div>';
      }).join("") + "</div>";
  }
  function vocabCefrNote(t) {
    var c = {}, none = 0, n = 0;
    t.sets.forEach(function (s) { s.words.forEach(function (w) { n++; var l = (window.WORD_CEFR || {})[t.id + ":" + w.w]; if (l) c[l] = (c[l] || 0) + 1; else none++; }); });
    return '<p class="muted" style="margin-top:8px;font-size:13px">Bậc theo danh sách Oxford 3000/5000: ' + Object.keys(RANK).filter(function (l) { return c[l]; }).map(function (l) { return l + " " + c[l]; }).join(" · ") +
      (none ? " · " + none + "/" + n + " từ không có trong danh sách (chưa gán bậc)" : "") + ".</p>";
  }
  function viewVocabTopic(tid) {
    var t = VO.filter(function (x) { return x.id === tid; })[0];
    if (!t) return viewNotFound();
    return '<div class="lesson"><a class="back" href="#/vocab">← Từ vựng</a><h1>' + esc(t.title) + (VC[t.id] ? ' <span class="cefr">' + VC[t.id] + "</span>" : "") + '</h1><p class="muted">' + esc(t.summary) + "</p>" + vocabCefrNote(t) + '<div class="card sec">' +
      t.sets.map(function (s) {
        var done = [["vs", "kiểm tra"], ["vd", "nghe viết"], ["vl", "nghe chọn từ"], ["vc", "điền chỗ trống"], ["vt", "gõ từ"]].map(function (m) {
          var r = S.topics[m[0] + ":" + t.id + ":" + s.id]; return r ? " · " + m[1] + " " + r.last + "%" : "";
        }).join("");
        var base = "#/vocab/" + t.id + "/" + s.id;
        return '<div class="sethead"><div><b>' + esc(s.title) + '</b><div class="muted">' + s.words.length + " từ" + done + '</div></div><div class="actions" style="margin:0"><a class="btn small" href="' + base + '">Học bộ này</a>' +
          '<a class="btn small ghost" href="' + base + '/listen">Nghe chọn từ</a><a class="btn small ghost" href="' + base + '/cloze">Điền chỗ trống</a><a class="btn small ghost" href="' + base + '/type">Nghĩa → gõ từ</a><a class="btn small ghost" href="' + base + '/dict">Nghe viết</a></div></div>';
      }).join("") + "</div></div>";
  }

  /* ---------- Phiên làm bài (câu hỏi + thẻ từ) ---------- */
  var SESS = null;
  function mkQuestion(id) {
    var q = Q[id];
    return { kind: q.type === "fill" ? "fill" : "mc", id: id, q: q.q, options: q.options ? shuffle(q.options) : null, answer: q.answer, answers: q.answers, explain: q.explain, tag: q.tag, vi: (GE[id.slice(2)] || [])[0] || q.vi, deep: (GE[id.slice(2)] || [])[1] || q.deep };
  }
  function mkCard(id) {
    if (id.charAt(0) === "d") { var d = S.deck[id]; return { kind: "card", id: id, w: { w: d.f, ipa: "", pos: "", vi: d.b, ex: "", exVi: "" } }; }
    if (id.charAt(0) === "p") { var ph = PH[id]; return { kind: "card", id: id, w: { w: ph.en, ipa: "", pos: "", vi: ph.vi, ex: "", exVi: "", phr: true } }; }
    return { kind: "card", id: id, w: W[id] };
  }
  function mkDict(id) {
    var w = W[id];
    return { kind: "dict", id: id, w: w, q: "Nghe và viết: " + w.vi, answer: w.w, answers: [w.w], explain: w.w + " " + w.ipa + " = " + w.vi + ". Ví dụ: " + w.ex + " (" + w.exVi + ")", tag: "tu-vung-" + w.tid };
  }
  function mkVocabQuiz(tid, words) {
    var pool = []; VO.forEach(function (t) { if (t.id === tid) t.sets.forEach(function (s) { pool = pool.concat(s.words); }); });
    return shuffle(words).slice(0, 5).map(function (w) {
      var others = shuffle(pool.filter(function (x) { return x.vi !== w.vi; })).slice(0, 3).map(function (x) { return x.vi; });
      return {
        kind: "mc", id: "v:" + tid + ":" + w.w, q: "“" + w.w + "” nghĩa là gì?", options: shuffle(others.concat([w.vi])), answer: w.vi,
        explain: w.w + " " + w.ipa + " = " + w.vi + ". Ví dụ: " + w.ex + " (" + w.exVi + ")", tag: "tu-vung-" + tid
      };
    });
  }
  function startSession(cfg) {
    SESS = Object.assign({ chosen: [], i: 0, ok: 0, bad: 0, rem: 0, forgot: 0, answered: false, picked: null, flip: false, wrong: [], xp0: S.xp, byTopic: {}, grp: {} }, cfg);
    SESS.items = cfg.build();
    renderSession();
  }
  function sessionBar() {
    var s = SESS, total = s.items.length;
    if (s.progress) {
      var pg = s.progress(s);
      return '<div class="sbar"><a class="back" href="' + s.exit + '" style="margin:0">✕ Thoát</a><div class="bar"><i style="width:' + pg.pct + '%"></i></div><span class="muted">' + esc(pg.text) + "</span></div>";
    }
    return '<div class="sbar"><a class="back" href="' + s.exit + '" style="margin:0">✕ Thoát</a><div class="bar"><i style="width:' + Math.round(s.i / total * 100) + '%"></i></div><span class="muted">' + Math.min(s.i + 1, total) + "/" + total + "</span></div>";
  }
  function renderSession() {
    var s = SESS, view = $("#view");
    if (s.i >= s.items.length && s.more) { var add = s.more(s); if (add && add.length) s.items = s.items.concat(add); } // bài thích ứng: xin thêm câu theo kết quả
    if (s.i >= s.items.length) { finishSession(); return; }
    var it = s.items[s.i], html = "";
    if (it.kind === "card") {
      var w = it.w;
      html = '<div class="card flash">' + (w.pos ? '<span class="pill">' + esc(w.pos) + "</span>" : "") + (w.cefr ? '<span class="cefr small">' + w.cefr + "</span>" : "") + '<div class="word' + (w.phr ? " phr" : "") + '">' + esc(w.w) + '</div>' + (w.ipa ? '<div class="ipa">' + esc(w.ipa) + "</div>" : "") +
        '<button class="btn ghost small speak" data-act="speak" type="button">Nghe phát âm</button>' +
        (s.flip ? '<div class="mean" style="margin-top:20px">' + esc(w.vi) + "</div>" + (w.ex ? '<p><b>' + esc(w.ex) + '</b></p><p class="muted">' + esc(w.exVi) + "</p>" : "") +
                   '<div class="rate"><button class="btn ghost" data-act="forgot" type="button">Chưa nhớ</button><button class="btn" data-act="remember" type="button">Đã nhớ</button></div>' +
                   (/^[vp]/.test(it.id) ? '<div style="margin-top:10px"><button class="link" data-act="addrev" type="button">+ Ôn tập: đưa từ này vào lịch ôn hôm nay</button></div>' : "")
                 : '<div class="rate"><button class="btn dark" data-act="flip" type="button">Lật thẻ</button></div>') + "</div>";
    } else if (it.kind === "order") {
      var tok = function (act, i) { return '<button class="tok" type="button" data-act="' + act + '" data-i="' + i + '"' + (s.answered ? " disabled" : "") + ">" + esc(it.words[i]) + "</button>"; };
      html = '<div class="card"><p class="eyebrow">Sắp xếp các từ thành câu đúng</p><div class="q">' + esc(it.q) + "</div>" +
        '<div class="orderans">' + (s.chosen.length ? s.chosen.map(function (i) { return tok("wunpick", i); }).join("") : '<span class="muted">Bấm các từ bên dưới theo đúng thứ tự…</span>') + "</div>" +
        '<div class="orderpool">' + it.words.map(function (wd, i) { return s.chosen.indexOf(i) >= 0 ? '<span class="tok ghost">' + esc(wd) + "</span>" : tok("wpick", i); }).join("") + "</div>" +
        (s.answered ? '<div class="feedback ' + (s.lastOk ? "good" : "bad") + '"><b>' + (s.lastOk ? "Đúng rồi!" : "Chưa đúng. Câu đúng: " + esc(it.answer)) + "</b></div><div class=\"actions\"><button class=\"btn\" data-act=\"next\" type=\"button\">Tiếp tục</button></div>"
          : '<div class="actions"><button class="btn" data-act="wcheck" type="button">Kiểm tra</button><button class="btn ghost" data-act="wreset" type="button">Làm lại</button></div>') + "</div>";
    } else if (it.kind === "dict") {
      html = '<div class="card flash"><p class="eyebrow">Nghe và viết lại từ tiếng Anh</p><button class="btn dark speakbig" data-act="speak" type="button" aria-label="Nghe từ">🔊 Nghe</button>' +
        '<p class="muted" style="margin-top:12px">Gợi ý: ' + esc(it.w.vi) + (it.w.pos ? " (" + esc(it.w.pos) + ")" : "") + "</p>" +
        '<input class="input" id="fillIn" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Gõ từ vừa nghe…" style="margin-top:16px" ' + (s.answered ? 'disabled value="' + esc(s.picked) + '"' : "") + ">" +
        (s.answered ? '<div class="feedback ' + (s.lastOk ? "good" : "bad") + '"><b>' + (s.lastOk ? "Đúng rồi!" : "Chưa đúng. Đáp án: " + esc(it.answer)) + "</b><p>" + esc(it.explain) + '</p></div><div class="actions" style="justify-content:center"><button class="btn" data-act="next" type="button">Tiếp tục</button></div>'
                     : '<div class="actions" style="justify-content:center"><button class="btn" data-act="check" type="button">Kiểm tra</button></div>') + "</div>";
    } else {
      var qhtml = esc(it.q).replace(/___/g, '<span class="blank"></span>');
      var body = "";
      if (it.kind === "mc") {
        body = '<div class="opts">' + it.options.map(function (o, idx) {
          var cls = "";
          if (s.answered) { if (o === it.answer) cls = "right"; else if (idx === s.picked) cls = "wrong"; }
          return '<button class="opt ' + cls + '" data-act="pick" data-i="' + idx + '" type="button"' + (s.answered ? " disabled" : "") + ">" + esc(o) + "</button>";
        }).join("") + "</div>";
      } else {
        body = '<input class="input" id="fillIn" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Gõ đáp án…" ' + (s.answered ? 'disabled value="' + esc(s.picked) + '"' : "") + ">" +
          (s.answered ? "" : '<div class="actions"><button class="btn" data-act="check" type="button">Kiểm tra</button></div>');
      }
      var fb = "";
      if (s.answered) {
        fb = '<div class="feedback ' + (s.lastOk ? "good" : "bad") + '"><b>' + (s.lastOk ? "Đúng rồi!" : "Chưa đúng. Đáp án: " + esc(it.answer)) + "</b>" + (it.vi ? '<p class="fbvi"><span class="fbl">Dịch nghĩa</span> ' + esc(it.vi) + "</p>" : "") + "<p>" + (it.deep ? '<span class="fbl">Giải thích</span> ' + esc(it.deep) : esc(it.explain)) + "</p></div>" +
          '<div class="actions"><button class="btn" data-act="next" type="button">Tiếp tục</button><button class="link" data-act="report" type="button">Báo câu này sai</button></div>';
      }
      html = '<div class="card"><p class="eyebrow">' + (it.kind === "fill" ? "Điền vào chỗ trống" : "Chọn đáp án đúng") + '</p><div class="q">' + qhtml + "</div>" + (it.audio ? '<div style="text-align:center"><button class="btn dark speakbig" data-act="speak" type="button">🔊 Nghe</button></div>' : "") + body + fb + "</div>";
    }
    view.innerHTML = '<div class="session">' + sessionBar() + html + "</div>";
    var inp = $("#fillIn"); if (inp && !s.answered) { inp.focus(); inp.addEventListener("keydown", function (e) { if (e.key === "Enter") act("check"); }); }
    view.querySelectorAll("[data-act]").forEach(function (b) {
      b.addEventListener("click", function () { act(b.getAttribute("data-act"), b); });
    });
    if (s.answered) { var nb = view.querySelector('[data-act="next"]'); if (nb) nb.focus(); }
    if ((it.kind === "dict" || it.audio) && !s.answered && s.spoken !== s.i) { s.spoken = s.i; setTimeout(function () { speak(it.w.w); }, 200); }
  }
  function act(a, el) {
    var s = SESS; if (!s) return;
    var it = s.items[s.i];
    if (a === "speak") { speak(it.w.w); return; }
    if (a === "addrev") { forceReview(it.id); toast("Đã đưa từ này vào lịch ôn hôm nay."); renderNav(s.nav); return; }
    if (a === "flip") { s.flip = true; renderSession(); return; }
    if (a === "remember" || a === "forgot") {
      var ok = a === "remember"; recordCard(it.id, ok); if (ok) s.rem++; else s.forgot++;
      s.i++; s.flip = false; renderSession(); return;
    }
    if (a === "pick" && !s.answered) {
      var idx = Number(el.getAttribute("data-i")); s.picked = idx; s.answered = true; s.lastOk = it.options[idx] === it.answer;
      finishAnswer(it); return;
    }
    if (a === "check" && !s.answered) {
      var v = $("#fillIn").value; if (!norm(v)) { toast("Hãy gõ đáp án trước."); return; }
      s.picked = v; s.answered = true; s.lastOk = it.answers.some(function (x) { return norm(x) === norm(v); });
      finishAnswer(it); return;
    }
    if (a === "next") { s.i++; s.answered = false; s.picked = null; s.chosen = []; renderSession(); return; }
    if (a === "wpick" && !s.answered) { s.chosen.push(Number(el.getAttribute("data-i"))); renderSession(); return; }
    if (a === "wunpick" && !s.answered) { var wi = Number(el.getAttribute("data-i")); s.chosen = s.chosen.filter(function (x) { return x !== wi; }); renderSession(); return; }
    if (a === "wreset" && !s.answered) { s.chosen = []; renderSession(); return; }
    if (a === "wcheck" && !s.answered) {
      if (!s.chosen.length) { toast("Hãy chọn các từ trước."); return; }
      s.picked = s.chosen.map(function (i) { return it.words[i]; }).join(" "); s.answered = true; s.lastOk = norm(s.picked) === norm(it.target);
      finishAnswer(it); return;
    }
    if (a === "report") {
      S.reports.push({ id: it.id, at: new Date().toISOString() }); save(); toast("Đã ghi nhận câu này để kiểm tra lại.");
    }
  }
  function finishAnswer(it) {
    var s = SESS;
    if (it.plain) { var dd = day(today()); dd.done++; if (s.lastOk) { dd.correct++; S.xp += 10; } else dd.wrong++; checkBadges(); save(); }
    else if (!it.noRecord) recordAnswer(it.id, s.lastOk, it.tag);
    if (it.grp) { var gg = s.grp[it.grp] || (s.grp[it.grp] = { ok: 0, n: 0 }); gg.n++; if (s.lastOk) gg.ok++; }
    if (s.lastOk) s.ok++; else { s.bad++; s.wrong.push({ q: it.q, a: it.answer }); }
    if (it.topic) { var b = s.byTopic[it.topic] || (s.byTopic[it.topic] = { ok: 0, n: 0 }); b.n++; if (s.lastOk) b.ok++; }
    renderSession();
  }
  function finishSession() {
    var s = SESS, total = s.ok + s.bad, pct = total ? Math.round(s.ok / total * 100) : 0;
    if (s.onFinish && total) s.onFinish(pct, s);
    checkBadges(); save();
    var gained = S.xp - s.xp0;
    var html = '<div class="session"><div class="card result"><p class="eyebrow">Hoàn thành</p><h1>' + esc(s.title) + "</h1>" +
      (total ? '<div class="big">' + pct + '%<small> · ' + s.ok + "/" + total + " câu đúng</small></div>" : "") +
      (s.rem + s.forgot ? '<p class="muted">Thẻ từ: ' + s.rem + " đã nhớ, " + s.forgot + " chưa nhớ</p>" : "") +
      '<p class="muted">+' + gained + " XP · streak " + streak() + " ngày</p>" + (s.extra ? s.extra(s) : "") +
      (s.wrong.length ? '<h3 style="margin-top:18px">Cần xem lại</h3><ul class="wronglist">' + s.wrong.map(function (x) { return "<li>" + esc(x.q) + " → <b>" + esc(x.a) + "</b></li>"; }).join("") + "</ul>" : "") +
      '<div class="actions"><button class="btn" data-act="again" type="button">Làm lại</button><a class="btn ghost" href="' + s.exit + '">Quay lại danh sách</a><a class="btn ghost" href="#/">Tổng quan</a></div></div></div>';
    $("#view").innerHTML = html;
    var ag = $('[data-act="again"]'); if (ag) ag.addEventListener("click", function () { startSession(s.cfg); });
    renderNav(s.nav);
  }

  function viewGrammarQuiz(id, lvl) {
    var t = GR.filter(function (x) { return x.id === id; })[0]; if (!t) return viewNotFound();
    var lv = LV[lvl] ? lvl : "all"; // không chọn mức thì làm tất cả
    var qs = lv === "all" ? t.questions : t.questions.filter(function (q) { return q.lv === lv; });
    var gained = [], mixRes = {};
    var cfg = {
      title: t.title + (lv === "all" ? "" : " · mức " + LV[lv]), exit: "#/grammar/" + t.id, nav: "grammar",
      build: function () { return shuffle(qs).map(function (q) { var it = mkQuestion("g:" + t.id + ":" + q.id); it.grp = "lv:" + q.lv; return it; }); },
      onFinish: function (pct, s) {
        if (lv === "all") {
          var r = S.topics["g:" + t.id] || { best: 0, attempts: 0 };
          S.topics["g:" + t.id] = { last: pct, best: Math.max(r.best, pct), attempts: r.attempts + 1 };
          // làm trộn cả 3 mức: chấm riêng từng mức, mức nào đạt từ 80% thì được sao của mức đó
          var LA = S.lvl["g:" + t.id] || (S.lvl["g:" + t.id] = {}); gained = []; mixRes = {};
          ["e", "m", "h"].forEach(function (l) {
            var g = s.grp["lv:" + l]; if (!g || !g.n) return;
            var p = Math.round(g.ok / g.n * 100), b0 = LA[l] || 0;
            mixRes[l] = { ok: g.ok, n: g.n, p: p };
            LA[l] = Math.max(b0, p);
            if (b0 < 80 && p >= 80) gained.push(l);
          });
          if (gained.length) toast("Được thêm " + gained.length + " sao: " + gained.map(function (l) { return LV[l]; }).join(", ") + "!");
        } else {
          var L = S.lvl["g:" + t.id] || (S.lvl["g:" + t.id] = {}), before = L[lv] || 0;
          L[lv] = Math.max(before, pct);
          if (before < 80 && pct >= 80) toast("Được thêm 1 sao, mức " + LV[lv] + "!");
        }
      },
      extra: function () {
        if (lv === "all") {
          return '<div class="feedback ' + (gained.length ? "good" : "") + '"><b>Kết quả theo mức:</b> ' + ["e", "m", "h"].map(function (l) {
            var x = mixRes[l]; return x ? LV[l] + " " + x.ok + "/" + x.n + (x.p >= 80 ? " ✓" : " ✗") : "";
          }).filter(Boolean).join(" · ") + "<br>" + (gained.length ? "Được thêm sao ở mức: " + gained.map(function (l) { return LV[l]; }).join(", ") + "." : "Mỗi mức cần từ 80% để được sao. Sao đã có vẫn được giữ.") + "</div>" +
            '<div class="actions"><a class="btn ghost" href="#/grammar/' + t.id + '">Xem sao của bài</a></div>';
        }
        var nx = lv === "e" ? "m" : lv === "m" ? "h" : null;
        return (lvBest(t, lv) >= 80 ? '<div class="feedback good"><b>Đạt mức ' + LV[lv] + ".</b> Ngài được 1 sao." + (nx ? " Có thể thử mức " + LV[nx] + "." : "") + "</div>"
          : '<div class="feedback"><b>Chưa đạt 80%.</b> Xem lại phần lý thuyết rồi làm lại mức này.</div>') +
          (nx ? '<div class="actions"><a class="btn" href="#/grammar/' + t.id + "/quiz/" + nx + '">Làm mức ' + LV[nx] + "</a></div>" : "");
      }
    };
    cfg.cfg = cfg; startSession(cfg); return null;
  }
  var VMODES = { dict: ["vd", "nghe viết"], listen: ["vl", "nghe chọn từ"], cloze: ["vc", "điền chỗ trống"], type: ["vt", "nghĩa → gõ từ"] };
  function topicPool(tid) { var pool = []; VO.forEach(function (t) { if (t.id === tid) t.sets.forEach(function (s) { pool = pool.concat(s.words); }); }); return pool; }
  function mkListen(tid, w, pool) { // nghe rồi chọn từ; ưu tiên phương án gây nhiễu cùng chữ đầu, độ dài gần nhau
    var others = pool.filter(function (x) { return x.w !== w.w; }).map(function (x) {
      return [(x.w.charAt(0) === w.w.charAt(0) ? 2 : 0) + (Math.abs(x.w.length - w.w.length) <= 1 ? 1 : 0) + Math.random() * 1.5, x.w];
    }).sort(function (p, q) { return q[0] - p[0]; }).slice(0, 3).map(function (x) { return x[1]; });
    return { kind: "mc", audio: true, w: w, id: "v:" + tid + ":" + w.w, q: "Nghe và chọn từ bạn nghe được", options: shuffle(others.concat([w.w])), answer: w.w,
      explain: w.w + " " + w.ipa + " = " + w.vi + ". Ví dụ: " + w.ex + " (" + w.exVi + ")", tag: "tu-vung-" + tid };
  }
  function clozeForms(w) { // các dạng có thể xuất hiện trong câu ví dụ: số nhiều, -ed, -ing, bất quy tắc...
    var b = w.w.toLowerCase(), c = [b];
    if (/\s/.test(b)) return c;
    var y = b.slice(0, -1), dbl = /[^aeiou][aeiou][^aeiouwxy]$/.test(b) ? b + b.slice(-1) : null;
    c.push(b + "s", b + "es", b + "ed", b + "d", b + "ing", b + "ly", b + "er", b + "est");
    if (/y$/.test(b)) c.push(y + "ies", y + "ied", y + "ier", y + "iest", y + "ily");
    if (/e$/.test(b)) c.push(y + "ing", y + "ier");
    if (dbl) c.push(dbl + "ed", dbl + "ing", dbl + "er", dbl + "est");
    var f = verbForms(w);
    if (f) f.v2.split(" / ").concat(f.v3.split(" / ")).forEach(function (x) { if (c.indexOf(x) < 0) c.push(x); });
    return c;
  }
  function mkCloze(tid, w) { // điền từ vào chỗ trống của câu ví dụ; bỏ qua từ mà câu ví dụ không chứa từ đó
    if (!w.ex) return null;
    var alts = clozeForms(w).sort(function (p, q) { return q.length - p.length; }).map(function (x) { return x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
    var m = new RegExp("\\b(" + alts.join("|") + ")\\b", "i").exec(w.ex); if (!m) return null;
    var surf = m[0], blank = w.ex.slice(0, m.index) + "___" + w.ex.slice(m.index + surf.length);
    return { kind: "fill", id: "v:" + tid + ":" + w.w, q: blank + "   [" + w.vi + (surf.toLowerCase() === w.w.toLowerCase() ? "" : " · từ gốc: " + w.w) + "]", answer: surf, answers: [surf],
      explain: w.ex + " (" + w.exVi + ")", tag: "tu-vung-" + tid };
  }
  function mkTypeWord(tid, w, pool) { // thấy nghĩa tiếng Việt, gõ từ tiếng Anh; chấp nhận mọi từ cùng nghĩa trong chủ đề
    var same = pool.filter(function (x) { return x.vi === w.vi; }).map(function (x) { return x.w; });
    return { kind: "fill", id: "v:" + tid + ":" + w.w, q: "Gõ từ tiếng Anh có nghĩa: “" + w.vi + "” (" + w.pos + "; bắt đầu bằng chữ " + w.w.charAt(0).toUpperCase() + ", " + w.w.length + " ký tự) ___", answer: w.w, answers: same,
      explain: w.w + " " + w.ipa + " = " + w.vi + ". Ví dụ: " + w.ex + " (" + w.exVi + ")", tag: "tu-vung-" + tid };
  }
  function viewVocabSet(tid, sid, mode) {
    var t = VO.filter(function (x) { return x.id === tid; })[0];
    var set = t && t.sets.filter(function (x) { return x.id === sid; })[0]; if (!set) return viewNotFound();
    var vm = VMODES[mode], dict = mode === "dict";
    var cfg = {
      title: t.title + " · " + set.title + (vm ? " · " + vm[1] : ""), exit: "#/vocab/" + t.id, nav: "vocab",
      build: function () {
        var pool = topicPool(t.id);
        if (dict) return shuffle(set.words).map(function (w) { return mkDict("v:" + t.id + ":" + w.w); });
        if (mode === "listen") return shuffle(set.words).map(function (w) { return mkListen(t.id, w, pool); });
        if (mode === "cloze") return shuffle(set.words).map(function (w) { return mkCloze(t.id, w); }).filter(Boolean);
        if (mode === "type") return shuffle(set.words).map(function (w) { return mkTypeWord(t.id, w, pool); });
        var words = shuffle(set.words);
        return words.map(function (w) { return mkCard("v:" + t.id + ":" + w.w); }).concat(mkVocabQuiz(t.id, set.words));
      },
      onFinish: function (pct) {
        var key = (vm ? vm[0] : "vs") + ":" + t.id + ":" + set.id, r = S.topics[key] || { best: 0, attempts: 0 };
        S.topics[key] = { last: pct, best: Math.max(r.best, pct), attempts: r.attempts + 1 };
      }
    };
    cfg.cfg = cfg; startSession(cfg); return null;
  }

  /* ---------- Ôn tổng hợp, sắp xếp câu, đối chiếu sách, phụ lục ---------- */
  function viewGrammarMix(level) {
    var lv = RANK[level] ? level : "all", ids = [];
    GR.forEach(function (t) { if (lv === "all" || t.cefr === lv) t.questions.forEach(function (q) { ids.push("g:" + t.id + ":" + q.id); }); });
    var cfg = {
      title: "Ôn tổng hợp ngữ pháp" + (lv === "all" ? "" : " " + lv), exit: "#/grammar", nav: "grammar",
      build: function () { return shuffle(ids).slice(0, 20).map(function (id) { var it = mkQuestion(id); it.topic = Q[id].gid; return it; }); },
      extra: function (s) {
        var weak = Object.keys(s.byTopic).filter(function (k) { return s.byTopic[k].ok < s.byTopic[k].n; });
        if (!weak.length) return "";
        return '<div class="feedback"><b>Nên xem lại các bài:</b><div class="actions" style="margin-top:8px">' + weak.map(function (k) {
          var t = GR.filter(function (x) { return x.id === k; })[0]; return t ? '<a class="btn ghost small" href="#/grammar/' + t.id + '">' + esc(t.title) + "</a>" : "";
        }).join("") + "</div></div>";
      }
    };
    cfg.cfg = cfg; startSession(cfg); return null;
  }
  function orderSentences(t) { // lấy câu ví dụ ngắn, một câu, trong bài học để luyện sắp xếp
    var out = [], seen = {};
    var add = function (en, vi) {
      if (!en || !vi || seen[en]) return;
      if (/[\u2192\/\u2014"]|^'|'\s*'|\.\s+[A-Z]/.test(en) || !/[.?!]$/.test(en)) return;
      var n = en.split(" ").length; if (n < 3 || n > 10) return;
      seen[en] = 1; out.push({ en: en, vi: String(vi).replace(/\s*\(.*\)\s*$/, "") });
    };
    t.sections.forEach(function (sc) { sc.examples.forEach(function (e) { add(e.en, e.vi); }); });
    (t.walk || []).forEach(function (e) { add(e.en, e.vi); });
    return out;
  }
  function viewGrammarOrder(id) {
    var t = GR.filter(function (x) { return x.id === id; })[0]; if (!t) return viewNotFound();
    var pool = orderSentences(t);
    if (pool.length < 3) return '<div class="card empty" style="max-width:560px;margin:20px auto"><h1>Chưa có đủ câu để luyện</h1><p class="muted">Bài này chưa có đủ câu ví dụ ngắn.</p><div class="actions" style="justify-content:center"><a class="btn" href="#/grammar/' + t.id + '">Về bài học</a></div></div>';
    var cfg = {
      title: t.title + " · sắp xếp câu", exit: "#/grammar/" + t.id, nav: "grammar",
      build: function () {
        return shuffle(pool).slice(0, 10).map(function (e, i) {
          var target = e.en.replace(/[.?!]$/, ""), words = target.split(" ");
          var order = shuffle(words.map(function (x, k) { return k; }));
          return { kind: "order", plain: true, id: "o:" + t.id + ":" + i, q: e.vi, answer: e.en, target: target, words: order.map(function (k) { return words[k]; }) };
        });
      }
    };
    cfg.cfg = cfg; startSession(cfg); return null;
  }
  function viewBook() {
    var rows = (window.BOOK_UNITS || []).map(function (u) {
      var t = GR.filter(function (x) { return x.id === u[2]; })[0]; if (!t) return "";
      return '<a class="bookrow" href="#/grammar/' + t.id + '" data-q="' + esc((u[0] + " " + u[1] + " " + t.title).toLowerCase()) + '"><span class="bu">' + u[0] + '</span><span class="bt">' + esc(u[1]) + '</span><span class="bg">' + esc(t.title) + "</span>" + pill(gStatus(t)) + "</a>";
    }).join("");
    return '<div class="lesson"><a class="back" href="#/grammar">← Ngữ pháp</a><h1>Đối chiếu sách Murphy</h1><p class="muted">Sách <i>Essential Grammar in Use</i> (Elementary) có 115 unit. Bảng dưới cho biết mỗi unit được dạy ở bài nào trong app. Nội dung trong app được viết lại bằng tiếng Việt, theo cách học thống nhất của app.</p>' +
      '<input class="input" id="bookFilter" placeholder="Lọc: gõ số unit hoặc từ khóa (ví dụ 29, might, passive)…" style="margin:12px 0"><div class="card sec bookbox">' + rows + "</div></div>";
  }
  function bindBook() {
    var f = $("#bookFilter"); if (!f) return;
    f.addEventListener("input", function () {
      var q = f.value.trim().toLowerCase();
      document.querySelectorAll(".bookrow").forEach(function (r) { r.style.display = !q || r.getAttribute("data-q").indexOf(q) >= 0 ? "" : "none"; });
    });
  }
  function viewAppendix() {
    var A = window.APPENDIX || {}, add = function (en, vi) { return '<button class="addrev" type="button" data-f="' + esc(en) + '" data-b="' + esc(vi) + '">+ Ôn tập</button>'; };
    var irr = (A.irregular || []).map(function (g) {
      return '<h3 style="margin-top:16px">' + esc(g.title) + '</h3><table class="t"><thead><tr><th>V1</th><th>V2</th><th>V3</th></tr></thead><tbody>' +
        g.rows.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>"; }).join("") + "</tbody></table>";
    }).join("");
    var sf = A.shortForms || { rows: [], notes: [] };
    var short = '<p>' + esc(sf.intro || "") + '</p><table class="t"><thead><tr><th>Đầy đủ</th><th>Viết tắt</th></tr></thead><tbody>' + sf.rows.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td></tr>"; }).join("") + "</tbody></table>" +
      "<ul>" + sf.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>";
    var sp = (A.spelling || []).map(function (x) { return '<h3 style="margin-top:14px">' + esc(x.title) + "</h3><p>" + esc(x.body) + "</p>"; }).join("");
    var ph = (A.phrasal || []).map(function (g) {
      return '<h3 style="margin-top:16px">' + esc(g.title) + '</h3><ul class="ex">' + g.rows.map(function (r) { return "<li><div><b>" + esc(r[0]) + " — " + esc(r[1]) + "</b><span>" + esc(r[2]) + "</span></div>" + add(r[0] + " (" + r[2] + ")", r[1]) + "</li>"; }).join("") + "</ul>";
    }).join("");
    return '<div class="lesson"><a class="back" href="#/grammar">← Ngữ pháp</a><h1>Phụ lục tra cứu</h1><p class="muted">Bảng tra nhanh: động từ bất quy tắc, viết tắt, chính tả, cụm động từ.</p>' +
      '<div class="card sec"><h2>Động từ bất quy tắc theo nhóm</h2><p class="muted">Học theo nhóm có chung quy luật sẽ dễ nhớ hơn học theo thứ tự chữ cái.</p>' + irr + "</div>" +
      '<div class="card sec"><h2>Dạng viết tắt</h2>' + short + "</div>" +
      '<div class="card sec"><h2>Quy tắc chính tả</h2>' + sp + "</div>" +
      '<div class="card sec"><h2>Cụm động từ thông dụng</h2><p class="muted">Bấm + Ôn tập để đưa cụm vào lịch ôn.</p>' + ph + "</div></div>";
  }

  /* ---------- Mẫu câu giao tiếp theo tình huống ---------- */
  function phTopic(tid) { return PHR.filter(function (x) { return x.id === tid; })[0]; }
  function phIds(t) { return t.items.map(function (r, i) { return "p:" + t.id + ":" + i; }); }
  function viewPhraseList() {
    return '<h1 style="margin-top:12px">Mẫu câu giao tiếp</h1><p class="muted">Học câu nói theo tình huống thật: nghe, nhớ, rồi tự nói thành tiếng. Mỗi tình huống có ' + (PHR[0] ? PHR[0].items.length : 12) + ' câu.</p><div class="topics">' + PHR.map(function (t) {
      var seen = phIds(t).filter(function (id) { return S.srs[id]; }).length, r = S.topics["ph:" + t.id];
      return '<div class="card topic"><span class="cefr small">' + t.cefr + "</span><h2>" + esc(t.title) + '</h2><p class="muted">' + esc(t.summary) + " · " + t.items.length + " câu</p>" +
        (seen ? '<p class="muted" style="margin-top:8px">Đã học ' + seen + "/" + t.items.length + (r ? " · kiểm tra gần nhất " + r.last + "%" : "") + "</p>" : "") +
        '<div class="actions"><a class="btn" href="#/phrases/' + t.id + '">Mở tình huống</a></div></div>';
    }).join("") + "</div>";
  }
  function viewPhraseTopic(tid) {
    var t = phTopic(tid); if (!t) return viewNotFound();
    var b = "#/phrases/" + t.id + "/";
    return '<div class="lesson"><a class="back" href="#/phrases">← Mẫu câu</a><h1>' + esc(t.title) + ' <span class="cefr">' + t.cefr + '</span></h1><p class="muted">' + esc(t.summary) + "</p>" +
      '<div class="card sec"><div class="actions" style="margin:0 0 8px"><a class="btn" href="' + b + 'learn">Học thẻ rồi kiểm tra</a><a class="btn ghost" href="' + b + 'quiz">Chọn câu tiếng Anh</a><a class="btn ghost" href="' + b + 'listen">Nghe chọn nghĩa</a><button class="btn ghost" type="button" data-queue="' + t.id + '">Đưa cả bộ vào lịch ôn</button></div>' +
      '<ul class="ex">' + t.items.map(function (r) { return "<li><div><b>" + esc(r[0]) + "</b><span>" + esc(r[1]) + '</span></div><button class="addrev" type="button" data-say="' + esc(r[0]) + '">🔊 Nghe</button></li>'; }).join("") + "</ul></div></div>";
  }
  function bindPhrases() {
    document.querySelectorAll("[data-say]").forEach(function (b) { b.addEventListener("click", function () { speak(b.getAttribute("data-say")); }); });
    var q = $("[data-queue]");
    if (q) q.addEventListener("click", function () { var t = phTopic(q.getAttribute("data-queue")); phIds(t).forEach(function (id) { forceReview(id); }); toast("Đã đưa " + t.items.length + " câu vào lịch ôn hôm nay."); renderNav("phrases"); });
  }
  function mkPhQuiz(t, i) {
    var r = t.items[i], others = shuffle(t.items.filter(function (x, j) { return j !== i; })).slice(0, 3).map(function (x) { return x[0]; });
    return { kind: "mc", id: "p:" + t.id + ":" + i, q: "Nói câu nào bằng tiếng Anh? “" + r[1] + "”", options: shuffle(others.concat([r[0]])), answer: r[0], explain: r[0] + " = " + r[1], tag: "mau-cau-" + t.id };
  }
  function mkPhListen(t, i) {
    var r = t.items[i], others = shuffle(t.items.filter(function (x, j) { return j !== i; })).slice(0, 3).map(function (x) { return x[1]; });
    return { kind: "mc", audio: true, w: { w: r[0] }, id: "p:" + t.id + ":" + i, q: "Nghe câu rồi chọn nghĩa đúng", options: shuffle(others.concat([r[1]])), answer: r[1], explain: r[0] + " = " + r[1], tag: "mau-cau-" + t.id };
  }
  function viewPhraseSession(tid, mode) {
    var t = phTopic(tid); if (!t) return viewNotFound();
    var names = { learn: "học thẻ và kiểm tra", cards: "học thẻ", quiz: "chọn câu tiếng Anh", listen: "nghe chọn nghĩa" };
    if (!names[mode]) mode = "learn";
    var cfg = {
      title: t.title + " · " + names[mode], exit: "#/phrases/" + t.id, nav: "phrases",
      build: function () {
        var ix = shuffle(t.items.map(function (r, i) { return i; })), out = [];
        if (mode === "learn" || mode === "cards") out = out.concat(ix.map(function (i) { return mkCard("p:" + t.id + ":" + i); }));
        if (mode === "learn") out = out.concat(shuffle(ix).slice(0, 8).map(function (i) { return mkPhQuiz(t, i); }));
        if (mode === "quiz") out = shuffle(ix).map(function (i) { return mkPhQuiz(t, i); });
        if (mode === "listen") out = shuffle(ix).map(function (i) { return mkPhListen(t, i); });
        return out;
      },
      onFinish: function (pct) { var r = S.topics["ph:" + t.id] || { best: 0, attempts: 0 }; S.topics["ph:" + t.id] = { last: pct, best: Math.max(r.best, pct), attempts: r.attempts + 1 }; }
    };
    cfg.cfg = cfg; startSession(cfg); return null;
  }

  /* ---------- Màn hình: Ôn tập ---------- */
  function viewReview(go) {
    var ids = dueIds();
    if (go && ids.length) {
      var cfg = {
        title: "Ôn tập hôm nay", exit: "#/review", nav: "review",
        build: function () {
          return shuffle(dueIds()).slice(0, 20).map(function (id) { return id.charAt(0) === "g" ? mkQuestion(id) : mkCard(id); });
        }
      };
      cfg.cfg = cfg; startSession(cfg); return null;
    }
    var g = ids.filter(function (i) { return i.charAt(0) === "g"; }).length, v = ids.length - g;
    if (!ids.length) {
      var total = Object.keys(S.srs).length;
      return '<div class="card empty" style="max-width:640px;margin:20px auto"><h1>Hôm nay không có gì cần ôn</h1><p class="muted" style="margin-top:8px">' +
        (total ? "Các mục đã học sẽ tự quay lại đúng ngày cần ôn." : "Hãy học một bài ngữ pháp hoặc một bộ từ vựng trước, app sẽ tự xếp lịch ôn.") +
        '</p><div class="actions" style="justify-content:center"><a class="btn" href="#/grammar">Ngữ pháp</a><a class="btn ghost" href="#/vocab">Từ vựng</a></div></div>';
    }
    return '<div class="card" style="max-width:640px;margin:20px auto"><p class="eyebrow">Hôm nay cần ôn</p><div class="big">' + ids.length + '<small> mục</small></div><p class="muted">' + g + " câu ngữ pháp · " + v +
      ' thẻ từ vựng và thẻ riêng. Mỗi lượt tối đa 20 mục.</p><div class="actions"><a class="btn" href="#/review/go">Bắt đầu ôn</a></div></div>';
  }

  /* ---------- Bộ thẻ riêng ---------- */
  function deckCard() {
    var n = Object.keys(S.deck).length;
    return '<div class="card" style="max-width:640px;margin:16px auto"><p class="eyebrow">Bộ thẻ của tôi</p><p class="muted">' +
      (n ? n + " thẻ, tự thêm bằng nút + Ôn tập hoặc tự tạo." : "Chưa có thẻ. Bấm + Ôn tập ở ví dụ trong bài học, hoặc tự tạo bộ thẻ bằng cách nhập hay dán danh sách.") +
      '</p><div class="actions"><a class="btn" href="#/deck">+ Tạo bộ thẻ</a>' + (n ? '<a class="btn ghost" href="#/deck">Quản lý (' + n + ")</a>" : "") + "</div></div>";
  }
  function parseDeckLines(text) {
    var seps = ["\t", " | ", "|", " - ", " – ", " — ", ";", ","], out = [], skipped = 0;
    String(text).split(/\r?\n/).forEach(function (line) {
      line = line.trim(); if (!line) return;
      for (var i = 0; i < seps.length; i++) {
        var p = line.indexOf(seps[i]);
        if (p > 0 && line.slice(p + seps[i].length).trim()) { out.push([line.slice(0, p).trim(), line.slice(p + seps[i].length).trim()]); return; }
      }
      skipped++;
    });
    return { rows: out, skipped: skipped };
  }
  function viewDeck() {
    var ids = Object.keys(S.deck);
    return '<div class="lesson"><a class="back" href="#/review">← Ôn tập</a><h1>Bộ thẻ của tôi</h1><p class="muted">Thẻ ở đây được xếp lịch ôn như các mục khác. Mặt trước là tiếng Anh, mặt sau là nghĩa.</p>' +
      '<div class="card sec"><h2>Thêm một thẻ</h2><div class="deckform"><input class="input" id="dkF" placeholder="Mặt trước, ví dụ: take care of"><input class="input" id="dkB" placeholder="Mặt sau, ví dụ: chăm sóc"><button class="btn" id="dkAdd" type="button">Thêm thẻ</button></div></div>' +
      '<div class="card sec"><h2>Dán danh sách</h2><p class="muted">Mỗi dòng một thẻ. Ngăn cách bằng dấu Tab, |, dấu gạch ngang có khoảng trắng, dấu chấm phẩy hoặc dấu phẩy. Dán thẳng từ Word, Excel hay Google Docs đều được.</p>' +
        '<textarea class="input" id="dkPaste" rows="6" placeholder="apple - quả táo&#10;to be - thì, là, ở"></textarea><div class="actions"><button class="btn" id="dkImp" type="button">Nhập danh sách</button></div></div>' +
      '<div class="card sec"><h2>Các thẻ hiện có (' + ids.length + ")</h2>" + (ids.length ? ids.map(function (id) {
        var d = S.deck[id];
        return '<div class="sethead"><div><b>' + esc(d.f) + '</b><div class="muted">' + esc(d.b) + '</div></div><div class="actions" style="margin:0"><button class="btn small ghost" data-sp="' + esc(id) + '" type="button">Nghe</button><button class="btn small ghost" data-del="' + esc(id) + '" type="button">Xóa</button></div></div>';
      }).join("") : '<p class="muted">Chưa có thẻ nào.</p>') + "</div></div>";
  }
  function bindDeck() {
    var refresh = function () { $("#view").innerHTML = viewDeck(); bindDeck(); renderNav("review"); };
    $("#dkAdd").addEventListener("click", function () {
      var ok = addDeck($("#dkF").value, $("#dkB").value);
      if (!ok) { toast($("#dkF").value.trim() && $("#dkB").value.trim() ? "Thẻ này đã có." : "Hãy điền cả hai mặt của thẻ."); return; }
      toast("Đã thêm thẻ."); refresh();
    });
    $("#dkImp").addEventListener("click", function () {
      var r = parseDeckLines($("#dkPaste").value), added = 0, dup = 0;
      r.rows.forEach(function (x) { if (addDeck(x[0], x[1])) added++; else dup++; });
      if (!added && !dup && !r.skipped) { toast("Chưa có dòng nào để nhập."); return; }
      toast("Đã thêm " + added + " thẻ" + (dup ? ", bỏ qua " + dup + " thẻ trùng" : "") + (r.skipped ? ", " + r.skipped + " dòng thiếu dấu ngăn cách" : "") + "."); refresh();
    });
    document.querySelectorAll("[data-sp]").forEach(function (b) { b.addEventListener("click", function () { var d = S.deck[b.getAttribute("data-sp")]; if (d) speak(d.f); }); });
    document.querySelectorAll("[data-del]").forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-del");
        if (!confirm("Xóa thẻ này khỏi bộ thẻ?")) return;
        delete S.deck[id]; delete S.srs[id]; save(); refresh();
      });
    });
  }

  /* ---------- Sổ tay: tra từ trong kho 1.000 từ và ghi chú ---------- */
  var plain = function (s) { return norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d"); };

  /* ---------- Dạng động từ V1 / V2 / V3 ---------- */
  var IRR = {};
  ("awake:awoke:awoken;be:was / were:been;bear:bore:borne;beat:beat:beaten;become:became:become;begin:began:begun;bend:bent:bent;bet:bet:bet;bite:bit:bitten;bleed:bled:bled;blow:blew:blown;break:broke:broken;bring:brought:brought;build:built:built;burn:burned / burnt:burned / burnt;burst:burst:burst;buy:bought:bought;catch:caught:caught;choose:chose:chosen;come:came:come;cost:cost:cost;cut:cut:cut;deal:dealt:dealt;dig:dug:dug;do:did:done;draw:drew:drawn;dream:dreamed / dreamt:dreamed / dreamt;drink:drank:drunk;drive:drove:driven;eat:ate:eaten;fall:fell:fallen;feed:fed:fed;feel:felt:felt;fight:fought:fought;find:found:found;fly:flew:flown;forbid:forbade:forbidden;forget:forgot:forgotten;forgive:forgave:forgiven;freeze:froze:frozen;get:got:got / gotten;give:gave:given;go:went:gone;grow:grew:grown;hang:hung:hung;have:had:had;hear:heard:heard;hide:hid:hidden;hit:hit:hit;hold:held:held;hurt:hurt:hurt;keep:kept:kept;know:knew:known;lay:laid:laid;lead:led:led;learn:learned / learnt:learned / learnt;leave:left:left;lend:lent:lent;let:let:let;lie:lay:lain;light:lit:lit;lose:lost:lost;make:made:made;mean:meant:meant;meet:met:met;pay:paid:paid;put:put:put;quit:quit:quit;read:read:read;ride:rode:ridden;ring:rang:rung;rise:rose:risen;run:ran:run;say:said:said;see:saw:seen;seek:sought:sought;sell:sold:sold;send:sent:sent;set:set:set;shake:shook:shaken;shine:shone:shone;shoot:shot:shot;show:showed:shown;shut:shut:shut;sing:sang:sung;sink:sank:sunk;sit:sat:sat;sleep:slept:slept;slide:slid:slid;speak:spoke:spoken;spell:spelled / spelt:spelled / spelt;spend:spent:spent;spill:spilled / spilt:spilled / spilt;spread:spread:spread;stand:stood:stood;steal:stole:stolen;stick:stuck:stuck;sting:stung:stung;strike:struck:struck;swear:swore:sworn;sweep:swept:swept;swim:swam:swum;swing:swung:swung;take:took:taken;teach:taught:taught;tear:tore:torn;tell:told:told;think:thought:thought;throw:threw:thrown;understand:understood:understood;wake:woke:woken;wear:wore:worn;weep:wept:wept;win:won:won;wind:wound:wound;write:wrote:written;" +
    "overcome:overcame:overcome;overtake:overtook:overtaken;oversleep:overslept:overslept;overhear:overheard:overheard;overdo:overdid:overdone;undertake:undertook:undertaken;undergo:underwent:undergone;undo:undid:undone;withdraw:withdrew:withdrawn;withhold:withheld:withheld;withstand:withstood:withstood;mistake:mistook:mistaken;mislead:misled:misled;misunderstand:misunderstood:misunderstood;rebuild:rebuilt:rebuilt;rewrite:rewrote:rewritten;retell:retold:retold;rethink:rethought:rethought;redo:redid:redone;remake:remade:remade;reread:reread:reread;rerun:reran:rerun;reset:reset:reset;retake:retook:retaken;outgrow:outgrew:outgrown;outdo:outdid:outdone;outrun:outran:outrun;upset:upset:upset;uphold:upheld:upheld;foresee:foresaw:foreseen;forecast:forecast:forecast;fit:fitted / fit:fitted / fit;broadcast:broadcast:broadcast;offset:offset:offset;input:input:input;shed:shed:shed;split:split:split;thrust:thrust:thrust;lean:leaned / leant:leaned / leant;leap:leaped / leapt:leaped / leapt;kneel:knelt:knelt;bind:bound:bound;breed:bred:bred;cast:cast:cast;creep:crept:crept;flee:fled:fled;fling:flung:flung;grind:ground:ground;mow:mowed:mown;prove:proved:proven;saw:sawed:sawn;sew:sewed:sewn;shrink:shrank:shrunk;sow:sowed:sown;spin:spun:spun;spit:spat:spat;stink:stank:stunk;strive:strove:striven;swell:swelled:swollen;wring:wrung:wrung").split(";").forEach(function (r) {
    var a = r.split(":"); if (a.length === 3) IRR[a[0]] = [a[1], a[2]];
  });
  var DBL = { admit: 1, commit: 1, control: 1, occur: 1, prefer: 1, refer: 1, regret: 1, permit: 1, submit: 1, transfer: 1, equip: 1, omit: 1, expel: 1, rebel: 1, patrol: 1, compel: 1, forbid: 1 };
  var OV = { backup: "backed up", travel: "traveled / travelled", cancel: "canceled / cancelled", model: "modeled / modelled" };
  function regEd(v) {
    if (OV[v]) return OV[v];
    if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + "ied";
    if (/e$/.test(v)) return v + "d";
    if (/c$/.test(v)) return v + "ked";
    var syl = (v.match(/[aeiouy]+/g) || []).length;
    if (/[^aeiou][aeiou][^aeiouwxy]$/.test(v) && (syl === 1 || DBL[v])) return v + v.slice(-1) + "ed";
    return v + "ed";
  }
  function verbForms(w) {
    if (!w || w.pos !== "động từ" || /\s/.test(w.w)) return null;
    var v = w.w.toLowerCase();
    if (IRR[v]) { var f = IRR[v]; return { v1: v, v2: f[0], v3: f[1], irr: true }; }
    var e = regEd(v); return { v1: v, v2: e, v3: e, irr: false };
  }
  function irrLookup(q) {
    var out = [];
    Object.keys(IRR).forEach(function (k) { var f = IRR[k]; if (f[0].split(" / ").indexOf(q) >= 0 || f[1].split(" / ").indexOf(q) >= 0) out.push(k); });
    return out;
  }
  function formsHtml(w) {
    var f = verbForms(w); if (!f) return "";
    return '<div class="vf"><span><i>V1</i>' + esc(f.v1) + "</span><span><i>V2</i>" + esc(f.v2) + "</span><span><i>V3</i>" + esc(f.v3) + '</span><em class="' + (f.irr ? "irr" : "reg") + '">' + (f.irr ? "Bất quy tắc" : "Có quy tắc (thêm -ed)") + "</em></div>";
  }
  function noteSearch(q) {
    q = plain(q); if (!q) return [];
    var hits = [];
    Object.keys(W).forEach(function (id) {
      var w = W[id], a = plain(w.w), b = plain(w.vi), sc = 0;
      if (a === q) sc = 3; else if (a.indexOf(q) === 0) sc = 2; else if (a.indexOf(q) >= 0 || b.indexOf(q) >= 0) sc = 1;
      if (sc) hits.push([sc, id]);
    });
    var inf = irrLookup(q);
    if (inf.length) Object.keys(W).forEach(function (id) { var w = W[id]; if (w.pos === "động từ" && inf.indexOf(w.w.toLowerCase()) >= 0 && !hits.some(function (h) { return h[1] === id; })) hits.push([2, id]); });
    return hits.sort(function (x, y) { return y[0] - x[0]; }).slice(0, 6).map(function (x) { return x[1]; });
  }
  function initNotebook() {
    var panel = $("#notePanel"), btn = $("#noteBtn"), timer;
    panel.innerHTML = '<div class="nphead"><b>Sổ tay</b><button class="link" id="noteClose" type="button">Đóng</button></div>' +
      '<label class="lbl" for="noteQ">Tra từ (kho ' + Object.keys(W).length.toLocaleString("vi-VN") + ' từ của app)</label>' +
      '<input class="input" id="noteQ" placeholder="Gõ từ tiếng Anh hoặc nghĩa tiếng Việt" autocomplete="off" autocapitalize="none" spellcheck="false"><div id="noteRes"></div>' +
      '<label class="lbl" for="noteTa" style="margin-top:12px;display:block">Ghi chú của Ngài</label><textarea class="input" id="noteTa" rows="5" placeholder="Ghi từ mới, mẹo, câu hay…"></textarea><p class="muted" style="font-size:12px;margin-top:4px">Lưu tự động trên thiết bị này.</p>';
    $("#noteTa").value = S.notes || "";
    var open = function (on) { panel.hidden = !on; btn.setAttribute("aria-expanded", on); if (on) { $("#noteQ").focus(); } };
    btn.addEventListener("click", function () { open(panel.hidden); });
    $("#noteClose").addEventListener("click", function () { open(false); btn.focus(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) open(false); });
    $("#noteTa").addEventListener("input", function (e) { clearTimeout(timer); var v = e.target.value; timer = setTimeout(function () { S.notes = v; save(); }, 400); });
    $("#noteQ").addEventListener("input", function (e) {
      var ids = noteSearch(e.target.value), box = $("#noteRes");
      box.innerHTML = !e.target.value.trim() ? "" : ids.length ? ids.map(function (id) {
        var w = W[id];
        return '<div class="nres"><div><b>' + esc(w.w) + "</b> <span class=\"muted\">" + esc(w.ipa) + " · " + esc(w.pos) + (w.cefr ? " · " + w.cefr : "") + "</span><div>" + esc(w.vi) + "</div>" + formsHtml(w) + '<div class="muted" style="font-size:13px">' + esc(w.ex) + '</div></div><div class="nbtn"><button class="btn small ghost" data-nsp="' + esc(id) + '" type="button">Nghe</button><button class="btn small ghost" data-nad="' + esc(id) + '" type="button">+ Ôn tập</button></div></div>';
      }).join("") : "";
      var qq = plain(e.target.value), shown = {};
      ids.forEach(function (id) { shown[W[id].w.toLowerCase()] = 1; });
      var bases = irrLookup(qq); if (IRR[qq] && bases.indexOf(qq) < 0) bases.push(qq);
      var extra = bases.filter(function (k) { return !shown[k]; }).slice(0, 3).map(function (k) {
        return '<div class="nres"><div><b>' + esc(k) + '</b> <span class="muted">động từ bất quy tắc</span>' + formsHtml({ w: k, pos: "động từ" }) + "</div></div>";
      }).join("");
      if (e.target.value.trim()) { box.innerHTML += extra; if (!ids.length && !extra) box.innerHTML = '<p class="muted" style="margin-top:8px">Không có trong kho từ của app.</p>'; }
    });
    $("#noteRes").addEventListener("click", function (e) {
      var s = e.target.closest ? e.target.closest("[data-nsp]") : null, a = e.target.closest ? e.target.closest("[data-nad]") : null;
      if (s && W[s.getAttribute("data-nsp")]) speak(W[s.getAttribute("data-nsp")].w);
      if (a) { forceReview(a.getAttribute("data-nad")); toast("Đã đưa từ này vào lịch ôn hôm nay."); renderNav(currentSec); }
    });
  }

  /* ---------- Màn hình: Cài đặt, sao lưu ---------- */
  function viewSettings() {
    var th = currentTheme();
    return '<div class="settings"><h1 style="margin-top:12px">Cài đặt</h1>' +
      '<div class="card"><h2>Giọng đọc tiếng Anh</h2><p class="muted">Bấm vào một giọng để chọn và nghe thử ngay. Ưu tiên giọng Anh-Mỹ.</p>' +
        '<p class="muted" id="voiceNow" style="margin-top:6px"></p><div class="vlist" id="voiceList" role="radiogroup" aria-label="Giọng đọc tiếng Anh"></div><p class="muted" id="voiceNote" style="margin-top:8px"></p></div>' +
      '<div class="card"><h2>Mục tiêu mỗi ngày</h2><p class="muted">Số câu hoặc thẻ cần làm để tính là đã học trong ngày (giữ streak).</p>' +
        '<div class="field"><span>Số mục mỗi ngày</span><input class="input" id="goalIn" type="number" min="3" max="100" value="' + S.goal + '"></div></div>' +
      '<div class="card"><h2>Giao diện</h2><div class="field"><span>Chế độ</span><div class="seg"><button data-theme="light" class="' + (th === "light" ? "on" : "") + '" type="button">Sáng</button><button data-theme="dark" class="' + (th === "dark" ? "on" : "") + '" type="button">Tối</button></div></div>' +
        '<p class="muted" style="margin-top:8px">Mặc định theo cài đặt của thiết bị; khi Ngài tự chọn, app sẽ nhớ.</p></div>' +
      '<div class="card" id="syncBox"></div>' +
      '<div class="card"><h2>Sao lưu tiến độ</h2><p class="muted">Xuất file để lưu một bản dự phòng ngoài đám mây, hoặc chuyển sang máy khác khi chưa bật đồng bộ.</p>' +
        '<div class="actions"><button class="btn" id="exp" type="button">Xuất file sao lưu</button><label class="btn ghost" style="cursor:pointer">Nhập file<input id="imp" type="file" accept="application/json" hidden></label></div></div>' +
      '<div class="card"><h2>Câu bị báo sai</h2><p class="muted">Đã ghi nhận ' + S.reports.length + ' câu. Danh sách này nằm trong file sao lưu để Đầy tớ xem lại và sửa nội dung.</p></div>' +
      '<div class="card"><h2>Xóa tiến độ</h2><p class="muted">Xóa toàn bộ tiến độ trên thiết bị này. Nên xuất file sao lưu trước.</p><div class="actions"><button class="btn ghost" id="reset" type="button">Xóa tiến độ…</button></div></div>' +
      '<div class="card"><h2>Phiên bản app</h2><p class="muted">Đang chạy bản <b>' + APP_VERSION + '</b>. Nếu tính năng mới chưa hiện, bấm nút dưới để tải lại bản mới nhất. Tiến độ học không bị mất.</p><div class="actions"><button class="btn" id="upd" type="button">Cập nhật bản mới nhất</button></div></div></div>';
  }
  function forceUpdate() { // xóa bộ nhớ đệm của app rồi tải lại; không đụng tới tiến độ học (localStorage)
    toast("Đang tải bản mới nhất…");
    var urls = [location.pathname];
    document.querySelectorAll("script[src], link[rel=stylesheet], link[rel=manifest]").forEach(function (el) { urls.push(el.getAttribute("src") || el.getAttribute("href")); });
    urls.push("sw.js");
    var regs = "serviceWorker" in navigator ? navigator.serviceWorker.getRegistrations() : Promise.resolve([]);
    regs.then(function (rs) { return Promise.all(rs.map(function (r) { return r.unregister(); })); })
      .then(function () { return "caches" in window ? caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); }) : null; })
      .then(function () { return Promise.all(urls.map(function (u) { return fetch(u, { cache: "reload" }).catch(function () { /* bỏ qua */ }); })); })
      .then(function () { location.reload(); }, function () { location.reload(); });
  }
  function syncBoxHtml() {
    var Y = window.NRSync ? NRSync.state() : null;
    if (!Y || !Y.enabled) return '<h2>Đồng bộ giữa các thiết bị</h2><p class="muted">Chưa bật. Làm theo file <b>HUONG-DAN-FIREBASE.md</b> để tạo dự án Firebase miễn phí rồi dán cấu hình vào <b>data/firebase-config.js</b>. Tiến độ vẫn lưu trên thiết bị này như bình thường.</p>';
    var err = Y.err ? '<p class="syncerr">' + esc(Y.err) + "</p>" : "";
    if (!Y.ready) return "<h2>Đồng bộ giữa các thiết bị</h2><p class=\"muted\">Đang kết nối…</p>" + err;
    if (Y.user) {
      return "<h2>Đồng bộ giữa các thiết bị</h2><p class=\"muted\">Đang đăng nhập: <b>" + esc(Y.user.email || "") + "</b>. Tiến độ tự động gộp và đồng bộ giữa mọi thiết bị dùng tài khoản này." +
        (Y.last ? " Lần đồng bộ gần nhất: " + pad(Y.last.getHours()) + ":" + pad(Y.last.getMinutes()) + "." : "") + "</p>" + err +
        '<div class="actions"><button class="btn" id="syNow" type="button"' + (Y.busy ? " disabled" : "") + ">" + (Y.busy ? "Đang đồng bộ…" : "Đồng bộ ngay") + '</button><button class="btn ghost" id="syOut" type="button">Đăng xuất</button></div>';
    }
    return '<h2>Đồng bộ giữa các thiết bị</h2><p class="muted">Đăng nhập cùng một tài khoản trên máy tính và điện thoại để tiến độ tự đồng bộ. Miễn phí, không dùng AI.</p>' +
      '<div class="syfield"><label for="syEmail">Email</label><input class="input" id="syEmail" type="email" autocomplete="username" inputmode="email" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="ten@gmail.com"></div>' +
      '<div class="syfield"><label for="syPass">Mật khẩu</label><input class="input" id="syPass" type="password" autocomplete="current-password" placeholder="Ít nhất 6 ký tự"></div>' +
      '<label class="syshow"><input type="checkbox" id="syShow"> Hiện mật khẩu</label>' + err +
      '<div class="actions"><button class="btn" id="syIn" type="button"' + (Y.busy ? " disabled" : "") + '>Đăng nhập</button><button class="btn ghost" id="syUp" type="button"' + (Y.busy ? " disabled" : "") + '>Tạo tài khoản</button><button class="link" id="syForgot" type="button">Quên mật khẩu</button></div>';
  }
  function bindSyncBox() {
    var box = $("#syncBox"); if (!box) return;
    var keep = { e: ($("#syEmail") || {}).value, p: ($("#syPass") || {}).value, s: !!($("#syShow") || {}).checked };
    box.innerHTML = syncBoxHtml();
    if ($("#syEmail") && keep.e) $("#syEmail").value = keep.e;
    if ($("#syPass") && keep.p) $("#syPass").value = keep.p;
    if ($("#syShow")) {
      $("#syShow").checked = keep.s; $("#syPass").type = keep.s ? "text" : "password";
      $("#syShow").addEventListener("change", function () { $("#syPass").type = this.checked ? "text" : "password"; });
    }
    var go = function (fn) { var e = ($("#syEmail") || {}).value, pw = ($("#syPass") || {}).value; if (!e) { toast("Hãy nhập email."); return; } fn(e.trim(), pw || ""); };
    var b;
    if ((b = $("#syIn"))) b.addEventListener("click", function () { go(function (e, pw) { NRSync.signIn(e, pw); }); });
    if ((b = $("#syUp"))) b.addEventListener("click", function () { go(function (e, pw) { NRSync.signUp(e, pw); }); });
    if ((b = $("#syForgot"))) b.addEventListener("click", function () { go(function (e) { NRSync.resetPassword(e); }); });
    if ((b = $("#syNow"))) b.addEventListener("click", function () { NRSync.syncNow(); });
    if ((b = $("#syOut"))) b.addEventListener("click", function () { NRSync.signOut(); });
  }
  function bindSettings() {
    if (window.NRSync) { bindSyncBox(); }
    $("#goalIn").addEventListener("change", function (e) {
      var v = Math.max(3, Math.min(100, parseInt(e.target.value, 10) || 10)); S.goal = v; e.target.value = v; save(); toast("Đã đặt mục tiêu " + v + " mục mỗi ngày.");
    });
    document.querySelectorAll("button[data-theme]").forEach(function (b) { b.addEventListener("click", function () { setTheme(b.getAttribute("data-theme")); route(); }); });
    // Danh sách giọng trên điện thoại thường nạp chậm hoặc báo nhiều lần. Chỉ vẽ lại khi danh sách thật sự đổi.
    // Dùng danh sách bấm trực tiếp thay cho ô chọn gốc: bấm là chọn và đọc thử ngay, có phản hồi trên mọi trình duyệt.
    var lastSig = null;
    var fillVoices = function () {
      var box = $("#voiceList"); if (!box) return false;
      var all = "speechSynthesis" in window ? speechSynthesis.getVoices() : [];
      var vs = englishVoices(), usingAll = false;
      if (!vs.length && all.length) { vs = all.slice(); usingAll = true; } // máy không gắn nhãn tiếng Anh: vẫn cho chọn
      vs.sort(function (a, b) { return scoreVoice(b) - scoreVoice(a); });
      var cur = usingAll ? (S.voice ? all.filter(function (v) { return v.name === S.voice; })[0] : null) : pickVoice();
      var curName = cur ? cur.name : "";
      var sig = vs.map(function (v) { return v.name; }).join("|") + "#" + curName + "#" + usingAll;
      if (sig === lastSig) return vs.length > 0;
      lastSig = sig;
      box.innerHTML = vs.length ? vs.map(function (v) {
        var on = v.name === curName;
        return '<button type="button" class="vrow' + (on ? " on" : "") + '" role="radio" aria-checked="' + on + '" data-voice="' + esc(v.name) + '"><span>' + esc(v.name) + " <small>" + esc(v.lang) + "</small></span><b>" + (on ? "Đang dùng" : "Chọn") + "</b></button>";
      }).join("") : '<div class="vempty">Đang tìm giọng đọc trên thiết bị…</div>';
      var now = $("#voiceNow"); if (now) now.textContent = curName ? "Đang dùng: " + curName : "";
      var note = $("#voiceNote");
      if (note) note.textContent = !vs.length ? "Thiết bị chưa báo danh sách giọng. Nếu chờ vài giây vẫn trống, nút nghe ở thẻ từ vựng vẫn đọc bằng giọng mặc định của máy."
        : usingAll ? "Máy chưa gắn nhãn tiếng Anh cho giọng nào, nên đây là toàn bộ giọng có sẵn. Hãy chọn giọng tiếng Anh." : "";
      return vs.length > 0;
    };
    fillVoices();
    if ("speechSynthesis" in window) {
      speechSynthesis.onvoiceschanged = fillVoices;
      var tries = 0, timer = setInterval(function () { // iPhone và Android có thể không báo sự kiện, nên hỏi lại vài giây đầu
        if (!$("#voiceList") || ++tries > 20) { clearInterval(timer); return; }
        fillVoices();
      }, 300);
    }
    $("#voiceList").addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".vrow") : null; if (!b) return;
      S.voice = b.getAttribute("data-voice"); save();
      lastSig = null; fillVoices(); // cập nhật dấu "Đang dùng" ngay
      toast("Đã chọn giọng: " + S.voice);
      speak("Hello! I am happy to learn English with you.");
    });
    $("#exp").addEventListener("click", exportData);
    $("#imp").addEventListener("change", function (e) { if (e.target.files[0]) importData(e.target.files[0]); });
    $("#upd").addEventListener("click", function () { forceUpdate(); });
    $("#reset").addEventListener("click", function () {
      var cloud = window.NRSync && NRSync.state().user;
      if (confirm(cloud ? "Xóa toàn bộ tiến độ? Vì đang đồng bộ, tiến độ trên MỌI thiết bị dùng tài khoản này cũng sẽ bị xóa. Không hoàn tác được." : "Xóa toàn bộ tiến độ trên thiết bị này? Việc này không hoàn tác được.")) { S = defaults(); S.resetAt = new Date().toISOString(); save(); applyTheme(); route(); toast("Đã xóa tiến độ."); }
    });
  }
  function exportData() {
    var b = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "ngai-richard-sao-luu-" + today() + ".json";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function importData(file) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var o = JSON.parse(r.result);
        if (!o || typeof o !== "object" || !o.days || !o.srs) throw new Error("bad");
        if (!confirm("Nhập file sẽ thay thế tiến độ hiện tại trên thiết bị này. Tiếp tục?")) return;
        var keepReset = S.resetAt || "";
        S = Object.assign(defaults(), o); if ((S.resetAt || "") < keepReset) S.resetAt = keepReset; // giữ mốc xóa mới nhất để file nhập không bị bỏ khi đồng bộ
        save(); applyTheme(); route(); toast("Đã nhập dữ liệu.");
      } catch (e) { toast("File không hợp lệ."); }
    };
    r.readAsText(file);
  }

  function viewNotFound() {
    return '<div class="card empty" style="max-width:560px;margin:20px auto"><h1>Không tìm thấy trang này</h1><div class="actions" style="justify-content:center"><a class="btn" href="#/">Về tổng quan</a></div></div>';
  }

  /* ---------- Định tuyến ---------- */
  var currentSec = "";
  function setZen(on) {
    document.body.classList.toggle("zen", on);
    var z = $("#zenBtn"); z.textContent = on ? "Thoát Zen" : "Zen"; z.setAttribute("aria-pressed", on);
  }
  $("#zenBtn").addEventListener("click", function () { setZen(!document.body.classList.contains("zen")); });
  function route() {
    var p = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    var sec = p[0] || "", html = "", binder = null;
    if (window.__reloadLater) { location.reload(); return; } // có bản mới: tải lại khi Ngài chuyển trang
    SESS = null; currentSec = sec;
    window.scrollTo(0, 0);
    setZen(false);
    $("#zenBtn").hidden = !(sec === "grammar" && p[1] && !p[2]); // Zen chỉ có ở trang bài học
    if (sec === "") { html = viewDashboard(); binder = bindDashboard; }
    else if (sec === "grammar") {
      if (!p[1]) html = viewGrammarList();
      else if (p[1] === "mix") html = viewGrammarMix(p[2]);
      else if (p[2] === "quiz") html = viewGrammarQuiz(p[1], p[3]);
      else if (p[2] === "order") html = viewGrammarOrder(p[1]);
      else { html = viewLesson(p[1]); binder = bindLesson; }
    } else if (sec === "vocab") {
      if (!p[1]) html = viewVocabList();
      else if (p[2]) html = viewVocabSet(p[1], p[2], p[3]);
      else html = viewVocabTopic(p[1]);
    } else if (sec === "book") { html = viewBook(); binder = bindBook; }
    else if (sec === "appendix") { html = viewAppendix(); binder = bindLesson; }
    else if (sec === "phrases") {
      if (!p[1]) html = viewPhraseList();
      else if (p[2]) html = viewPhraseSession(p[1], p[2]);
      else { html = viewPhraseTopic(p[1]); binder = bindPhrases; }
    } else if (sec === "review") {
      if (p[1] === "weak") html = viewWeak();
      else { html = viewReview(p[1] === "go"); if (html && p[1] !== "go") html += deckCard() + weakCard(); }
    } else if (sec === "deck") { html = viewDeck(); binder = bindDeck; }
    else if (sec === "placement") html = p[1] === "skip" ? togglePlacementSkip() : viewPlacement();
    else if (sec === "settings") { html = viewSettings(); binder = bindSettings; }
    else html = viewNotFound();
    renderNav(sec === "placement" || sec === "book" || sec === "appendix" ? "grammar" : sec === "deck" ? "review" : sec);
    if (html !== null) { $("#view").innerHTML = html; if (binder) binder(); }
  }
  window.addEventListener("hashchange", route);

  /* ---------- Khởi động ---------- */
  applyTheme();
  initNotebook();
  route();
  if (window.NRSync) {
    NRSync.onChange(function () { if ($("#syncBox")) bindSyncBox(); });
    NRSync.init({
      get: function () { return S; },
      set: function (n) { // nhận dữ liệu đã gộp từ đám mây
        S = Object.assign(defaults(), n);
        try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* bỏ qua */ }
        applyTheme(); renderNav(currentSec);
        if (!SESS && currentSec !== "settings") route();
      }
    });
  }
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    var hadController = !!navigator.serviceWorker.controller, reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () { // bản mới vừa được kích hoạt
      if (!hadController || reloaded) return;
      reloaded = true;
      if (SESS) { window.__reloadLater = true; toast("Có bản mới, sẽ cập nhật khi Ngài chuyển trang."); } else location.reload();
    });
    navigator.serviceWorker.register("sw.js").then(function (r) { r.update(); }).catch(function () { /* bỏ qua nếu không đăng ký được */ });
  }
})();
