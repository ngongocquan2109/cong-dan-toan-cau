/* Nội dung ngữ pháp: "Quá khứ đơn". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "dong-tu-co-quy-tac": "Động từ có quy tắc thêm -ed",
  "chinh-ta-ed": "Chính tả -ed (-ied, gấp đôi phụ âm)",
  "bat-quy-tac": "Động từ bất quy tắc",
  "phu-dinh-qua-khu": "Phủ định: didn't",
  "cau-hoi-qua-khu": "Câu hỏi: Did...?",
  "to-be-qua-khu": "To be quá khứ: was / were"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "past-simple",
  title: "Quá khứ đơn (Past simple)",
  summary: "Nói về hành động đã xảy ra và đã kết thúc trong quá khứ.",
  sections: [
    {
      heading: "1. Dùng khi nào",
      body: "Dùng quá khứ đơn để nói về hành động đã xảy ra và đã kết thúc trong quá khứ, thường có mốc thời gian rõ ràng: yesterday (hôm qua), last week (tuần trước), two days ago (hai ngày trước), in 2020 (vào năm 2020).",
      examples: [
        { en: "I visited my grandmother yesterday.", vi: "Hôm qua tôi đã đi thăm bà." },
        { en: "She watched a film last night.", vi: "Tối qua cô ấy đã xem phim." },
        { en: "We moved to Hanoi in 2020.", vi: "Chúng tôi đã chuyển đến Hà Nội vào năm 2020." }
      ]
    },
    {
      heading: "2. Động từ có quy tắc và bất quy tắc",
      body: "Động từ có quy tắc thêm -ed (work → worked). Tận cùng e chỉ thêm d (live → lived). Phụ âm + y đổi y thành ied (study → studied), còn nguyên âm + y chỉ thêm ed (play → played). Động từ một âm tiết tận cùng một nguyên âm + một phụ âm thì gấp đôi phụ âm (stop → stopped); không gấp đôi với w, x, y hoặc khi trọng âm không ở âm cuối (visit → visited, open → opened). Động từ bất quy tắc có dạng riêng, cần học thuộc. Dạng quá khứ dùng cho mọi chủ ngữ, không thêm -s.",
      table: [
        ["Nguyên mẫu", "Quá khứ", "Nghĩa"],
        ["go", "went", "đi"],
        ["have", "had", "có"],
        ["see", "saw", "thấy"],
        ["eat", "ate", "ăn"],
        ["buy", "bought", "mua"],
        ["do", "did", "làm"]
      ],
      examples: [
        { en: "He played tennis yesterday.", vi: "Hôm qua anh ấy đã chơi tennis." },
        { en: "I went to school by bus.", vi: "Tôi đã đi học bằng xe buýt." },
        { en: "They ate rice for lunch.", vi: "Họ đã ăn cơm vào bữa trưa." },
        { en: "She bought a new bag.", vi: "Cô ấy đã mua một chiếc túi mới." }
      ]
    },
    {
      heading: "3. Phủ định, câu hỏi và trả lời ngắn",
      body: "Phủ định: chủ ngữ + didn't + động từ nguyên mẫu. Câu hỏi: Did + chủ ngữ + động từ nguyên mẫu. Sau did / didn't, động từ luôn ở dạng nguyên mẫu. Trả lời ngắn: Yes, I did. / No, she didn't.",
      examples: [
        { en: "I didn't go to school yesterday.", vi: "Hôm qua tôi không đi học." },
        { en: "Did you watch the match?", vi: "Bạn có xem trận đấu không?" },
        { en: "Did she call you? — Yes, she did.", vi: "Cô ấy có gọi cho bạn không? — Có, cô ấy có gọi." }
      ]
    },
    {
      heading: "4. To be ở quá khứ và lỗi hay gặp",
      body: "To be ở quá khứ là was (I / he / she / it) và were (you / we / they); phủ định wasn't / weren't, và không dùng did. Câu hỏi đưa was / were lên đầu (Were you...?), trả lời ngắn: Yes, I was. / No, they weren't. Lỗi hay gặp: không nói \"I didn't went\" (đúng: I didn't go), không nói \"Did you went?\" (đúng: Did you go?), không nói \"I goed\" (đúng: I went).",
      examples: [
        { en: "I was tired yesterday.", vi: "Hôm qua tôi mệt." },
        { en: "They were at home last night.", vi: "Tối qua họ ở nhà." },
        { en: "Were you at home? — Yes, I was.", vi: "Bạn có ở nhà không? — Vâng, tôi có ở nhà." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "I ___ my grandmother yesterday.", options: ["visited", "visit", "visiting"], answer: "visited", explain: "Có mốc yesterday nên dùng quá khứ đơn: visit + ed.", tag: "dong-tu-co-quy-tac" },
    { id: "q2", type: "fill", q: "She ___ (watch) a film last night.", answers: ["watched"], answer: "watched", explain: "Động từ có quy tắc thêm -ed: watch → watched.", tag: "dong-tu-co-quy-tac" },
    { id: "q3", type: "fill", q: "He ___ (study) hard last year.", answers: ["studied"], answer: "studied", explain: "Phụ âm + y đổi y thành ied: study → studied.", tag: "chinh-ta-ed" },
    { id: "q4", type: "fill", q: "The car ___ (stop) at the red light a minute ago.", answers: ["stopped"], answer: "stopped", explain: "Một nguyên âm + một phụ âm thì gấp đôi phụ âm: stop → stopped.", tag: "chinh-ta-ed" },
    { id: "q5", type: "fill", q: "We ___ (live) in Hue in 2019.", answers: ["lived"], answer: "lived", explain: "Tận cùng e chỉ thêm d: live → lived.", tag: "chinh-ta-ed" },
    { id: "q6", type: "mc", q: "I ___ to school by bus yesterday.", options: ["went", "go", "goed"], answer: "went", explain: "Go là động từ bất quy tắc, quá khứ là went.", tag: "bat-quy-tac" },
    { id: "q7", type: "mc", q: "They ___ rice for lunch yesterday.", options: ["ate", "eated", "eat"], answer: "ate", explain: "Eat là động từ bất quy tắc, quá khứ là ate.", tag: "bat-quy-tac" },
    { id: "q8", type: "fill", q: "She ___ (buy) a new bag last week.", answers: ["bought"], answer: "bought", explain: "Buy là động từ bất quy tắc, quá khứ là bought.", tag: "bat-quy-tac" },
    { id: "q9", type: "mc", q: "We ___ a good film last week.", options: ["saw", "seen", "see"], answer: "saw", explain: "See là động từ bất quy tắc, quá khứ đơn là saw. Seen là quá khứ phân từ, phải đi với have / has, không dùng một mình.", tag: "bat-quy-tac" },
    { id: "q10", type: "mc", q: "I ___ go to school yesterday. (phủ định)", options: ["didn't", "don't", "wasn't"], answer: "didn't", explain: "Phủ định quá khứ đơn: didn't + động từ nguyên mẫu.", tag: "phu-dinh-qua-khu" },
    { id: "q11", type: "mc", q: "She didn't ___ me.", options: ["call", "called", "calls"], answer: "call", explain: "Sau didn't, động từ ở dạng nguyên mẫu.", tag: "phu-dinh-qua-khu" },
    { id: "q12", type: "mc", q: "___ you watch the match?", options: ["Did", "Do", "Were"], answer: "Did", explain: "Câu hỏi quá khứ đơn bắt đầu bằng Did, động từ giữ nguyên mẫu.", tag: "cau-hoi-qua-khu" },
    { id: "q13", type: "mc", q: "Did she call you? — Yes, she ___.", options: ["did", "does", "was"], answer: "did", explain: "Câu trả lời ngắn nhắc lại trợ động từ: Yes, she did.", tag: "cau-hoi-qua-khu" },
    { id: "q14", type: "mc", q: "I ___ tired yesterday.", options: ["was", "were", "did"], answer: "was", explain: "To be ở quá khứ: I đi với was.", tag: "to-be-qua-khu" },
    { id: "q15", type: "mc", q: "They ___ at home last night.", options: ["were", "was", "did"], answer: "were", explain: "To be ở quá khứ: They đi với were.", tag: "to-be-qua-khu" },
    { id: "q16", type: "mc", q: "Câu nào đúng?", options: ["I didn't go.", "I didn't went.", "I don't went."], answer: "I didn't go.", explain: "Sau didn't dùng động từ nguyên mẫu: go, không phải went.", tag: "phu-dinh-qua-khu" }
  ]
});
