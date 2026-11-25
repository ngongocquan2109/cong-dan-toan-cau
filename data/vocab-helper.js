/* Trình nạp từ vựng: mỗi chủ đề là một danh sách dòng gọn
   [từ, phiên âm, loại từ, nghĩa tiếng Việt, câu ví dụ, bản dịch câu ví dụ].
   Tự chia thành các bộ 10 từ. */
window.VOCAB = window.VOCAB || [];
window.TAG_LABELS = window.TAG_LABELS || {};
window.addVocab = function (id, title, summary, rows) {
  var POS = { n: "danh từ", v: "động từ", adj: "tính từ", adv: "trạng từ", prep: "giới từ", conj: "liên từ", pron: "đại từ", det: "hạn định từ" };
  var words = rows.map(function (r) {
    return { w: r[0], ipa: r[1], pos: POS[r[2]] || r[2], vi: r[3], ex: r[4], exVi: r[5] };
  });
  var sets = [];
  for (var i = 0; i < words.length; i += 10) {
    sets.push({ id: "s" + (i / 10 + 1), title: "Bộ " + (i / 10 + 1), words: words.slice(i, i + 10) });
  }
  window.VOCAB.push({ id: id, title: title, summary: summary, sets: sets });
  window.TAG_LABELS["tu-vung-" + id] = "Từ vựng: " + title;
};
