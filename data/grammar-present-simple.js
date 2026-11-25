/* Nội dung ngữ pháp: chủ đề "Hiện tại đơn". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "them-s-es": "Thêm -s / -es với he, she, it",
  "phu-dinh-hien-tai-don": "Phủ định: don't / doesn't",
  "cau-hoi-hien-tai-don": "Câu hỏi: Do / Does",
  "tra-loi-ngan-do": "Câu trả lời ngắn (Yes, he does...)",
  "trang-tu-tan-suat": "Vị trí trạng từ tần suất"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "present-simple",
  title: "Hiện tại đơn (Present simple)",
  summary: "Nói về thói quen, sự thật hiển nhiên và lịch cố định.",
  sections: [
    {
      heading: "1. Dùng khi nào",
      body: "Dùng hiện tại đơn để nói về thói quen, sự thật hiển nhiên và lịch cố định. Hay đi kèm các từ: always (luôn luôn), usually (thường), often (hay), sometimes (thỉnh thoảng), never (không bao giờ), every day (mỗi ngày).",
      examples: [
        { en: "I walk to school every day.", vi: "Tôi đi bộ đến trường mỗi ngày." },
        { en: "The sun rises in the east.", vi: "Mặt trời mọc ở hướng đông." },
        { en: "The shop opens at eight o'clock.", vi: "Cửa hàng mở cửa lúc 8 giờ." }
      ]
    },
    {
      heading: "2. Câu khẳng định: thêm -s / -es",
      body: "Với I / you / we / they, dùng động từ nguyên mẫu. Với he / she / it, thêm -s (work → works). Thêm -es sau s, sh, ch, x, z, o (watch → watches, go → goes). Động từ tận cùng phụ âm + y thì đổi y thành ies (study → studies), còn nguyên âm + y thì chỉ thêm -s (play → plays). Riêng have đổi thành has.",
      table: [
        ["Chủ ngữ", "Động từ", "Ví dụ"],
        ["I / You / We / They", "nguyên mẫu (work)", "They work."],
        ["He / She / It", "thêm -s / -es / -ies (works, watches, studies); have → has", "She works."]
      ],
      examples: [
        { en: "They work in a bank.", vi: "Họ làm việc ở ngân hàng." },
        { en: "She works in a hospital.", vi: "Cô ấy làm việc ở bệnh viện." },
        { en: "He goes to school by bus.", vi: "Cậu ấy đi học bằng xe buýt." },
        { en: "My sister studies English.", vi: "Chị tôi học tiếng Anh." }
      ]
    },
    {
      heading: "3. Phủ định, câu hỏi và trả lời ngắn",
      body: "Phủ định: I / you / we / they dùng don't, he / she / it dùng doesn't, rồi đến động từ nguyên mẫu. Câu hỏi: đặt Do (với I / you / we / they) hoặc Does (với he / she / it) lên đầu câu. Sau does / doesn't, động từ trở về nguyên mẫu, không thêm -s. Trả lời ngắn: Yes, I do. / No, she doesn't.",
      examples: [
        { en: "I don't like coffee.", vi: "Tôi không thích cà phê." },
        { en: "She doesn't like tea.", vi: "Cô ấy không thích trà." },
        { en: "Do you speak English?", vi: "Bạn có nói tiếng Anh không?" },
        { en: "Does he work here? — No, he doesn't.", vi: "Anh ấy có làm việc ở đây không? — Không, anh ấy không làm ở đây." }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Không nói \"He work\" (đúng: He works). Không nói \"She doesn't likes\" (đúng: She doesn't like) và không nói \"Does she works?\" (đúng: Does she work?). Trạng từ tần suất đứng trước động từ thường và đứng sau to be.",
      examples: [
        { en: "She always eats breakfast.", vi: "Cô ấy luôn ăn sáng." },
        { en: "He is never late.", vi: "Anh ấy không bao giờ đến muộn." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "She ___ to school every day.", options: ["go", "goes", "going"], answer: "goes", explain: "She là ngôi thứ ba số ít, động từ go thêm -es thành goes.", tag: "them-s-es" },
    { id: "q2", type: "mc", q: "They ___ football on Sundays.", options: ["play", "plays", "playing"], answer: "play", explain: "They đi với động từ nguyên mẫu, không thêm -s.", tag: "them-s-es" },
    { id: "q3", type: "fill", q: "My father ___ (work) in a bank.", answers: ["works"], answer: "works", explain: "My father = he, nên work thêm -s thành works.", tag: "them-s-es" },
    { id: "q4", type: "fill", q: "He ___ (watch) TV every evening.", answers: ["watches"], answer: "watches", explain: "Động từ tận cùng -ch thì thêm -es: watch → watches.", tag: "them-s-es" },
    { id: "q5", type: "fill", q: "My sister ___ (study) English.", answers: ["studies"], answer: "studies", explain: "Tận cùng phụ âm + y thì đổi y thành ies: study → studies.", tag: "them-s-es" },
    { id: "q6", type: "mc", q: "Tom ___ a big family.", options: ["have", "has", "haves"], answer: "has", explain: "Với he / she / it, have đổi thành has.", tag: "them-s-es" },
    { id: "q7", type: "mc", q: "I ___ like coffee. (phủ định)", options: ["don't", "doesn't", "isn't"], answer: "don't", explain: "Chủ ngữ I dùng don't trước động từ nguyên mẫu.", tag: "phu-dinh-hien-tai-don" },
    { id: "q8", type: "mc", q: "She ___ like tea. (phủ định)", options: ["doesn't", "don't", "isn't"], answer: "doesn't", explain: "She đi với doesn't.", tag: "phu-dinh-hien-tai-don" },
    { id: "q9", type: "mc", q: "He doesn't ___ here.", options: ["live", "lives", "living"], answer: "live", explain: "Sau doesn't, động từ trở về nguyên mẫu, không thêm -s.", tag: "phu-dinh-hien-tai-don" },
    { id: "q10", type: "mc", q: "___ you speak English?", options: ["Do", "Does", "Are"], answer: "Do", explain: "You đi với Do khi đặt câu hỏi ở hiện tại đơn.", tag: "cau-hoi-hien-tai-don" },
    { id: "q11", type: "mc", q: "___ she work here?", options: ["Does", "Do", "Is"], answer: "Does", explain: "She đi với Does, và động từ work giữ nguyên mẫu.", tag: "cau-hoi-hien-tai-don" },
    { id: "q12", type: "fill", q: "Does she ___ (like) pizza?", answers: ["like"], answer: "like", explain: "Sau Does, động từ về nguyên mẫu: Does she like...?", tag: "cau-hoi-hien-tai-don" },
    { id: "q13", type: "mc", q: "Does he play tennis? — Yes, he ___.", options: ["does", "do", "is"], answer: "does", explain: "Câu trả lời ngắn nhắc lại trợ động từ: Yes, he does.", tag: "tra-loi-ngan-do" },
    { id: "q14", type: "mc", q: "Câu nào viết đúng?", options: ["She works in a shop.", "She work in a shop.", "She workes in a shop."], answer: "She works in a shop.", explain: "She cần động từ thêm -s: works. Dạng workes không tồn tại.", tag: "them-s-es" },
    { id: "q15", type: "mc", q: "Câu nào đặt trạng từ tần suất đúng vị trí?", options: ["He is never late.", "He never is late.", "He is late never."], answer: "He is never late.", explain: "Trạng từ tần suất đứng sau to be: He is never late.", tag: "trang-tu-tan-suat" }
  ]
});
