/* Nội dung ngữ pháp: "Câu bị động cơ bản". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "bi-dong-cau-truc": "Cấu trúc bị động (be + V3)",
  "phan-tu-qua-khu": "Quá khứ phân từ (V3)",
  "bi-dong-chuyen-cau": "Chuyển câu chủ động sang bị động",
  "bi-dong-phu-dinh-cau-hoi": "Phủ định và câu hỏi bị động"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "passive",
  title: "Câu bị động cơ bản",
  summary: "Nhấn vào đối tượng chịu tác động của hành động: được, bị.",
  sections: [
    {
      heading: "1. Khi nào dùng câu bị động",
      body: "Dùng câu bị động khi muốn nhấn vào người hoặc vật chịu tác động của hành động, hoặc khi không biết hay không cần nói ai làm. Cấu trúc: be + quá khứ phân từ (V3).",
      examples: [
        { en: "English is spoken in many countries.", vi: "Tiếng Anh được nói ở nhiều nước." },
        { en: "The window was broken by a boy.", vi: "Cửa sổ bị một cậu bé làm vỡ." }
      ]
    },
    {
      heading: "2. Hiện tại đơn và quá khứ đơn bị động",
      body: "Hiện tại đơn: am / is / are + V3. Quá khứ đơn: was / were + V3. Động từ có quy tắc thì V3 thêm -ed. Động từ bất quy tắc cần học thuộc.",
      table: [
        ["V1", "V2", "V3"],
        ["make", "made", "made"],
        ["write", "wrote", "written"],
        ["build", "built", "built"],
        ["see", "saw", "seen"],
        ["break", "broke", "broken"]
      ],
      examples: [
        { en: "Rice is grown in Vietnam.", vi: "Lúa gạo được trồng ở Việt Nam." },
        { en: "This house was built in 1990.", vi: "Ngôi nhà này được xây năm 1990." },
        { en: "These letters were written by Anna.", vi: "Những lá thư này do Anna viết." }
      ]
    },
    {
      heading: "3. Chuyển từ chủ động sang bị động",
      body: "Tân ngữ của câu chủ động trở thành chủ ngữ của câu bị động. Dùng be phù hợp với thì, rồi V3. Có thể thêm by + người làm. Phủ định: am not / isn't / aren't / wasn't / weren't + V3. Câu hỏi: đưa am / is / are / was / were lên đầu.",
      examples: [
        { en: "Tom writes the letter. → The letter is written by Tom.", vi: "Tom viết lá thư. → Lá thư được Tom viết." },
        { en: "They built this bridge. → This bridge was built by them.", vi: "Họ xây cây cầu này. → Cây cầu này được họ xây." },
        { en: "Was this house built in 1990?", vi: "Ngôi nhà này có được xây năm 1990 không?" }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Không nói \"The window broke by a boy\" khi có người làm (đúng: The window was broken by a boy). Không nói \"The house built in 1990\" (đúng: The house was built in 1990). Không nói \"was wrote\" (đúng: was written).",
      examples: [
        { en: "The house was built in 1990.", vi: "Ngôi nhà được xây năm 1990." },
        { en: "The book was written by Anna.", vi: "Quyển sách do Anna viết." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "English ___ in many countries.", options: ["is spoken", "speaks", "is speak"], answer: "is spoken", explain: "Bị động hiện tại đơn: is + V3 (spoken).", tag: "bi-dong-cau-truc" },
    { id: "q2", type: "mc", q: "The window ___ by a boy yesterday.", options: ["was broken", "broke", "is broken"], answer: "was broken", explain: "Có by a boy và yesterday: bị động quá khứ đơn was + V3.", tag: "bi-dong-cau-truc" },
    { id: "q3", type: "mc", q: "Rice ___ by farmers in Vietnam.", options: ["is grown", "grows", "grow"], answer: "is grown", explain: "Có by farmers: bị động hiện tại đơn is + V3.", tag: "bi-dong-cau-truc" },
    { id: "q4", type: "mc", q: "This house ___ in 1990.", options: ["was built", "built", "is built"], answer: "was built", explain: "Mốc quá khứ (in 1990) và nhà được xây: was + V3.", tag: "bi-dong-cau-truc" },
    { id: "q5", type: "mc", q: "These letters ___ by Anna.", options: ["were written", "was written", "wrote"], answer: "were written", explain: "Letters là số nhiều nên dùng were + V3.", tag: "bi-dong-cau-truc" },
    { id: "q6", type: "fill", q: "The bridge was ___ (build) in 1995.", answers: ["built"], answer: "built", explain: "V3 của build là built.", tag: "phan-tu-qua-khu" },
    { id: "q7", type: "fill", q: "The cake was ___ (make) by my mother.", answers: ["made"], answer: "made", explain: "V3 của make là made.", tag: "phan-tu-qua-khu" },
    { id: "q8", type: "fill", q: "The letter was ___ (write) by Tom.", answers: ["written"], answer: "written", explain: "V3 của write là written.", tag: "phan-tu-qua-khu" },
    { id: "q9", type: "mc", q: "Tom writes the letter. → The letter ___ by Tom.", options: ["is written", "was written", "writes"], answer: "is written", explain: "Câu chủ động ở hiện tại đơn nên bị động dùng is + V3.", tag: "bi-dong-chuyen-cau" },
    { id: "q10", type: "mc", q: "The window ___ broken by Tom. (phủ định, quá khứ)", options: ["wasn't", "isn't", "didn't"], answer: "wasn't", explain: "Phủ định bị động quá khứ: wasn't + V3.", tag: "bi-dong-phu-dinh-cau-hoi" },
    { id: "q11", type: "mc", q: "___ this house built in 1990?", options: ["Was", "Is", "Did"], answer: "Was", explain: "Câu hỏi bị động quá khứ đơn: Was + chủ ngữ + V3.", tag: "bi-dong-phu-dinh-cau-hoi" },
    { id: "q12", type: "mc", q: "Câu nào đúng?", options: ["The house was built in 1990.", "The house built in 1990.", "The house was build in 1990."], answer: "The house was built in 1990.", explain: "Bị động cần be + V3: was built.", tag: "bi-dong-cau-truc" }
  ]
});
