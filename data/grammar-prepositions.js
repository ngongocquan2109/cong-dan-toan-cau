/* Nội dung ngữ pháp: "Giới từ thời gian và nơi chốn". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "gioi-tu-thoi-gian": "Giới từ chỉ thời gian (at, on, in)",
  "gioi-tu-noi-chon": "Giới từ chỉ nơi chốn (at, on, in)",
  "gioi-tu-khac": "Giới từ khác (by, next to, under...)"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "prepositions",
  title: "Giới từ chỉ thời gian và nơi chốn",
  summary: "Dùng at, on, in và các giới từ thông dụng đúng chỗ.",
  sections: [
    {
      heading: "1. Giới từ chỉ thời gian: at, on, in",
      body: "At dùng với giờ và thời điểm (at 5 o'clock, at night). On dùng với ngày và thứ (on Monday, on 5 May). In dùng với tháng, năm, mùa và buổi trong ngày (in May, in 2020, in summer, in the morning). Riêng ban đêm dùng at night; buổi đi kèm thứ thì dùng on (on Monday morning).",
      examples: [
        { en: "The class starts at 8 o'clock.", vi: "Lớp học bắt đầu lúc 8 giờ." },
        { en: "I was born on 5 May.", vi: "Tôi sinh ngày 5 tháng 5." },
        { en: "We travel in summer.", vi: "Chúng tôi đi du lịch vào mùa hè." }
      ]
    },
    {
      heading: "2. Giới từ chỉ nơi chốn: at, on, in",
      body: "In dùng với không gian bao quanh hoặc thành phố, quốc gia (in the room, in Hanoi). On dùng với bề mặt (on the table). At dùng với một điểm (at the bus stop, at school, at home).",
      examples: [
        { en: "The keys are on the table.", vi: "Chìa khóa ở trên bàn." },
        { en: "She lives in Hanoi.", vi: "Cô ấy sống ở Hà Nội." },
        { en: "He is waiting at the bus stop.", vi: "Anh ấy đang đợi ở trạm xe buýt." }
      ]
    },
    {
      heading: "3. Các giới từ thông dụng khác",
      body: "To chỉ hướng đến. By chỉ phương tiện (by bus). For chỉ người nhận hoặc mục đích. Next to là bên cạnh, under là bên dưới, behind là phía sau, in front of là phía trước, between là ở giữa.",
      examples: [
        { en: "I go to school by bus.", vi: "Tôi đi học bằng xe buýt." },
        { en: "The bank is next to the school.", vi: "Ngân hàng nằm bên cạnh trường học." },
        { en: "The cat is under the chair.", vi: "Con mèo ở dưới cái ghế." },
        { en: "This gift is for you.", vi: "Món quà này dành cho bạn." }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Không nói \"in Monday\" (đúng: on Monday), \"at the morning\" (đúng: in the morning) và \"arrive to\" (đúng: arrive at / in).",
      examples: [
        { en: "I get up in the morning.", vi: "Tôi thức dậy vào buổi sáng." },
        { en: "We arrive in Hanoi at six.", vi: "Chúng tôi đến Hà Nội lúc 6 giờ." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "The class starts ___ 8 o'clock.", options: ["at", "on", "in"], answer: "at", explain: "Giờ cụ thể dùng at.", tag: "gioi-tu-thoi-gian" },
    { id: "q2", type: "mc", q: "I was born ___ 5 May.", options: ["on", "at", "in"], answer: "on", explain: "Ngày cụ thể dùng on.", tag: "gioi-tu-thoi-gian" },
    { id: "q3", type: "mc", q: "We travel ___ summer.", options: ["in", "on", "at"], answer: "in", explain: "Mùa dùng in.", tag: "gioi-tu-thoi-gian" },
    { id: "q4", type: "mc", q: "I have a meeting ___ Monday.", options: ["on", "in", "at"], answer: "on", explain: "Thứ trong tuần dùng on.", tag: "gioi-tu-thoi-gian" },
    { id: "q5", type: "mc", q: "I get up ___ the morning.", options: ["in", "on", "at"], answer: "in", explain: "Buổi trong ngày dùng in the morning.", tag: "gioi-tu-thoi-gian" },
    { id: "q6", type: "mc", q: "The keys are ___ the table.", options: ["on", "in", "at"], answer: "on", explain: "Trên bề mặt dùng on.", tag: "gioi-tu-noi-chon" },
    { id: "q7", type: "mc", q: "She lives ___ Hanoi.", options: ["in", "on", "at"], answer: "in", explain: "Thành phố dùng in.", tag: "gioi-tu-noi-chon" },
    { id: "q8", type: "mc", q: "He is waiting ___ the bus stop.", options: ["at", "in", "on"], answer: "at", explain: "Một điểm cụ thể dùng at.", tag: "gioi-tu-noi-chon" },
    { id: "q9", type: "mc", q: "I go to school ___ bus.", options: ["by", "with", "in"], answer: "by", explain: "Phương tiện đi lại dùng by: by bus.", tag: "gioi-tu-khac" },
    { id: "q10", type: "mc", q: "The bank is next ___ the school.", options: ["to", "at", "in"], answer: "to", explain: "Next to nghĩa là bên cạnh.", tag: "gioi-tu-khac" },
    { id: "q11", type: "mc", q: "The cat is ___ the chair. (bên dưới)", options: ["under", "on", "at"], answer: "under", explain: "Bên dưới dùng under.", tag: "gioi-tu-khac" },
    { id: "q12", type: "mc", q: "Câu nào đúng?", options: ["I have class on Monday.", "I have class in Monday.", "I have class at Monday."], answer: "I have class on Monday.", explain: "Thứ trong tuần dùng on.", tag: "gioi-tu-thoi-gian" }
  ]
});
