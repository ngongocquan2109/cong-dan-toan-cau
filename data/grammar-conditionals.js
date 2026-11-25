/* Nội dung ngữ pháp: "Câu điều kiện loại 0 và loại 1". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "dk-loai-0": "Câu điều kiện loại 0",
  "dk-loai-1": "Câu điều kiện loại 1",
  "dk-unless": "Unless và phủ định trong điều kiện"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "conditionals",
  title: "Câu điều kiện (loại 0 và loại 1)",
  summary: "Nói về điều kiện và kết quả: nếu ... thì ...",
  sections: [
    {
      heading: "1. Loại 0: sự thật hiển nhiên",
      body: "If + hiện tại đơn, hiện tại đơn. Dùng cho sự thật luôn đúng và quy luật tự nhiên.",
      examples: [
        { en: "If you heat ice, it melts.", vi: "Nếu bạn đun nóng đá, nó tan chảy." },
        { en: "If it rains, the grass gets wet.", vi: "Nếu trời mưa, cỏ bị ướt." }
      ]
    },
    {
      heading: "2. Loại 1: khả năng có thật ở tương lai",
      body: "If + hiện tại đơn, will + động từ nguyên mẫu. Dùng khi điều kiện có thể xảy ra và ta nói về kết quả trong tương lai.",
      examples: [
        { en: "If it rains tomorrow, we will stay at home.", vi: "Nếu ngày mai trời mưa, chúng tôi sẽ ở nhà." },
        { en: "If you study hard, you will pass the exam.", vi: "Nếu bạn học chăm chỉ, bạn sẽ đỗ kỳ thi." },
        { en: "She will be happy if you call her.", vi: "Cô ấy sẽ vui nếu bạn gọi cho cô ấy." }
      ]
    },
    {
      heading: "3. Phủ định, unless và dấu phẩy",
      body: "Phủ định bằng don't / doesn't trong mệnh đề if. Unless có nghĩa là if ... not (nếu không), nên không dùng thêm phủ định sau unless: không nói \"Unless you don't hurry\". Khi mệnh đề if đứng đầu câu thì có dấu phẩy ở giữa; khi đứng sau thì không cần.",
      examples: [
        { en: "If you don't hurry, you will be late.", vi: "Nếu bạn không nhanh lên, bạn sẽ bị muộn." },
        { en: "Unless you hurry, you will be late.", vi: "Bạn sẽ bị muộn trừ khi bạn nhanh lên." },
        { en: "I will call you if I have time.", vi: "Tôi sẽ gọi cho bạn nếu tôi có thời gian." }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Không dùng will trong mệnh đề if: không nói \"If it will rain\" (đúng: If it rains) và không nói \"If I will see him\" (đúng: If I see him).",
      examples: [
        { en: "If it rains, I will take an umbrella.", vi: "Nếu trời mưa, tôi sẽ mang ô." },
        { en: "If I see him, I will tell him.", vi: "Nếu tôi gặp anh ấy, tôi sẽ nói với anh ấy." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "If you heat ice, it ___. (sự thật hiển nhiên)", options: ["melts", "melted", "melting"], answer: "melts", explain: "Câu điều kiện loại 0 dùng hiện tại đơn ở cả hai vế.", tag: "dk-loai-0" },
    { id: "q2", type: "mc", q: "If it rains tomorrow, we ___ at home.", options: ["will stay", "stayed", "staying"], answer: "will stay", explain: "Loại 1: kết quả dùng will + động từ nguyên mẫu.", tag: "dk-loai-1" },
    { id: "q3", type: "mc", q: "If you study hard, you ___ the exam.", options: ["will pass", "passes", "passed"], answer: "will pass", explain: "Loại 1: will + động từ nguyên mẫu.", tag: "dk-loai-1" },
    { id: "q4", type: "fill", q: "If it rains, I will ___ (take) an umbrella.", answers: ["take"], answer: "take", explain: "Sau will là động từ nguyên mẫu.", tag: "dk-loai-1" },
    { id: "q5", type: "mc", q: "If it ___ tomorrow, we will stay at home.", options: ["rains", "will rain", "rained"], answer: "rains", explain: "Mệnh đề if dùng hiện tại đơn, không dùng will.", tag: "dk-loai-1" },
    { id: "q6", type: "mc", q: "If I ___ time, I will call you.", options: ["have", "will have", "had"], answer: "have", explain: "Mệnh đề if dùng hiện tại đơn.", tag: "dk-loai-1" },
    { id: "q7", type: "mc", q: "If you don't hurry, you ___ late.", options: ["will be", "are", "were"], answer: "will be", explain: "Kết quả ở tương lai dùng will be.", tag: "dk-loai-1" },
    { id: "q8", type: "mc", q: "___ you hurry, you will be late. (nếu không)", options: ["Unless", "If", "Because"], answer: "Unless", explain: "Unless nghĩa là nếu không (if ... not).", tag: "dk-unless" },
    { id: "q9", type: "mc", q: "I will call you ___ I have time.", options: ["if", "unless", "but"], answer: "if", explain: "If nghĩa là nếu, dùng để nêu điều kiện.", tag: "dk-loai-1" },
    { id: "q10", type: "mc", q: "Câu nào đúng với điều kiện loại 1?", options: ["If it rains, I will stay home.", "If it will rain, I will stay home.", "If it rains, I would stay home."], answer: "If it rains, I will stay home.", explain: "Loại 1: if + hiện tại đơn, will + động từ nguyên mẫu.", tag: "dk-loai-1" },
    { id: "q11", type: "mc", q: "Câu nào đúng với điều kiện loại 1?", options: ["If I see him, I will tell him.", "If I will see him, I will tell him.", "If I saw him, I will tell him."], answer: "If I see him, I will tell him.", explain: "Mệnh đề if dùng hiện tại đơn, không dùng will hay quá khứ.", tag: "dk-loai-1" },
    { id: "q12", type: "mc", q: "Mệnh đề if trong câu điều kiện loại 1 dùng thì nào?", options: ["Hiện tại đơn", "Tương lai với will", "Quá khứ đơn"], answer: "Hiện tại đơn", explain: "Mệnh đề if dùng hiện tại đơn, mệnh đề kết quả dùng will.", tag: "dk-loai-1" }
  ]
});
