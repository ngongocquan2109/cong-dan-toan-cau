/* Nội dung ngữ pháp: "Tương lai (will và be going to)". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "cau-truc-will": "Cấu trúc will + động từ",
  "sau-will": "Sau will dùng động từ nguyên mẫu",
  "cau-truc-going-to": "Cấu trúc am / is / are going to",
  "phu-dinh-tuong-lai": "Phủ định thì tương lai",
  "cau-hoi-tuong-lai": "Câu hỏi và trả lời ngắn tương lai",
  "chon-will-going-to": "Chọn will hay going to"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "future",
  title: "Tương lai (will và be going to)",
  summary: "Nói về điều sẽ xảy ra, kế hoạch và dự đoán.",
  sections: [
    {
      heading: "1. Will + động từ nguyên mẫu",
      body: "Will dùng cho mọi chủ ngữ, theo sau là động từ nguyên mẫu. Dùng để quyết định ngay lúc nói, đưa ra lời hứa hoặc lời đề nghị, và dự đoán theo ý kiến của người nói (thường có I think...). Viết tắt: I will = I'll. Phủ định: will not = won't.",
      examples: [
        { en: "I'll help you.", vi: "Tôi sẽ giúp bạn." },
        { en: "It will rain tomorrow.", vi: "Ngày mai trời sẽ mưa." },
        { en: "She won't come to the party.", vi: "Cô ấy sẽ không đến bữa tiệc." }
      ]
    },
    {
      heading: "2. Be going to + động từ nguyên mẫu",
      body: "Dùng am / is / are going to cho kế hoạch, ý định đã có từ trước, hoặc dự đoán dựa trên dấu hiệu đang thấy. Viết tắt: I'm, he's, they're going to. Lưu ý: going to + động từ nguyên mẫu (I'm going to study) khác với going to + nơi chốn (I'm going to school = tôi đang đi đến trường).",
      table: [
        ["Cấu trúc", "Công thức", "Ví dụ"],
        ["will", "will + V", "I will call you."],
        ["be going to", "am / is / are + going to + V", "He is going to travel."]
      ],
      examples: [
        { en: "I am going to visit my aunt this weekend.", vi: "Cuối tuần này tôi định đi thăm dì." },
        { en: "She is going to study medicine.", vi: "Cô ấy định học ngành y." },
        { en: "Look at the clouds! It is going to rain.", vi: "Nhìn mây kìa! Trời sắp mưa rồi." }
      ]
    },
    {
      heading: "3. Phủ định, câu hỏi và trả lời ngắn",
      body: "Will: phủ định won't, câu hỏi đưa will lên đầu (Will you...?), trả lời ngắn Yes, I will. / No, I won't. Be going to: thêm not sau am / is / are, câu hỏi đưa am / is / are lên đầu (Are you going to...?), trả lời ngắn Yes, I am. / No, I am not.",
      examples: [
        { en: "Will you come tomorrow? — Yes, I will.", vi: "Ngày mai bạn sẽ đến chứ? — Vâng, tôi sẽ đến." },
        { en: "Are you going to cook? — No, I am not.", vi: "Bạn định nấu ăn không? — Không, tôi không định." },
        { en: "He isn't going to work tomorrow.", vi: "Ngày mai anh ấy sẽ không đi làm." }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Sau will là động từ nguyên mẫu, không thêm -s và không thêm to: không nói \"She will goes\" hay \"She will to go\" (đúng: She will go). Hay đi kèm các từ chỉ thời gian: tomorrow (ngày mai), next week (tuần sau), tonight (tối nay), soon (sớm).",
      examples: [
        { en: "She will go to Da Nang next week.", vi: "Tuần sau cô ấy sẽ đi Đà Nẵng." },
        { en: "We will meet tomorrow.", vi: "Ngày mai chúng ta sẽ gặp nhau." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "I ___ call you tomorrow.", options: ["will", "am", "do"], answer: "will", explain: "Nói về việc sẽ làm ngày mai: will + động từ nguyên mẫu.", tag: "cau-truc-will" },
    { id: "q2", type: "mc", q: "She ___ come to the party. (phủ định)", options: ["won't", "doesn't", "isn't"], answer: "won't", explain: "Phủ định của will là won't (will not).", tag: "phu-dinh-tuong-lai" },
    { id: "q3", type: "mc", q: "It ___ rain tomorrow.", options: ["will", "wills", "is will"], answer: "will", explain: "Will không đổi dạng theo chủ ngữ, không thêm -s.", tag: "cau-truc-will" },
    { id: "q4", type: "fill", q: "He will ___ (go) to Da Nang next week.", answers: ["go"], answer: "go", explain: "Sau will là động từ nguyên mẫu: will go.", tag: "sau-will" },
    { id: "q5", type: "mc", q: "She will ___ English.", options: ["study", "studies", "to study"], answer: "study", explain: "Sau will là động từ nguyên mẫu, không thêm -es và không thêm to.", tag: "sau-will" },
    { id: "q6", type: "mc", q: "___ you come tomorrow? — Yes, I will.", options: ["Will", "Do", "Are"], answer: "Will", explain: "Câu hỏi với will đưa will lên đầu; câu trả lời Yes, I will cũng cho thấy câu hỏi dùng will.", tag: "cau-hoi-tuong-lai" },
    { id: "q7", type: "mc", q: "I ___ going to visit my aunt this weekend.", options: ["am", "is", "are"], answer: "am", explain: "I đi với am: I am going to...", tag: "cau-truc-going-to" },
    { id: "q8", type: "mc", q: "She ___ going to study medicine.", options: ["is", "am", "are"], answer: "is", explain: "She đi với is: She is going to...", tag: "cau-truc-going-to" },
    { id: "q9", type: "fill", q: "They ___ going to travel next month.", answers: ["are"], answer: "are", explain: "They đi với are: They are going to...", tag: "cau-truc-going-to" },
    { id: "q10", type: "mc", q: "Look at the clouds! It ___ rain.", options: ["is going to", "are going to", "goes to"], answer: "is going to", explain: "Dự đoán dựa trên dấu hiệu đang thấy (mây đen) dùng be going to, và It đi với is.", tag: "chon-will-going-to" },
    { id: "q11", type: "mc", q: "He ___ going to work tomorrow. (phủ định)", options: ["isn't", "doesn't", "don't"], answer: "isn't", explain: "Phủ định của is going to là isn't going to.", tag: "phu-dinh-tuong-lai" },
    { id: "q12", type: "mc", q: "Are you going to cook? — No, I ___.", options: ["am not", "isn't", "won't"], answer: "am not", explain: "Trả lời câu hỏi be going to bằng chính to be: No, I am not.", tag: "cau-hoi-tuong-lai" },
    { id: "q13", type: "mc", q: "Câu nào đúng?", options: ["She will go to Da Nang.", "She will goes to Da Nang.", "She will to go to Da Nang."], answer: "She will go to Da Nang.", explain: "Sau will là động từ nguyên mẫu, không thêm -es và không thêm to.", tag: "sau-will" },
    { id: "q14", type: "mc", q: "The phone is ringing. — I ___ answer it.", options: ["will", "am going to", "am"], answer: "will", explain: "Quyết định ngay lúc nói (chưa có kế hoạch từ trước) dùng will: I'll answer it.", tag: "chon-will-going-to" }
  ]
});
