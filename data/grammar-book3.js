/* Ngữ pháp bổ sung theo giáo trình Essential Grammar in Use (3/6): want you to, go / get, do / make / have, đại từ phản thân. */
(function () {
  var mc = function (id, lv, q, o, a, tag, vi, ex, deep) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: ex, tag: tag, vi: vi, deep: deep }; };
  var fl = function (id, lv, q, a, tag, vi, ex, deep) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: ex, tag: tag, vi: vi, deep: deep }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "vo-want-you-to": "want / ask / tell + người + to V",
    "vo-not-to": "told you not to...",
    "vo-make-let": "make / let + người + V (không to)",
    "go-to-on-for": "go to / go on / go for / go home",
    "go-ving": "go + V-ing (go shopping...)",
    "get-nghia": "Các nghĩa của get",
    "get-vitri": "get to / in / out / on / off",
    "dmh-do-make": "do và make",
    "dmh-have": "have, have got và have a shower...",
    "phan-than": "myself, himself, themselves...",
    "phan-than-each": "each other và by myself"
  });
  window.GRAMMAR = window.GRAMMAR || [];

  window.GRAMMAR.push({
    id: "verb-object-infinitive", cefr: "B1",
    title: "want / tell / ask + người + to V; make và let",
    summary: "Muốn ai làm gì, bảo ai làm gì: I want you to..., She told me to...",
    formula: "want / ask / tell + người + to V · make / let + người + V",
    see: ["gerund-infinitive", "reported-speech"],
    selfWrite: [
      ["Viết một câu nói bạn muốn ai đó làm gì (I want ... to ...).", "I want my brother to help me with my homework."],
      ["Viết một câu về điều giáo viên hoặc cha mẹ bắt bạn làm (made me + V).", "My mother made me clean my room."]
    ],
    sections: [
      {
        heading: "1. Động từ + người + to V",
        body: "Khi muốn người khác làm gì, ta dùng động từ + người + to + động từ nguyên mẫu: I want you to be happy. Không nói I want that you are happy. Cấu trúc này đi với want, would like, ask, tell, advise, expect, persuade, teach. Nếu người đó là đại từ thì dùng dạng tân ngữ (me, you, him, her, us, them).",
        examples: [
          { en: "I want you to be happy.", vi: "Mẹ muốn con được hạnh phúc." },
          { en: "Do you want me to lend you some money?", vi: "Bạn có muốn tôi cho bạn mượn ít tiền không?" },
          { en: "I'm teaching my brother to swim.", vi: "Tôi đang dạy em trai bơi." }
        ]
      },
      {
        heading: "2. told you to... / told you not to...",
        body: "Tell + người + to V dùng để kể lại việc ai bảo ai làm gì. Phủ định đặt not trước to: told you not to be late. Cấu trúc này giống phần mệnh lệnh trong câu gián tiếp.",
        examples: [
          { en: "I told you to be careful.", vi: "Tôi đã bảo bạn phải cẩn thận." },
          { en: "Jane told me to wait for her.", vi: "Jane bảo tôi chờ cô ấy." },
          { en: "Paul told Sue not to wait for him.", vi: "Paul bảo Sue đừng chờ anh ấy." }
        ]
      },
      {
        heading: "3. make và let không có to",
        body: "Sau make (bắt ai làm) và let (cho phép ai làm), động từ ở dạng nguyên mẫu không có to: He makes me laugh. Our teacher made us work hard. Sue let me use her phone. Cũng có Let's + V (cùng làm với chúng ta).",
        examples: [
          { en: "He's very funny. He makes me laugh.", vi: "Anh ấy rất hài hước. Anh ấy làm tôi cười." },
          { en: "At school our teacher made us work very hard.", vi: "Ở trường cô giáo bắt chúng tôi học rất nặng." },
          { en: "Sue let me use her phone.", vi: "Sue cho tôi dùng điện thoại của cô ấy." }
        ]
      }
    ],
    walk: [
      w("I want you to help me.", "Tôi muốn bạn giúp tôi.", "want + you + to V; you là tân ngữ."),
      w("She told me not to be late.", "Cô ấy dặn tôi đừng đến trễ.", "told + me + not to V."),
      w("My boss lets me work from home.", "Sếp cho phép tôi làm việc ở nhà.", "let + me + V (không to).")
    ],
    mistakes: [
      x("I want that you help me.", "I want you to help me.", "Sau want dùng người + to V, không dùng that."),
      x("He makes me to laugh.", "He makes me laugh.", "Sau make không dùng to."),
      x("She told me wait.", "She told me to wait.", "Sau told + người cần to + V.")
    ],
    check: [
      "Có người đứng giữa động từ và V không? || want / ask / tell + người + to V.",
      "Động từ chính là make hay let? || Dùng V nguyên mẫu không to.",
      "Muốn nói đừng làm gì? || not đặt trước to: told me not to go.",
      "Người đó là đại từ nào? || Dùng dạng tân ngữ: me, you, him, her, us, them."
    ],
    questions: [
      mc("q1", "e", "I want you ___ happy.", ["to be", "be", "being"], "to be", "vo-want-you-to", "Tôi muốn bạn hạnh phúc.", "want + người + to V.", "Cấu trúc want + you + to + động từ nguyên mẫu nên dùng to be."),
      mc("q2", "e", "She asked me ___ the door.", ["to open", "open", "opening"], "to open", "vo-want-you-to", "Cô ấy bảo tôi mở cửa.", "ask + người + to V.", "Ask đi với người + to + động từ nguyên mẫu."),
      mc("q3", "e", "Do you want me ___ you some money?", ["to lend", "lend", "lending"], "to lend", "vo-want-you-to", "Bạn có muốn tôi cho bạn mượn ít tiền không?", "want me to + V.", "Sau want me luôn có to + động từ nguyên mẫu."),
      mc("q4", "e", "The teacher told us ___ quiet.", ["to be", "be", "being"], "to be", "vo-want-you-to", "Cô giáo bảo chúng tôi giữ yên lặng.", "tell + người + to V.", "Tell đi với người + to V: told us to be quiet."),
      mc("q5", "e", "He makes me ___.", ["laugh", "to laugh", "laughing"], "laugh", "vo-make-let", "Anh ấy làm tôi cười.", "make + người + V (không to).", "Sau make dùng động từ nguyên mẫu không có to."),
      mc("q6", "m", "I didn't expect them ___ here.", ["to be", "be", "being"], "to be", "vo-want-you-to", "Tôi không ngờ họ ở đây.", "expect + người + to V.", "Expect đi với người + to V nên dùng to be."),
      mc("q7", "m", "She let me ___ her phone.", ["use", "to use", "using"], "use", "vo-make-let", "Cô ấy cho tôi dùng điện thoại của cô ấy.", "let + người + V.", "Sau let không dùng to, nên chọn use."),
      mc("q8", "m", "My mother taught me ___.", ["to swim", "swim", "swimming"], "to swim", "vo-want-you-to", "Mẹ dạy tôi bơi.", "teach + người + to V.", "Teach đi với người + to V: taught me to swim."),
      mc("q9", "m", "I told you ___ late. (đừng đến trễ)", ["not to be", "don't be", "not be"], "not to be", "vo-not-to", "Tôi đã dặn bạn đừng đến trễ.", "told + người + not to V.", "Phủ định đặt not trước to: not to be. Don't be chỉ dùng ở mệnh lệnh trực tiếp."),
      mc("q10", "m", "The teacher made us ___ hard.", ["work", "to work", "working"], "work", "vo-make-let", "Cô giáo bắt chúng tôi làm việc chăm chỉ.", "make + người + V.", "Sau made us dùng động từ nguyên mẫu không có to."),
      mc("q11", "h", "Câu nào đúng?", ["I want you to help me.", "I want that you help me.", "I want you help me."], "I want you to help me.", "vo-want-you-to", "Tôi muốn bạn giúp tôi.", "want + người + to V.", "Không dùng that sau want. Cần có to trước động từ nguyên mẫu."),
      fl("q12", "h", "Would you like me ___ you? (help)", ["to help"], "vo-want-you-to", "Bạn có muốn tôi giúp bạn không?", "would like + người + to V.", "Would like me to help dùng cấu trúc giống want me to help."),
      mc("q13", "h", "Câu nào đúng?", ["Let's go home.", "Let's to go home.", "Let's going home."], "Let's go home.", "vo-make-let", "Mình về nhà đi.", "Let's + V (không to).", "Let's = Let us, theo sau là động từ nguyên mẫu không có to."),
      fl("q14", "h", "They didn't want anybody ___ their secret. (know)", ["to know"], "vo-want-you-to", "Họ không muốn ai biết bí mật của mình.", "want + người + to V.", "Anybody là người đứng giữa want và động từ nên cần to know."),
      mc("q15", "h", "Câu nào đúng?", ["Jane told me to wait for her.", "Jane told me wait for her.", "Jane told to me to wait for her."], "Jane told me to wait for her.", "vo-not-to", "Jane bảo tôi chờ cô ấy.", "told + me + to V.", "Sau told ta để người nhận ngay sau, không dùng to me, rồi mới tới to + V.")
    ]
  });

  window.GRAMMAR.push({
    id: "go-get", cefr: "A2",
    title: "Động từ go và get",
    summary: "go to, go home, go for a walk, go shopping; get = nhận, trở nên, đến.",
    formula: "go to / on / for / V-ing · get + danh từ / tính từ / to + nơi chốn",
    see: ["prepositions", "phrasal-verbs"],
    selfWrite: [
      ["Viết một câu nói bạn thường đi đâu vào cuối tuần (go to / go for / go + V-ing).", "I usually go shopping on Saturday afternoon."],
      ["Viết một câu nói mấy giờ bạn về đến nhà (get home).", "I usually get home at six o'clock."]
    ],
    sections: [
      {
        heading: "1. go to, go home, go on, go for",
        body: "Go to + nơi chốn (go to work, go to London). Riêng home không cần to: go home, không nói go to home. Go on + holiday, a trip, a tour, strike. Go for + a walk, a run, a swim, a drink, a meal. Go + V-ing dùng cho thể thao và mua sắm: go swimming, go shopping, go fishing, go jogging.",
        table: [
          ["Cấu trúc", "Ví dụ"],
          ["go to + nơi chốn", "What time do you go to work?"],
          ["go home", "I'm going home now."],
          ["go on + holiday / a trip", "We're going on holiday next week."],
          ["go for + a walk / a swim / a meal", "She's gone for a walk."],
          ["go + V-ing", "Let's go swimming."]
        ],
        examples: [
          { en: "I'm going home now.", vi: "Bây giờ tôi về nhà đây." },
          { en: "Shall we go out for a meal?", vi: "Mình ra ngoài ăn nhé?" },
          { en: "Are you going shopping this afternoon?", vi: "Chiều nay bạn có đi mua sắm không?" }
        ]
      },
      {
        heading: "2. Các nghĩa của get",
        body: "Get + danh từ có thể là nhận (get an email), mua (where did you get it), tìm được (get a job), bắt xe (get a bus). Get + tính từ nghĩa là trở nên: get hungry, get cold, get tired, get better, get wet. Một số cụm cố định: get married, get dressed, get lost, get up (ngủ dậy).",
        examples: [
          { en: "I got an email from Sam this morning.", vi: "Sáng nay tôi nhận được email của Sam." },
          { en: "Drink your coffee. It's getting cold.", vi: "Uống cà phê đi. Nó đang nguội dần." },
          { en: "We didn't have a map, so we got lost.", vi: "Chúng tôi không có bản đồ nên bị lạc." }
        ]
      },
      {
        heading: "3. get to và get in / out / on / off",
        body: "Get to + nơi chốn = đến nơi: get to work, get to Manchester. Với here, there, home thì bỏ to: get here, get there, get home. Get in / get out of dùng cho xe hơi và taxi (get in the car, get out of the car); get on / get off dùng cho xe buýt, tàu, máy bay (get on the bus, get off the train).",
        examples: [
          { en: "What time did you get home last night?", vi: "Tối qua bạn về đến nhà lúc mấy giờ?" },
          { en: "Kate got in the car and drove away.", vi: "Kate lên xe rồi lái đi." },
          { en: "We got on the bus and got off in Church Street.", vi: "Chúng tôi lên xe buýt và xuống ở phố Church." }
        ]
      }
    ],
    walk: [
      w("I'm going home now.", "Bây giờ tôi về nhà.", "Home đứng sau go mà không cần to."),
      w("It's getting cold.", "Trời đang lạnh dần.", "Get + tính từ nghĩa là trở nên."),
      w("What time did you get to the hotel?", "Bạn đến khách sạn lúc mấy giờ?", "get to + nơi chốn = đến nơi.")
    ],
    mistakes: [
      x("I'm going to home.", "I'm going home.", "Không dùng to trước home."),
      x("What time did you get to home?", "What time did you get home?", "Get home không có to."),
      x("We went swim yesterday.", "We went swimming yesterday.", "Dùng go + V-ing cho thể thao.")
    ],
    check: [
      "Sau go có home không? || go home (không to). Với nơi chốn khác → go to.",
      "Là thể thao hoặc mua sắm? || go + V-ing: go swimming, go shopping.",
      "get đi với tính từ hay danh từ? || Tính từ → trở nên. Danh từ → nhận, mua, tìm được.",
      "Lên xuống phương tiện nào? || Xe hơi, taxi: get in / out. Xe buýt, tàu, máy bay: get on / off."
    ],
    questions: [
      mc("q1", "e", "I'm going ___ now.", ["home", "to home", "at home"], "home", "go-to-on-for", "Bây giờ tôi về nhà.", "go home: không có to.", "Home đóng vai trò trạng từ nên không cần to hay at."),
      mc("q2", "e", "What time do you go ___ work?", ["to", "at", "in"], "to", "go-to-on-for", "Bạn đi làm lúc mấy giờ?", "go to work.", "Cụm cố định go to work dùng giới từ to."),
      mc("q3", "e", "We're going ___ holiday next week.", ["on", "in", "at"], "on", "go-to-on-for", "Tuần sau chúng tôi đi nghỉ.", "go on holiday.", "Cụm cố định là go on holiday (on, không phải in)."),
      mc("q4", "e", "Let's go ___. It's a nice day.", ["swimming", "to swim", "for swimming"], "swimming", "go-ving", "Mình đi bơi nhé. Trời đẹp quá.", "go + V-ing.", "Thể thao và hoạt động giải trí dùng go + V-ing."),
      mc("q5", "e", "She has gone ___ a walk.", ["for", "to", "on"], "for", "go-to-on-for", "Cô ấy đã đi dạo.", "go for a walk.", "Cụm cố định là go for a walk / a run / a swim."),
      mc("q6", "m", "'I got an email from Sam.' Ở đây get nghĩa là gì?", ["nhận", "mua", "trở nên"], "nhận", "get-nghia", "Tôi nhận được email từ Sam.", "get + danh từ = nhận.", "Get an email nghĩa là nhận một email."),
      mc("q7", "m", "'It's getting cold.' Ở đây get nghĩa là gì?", ["trở nên", "nhận", "đến"], "trở nên", "get-nghia", "Trời đang lạnh dần.", "get + tính từ = trở nên.", "Cold là tính từ nên get nghĩa là trở nên."),
      mc("q8", "m", "What time did you get ___ last night?", ["home", "to home", "at home"], "home", "get-vitri", "Tối qua bạn về đến nhà lúc mấy giờ?", "get home (không to).", "Với home, here, there ta bỏ to: get home."),
      mc("q9", "m", "We got ___ the bus outside the hotel.", ["on", "in", "at"], "on", "get-vitri", "Chúng tôi lên xe buýt ở trước khách sạn.", "xe buýt: get on.", "Với xe buýt, tàu, máy bay dùng get on (lên) và get off (xuống)."),
      mc("q10", "m", "Kate got ___ the car and drove away.", ["in", "on", "at"], "in", "get-vitri", "Kate lên xe rồi lái đi.", "xe hơi: get in.", "Với xe hơi và taxi dùng get in và get out of."),
      mc("q11", "h", "We didn't have a map, so we got ___.", ["lost", "lose", "losing"], "lost", "get-nghia", "Chúng tôi không có bản đồ nên bị lạc.", "get lost = bị lạc.", "Get lost là cụm cố định dùng tính từ lost."),
      mc("q12", "h", "What time did you get ___ the hotel?", ["to", "at", "in"], "to", "get-vitri", "Bạn đến khách sạn lúc mấy giờ?", "get to + nơi chốn.", "Get to + nơi chốn nghĩa là đến nơi đó."),
      mc("q13", "h", "Nicola and Frank are getting ___ soon.", ["married", "marry", "marriage"], "married", "get-nghia", "Nicola và Frank sắp kết hôn.", "get married.", "Cụm cố định là get married (kết hôn)."),
      fl("q14", "h", "I got up and got ___ quickly. (mặc quần áo)", ["dressed"], "get-nghia", "Tôi dậy và mặc quần áo nhanh.", "get dressed.", "Get dressed nghĩa là mặc quần áo."),
      mc("q15", "h", "Câu nào đúng?", ["I arrived at the station.", "I arrived to the station.", "I arrived the station."], "I arrived at the station.", "get-vitri", "Tôi đến nhà ga.", "arrive at + nơi chốn.", "Arrive đi với at (nơi chốn nhỏ) hoặc in (thành phố, nước), không đi với to.")
    ]
  });

  window.GRAMMAR.push({
    id: "do-make-have", cefr: "A2",
    title: "do, make và have",
    summary: "Chọn đúng giữa do và make, và các cụm have (have breakfast, have a shower).",
    formula: "do + việc chung · make + tạo ra · have + ăn uống, hoạt động",
    see: ["there-is", "present-simple"],
    selfWrite: [
      ["Viết một câu về việc nhà bạn làm mỗi tuần (do the washing / do housework).", "I do the shopping every Sunday."],
      ["Viết một câu dùng have với bữa ăn hoặc hoạt động (have breakfast / have a nice time).", "I usually have breakfast at seven."]
    ],
    sections: [
      {
        heading: "1. do và make",
        body: "Do dùng cho hành động nói chung: What are you doing? What do you do? (nghề gì). Make dùng khi tạo ra, sản xuất thứ gì đó: make coffee, make a cake, make clothes. Hãy học theo cụm. Do: do homework, do housework, do an exam / a test, do a course, do a favour, do the shopping, do the washing, do the cooking. Make: make a mistake, make an appointment, make a phone call, make a list, make a noise, make a bed.",
        table: [
          ["do", "make"],
          ["do homework", "make a mistake"],
          ["do housework", "make an appointment"],
          ["do an exam", "make a phone call"],
          ["do a favour", "make a list"],
          ["do the shopping", "make a noise"]
        ],
        examples: [
          { en: "Sue, could you do me a favour?", vi: "Sue, bạn giúp tôi một việc được không?" },
          { en: "I'm sorry, I made a mistake.", vi: "Xin lỗi, tôi đã nhầm." },
          { en: "She's making coffee.", vi: "Cô ấy đang pha cà phê." }
        ]
      },
      {
        heading: "2. have và have got (sở hữu)",
        body: "Có thể nói I have a car hoặc I've got a car, đều nghĩa là tôi có xe. Cũng vậy với bệnh: I have a headache = I've got a headache. Quá khứ chỉ dùng had (không có got): She had short hair. Phủ định và nghi vấn quá khứ dùng did: He didn't have any money. Did you have enough time?",
        examples: [
          { en: "Do they have any children? / Have they got any children?", vi: "Họ có con không?" },
          { en: "She had short hair when I first met her.", vi: "Hồi tôi mới gặp, cô ấy để tóc ngắn." },
          { en: "He didn't have any money.", vi: "Anh ấy không có đồng nào." }
        ]
      },
      {
        heading: "3. have = ăn, uống, làm một hoạt động",
        body: "Khi have có nghĩa là ăn, uống hay làm một hoạt động thì KHÔNG dùng have got. Ăn uống: have breakfast / lunch / dinner / a sandwich / a cup of coffee. Hoạt động: have a shower, a bath, a rest, a holiday, a party, a nice time, a walk, a swim, a look, a baby. So sánh: I have a new shower (sở hữu; có thể dùng I've got) khác với I have a shower every morning (hành động, không dùng I've got).",
        examples: [
          { en: "I don't usually have breakfast.", vi: "Tôi thường không ăn sáng." },
          { en: "Did you have a good time in Tokyo?", vi: "Bạn có vui ở Tokyo không?" },
          { en: "Can I have a look at your magazine?", vi: "Cho tôi xem tạp chí của bạn một chút được không?" }
        ]
      }
    ],
    walk: [
      w("What do you do?", "Bạn làm nghề gì?", "What do you do? hỏi nghề nghiệp; do là động từ chính."),
      w("I made a cake yesterday.", "Hôm qua tôi làm một cái bánh.", "Make = tạo ra thứ gì đó."),
      w("I have a shower every morning.", "Mỗi sáng tôi tắm.", "Have a shower là hành động nên không dùng have got.")
    ],
    mistakes: [
      x("I made my homework.", "I did my homework.", "Homework đi với do."),
      x("I do a mistake.", "I made a mistake.", "Mistake đi với make."),
      x("I've got a shower every morning.", "I have a shower every morning.", "Have a shower là hành động nên không dùng have got.")
    ],
    check: [
      "Việc đó tạo ra thứ gì không? || Có (cake, coffee, clothes) → make. Việc chung hoặc cụm cố định (homework, favour) → do.",
      "Nhớ theo cụm cố định? || do homework / housework / a favour / an exam; make a mistake / a phone call / an appointment / a noise.",
      "have có nghĩa là có hay ăn / uống / làm? || Có thể dùng have got khi nghĩa là có. Ăn, uống, hoạt động thì không dùng have got.",
      "Câu ở quá khứ? || had, didn't have, Did you have...?"
    ],
    questions: [
      mc("q1", "e", "What are you ___ this evening?", ["doing", "making", "having"], "doing", "dmh-do-make", "Tối nay bạn làm gì?", "What are you doing? hỏi việc chung.", "Hỏi kế hoạch hoặc hành động chung dùng do: What are you doing?"),
      mc("q2", "e", "She is ___ coffee in the kitchen.", ["making", "doing", "having"], "making", "dmh-do-make", "Cô ấy đang pha cà phê trong bếp.", "make coffee.", "Make dùng khi tạo ra món gì đó, như pha cà phê."),
      mc("q3", "e", "Sorry, I ___ a mistake.", ["made", "did", "had"], "made", "dmh-do-make", "Xin lỗi, tôi nhầm.", "make a mistake.", "Cụm cố định là make a mistake."),
      mc("q4", "e", "I have a ___ every morning. (tắm)", ["shower", "homework", "mistake"], "shower", "dmh-have", "Mỗi sáng tôi tắm.", "have a shower.", "Have a shower nghĩa là tắm vòi sen."),
      mc("q5", "e", "I don't usually ___ breakfast.", ["have", "do", "make"], "have", "dmh-have", "Tôi thường không ăn sáng.", "have breakfast.", "Bữa ăn dùng have: have breakfast, lunch, dinner."),
      mc("q6", "m", "Can you ___ me a favour?", ["do", "make", "have"], "do", "dmh-do-make", "Bạn giúp tôi một việc được không?", "do somebody a favour.", "Cụm cố định là do somebody a favour."),
      mc("q7", "m", "Excuse me, I have to ___ a phone call.", ["make", "do", "take"], "make", "dmh-do-make", "Xin lỗi, tôi cần gọi một cuộc điện thoại.", "make a phone call.", "Cụm cố định là make a phone call."),
      mc("q8", "m", "Our children ___ a lot of homework.", ["do", "make", "have"], "do", "dmh-do-make", "Bọn trẻ nhà tôi phải làm rất nhiều bài tập.", "do homework.", "Homework đi với do (do homework). Chủ ngữ our children là số nhiều nên dùng do, không thêm -es."),
      mc("q9", "m", "Don't ___ a noise. The baby is asleep.", ["make", "do", "have"], "make", "dmh-do-make", "Đừng làm ồn. Em bé đang ngủ.", "make a noise.", "Cụm cố định là make a noise."),
      mc("q10", "m", "I need to ___ an appointment to see the doctor.", ["make", "do", "have"], "make", "dmh-do-make", "Tôi cần đặt lịch hẹn khám bác sĩ.", "make an appointment.", "Cụm cố định là make an appointment."),
      mc("q11", "h", "Câu nào đúng?", ["I have a shower every morning.", "I've got a shower every morning.", "I do a shower every morning."], "I have a shower every morning.", "dmh-have", "Mỗi sáng tôi tắm.", "Hành động: dùng have, không have got.", "Have a shower là hành động tắm nên không dùng have got và cũng không dùng do."),
      mc("q12", "h", "'What do you do?' hỏi điều gì?", ["Nghề nghiệp của bạn", "Bạn đang ăn gì", "Bạn có gì"], "Nghề nghiệp của bạn", "dmh-do-make", "What do you do? = Bạn làm nghề gì?", "What do you do? = nghề gì.", "Câu hỏi này dùng để hỏi công việc, nghề nghiệp."),
      mc("q13", "h", "When I first met Sue, she ___ short hair.", ["had", "had got", "has"], "had", "dmh-have", "Hồi tôi mới gặp, Sue để tóc ngắn.", "Quá khứ: had (không got).", "Ở quá khứ chỉ dùng had, không dùng had got với nghĩa sở hữu."),
      mc("q14", "h", "Câu nào đúng?", ["When was this photo taken?", "When was this photo made?", "When was this photo done?"], "When was this photo taken?", "dmh-do-make", "Bức ảnh này chụp khi nào?", "take a photo / a picture.", "Ảnh dùng take (take a photo), còn phim dùng make (make a film)."),
      mc("q15", "h", "Did you ___ a good time in Tokyo?", ["have", "do", "make"], "have", "dmh-have", "Bạn có vui ở Tokyo không?", "have a good time.", "Have a good time (vui vẻ) là cụm cố định với have.")
    ]
  });

  window.GRAMMAR.push({
    id: "reflexive-pronouns", cefr: "A2",
    title: "Đại từ phản thân: myself, himself, themselves và each other",
    summary: "Khi chủ ngữ và tân ngữ là cùng một người: I looked at myself.",
    formula: "I → myself · he → himself · they → themselves · each other = nhau",
    see: ["pronouns", "present-simple"],
    selfWrite: [
      ["Viết một câu về điều bạn làm một mình (by myself).", "I often go to the cinema by myself."],
      ["Viết một câu nói về hai người bạn quen nhau (each other).", "My two best friends know each other very well."]
    ],
    sections: [
      {
        heading: "1. Các đại từ phản thân",
        body: "Dùng khi chủ ngữ và tân ngữ là cùng một người: I looked at myself in the mirror. Hình thức: myself, yourself (một người), himself, herself, itself, ourselves, yourselves (nhiều người), themselves. Chú ý -self (số ít) và -selves (số nhiều).",
        table: [
          ["Chủ ngữ", "Tân ngữ thường", "Phản thân"],
          ["I", "me", "myself"],
          ["he", "him", "himself"],
          ["she", "her", "herself"],
          ["we", "us", "ourselves"],
          ["you", "you", "yourself / yourselves"],
          ["they", "them", "themselves"]
        ],
        examples: [
          { en: "He cut himself with a knife.", vi: "Anh ấy bị dao cắt vào tay." },
          { en: "We enjoyed ourselves at the party.", vi: "Chúng tôi đã vui ở bữa tiệc." },
          { en: "Please help yourself!", vi: "Cứ tự nhiên nhé!" }
        ]
      },
      {
        heading: "2. Khi nào dùng me / him / them thay vì myself",
        body: "Nếu tân ngữ là người khác với chủ ngữ thì dùng me, him, them: She is looking at him (hai người). Nếu cùng một người mới dùng himself: He is looking at himself (nhìn chính mình). By myself / by yourself... nghĩa là một mình: I went on holiday by myself (= alone).",
        examples: [
          { en: "You never talk to me.", vi: "Bạn chẳng bao giờ nói chuyện với tôi. (hai người khác nhau)" },
          { en: "Sometimes I talk to myself.", vi: "Đôi khi tôi tự nói chuyện một mình." },
          { en: "She was by herself.", vi: "Cô ấy ở một mình." }
        ]
      },
      {
        heading: "3. each other",
        body: "Each other nghĩa là nhau (người này làm với người kia và ngược lại): Kate and Helen know each other well. So sánh: James and Sue looked at each other (anh ấy nhìn cô ấy, cô ấy nhìn anh ấy), còn James and Sue looked at themselves (mỗi người nhìn chính mình).",
        examples: [
          { en: "Paul and I live near each other.", vi: "Paul và tôi sống gần nhau." },
          { en: "They love each other.", vi: "Họ yêu nhau." }
        ]
      }
    ],
    walk: [
      w("She fell off her bike, but she didn't hurt herself.", "Cô ấy ngã xe nhưng không bị thương.", "Chủ ngữ và tân ngữ cùng là cô ấy nên dùng herself."),
      w("Please help yourselves.", "Mời các bạn cứ tự nhiên.", "Nói với nhiều người nên dùng yourselves."),
      w("They know each other well.", "Họ biết rõ nhau.", "Each other = người này với người kia.")
    ],
    mistakes: [
      x("I looked at me in the mirror.", "I looked at myself in the mirror.", "Cùng một người nên dùng myself."),
      x("They enjoyed theirselves.", "They enjoyed themselves.", "Dạng đúng là themselves."),
      x("Kate and Helen know themselves well. (biết nhau)", "Kate and Helen know each other well.", "Ý nghĩa nhau thì dùng each other.")
    ],
    check: [
      "Chủ ngữ và tân ngữ là cùng một người không? || Cùng người → myself, himself... Khác người → me, him...",
      "Một người hay nhiều người? || -self cho một người (yourself), -selves cho nhiều người (yourselves, ourselves, themselves).",
      "Ý nghĩa là nhau? || Dùng each other.",
      "Ý là một mình? || by myself / by yourself / by herself."
    ],
    questions: [
      mc("q1", "e", "I looked at ___ in the mirror.", ["myself", "me", "I"], "myself", "phan-than", "Tôi nhìn mình trong gương.", "Cùng một người: myself.", "Người nhìn và người bị nhìn là cùng một người nên dùng myself."),
      mc("q2", "e", "He cut ___ with a knife.", ["himself", "him", "he"], "himself", "phan-than", "Anh ấy bị dao cắt vào tay.", "himself.", "Chủ ngữ và tân ngữ là cùng một người nên dùng himself."),
      mc("q3", "e", "She didn't hurt ___.", ["herself", "her", "she"], "herself", "phan-than", "Cô ấy không bị thương.", "herself.", "Cô ấy tự làm mình đau nên dùng herself."),
      mc("q4", "e", "We enjoyed ___ at the party.", ["ourselves", "us", "we"], "ourselves", "phan-than", "Chúng tôi đã vui ở bữa tiệc.", "enjoy ourselves.", "Enjoy ourselves nghĩa là vui vẻ."),
      mc("q5", "e", "They're enjoying ___.", ["themselves", "them", "theirselves"], "themselves", "phan-than", "Họ đang vui vẻ.", "themselves.", "Dạng đúng là themselves, không có theirselves."),
      mc("q6", "m", "Please help ___! (nói với một người)", ["yourself", "yourselves", "you"], "yourself", "phan-than", "Mời bạn cứ tự nhiên!", "Một người: yourself.", "Nói với một người dùng yourself, nhiều người dùng yourselves."),
      mc("q7", "m", "Please help ___! (nói với nhiều người)", ["yourselves", "yourself", "yours"], "yourselves", "phan-than", "Mời các bạn cứ tự nhiên!", "Nhiều người: yourselves.", "Nói với nhiều người dùng yourselves."),
      mc("q8", "m", "I went on holiday ___. (một mình)", ["by myself", "for myself", "with me"], "by myself", "phan-than-each", "Tôi đi nghỉ một mình.", "by myself = một mình.", "By myself nghĩa là một mình (không có ai đi cùng)."),
      mc("q9", "m", "Kate and Helen know ___ well.", ["each other", "themselves", "them"], "each other", "phan-than-each", "Kate và Helen biết rõ nhau.", "each other = nhau.", "Hai người biết nhau (người này biết người kia) nên dùng each other."),
      mc("q10", "m", "You never talk to ___.", ["me", "myself", "I"], "me", "phan-than", "Bạn chẳng bao giờ nói chuyện với tôi.", "Hai người khác nhau: me.", "Người nói là you, người nghe là I (me), hai người khác nhau nên dùng me."),
      mc("q11", "h", "James and Sue looked at ___. (anh nhìn cô, cô nhìn anh)", ["each other", "themselves", "them"], "each other", "phan-than-each", "James và Sue nhìn nhau.", "Nhìn nhau: each other.", "Mỗi người nhìn người kia nên dùng each other."),
      mc("q12", "h", "James and Sue looked at ___. (mỗi người nhìn chính mình)", ["themselves", "each other", "them"], "themselves", "phan-than-each", "James và Sue nhìn chính họ (trong gương).", "Mỗi người nhìn mình: themselves.", "Mỗi người nhìn chính mình nên dùng themselves."),
      mc("q13", "h", "Câu nào đúng?", ["Be careful. Don't hurt yourself.", "Be careful. Don't hurt you.", "Be careful. Don't hurt your."], "Be careful. Don't hurt yourself.", "phan-than", "Cẩn thận. Đừng làm mình bị thương.", "yourself.", "Hurt yourself nghĩa là tự làm mình đau. Hurt you sẽ có nghĩa người khác làm bạn đau."),
      mc("q14", "h", "'Was she with friends?' 'No, she was by ___.'", ["herself", "her", "she"], "herself", "phan-than-each", "Cô ấy có đi cùng bạn không? — Không, cô ấy đi một mình.", "by herself = một mình.", "By + đại từ phản thân nghĩa là một mình."),
      mc("q15", "h", "Câu nào đúng?", ["I sometimes talk to myself.", "I sometimes talk to me.", "I sometimes talk to I."], "I sometimes talk to myself.", "phan-than", "Đôi khi tôi tự nói chuyện một mình.", "myself.", "Tôi nói với chính tôi nên dùng myself.")
    ]
  });
})();
