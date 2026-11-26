/* Ngữ pháp bổ sung (3/3): mệnh đề quan hệ, câu gián tiếp, cụm động từ. Do AI sinh sẵn một lần. */
(function () {
  var mc = function (id, lv, q, o, a, tag, vi, ex, deep) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: ex, tag: tag, vi: vi, deep: deep }; };
  var fl = function (id, lv, q, a, tag, vi, ex, deep) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: ex, tag: tag, vi: vi, deep: deep }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "qh-who-which": "who, which, that",
    "qh-where-whose": "where và whose",
    "qh-bo-dai-tu": "Khi nào bỏ được đại từ quan hệ",
    "gt-lui-thi": "Câu gián tiếp: lùi thì",
    "gt-said-told": "said và told",
    "gt-doi-tu": "Đổi từ chỉ thời gian, nơi chốn",
    "gt-cau-hoi": "Tường thuật câu hỏi",
    "gt-menh-lenh": "Tường thuật mệnh lệnh",
    "pv-nghia": "Nghĩa của cụm động từ",
    "pv-vi-tri": "Vị trí tân ngữ trong cụm động từ"
  });

  window.GRAMMAR = window.GRAMMAR || [];

  window.GRAMMAR.push({
    id: "relative-clauses", cefr: "B1",
    title: "Mệnh đề quan hệ (who, which, that, where, whose)",
    summary: "Ghép hai câu thành một để mô tả người, vật, nơi chốn.",
    formula: "danh từ + who / which / that / where / whose + mệnh đề",
    sections: [
      {
        heading: "1. who, which, that",
        body: "Mệnh đề quan hệ bổ sung thông tin cho danh từ đứng ngay trước nó. Who dùng cho người, which dùng cho vật, that dùng được cho cả hai. Nó thay thế danh từ ở câu thứ hai, vì vậy không viết thêm đại từ nữa: The man who lives next door (không nói the man who he lives).",
        table: [
          ["Danh từ trước", "Đại từ quan hệ", "Ví dụ"],
          ["người", "who / that", "The woman who lives here is a nurse."],
          ["vật, con vật", "which / that", "The book which I bought was cheap."]
        ],
        examples: [
          { en: "A pilot is a person who flies planes.", vi: "Phi công là người lái máy bay." },
          { en: "This is the book that I bought yesterday.", vi: "Đây là quyển sách tôi mua hôm qua." },
          { en: "The film which we saw was boring.", vi: "Bộ phim chúng tôi xem rất chán." }
        ]
      },
      {
        heading: "2. where và whose",
        body: "Where dùng cho nơi chốn: The restaurant where we met was small. Whose chỉ sở hữu (của ai), đứng trước danh từ: The woman whose car is red is my aunt.",
        examples: [
          { en: "This is the restaurant where we first met.", vi: "Đây là nhà hàng nơi chúng tôi gặp nhau lần đầu." },
          { en: "I know a man whose son is an actor.", vi: "Tôi biết một người đàn ông có con trai là diễn viên." }
        ]
      },
      {
        heading: "3. Khi nào bỏ được đại từ quan hệ",
        body: "Nếu who, which, that là tân ngữ trong mệnh đề (sau nó đã có chủ ngữ riêng) thì có thể bỏ: The book (which) I bought was cheap. Nếu nó là chủ ngữ của mệnh đề (ngay sau nó là động từ) thì không được bỏ: The man who lives next door is a doctor.",
        examples: [
          { en: "The man I met yesterday is my teacher.", vi: "Người đàn ông tôi gặp hôm qua là thầy giáo của tôi." },
          { en: "The car she drives is old.", vi: "Chiếc xe cô ấy lái đã cũ." }
        ]
      }
    ],
    walk: [
      w("The girl who won the prize is my cousin.", "Cô gái giành giải là em họ tôi.", "Who thay cho the girl và làm chủ ngữ của won, nên không bỏ được."),
      w("The film we watched was great.", "Bộ phim chúng tôi xem rất hay.", "Đã bỏ which / that vì nó là tân ngữ của watched."),
      w("That's the café where I work.", "Đó là quán cà phê nơi tôi làm việc.", "Where thay cho nơi chốn.")
    ],
    mistakes: [
      x("The man who he lives here is my uncle.", "The man who lives here is my uncle.", "Who đã làm chủ ngữ, không thêm he nữa."),
      x("The book who I bought was cheap.", "The book which I bought was cheap.", "Vật dùng which hoặc that, không dùng who."),
      x("The woman which lives here is a nurse.", "The woman who lives here is a nurse.", "Người dùng who hoặc that, không dùng which.")
    ],
    check: [
      "Danh từ phía trước là người, vật hay nơi chốn? || Người → who / that. Vật → which / that. Nơi chốn → where. Của ai → whose.",
      "Sau chỗ trống là động từ hay chủ ngữ mới? || Nếu là động từ thì chỗ trống là chủ ngữ, không được bỏ. Nếu là chủ ngữ mới (I, we, she...) thì có thể bỏ đại từ.",
      "Có bị lặp đại từ không? || Không viết the man who he... Đại từ quan hệ đã thay cho he rồi.",
      "Whose đi với gì? || Whose + danh từ: the woman whose car..."
    ],
    questions: [
      mc("q1", "e", "The man ___ lives next door is a doctor.", ["who", "which", "where"], "who", "qh-who-which", "Người đàn ông sống bên cạnh là bác sĩ.", "Người dùng who.", "The man là người nên dùng who. Which dành cho vật, where dành cho nơi chốn."),
      mc("q2", "e", "This is the book ___ I bought yesterday.", ["which", "who", "where"], "which", "qh-who-which", "Đây là quyển sách tôi mua hôm qua.", "Vật dùng which.", "The book là vật nên dùng which (hoặc that). Who chỉ dùng cho người."),
      mc("q3", "e", "That is the girl ___ won the prize.", ["who", "which", "whose"], "who", "qh-who-which", "Đó là cô gái đã giành giải.", "Người dùng who.", "The girl là người và là chủ ngữ của won nên dùng who."),
      mc("q4", "e", "This is the restaurant ___ we met.", ["where", "who", "which"], "where", "qh-where-whose", "Đây là nhà hàng nơi chúng tôi gặp nhau.", "Nơi chốn dùng where.", "The restaurant là nơi chốn, và we met diễn ra ở đó, nên dùng where."),
      mc("q5", "e", "I like the cake ___ my mother makes.", ["which", "who", "where"], "which", "qh-who-which", "Tôi thích loại bánh mẹ tôi làm.", "Vật dùng which.", "The cake là vật nên dùng which. Trong câu này which là tân ngữ của makes nên có thể bỏ."),
      mc("q6", "m", "The woman ___ car is red is my aunt.", ["whose", "who", "which"], "whose", "qh-where-whose", "Người phụ nữ có chiếc xe màu đỏ là dì của tôi.", "Whose + danh từ = của ai.", "Chiếc xe thuộc về người phụ nữ nên dùng whose + car. Who và which không đứng trước danh từ theo cách này."),
      mc("q7", "m", "A pilot is a person ___ flies planes.", ["who", "which", "where"], "who", "qh-who-which", "Phi công là người lái máy bay.", "Person là người nên dùng who.", "A person là người nên dùng who, làm chủ ngữ cho flies. Vì vậy không thể bỏ who."),
      mc("q8", "m", "The film ___ we saw was boring.", ["that", "who", "where"], "that", "qh-who-which", "Bộ phim chúng tôi xem rất chán.", "That dùng được cho vật.", "That thay cho which hoặc who khi nói về vật hoặc người. Vì film là vật, that đúng. Who dùng cho người, where dùng cho nơi chốn."),
      mc("q9", "m", "The city ___ I was born is very big.", ["where", "who", "whose"], "where", "qh-where-whose", "Thành phố nơi tôi sinh ra rất lớn.", "Nơi chốn dùng where.", "Thành phố là nơi tôi sinh ra, nên dùng where. Whose cần danh từ theo sau nên không hợp."),
      mc("q10", "m", "Câu nào đúng?", ["The man who lives here is my uncle.", "The man who he lives here is my uncle.", "The man lives who here is my uncle."], "The man who lives here is my uncle.", "qh-who-which", "Người đàn ông sống ở đây là chú tôi.", "Who đã làm chủ ngữ, không thêm he.", "Who đã thay cho the man và làm chủ ngữ của lives. Thêm he là lặp chủ ngữ. Câu ba đảo sai trật tự."),
      mc("q11", "h", "Câu nào đúng?", ["The book I bought was cheap.", "The book who I bought was cheap.", "The book I bought it was cheap."], "The book I bought was cheap.", "qh-bo-dai-tu", "Quyển sách tôi mua rất rẻ.", "Bỏ được which khi nó là tân ngữ.", "Which là tân ngữ của bought nên có thể bỏ. Câu hai dùng who cho vật là sai. Câu ba lặp tân ngữ it."),
      mc("q12", "h", "I know a man ___ son is an actor.", ["whose", "who", "which"], "whose", "qh-where-whose", "Tôi biết một người đàn ông có con trai là diễn viên.", "Whose + danh từ.", "Con trai thuộc về người đàn ông nên dùng whose + son. Who sẽ cần một động từ theo sau."),
      fl("q13", "h", "She is the teacher ___ helped me with English. (who / that)", ["who", "that"], "qh-who-which", "Cô ấy là giáo viên đã giúp tôi học tiếng Anh.", "Người dùng who hoặc that.", "The teacher là người và ngay sau chỗ trống là động từ helped, nên chỗ trống là chủ ngữ và dùng who hoặc that."),
      mc("q14", "h", "Câu nào đúng?", ["The car that she drives is old.", "The car who she drives is old.", "The car where she drives is old."], "The car that she drives is old.", "qh-who-which", "Chiếc xe cô ấy lái đã cũ.", "Vật dùng that hoặc which.", "The car là vật nên dùng that hoặc which. Who dành cho người, where dành cho nơi chốn."),
      mc("q15", "h", "Cụm nào KHÔNG thể bỏ who / which / that?", ["The man who lives next door", "The book which I bought", "The film that we saw"], "The man who lives next door", "qh-bo-dai-tu", "Cụm nào không thể bỏ đại từ quan hệ?", "Khi đại từ là chủ ngữ của mệnh đề thì không được bỏ.", "Trong the man who lives next door, who là chủ ngữ của lives nên phải giữ. Ở hai cụm còn lại, sau đại từ là chủ ngữ mới (I, we) nên có thể bỏ which / that.")
    ]
  });

  window.GRAMMAR.push({
    id: "reported-speech", cefr: "B1",
    title: "Câu gián tiếp (Reported speech)",
    summary: "Kể lại lời người khác nói: lùi thì và đổi từ.",
    formula: "S + said (that) + S + V (lùi một thì)",
    sections: [
      {
        heading: "1. Lùi thì khi kể lại",
        body: "Khi kể lại lời ai đó đã nói trong quá khứ, động từ thường lùi một thì: hiện tại đơn → quá khứ đơn; hiện tại tiếp diễn → quá khứ tiếp diễn; quá khứ đơn và hiện tại hoàn thành → quá khứ hoàn thành (had + V3); will → would; can → could. Đồng thời đổi đại từ cho hợp: I → he / she. Said không cần người nghe (He said that...), còn told luôn có người nghe (He told me that...).",
        table: [
          ["Lời nói trực tiếp", "Câu gián tiếp"],
          ["am / is / are", "was / were"],
          ["like / works (hiện tại đơn)", "liked / worked (quá khứ đơn)"],
          ["saw / went (quá khứ đơn)", "had seen / had gone"],
          ["have finished", "had finished"],
          ["will / can", "would / could"]
        ],
        examples: [
          { en: "\"I am tired,\" she said. → She said she was tired.", vi: "Cô ấy nói là cô ấy mệt." },
          { en: "\"I can swim,\" he said. → He said he could swim.", vi: "Anh ấy nói anh ấy biết bơi." },
          { en: "He told me that he was busy.", vi: "Anh ấy bảo tôi là anh ấy bận." }
        ]
      },
      {
        heading: "2. Đổi từ chỉ thời gian và nơi chốn",
        body: "Khi kể lại ở thời điểm khác, các từ chỉ thời gian và nơi chốn cũng đổi: now → then; today → that day; tomorrow → the next day; yesterday → the day before; here → there; this → that.",
        table: [
          ["Trực tiếp", "Gián tiếp"],
          ["now", "then"],
          ["today", "that day"],
          ["tomorrow", "the next day"],
          ["yesterday", "the day before"],
          ["here", "there"]
        ],
        examples: [
          { en: "\"I'm going to Paris tomorrow.\" → He said he was going to Paris the next day.", vi: "Anh ấy nói ngày hôm sau anh ấy sẽ đi Paris." },
          { en: "\"I live here.\" → She said she lived there.", vi: "Cô ấy nói cô ấy sống ở đó." }
        ]
      },
      {
        heading: "3. Tường thuật câu hỏi và mệnh lệnh",
        body: "Câu hỏi: dùng asked, và đổi lại trật tự khẳng định, không dùng do / does / did. Yes / No question thêm if hoặc whether: She asked me if I liked pizza. Wh- question giữ từ để hỏi: He asked where I lived. Mệnh lệnh: told / asked + người + to + V: He told me to open the door. Phủ định: told + người + not to + V: She told us not to be late.",
        examples: [
          { en: "\"Where do you live?\" → He asked where I lived.", vi: "Anh ấy hỏi tôi sống ở đâu." },
          { en: "\"Open the door.\" → He told me to open the door.", vi: "Anh ấy bảo tôi mở cửa." },
          { en: "\"Don't be late.\" → She told us not to be late.", vi: "Cô ấy dặn chúng tôi đừng đến trễ." }
        ]
      }
    ],
    walk: [
      w("She said she was tired.", "Cô ấy nói là cô ấy mệt.", "Lời gốc là I am tired; am lùi thành was, I đổi thành she."),
      w("He asked me if I liked pizza.", "Anh ấy hỏi tôi có thích pizza không.", "Câu hỏi Yes / No thêm if, trật tự khẳng định, dùng liked thay cho do you like."),
      w("She told us not to be late.", "Cô ấy dặn chúng tôi đừng đến trễ.", "Mệnh lệnh phủ định: told + người + not to + V.")
    ],
    mistakes: [
      x("He said me that he was late.", "He told me that he was late.", "Said không có tân ngữ chỉ người; muốn nói với ai thì dùng told me."),
      x("She asked where did I live.", "She asked where I lived.", "Câu hỏi gián tiếp không đảo ngữ và không dùng did."),
      x("He told me open the door.", "He told me to open the door.", "Mệnh lệnh gián tiếp cần to + V.")
    ],
    check: [
      "Lời gốc ở thì nào? || Lùi một thì: am / is → was; hiện tại đơn → quá khứ đơn; quá khứ đơn → had + V3; will → would; can → could.",
      "Có từ chỉ thời gian hoặc nơi chốn cần đổi không? || tomorrow → the next day; yesterday → the day before; here → there; now → then.",
      "Dùng said hay told? || told + người (told me). said không có người (said that... / said to me).",
      "Là câu hỏi hay mệnh lệnh? || Câu hỏi: asked + if / từ Wh- + trật tự khẳng định. Mệnh lệnh: told + người + to V / not to V."
    ],
    questions: [
      mc("q1", "e", "\"I am tired,\" she said. → She said she ___ tired.", ["was", "is", "be"], "was", "gt-lui-thi", "Cô ấy nói là cô ấy mệt.", "am lùi thành was.", "Khi kể lại, am / is lùi thành was. Chủ ngữ I cũng đổi thành she."),
      mc("q2", "e", "\"I like English,\" he said. → He said he ___ English.", ["liked", "likes", "like"], "liked", "gt-lui-thi", "Anh ấy nói anh ấy thích tiếng Anh.", "Hiện tại đơn lùi thành quá khứ đơn.", "Like (hiện tại đơn) lùi thành liked (quá khứ đơn) trong câu gián tiếp."),
      mc("q3", "e", "He told ___ that he was busy.", ["me", "to me", "I"], "me", "gt-said-told", "Anh ấy bảo tôi là anh ấy bận.", "told + người, không có to.", "Told luôn đi với người nghe ngay sau nó (told me). Nếu dùng said thì phải nói said to me."),
      mc("q4", "e", "\"I will help you,\" he said. → He said he ___ help me.", ["would", "will", "wills"], "would", "gt-lui-thi", "Anh ấy nói anh ấy sẽ giúp tôi.", "will lùi thành would.", "Will lùi thành would khi kể lại. You cũng đổi thành me vì người nói kể lại với người khác."),
      mc("q5", "e", "\"I can swim,\" she said. → She said she ___ swim.", ["could", "can", "cans"], "could", "gt-lui-thi", "Cô ấy nói cô ấy biết bơi.", "can lùi thành could.", "Can lùi thành could trong câu gián tiếp."),
      mc("q6", "m", "\"I'm going to Paris tomorrow.\" → He said he was going to Paris ___.", ["the next day", "tomorrow", "yesterday"], "the next day", "gt-doi-tu", "Anh ấy nói ngày hôm sau anh ấy sẽ đi Paris.", "tomorrow → the next day.", "Khi kể lại ở thời điểm khác, tomorrow đổi thành the next day (hoặc the following day). Yesterday có nghĩa ngược lại."),
      mc("q7", "m", "\"I live here.\" → She said she lived ___.", ["there", "here", "where"], "there", "gt-doi-tu", "Cô ấy nói cô ấy sống ở đó.", "here → there.", "Here đổi thành there khi người kể không còn ở nơi đó."),
      mc("q8", "m", "He ___ me that he was late.", ["told", "said", "say"], "told", "gt-said-told", "Anh ấy bảo tôi là anh ấy đến trễ.", "told me; said không có tân ngữ chỉ người.", "Có me ngay sau chỗ trống nên dùng told. Nếu muốn dùng said thì phải đổi thành said to me hoặc bỏ me."),
      mc("q9", "m", "\"Do you like pizza?\" → She asked me ___ I liked pizza.", ["if", "that", "what"], "if", "gt-cau-hoi", "Cô ấy hỏi tôi có thích pizza không.", "Yes / No question thêm if hoặc whether.", "Câu hỏi Yes / No khi kể lại dùng if hoặc whether, và không dùng do / does."),
      mc("q10", "m", "\"Where do you live?\" → He asked where I ___.", ["lived", "did live", "do live"], "lived", "gt-cau-hoi", "Anh ấy hỏi tôi sống ở đâu.", "Trật tự khẳng định, lùi thì.", "Câu hỏi gián tiếp dùng trật tự câu khẳng định (I lived) và lùi do live thành lived. Không dùng did."),
      mc("q11", "h", "\"I saw her yesterday.\" → He said he ___ her the day before.", ["had seen", "saw", "has seen"], "had seen", "gt-lui-thi", "Anh ấy nói là hôm trước anh ấy đã gặp cô ấy.", "Quá khứ đơn lùi thành quá khứ hoàn thành.", "Saw (quá khứ đơn) lùi thành had seen (quá khứ hoàn thành). Yesterday đổi thành the day before."),
      mc("q12", "h", "\"Open the door,\" he said to me. → He told me ___ the door.", ["to open", "open", "opening"], "to open", "gt-menh-lenh", "Anh ấy bảo tôi mở cửa.", "told + người + to V.", "Mệnh lệnh gián tiếp có cấu trúc told + người + to + động từ nguyên mẫu."),
      mc("q13", "h", "\"Don't be late,\" she said. → She told us ___ late.", ["not to be", "don't be", "not be"], "not to be", "gt-menh-lenh", "Cô ấy dặn chúng tôi đừng đến trễ.", "Phủ định: not to + V.", "Mệnh lệnh phủ định gián tiếp dùng not to + V. Don't không còn dùng nữa."),
      mc("q14", "h", "Câu nào đúng?", ["She asked me where I lived.", "She asked me where did I live.", "She asked me where I do live."], "She asked me where I lived.", "gt-cau-hoi", "Cô ấy hỏi tôi sống ở đâu.", "Không đảo ngữ, lùi thì.", "Câu hỏi gián tiếp dùng trật tự khẳng định, không dùng did và động từ lùi về quá khứ (lived)."),
      mc("q15", "h", "\"I have finished,\" he said. → He said he ___ finished.", ["had", "has", "have"], "had", "gt-lui-thi", "Anh ấy nói anh ấy đã làm xong.", "have finished lùi thành had finished.", "Hiện tại hoàn thành lùi thành quá khứ hoàn thành: have finished → had finished.")
    ]
  });

  window.GRAMMAR.push({
    id: "phrasal-verbs", cefr: "B1",
    title: "Cụm động từ thông dụng (Phrasal verbs)",
    summary: "Động từ + up, off, out...: nghĩa thường khác động từ gốc.",
    formula: "động từ + tiểu từ (up, off, on, out, after, for...)",
    sections: [
      {
        heading: "1. Cụm động từ là gì",
        body: "Cụm động từ gồm một động từ và một tiểu từ (up, down, on, off, out, in, after, for...). Nghĩa của cả cụm thường khác nghĩa của động từ gốc, nên phải học theo cả cụm: look (nhìn), nhưng look after (chăm sóc) và look up (tra cứu). Học theo ví dụ và ngữ cảnh sẽ nhớ lâu hơn học danh sách khô khan.",
        table: [
          ["Cụm động từ", "Nghĩa", "Ví dụ"],
          ["get up", "thức dậy", "I get up at six."],
          ["turn on / turn off", "bật / tắt", "Turn off the light."],
          ["take off", "cởi ra; cất cánh", "Take off your shoes."],
          ["put on", "mặc vào, đội vào", "Put on your coat."],
          ["look for", "tìm kiếm", "I'm looking for my keys."],
          ["look after", "chăm sóc", "She looks after the children."],
          ["look up", "tra cứu", "Look up the word."],
          ["give up", "bỏ cuộc", "Don't give up!"],
          ["pick up", "nhặt lên, đón", "Pick up the box."],
          ["run out of", "hết (cái gì)", "We ran out of milk."],
          ["call off", "hủy bỏ", "The match was called off."],
          ["take after", "giống (người thân)", "He takes after his father."]
        ],
        examples: [
          { en: "Can you turn on the light?", vi: "Bạn bật đèn giúp tôi được không?" },
          { en: "I'm looking for my keys.", vi: "Tôi đang tìm chìa khóa." },
          { en: "Don't give up!", vi: "Đừng bỏ cuộc!" }
        ]
      },
      {
        heading: "2. Vị trí của tân ngữ",
        body: "Nhiều cụm có thể tách rời: tân ngữ là danh từ thì đứng giữa hoặc sau cụm (turn off the light = turn the light off). Nhưng nếu tân ngữ là đại từ (it, them, her, me) thì bắt buộc đứng giữa: turn it off, không nói turn off it. Một số cụm không tách rời được, như look after, look for, take after: look after her.",
        examples: [
          { en: "She picked up the phone. / She picked the phone up.", vi: "Cô ấy nhấc điện thoại lên." },
          { en: "She picked it up.", vi: "Cô ấy nhấc nó lên." },
          { en: "I look after my little brother.", vi: "Tôi chăm sóc em trai." }
        ]
      },
      {
        heading: "3. Cách học hiệu quả",
        body: "Đừng học cả trăm cụm cùng lúc. Mỗi tuần học khoảng 5 cụm, nhóm theo động từ gốc (get, take, look, turn, put, give). Đặt câu của riêng mình và dùng nút + Ôn tập của app để đưa vào lịch ôn. Nhiều tiểu từ có nghĩa ổn định: up thường là lên / hoàn tất, off là rời đi / tắt, out là ra ngoài / hết, back là quay lại.",
        examples: [
          { en: "Speak up, please. I can't hear you.", vi: "Làm ơn nói to lên, tôi không nghe thấy." },
          { en: "The plane took off at 8 a.m.", vi: "Máy bay cất cánh lúc 8 giờ sáng." }
        ]
      }
    ],
    walk: [
      w("Please turn it off.", "Làm ơn tắt nó đi.", "Tân ngữ là đại từ it nên phải đứng giữa turn và off."),
      w("Who looks after the children?", "Ai chăm sóc bọn trẻ?", "Look after = chăm sóc, không tách rời."),
      w("We ran out of milk.", "Chúng tôi hết sữa rồi.", "Run out of + danh từ = hết cái gì.")
    ],
    mistakes: [
      x("Please turn off it.", "Please turn it off.", "Đại từ luôn đứng giữa động từ và tiểu từ."),
      x("I'm looking at my keys. (đang tìm chìa khóa)", "I'm looking for my keys.", "Look at = nhìn; look for = tìm kiếm."),
      x("She looks the children after.", "She looks after the children.", "Look after không tách rời, nên đứng liền nhau.")
    ],
    check: [
      "Nghĩa của cả cụm là gì? || Đừng dịch từng từ. Nhớ cả cụm: look after = chăm sóc, look for = tìm, look up = tra cứu.",
      "Tân ngữ là đại từ hay danh từ? || Đại từ (it, them, me) → luôn đứng giữa: turn it off. Danh từ → đứng giữa hoặc sau: turn off the light.",
      "Cụm có tách rời được không? || Look after, look for, take after không tách rời. Turn on / off, pick up, put on tách được.",
      "Tiểu từ gợi ý gì? || up (lên, hoàn tất), off (rời đi, tắt), out (ra ngoài, hết), back (quay lại)."
    ],
    questions: [
      mc("q1", "e", "Please ___ your shoes before you enter.", ["take off", "take up", "take out"], "take off", "pv-nghia", "Vui lòng cởi giày trước khi vào.", "take off = cởi ra.", "Take off nghĩa là cởi ra (giày, áo). Take up là bắt đầu một sở thích, take out là lấy ra ngoài."),
      mc("q2", "e", "It's dark. Can you ___ the light?", ["turn on", "turn into", "turn around"], "turn on", "pv-nghia", "Trời tối rồi. Bạn bật đèn được không?", "turn on = bật.", "Turn on nghĩa là bật (đèn, tivi). Ngược lại là turn off. Turn into nghĩa là biến thành."),
      mc("q3", "e", "I'm ___ my keys. Have you seen them?", ["looking for", "looking after", "looking at"], "looking for", "pv-nghia", "Tôi đang tìm chìa khóa. Bạn có thấy không?", "look for = tìm kiếm.", "Look for nghĩa là tìm kiếm. Look after là chăm sóc, look at là nhìn vào."),
      mc("q4", "e", "Don't ___! You can do it.", ["give up", "give out", "give away"], "give up", "pv-nghia", "Đừng bỏ cuộc! Bạn làm được mà.", "give up = bỏ cuộc.", "Give up nghĩa là từ bỏ. Give out là phát (tài liệu), give away là cho đi miễn phí."),
      mc("q5", "e", "She ___ at 6 every day.", ["gets up", "gets on", "gets off"], "gets up", "pv-nghia", "Cô ấy thức dậy lúc 6 giờ mỗi ngày.", "get up = thức dậy.", "Get up nghĩa là thức dậy. Get on là lên (xe buýt), get off là xuống xe."),
      mc("q6", "m", "Who ___ the children while you work?", ["looks after", "looks for", "looks up"], "looks after", "pv-nghia", "Ai trông bọn trẻ khi bạn đi làm?", "look after = chăm sóc.", "Look after nghĩa là chăm sóc, trông nom. Look for là tìm, look up là tra cứu."),
      mc("q7", "m", "I don't know this word. I'll ___ it in a dictionary.", ["look up", "look after", "look out"], "look up", "pv-nghia", "Tôi không biết từ này. Tôi sẽ tra từ điển.", "look up = tra cứu.", "Look up nghĩa là tra cứu trong sách hoặc từ điển. Look out là cẩn thận."),
      mc("q8", "m", "The match was ___ because of the rain.", ["called off", "called up", "called in"], "called off", "pv-nghia", "Trận đấu bị hủy vì trời mưa.", "call off = hủy bỏ.", "Call off nghĩa là hủy một sự kiện. Call up là gọi điện hoặc gọi nhập ngũ."),
      mc("q9", "m", "Câu nào đúng?", ["Turn it off.", "Turn off it.", "Off turn it."], "Turn it off.", "pv-vi-tri", "Tắt nó đi.", "Đại từ đứng giữa.", "Với đại từ it, bắt buộc đặt giữa turn và off. Câu Turn off it sai."),
      mc("q10", "m", "We ran ___ of milk, so I went to buy some.", ["out", "off", "up"], "out", "pv-nghia", "Chúng tôi hết sữa nên tôi đi mua.", "run out of = hết.", "Run out of + danh từ nghĩa là hết cái gì đó. Cụm này phải có đủ ba từ."),
      mc("q11", "h", "Câu nào SAI?", ["Please pick up the box.", "Please pick the box up.", "Please pick up it."], "Please pick up it.", "pv-vi-tri", "Câu nào sai?", "Đại từ phải đứng giữa: pick it up.", "Với tân ngữ là danh từ (the box), có thể nói pick up the box hoặc pick the box up. Nhưng với đại từ it thì phải nói pick it up."),
      fl("q12", "h", "I'm looking ___ to the holiday.", "forward", "pv-nghia", "Tôi mong chờ kỳ nghỉ.", "look forward to = mong chờ.", "Look forward to nghĩa là mong chờ, và to ở đây là giới từ nên sau đó dùng danh từ hoặc V-ing."),
      mc("q13", "h", "He takes ___ his father. They look the same.", ["after", "off", "up"], "after", "pv-nghia", "Anh ấy giống bố. Hai người trông giống hệt nhau.", "take after = giống (người thân).", "Take after nghĩa là giống người trong gia đình (về ngoại hình hoặc tính cách). Cụm này không tách rời."),
      mc("q14", "h", "Sorry, I can't hear you. Can you speak ___?", ["up", "out", "down"], "up", "pv-nghia", "Xin lỗi, tôi không nghe thấy. Bạn nói to lên được không?", "speak up = nói to hơn.", "Speak up nghĩa là nói to lên. Speak down không dùng theo nghĩa này, còn speak out nghĩa là lên tiếng công khai."),
      mc("q15", "h", "The plane ___ at 8 a.m.", ["took off", "took up", "took in"], "took off", "pv-nghia", "Máy bay cất cánh lúc 8 giờ sáng.", "take off = cất cánh.", "Take off còn có nghĩa là cất cánh (máy bay). Cùng một cụm có thể có nhiều nghĩa; ở đây là cất cánh, khác với cởi giày ở câu đầu.")
    ]
  });
})();
