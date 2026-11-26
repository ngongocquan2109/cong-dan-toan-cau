/* Ngữ pháp bổ sung theo giáo trình Essential Grammar in Use (1/6): đối chiếu thì, kế hoạch tương lai, might, dạng động từ.
   Nội dung do AI viết lại theo cách dạy thống nhất của app. Mỗi chủ điểm: selfWrite = đề "Viết về bạn" + bài mẫu; see = bài nên xem thêm. */
(function () {
  var mc = function (id, lv, q, o, a, tag, vi, ex, deep) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: ex, tag: tag, vi: vi, deep: deep }; };
  var fl = function (id, lv, q, a, tag, vi, ex, deep) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: ex, tag: tag, vi: vi, deep: deep }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "dh-vs-tt": "Hiện tại đơn hay tiếp diễn",
    "dh-tt-trang-thai": "Động từ trạng thái (like, want, know...)",
    "kh-dang-lam": "Present continuous nói kế hoạch",
    "kh-will-shall": "will, shall và quyết định tức thời",
    "kh-lich": "Present simple cho lịch trình",
    "might-co-the": "might / may: có thể",
    "might-xin-phep": "May I...? xin phép",
    "dt-dang": "Dạng của động từ sau từng cấu trúc",
    "dt-bat-quy-tac": "Quá khứ và quá khứ phân từ bất quy tắc",
    "dt-chinh-ta": "Chính tả khi thêm -ing / -ed"
  });
  window.GRAMMAR = window.GRAMMAR || [];

  window.GRAMMAR.push({
    id: "present-simple-vs-continuous", cefr: "A2",
    title: "Hiện tại đơn hay hiện tại tiếp diễn?",
    summary: "Phân biệt việc đang diễn ra lúc nói và việc lặp đi lặp lại.",
    formula: "đang xảy ra: am / is / are + V-ing · thói quen, sự thật: V / V-s",
    see: ["present-simple", "present-continuous", "future-plans"],
    selfWrite: [
      ["Viết một câu về việc bạn thường làm mỗi sáng (present simple).", "I usually drink coffee and read the news in the morning."],
      ["Viết một câu về việc bạn đang làm lúc này (present continuous).", "I'm studying English on my phone right now."]
    ],
    sections: [
      {
        heading: "1. Hai thì khác nhau ở đâu",
        body: "Hiện tại tiếp diễn (am / is / are + V-ing) nói việc đang diễn ra ngay lúc nói, hoặc quanh thời điểm này. Hiện tại đơn nói việc lặp lại, thói quen và sự thật chung. Ví dụ: Jack đang xem TV (lúc này, không chơi guitar), nhưng Jack có đàn guitar và hay chơi (thói quen). Hai câu hỏi cũng khác: Is he playing the guitar? (bây giờ có đang chơi không) và Does he play the guitar? (anh ấy có biết chơi không).",
        table: [
          ["", "Hiện tại tiếp diễn", "Hiện tại đơn"],
          ["Ý nghĩa", "đang xảy ra lúc nói", "thói quen, lặp lại, sự thật"],
          ["Cấu trúc", "am / is / are + V-ing", "V / V-s (do / does cho phủ định, câu hỏi)"],
          ["Ví dụ", "I'm working now.", "I work every day."]
        ],
        examples: [
          { en: "Please be quiet. I'm working.", vi: "Làm ơn yên lặng. Tôi đang làm việc." },
          { en: "I work from nine to five every day.", vi: "Tôi làm việc từ chín giờ đến năm giờ mỗi ngày." },
          { en: "Is he playing the guitar? Does he play the guitar?", vi: "Anh ấy đang chơi guitar à? Anh ấy có chơi guitar không (nói chung)?" }
        ]
      },
      {
        heading: "2. Dấu hiệu nhận biết",
        body: "Hiện tại tiếp diễn hay đi với now, at the moment, today, this week và các câu mệnh lệnh như Look! / Listen!. Hiện tại đơn hay đi với always, usually, often, sometimes, never, every day, on Mondays. Lưu ý: trạng từ tần suất (always, never...) báo hiệu hiện tại đơn, kể cả khi bạn thấy chủ ngữ là người đang làm việc gì đó.",
        examples: [
          { en: "Tom is having a shower at the moment.", vi: "Tom đang tắm lúc này." },
          { en: "Tom has a shower every morning.", vi: "Tom tắm mỗi sáng." },
          { en: "It rains a lot in winter.", vi: "Mùa đông ở đây mưa nhiều." }
        ]
      },
      {
        heading: "3. Động từ trạng thái không dùng tiếp diễn",
        body: "Một số động từ nói về trạng thái, cảm xúc, suy nghĩ nên chỉ dùng hiện tại đơn, dù việc đó đang đúng ngay lúc nói: like, love, hate, want, need, prefer, know, understand, remember, forget, believe, mean. Nói I want to go home, không nói I am wanting. Have với nghĩa sở hữu cũng vậy: I have a car.",
        examples: [
          { en: "I'm tired. I want to go home.", vi: "Tôi mệt. Tôi muốn về nhà." },
          { en: "I don't understand. What do you mean?", vi: "Tôi không hiểu. Ý bạn là gì?" },
          { en: "Do you know that girl? — Yes, but I don't remember her name.", vi: "Bạn có biết cô gái đó không? — Có, nhưng tôi không nhớ tên." }
        ]
      }
    ],
    walk: [
      w("Why are you under the table? What are you doing?", "Sao bạn ở dưới bàn? Bạn đang làm gì vậy?", "Việc đang diễn ra ngay lúc nói nên dùng hiện tại tiếp diễn."),
      w("What do you usually do at weekends?", "Cuối tuần bạn thường làm gì?", "Usually báo hiệu thói quen, nên dùng do + V."),
      w("I don't understand this word.", "Tôi không hiểu từ này.", "Understand là động từ trạng thái, không dùng am not understanding.")
    ],
    mistakes: [
      x("I work now. Please wait.", "I'm working now. Please wait.", "Việc đang diễn ra lúc nói dùng am / is / are + V-ing."),
      x("I'm wanting to go home.", "I want to go home.", "Want là động từ trạng thái, không dùng thì tiếp diễn."),
      x("He is watching TV every evening.", "He watches TV every evening.", "Every evening báo hiệu thói quen nên dùng hiện tại đơn.")
    ],
    check: [
      "Việc xảy ra ngay lúc nói, hay lặp lại thường xuyên? || Lúc này (now, at the moment, Look!) → V-ing. Thường xuyên (always, every day, usually) → hiện tại đơn.",
      "Động từ có phải loại trạng thái không? || Like, want, need, know, understand, remember, mean → không dùng tiếp diễn, dù đang đúng ngay lúc nói.",
      "Có trạng từ tần suất không? || Always, usually, often, never → hiện tại đơn.",
      "Câu hỏi hỏi thói quen hay hỏi việc đang làm? || Do you play...? hỏi thói quen. Are you playing...? hỏi việc đang làm."
    ],
    questions: [
      mc("q1", "e", "Please be quiet. I ___.", ["am working", "work", "works"], "am working", "dh-vs-tt", "Làm ơn yên lặng. Tôi đang làm việc.", "Đang xảy ra lúc nói: am + V-ing.", "Câu nói về việc đang diễn ra lúc này nên dùng am working. Work hay works nói về thói quen."),
      mc("q2", "e", "Tom ___ a shower every morning.", ["has", "is having", "have"], "has", "dh-vs-tt", "Tom tắm mỗi sáng.", "Every morning = thói quen: hiện tại đơn.", "Every morning báo hiệu thói quen nên dùng hiện tại đơn (has). Tom là ngôi thứ ba số ít nên dùng has, không dùng have."),
      mc("q3", "e", "It ___ a lot in winter here.", ["rains", "is raining", "rain"], "rains", "dh-vs-tt", "Mùa đông ở đây mưa nhiều.", "Sự thật chung: hiện tại đơn.", "Câu nói sự thật chung về một nơi nên dùng hiện tại đơn. It là ngôi thứ ba số ít nên rain thêm -s."),
      mc("q4", "e", "Look! The baby ___.", ["is smiling", "smiles", "smile"], "is smiling", "dh-vs-tt", "Nhìn kìa! Em bé đang cười.", "Look! báo hiệu việc đang diễn ra.", "Look! và Listen! gọi sự chú ý đến việc đang xảy ra, nên dùng hiện tại tiếp diễn."),
      mc("q5", "e", "I ___ TV very often.", ["don't watch", "am not watching", "doesn't watch"], "don't watch", "dh-vs-tt", "Tôi không hay xem TV.", "Very often = thói quen: hiện tại đơn.", "Very often nói về mức độ thường xuyên nên dùng hiện tại đơn. Chủ ngữ I đi với don't, không dùng doesn't."),
      mc("q6", "m", "___ you usually go out on Saturdays?", ["Do", "Are", "Does"], "Do", "dh-vs-tt", "Bạn có thường ra ngoài vào thứ Bảy không?", "Usually = thói quen: Do + you + V.", "Usually báo hiệu hiện tại đơn, câu hỏi dùng do với you. Are you go là sai ngữ pháp."),
      mc("q7", "m", "Why are you under the table? What ___?", ["are you doing", "do you do", "you do"], "are you doing", "dh-vs-tt", "Sao bạn ở dưới bàn? Bạn đang làm gì thế?", "Việc đang xảy ra: are you doing.", "Việc đang diễn ra ngay lúc nói nên dùng are you doing. What do you do? lại có nghĩa là hỏi nghề nghiệp."),
      mc("q8", "m", "I'm tired. I ___ to go home.", ["want", "am wanting", "wants"], "want", "dh-tt-trang-thai", "Tôi mệt. Tôi muốn về nhà.", "Want là động từ trạng thái.", "Want không dùng thì tiếp diễn, kể cả khi đang đúng lúc nói. Chủ ngữ I đi với want, không có -s."),
      mc("q9", "m", "'Do you know that girl?' 'Yes, but I ___ her name.'", ["don't remember", "am not remembering", "doesn't remember"], "don't remember", "dh-tt-trang-thai", "Bạn có biết cô gái đó không? — Có, nhưng tôi không nhớ tên cô ấy.", "Remember là động từ trạng thái.", "Remember thuộc nhóm không dùng tiếp diễn, nên dùng don't remember. Chủ ngữ I nên không dùng doesn't."),
      mc("q10", "m", "She usually walks to work, but today she ___ the bus.", ["is taking", "takes", "take"], "is taking", "dh-vs-tt", "Cô ấy thường đi bộ đến chỗ làm, nhưng hôm nay cô ấy đi xe buýt.", "Today (khác thường) → tiếp diễn.", "Hôm nay là việc tạm thời, khác thói quen, nên dùng hiện tại tiếp diễn. Usually ở vế đầu mới là hiện tại đơn."),
      fl("q11", "h", "I don't ___ what you mean. (understand)", "understand", "dh-tt-trang-thai", "Tôi không hiểu ý bạn là gì.", "Phủ định hiện tại đơn: don't + V.", "Sau don't dùng động từ nguyên mẫu understand. Understand không dùng ở thì tiếp diễn."),
      mc("q12", "h", "Câu nào đúng?", ["I like this music.", "I'm liking this music.", "I likes this music."], "I like this music.", "dh-tt-trang-thai", "Tôi thích bản nhạc này.", "Like là động từ trạng thái.", "Like chỉ dùng hiện tại đơn. Chủ ngữ I không thêm -s nên câu ba sai."),
      mc("q13", "h", "Câu nào đúng?", ["Tom isn't at home. He's visiting friends.", "Tom isn't at home. He visits friends now.", "Tom isn't at home. He is visit friends."], "Tom isn't at home. He's visiting friends.", "dh-vs-tt", "Tom không ở nhà. Anh ấy đang đi thăm bạn.", "Đang xảy ra lúc này: is visiting.", "Việc đang xảy ra lúc này dùng is visiting. Câu hai dùng hiện tại đơn với now là sai. Câu ba thiếu -ing."),
      fl("q14", "h", "How often ___ you go to the dentist? (do / are)", "do", "dh-vs-tt", "Bạn đi nha sĩ bao lâu một lần?", "How often hỏi tần suất: do you go.", "How often hỏi mức độ thường xuyên nên dùng hiện tại đơn: How often do you go...?"),
      mc("q15", "h", "'Bạn biết nói tiếng Anh không?' → Câu nào đúng?", ["Do you speak English?", "Are you speak English?", "Are you speaking English?"], "Do you speak English?", "dh-vs-tt", "Bạn có nói được tiếng Anh không?", "Hỏi khả năng chung: Do you speak...?", "Hỏi khả năng nói nói chung dùng hiện tại đơn. Are you speak là sai ngữ pháp; Are you speaking English? chỉ hỏi bạn có đang nói tiếng Anh ngay lúc này không.")
    ]
  });

  window.GRAMMAR.push({
    id: "future-plans", cefr: "A2",
    title: "Kế hoạch tương lai: be doing, will và shall",
    summary: "Chọn đúng cách nói tương lai: đã sắp xếp, vừa quyết định, hay lịch trình.",
    formula: "đã sắp xếp: am / is / are + V-ing · quyết định tức thời: will + V · lịch: present simple",
    see: ["future", "present-continuous", "might-may"],
    selfWrite: [
      ["Viết một kế hoạch đã sắp xếp của bạn cho cuối tuần này (dùng am / is / are + V-ing).", "I'm meeting my friends on Saturday evening."],
      ["Viết một lời đề nghị giúp ai đó bằng I'll hoặc Shall I...?", "Shall I open the window? It's hot in here."]
    ],
    sections: [
      {
        heading: "1. Present continuous: việc đã sắp xếp",
        body: "Am / is / are + V-ing có thể nói về tương lai khi bạn đã sắp xếp hoặc có kế hoạch cụ thể (thường có người, có giờ). Ví dụ: I'm playing tennis tomorrow (đã hẹn sân). Không dùng hiện tại đơn cho loại việc này: nói Are you going out tonight?, không nói Do you go out tonight?. Present simple dùng cho lịch trình cố định của tàu xe, chương trình: The train arrives at 7.30.",
        table: [
          ["Loại việc", "Dùng", "Ví dụ"],
          ["đã sắp xếp (người)", "am / is / are + V-ing", "I'm going to a concert tomorrow."],
          ["lịch trình tàu xe, phim", "present simple", "The concert starts at 7.30."]
        ],
        examples: [
          { en: "Sophie is going to the dentist on Friday.", vi: "Sophie đi nha sĩ vào thứ Sáu (đã có hẹn)." },
          { en: "What are you doing tomorrow evening?", vi: "Tối mai bạn làm gì?" },
          { en: "What time does the film finish?", vi: "Phim kết thúc lúc mấy giờ?" }
        ]
      },
      {
        heading: "2. will: quyết định ngay lúc nói, lời đề nghị",
        body: "I'll (I will) dùng khi bạn vừa quyết định hoặc đề nghị giúp, ngay lúc đang nói. Hay gặp: I think I'll... / I don't think I'll.... Nếu đã quyết định từ trước thì không dùng I'll mà dùng be going to hoặc am / is / are + V-ing: I'm working tomorrow, I'm going to sell my car.",
        examples: [
          { en: "'My bag is very heavy.' 'I'll carry it for you.'", vi: "'Túi tôi nặng quá.' 'Để tôi xách giúp bạn.'" },
          { en: "I'm tired. I think I'll go to bed early.", vi: "Tôi mệt. Tôi nghĩ mình sẽ đi ngủ sớm." },
          { en: "I don't want my car any more. I'm going to sell it.", vi: "Tôi không cần xe nữa. Tôi định bán nó. (đã quyết từ trước)" }
        ]
      },
      {
        heading: "3. Shall I...? Shall we...?",
        body: "Shall I / Shall we + V dùng để đề nghị hoặc hỏi ý kiến người nghe: Bạn nghĩ làm thế này có hay không? Shall chỉ đi với I và we trong kiểu câu này.",
        examples: [
          { en: "It's very warm in here. Shall I open the window?", vi: "Trong này nóng quá. Để tôi mở cửa sổ nhé?" },
          { en: "It's a nice day. Shall we go for a walk?", vi: "Hôm nay trời đẹp. Mình đi dạo nhé?" },
          { en: "Where shall we go for our holidays?", vi: "Kỳ nghỉ mình đi đâu nhỉ?" }
        ]
      }
    ],
    walk: [
      w("Are you going out tonight?", "Tối nay bạn có đi chơi không?", "Hỏi về kế hoạch đã sắp xếp nên dùng present continuous, không dùng Do you go."),
      w("The train arrives at 7.30.", "Tàu đến lúc 7 giờ 30.", "Lịch trình cố định của tàu xe dùng present simple."),
      w("That's the doorbell. Shall I go?", "Chuông cửa kìa. Để tôi ra nhé?", "Shall I đề nghị làm giúp.")
    ],
    mistakes: [
      x("I'll work tomorrow. (đã có lịch từ trước)", "I'm working tomorrow.", "Việc đã sắp xếp không dùng I'll."),
      x("Do you go out tonight?", "Are you going out tonight?", "Kế hoạch tương lai dùng present continuous, không dùng present simple."),
      x("I phone you tomorrow, OK?", "I'll phone you tomorrow, OK?", "Lời hứa hoặc quyết định tức thời dùng I'll + V.")
    ],
    check: [
      "Đã sắp xếp từ trước hay vừa quyết định? || Đã sắp xếp → am / is / are + V-ing hoặc going to. Vừa quyết định hoặc đề nghị → will.",
      "Có phải lịch trình tàu xe, phim không? || Nếu là lịch cố định của tàu xe, phim, chương trình → present simple (starts, arrives).",
      "Là lời đề nghị hay hỏi ý kiến? || Shall I / Shall we + V.",
      "Câu có I think I'll...? || Đó là cách nói quyết định ngay lúc nói."
    ],
    questions: [
      mc("q1", "e", "I ___ tennis tomorrow. (đã hẹn sân)", ["am playing", "play", "plays"], "am playing", "kh-dang-lam", "Ngày mai tôi chơi quần vợt (đã hẹn).", "Kế hoạch đã sắp xếp: am + V-ing.", "Việc đã hẹn trước nên dùng present continuous. Chủ ngữ I đi với am."),
      mc("q2", "e", "What ___ you doing tomorrow evening?", ["are", "do", "will"], "are", "kh-dang-lam", "Tối mai bạn làm gì?", "are you doing = kế hoạch.", "Hỏi về kế hoạch dùng present continuous: What are you doing...? Do you doing là sai ngữ pháp."),
      mc("q3", "e", "The train ___ at 7.30.", ["arrives", "is arriving", "arrive"], "arrives", "kh-lich", "Tàu đến lúc 7 giờ 30.", "Lịch trình tàu xe: present simple.", "Lịch cố định của tàu xe dùng present simple. Train là ngôi thứ ba số ít nên arrive thêm -s."),
      mc("q4", "e", "'My bag is very heavy.' — ___ carry it for you.", ["I'll", "I carry", "I'm carrying"], "I'll", "kh-will-shall", "'Túi tôi nặng quá.' — Để tôi xách giúp.", "Đề nghị tức thời: I'll + V.", "Khi đề nghị giúp ngay lúc nói ta dùng I'll + động từ nguyên mẫu."),
      mc("q5", "e", "___ I open the window? It's hot.", ["Shall", "Will", "Do"], "Shall", "kh-will-shall", "Tôi mở cửa sổ nhé? Nóng quá.", "Shall I = đề nghị.", "Shall I + V dùng để đề nghị làm gì giúp người khác hoặc hỏi ý kiến."),
      mc("q6", "m", "I'm tired. I think I ___ to bed early.", ["will go", "go", "goes"], "will go", "kh-will-shall", "Tôi mệt. Tôi nghĩ mình sẽ đi ngủ sớm.", "I think I'll + V.", "I think I'll... dùng khi vừa quyết định. Sau will dùng động từ nguyên mẫu (go), không thêm -s."),
      mc("q7", "m", "We ___ a party next weekend. We have already sent the invitations.", ["are having", "have", "had"], "are having", "kh-dang-lam", "Cuối tuần sau chúng tôi tổ chức tiệc. Chúng tôi đã gửi thiệp mời rồi.", "Đã chuẩn bị: present continuous.", "Đã gửi thiệp mời nghĩa là kế hoạch đã sắp xếp, nên dùng are having."),
      fl("q8", "m", "Lisa isn't ___ to the party next week. (come)", "coming", "kh-dang-lam", "Tuần sau Lisa sẽ không đến bữa tiệc.", "Phủ định present continuous: isn't + V-ing.", "Phủ định của kế hoạch đã sắp xếp: isn't + V-ing. Không nói Lisa doesn't come."),
      mc("q9", "m", "What time ___ the film finish? (lịch chiếu)", ["does", "is", "will"], "does", "kh-lich", "Phim kết thúc lúc mấy giờ?", "Lịch chương trình: present simple.", "Giờ chiếu phim là lịch cố định nên dùng present simple: What time does the film finish?"),
      mc("q10", "m", "It's a nice day. ___ we go for a walk?", ["Shall", "Do", "Are"], "Shall", "kh-will-shall", "Hôm nay trời đẹp. Mình đi dạo nhé?", "Shall we = rủ, đề nghị.", "Shall we + V dùng để rủ cùng làm hoặc hỏi ý kiến."),
      mc("q11", "h", "I don't want my car any more. I ___ it. (đã quyết từ trước)", ["am going to sell", "will sell", "sell"], "am going to sell", "kh-will-shall", "Tôi không cần xe nữa. Tôi định bán nó.", "Quyết định từ trước: going to.", "Việc đã quyết định trước lúc nói dùng am going to, không dùng will. Will dùng cho quyết định tức thời."),
      mc("q12", "h", "Câu nào đúng?", ["I'll phone you tomorrow, OK?", "I phone you tomorrow, OK?", "I'm phone you tomorrow, OK?"], "I'll phone you tomorrow, OK?", "kh-will-shall", "Mai tôi sẽ gọi bạn nhé?", "Lời hứa: I'll + V.", "Lời hứa tức thời dùng I'll + động từ nguyên mẫu. Present simple (I phone) không dùng cho lời hứa."),
      fl("q13", "h", "'Do you want to go out?' 'No, it's raining. I think I ___ stay at home.' (will)", ["will", "'ll"], "kh-will-shall", "Bạn có muốn ra ngoài không? — Không, trời mưa. Tôi nghĩ tôi sẽ ở nhà.", "I think I will / I'll + V.", "Quyết định vừa đưa ra nên dùng will (viết tắt 'll) + stay."),
      mc("q14", "h", "Câu nào đúng?", ["What are you doing at the weekend?", "What do you doing at the weekend?", "What are you do at the weekend?"], "What are you doing at the weekend?", "kh-dang-lam", "Cuối tuần bạn làm gì?", "Hỏi kế hoạch: are you doing.", "Hỏi về kế hoạch cuối tuần dùng present continuous: What are you doing...? Hai câu còn lại sai cấu trúc."),
      mc("q15", "h", "'Shall I phone you this evening?' có nghĩa là gì?", ["Tôi gọi cho bạn tối nay nhé?", "Tôi chắc chắn sẽ gọi cho bạn tối nay.", "Bạn có gọi cho tôi tối nay không?"], "Tôi gọi cho bạn tối nay nhé?", "kh-will-shall", "Tôi gọi cho bạn tối nay nhé?", "Shall I = đề nghị, hỏi ý kiến.", "Shall I + V là lời đề nghị và hỏi người nghe xem có ổn không, không phải lời khẳng định chắc chắn.")
    ]
  });

  window.GRAMMAR.push({
    id: "might-may", cefr: "A2",
    title: "might và may: có thể, có khả năng",
    summary: "Nói điều có thể xảy ra nhưng chưa chắc, và xin phép lịch sự.",
    formula: "S + might (not) + V · May I + V...?",
    see: ["modals", "future-plans", "future"],
    selfWrite: [
      ["Viết một câu về điều có thể xảy ra vào cuối tuần của bạn (dùng might).", "I might go to the cinema this weekend, but I'm not sure."],
      ["Viết một câu xin phép lịch sự bằng May I...?", "May I use your phone, please?"]
    ],
    sections: [
      {
        heading: "1. might + động từ nguyên mẫu",
        body: "Might nghĩa là có thể, có khả năng nhưng chưa chắc. Dùng với mọi chủ ngữ, không thêm -s, sau đó là động từ nguyên mẫu không có to: He might go, It might rain. Phủ định: might not + V. Trong câu trả lời ngắn có thể chỉ nói I might.",
        examples: [
          { en: "I might go to the cinema this evening, but I'm not sure.", vi: "Tối nay tôi có thể đi xem phim, nhưng tôi chưa chắc." },
          { en: "Take an umbrella. It might rain.", vi: "Mang theo ô đi. Trời có thể mưa." },
          { en: "'Are you going out tonight?' 'I might.'", vi: "'Tối nay bạn có đi chơi không?' 'Có thể.'" }
        ]
      },
      {
        heading: "2. So sánh mức chắc chắn",
        body: "Khi chắc chắn, dùng am / is / are + V-ing hoặc is going to. Khi chỉ có khả năng, dùng might. So sánh: I'm playing tennis tomorrow (chắc chắn) và I might play tennis tomorrow (có thể).",
        table: [
          ["Chắc chắn", "Có thể"],
          ["I'm playing tennis tomorrow.", "I might play tennis tomorrow."],
          ["Rebecca is going to phone later.", "Rebecca might phone later."]
        ],
        examples: [
          { en: "Sue might not come to the party.", vi: "Sue có thể sẽ không đến bữa tiệc." },
          { en: "I might not go to work tomorrow.", vi: "Ngày mai tôi có thể không đi làm." }
        ]
      },
      {
        heading: "3. may và May I...?",
        body: "May dùng giống might trong nghĩa có thể: I may go = I might go. Ngoài ra May I + V...? là cách xin phép lịch sự (tương đương Can I...?). Trả lời: Yes, of course. / Yes, please do.",
        examples: [
          { en: "I may go to the cinema this evening.", vi: "Tối nay tôi có thể đi xem phim." },
          { en: "May I ask a question?", vi: "Tôi hỏi một câu được không ạ?" },
          { en: "'May I sit here?' 'Yes, of course.'", vi: "'Tôi ngồi đây được không?' 'Dĩ nhiên rồi.'" }
        ]
      }
    ],
    walk: [
      w("It might rain this afternoon.", "Chiều nay trời có thể mưa.", "Might + động từ nguyên mẫu, nói khả năng chưa chắc."),
      w("Sue might not come to the party.", "Sue có thể không đến bữa tiệc.", "Phủ định: might not + V, không thêm don't."),
      w("May I sit here?", "Tôi ngồi đây được không?", "May I... là xin phép lịch sự.")
    ],
    mistakes: [
      x("He might comes tomorrow.", "He might come tomorrow.", "Sau might dùng động từ nguyên mẫu, không thêm -s."),
      x("I don't might go.", "I might not go.", "Phủ định thêm not sau might, không dùng don't."),
      x("It might to rain.", "It might rain.", "Sau might không dùng to.")
    ],
    check: [
      "Chắc chắn hay chỉ có thể? || Chắc chắn → am doing / is going to. Có thể → might (hoặc may).",
      "Sau might là dạng nào? || Luôn là động từ nguyên mẫu không có to, không thêm -s.",
      "Câu phủ định? || might not + V. Không dùng don't hay doesn't.",
      "Là xin phép? || May I + V...? Trả lời: Yes, of course."
    ],
    questions: [
      mc("q1", "e", "It's cloudy. It ___ rain.", ["might", "is", "does"], "might", "might-co-the", "Trời nhiều mây. Trời có thể mưa.", "Có thể: might + V.", "Might nói khả năng chưa chắc. Sau might là động từ nguyên mẫu rain."),
      mc("q2", "e", "I ___ go to the cinema tonight, but I'm not sure.", ["might", "am", "do"], "might", "might-co-the", "Tối nay tôi có thể đi xem phim, nhưng tôi chưa chắc.", "Chưa chắc: might.", "But I'm not sure cho thấy chưa chắc chắn, nên dùng might + go."),
      mc("q3", "e", "She ___ come to the party. (có thể cô ấy sẽ không đến)", ["might not", "doesn't might", "not might"], "might not", "might-co-the", "Cô ấy có thể không đến bữa tiệc.", "Phủ định: might not + V.", "Phủ định của might là might not. Không dùng don't hay doesn't với might."),
      fl("q4", "e", "She might ___ late. (be)", "be", "might-co-the", "Cô ấy có thể sẽ đến trễ.", "Sau might dùng động từ nguyên mẫu: be.", "Sau might luôn là động từ nguyên mẫu. Dạng nguyên mẫu của is là be."),
      mc("q5", "e", "'Are you going out tonight?' — '___.'", ["I might", "I am might", "I do might"], "I might", "might-co-the", "Tối nay bạn có đi chơi không? — Có thể.", "Câu trả lời ngắn: I might.", "Trả lời ngắn có thể chỉ cần I might, nghĩa là có thể tôi sẽ đi."),
      mc("q6", "m", "Câu nào chắc chắn 100%?", ["I'm playing tennis tomorrow.", "I might play tennis tomorrow.", "I may play tennis tomorrow."], "I'm playing tennis tomorrow.", "might-co-the", "Ngày mai tôi chơi quần vợt (đã chắc chắn).", "Chắc chắn: am + V-ing; có thể: might / may.", "Present continuous nói việc đã sắp xếp (chắc chắn). Might và may chỉ nói khả năng."),
      mc("q7", "m", "Câu nào đúng?", ["He might come.", "He might comes.", "He mights come."], "He might come.", "might-co-the", "Anh ấy có thể sẽ đến.", "Might không đổi dạng; theo sau là V nguyên mẫu.", "Might không thêm -s với he, she, it. Sau might là động từ nguyên mẫu come."),
      mc("q8", "m", "'I may go' có nghĩa tương đương với câu nào?", ["I might go.", "I must go.", "I can't go."], "I might go.", "might-co-the", "I may go = I might go (tôi có thể đi).", "may = might khi nói khả năng.", "May và might có nghĩa gần như giống nhau khi nói về khả năng."),
      mc("q9", "m", "___ I ask a question? (xin phép lịch sự)", ["May", "Am", "Will"], "May", "might-xin-phep", "Tôi hỏi một câu được không ạ?", "May I + V...? = xin phép.", "May I là cách xin phép lịch sự, tương đương Can I."),
      mc("q10", "m", "'May I sit here?' — Cách đáp phù hợp:", ["Yes, of course.", "Yes, I might.", "Yes, I'm sitting."], "Yes, of course.", "might-xin-phep", "Tôi ngồi đây được không? — Vâng, dĩ nhiên rồi.", "Đáp lại May I: Yes, of course.", "Người xin phép đang hỏi có được không nên trả lời Yes, of course (hoặc Sorry, no). Yes, I might không hợp nghĩa."),
      mc("q11", "h", "Rebecca ___ phone this afternoon. I don't know.", ["might", "is going to", "phones"], "might", "might-co-the", "Rebecca có thể sẽ gọi điện chiều nay. Tôi không biết.", "I don't know = chưa chắc: might.", "Cụm I don't know cho thấy không chắc chắn nên dùng might. Is going to nói việc chắc chắn hơn."),
      mc("q12", "h", "Câu nào đúng?", ["I might not go to work tomorrow.", "I don't might go to work tomorrow.", "I might to not go to work tomorrow."], "I might not go to work tomorrow.", "might-co-the", "Ngày mai tôi có thể không đi làm.", "might not + V.", "Phủ định đúng là might not + động từ nguyên mẫu. Không dùng don't với might."),
      mc("q13", "h", "Câu nào có nghĩa 'có thể tôi sẽ không đến'?", ["I might not come.", "I can't come.", "I mustn't come."], "I might not come.", "might-co-the", "Có thể tôi sẽ không đến.", "might not = có khả năng không.", "I might not come nói khả năng không đến. I can't come là không thể đến, mustn't là không được đến."),
      fl("q14", "h", "She ___ be late. (có thể; dùng may hoặc might)", ["may", "might"], "might-co-the", "Cô ấy có thể sẽ đến trễ.", "may / might + V.", "Cả may và might đều dùng được để nói có thể. Sau đó là động từ nguyên mẫu be."),
      mc("q15", "h", "Câu nào đúng?", ["It might rain, so take an umbrella.", "It might to rain, so take an umbrella.", "It mights rain, so take an umbrella."], "It might rain, so take an umbrella.", "might-co-the", "Trời có thể mưa, nên hãy mang ô.", "Sau might không có to, không thêm -s.", "Might là động từ khuyết thiếu: không thêm -s, không dùng to sau nó.")
    ]
  });

  window.GRAMMAR.push({
    id: "verb-forms", cefr: "A2",
    title: "Dạng của động từ: V1, V2, V3 và V-ing",
    summary: "Biết khi nào dùng dạng nào của động từ, và nhóm động từ bất quy tắc.",
    formula: "modal / do + V1 · to + V1 · be + V-ing · have + V3 · be + V3",
    see: ["past-simple", "present-perfect", "passive"],
    selfWrite: [
      ["Viết một câu quá khứ đơn với một động từ bất quy tắc (went, saw, made...).", "I went to the market yesterday and bought some fruit."],
      ["Viết một câu hiện tại hoàn thành với have / has + V3.", "I have seen that film twice."]
    ],
    sections: [
      {
        heading: "1. Động từ có quy tắc và bất quy tắc",
        body: "Động từ có quy tắc thêm -ed cho cả quá khứ đơn (V2) và quá khứ phân từ (V3): clean → cleaned → cleaned. Động từ bất quy tắc không thêm -ed. Có ba kiểu hay gặp: (a) V1 = V2 = V3 (cut, put, hit, cost, let); (b) V2 = V3 nhưng khác V1 (make → made → made, buy → bought, find → found, have → had); (c) cả ba đều khác nhau (break → broke → broken, go → went → gone, see → saw → seen, begin → began → begun).",
        table: [
          ["Nhóm", "V1", "V2", "V3"],
          ["giống hết", "cut", "cut", "cut"],
          ["V2 = V3", "make", "made", "made"],
          ["V2 = V3", "buy", "bought", "bought"],
          ["khác hết", "break", "broke", "broken"],
          ["khác hết", "go", "went", "gone"],
          ["khác hết", "begin", "began", "begun"]
        ],
        examples: [
          { en: "I made a cake yesterday. I have made some coffee.", vi: "Hôm qua tôi làm bánh. Tôi vừa pha cà phê." },
          { en: "Somebody broke this window last night.", vi: "Tối qua có người làm vỡ cửa sổ này." },
          { en: "Somebody has broken this window.", vi: "Ai đó đã làm vỡ cửa sổ này (bây giờ nó đang vỡ)." }
        ]
      },
      {
        heading: "2. Dùng dạng nào sau cấu trúc nào",
        body: "Sau will, can, must, should, might, would: động từ nguyên mẫu (V1). Sau do / does / did: V1. Sau to: V1 (to go). Sau am / is / are / was / were: V-ing (tiếp diễn) hoặc V3 (bị động). Sau have / has: V3 (hiện tại hoàn thành).",
        table: [
          ["Sau", "Dùng", "Ví dụ"],
          ["can / will / must / might...", "V1", "You can go."],
          ["do / does / did", "V1", "She doesn't know."],
          ["to", "V1", "I want to go."],
          ["am / is / are / was / were", "V-ing", "I'm working."],
          ["be (bị động)", "V3", "It was made in China."],
          ["have / has", "V3", "I've lost my keys."]
        ],
        examples: [
          { en: "What time did the train leave?", vi: "Chuyến tàu rời đi lúc mấy giờ?" },
          { en: "Butter is made from milk.", vi: "Bơ được làm từ sữa." },
          { en: "Tom has lost his passport.", vi: "Tom bị mất hộ chiếu." }
        ]
      },
      {
        heading: "3. Chính tả khi thêm -ing và -ed",
        body: "Động từ tận cùng -e bỏ e rồi thêm -ing (make → making). Động từ có một nguyên âm + một phụ âm, nhấn vào âm cuối (một âm tiết) thì gấp đôi phụ âm: stop → stopping / stopped, run → running, get → getting. Không gấp đôi nếu tận cùng bằng hai phụ âm (help → helping), hai nguyên âm (wait → waiting), hoặc -y, -w (enjoy → enjoying). Động từ tận cùng phụ âm + y đổi y thành ied: study → studied.",
        examples: [
          { en: "I'm making dinner.", vi: "Tôi đang nấu bữa tối." },
          { en: "He stopped running.", vi: "Anh ấy ngừng chạy." },
          { en: "She studied hard.", vi: "Cô ấy đã học chăm chỉ." }
        ]
      }
    ],
    walk: [
      w("Tina has lived in London for ten years.", "Tina đã sống ở London mười năm.", "have / has + lived (V3) tạo hiện tại hoàn thành."),
      w("These rooms are cleaned every day.", "Những căn phòng này được dọn mỗi ngày.", "be + cleaned (V3) tạo câu bị động."),
      w("Somebody has broken this window.", "Ai đó đã làm vỡ cửa sổ này.", "broken là V3 của break, khác với V2 broke.")
    ],
    mistakes: [
      x("She can speaks English.", "She can speak English.", "Sau can dùng động từ nguyên mẫu."),
      x("I have went to London.", "I have been to London. / I have gone to London.", "Sau have phải dùng V3 (gone), không dùng V2 (went)."),
      x("Did you went there?", "Did you go there?", "Sau did dùng động từ nguyên mẫu go.")
    ],
    check: [
      "Phía trước là từ nào? || Can / will / must / do / did / to → V1. Am / is / are → V-ing (hoặc V3 nếu bị động). Have / has → V3.",
      "Động từ có quy tắc hay bất quy tắc? || Không chắc thì tra bảng bất quy tắc ở phần Phụ lục.",
      "V2 và V3 có giống nhau không? || Có nhóm giống hết (cut), nhóm V2 = V3 (made), nhóm khác hết (broke / broken).",
      "Chính tả có cần gấp đôi phụ âm không? || Một nguyên âm + một phụ âm, nhấn âm cuối → gấp đôi (stopping)."
    ],
    questions: [
      mc("q1", "e", "She can ___ English well. (speak)", ["speak", "speaks", "speaking"], "speak", "dt-dang", "Cô ấy nói tiếng Anh giỏi.", "Sau can dùng V1.", "Sau can dùng động từ nguyên mẫu không thêm -s."),
      mc("q2", "e", "He doesn't ___ coffee. (like)", ["like", "likes", "liking"], "like", "dt-dang", "Anh ấy không thích cà phê.", "Sau doesn't dùng V1.", "Doesn't đã mang -s của ngôi thứ ba, nên động từ chính trở về nguyên mẫu like."),
      mc("q3", "e", "They are ___ football now. (play)", ["playing", "play", "played"], "playing", "dt-dang", "Bây giờ họ đang chơi bóng đá.", "Sau are dùng V-ing.", "Are + V-ing là hiện tại tiếp diễn, nói việc đang xảy ra."),
      mc("q4", "e", "I have ___ my keys. (lose)", ["lost", "lose", "losing"], "lost", "dt-dang", "Tôi làm mất chìa khóa rồi.", "Sau have dùng V3.", "Have + V3 là hiện tại hoàn thành. V3 của lose là lost."),
      fl("q5", "e", "Yesterday I ___ a cake. (make)", "made", "dt-bat-quy-tac", "Hôm qua tôi làm một cái bánh.", "V2 của make là made.", "Make là động từ bất quy tắc: make → made → made. Có yesterday nên dùng V2."),
      mc("q6", "m", "She has ___ her homework. (do)", ["done", "did", "do"], "done", "dt-bat-quy-tac", "Cô ấy đã làm xong bài tập.", "Sau has dùng V3: done.", "Do → did → done. Sau has / have phải dùng V3 (done)."),
      mc("q7", "m", "Somebody has ___ my bike. (steal)", ["stolen", "stole", "steal"], "stolen", "dt-bat-quy-tac", "Ai đó đã lấy cắp xe đạp của tôi.", "steal → stole → stolen.", "Sau has dùng V3. V3 của steal là stolen, khác với V2 là stole."),
      mc("q8", "m", "This window was ___ last night. (break)", ["broken", "broke", "break"], "broken", "dt-bat-quy-tac", "Cửa sổ này bị vỡ tối qua.", "Bị động: was + V3.", "Was + broken là câu bị động (cửa sổ bị vỡ). V3 của break là broken."),
      mc("q9", "m", "I ___ him at the party last week. (see)", ["saw", "seen", "have seen"], "saw", "dt-bat-quy-tac", "Tuần trước tôi đã gặp anh ấy ở bữa tiệc.", "Có last week → quá khứ đơn: saw.", "Có mốc thời gian đã qua (last week) nên dùng quá khứ đơn. V2 của see là saw."),
      mc("q10", "m", "Did you ___ the film? (enjoy)", ["enjoy", "enjoyed", "enjoying"], "enjoy", "dt-dang", "Bạn có thích bộ phim không?", "Sau did dùng V1.", "Did đã mang dấu quá khứ nên động từ chính ở dạng nguyên mẫu."),
      mc("q11", "h", "Động từ nào có V1 = V2 = V3?", ["cut", "break", "go"], "cut", "dt-bat-quy-tac", "Động từ nào có ba dạng giống nhau?", "cut – cut – cut.", "Cut giữ nguyên ba dạng. Break (broke, broken) và go (went, gone) có dạng khác nhau."),
      fl("q12", "h", "Where did you ___ yesterday? (go)", "go", "dt-dang", "Hôm qua bạn đã đi đâu?", "Sau did dùng V1: go.", "Did đã mang dấu quá khứ nên động từ chính là nguyên mẫu go. Không dùng went sau did."),
      mc("q13", "h", "-ing của run là gì?", ["running", "runing", "runeing"], "running", "dt-chinh-ta", "-ing của run là running.", "Gấp đôi phụ âm: run → running.", "Run có một nguyên âm + một phụ âm, nhấn vào âm cuối, nên gấp đôi n khi thêm -ing."),
      mc("q14", "h", "V2 của study là gì?", ["studied", "studyed", "studid"], "studied", "dt-chinh-ta", "Quá khứ của study là studied.", "Phụ âm + y → ied.", "Study kết thúc bằng phụ âm + y nên đổi y thành ied: studied."),
      mc("q15", "h", "Câu nào đúng?", ["Butter is made from milk.", "Butter is make from milk.", "Butter is maked from milk."], "Butter is made from milk.", "dt-dang", "Bơ được làm từ sữa.", "Bị động: is + V3 (made).", "Bị động hiện tại là am / is / are + V3. V3 của make là made, không phải maked.")
    ]
  });
})();
