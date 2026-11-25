/* Nội dung ngữ pháp: "Tính từ và trạng từ". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "tinh-tu": "Tính từ (vị trí, không đổi số nhiều)",
  "trang-tu-cach-thuc": "Trạng từ chỉ cách thức",
  "tinh-tu-hay-trang-tu": "Phân biệt tính từ và trạng từ",
  "trang-tu-muc-do": "Trạng từ chỉ mức độ (very, too)"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "adjectives-adverbs",
  title: "Tính từ và trạng từ",
  summary: "Mô tả người, vật bằng tính từ và mô tả hành động bằng trạng từ.",
  sections: [
    {
      heading: "1. Tính từ",
      body: "Tính từ mô tả danh từ. Tính từ đứng trước danh từ hoặc sau to be, và không đổi dạng theo số nhiều. Tính từ cũng đứng sau look, feel, seem (She looks happy, không nói \"looks happily\").",
      examples: [
        { en: "She has a big house.", vi: "Cô ấy có một ngôi nhà lớn." },
        { en: "The house is big.", vi: "Ngôi nhà lớn." },
        { en: "They live in two big houses.", vi: "Họ sống trong hai ngôi nhà lớn." }
      ]
    },
    {
      heading: "2. Trạng từ chỉ cách thức",
      body: "Trạng từ mô tả cách một hành động được thực hiện. Thường thêm -ly vào tính từ (slow → slowly, careful → carefully). Phụ âm + y đổi thành ily (happy → happily). Một số trạng từ đặc biệt: good → well, fast → fast, hard → hard (hardly nghĩa là hầu như không).",
      examples: [
        { en: "She speaks slowly.", vi: "Cô ấy nói chậm rãi." },
        { en: "He works hard.", vi: "Anh ấy làm việc chăm chỉ." },
        { en: "She sings well.", vi: "Cô ấy hát hay." }
      ]
    },
    {
      heading: "3. Trạng từ chỉ mức độ",
      body: "Very, really, too đứng trước tính từ hoặc trạng từ để nhấn mạnh mức độ. Too nghĩa là quá, thường mang ý không tốt.",
      examples: [
        { en: "It is very cold today.", vi: "Hôm nay trời rất lạnh." },
        { en: "She is really kind.", vi: "Cô ấy thật sự tốt bụng." },
        { en: "It is too hot to sleep.", vi: "Trời nóng quá nên không ngủ được." }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Trong tiếng Anh chuẩn, không nói \"She speaks slow\" (đúng: She speaks slowly). Không nói \"He sings good\" (đúng: He sings well). Tính từ đứng trước danh từ: a big house, không phải \"a house big\".",
      examples: [
        { en: "He drives carefully.", vi: "Anh ấy lái xe cẩn thận." },
        { en: "She is a good singer. She sings well.", vi: "Cô ấy là ca sĩ giỏi. Cô ấy hát hay." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "She has a ___ house.", options: ["big", "bigly", "bigs"], answer: "big", explain: "Trước danh từ dùng tính từ: big.", tag: "tinh-tu" },
    { id: "q2", type: "mc", q: "They live in two ___ houses.", options: ["big", "bigs", "bigly"], answer: "big", explain: "Tính từ không đổi dạng theo số nhiều.", tag: "tinh-tu" },
    { id: "q3", type: "mc", q: "She speaks ___.", options: ["slowly", "slow", "slows"], answer: "slowly", explain: "Bổ nghĩa cho động từ speaks cần trạng từ: slowly.", tag: "trang-tu-cach-thuc" },
    { id: "q4", type: "mc", q: "He drives ___.", options: ["carefully", "careful", "carefuly"], answer: "carefully", explain: "Trạng từ của careful là carefully (thêm -ly, giữ hai chữ l).", tag: "trang-tu-cach-thuc" },
    { id: "q5", type: "fill", q: "She sings ___. (good)", answers: ["well"], answer: "well", explain: "Trạng từ của good là well.", tag: "trang-tu-cach-thuc" },
    { id: "q6", type: "mc", q: "He works ___ every day. (chăm chỉ)", options: ["hard", "hardly", "harder"], answer: "hard", explain: "Hard vừa là tính từ vừa là trạng từ. Hardly nghĩa là hầu như không.", tag: "trang-tu-cach-thuc" },
    { id: "q7", type: "mc", q: "He runs ___.", options: ["fast", "fastly", "fasts"], answer: "fast", explain: "Fast vừa là tính từ vừa là trạng từ, không thêm -ly.", tag: "trang-tu-cach-thuc" },
    { id: "q8", type: "fill", q: "She is happy. She smiles ___. (happy)", answers: ["happily"], answer: "happily", explain: "Tận cùng y đổi thành ily: happily.", tag: "trang-tu-cach-thuc" },
    { id: "q9", type: "mc", q: "It is ___ cold today.", options: ["very", "much", "many"], answer: "very", explain: "Very đứng trước tính từ để nhấn mạnh mức độ.", tag: "trang-tu-muc-do" },
    { id: "q10", type: "mc", q: "Câu nào đúng?", options: ["She speaks slowly.", "She speaks slow.", "She speaks slowlyly."], answer: "She speaks slowly.", explain: "Bổ nghĩa cho động từ cần trạng từ slowly.", tag: "trang-tu-cach-thuc" },
    { id: "q11", type: "mc", q: "Câu nào đúng?", options: ["a big house", "a house big", "a bigly house"], answer: "a big house", explain: "Tính từ đứng trước danh từ.", tag: "tinh-tu" },
    { id: "q12", type: "mc", q: "Từ nào là trạng từ?", options: ["quickly", "beautiful", "happy"], answer: "quickly", explain: "Quickly (thêm -ly vào quick) là trạng từ.", tag: "tinh-tu-hay-trang-tu" }
  ]
});
