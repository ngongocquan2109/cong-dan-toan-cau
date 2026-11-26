/* Ngữ pháp bổ sung theo giáo trình Essential Grammar in Use (2/6): trả lời ngắn, câu hỏi các loại. Do AI viết lại theo cách dạy của app. */
(function () {
  var mc = function (id, lv, q, o, a, tag, vi, ex, deep) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: ex, tag: tag, vi: vi, deep: deep }; };
  var fl = function (id, lv, q, a, tag, vi, ex, deep) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: ex, tag: tag, vi: vi, deep: deep }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "tl-tro-dong-tu": "Trả lời ngắn với trợ động từ (Yes, I am)",
    "tl-hoi-lai": "Hỏi đáp lại (Oh, did you?)",
    "tl-too-either": "too, either, so do I, neither do I",
    "ch-dao-ngu": "Đảo trợ động từ trong câu hỏi",
    "ch-chu-tan": "Who / What làm chủ ngữ hay tân ngữ",
    "ch-gioi-tu": "Giới từ cuối câu hỏi, What ... like?",
    "tu-hoi-noun": "What / Which / Who",
    "tu-hoi-how": "How + tính từ, trạng từ",
    "tu-hoi-take": "How long does it take?",
    "gian-tiep-trat-tu": "Trật tự từ trong câu hỏi gián tiếp",
    "gian-tiep-if": "if / whether trong câu hỏi gián tiếp"
  });
  window.GRAMMAR = window.GRAMMAR || [];

  window.GRAMMAR.push({
    id: "short-answers", cefr: "A2",
    title: "Trả lời ngắn, hỏi đáp lại, too / either, so do I",
    summary: "Rút gọn câu bằng trợ động từ: Yes, I am. / So do I. / Oh, did you?",
    formula: "trợ động từ (am, do, have, can...) đứng một mình thay cho cả vế câu",
    see: ["to-be", "present-simple", "question-forms"],
    selfWrite: [
      ["Viết một câu có hai vế: một vế khẳng định, một vế phủ định, bằng trợ động từ (… but he is / … but I don't).", "I like coffee, but my sister doesn't."],
      ["Viết một câu đồng ý với bạn bè bằng So do I hoặc Neither do I.", "A: I love pizza. B: So do I."]
    ],
    sections: [
      {
        heading: "1. Trợ động từ thay cả vế câu",
        body: "Khi trả lời hoặc đối chiếu hai vế, ta không lặp lại động từ chính mà chỉ dùng trợ động từ: She isn't tired, but he is (= he is tired). Trợ động từ gồm am / is / are, was / were, have / has, do / does / did, can, will, might, must. Ở cuối câu phải dùng dạng đầy đủ (is, am, have), không dùng viết tắt ('s, 'm). Nhưng dạng phủ định viết tắt thì được: but Jane isn't. Present simple dùng do / does; past simple dùng did.",
        examples: [
          { en: "I haven't got a car, but my sister has.", vi: "Tôi không có xe, nhưng chị tôi thì có." },
          { en: "'Are you tired?' 'Yes, I am.' / 'No, I'm not.'", vi: "'Bạn mệt không?' 'Có.' / 'Không.'" },
          { en: "I don't like hot weather, but Sue does.", vi: "Tôi không thích trời nóng, nhưng Sue thì thích." }
        ]
      },
      {
        heading: "2. Hỏi đáp lại để tỏ ra quan tâm",
        body: "Khi ai nói gì và bạn muốn tỏ sự quan tâm hay ngạc nhiên, hãy hỏi lại bằng trợ động từ + chủ ngữ. Trợ động từ phải khớp với câu của người kia: câu có am / is / are thì hỏi Am I? / Is it?; câu có do / does thì hỏi Do you? / Does he?; quá khứ đơn thì Did you?. Câu khẳng định gặp câu hỏi phủ định hoặc ngược lại, ví dụ: Bill can't drive. — Can't he? Người ta cũng dùng cách này ở cuối câu thành câu hỏi đuôi (isn't it?, don't you?).",
        examples: [
          { en: "'I was ill last week.' 'Were you? I didn't know that.'", vi: "'Tuần trước tôi bị ốm.' 'Thật à? Tôi không biết đấy.'" },
          { en: "'I speak four languages.' 'Do you? Which ones?'", vi: "'Tôi nói được bốn thứ tiếng.' 'Thật sao? Những thứ nào?'" },
          { en: "'Ben doesn't eat meat.' 'Doesn't he? Does he eat fish?'", vi: "'Ben không ăn thịt.' 'Vậy à? Anh ấy có ăn cá không?'" }
        ]
      },
      {
        heading: "3. too, either, so am I, neither do I",
        body: "Too và either đứng cuối câu: too sau câu khẳng định, either sau câu phủ định. So + trợ động từ + chủ ngữ nghĩa là tôi cũng vậy (với câu khẳng định); neither / nor + trợ động từ + chủ ngữ nghĩa là tôi cũng không (với câu phủ định). Trợ động từ phải khớp với câu gốc. Nhớ: So am I, không nói So I am.",
        table: [
          ["Câu gốc", "Đồng ý bằng too / either", "Đồng ý bằng so / neither"],
          ["I'm happy.", "I'm happy too.", "So am I."],
          ["I'm not happy.", "I'm not happy either.", "Neither am I."],
          ["I work in a bank.", "I work in a bank too.", "So do I."],
          ["I can't cook.", "I can't cook either.", "Neither can I."]
        ],
        examples: [
          { en: "'I was late for work.' 'So was Sam.'", vi: "'Tôi đi làm trễ.' 'Sam cũng thế.'" },
          { en: "'I won't be here tomorrow.' 'Neither will I.'", vi: "'Mai tôi sẽ không có mặt.' 'Tôi cũng không.'" },
          { en: "'I never go to the cinema.' 'Neither do I.'", vi: "'Tôi chẳng bao giờ đi xem phim.' 'Tôi cũng vậy.'" }
        ]
      },
      {
        heading: "4. Bảng dạng phủ định rút gọn",
        body: "Câu phủ định dùng not (n't) sau trợ động từ. Một số dạng rút gọn cần nhớ: isn't, aren't, wasn't, weren't, haven't, hasn't, won't (will not), can't (cannot), couldn't, mustn't, shouldn't, wouldn't, don't, doesn't, didn't. Present simple phủ định dùng don't / doesn't + V; past simple dùng didn't + V.",
        examples: [
          { en: "I'm not tired. It isn't raining. They aren't here.", vi: "Tôi không mệt. Trời không mưa. Họ không có ở đây." },
          { en: "Chris doesn't go out very often.", vi: "Chris không hay ra ngoài." },
          { en: "I didn't watch TV yesterday.", vi: "Hôm qua tôi không xem TV." }
        ]
      }
    ],
    walk: [
      w("She isn't tired, but he is.", "Cô ấy không mệt, nhưng anh ấy thì có.", "He is = he is tired; không viết tắt he's ở cuối câu."),
      w("'I was ill.' 'Were you?'", "'Tôi bị ốm.' 'Thật à?'", "Câu gốc có was nên hỏi đáp lại bằng Were you?"),
      w("'I can't swim.' 'Neither can I.'", "'Tôi không biết bơi.' 'Tôi cũng không.'", "Câu gốc có can't nên đáp Neither can I (trợ động từ đứng trước chủ ngữ).")
    ],
    mistakes: [
      x("She isn't tired, but he's.", "She isn't tired, but he is.", "Ở cuối câu dùng dạng đầy đủ, không dùng viết tắt 's."),
      x("So I am.", "So am I.", "Trợ động từ đứng trước chủ ngữ sau so và neither."),
      x("I can't swim neither.", "I can't swim either. / Neither can I.", "Không dùng hai phủ định; neither phải đứng đầu câu, either đứng cuối.")
    ],
    check: [
      "Trợ động từ của câu gốc là gì? || Tìm am / is / are, was / were, have / has, do / does / did, can, will... rồi dùng lại đúng từ đó.",
      "Câu gốc khẳng định hay phủ định? || Khẳng định → too / so. Phủ định → either / neither.",
      "Chủ ngữ đứng ở đâu? || Sau so và neither, trợ động từ đứng trước chủ ngữ: So do I, Neither can I.",
      "Cuối câu có dùng viết tắt không? || Cuối câu dùng dạng đầy đủ: he is, I am, we have."
    ],
    questions: [
      mc("q1", "e", "'Are you tired?' 'Yes, I ___.'", ["am", "'m", "do"], "am", "tl-tro-dong-tu", "Bạn mệt không? — Có.", "Trả lời ngắn dùng am, không viết tắt.", "Câu trả lời ngắn dùng dạng đầy đủ am. Dạng 'm không đứng cuối câu."),
      mc("q2", "e", "'Is there a bus to the airport?' 'No, there ___.'", ["isn't", "aren't", "doesn't"], "isn't", "tl-tro-dong-tu", "Có xe buýt ra sân bay không? — Không có.", "Trợ động từ là is nên trả lời isn't.", "Câu hỏi bắt đầu bằng Is there nên câu trả lời ngắn dùng there isn't."),
      mc("q3", "e", "I'm happy. — I'm happy ___.", ["too", "either", "neither"], "too", "tl-too-either", "Tôi vui. — Tôi cũng vui.", "Câu khẳng định + too.", "Sau câu khẳng định, ta dùng too ở cuối câu để nói cũng vậy."),
      mc("q4", "e", "I'm not happy. — I'm not happy ___.", ["either", "too", "so"], "either", "tl-too-either", "Tôi không vui. — Tôi cũng không vui.", "Câu phủ định + either.", "Sau câu phủ định, dùng either ở cuối câu. Too chỉ dùng với câu khẳng định."),
      mc("q5", "e", "'Do you like tea?' 'Yes, I ___.'", ["do", "like", "am"], "do", "tl-tro-dong-tu", "Bạn có thích trà không? — Có.", "Trả lời với trợ động từ do.", "Câu hỏi dùng do nên câu trả lời dùng do: Yes, I do."),
      mc("q6", "m", "She isn't tired, but he ___.", ["is", "'s", "does"], "is", "tl-tro-dong-tu", "Cô ấy không mệt, nhưng anh ấy thì mệt.", "Cuối câu dùng is, không viết tắt.", "He is = he is tired. Ở cuối câu phải dùng dạng đầy đủ is."),
      mc("q7", "m", "I can't cook. — I can't ___.", ["either", "too", "neither"], "either", "tl-too-either", "Tôi không biết nấu ăn. — Tôi cũng không.", "Phủ định + either.", "Sau can't (phủ định) dùng either. Neither đứng ở đầu câu (Neither can I)."),
      mc("q8", "m", "'I'm working.' — 'So ___ I.'", ["am", "do", "have"], "am", "tl-too-either", "Tôi đang làm việc. — Tôi cũng vậy.", "Câu gốc có am: So am I.", "Trợ động từ trong câu gốc là am nên đáp So am I."),
      mc("q9", "m", "'I can't swim.' — 'Neither ___ I.'", ["can", "do", "am"], "can", "tl-too-either", "Tôi không biết bơi. — Tôi cũng không.", "Câu gốc có can't: Neither can I.", "Trợ động từ khớp với câu gốc (can't) nên dùng can sau neither."),
      mc("q10", "m", "'I was ill last week.' — '___? I didn't know that.'", ["Were you", "Did you", "Are you"], "Were you", "tl-hoi-lai", "Tuần trước tôi bị ốm. — Thật à? Tôi không biết.", "Câu gốc có was nên hỏi Were you?", "Hỏi đáp lại dùng trợ động từ của câu gốc. Câu gốc dùng was nên hỏi Were you?"),
      mc("q11", "h", "'Ben doesn't eat meat.' — '___ he? Does he eat fish?'", ["Doesn't", "Does", "Isn't"], "Doesn't", "tl-hoi-lai", "Ben không ăn thịt. — Vậy à? Anh ấy có ăn cá không?", "Câu gốc doesn't → hỏi lại Doesn't he?", "Để tỏ sự ngạc nhiên ta hỏi lại bằng cùng trợ động từ. Câu gốc dùng doesn't nên hỏi Doesn't he?"),
      mc("q12", "h", "'We went to the cinema last night.' — 'Did you? So ___ we.'", ["did", "do", "went"], "did", "tl-too-either", "Tối qua chúng tôi đi xem phim. — Thật à? Chúng tôi cũng thế.", "Quá khứ đơn → So did we.", "Câu gốc ở quá khứ đơn (went) nên dùng trợ động từ did: So did we."),
      mc("q13", "h", "'I'd like to go to Australia.' — 'So ___ I.'", ["would", "do", "am"], "would", "tl-too-either", "Tôi muốn đi Úc. — Tôi cũng vậy.", "I'd = I would nên đáp So would I.", "I'd like là I would like nên trợ động từ là would: So would I."),
      mc("q14", "h", "'I never go to the cinema.' — '___ do I.'", ["Neither", "So", "Either"], "Neither", "tl-too-either", "Tôi chưa bao giờ đi xem phim. — Tôi cũng không.", "Never là phủ định: Neither do I.", "Never mang nghĩa phủ định nên đáp Neither do I (= tôi cũng không)."),
      mc("q15", "h", "Câu nào đúng?", ["She isn't tired, but he is.", "She isn't tired, but he's.", "She isn't tired, but he be."], "She isn't tired, but he is.", "tl-tro-dong-tu", "Cô ấy không mệt, nhưng anh ấy mệt.", "Cuối câu dùng dạng đầy đủ.", "Khi trợ động từ đứng cuối câu, không được viết tắt. Dùng he is, không dùng he's.")
    ]
  });

  window.GRAMMAR.push({
    id: "question-forms", cefr: "A2",
    title: "Cấu trúc câu hỏi: đảo ngữ, Who saw you?, giới từ cuối câu",
    summary: "Đặt câu hỏi đúng trật tự, hỏi chủ ngữ hay tân ngữ, và What ... like?",
    formula: "(từ để hỏi) + trợ động từ + chủ ngữ + động từ chính",
    see: ["wh-questions", "short-answers", "indirect-questions"],
    selfWrite: [
      ["Viết một câu hỏi Who...? về điều gì đó đã xảy ra hôm qua (ai là chủ ngữ).", "Who called you yesterday?"],
      ["Viết một câu hỏi có giới từ ở cuối (Who ... with? / Where ... from?).", "Who are you going to the party with?"]
    ],
    sections: [
      {
        heading: "1. Trợ động từ đứng trước chủ ngữ",
        body: "Trong câu hỏi, động từ đầu tiên (am / is / are, have / has, can, will, do / does / did...) đứng trước chủ ngữ. Câu khẳng định: She was angry → Why was she angry? Khi động từ chính là hiện tại đơn hoặc quá khứ đơn thì mượn do / does / did: What time does she get up? Did they work hard? Phủ định: Why isn't he here? (không nói Why he isn't here).",
        table: [
          ["Câu khẳng định", "Câu hỏi"],
          ["That seat is free.", "Is that seat free?"],
          ["David has gone.", "Where has David gone?"],
          ["She gets up early.", "What time does she get up?"],
          ["You had dinner.", "What did you have for dinner?"]
        ],
        examples: [
          { en: "Where has David gone?", vi: "David đã đi đâu rồi?" },
          { en: "How often do you watch television?", vi: "Bạn xem TV bao lâu một lần?" },
          { en: "Why can't Paula come to the meeting?", vi: "Vì sao Paula không đến họp được?" }
        ]
      },
      {
        heading: "2. Who / What là chủ ngữ hay tân ngữ",
        body: "Nếu who / what là chủ ngữ (người hay vật làm hành động), ta KHÔNG mượn do / did: Who saw Paul? (Silvia saw Paul). Nếu who / what là tân ngữ (người hay vật nhận hành động), ta mượn do / did như thường: Who did Silvia see? (Silvia saw Paul). Dùng who hỏi người, what hỏi vật hoặc ý tưởng.",
        examples: [
          { en: "Who lives in this house?", vi: "Ai sống trong ngôi nhà này?" },
          { en: "What happened?", vi: "Chuyện gì đã xảy ra?" },
          { en: "Who did you meet yesterday?", vi: "Hôm qua bạn đã gặp ai?" }
        ]
      },
      {
        heading: "3. Giới từ cuối câu và What ... like?",
        body: "Trong câu hỏi bắt đầu bằng Who / What / Where / Which, giới từ (to, from, with, about...) thường đứng cuối câu: Where are you from? Who is she talking to? What are you afraid of? Cũng có cấu trúc What is it like? = nó như thế nào (hỏi để biết đặc điểm); ở đây like là giới từ, không phải động từ thích. What was the weather like? = thời tiết thế nào.",
        examples: [
          { en: "Where are you from?", vi: "Bạn đến từ đâu?" },
          { en: "Who do these books belong to?", vi: "Những quyển sách này của ai?" },
          { en: "What's your new teacher like?", vi: "Giáo viên mới của bạn như thế nào?" }
        ]
      }
    ],
    walk: [
      w("Who saw Paul?", "Ai đã thấy Paul?", "Who là chủ ngữ của saw, nên không mượn did."),
      w("Who did Silvia see?", "Silvia đã thấy ai?", "Who là tân ngữ (Silvia là chủ ngữ), nên mượn did."),
      w("What's it like?", "Nó như thế nào?", "Like là giới từ: hỏi đặc điểm, không hỏi sở thích.")
    ],
    mistakes: [
      x("Why he isn't here?", "Why isn't he here?", "Trợ động từ đứng trước chủ ngữ ngay cả trong câu phủ định."),
      x("Who did see you?", "Who saw you?", "Who làm chủ ngữ thì không dùng did."),
      x("Where are you from it?", "Where are you from?", "Giới từ đứng cuối, không thêm đại từ phía sau.")
    ],
    check: [
      "Có trợ động từ chưa? || Hiện tại đơn dùng do / does, quá khứ đơn dùng did, thì khác thì đã có trợ động từ (is, has, can...).",
      "Who / What làm chủ ngữ hay tân ngữ? || Nếu ngay sau who / what là động từ → chủ ngữ, không mượn do. Nếu ngay sau là chủ ngữ khác → tân ngữ, cần mượn do.",
      "Giới từ đặt ở đâu? || Thường ở cuối câu hỏi: Who with? What about?",
      "Hỏi đặc điểm hay hỏi sở thích? || What is it like? hỏi đặc điểm. Do you like it? hỏi bạn có thích."
    ],
    questions: [
      mc("q1", "e", "Where ___ David gone?", ["has", "is", "does"], "has", "ch-dao-ngu", "David đã đi đâu rồi?", "Gone là V3 nên dùng has.", "Câu hỏi hiện tại hoàn thành: Where has David gone? Has đứng trước chủ ngữ David."),
      mc("q2", "e", "___ you have a car?", ["Do", "Are", "Does"], "Do", "ch-dao-ngu", "Bạn có xe hơi không?", "Hiện tại đơn: Do you...?", "Với chủ ngữ you, câu hỏi hiện tại đơn mượn do."),
      mc("q3", "e", "What time ___ she get up?", ["does", "do", "is"], "does", "ch-dao-ngu", "Cô ấy dậy lúc mấy giờ?", "She → does.", "Chủ ngữ she là ngôi thứ ba số ít nên mượn does."),
      mc("q4", "e", "___ they here yesterday?", ["Were", "Did", "Are"], "Were", "ch-dao-ngu", "Hôm qua họ có ở đây không?", "To be quá khứ: Were they...?", "To be tự làm trợ động từ nên đảo were lên đầu, không mượn did."),
      mc("q5", "e", "Where ___ Paula work?", ["does", "do", "is"], "does", "ch-dao-ngu", "Paula làm việc ở đâu?", "Paula → does.", "Paula là ngôi thứ ba số ít nên dùng does."),
      mc("q6", "m", "Who ___ in this house? (có người sống trong nhà)", ["lives", "does live", "is live"], "lives", "ch-chu-tan", "Ai sống trong ngôi nhà này?", "Who làm chủ ngữ: không mượn do.", "Who là chủ ngữ của lives, nên động từ đi ngay sau who và không mượn does."),
      mc("q7", "m", "What ___ yesterday? (có việc xảy ra)", ["happened", "did happen", "did happened"], "happened", "ch-chu-tan", "Hôm qua đã xảy ra chuyện gì?", "What làm chủ ngữ: happened.", "What là chủ ngữ nên không mượn did. Câu đúng là What happened?"),
      mc("q8", "m", "Who ___ you meet yesterday?", ["did", "do", "does"], "did", "ch-chu-tan", "Hôm qua bạn đã gặp ai?", "Who là tân ngữ: mượn did.", "You là chủ ngữ, who là tân ngữ nên cần mượn did. Hôm qua là quá khứ nên dùng did."),
      fl("q9", "m", "'Where are you ___?' 'I'm from Thailand.'", "from", "ch-gioi-tu", "Bạn đến từ đâu? — Tôi đến từ Thái Lan.", "Giới từ from đứng cuối câu hỏi.", "Giới từ đi với động từ hoặc tính từ thường nằm cuối câu hỏi: Where are you from?"),
      fl("q10", "m", "Who is she talking ___?", "to", "ch-gioi-tu", "Cô ấy đang nói chuyện với ai?", "talk to somebody: giới từ to đứng cuối.", "Talk đi với giới từ to. Trong câu hỏi giới từ nằm cuối: Who is she talking to?"),
      mc("q11", "h", "Câu nào đúng?", ["Why isn't he here?", "Why he isn't here?", "Why isn't here he?"], "Why isn't he here?", "ch-dao-ngu", "Sao anh ấy không có ở đây?", "Trợ động từ đứng trước chủ ngữ.", "Isn't đứng trước he. Thứ tự là từ để hỏi + trợ động từ + chủ ngữ."),
      mc("q12", "h", "'Silvia saw Paul.' → Hỏi 'Ai đã thấy Paul?'", ["Who saw Paul?", "Who did see Paul?", "Who Paul saw?"], "Who saw Paul?", "ch-chu-tan", "Ai đã thấy Paul?", "Who là chủ ngữ: Who saw...", "Cần hỏi người làm hành động (chủ ngữ) nên who đứng ngay trước động từ, không mượn did."),
      mc("q13", "h", "'There's a new restaurant.' — 'What's it ___?'", ["like", "liking", "likes"], "like", "ch-gioi-tu", "Có một nhà hàng mới. — Nó như thế nào?", "What's it like? = nó thế nào.", "Cấu trúc What is it like? hỏi về đặc điểm, trong đó like là giới từ."),
      mc("q14", "h", "'What does your brother do?' hỏi điều gì?", ["Nghề nghiệp của anh ấy", "Sở thích của anh ấy", "Anh ấy thích gì"], "Nghề nghiệp của anh ấy", "ch-gioi-tu", "What does your brother do? = Anh trai bạn làm nghề gì?", "What do you do? = hỏi nghề nghiệp.", "What do you do? là cách hỏi nghề nghiệp. Hỏi sở thích dùng What do you like to do?"),
      mc("q15", "h", "Câu nào đúng?", ["What was Silvia wearing?", "What was wearing Silvia?", "What did Silvia wearing?"], "What was Silvia wearing?", "ch-dao-ngu", "Silvia đang mặc gì?", "What + was + chủ ngữ + V-ing.", "Was đứng trước chủ ngữ Silvia, theo sau là wearing. Câu ba sai vì did không đi với V-ing.")
    ]
  });

  window.GRAMMAR.push({
    id: "question-words-more", cefr: "A2",
    title: "What, Which, How và How long does it take?",
    summary: "Chọn đúng từ để hỏi: what + danh từ, which, how + tính từ, thời gian mất bao lâu.",
    formula: "What / Which + danh từ · How + tính từ · How long does it take (to V)?",
    see: ["wh-questions", "question-forms"],
    selfWrite: [
      ["Hỏi bạn của bạn một câu bắt đầu bằng How (how old, how far, how often).", "How often do you go to the gym?"],
      ["Viết một câu nói về thời gian đi từ nhà bạn đến nơi làm việc, dùng It takes.", "It takes me thirty minutes to get to work."]
    ],
    sections: [
      {
        heading: "1. What + danh từ, Which và Who",
        body: "What + danh từ hỏi thông tin chung: What colour is your car? What time is it? What kind of job do you want? Which dùng khi có ít lựa chọn đã biết (hai, ba, bốn): Which train did you catch, the 9.50 or the 10.30? Who hỏi người khi không có danh từ theo sau: Who is taller, Joe or Gary? (không nói Which is taller khi so sánh người). What dùng cho phạm vi rộng, Which dùng cho phạm vi hẹp.",
        examples: [
          { en: "What colour are his eyes?", vi: "Mắt anh ấy màu gì?" },
          { en: "Which hotel did you stay at, the Ritz or the Hilton?", vi: "Bạn ở khách sạn nào, Ritz hay Hilton?" },
          { en: "Who is taller, Joe or Gary?", vi: "Ai cao hơn, Joe hay Gary?" }
        ]
      },
      {
        heading: "2. How + tính từ hoặc trạng từ",
        body: "How đứng trước tính từ hoặc trạng từ để hỏi mức độ: how old (tuổi), how tall (chiều cao), how far (khoảng cách), how often (tần suất), how long (bao lâu), how much / how many (bao nhiêu). How đứng một mình hỏi cách thức hoặc cảm nhận: How was the party? How do you go to work?",
        examples: [
          { en: "How old is your mother?", vi: "Mẹ bạn bao nhiêu tuổi?" },
          { en: "How far is it from here to the airport?", vi: "Từ đây đến sân bay bao xa?" },
          { en: "How often do you use your car?", vi: "Bạn dùng xe bao lâu một lần?" }
        ]
      },
      {
        heading: "3. How long does it take?",
        body: "Hỏi thời gian cần cho một việc: How long does it take to + V? Trả lời: It takes + thời gian (+ to + V). Nếu cần nói ai làm: It takes + người + thời gian + to V. Quá khứ: It took me three days to read the book. Tương lai: It will take an hour. Phủ định: It doesn't take long.",
        examples: [
          { en: "How long does it take to cross the Atlantic by ship?", vi: "Vượt Đại Tây Dương bằng tàu mất bao lâu?" },
          { en: "It took me three days to read the book.", vi: "Tôi mất ba ngày để đọc xong quyển sách." },
          { en: "It doesn't take long to cook an omelette.", vi: "Làm món trứng ốp-lết không mất nhiều thời gian." }
        ]
      }
    ],
    walk: [
      w("Which train did you catch, the 9.50 or the 10.30?", "Bạn bắt chuyến tàu nào, 9 giờ 50 hay 10 giờ 30?", "Chỉ có hai lựa chọn nên dùng which."),
      w("How far is it from here to the station?", "Từ đây đến nhà ga bao xa?", "How far hỏi khoảng cách."),
      w("It takes Tom 20 minutes to get to work.", "Tom mất 20 phút để đến chỗ làm.", "It takes + người + thời gian + to V.")
    ],
    mistakes: [
      x("Which colour are his eyes?", "What colour are his eyes?", "Màu mắt không có danh sách lựa chọn cụ thể nên dùng what."),
      x("Which is taller, Joe or Gary?", "Who is taller, Joe or Gary?", "Hỏi người, không có danh từ theo sau thì dùng who."),
      x("It took to me three days to read it.", "It took me three days to read it.", "Sau take không dùng to trước người.")
    ],
    check: [
      "Có ít lựa chọn đã biết không? || Có (hai đến bốn) → Which. Không có hoặc rộng → What.",
      "Hỏi người hay vật? || Không có danh từ: người → Who, vật đã biết → Which.",
      "Từ how đi với từ nào? || How old / tall / far / often / long / much / many.",
      "Hỏi thời gian mất bao lâu? || How long does it take (to...)? Trả lời: It takes + thời gian."
    ],
    questions: [
      mc("q1", "e", "___ colour is your car?", ["What", "Which", "Who"], "What", "tu-hoi-noun", "Xe của bạn màu gì?", "What + colour.", "Hỏi màu sắc dùng What colour. Which chỉ dùng khi có vài lựa chọn cho sẵn."),
      mc("q2", "e", "___ is taller, Joe or Gary?", ["Who", "Which", "What"], "Who", "tu-hoi-noun", "Joe hay Gary cao hơn?", "Hỏi người không có danh từ: who.", "Khi hỏi người mà không có danh từ theo sau, dùng who."),
      mc("q3", "e", "___ old is your mother?", ["How", "What", "Which"], "How", "tu-hoi-how", "Mẹ bạn bao nhiêu tuổi?", "How old = bao nhiêu tuổi.", "How đi với tính từ old để hỏi tuổi."),
      mc("q4", "e", "How ___ do you use your car? (tần suất)", ["often", "long", "far"], "often", "tu-hoi-how", "Bạn dùng xe bao lâu một lần?", "How often = bao lâu một lần.", "How often hỏi tần suất. How long hỏi khoảng thời gian, how far hỏi khoảng cách."),
      mc("q5", "e", "___ time is it?", ["What", "Which", "How"], "What", "tu-hoi-noun", "Mấy giờ rồi?", "What time...?", "Hỏi giờ dùng What time. Which không dùng vì không có lựa chọn cho sẵn."),
      mc("q6", "m", "___ train did you catch, the 9.50 or the 10.30?", ["Which", "What", "How"], "Which", "tu-hoi-noun", "Bạn bắt chuyến tàu nào, 9 giờ 50 hay 10 giờ 30?", "Có hai lựa chọn: which.", "Có hai chuyến tàu để chọn nên dùng Which train."),
      mc("q7", "m", "How ___ is it from here to the airport? (khoảng cách)", ["far", "long", "much"], "far", "tu-hoi-how", "Từ đây đến sân bay bao xa?", "How far = khoảng cách.", "Hỏi khoảng cách dùng how far."),
      mc("q8", "m", "How ___ does it take to get there? 'Two hours.'", ["long", "far", "old"], "long", "tu-hoi-take", "Đến đó mất bao lâu? — Hai giờ.", "How long does it take = mất bao lâu.", "Hỏi thời gian cần cho một hành trình dùng How long does it take."),
      mc("q9", "m", "It ___ me three days to read the book.", ["took", "spent", "needed"], "took", "tu-hoi-take", "Tôi mất ba ngày để đọc quyển sách.", "It took me + thời gian + to V.", "Cấu trúc đúng là It took + người + thời gian + to + động từ. Spent đi với chủ ngữ là người (I spent three days reading)."),
      mc("q10", "m", "How much ___ the meal? 'Thirty pounds.'", ["was", "did", "has"], "was", "tu-hoi-how", "Bữa ăn giá bao nhiêu? — Ba mươi bảng.", "How much + was + danh từ.", "Meal là chủ ngữ số ít ở quá khứ nên dùng was."),
      mc("q11", "h", "Câu nào đúng?", ["How long does it take to learn a language?", "How long it takes to learn a language?", "How long does it takes to learn?"], "How long does it take to learn a language?", "tu-hoi-take", "Học một ngôn ngữ mất bao lâu?", "Does + it + take (V1).", "Sau does dùng động từ nguyên mẫu take, không thêm -s. Cần có does ở đầu câu hỏi."),
      fl("q12", "h", "It takes a long time ___ a language. (learn)", ["to learn"], "tu-hoi-take", "Học một ngôn ngữ mất nhiều thời gian.", "It takes + thời gian + to V.", "Sau cụm thời gian của takes ta dùng to + động từ nguyên mẫu: to learn."),
      mc("q13", "h", "___ sort of music do you like?", ["What", "Which", "Who"], "What", "tu-hoi-noun", "Bạn thích loại nhạc nào?", "What sort of... = thể loại gì.", "Hỏi thể loại trong phạm vi rộng dùng What sort of / kind of."),
      mc("q14", "h", "Câu nào đúng?", ["It took Tom 20 minutes to get to work.", "It took to Tom 20 minutes get to work.", "Tom took 20 minutes to get to work it."], "It took Tom 20 minutes to get to work.", "tu-hoi-take", "Tom mất 20 phút để đến chỗ làm.", "It took + người + thời gian + to V.", "Cấu trúc chuẩn là It took Tom 20 minutes to get to work. Hai câu còn lại sai trật tự."),
      mc("q15", "h", "'There are four umbrellas here. ___ is yours?'", ["Which", "What", "Who"], "Which", "tu-hoi-noun", "Có bốn cây ô ở đây. Cây nào là của bạn?", "Ít lựa chọn đã biết: which.", "Chỉ có bốn cây ô để chọn nên dùng which, không dùng what.")
    ]
  });

  window.GRAMMAR.push({
    id: "indirect-questions", cefr: "B1",
    title: "Câu hỏi gián tiếp: Do you know where...?",
    summary: "Hỏi lịch sự bằng Do you know...? / Can you tell me...? với trật tự từ khẳng định.",
    formula: "Do you know + từ hỏi + chủ ngữ + động từ (trật tự như câu khẳng định)",
    see: ["question-forms", "reported-speech"],
    selfWrite: [
      ["Viết một câu hỏi lịch sự bắt đầu bằng Can you tell me...? để hỏi đường.", "Can you tell me where the station is?"],
      ["Viết một câu bắt đầu bằng I don't know... về điều bạn chưa biết.", "I don't know what time the shop opens."]
    ],
    sections: [
      {
        heading: "1. Trật tự khẳng định sau Do you know...?",
        body: "Khi một câu hỏi nằm trong câu khác (Do you know..., Can you tell me..., I don't know..., I don't remember...), ta bỏ đảo ngữ và dùng trật tự của câu khẳng định: chủ ngữ rồi mới tới động từ. Where is Paula? → Do you know where Paula is? (không nói where is Paula). Câu này lịch sự hơn câu hỏi trực tiếp.",
        table: [
          ["Câu hỏi trực tiếp", "Câu hỏi gián tiếp"],
          ["Where is Paula?", "Do you know where Paula is?"],
          ["What time is it?", "Can you tell me what time it is?"],
          ["How old is Nicola?", "I know how old Nicola is."],
          ["Where have they gone?", "I don't know where they have gone."]
        ],
        examples: [
          { en: "Do you know where Paula is?", vi: "Bạn có biết Paula ở đâu không?" },
          { en: "Can you tell me what time it is?", vi: "Bạn cho tôi biết mấy giờ rồi được không?" },
          { en: "I don't know how much this camera is.", vi: "Tôi không biết chiếc máy ảnh này giá bao nhiêu." }
        ]
      },
      {
        heading: "2. Với do / does / did",
        body: "Câu hỏi trực tiếp mượn do, does, did. Trong câu hỏi gián tiếp ta bỏ trợ động từ này và động từ chính trở lại dạng bình thường (thêm -s hoặc chia quá khứ): Where does he live? → Do you know where he lives? Why did she go home? → I don't know why she went home.",
        examples: [
          { en: "Do you know where he lives?", vi: "Bạn có biết anh ấy sống ở đâu không?" },
          { en: "I don't know why she went home.", vi: "Tôi không biết vì sao cô ấy về nhà." },
          { en: "Can you tell me how airplanes fly?", vi: "Bạn có thể cho tôi biết máy bay bay như thế nào không?" }
        ]
      },
      {
        heading: "3. Câu hỏi Yes / No: dùng if hoặc whether",
        body: "Với câu hỏi Yes / No (Is Jack at home? Can Ben swim?), ta thêm if hoặc whether sau Do you know / I don't know: Do you know if Jack is at home? I don't know whether Ben can swim. If và whether có nghĩa như nhau trong trường hợp này.",
        examples: [
          { en: "Do you know if they've got a car?", vi: "Bạn có biết họ có xe không?" },
          { en: "I don't know whether anybody saw me.", vi: "Tôi không biết có ai nhìn thấy tôi không." }
        ]
      }
    ],
    walk: [
      w("Do you know where he lives?", "Bạn có biết anh ấy sống ở đâu không?", "Trong câu gián tiếp bỏ does, động từ chia lives."),
      w("Can you tell me what time it is?", "Bạn cho tôi biết mấy giờ rồi được không?", "It is (trật tự khẳng định), không phải is it."),
      w("Do you know if Jack is at home?", "Bạn có biết Jack có ở nhà không?", "Câu Yes / No thêm if.")
    ],
    mistakes: [
      x("Do you know where is Paula?", "Do you know where Paula is?", "Sau where giữ trật tự chủ ngữ + động từ."),
      x("I don't know where does he live.", "I don't know where he lives.", "Bỏ does và chia động từ chính."),
      x("Do you know is Jack at home?", "Do you know if Jack is at home?", "Câu Yes / No cần if hoặc whether.")
    ],
    check: [
      "Câu hỏi có nằm trong câu khác không? || Sau Do you know, Can you tell me, I don't know → trật tự khẳng định.",
      "Có do / does / did không? || Bỏ chúng đi; động từ chính chia theo chủ ngữ và thì.",
      "Là câu hỏi Yes / No? || Thêm if hoặc whether.",
      "Từ để hỏi giữ nguyên? || Có, what, where, when, why, how đứng sau Do you know."
    ],
    questions: [
      mc("q1", "e", "Do you know where Paula ___?", ["is", "does", "has"], "is", "gian-tiep-trat-tu", "Bạn có biết Paula ở đâu không?", "where + chủ ngữ + is.", "Trong câu gián tiếp, chủ ngữ Paula đứng trước động từ is."),
      mc("q2", "e", "Can you tell me what time ___?", ["it is", "is it", "does it"], "it is", "gian-tiep-trat-tu", "Bạn cho tôi biết mấy giờ rồi được không?", "Trật tự khẳng định: it is.", "Sau what time ta giữ trật tự chủ ngữ + động từ: it is."),
      mc("q3", "e", "I don't know where ___.", ["he lives", "does he live", "he does live"], "he lives", "gian-tiep-trat-tu", "Tôi không biết anh ấy sống ở đâu.", "Bỏ does; chia lives.", "Câu gián tiếp không mượn does và động từ chia theo chủ ngữ: he lives."),
      mc("q4", "e", "Do you know how old Nicola ___?", ["is", "does", "has"], "is", "gian-tiep-trat-tu", "Bạn có biết Nicola bao nhiêu tuổi không?", "how old + chủ ngữ + is.", "Sau how old, chủ ngữ Nicola đứng trước is."),
      mc("q5", "e", "Câu nào đúng?", ["Do you know where she is?", "Do you know where is she?", "Do you know is where she?"], "Do you know where she is?", "gian-tiep-trat-tu", "Bạn có biết cô ấy ở đâu không?", "where + she + is.", "Sau Do you know giữ trật tự câu khẳng định: where she is."),
      mc("q6", "m", "I don't remember what time the train ___.", ["left", "did leave", "did left"], "left", "gian-tiep-trat-tu", "Tôi không nhớ tàu rời đi lúc mấy giờ.", "Bỏ did; dùng quá khứ đơn left.", "Trong câu gián tiếp bỏ did và động từ chia quá khứ đơn (left)."),
      mc("q7", "m", "Do you know ___ they've got a car?", ["if", "what", "where"], "if", "gian-tiep-if", "Bạn có biết họ có xe không?", "Câu Yes / No dùng if.", "Câu hỏi Yes / No (Have they got a car?) khi đặt trong câu gián tiếp cần if hoặc whether."),
      mc("q8", "m", "I don't know ___ anybody saw me.", ["whether", "what", "who"], "whether", "gian-tiep-if", "Tôi không biết có ai thấy tôi không.", "Yes / No: whether (hoặc if).", "Câu gốc Did anybody see me? là Yes / No nên dùng whether (hoặc if)."),
      mc("q9", "m", "Can you tell me where ___ I can buy stamps?", ["I can", "can I", "do I can"], "I can", "gian-tiep-trat-tu", "Bạn cho tôi biết mua tem ở đâu được không?", "Trật tự khẳng định: I can.", "Sau where giữ I can, không đảo thành can I."),
      mc("q10", "m", "Do you know how much this camera ___?", ["is", "does", "has"], "is", "gian-tiep-trat-tu", "Bạn có biết chiếc máy ảnh này giá bao nhiêu không?", "how much + chủ ngữ + is.", "Chủ ngữ this camera đứng trước is trong câu gián tiếp."),
      mc("q11", "h", "'Why did she go home?' → I don't know why she ___ home.", ["went", "did go", "go"], "went", "gian-tiep-trat-tu", "Tôi không biết vì sao cô ấy về nhà.", "Bỏ did; V2 went.", "Câu gián tiếp bỏ did, động từ ở quá khứ đơn: went."),
      mc("q12", "h", "'Where does he live?' → Do you know where he ___?", ["lives", "does live", "live"], "lives", "gian-tiep-trat-tu", "Bạn có biết anh ấy sống ở đâu không?", "Bỏ does; he lives.", "Bỏ does và thêm -s vào động từ vì chủ ngữ là he."),
      mc("q13", "h", "Câu nào đúng?", ["I don't know what Jane wants.", "I don't know what does Jane want.", "I don't know what Jane does want."], "I don't know what Jane wants.", "gian-tiep-trat-tu", "Tôi không biết Jane muốn gì.", "Bỏ does; Jane wants.", "Câu gián tiếp không dùng does. Động từ want chia -s theo Jane."),
      mc("q14", "h", "'Is Jack at home?' → Do you know ___ Jack is at home?", ["if", "that", "what"], "if", "gian-tiep-if", "Bạn có biết Jack có ở nhà không?", "Yes / No: if.", "Câu hỏi Yes / No cần if hoặc whether khi đặt vào câu gián tiếp."),
      mc("q15", "h", "Câu nào đúng?", ["Can you tell me how airplanes fly?", "Can you tell me how do airplanes fly?", "Can you tell me how airplanes do fly?"], "Can you tell me how airplanes fly?", "gian-tiep-trat-tu", "Bạn có thể cho tôi biết máy bay bay như thế nào không?", "Bỏ do; airplanes fly.", "Câu gián tiếp bỏ do, giữ trật tự chủ ngữ + động từ: how airplanes fly.")
    ]
  });
})();
