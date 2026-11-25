/* Nội dung ngữ pháp: "Danh từ và lượng từ". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "danh-tu-so-nhieu": "Danh từ số nhiều",
  "dem-duoc-khong-dem-duoc": "Danh từ đếm được và không đếm được",
  "luong-tu": "Some, any, much, many"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "nouns",
  title: "Danh từ: số nhiều, đếm được và lượng từ",
  summary: "Cách chuyển danh từ sang số nhiều và dùng some, any, much, many.",
  sections: [
    {
      heading: "1. Danh từ số nhiều",
      body: "Thường thêm -s (book → books). Thêm -es sau s, sh, ch, x (box → boxes). Phụ âm + y đổi thành ies (baby → babies), còn nguyên âm + y chỉ thêm -s (boy → boys). Một số danh từ bất quy tắc: man → men, woman → women, child → children, foot → feet, tooth → teeth, person → people.",
      examples: [
        { en: "I have two books.", vi: "Tôi có hai quyển sách." },
        { en: "There are three babies in the room.", vi: "Có ba em bé trong phòng." },
        { en: "The children are in the garden.", vi: "Bọn trẻ đang ở trong vườn." }
      ]
    },
    {
      heading: "2. Đếm được và không đếm được",
      body: "Danh từ đếm được có số ít và số nhiều, dùng được a / an và số đếm. Danh từ không đếm được (water, rice, milk, money, information, advice) không có số nhiều và không dùng a / an.",
      examples: [
        { en: "She has an apple.", vi: "Cô ấy có một quả táo." },
        { en: "I need some water.", vi: "Tôi cần một ít nước." },
        { en: "We need some information.", vi: "Chúng tôi cần một ít thông tin." }
      ]
    },
    {
      heading: "3. Some, any, much, many, a lot of",
      body: "Some dùng trong câu khẳng định. Any dùng trong câu phủ định và câu hỏi. Many đi với danh từ đếm được số nhiều. Much đi với danh từ không đếm được (hay gặp trong câu phủ định và câu hỏi). A lot of dùng được với cả hai loại.",
      examples: [
        { en: "I have some apples.", vi: "Tôi có vài quả táo." },
        { en: "Do you have any milk?", vi: "Bạn có chút sữa nào không?" },
        { en: "There isn't much water.", vi: "Không có nhiều nước." },
        { en: "How many books do you have?", vi: "Bạn có bao nhiêu quyển sách?" }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Không nói \"two childs\" (đúng: two children), \"an information\" (đúng: some information hoặc a piece of information), \"much books\" (đúng: many books) và \"informations\".",
      examples: [
        { en: "I need some information.", vi: "Tôi cần một ít thông tin." },
        { en: "She has many books.", vi: "Cô ấy có nhiều sách." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "I have two ___.", options: ["books", "book", "bookes"], answer: "books", explain: "Số nhiều của book thêm -s.", tag: "danh-tu-so-nhieu" },
    { id: "q2", type: "mc", q: "He has two ___.", options: ["boxes", "boxs", "boxies"], answer: "boxes", explain: "Danh từ tận cùng x thêm -es.", tag: "danh-tu-so-nhieu" },
    { id: "q3", type: "mc", q: "Three ___ are playing in the room.", options: ["babies", "babys", "babyes"], answer: "babies", explain: "Phụ âm + y đổi y thành ies.", tag: "danh-tu-so-nhieu" },
    { id: "q4", type: "mc", q: "The ___ are in the garden.", options: ["children", "childs", "childrens"], answer: "children", explain: "Số nhiều bất quy tắc của child là children.", tag: "danh-tu-so-nhieu" },
    { id: "q5", type: "fill", q: "One man, two ___.", answers: ["men"], answer: "men", explain: "Số nhiều bất quy tắc của man là men.", tag: "danh-tu-so-nhieu" },
    { id: "q6", type: "fill", q: "Many ___ (person) live in this city.", answers: ["people"], answer: "people", explain: "People là số nhiều của person.", tag: "danh-tu-so-nhieu" },
    { id: "q7", type: "mc", q: "I need ___ water.", options: ["some", "a", "many"], answer: "some", explain: "Water không đếm được, dùng some trong câu khẳng định.", tag: "dem-duoc-khong-dem-duoc" },
    { id: "q8", type: "mc", q: "She has ___ apple.", options: ["an", "a", "many"], answer: "an", explain: "Apple đếm được số ít và bắt đầu bằng âm nguyên âm nên dùng an.", tag: "dem-duoc-khong-dem-duoc" },
    { id: "q9", type: "mc", q: "Do you have ___ milk?", options: ["any", "a", "many"], answer: "any", explain: "Câu hỏi dùng any; milk không đếm được nên không dùng a hay many.", tag: "luong-tu" },
    { id: "q10", type: "mc", q: "How ___ books do you have?", options: ["many", "much", "any"], answer: "many", explain: "Books đếm được số nhiều nên dùng How many.", tag: "luong-tu" },
    { id: "q11", type: "mc", q: "There isn't ___ water.", options: ["much", "many", "a"], answer: "much", explain: "Water không đếm được nên dùng much.", tag: "luong-tu" },
    { id: "q12", type: "mc", q: "Câu nào đúng?", options: ["I need some information.", "I need an information.", "I need informations."], answer: "I need some information.", explain: "Information không đếm được: không dùng an và không thêm -s.", tag: "dem-duoc-khong-dem-duoc" }
  ]
});
