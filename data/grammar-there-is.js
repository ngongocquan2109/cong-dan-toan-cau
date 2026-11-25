/* Nội dung ngữ pháp: "There is / There are và have got". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "there-is-are": "There is và there are",
  "there-phu-dinh-cau-hoi": "Phủ định và câu hỏi với there is / are",
  "have-got": "Have got / has got"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "there-is",
  title: "There is / There are và have got",
  summary: "Nói về sự tồn tại (có cái gì ở đâu) và sở hữu.",
  sections: [
    {
      heading: "1. There is và there are",
      body: "There is dùng với danh từ số ít hoặc không đếm được. There are dùng với danh từ số nhiều. Nghĩa là \"có\".",
      examples: [
        { en: "There is a book on the table.", vi: "Có một quyển sách ở trên bàn." },
        { en: "There are three students in the room.", vi: "Có ba học sinh trong phòng." },
        { en: "There is some milk in the fridge.", vi: "Có một ít sữa trong tủ lạnh." }
      ]
    },
    {
      heading: "2. Phủ định và câu hỏi",
      body: "Phủ định: there isn't (số ít) và there aren't (số nhiều). Câu hỏi: Is there...? và Are there...? Trả lời ngắn: Yes, there is. / No, there isn't. (số ít) và Yes, there are. / No, there aren't. (số nhiều).",
      examples: [
        { en: "There isn't a bank near here.", vi: "Gần đây không có ngân hàng." },
        { en: "Are there any shops here?", vi: "Ở đây có cửa hàng nào không?" },
        { en: "Is there a park? — Yes, there is.", vi: "Có công viên không? — Có." }
      ]
    },
    {
      heading: "3. Have got",
      body: "Have got có nghĩa như have (có). I / you / we / they dùng have got, he / she / it dùng has got. Phủ định: haven't got / hasn't got. Câu hỏi: Have you got...? / Has she got...? Dạng rút gọn: I've got, she's got (she's got = she has got, không phải she is).",
      examples: [
        { en: "I have got a car.", vi: "Tôi có một chiếc ô tô." },
        { en: "She has got two brothers.", vi: "Cô ấy có hai anh (em) trai." },
        { en: "Have you got a pen? — No, I haven't.", vi: "Bạn có bút không? — Không." }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Không nói \"There is two books\" (đúng: There are two books). Không nói \"It has a book on the table\" khi muốn nói \"có\" (đúng: There is a book on the table). Không nói \"She have got\" (đúng: She has got).",
      examples: [
        { en: "There are two books on the desk.", vi: "Có hai quyển sách trên bàn." },
        { en: "She has got a bike.", vi: "Cô ấy có một chiếc xe đạp." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "There ___ a book on the table.", options: ["is", "are", "has"], answer: "is", explain: "Danh từ số ít dùng there is.", tag: "there-is-are" },
    { id: "q2", type: "mc", q: "There ___ three students in the room.", options: ["are", "is", "have"], answer: "are", explain: "Danh từ số nhiều dùng there are.", tag: "there-is-are" },
    { id: "q3", type: "mc", q: "There ___ some milk in the fridge.", options: ["is", "are", "has"], answer: "is", explain: "Milk không đếm được nên dùng there is.", tag: "there-is-are" },
    { id: "q4", type: "mc", q: "There ___ a bank near here. (phủ định)", options: ["isn't", "aren't", "doesn't"], answer: "isn't", explain: "A bank là số ít nên dùng there isn't.", tag: "there-phu-dinh-cau-hoi" },
    { id: "q5", type: "mc", q: "___ there any shops here?", options: ["Are", "Is", "Do"], answer: "Are", explain: "Shops là số nhiều nên dùng Are there...?", tag: "there-phu-dinh-cau-hoi" },
    { id: "q6", type: "mc", q: "Is there a park? — Yes, there ___.", options: ["is", "are", "has"], answer: "is", explain: "Trả lời ngắn nhắc lại: Yes, there is.", tag: "there-phu-dinh-cau-hoi" },
    { id: "q7", type: "mc", q: "I ___ got a car.", options: ["have", "has", "am"], answer: "have", explain: "I đi với have got.", tag: "have-got" },
    { id: "q8", type: "mc", q: "She ___ got two brothers.", options: ["has", "have", "is"], answer: "has", explain: "She đi với has got.", tag: "have-got" },
    { id: "q9", type: "mc", q: "Have you got a pen? — No, I ___.", options: ["haven't", "hasn't", "don't"], answer: "haven't", explain: "Trả lời ngắn nhắc lại have: No, I haven't.", tag: "have-got" },
    { id: "q10", type: "fill", q: "He ___ got a dog. (phủ định)", answers: ["hasn't", "has not"], answer: "hasn't", explain: "He đi với has, phủ định là hasn't got.", tag: "have-got" },
    { id: "q11", type: "mc", q: "Câu nào đúng?", options: ["There are two books.", "There is two books.", "It has two books."], answer: "There are two books.", explain: "Hai quyển sách là số nhiều nên dùng there are.", tag: "there-is-are" },
    { id: "q12", type: "mc", q: "Câu nào đúng?", options: ["She has got a bike.", "She have got a bike.", "She has get a bike."], answer: "She has got a bike.", explain: "She đi với has got.", tag: "have-got" }
  ]
});
