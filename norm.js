/* Chuẩn hóa câu tự gõ để chấm (Phần L): normSent(a) === normSent(b) nghĩa là hai câu coi như giống nhau. */
(function () {
  "use strict";
  var PRON = "he|she|it|that|there|what|who|where|here|how";
  var NEG = [ // viết tắt phủ định đặc biệt trước, rồi dạng chung X + n't
    [/\bwon't\b/g, "will not"], [/\bshan't\b/g, "shall not"], [/\bcan't\b/g, "can not"], [/\bcannot\b/g, "can not"], [/\bain't\b/g, "is not"],
    [/\b(\w+)n't\b/g, "$1 not"]
  ];
  var REST = [
    [/\bi'm\b/g, "i am"], [/\blet's\b/g, "let us"],
    [/\b(\w+)'re\b/g, "$1 are"], [/\b(\w+)'ve\b/g, "$1 have"], [/\b(\w+)'ll\b/g, "$1 will"], [/\b(\w+)'d\b/g, "$1 would|had"],
    [new RegExp("\\b(" + PRON + ")'s\\b", "g"), "$1 is|has"]
  ];
  function normSent(s) {
    var x = String(s == null ? "" : s).toLowerCase()
      .replace(/[’‘ʼ`´]/g, "'").replace(/[“”]/g, '"')
      .replace(/\s+/g, " ").trim()
      .replace(/[\s.!?]+$/, "")          // bỏ dấu câu cuối
      .replace(/\s*,\s*/g, " ");          // dấu phẩy không làm câu sai
    NEG.concat(REST).forEach(function (r) { x = x.replace(r[0], r[1]); });
    // dạng đủ "he is" / "he has" cũng về cùng một dạng với "he's" (chấp nhận cả hai cách hiểu)
    x = x.replace(new RegExp("\\b(" + PRON + ") (is|has)\\b(?!\\|)", "g"), "$1 is|has");
    x = x.replace(/\b(i|you|we|they|he|she|it) (would|had)\b(?!\|)/g, "$1 would|had");
    return x.replace(/\s+/g, " ").trim();
  }
  function sentMatch(input, answers) {
    var v = normSent(input);
    return !!v && (answers || []).some(function (a) { return normSent(a) === v; });
  }
  window.normSent = normSent;
  window.sentMatch = sentMatch;
})();
