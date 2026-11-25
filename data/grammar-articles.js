/* Nội dung ngữ pháp: "Mạo từ". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "a-an": "Dùng a và an",
  "mao-tu-the": "Dùng the",
  "khong-mao-tu": "Khi không cần mạo từ"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "articles",
  title: "Mạo từ (a, an, the)",
  summary: "Khi nào dùng a, an, the và khi nào không cần mạo từ.",
  sections: [
    {
      heading: "1. A và an",
      body: "A / an đi với danh từ đếm được số ít khi nhắc đến lần đầu, khi nói một cái bất kỳ, và khi nói nghề nghiệp (She is a doctor). Dùng a trước âm phụ âm, an trước âm nguyên âm. Chú ý là dựa vào cách đọc, không dựa vào chữ cái: an hour (h câm), a university (đọc như \"yu\").",
      examples: [
        { en: "She is a doctor.", vi: "Cô ấy là bác sĩ." },
        { en: "I eat an apple every day.", vi: "Tôi ăn một quả táo mỗi ngày." },
        { en: "He waited for an hour.", vi: "Anh ấy đã đợi một tiếng." },
        { en: "It is a university.", vi: "Đó là một trường đại học." }
      ]
    },
    {
      heading: "2. The",
      body: "Dùng the khi người nói và người nghe đều biết đang nói đến cái nào: đã nhắc trước đó, chỉ có một (the sun, the moon), hoặc đã xác định rõ.",
      examples: [
        { en: "I have a dog. The dog is brown.", vi: "Tôi có một con chó. Con chó đó màu nâu." },
        { en: "The sun is very hot today.", vi: "Hôm nay mặt trời rất nóng." },
        { en: "Please open the door.", vi: "Làm ơn mở cái cửa ra." }
      ]
    },
    {
      heading: "3. Khi không cần mạo từ",
      body: "Không dùng mạo từ với danh từ số nhiều hoặc không đếm được khi nói chung, với tên các bữa ăn, môn thể thao, môn học, ngôn ngữ, và hầu hết tên người và tên quốc gia.",
      examples: [
        { en: "I like music.", vi: "Tôi thích âm nhạc." },
        { en: "She plays football on Sundays.", vi: "Cô ấy chơi bóng đá vào Chủ nhật." },
        { en: "We have lunch at noon.", vi: "Chúng tôi ăn trưa lúc 12 giờ." },
        { en: "He speaks English.", vi: "Anh ấy nói tiếng Anh." }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Không nói \"I am teacher\" (đúng: I am a teacher). Không nói \"a apple\" (đúng: an apple). Khi nói chung về một khái niệm thì không dùng the: Life is beautiful.",
      examples: [
        { en: "I am a teacher.", vi: "Tôi là giáo viên." },
        { en: "Life is beautiful.", vi: "Cuộc sống thật đẹp." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "She is ___ doctor.", options: ["a", "an", "the"], answer: "a", explain: "Doctor bắt đầu bằng âm phụ âm nên dùng a.", tag: "a-an" },
    { id: "q2", type: "mc", q: "I eat ___ apple every day.", options: ["an", "a", "the"], answer: "an", explain: "Apple bắt đầu bằng âm nguyên âm nên dùng an.", tag: "a-an" },
    { id: "q3", type: "mc", q: "He waited for ___ hour.", options: ["an", "a", "the"], answer: "an", explain: "Hour có h câm, đọc bắt đầu bằng nguyên âm nên dùng an.", tag: "a-an" },
    { id: "q4", type: "mc", q: "It is ___ university.", options: ["a", "an", "the"], answer: "a", explain: "University đọc bắt đầu bằng âm \"yu\" (phụ âm) nên dùng a.", tag: "a-an" },
    { id: "q5", type: "mc", q: "I have a dog. ___ dog is brown.", options: ["The", "A", "An"], answer: "The", explain: "Con chó đã được nhắc trước đó nên dùng the.", tag: "mao-tu-the" },
    { id: "q6", type: "mc", q: "___ sun is very hot today.", options: ["The", "A", "An"], answer: "The", explain: "Chỉ có một mặt trời nên dùng the.", tag: "mao-tu-the" },
    { id: "q7", type: "mc", q: "Please open ___ door.", options: ["the", "a", "an"], answer: "the", explain: "Cả hai người đều biết cái cửa nào nên dùng the.", tag: "mao-tu-the" },
    { id: "q8", type: "mc", q: "I like ___ music.", options: ["(không cần mạo từ)", "the", "a"], answer: "(không cần mạo từ)", explain: "Nói chung về âm nhạc thì không dùng mạo từ.", tag: "khong-mao-tu" },
    { id: "q9", type: "mc", q: "She plays ___ football on Sundays.", options: ["(không cần mạo từ)", "the", "a"], answer: "(không cần mạo từ)", explain: "Tên môn thể thao không dùng mạo từ.", tag: "khong-mao-tu" },
    { id: "q10", type: "fill", q: "I am ___ teacher. (nghề nghiệp)", answers: ["a"], answer: "a", explain: "Nghề nghiệp là danh từ đếm được số ít nên cần a.", tag: "a-an" },
    { id: "q11", type: "mc", q: "Câu nào đúng?", options: ["I am a teacher.", "I am teacher.", "I am an teacher."], answer: "I am a teacher.", explain: "Teacher bắt đầu bằng phụ âm nên dùng a, và không được bỏ mạo từ.", tag: "a-an" },
    { id: "q12", type: "mc", q: "Câu nào đúng khi nói chung về cuộc sống?", options: ["Life is beautiful.", "The life is beautiful.", "A life is beautiful."], answer: "Life is beautiful.", explain: "Nói chung về một khái niệm thì không dùng mạo từ.", tag: "khong-mao-tu" }
  ]
});
