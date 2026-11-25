/* Nội dung ngữ pháp: chủ đề "to be". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "chia-to-be": "Chia am / is / are theo chủ ngữ",
  "phu-dinh-to-be": "Câu phủ định với to be",
  "cau-hoi-to-be": "Câu hỏi với to be",
  "tra-loi-ngan": "Câu trả lời ngắn (Yes, I am...)",
  "viet-tat-to-be": "Viết tắt (I'm, he's...)"
});

window.GRAMMAR = [
  {
    id: "to-be",
    title: "Động từ to be (am / is / are)",
    summary: "Nền tảng đầu tiên: nói ai là gì, ai ở đâu, ai thế nào.",
    sections: [
      {
        heading: "1. Dạng của to be",
        body: "To be nghĩa là \"thì, là, ở\". Dạng của nó đổi theo chủ ngữ: I đi với am, he / she / it đi với is, còn you / we / they đi với are. Lưu ý: với tính từ (tall, tired, happy...) tiếng Việt thường không dịch to be, ví dụ She is tall = Cô ấy cao.",
        table: [
          ["Chủ ngữ", "to be", "Viết tắt"],
          ["I", "am", "I'm"],
          ["He / She / It", "is", "he's / she's / it's"],
          ["You / We / They", "are", "you're / we're / they're"]
        ],
        examples: [
          { en: "I am a student.", vi: "Tôi là học sinh." },
          { en: "She is a doctor.", vi: "Cô ấy là bác sĩ." },
          { en: "We are friends.", vi: "Chúng tôi là bạn." }
        ]
      },
      {
        heading: "2. Câu phủ định",
        body: "Thêm not sau to be. Hay dùng dạng rút gọn: is not = isn't, are not = aren't. Riêng I am not chỉ viết tắt thành I'm not, không có dạng \"amn't\".",
        examples: [
          { en: "He is not tired. (He isn't tired.)", vi: "Anh ấy không mệt." },
          { en: "They aren't at school.", vi: "Họ không ở trường." },
          { en: "I'm not hungry.", vi: "Tôi không đói." }
        ]
      },
      {
        heading: "3. Câu hỏi và câu trả lời ngắn",
        body: "Muốn đặt câu hỏi, đưa to be lên trước chủ ngữ. Câu trả lời ngắn nhắc lại chủ ngữ và to be: Yes, I am. / No, she isn't. Lưu ý: câu trả lời ngắn khẳng định không viết tắt (nói Yes, I am, không nói Yes, I'm).",
        examples: [
          { en: "Are you ready?", vi: "Bạn sẵn sàng chưa?" },
          { en: "Is she at home? — No, she isn't.", vi: "Cô ấy có ở nhà không? — Không." },
          { en: "Are you a student? — Yes, I am.", vi: "Bạn có phải là học sinh không? — Vâng, đúng vậy." }
        ]
      },
      {
        heading: "4. Lỗi hay gặp",
        body: "Không nói \"I are\" hay \"he am\". Hai người trở lên (kể cả Tom and I) là số nhiều nên dùng are. Danh từ số nhiều cũng dùng are.",
        examples: [
          { en: "Tom and I are in the same class.", vi: "Tom và tôi học cùng lớp." },
          { en: "The books are on the table.", vi: "Những quyển sách ở trên bàn." }
        ]
      }
    ],
    questions: [
      { id: "q1", type: "mc", q: "I ___ a student.", options: ["am", "is", "are"], answer: "am", explain: "Chủ ngữ I luôn đi với am.", tag: "chia-to-be" },
      { id: "q2", type: "mc", q: "She ___ a doctor.", options: ["am", "is", "are"], answer: "is", explain: "She là ngôi thứ ba số ít nên dùng is.", tag: "chia-to-be" },
      { id: "q3", type: "mc", q: "They ___ at home.", options: ["am", "is", "are"], answer: "are", explain: "They là số nhiều nên dùng are.", tag: "chia-to-be" },
      { id: "q4", type: "mc", q: "My brother ___ tall.", options: ["am", "is", "are"], answer: "is", explain: "My brother có thể thay bằng he (số ít) nên dùng is.", tag: "chia-to-be" },
      { id: "q5", type: "fill", q: "We ___ friends.", answers: ["are"], answer: "are", explain: "We là số nhiều nên dùng are.", tag: "chia-to-be" },
      { id: "q6", type: "fill", q: "It ___ a cat.", answers: ["is"], answer: "is", explain: "It đi với is.", tag: "chia-to-be" },
      { id: "q7", type: "mc", q: "He ___ my teacher. (phủ định)", options: ["isn't", "aren't", "amn't"], answer: "isn't", explain: "He đi với is, phủ định là is not = isn't. Không có dạng amn't.", tag: "phu-dinh-to-be" },
      { id: "q8", type: "fill", q: "I ___ not hungry.", answers: ["am"], answer: "am", explain: "Phủ định của I là I am not (viết tắt I'm not).", tag: "phu-dinh-to-be" },
      { id: "q9", type: "mc", q: "___ you tired?", options: ["Is", "Are", "Am"], answer: "Are", explain: "Câu hỏi đưa to be lên đầu, và you đi với are.", tag: "cau-hoi-to-be" },
      { id: "q10", type: "mc", q: "___ she your sister?", options: ["Is", "Are", "Am"], answer: "Is", explain: "She đi với is, đưa lên đầu câu hỏi: Is she...?", tag: "cau-hoi-to-be" },
      { id: "q11", type: "mc", q: "Are you a student? — Yes, I ___.", options: ["am", "are", "is"], answer: "am", explain: "Câu trả lời ngắn nhắc lại chủ ngữ: Yes, I am. Dạng khẳng định không viết tắt (không nói Yes, I'm).", tag: "tra-loi-ngan" },
      { id: "q12", type: "mc", q: "Is it cold today? — No, it ___.", options: ["isn't", "aren't", "am not"], answer: "isn't", explain: "It đi với is, phủ định ngắn là isn't.", tag: "tra-loi-ngan" },
      { id: "q13", type: "mc", q: "Câu nào viết đúng?", options: ["I'm happy.", "I'ms happy.", "I are happy."], answer: "I'm happy.", explain: "I'm là viết tắt của I am.", tag: "viet-tat-to-be" },
      { id: "q14", type: "fill", q: "Tom and I ___ in the same class.", answers: ["are"], answer: "are", explain: "Tom and I nghĩa là hai người (we) nên dùng are.", tag: "chia-to-be" }
    ]
  }
];
