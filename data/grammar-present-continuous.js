/* Nội dung ngữ pháp: "Hiện tại tiếp diễn". Do AI sinh sẵn một lần (phương án B). */
window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
  "cau-truc-tiep-dien": "Cấu trúc am / is / are + V-ing",
  "them-ing": "Quy tắc thêm -ing",
  "phu-dinh-tiep-dien": "Phủ định hiện tại tiếp diễn",
  "cau-hoi-tiep-dien": "Câu hỏi hiện tại tiếp diễn",
  "dong-tu-trang-thai": "Động từ thường không dùng tiếp diễn"
});

window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push({
  id: "present-continuous",
  title: "Hiện tại tiếp diễn (Present continuous)",
  summary: "Nói về hành động đang xảy ra ngay lúc nói.",
  sections: [
    {
      heading: "1. Dùng khi nào",
      body: "Dùng hiện tại tiếp diễn để nói về hành động đang diễn ra ngay lúc nói hoặc trong khoảng thời gian quanh hiện tại. Hay đi kèm: now (bây giờ), right now (ngay lúc này), at the moment (lúc này), today (hôm nay).",
      examples: [
        { en: "I am reading a book now.", vi: "Bây giờ tôi đang đọc sách." },
        { en: "It is raining.", vi: "Trời đang mưa." },
        { en: "They are playing football at the moment.", vi: "Lúc này họ đang chơi bóng đá." }
      ]
    },
    {
      heading: "2. Cấu trúc: am / is / are + V-ing",
      body: "Chọn am / is / are theo chủ ngữ, rồi thêm -ing vào động từ. Cách thêm -ing: thường chỉ thêm ing (work → working, play → playing, listen → listening); tận cùng e thì bỏ e (make → making), nhưng ee giữ nguyên (see → seeing); tận cùng ie đổi thành ying (lie → lying); động từ một âm tiết tận cùng một nguyên âm + một phụ âm thì gấp đôi phụ âm (run → running, sit → sitting), không gấp đôi với w, x, y. Viết tắt: I'm, he's, she's, it's, we're, you're, they're.",
      table: [
        ["Chủ ngữ", "to be + V-ing", "Ví dụ"],
        ["I", "am + V-ing", "I am working."],
        ["He / She / It", "is + V-ing", "She is working."],
        ["You / We / They", "are + V-ing", "They are working."]
      ],
      examples: [
        { en: "He is making tea.", vi: "Anh ấy đang pha trà." },
        { en: "We are running in the park.", vi: "Chúng tôi đang chạy trong công viên." },
        { en: "The cat is sitting on the sofa.", vi: "Con mèo đang ngồi trên ghế sofa." }
      ]
    },
    {
      heading: "3. Phủ định và câu hỏi",
      body: "Phủ định: thêm not sau am / is / are (viết tắt: isn't, aren't, I'm not). Câu hỏi: đưa am / is / are lên trước chủ ngữ. Trả lời ngắn: Yes, I am. / No, she isn't.",
      examples: [
        { en: "I am not sleeping.", vi: "Tôi không ngủ đâu." },
        { en: "She isn't working today.", vi: "Hôm nay cô ấy không làm việc." },
        { en: "Are you listening?", vi: "Bạn có đang nghe không?" },
        { en: "What are you doing? — I am cooking.", vi: "Bạn đang làm gì vậy? — Tôi đang nấu ăn." }
      ]
    },
    {
      heading: "4. Lỗi hay gặp",
      body: "Không bỏ to be: không nói \"I working\" hay \"I am work\" (đúng: I am working). Một số động từ chỉ trạng thái, suy nghĩ hay cảm xúc (know, like, want, love, understand) thường không dùng ở dạng tiếp diễn: nói I know the answer, không nói \"I am knowing\".",
      examples: [
        { en: "I know the answer.", vi: "Tôi biết câu trả lời." },
        { en: "She likes music.", vi: "Cô ấy thích âm nhạc." }
      ]
    }
  ],
  questions: [
    { id: "q1", type: "mc", q: "She ___ a book now.", options: ["is reading", "reads", "reading"], answer: "is reading", explain: "Hành động đang xảy ra lúc nói: is + V-ing. She đi với is.", tag: "cau-truc-tiep-dien" },
    { id: "q2", type: "mc", q: "They ___ football at the moment.", options: ["are playing", "is playing", "play"], answer: "are playing", explain: "They đi với are, rồi V-ing: are playing.", tag: "cau-truc-tiep-dien" },
    { id: "q3", type: "mc", q: "I ___ to music.", options: ["am listening", "is listening", "listening"], answer: "am listening", explain: "I đi với am, rồi V-ing: am listening.", tag: "cau-truc-tiep-dien" },
    { id: "q4", type: "fill", q: "He ___ (make) tea.", answers: ["is making"], answer: "is making", explain: "He đi với is. Make tận cùng e nên bỏ e rồi thêm -ing: making.", tag: "them-ing" },
    { id: "q5", type: "fill", q: "We ___ (run) in the park.", answers: ["are running"], answer: "are running", explain: "We đi với are. Run có một nguyên âm + một phụ âm nên gấp đôi n: running.", tag: "them-ing" },
    { id: "q6", type: "fill", q: "The cat ___ (sit) on the sofa.", answers: ["is sitting"], answer: "is sitting", explain: "The cat = it nên dùng is. Sit gấp đôi t: sitting.", tag: "them-ing" },
    { id: "q7", type: "fill", q: "I ___ (write) a letter.", answers: ["am writing"], answer: "am writing", explain: "I đi với am. Write tận cùng e nên bỏ e: writing.", tag: "them-ing" },
    { id: "q8", type: "mc", q: "She ___ working today. (phủ định)", options: ["isn't", "doesn't", "aren't"], answer: "isn't", explain: "Phủ định của is + V-ing là isn't + V-ing.", tag: "phu-dinh-tiep-dien" },
    { id: "q9", type: "mc", q: "I ___ sleeping. (phủ định)", options: ["am not", "isn't", "don't"], answer: "am not", explain: "Phủ định của I am là I am not (viết tắt I'm not).", tag: "phu-dinh-tiep-dien" },
    { id: "q10", type: "mc", q: "___ you listening?", options: ["Are", "Do", "Is"], answer: "Are", explain: "Câu hỏi đưa to be lên đầu, you đi với are.", tag: "cau-hoi-tiep-dien" },
    { id: "q11", type: "mc", q: "___ he cooking dinner?", options: ["Is", "Does", "Are"], answer: "Is", explain: "He đi với is, đưa lên đầu câu hỏi.", tag: "cau-hoi-tiep-dien" },
    { id: "q12", type: "mc", q: "What are you doing? — I ___ my homework.", options: ["am doing", "do", "is doing"], answer: "am doing", explain: "Hành động đang xảy ra, chủ ngữ I: am doing.", tag: "cau-truc-tiep-dien" },
    { id: "q13", type: "mc", q: "Câu nào đúng?", options: ["I know the answer.", "I am knowing the answer.", "I knowing the answer."], answer: "I know the answer.", explain: "Know là động từ chỉ trạng thái nên thường không dùng ở dạng tiếp diễn.", tag: "dong-tu-trang-thai" },
    { id: "q14", type: "mc", q: "Câu nào đúng?", options: ["She is making a cake.", "She is make a cake.", "She are making a cake."], answer: "She is making a cake.", explain: "She đi với is và động từ phải thêm -ing: is making.", tag: "cau-truc-tiep-dien" }
  ]
});
