/* Nội dung ngữ pháp: "Động từ khuyết thiếu". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "modal-can": "Can / can't, could (khả năng, xin phép, nhờ vả)",
  "modal-must": "Must, mustn't, don't have to",
  "modal-should": "Should, shouldn't (lời khuyên)",
  "modal-cau-truc": "Cấu trúc động từ khuyết thiếu"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "modals",
  title: "Động từ khuyết thiếu (can, must, should)",
  summary: "Nói về khả năng, sự cho phép, bắt buộc và lời khuyên.",
  sections: [
    {
      heading: "1. Can / can't và could",
      body: "Can dùng để nói về khả năng, xin phép và nhờ vả (Can you help me?). Phủ định là can't (cannot). Could dùng khi nhờ vả hoặc xin phép lịch sự hơn.",
      examples: [
        { en: "She can swim.", vi: "Cô ấy biết bơi." },
        { en: "Can I open the window?", vi: "Tôi mở cửa sổ được không?" },
        { en: "I can't hear you.", vi: "Tôi không nghe thấy bạn." },
        { en: "Could you help me, please?", vi: "Bạn có thể giúp tôi được không ạ?" }
      ]
    },
    {
      heading: "2. Must, mustn't và don't have to",
      body: "Must nghĩa là phải (bắt buộc). Mustn't nghĩa là cấm, không được phép. Don't have to nghĩa là không cần phải (không bắt buộc), khác hẳn mustn't (cấm). Have to không phải động từ khuyết thiếu nên dùng don't / doesn't: He doesn't have to come.",
      examples: [
        { en: "You must wear a helmet.", vi: "Bạn phải đội mũ bảo hiểm." },
        { en: "You mustn't park here.", vi: "Bạn không được đỗ xe ở đây." },
        { en: "You don't have to come early.", vi: "Bạn không cần phải đến sớm." }
      ]
    },
    {
      heading: "3. Should và shouldn't",
      body: "Should dùng để khuyên ai nên làm gì. Shouldn't là khuyên không nên.",
      examples: [
        { en: "You should drink more water.", vi: "Bạn nên uống nhiều nước hơn." },
        { en: "He shouldn't eat so much sugar.", vi: "Anh ấy không nên ăn nhiều đường như vậy." }
      ]
    },
    {
      heading: "4. Quy tắc chung và lỗi hay gặp",
      body: "Sau động từ khuyết thiếu là động từ nguyên mẫu, không có to và không thêm -s. Câu hỏi đưa động từ khuyết thiếu lên đầu, không dùng do / does. Không nói \"She cans swim\", \"He can to swim\" hay \"Does she can swim?\".",
      examples: [
        { en: "She can swim.", vi: "Cô ấy biết bơi." },
        { en: "Can she swim?", vi: "Cô ấy có biết bơi không?" }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "She ___ swim very well.", options: ["can", "cans", "is can"], answer: "can", explain: "Can không thêm -s với she.", tag: "modal-can" },
    { id: "q2", type: "mc", q: "I ___ hear you. The music is too loud. (phủ định)", options: ["can't", "don't can", "not can"], answer: "can't", explain: "Phủ định của can là can't, không dùng don't.", tag: "modal-can" },
    { id: "q3", type: "mc", q: "___ I open the window?", options: ["Can", "Do", "Am"], answer: "Can", explain: "Xin phép dùng Can I...? Động từ khuyết thiếu đứng đầu câu hỏi.", tag: "modal-can" },
    { id: "q4", type: "mc", q: "You ___ wear a helmet. It's the law.", options: ["must", "can", "might"], answer: "must", explain: "Luật bắt buộc nên dùng must.", tag: "modal-must" },
    { id: "q5", type: "mc", q: "You ___ park here. It's forbidden.", options: ["mustn't", "don't have to", "can"], answer: "mustn't", explain: "Bị cấm thì dùng mustn't.", tag: "modal-must" },
    { id: "q6", type: "mc", q: "You ___ come early. The class starts at ten.", options: ["don't have to", "mustn't", "can't"], answer: "don't have to", explain: "Không cần đến sớm (không bắt buộc) là don't have to; mustn't là cấm.", tag: "modal-must" },
    { id: "q7", type: "mc", q: "You look tired. You ___ go to bed early.", options: ["should", "must to", "can to"], answer: "should", explain: "Đưa lời khuyên dùng should + động từ nguyên mẫu.", tag: "modal-should" },
    { id: "q8", type: "mc", q: "He ___ eat so much sugar. It's bad for him.", options: ["shouldn't", "doesn't should", "not should"], answer: "shouldn't", explain: "Khuyên không nên dùng shouldn't.", tag: "modal-should" },
    { id: "q9", type: "fill", q: "Can she ___ (drive)?", answers: ["drive"], answer: "drive", explain: "Sau can là động từ nguyên mẫu.", tag: "modal-cau-truc" },
    { id: "q10", type: "mc", q: "Câu nào đúng?", options: ["She can swim.", "She cans swim.", "She can to swim."], answer: "She can swim.", explain: "Can không thêm -s và không có to sau nó.", tag: "modal-cau-truc" },
    { id: "q11", type: "mc", q: "Câu nào đúng?", options: ["Can she swim?", "Does she can swim?", "Can she swims?"], answer: "Can she swim?", explain: "Đưa can lên đầu, không dùng does, và động từ giữ nguyên mẫu.", tag: "modal-cau-truc" },
    { id: "q12", type: "mc", q: "\"Could you help me, please?\" dùng để làm gì?", options: ["Nhờ giúp một cách lịch sự", "Cấm làm việc gì", "Nói về điều bắt buộc"], answer: "Nhờ giúp một cách lịch sự", explain: "Could you...? là cách nhờ vả lịch sự.", tag: "modal-can" }
  ]
});
