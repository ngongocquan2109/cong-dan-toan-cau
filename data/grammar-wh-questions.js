/* Nội dung ngữ pháp: "Câu hỏi Wh-". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "wh-tu-hoi": "Chọn từ để hỏi (what, where, who...)",
  "wh-cau-truc": "Cấu trúc câu hỏi Wh-",
  "wh-who-chu-ngu": "Who làm chủ ngữ"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "wh-questions",
  title: "Câu hỏi Wh- (what, where, who...)",
  summary: "Hỏi thông tin: cái gì, ở đâu, ai, khi nào, tại sao, như thế nào.",
  sections: [
    {
      heading: "1. Các từ để hỏi",
      body: "What (cái gì), Where (ở đâu), Who (ai), When (khi nào), Why (tại sao), How (như thế nào), Which (cái nào), Whose (của ai). How kết hợp với từ khác: How old (bao nhiêu tuổi), How many (bao nhiêu, đếm được), How much (bao nhiêu, không đếm được hoặc giá tiền).",
      examples: [
        { en: "What is your name?", vi: "Tên bạn là gì?" },
        { en: "Where do you live?", vi: "Bạn sống ở đâu?" },
        { en: "Who is that man?", vi: "Người đàn ông kia là ai?" }
      ]
    },
    {
      heading: "2. Cấu trúc câu hỏi",
      body: "Với to be: Wh- + am / is / are + chủ ngữ. Với động từ thường ở hiện tại: Wh- + do / does + chủ ngữ + động từ nguyên mẫu. Ở quá khứ với động từ thường: Wh- + did + chủ ngữ + động từ nguyên mẫu; với to be: Wh- + was / were + chủ ngữ (Where were you?).",
      examples: [
        { en: "Where are you from?", vi: "Bạn đến từ đâu?" },
        { en: "What does she do?", vi: "Cô ấy làm nghề gì?" },
        { en: "When did you arrive?", vi: "Bạn đã đến lúc nào?" }
      ]
    },
    {
      heading: "3. Why, because và how",
      body: "Why hỏi lý do, trả lời bằng Because. How hỏi cách thức, và đi kèm tính từ để hỏi mức độ.",
      examples: [
        { en: "Why are you late? — Because the bus was late.", vi: "Tại sao bạn đến muộn? — Vì xe buýt đến trễ." },
        { en: "How do you go to work?", vi: "Bạn đi làm bằng cách nào?" },
        { en: "How old are you?", vi: "Bạn bao nhiêu tuổi?" }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Không nói \"Where you live?\" (đúng: Where do you live?) và không nói \"What does she wants?\" (đúng: What does she want?). Khi who hỏi về chủ ngữ thì không cần do / does: Who lives here?",
      examples: [
        { en: "Who lives here?", vi: "Ai sống ở đây?" },
        { en: "What does she want?", vi: "Cô ấy muốn gì?" }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "___ is your name?", options: ["What", "Where", "Who"], answer: "What", explain: "Hỏi tên là hỏi \"cái gì\": What.", tag: "wh-tu-hoi" },
    { id: "q2", type: "mc", q: "___ do you live?", options: ["Where", "Who", "Why"], answer: "Where", explain: "Hỏi nơi sống dùng Where.", tag: "wh-tu-hoi" },
    { id: "q3", type: "mc", q: "___ is that man? — He is my uncle.", options: ["Who", "What", "When"], answer: "Who", explain: "Hỏi về người dùng Who.", tag: "wh-tu-hoi" },
    { id: "q4", type: "mc", q: "___ did you arrive? — At six o'clock.", options: ["When", "Where", "Who"], answer: "When", explain: "Hỏi thời gian dùng When.", tag: "wh-tu-hoi" },
    { id: "q5", type: "mc", q: "___ are you late? — Because the bus was late.", options: ["Why", "How", "Which"], answer: "Why", explain: "Hỏi lý do dùng Why, trả lời bằng Because.", tag: "wh-tu-hoi" },
    { id: "q6", type: "mc", q: "___ old are you?", options: ["How", "What", "Which"], answer: "How", explain: "Hỏi tuổi dùng How old.", tag: "wh-tu-hoi" },
    { id: "q7", type: "mc", q: "Where ___ you from?", options: ["are", "do", "does"], answer: "are", explain: "Câu hỏi với to be: Where are you from?", tag: "wh-cau-truc" },
    { id: "q8", type: "mc", q: "What ___ she do?", options: ["does", "do", "is"], answer: "does", explain: "She đi với does ở câu hỏi hiện tại đơn.", tag: "wh-cau-truc" },
    { id: "q9", type: "fill", q: "When did you ___ (arrive)?", answers: ["arrive"], answer: "arrive", explain: "Sau did, động từ ở dạng nguyên mẫu.", tag: "wh-cau-truc" },
    { id: "q10", type: "mc", q: "Câu nào đúng?", options: ["Where do you live?", "Where you live?", "Where does you live?"], answer: "Where do you live?", explain: "Câu hỏi với động từ thường cần trợ động từ do đứng trước you.", tag: "wh-cau-truc" },
    { id: "q11", type: "mc", q: "Câu nào đúng?", options: ["What does she want?", "What does she wants?", "What she wants?"], answer: "What does she want?", explain: "Sau does, động từ giữ nguyên mẫu: want.", tag: "wh-cau-truc" },
    { id: "q12", type: "mc", q: "___ lives here? — My brother.", options: ["Who", "Does who", "Who does"], answer: "Who", explain: "Who hỏi về chủ ngữ nên không cần do / does: Who lives here?", tag: "wh-who-chu-ngu" }
  ]
});
