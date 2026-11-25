/* Nội dung ngữ pháp: "Quá khứ tiếp diễn". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "qk-tiep-dien-cau-truc": "Cấu trúc was / were + V-ing",
  "when-while": "Dùng when và while",
  "qk-don-hay-tiep-dien": "Chọn quá khứ đơn hay tiếp diễn"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "past-continuous",
  title: "Quá khứ tiếp diễn (Past continuous)",
  summary: "Nói về hành động đang diễn ra tại một thời điểm trong quá khứ.",
  sections: [
    {
      heading: "1. Dùng khi nào",
      body: "Dùng quá khứ tiếp diễn để nói về hành động đang diễn ra tại một thời điểm xác định trong quá khứ, hoặc đang diễn ra thì bị một hành động khác xen vào.",
      examples: [
        { en: "I was sleeping at 10 last night.", vi: "Lúc 10 giờ tối qua tôi đang ngủ." },
        { en: "They were playing football at five.", vi: "Lúc 5 giờ họ đang chơi bóng đá." }
      ]
    },
    {
      heading: "2. Cấu trúc: was / were + V-ing",
      body: "I / he / she / it dùng was, you / we / they dùng were, rồi thêm V-ing (write → writing bỏ e; run → running, sit → sitting gấp đôi phụ âm cuối). Phủ định: wasn't / weren't. Câu hỏi: đưa Was / Were lên đầu.",
      examples: [
        { en: "She was reading a book.", vi: "Cô ấy đang đọc sách." },
        { en: "We weren't watching TV.", vi: "Lúc đó chúng tôi không xem tivi." },
        { en: "Were you studying at eight?", vi: "Lúc 8 giờ bạn có đang học bài không?" }
      ]
    },
    {
      heading: "3. When và while",
      body: "While đi với quá khứ tiếp diễn (hành động kéo dài). When thường đi với quá khứ đơn (hành động ngắn xen vào). Hành động xen vào dùng quá khứ đơn, hành động đang diễn ra dùng quá khứ tiếp diễn.",
      examples: [
        { en: "I was cooking when the phone rang.", vi: "Tôi đang nấu ăn thì điện thoại reo." },
        { en: "While she was walking, it started to rain.", vi: "Trong lúc cô ấy đang đi bộ thì trời bắt đầu mưa." },
        { en: "When I arrived, they were eating.", vi: "Khi tôi đến, họ đang ăn." }
      ]
    },
    {
      heading: "4. So sánh với quá khứ đơn và lỗi hay gặp",
      body: "Quá khứ đơn nói về hành động đã hoàn tất, quá khứ tiếp diễn nhấn vào lúc hành động đang diễn ra. Lỗi hay gặp: không nói \"I was sleep\" (đúng: I was sleeping) và không nói \"They was playing\" (đúng: They were playing).",
      examples: [
        { en: "I watched a film last night.", vi: "Tối qua tôi đã xem một bộ phim." },
        { en: "I was watching a film at 9 p.m.", vi: "Lúc 9 giờ tối tôi đang xem phim." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "I ___ sleeping at 10 last night.", options: ["was", "were", "am"], answer: "was", explain: "I đi với was trong quá khứ tiếp diễn.", tag: "qk-tiep-dien-cau-truc" },
    { id: "q2", type: "mc", q: "They ___ playing football at five.", options: ["were", "was", "are"], answer: "were", explain: "They đi với were.", tag: "qk-tiep-dien-cau-truc" },
    { id: "q3", type: "mc", q: "She ___ reading a book at 8 last night.", options: ["was", "were", "is"], answer: "was", explain: "She đi với was.", tag: "qk-tiep-dien-cau-truc" },
    { id: "q4", type: "fill", q: "She was ___ (read) a book.", answers: ["reading"], answer: "reading", explain: "was + V-ing: reading.", tag: "qk-tiep-dien-cau-truc" },
    { id: "q5", type: "fill", q: "They were ___ (run) in the park.", answers: ["running"], answer: "running", explain: "Run gấp đôi n khi thêm -ing: running.", tag: "qk-tiep-dien-cau-truc" },
    { id: "q6", type: "mc", q: "We ___ watching TV. (phủ định)", options: ["weren't", "wasn't", "didn't"], answer: "weren't", explain: "We đi với were, phủ định là weren't.", tag: "qk-tiep-dien-cau-truc" },
    { id: "q7", type: "mc", q: "___ you studying at 8 p.m.?", options: ["Were", "Was", "Did"], answer: "Were", explain: "You đi với were, đưa lên đầu câu hỏi.", tag: "qk-tiep-dien-cau-truc" },
    { id: "q8", type: "mc", q: "I was cooking ___ the phone rang.", options: ["when", "while", "during"], answer: "when", explain: "Hành động ngắn xen vào (phone rang) đi với when.", tag: "when-while" },
    { id: "q9", type: "mc", q: "___ she was walking, it started to rain.", options: ["While", "Then", "Or"], answer: "While", explain: "While đi với hành động đang diễn ra (was walking).", tag: "when-while" },
    { id: "q10", type: "mc", q: "I ___ a film at 9 p.m. yesterday. (đang xem)", options: ["was watching", "watched", "watch"], answer: "was watching", explain: "Nhấn vào lúc 9 giờ đang diễn ra nên dùng quá khứ tiếp diễn.", tag: "qk-don-hay-tiep-dien" },
    { id: "q11", type: "mc", q: "I ___ a film last night. (đã xem xong)", options: ["watched", "was watching", "watch"], answer: "watched", explain: "Hành động đã hoàn tất nên dùng quá khứ đơn.", tag: "qk-don-hay-tiep-dien" },
    { id: "q12", type: "mc", q: "Câu nào đúng?", options: ["They were playing.", "They was playing.", "They were play."], answer: "They were playing.", explain: "They đi với were và động từ thêm -ing.", tag: "qk-tiep-dien-cau-truc" }
  ]
});
