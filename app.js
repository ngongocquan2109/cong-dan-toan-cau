/* Ngài Richard - Công dân toàn cầu: web học tiếng Anh (bản đầu).
   Không gọi AI lúc học; toàn bộ tiến độ lưu trong localStorage của trình duyệt. */
(function () {
  "use strict";

  /* ---------- Tiện ích ---------- */
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
  var WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  /* ---------- Dữ liệu nội dung ---------- */
  var GR = window.GRAMMAR || [];
  var VO = window.VOCAB || [];
  var TL = window.TAG_LABELS || {};
  var GP = window.GRAMMAR_PLUS || {};
  var VC = window.VOCAB_CEFR || {}; // bậc CEFR ước lượng của từng chủ đề từ vựng
  var RANK = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
  var CEFR_NAME = { A1: "Nền tảng câu tiếng Anh", A2: "Mở rộng thì và cấu trúc", B1: "Câu phức cơ bản" };
  var LV = { e: "Dễ", m: "Vừa", h: "Khó" };
  // Gắn bậc CEFR, mức khó, lỗi thường gặp, câu hỏi mới vào từng chủ đề, rồi xếp lộ trình theo bậc.
  GR.forEach(function (t) {
    var p = GP[t.id]; if (!p) { t.cefr = "A1"; t.questions.forEach(function (q) { q.lv = q.lv || "m"; }); return; }
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
  var W = {}; // id đầy đủ -> từ
  VO.forEach(function (t) {
    t.sets.forEach(function (s) {
      s.words.forEach(function (w) { W["v:" + t.id + ":" + w.w] = Object.assign({ tid: t.id, sid: s.id, cefr: (window.WORD_CEFR || {})[t.id + ":" + w.w] || "" }, w); });
    });
  });

  /* ---------- Trạng thái lưu trữ ---------- */
  function defaults() {
    return { version: 1, goal: 10, theme: null, voice: null, xp: 0, days: {}, srs: {}, errors: {}, topics: {}, reports: [], badges: {}, lvl: {}, deck: {}, notes: "", sound: { vol: 60, timer: 0 } };
  }
  function load() {
    try { var r = JSON.parse(localStorage.getItem(KEY)); return Object.assign(defaults(), r || {}); }
    catch (e) { return defaults(); }
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* bỏ qua */ } }
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
    return Object.keys(S.srs).filter(function (id) { return S.srs[id].due <= t && (Q[id] || W[id] || S.deck[id]); });
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

  /* ---------- Huy hiệu ---------- */
  var BADGES = [
    { id: "first", name: "Bước đầu tiên", desc: "Làm câu đầu tiên", test: function () { return totals().n >= 1; } },
    { id: "goal", name: "Đủ mục tiêu", desc: "Đạt mục tiêu 1 ngày", test: function () { return Object.keys(S.days).some(function (k) { return S.days[k].done >= S.goal; }); } },
    { id: "streak3", name: "3 ngày liền", desc: "Streak 3 ngày", test: function () { return streak() >= 3; } },
    { id: "streak7", name: "7 ngày liền", desc: "Streak 7 ngày", test: function () { return streak() >= 7; } },
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
    var items = [["", "Tổng quan"], ["grammar", "Ngữ pháp"], ["vocab", "Từ vựng"], ["review", "Ôn tập"], ["settings", "Cài đặt"]];
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
    return Object.keys(S.errors).filter(function (t) { return !/^tu-vung-/.test(t) && S.errors[t] > 0; })
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
      var R = { at: today(), gl: st.passed.length ? st.passed[st.passed.length - 1] : "", vl: "", scores: st.scores, stop: st.stop, byTopic: {}, tinfo: {}, vs: {} };
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
        R.prev = prev ? { at: prev.at, gl: prev.gl, vl: prev.vl } : null;
        S.placement = Object.assign({}, R, { pct: pct, start: R.path[0] || null, skip: S.placement && S.placement.skip === false ? false : true });
        S.placeHist = (S.placeHist || []).concat([{ at: R.at, gl: R.gl, vl: R.vl, pct: pct }]).slice(-10);
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
        var cmp = R.prev ? '<p class="muted">Lần trước (' + R.prev.at + "): ngữ pháp " + dispLv(R.prev.gl) + ", từ vựng " + dispLv(R.prev.vl) + ".</p>" : "";
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
        '<div class="card"><p class="eyebrow">Hôm nay · ' + k + '</p><h1>Xin chào, Ngài Richard</h1>' +
          '<div class="stats3">' +
            '<div><span class="lbl">Streak</span><div class="big">' + st + '<small> ngày</small></div></div>' +
            '<div><span class="lbl">Hôm nay</span><div class="big">' + d.done + '<small> / ' + g + "</small></div></div>" +
            '<div><span class="lbl">Chính xác</span><div class="big">' + (acc === null ? "–" : acc + "%") + "</div></div>" +
          "</div>" +
          '<div class="bar"><i style="width:' + pct + '%"></i></div><p class="muted" style="margin-top:10px">' + msg + "</p>" + nextHtml + "</div>" +
        '<div class="card heroR"><span class="lbl">XP · Cấp ' + level + '</span><div class="big">' + S.xp + '<small> XP</small></div>' +
          '<p class="muted">Còn ' + toNext + ' XP để lên cấp ' + (level + 1) + '</p>' +
          '<div style="margin-top:18px"><span class="lbl">Cần ôn hôm nay</span><div class="big">' + due + '<small> mục</small></div></div>' +
          '<div class="actions"><a class="btn" href="#/review">' + (due ? "Ôn ngay" : "Xem mục ôn tập") + "</a></div></div>" +
      "</section>" +
      '<section class="card" style="margin-top:16px"><h2>Lộ trình CEFR</h2><p class="muted">Số bài ngữ pháp đã vững và số sao theo từng bậc.</p>' + ["A1", "A2", "B1"].map(function (c) {
        var n = GR.filter(function (x) { return x.cefr === c; }), dn = n.filter(gDone).length, st = n.reduce(function (a, t) { return a + stars(t); }, 0);
        return '<div class="crow"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><span><span class="cefr small">' + c + "</span> " + esc(CEFR_NAME[c]) + "</span><b>" + dn + "/" + n.length + " bài vững · " + st + "/" + n.length * 3 + ' sao</b></div><div class="bar"><i style="width:' + (n.length ? Math.round(dn / n.length * 100) : 0) + '%"></i></div></div>';
      }).join("") + "</section>" +
      placementCard() +
      '<section class="grid two">' +
        '<div class="card"><h2>7 ngày gần đây</h2><p class="muted">Số câu và thẻ mỗi ngày. Cột xanh chanh là ngày đủ mục tiêu.</p><div class="chart">' + cols.join("") + "</div></div>" +
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
  function placementCard() {
    var P = S.placement; if (!P || P.gl === undefined) return "";
    var H = S.placeHist || [], last = H[H.length - 1], prev = H[H.length - 2];
    var idx = function (l) { return l ? ["A1", "A2", "B1"].indexOf(l) + 1 : 0; };
    var diff = function (a, b, name) { if (!prev) return ""; var d = idx(a) - idx(b); return name + (d > 0 ? " tăng " + d + " bậc" : d < 0 ? " giảm " + (-d) + " bậc" : " giữ nguyên"); };
    var cmp = prev ? '<p class="muted">So với lần trước (' + prev.at + "): " + [diff(last.gl, prev.gl, "ngữ pháp"), diff(last.vl, prev.vl, "từ vựng")].join(", ") + ".</p>" : '<p class="muted">Làm lại sau vài tuần để so sánh tiến bộ.</p>';
    return '<section class="card" style="margin-top:16px"><h2>Kết quả kiểm tra đầu vào</h2><div class="plgrid" style="margin-top:10px"><div class="plbox"><span class="lbl">Bậc ngữ pháp</span><div class="big">' + esc(dispLv(P.gl)) +
      '</div></div><div class="plbox"><span class="lbl">Bậc từ vựng</span><div class="big">' + esc(dispLv(P.vl)) + "</div></div></div>" + cmp +
      (H.length ? '<div class="phist">' + H.map(function (h) { return '<div class="prow"><span>' + h.at + "</span><span>NP " + esc(dispLv(h.gl)) + " · TV " + esc(dispLv(h.vl)) + '</span><div class="bar"><i style="width:' + h.pct + '%"></i></div><b>' + h.pct + "%</b></div>"; }).join("") + "</div>" : "") +
      '<div class="actions"><a class="btn small ghost" href="#/placement">Làm lại</a></div></section>';
  }
  function bindDashboard() {
    document.querySelectorAll("[data-sel]").forEach(function (el) {
      el.addEventListener("click", function () { dashSel = el.getAttribute("data-sel"); $("#view").innerHTML = viewDashboard(); bindDashboard(); });
    });
  }

  /* ---------- Màn hình: Ngữ pháp ---------- */
  function viewGrammarList() {
    var banner = '<div class="card" style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><h3>Kiểm tra đầu vào</h3><p class="muted">' +
      (S.placement && S.placement.gl !== undefined ? "Lần gần nhất " + S.placement.at + ": ngữ pháp " + dispLv(S.placement.gl) + ", từ vựng " + dispLv(S.placement.vl) + ". Làm lại sau vài tuần để xem tiến bộ."
        : S.placement ? "Bản cũ làm ngày " + S.placement.at + ". Làm lại để biết bậc CEFR." : "Khoảng 15 phút: xác định bậc ngữ pháp, bậc từ vựng và chủ đề nào nên học trước.") +
      '</p></div><a class="btn" href="#/placement">' + (S.placement ? "Làm lại" : "Bắt đầu") + "</a></div>";
    var out = '<h1 style="margin-top:12px">Ngữ pháp</h1><p class="muted">Học theo bậc CEFR từ A1. Mỗi bài có lý thuyết, lỗi thường gặp và bài tập ba mức Dễ, Vừa, Khó. Qua 80% mỗi mức thì được 1 sao.</p>' + banner;
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
      html += '<div class="card sec"><h2>Tự kiểm tra trước khi làm bài</h2><ul class="check">' + t.check.map(function (c, i) {
        return '<li><label><input type="checkbox"> <span>' + esc(c) + "</span></label></li>";
      }).join("") + "</ul></div>";
    }
    var nq = function (l) { return t.questions.filter(function (q) { return q.lv === l; }).length; };
    html += '<div class="card sec"><h2>Làm bài kiểm tra</h2><p class="muted">Chọn mức. Đúng từ 80% thì được sao của mức đó.</p><div class="lvls">' +
      ["e", "m", "h"].map(function (l, i) {
        var b = lvBest(t, l);
        return '<a class="lvbtn" href="#/grammar/' + t.id + "/quiz/" + l + '"><b>' + LV[l] + "</b><span class=\"stars\">" + "★".repeat(i + 1) + "☆".repeat(2 - i) + "</span><small>" + nq(l) + " câu" + (b ? " · tốt nhất " + b + "%" : "") + "</small>" + (b >= 80 ? '<i class="got">Đã đạt</i>' : "") + "</a>";
      }).join("") + '<a class="lvbtn all" href="#/grammar/' + t.id + '/quiz/all"><b>Tất cả</b><span>Trộn mọi mức</span><small>' + t.questions.length + " câu</small></a></div></div></div>";
    return html;
  }
  function bindLesson() {
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
        var r = S.topics["vs:" + t.id + ":" + s.id], d = S.topics["vd:" + t.id + ":" + s.id];
        return '<div class="sethead"><div><b>' + esc(s.title) + "</b><div class=\"muted\">" + s.words.length + " từ" + (r ? " · kiểm tra gần nhất " + r.last + "%" : "") + (d ? " · nghe viết " + d.last + "%" : "") + '</div></div><div class="actions" style="margin:0"><a class="btn small" href="#/vocab/' + t.id + "/" + s.id + '">Học bộ này</a><a class="btn small ghost" href="#/vocab/' + t.id + "/" + s.id + '/dict">Nghe viết</a></div></div>';
      }).join("") + "</div></div>";
  }

  /* ---------- Phiên làm bài (câu hỏi + thẻ từ) ---------- */
  var SESS = null;
  function mkQuestion(id) {
    var q = Q[id];
    return { kind: q.type === "fill" ? "fill" : "mc", id: id, q: q.q, options: q.options ? shuffle(q.options) : null, answer: q.answer, answers: q.answers, explain: q.explain, tag: q.tag };
  }
  function mkCard(id) {
    if (id.charAt(0) === "d") { var d = S.deck[id]; return { kind: "card", id: id, w: { w: d.f, ipa: "", pos: "", vi: d.b, ex: "", exVi: "" } }; }
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
    SESS = Object.assign({ i: 0, ok: 0, bad: 0, rem: 0, forgot: 0, answered: false, picked: null, flip: false, wrong: [], xp0: S.xp, byTopic: {}, grp: {} }, cfg);
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
      html = '<div class="card flash">' + (w.pos ? '<span class="pill">' + esc(w.pos) + "</span>" : "") + (w.cefr ? '<span class="cefr small">' + w.cefr + "</span>" : "") + '<div class="word">' + esc(w.w) + '</div>' + (w.ipa ? '<div class="ipa">' + esc(w.ipa) + "</div>" : "") +
        '<button class="btn ghost small speak" data-act="speak" type="button">Nghe phát âm</button>' +
        (s.flip ? '<div class="mean" style="margin-top:20px">' + esc(w.vi) + "</div>" + (w.ex ? '<p><b>' + esc(w.ex) + '</b></p><p class="muted">' + esc(w.exVi) + "</p>" : "") +
                   '<div class="rate"><button class="btn ghost" data-act="forgot" type="button">Chưa nhớ</button><button class="btn" data-act="remember" type="button">Đã nhớ</button></div>' +
                   (it.id.charAt(0) === "v" ? '<div style="margin-top:10px"><button class="link" data-act="addrev" type="button">+ Ôn tập: đưa từ này vào lịch ôn hôm nay</button></div>' : "")
                 : '<div class="rate"><button class="btn dark" data-act="flip" type="button">Lật thẻ</button></div>') + "</div>";
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
        fb = '<div class="feedback ' + (s.lastOk ? "good" : "bad") + '"><b>' + (s.lastOk ? "Đúng rồi!" : "Chưa đúng. Đáp án: " + esc(it.answer)) + "</b><p>" + esc(it.explain) + "</p></div>" +
          '<div class="actions"><button class="btn" data-act="next" type="button">Tiếp tục</button><button class="link" data-act="report" type="button">Báo câu này sai</button></div>';
      }
      html = '<div class="card"><p class="eyebrow">' + (it.kind === "fill" ? "Điền vào chỗ trống" : "Chọn đáp án đúng") + '</p><div class="q">' + qhtml + "</div>" + body + fb + "</div>";
    }
    view.innerHTML = '<div class="session">' + sessionBar() + html + "</div>";
    var inp = $("#fillIn"); if (inp && !s.answered) { inp.focus(); inp.addEventListener("keydown", function (e) { if (e.key === "Enter") act("check"); }); }
    view.querySelectorAll("[data-act]").forEach(function (b) {
      b.addEventListener("click", function () { act(b.getAttribute("data-act"), b); });
    });
    if (s.answered) { var nb = view.querySelector('[data-act="next"]'); if (nb) nb.focus(); }
    if (it.kind === "dict" && !s.answered && s.spoken !== s.i) { s.spoken = s.i; setTimeout(function () { speak(it.w.w); }, 200); }
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
    if (a === "next") { s.i++; s.answered = false; s.picked = null; renderSession(); return; }
    if (a === "report") {
      S.reports.push({ id: it.id, at: new Date().toISOString() }); save(); toast("Đã ghi nhận câu này để kiểm tra lại.");
    }
  }
  function finishAnswer(it) {
    var s = SESS;
    if (!it.noRecord) recordAnswer(it.id, s.lastOk, it.tag);
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
    var cfg = {
      title: t.title + (lv === "all" ? "" : " · mức " + LV[lv]), exit: "#/grammar/" + t.id, nav: "grammar",
      build: function () { return shuffle(qs).map(function (q) { return mkQuestion("g:" + t.id + ":" + q.id); }); },
      onFinish: function (pct) {
        if (lv === "all") {
          var r = S.topics["g:" + t.id] || { best: 0, attempts: 0 };
          S.topics["g:" + t.id] = { last: pct, best: Math.max(r.best, pct), attempts: r.attempts + 1 };
        } else {
          var L = S.lvl["g:" + t.id] || (S.lvl["g:" + t.id] = {}), before = L[lv] || 0;
          L[lv] = Math.max(before, pct);
          if (before < 80 && pct >= 80) toast("Được thêm 1 sao, mức " + LV[lv] + "!");
        }
      },
      extra: function () {
        if (lv === "all") return "";
        var nx = lv === "e" ? "m" : lv === "m" ? "h" : null;
        return (lvBest(t, lv) >= 80 ? '<div class="feedback good"><b>Đạt mức ' + LV[lv] + ".</b> Ngài được 1 sao." + (nx ? " Có thể thử mức " + LV[nx] + "." : "") + "</div>"
          : '<div class="feedback"><b>Chưa đạt 80%.</b> Xem lại phần lý thuyết rồi làm lại mức này.</div>') +
          (nx ? '<div class="actions"><a class="btn" href="#/grammar/' + t.id + "/quiz/" + nx + '">Làm mức ' + LV[nx] + "</a></div>" : "");
      }
    };
    cfg.cfg = cfg; startSession(cfg); return null;
  }
  function viewVocabSet(tid, sid, mode) {
    var t = VO.filter(function (x) { return x.id === tid; })[0];
    var set = t && t.sets.filter(function (x) { return x.id === sid; })[0]; if (!set) return viewNotFound();
    var dict = mode === "dict";
    var cfg = {
      title: t.title + " · " + set.title + (dict ? " · nghe viết" : ""), exit: "#/vocab/" + t.id, nav: "vocab",
      build: function () {
        if (dict) return shuffle(set.words).map(function (w) { return mkDict("v:" + t.id + ":" + w.w); });
        var words = shuffle(set.words);
        return words.map(function (w) { return mkCard("v:" + t.id + ":" + w.w); }).concat(mkVocabQuiz(t.id, set.words));
      },
      onFinish: function (pct) {
        var key = (dict ? "vd:" : "vs:") + t.id + ":" + set.id, r = S.topics[key] || { best: 0, attempts: 0 };
        S.topics[key] = { last: pct, best: Math.max(r.best, pct), attempts: r.attempts + 1 };
      }
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
  function noteSearch(q) {
    q = plain(q); if (!q) return [];
    var hits = [];
    Object.keys(W).forEach(function (id) {
      var w = W[id], a = plain(w.w), b = plain(w.vi), sc = 0;
      if (a === q) sc = 3; else if (a.indexOf(q) === 0) sc = 2; else if (a.indexOf(q) >= 0 || b.indexOf(q) >= 0) sc = 1;
      if (sc) hits.push([sc, id]);
    });
    return hits.sort(function (x, y) { return y[0] - x[0]; }).slice(0, 6).map(function (x) { return x[1]; });
  }
  function initNotebook() {
    var panel = $("#notePanel"), btn = $("#noteBtn"), timer;
    panel.innerHTML = '<div class="nphead"><b>Sổ tay</b><button class="link" id="noteClose" type="button">Đóng</button></div>' +
      '<label class="lbl" for="noteQ">Tra từ (kho ' + Object.keys(W).length.toLocaleString("vi-VN") + ' từ của app)</label>' +
      '<input class="input" id="noteQ" placeholder="Gõ từ tiếng Anh hoặc nghĩa tiếng Việt" autocomplete="off" autocapitalize="none" spellcheck="false"><div id="noteRes"></div>' +
      '<label class="lbl" for="noteTa" style="margin-top:12px;display:block">Ghi chú của Ngài</label><textarea class="input" id="noteTa" rows="5" placeholder="Ghi từ mới, mẹo, câu hay…"></textarea><p class="muted" style="font-size:12px;margin-top:4px">Lưu tự động trên thiết bị này.</p>';
    $("#noteTa").value = S.notes || "";
    var open = function (on) { panel.hidden = !on; btn.setAttribute("aria-expanded", on); if (on) { var sp = $("#soundPanel"); if (sp) { sp.hidden = true; $("#soundBtn").setAttribute("aria-expanded", "false"); } $("#noteQ").focus(); } };
    btn.addEventListener("click", function () { open(panel.hidden); });
    $("#noteClose").addEventListener("click", function () { open(false); btn.focus(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) open(false); });
    $("#noteTa").addEventListener("input", function (e) { clearTimeout(timer); var v = e.target.value; timer = setTimeout(function () { S.notes = v; save(); }, 400); });
    $("#noteQ").addEventListener("input", function (e) {
      var ids = noteSearch(e.target.value), box = $("#noteRes");
      box.innerHTML = !e.target.value.trim() ? "" : ids.length ? ids.map(function (id) {
        var w = W[id];
        return '<div class="nres"><div><b>' + esc(w.w) + "</b> <span class=\"muted\">" + esc(w.ipa) + " · " + esc(w.pos) + (w.cefr ? " · " + w.cefr : "") + "</span><div>" + esc(w.vi) + '</div><div class="muted" style="font-size:13px">' + esc(w.ex) + '</div></div><div class="nbtn"><button class="btn small ghost" data-nsp="' + esc(id) + '" type="button">Nghe</button><button class="btn small ghost" data-nad="' + esc(id) + '" type="button">+ Ôn tập</button></div></div>';
      }).join("") : '<p class="muted" style="margin-top:8px">Không có trong kho từ của app.</p>';
    });
    $("#noteRes").addEventListener("click", function (e) {
      var s = e.target.closest ? e.target.closest("[data-nsp]") : null, a = e.target.closest ? e.target.closest("[data-nad]") : null;
      if (s && W[s.getAttribute("data-nsp")]) speak(W[s.getAttribute("data-nsp")].w);
      if (a) { forceReview(a.getAttribute("data-nad")); toast("Đã đưa từ này vào lịch ôn hôm nay."); renderNav(currentSec); }
    });
  }

  /* ---------- Âm thanh nền: máy tự tạo bằng Web Audio, không cần tải file, không cần mạng ---------- */
  var SOUND_GROUPS = [
    ["", [["rain", "Tiếng mưa", "Mưa đều, dễ chịu"], ["storm", "Mưa giông", "Mưa và sấm xa"], ["fire", "Lửa trại", "Củi nổ lách tách"], ["waves", "Sóng biển", "Sóng vỗ chậm"],
      ["stream", "Suối chảy", "Nước róc rách"], ["wind", "Gió", "Gió thổi nhẹ"], ["night", "Đêm hè", "Dế kêu ngoài vườn"]]],
    ["Nhiễu nền", [["pink", "Hồng", "Giống thác xa"], ["brown", "Nâu", "Trầm như quạt"], ["white", "Trắng", "Che tiếng ồn"]]]
  ];
  var SOUNDS = []; SOUND_GROUPS.forEach(function (g) { g[1].forEach(function (x) { SOUNDS.push(x); }); });
  function initSound() {
    var panel = $("#soundPanel"), btn = $("#soundBtn");
    var AC = window.AudioContext || window.webkitAudioContext;
    var ctx = null, master = null, bufs = {}, cur = null, curKind = null, timers = [], nextThunder = 0, endTimer = null, tickTimer = null, endAt = 0;
    if (!S.sound) S.sound = { vol: 60, timer: 0 };
    var snd = S.sound;
    panel.innerHTML = '<div class="nphead"><b>Âm thanh nền</b><button class="link" id="soundClose" type="button">Đóng</button></div>' +
      '<p class="muted shint" style="font-size:13px">Máy tự tạo âm thanh, không cần mạng.</p>' +
      '<div class="sfoot"><p class="muted" id="sStatus"></p><button class="btn small ghost" id="sStop" type="button">Dừng</button></div>' +
      '<div id="schips" role="group" aria-label="Chọn âm thanh">' + SOUND_GROUPS.map(function (g, gi) {
        return (g[0] ? '<p class="lbl sgl">' + g[0] + "</p>" : "") + '<div class="schips' + (gi ? " three" : "") + '">' + g[1].map(function (x) {
          return '<button class="schip" type="button" data-s="' + x[0] + '" aria-pressed="false"><b>' + x[1] + "</b><small>" + x[2] + "</small></button>";
        }).join("") + "</div>";
      }).join("") + "</div>" +
      '<label class="lbl" for="sVol" style="display:block;margin-top:14px">Âm lượng</label><input id="sVol" class="range" type="range" min="0" max="100" value="' + snd.vol + '">' +
      '<div class="field"><span class="lbl">Hẹn giờ tắt</span><div class="seg" id="sTimer">' + [[0, "Không"], [15, "15 phút"], [30, "30 phút"], [60, "60 phút"]].map(function (t) {
        return '<button type="button" data-t="' + t[0] + '">' + t[1] + "</button>";
      }).join("") + '</div></div>';

    function ensure() {
      if (!AC) return false;
      if (!ctx) { ctx = new AC(); master = ctx.createGain(); master.connect(ctx.destination); setVol(); }
      if (ctx.state === "suspended") ctx.resume();
      return true;
    }
    function setVol() { if (master) master.gain.value = Math.pow(snd.vol / 100, 2) * 3; }
    function buf(type) {
      if (bufs[type]) return bufs[type];
      var len = ctx.sampleRate * 5, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0), i, w;
      if (type === "white") { for (i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; }
      else if (type === "pink") {
        var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (i = 0; i < len; i++) {
          w = Math.random() * 2 - 1;
          b0 = .99886 * b0 + w * .0555179; b1 = .99332 * b1 + w * .0750759; b2 = .969 * b2 + w * .153852;
          b3 = .8665 * b3 + w * .3104856; b4 = .55 * b4 + w * .5329522; b5 = -.7616 * b5 - w * .016898;
          d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * .5362) * .11; b6 = w * .115926;
        }
      } else { var last = 0; for (i = 0; i < len; i++) { w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[i] = last * 3.5; } }
      return (bufs[type] = b);
    }
    function loopSrc(type) { var s = ctx.createBufferSource(); s.buffer = buf(type); s.loop = true; return s; }
    function filt(type, f, q) { var n = ctx.createBiquadFilter(); n.type = type; n.frequency.value = f; if (q) n.Q.value = q; return n; }
    function gain(v) { var g = ctx.createGain(); g.gain.value = v; return g; }
    function osc(f) { var o = ctx.createOscillator(); o.frequency.value = f; return o; }

    function build(kind) {
      var out = gain(0), srcs = [], pre = [], s, g;
      if (kind === "white" || kind === "pink" || kind === "brown") {
        s = loopSrc(kind); g = gain(kind === "white" ? .3 : kind === "pink" ? .55 : .75); s.connect(g); g.connect(out); srcs.push(s);
      } else if (kind === "rain") {
        s = loopSrc("white"); var hp = filt("highpass", 700), lp = filt("lowpass", 7500); g = gain(.22);
        s.connect(hp); hp.connect(lp); lp.connect(g); g.connect(out); srcs.push(s);
        var s2 = loopSrc("pink"), lp2 = filt("lowpass", 1400), g2 = gain(.5); s2.connect(lp2); lp2.connect(g2); g2.connect(out); srcs.push(s2);
        timers.push(setInterval(function () { // những giọt mưa rơi lách tách
          for (var k = 0; k < 2; k++) {
            if (Math.random() < .45) continue;
            var d = ctx.createBufferSource(); d.buffer = buf("white");
            var bp = filt("bandpass", 1200 + Math.random() * 4200, 2.5), dg = gain(0), t = ctx.currentTime;
            dg.gain.setValueAtTime(0, t); dg.gain.linearRampToValueAtTime(.12 + Math.random() * .16, t + .004); dg.gain.exponentialRampToValueAtTime(.0001, t + .04 + Math.random() * .04);
            d.connect(bp); bp.connect(dg); dg.connect(out); d.start(t, Math.random() * 4, .1);
          }
        }, 70));
      } else if (kind === "storm") {
        var rb = build("rain"); // mưa giông = lớp mưa + tiếng sấm xa thỉnh thoảng
        rb.out.disconnect(); rb.out.connect(out); rb.srcs.forEach(function (x) { pre.push(x); });
        nextThunder = Date.now() + 5000;
        timers.push(setInterval(function () {
          if (Date.now() < nextThunder) return;
          nextThunder = Date.now() + 14000 + Math.random() * 28000;
          var t = ctx.currentTime + .05, th = loopSrc("brown"), tl = filt("lowpass", 320), tg = gain(0);
          tl.frequency.setValueAtTime(320, t); tl.frequency.exponentialRampToValueAtTime(70, t + 6);
          tg.gain.setValueAtTime(0, t); tg.gain.linearRampToValueAtTime(2.2, t + .5 + Math.random() * .6); tg.gain.exponentialRampToValueAtTime(.001, t + 6.5);
          th.connect(tl); tl.connect(tg); tg.connect(out); th.start(t, Math.random() * 3); th.stop(t + 7);
          var c = ctx.createBufferSource(); c.buffer = buf("white"); var cb = filt("bandpass", 420, .8), cg = gain(0);
          cg.gain.setValueAtTime(0, t); cg.gain.linearRampToValueAtTime(.5, t + .02); cg.gain.exponentialRampToValueAtTime(.001, t + .6);
          c.connect(cb); cb.connect(cg); cg.connect(out); c.start(t, 0, .7);
        }, 3000));
      } else if (kind === "fire") {
        s = loopSrc("brown"); var fl = filt("lowpass", 380); g = gain(.9); s.connect(fl); fl.connect(g); g.connect(out); srcs.push(s); // lửa rì rầm
        var s2 = loopSrc("pink"), fb = filt("bandpass", 1400, .5), g2 = gain(.9), fo = osc(.6), fg = gain(.5);
        fo.connect(fg); fg.connect(g2.gain); s2.connect(fb); fb.connect(g2); g2.connect(out); srcs.push(s2, fo);
        timers.push(setInterval(function () { // củi nổ lách tách
          var n = Math.random() < .3 ? 3 : Math.random() < .6 ? 1 : 0;
          for (var k = 0; k < n; k++) {
            var t = ctx.currentTime + Math.random() * .09, d = ctx.createBufferSource(), pop = Math.random() < .1;
            d.buffer = buf("white");
            var bp = filt(pop ? "lowpass" : "bandpass", pop ? 260 : 600 + Math.random() * 3800, 1.5 + Math.random() * 2), dg = gain(0);
            dg.gain.setValueAtTime(0, t); dg.gain.linearRampToValueAtTime(pop ? .9 : .2 + Math.random() * .3, t + .002); dg.gain.exponentialRampToValueAtTime(.0001, t + (pop ? .12 : .015 + Math.random() * .07));
            d.connect(bp); bp.connect(dg); dg.connect(out); d.start(t, Math.random() * 4, .14);
          }
        }, 110));
      } else if (kind === "wind") {
        s = loopSrc("pink"); var wb = filt("bandpass", 600, .9), ws = gain(1.4), l1 = osc(.13), lg1 = gain(280), l2 = osc(.07), lg2 = gain(.7);
        l1.connect(lg1); lg1.connect(wb.frequency); l2.connect(lg2); lg2.connect(ws.gain);
        s.connect(wb); wb.connect(ws); ws.connect(out); srcs.push(s, l1, l2);
      } else if (kind === "stream") {
        s = loopSrc("white"); var sb = filt("bandpass", 2400, .5), sg = gain(.18), o1 = osc(6.3), o2 = osc(9.7), og = gain(.06), og2 = gain(.05);
        o1.connect(og); og.connect(sg.gain); o2.connect(og2); og2.connect(sg.gain);
        s.connect(sb); sb.connect(sg); sg.connect(out); srcs.push(s, o1, o2);
        var s4 = loopSrc("pink"), l4 = filt("lowpass", 900), g4 = gain(.6); s4.connect(l4); l4.connect(g4); g4.connect(out); srcs.push(s4);
      } else if (kind === "night") {
        s = loopSrc("pink"); var nl = filt("lowpass", 500); g = gain(.8); s.connect(nl); nl.connect(g); g.connect(out); srcs.push(s); // gió nhẹ ban đêm
        var base = [4400, 4700, 5100];
        timers.push(setInterval(function () { // tiếng dế
          base.forEach(function (f0) {
            if (Math.random() < .5) return;
            var t0 = ctx.currentTime + Math.random() * .3, pulses = 3 + Math.floor(Math.random() * 3), f = f0 + Math.random() * 120;
            for (var p = 0; p < pulses; p++) {
              var o = ctx.createOscillator(), pg = gain(0), t = t0 + p * .05;
              o.frequency.value = f; pg.gain.setValueAtTime(0, t); pg.gain.linearRampToValueAtTime(.09, t + .008); pg.gain.linearRampToValueAtTime(0, t + .03);
              o.connect(pg); pg.connect(out); o.start(t); o.stop(t + .04);
            }
          });
        }, 500));
      } else { // sóng biển: nhiễu nâu có độ to nhỏ lên xuống chậm
        s = loopSrc("brown"); var lw = filt("lowpass", 900), sw = gain(.5), lfo = ctx.createOscillator(), lg = gain(.38);
        lfo.frequency.value = .11; lfo.connect(lg); lg.connect(sw.gain); s.connect(lw); lw.connect(sw); sw.connect(out); srcs.push(s, lfo);
        var s3 = loopSrc("white"), hp3 = filt("highpass", 2500), lw3 = filt("lowpass", 6000), sg3 = gain(.03), lfo2 = ctx.createOscillator(), lg2 = gain(.03); // bọt sóng
        lfo2.frequency.value = .11; lfo2.connect(lg2); lg2.connect(sg3.gain); s3.connect(hp3); hp3.connect(lw3); lw3.connect(sg3); sg3.connect(out); srcs.push(s3, lfo2);
      }
      out.connect(master); srcs.forEach(function (x) { x.start(); });
      out.gain.setTargetAtTime(1, ctx.currentTime, .3);
      return { out: out, srcs: srcs.concat(pre) };
    }
    function halt(fast) {
      timers.forEach(clearInterval); timers = [];
      if (!cur) return;
      var old = cur; cur = null; curKind = null;
      old.out.gain.setTargetAtTime(0, ctx.currentTime, fast ? .05 : .25);
      setTimeout(function () { old.srcs.forEach(function (x) { try { x.stop(); } catch (e) { /* đã dừng */ } }); old.out.disconnect(); }, fast ? 250 : 1500);
    }
    function clearTimers() { clearTimeout(endTimer); clearInterval(tickTimer); endTimer = null; tickTimer = null; endAt = 0; }
    function armTimer() {
      clearTimers();
      if (!curKind || !snd.timer) { ui(); return; }
      endAt = Date.now() + snd.timer * 60000;
      endTimer = setTimeout(function () { halt(false); clearTimers(); ui(); toast("Đã tắt âm thanh theo hẹn giờ."); }, snd.timer * 60000);
      tickTimer = setInterval(ui, 1000); ui();
    }
    function play(kind) {
      if (!ensure()) { toast("Trình duyệt này không hỗ trợ tạo âm thanh."); return; }
      if (curKind === kind) { halt(false); clearTimers(); ui(); return; }
      halt(true); cur = build(kind); curKind = kind; armTimer(); ui();
    }
    function ui() {
      panel.querySelectorAll(".schip").forEach(function (b) { var on = b.getAttribute("data-s") === curKind; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
      panel.querySelectorAll("#sTimer button").forEach(function (b) { b.classList.toggle("on", Number(b.getAttribute("data-t")) === snd.timer); });
      btn.classList.toggle("playing", !!curKind);
      var left = endAt ? Math.max(0, Math.round((endAt - Date.now()) / 1000)) : 0;
      var name = curKind ? SOUNDS.filter(function (x) { return x[0] === curKind; })[0][1] : "";
      $("#sStatus").textContent = curKind ? "Đang phát: " + name + (endAt ? ". Tắt sau " + Math.floor(left / 60) + ":" + pad(left % 60) + "." : ". Không hẹn giờ.") : "Chưa phát. Chọn một âm thanh để bắt đầu.";
      btn.textContent = curKind ? "Âm thanh · " + name : "Âm thanh";
    }
    var open = function (on) {
      panel.hidden = !on; btn.setAttribute("aria-expanded", on);
      if (on) { var np = $("#notePanel"); if (np) { np.hidden = true; $("#noteBtn").setAttribute("aria-expanded", "false"); } panel.querySelector(".schip").focus(); }
    };
    btn.addEventListener("click", function () { open(panel.hidden); });
    $("#soundClose").addEventListener("click", function () { open(false); btn.focus(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) open(false); });
    $("#schips").addEventListener("click", function (e) { var b = e.target.closest ? e.target.closest(".schip") : null; if (b) play(b.getAttribute("data-s")); });
    $("#sVol").addEventListener("input", function (e) { snd.vol = Number(e.target.value); setVol(); save(); });
    $("#sTimer").addEventListener("click", function (e) { var b = e.target.closest ? e.target.closest("button") : null; if (!b) return; snd.timer = Number(b.getAttribute("data-t")); save(); armTimer(); });
    $("#sStop").addEventListener("click", function () { halt(false); clearTimers(); ui(); });
    ui();
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
      '<div class="card"><h2>Sao lưu tiến độ</h2><p class="muted">Tiến độ chỉ lưu trên thiết bị này. Xuất file để chuyển sang máy khác hoặc phòng khi xóa dữ liệu trình duyệt.</p>' +
        '<div class="actions"><button class="btn" id="exp" type="button">Xuất file sao lưu</button><label class="btn ghost" style="cursor:pointer">Nhập file<input id="imp" type="file" accept="application/json" hidden></label></div></div>' +
      '<div class="card"><h2>Câu bị báo sai</h2><p class="muted">Đã ghi nhận ' + S.reports.length + ' câu. Danh sách này nằm trong file sao lưu để Đầy tớ xem lại và sửa nội dung.</p></div>' +
      '<div class="card"><h2>Xóa tiến độ</h2><p class="muted">Xóa toàn bộ tiến độ trên thiết bị này. Nên xuất file sao lưu trước.</p><div class="actions"><button class="btn ghost" id="reset" type="button">Xóa tiến độ…</button></div></div></div>';
  }
  function bindSettings() {
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
    $("#reset").addEventListener("click", function () {
      if (confirm("Xóa toàn bộ tiến độ trên thiết bị này? Việc này không hoàn tác được.")) { S = defaults(); save(); applyTheme(); route(); toast("Đã xóa tiến độ."); }
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
        S = Object.assign(defaults(), o); save(); applyTheme(); route(); toast("Đã nhập dữ liệu.");
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
    SESS = null; currentSec = sec;
    window.scrollTo(0, 0);
    setZen(false);
    $("#zenBtn").hidden = !(sec === "grammar" && p[1] && !p[2]); // Zen chỉ có ở trang bài học
    if (sec === "") { html = viewDashboard(); binder = bindDashboard; }
    else if (sec === "grammar") {
      if (!p[1]) html = viewGrammarList();
      else if (p[2] === "quiz") html = viewGrammarQuiz(p[1], p[3]);
      else { html = viewLesson(p[1]); binder = bindLesson; }
    } else if (sec === "vocab") {
      if (!p[1]) html = viewVocabList();
      else if (p[2]) html = viewVocabSet(p[1], p[2], p[3]);
      else html = viewVocabTopic(p[1]);
    } else if (sec === "review") {
      if (p[1] === "weak") html = viewWeak();
      else { html = viewReview(p[1] === "go"); if (html && p[1] !== "go") html += deckCard() + weakCard(); }
    } else if (sec === "deck") { html = viewDeck(); binder = bindDeck; }
    else if (sec === "placement") html = p[1] === "skip" ? togglePlacementSkip() : viewPlacement();
    else if (sec === "settings") { html = viewSettings(); binder = bindSettings; }
    else html = viewNotFound();
    renderNav(sec === "placement" ? "grammar" : sec === "deck" ? "review" : sec);
    if (html !== null) { $("#view").innerHTML = html; if (binder) binder(); }
  }
  window.addEventListener("hashchange", route);

  /* ---------- Khởi động ---------- */
  applyTheme();
  initNotebook();
  initSound();
  route();
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register("sw.js").catch(function () { /* bỏ qua nếu không đăng ký được */ });
  }
})();
