/* Nội dung ngữ pháp: "So sánh". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "so-sanh-hon": "So sánh hơn",
  "so-sanh-nhat": "So sánh nhất",
  "chinh-ta-so-sanh": "Chính tả -er / -est",
  "bat-quy-tac-so-sanh": "So sánh bất quy tắc (good, bad)",
  "so-sanh-bang": "So sánh bằng (as ... as)"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "comparison",
  title: "So sánh hơn và so sánh nhất",
  summary: "So sánh người và vật: hơn, nhất và bằng nhau.",
  sections: [
    {
      heading: "1. So sánh hơn",
      body: "Tính từ ngắn (một âm tiết, hoặc hai âm tiết tận cùng -y như happy, easy) thêm -er rồi than. Tính từ dài (phần lớn tính từ từ hai âm tiết trở lên) dùng more + tính từ + than.",
      examples: [
        { en: "Tom is taller than Ben.", vi: "Tom cao hơn Ben." },
        { en: "This book is more interesting than that one.", vi: "Quyển sách này thú vị hơn quyển kia." },
        { en: "My car is faster than yours.", vi: "Xe của tôi nhanh hơn xe của bạn." }
      ]
    },
    {
      heading: "2. So sánh nhất",
      body: "Tính từ ngắn (kể cả happy → the happiest) dùng the + tính từ-est. Tính từ dài dùng the most + tính từ. Thường đi với in hoặc of để chỉ phạm vi.",
      examples: [
        { en: "She is the tallest girl in the class.", vi: "Cô ấy là cô gái cao nhất lớp." },
        { en: "This is the most expensive watch.", vi: "Đây là chiếc đồng hồ đắt nhất." },
        { en: "He is the youngest in his family.", vi: "Cậu ấy là người nhỏ tuổi nhất trong gia đình." }
      ]
    },
    {
      heading: "3. Chính tả và bất quy tắc",
      body: "Tận cùng e chỉ thêm r / st (nice → nicer, nicest). Phụ âm + y đổi thành ier / iest (happy → happier, happiest). Một nguyên âm + một phụ âm thì gấp đôi phụ âm (big → bigger, biggest; hot → hotter, hottest). Bất quy tắc: good → better → best, bad → worse → worst.",
      examples: [
        { en: "Today is hotter than yesterday.", vi: "Hôm nay nóng hơn hôm qua." },
        { en: "This is the best pizza in town.", vi: "Đây là chiếc pizza ngon nhất trong vùng." },
        { en: "His English is worse than mine.", vi: "Tiếng Anh của anh ấy tệ hơn của tôi." }
      ]
    },
    {
      heading: "4. So sánh bằng và lỗi hay gặp",
      body: "So sánh bằng: as + tính từ + as. Phủ định: not as ... as. Lỗi hay gặp: không nói \"more taller\" (đúng: taller), \"the most tallest\" (đúng: the tallest) hay \"more good\" (đúng: better).",
      examples: [
        { en: "My bag is as big as yours.", vi: "Túi của tôi lớn bằng túi của bạn." },
        { en: "She is not as tall as him.", vi: "Cô ấy không cao bằng anh ấy." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "Tom is ___ than Ben.", options: ["taller", "tall", "tallest"], answer: "taller", explain: "So sánh hơn của tính từ ngắn: tall + er.", tag: "so-sanh-hon" },
    { id: "q2", type: "mc", q: "This book is ___ than that one.", options: ["more interesting", "interestinger", "most interesting"], answer: "more interesting", explain: "Tính từ dài dùng more + tính từ.", tag: "so-sanh-hon" },
    { id: "q3", type: "mc", q: "She is the ___ girl in the class.", options: ["tallest", "taller", "most tall"], answer: "tallest", explain: "So sánh nhất của tính từ ngắn: the + tall + est.", tag: "so-sanh-nhat" },
    { id: "q4", type: "mc", q: "This is the ___ expensive watch.", options: ["most", "more", "much"], answer: "most", explain: "So sánh nhất của tính từ dài: the most + tính từ.", tag: "so-sanh-nhat" },
    { id: "q5", type: "fill", q: "Today is ___ than yesterday. (nice)", answers: ["nicer"], answer: "nicer", explain: "Tận cùng e chỉ thêm r: nicer.", tag: "chinh-ta-so-sanh" },
    { id: "q6", type: "fill", q: "He is ___ than his brother. (happy)", answers: ["happier"], answer: "happier", explain: "Phụ âm + y đổi y thành ier: happier.", tag: "chinh-ta-so-sanh" },
    { id: "q7", type: "fill", q: "Today is ___ than yesterday. (hot)", answers: ["hotter"], answer: "hotter", explain: "Một nguyên âm + một phụ âm thì gấp đôi phụ âm: hotter.", tag: "chinh-ta-so-sanh" },
    { id: "q8", type: "mc", q: "This pizza is ___ than that one. (good)", options: ["better", "gooder", "more good"], answer: "better", explain: "Good là bất quy tắc: good → better → best.", tag: "bat-quy-tac-so-sanh" },
    { id: "q9", type: "mc", q: "This is the ___ pizza in town. (good)", options: ["best", "better", "goodest"], answer: "best", explain: "So sánh nhất của good là the best.", tag: "bat-quy-tac-so-sanh" },
    { id: "q10", type: "mc", q: "His English is ___ than mine. (bad)", options: ["worse", "badder", "worst"], answer: "worse", explain: "Bad là bất quy tắc: bad → worse → worst.", tag: "bat-quy-tac-so-sanh" },
    { id: "q11", type: "mc", q: "She is as ___ as me.", options: ["tall", "taller", "tallest"], answer: "tall", explain: "So sánh bằng: as + tính từ nguyên dạng + as.", tag: "so-sanh-bang" },
    { id: "q12", type: "mc", q: "Câu nào đúng?", options: ["She is taller than me.", "She is more taller than me.", "She is tallest than me."], answer: "She is taller than me.", explain: "Tính từ ngắn chỉ thêm -er, không dùng thêm more.", tag: "so-sanh-hon" }
  ]
});
