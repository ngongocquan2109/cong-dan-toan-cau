/* Nội dung ngữ pháp: "Đại từ và sở hữu". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "dai-tu-nhan-xung": "Đại từ chủ ngữ và tân ngữ",
  "so-huu": "Tính từ sở hữu và đại từ sở hữu",
  "chi-dinh-so-huu-cach": "This / that và sở hữu cách 's"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "pronouns",
  title: "Đại từ và sở hữu (I / me / my / mine)",
  summary: "Đại từ chủ ngữ, tân ngữ, sở hữu, và this / that.",
  sections: [
    {
      heading: "1. Đại từ chủ ngữ và tân ngữ",
      body: "Đại từ chủ ngữ đứng trước động từ. Đại từ tân ngữ đứng sau động từ hoặc giới từ.",
      table: [
        ["Chủ ngữ", "Tân ngữ"],
        ["I", "me"],
        ["you", "you"],
        ["he", "him"],
        ["she", "her"],
        ["it", "it"],
        ["we", "us"],
        ["they", "them"]
      ],
      examples: [
        { en: "I love him.", vi: "Tôi yêu anh ấy." },
        { en: "She helps us.", vi: "Cô ấy giúp chúng tôi." },
        { en: "They know her.", vi: "Họ biết cô ấy." }
      ]
    },
    {
      heading: "2. Tính từ sở hữu và đại từ sở hữu",
      body: "Tính từ sở hữu (my, your, his, her, our, their) đứng trước danh từ. Đại từ sở hữu (mine, yours, his, hers, ours, theirs) đứng một mình, thay cho cả cụm danh từ. Lưu ý: its (của nó) khác it's (= it is).",
      table: [
        ["Tính từ sở hữu", "Đại từ sở hữu"],
        ["my", "mine"],
        ["your", "yours"],
        ["his", "his"],
        ["her", "hers"],
        ["our", "ours"],
        ["their", "theirs"],
        ["its", "—"]
      ],
      examples: [
        { en: "This is my book.", vi: "Đây là quyển sách của tôi." },
        { en: "This book is mine.", vi: "Quyển sách này là của tôi." },
        { en: "Her bag is red; his is black.", vi: "Túi của cô ấy màu đỏ, túi của anh ấy màu đen." }
      ]
    },
    {
      heading: "3. This / that và sở hữu cách 's",
      body: "This / these chỉ vật ở gần (số ít / số nhiều). That / those chỉ vật ở xa. Dùng 's sau tên người hoặc danh từ chỉ người để chỉ sở hữu.",
      examples: [
        { en: "This is Tom's car.", vi: "Đây là xe của Tom." },
        { en: "Those are my shoes.", vi: "Những chiếc kia là giày của tôi." },
        { en: "What is that?", vi: "Cái kia là gì?" }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Không nói \"Me like it\" (đúng: I like it), \"This is mine book\" (đúng: This is my book) và không viết \"He's name\" cho sở hữu (đúng: His name).",
      examples: [
        { en: "I like it.", vi: "Tôi thích nó." },
        { en: "His name is Tom.", vi: "Tên anh ấy là Tom." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "I love ___. (anh ấy)", options: ["him", "he", "his"], answer: "him", explain: "Sau động từ cần đại từ tân ngữ: him.", tag: "dai-tu-nhan-xung" },
    { id: "q2", type: "mc", q: "She helps ___. (chúng tôi)", options: ["us", "we", "our"], answer: "us", explain: "Tân ngữ của we là us.", tag: "dai-tu-nhan-xung" },
    { id: "q3", type: "mc", q: "They know ___. (cô ấy)", options: ["her", "she", "hers"], answer: "her", explain: "Tân ngữ của she là her.", tag: "dai-tu-nhan-xung" },
    { id: "q4", type: "mc", q: "This is ___ book. (của tôi)", options: ["my", "mine", "me"], answer: "my", explain: "Trước danh từ dùng tính từ sở hữu: my.", tag: "so-huu" },
    { id: "q5", type: "mc", q: "This book is ___. (của tôi)", options: ["mine", "my", "me"], answer: "mine", explain: "Đứng một mình thay cho cụm danh từ thì dùng mine.", tag: "so-huu" },
    { id: "q6", type: "mc", q: "___ bag is red. (của cô ấy)", options: ["Her", "Hers", "She"], answer: "Her", explain: "Trước danh từ bag dùng tính từ sở hữu: her.", tag: "so-huu" },
    { id: "q7", type: "fill", q: "That car is ___. (của họ)", answers: ["theirs"], answer: "theirs", explain: "Đứng một mình thì dùng đại từ sở hữu: theirs.", tag: "so-huu" },
    { id: "q8", type: "mc", q: "This is ___ car. (của Tom)", options: ["Tom's", "Toms", "Tom"], answer: "Tom's", explain: "Dùng 's để chỉ sở hữu của người.", tag: "chi-dinh-so-huu-cach" },
    { id: "q9", type: "mc", q: "___ are my shoes. (những chiếc ở xa)", options: ["Those", "That", "This"], answer: "Those", explain: "Số nhiều ở xa dùng those.", tag: "chi-dinh-so-huu-cach" },
    { id: "q10", type: "mc", q: "What is ___? (cái ở gần)", options: ["this", "that", "those"], answer: "this", explain: "Vật ở gần số ít dùng this.", tag: "chi-dinh-so-huu-cach" },
    { id: "q11", type: "mc", q: "Câu nào đúng?", options: ["I like it.", "Me like it.", "I likes it."], answer: "I like it.", explain: "Chủ ngữ dùng I, và I đi với like (không thêm -s).", tag: "dai-tu-nhan-xung" },
    { id: "q12", type: "mc", q: "Câu nào đúng?", options: ["This is my book.", "This is mine book.", "This is me book."], answer: "This is my book.", explain: "Trước danh từ dùng my, không dùng mine hay me.", tag: "so-huu" }
  ]
});
