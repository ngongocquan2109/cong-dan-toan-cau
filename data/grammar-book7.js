/* Ngữ pháp bổ sung theo giáo trình Essential Grammar in Use (7/7): a little / a few, mạo từ và địa danh, have to / need to. */
(function () {
  var mc = function (id, lv, q, o, a, tag, vi, ex, deep) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: ex, tag: tag, vi: vi, deep: deep }; };
  var fl = function (id, lv, q, a, tag, vi, ex, deep) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: ex, tag: tag, vi: vi, deep: deep }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "luong-lot-much": "a lot of, much, many",
    "luong-little-few": "a little, a few, little, few",
    "mt-quen-thuoc": "go to school, in bed (không mạo từ)",
    "mt-chung": "Danh từ nói chung không dùng the",
    "mt-dia-danh": "the với địa danh và tên riêng",
    "ht-have-to": "have to / don't have to",
    "ht-must": "must / mustn't",
    "ht-need": "need to / needn't"
  });
  window.GRAMMAR = window.GRAMMAR || [];

  window.GRAMMAR.push({
    id: "little-few", cefr: "A2",
    title: "a lot of, much, many và a little, a few",
    summary: "Nói nhiều hay ít: đếm được hay không đếm được, và 'một ít' khác 'rất ít'.",
    formula: "much + không đếm được · many + đếm được · a little / a few = một ít · little / few = rất ít",
    see: ["nouns", "quantifiers"],
    selfWrite: [
      ["Viết một câu nói bạn có nhiều bạn bè hoặc ít bạn bè (a lot of / a few / few).", "I have a few close friends and a lot of colleagues."],
      ["Viết một câu về thời gian rảnh của bạn (a little / little time).", "I have a little free time on Sunday afternoon."]
    ],
    sections: [
      {
        heading: "1. a lot of, much, many",
        body: "A lot of (lots of) dùng được với cả danh từ đếm được số nhiều và không đếm được, thích hợp trong câu khẳng định: We have a lot of time. Many đi với danh từ đếm được số nhiều: many friends. Much đi với danh từ không đếm được: much money. Much và many thường dùng trong câu phủ định và câu hỏi: How much does it cost? Do you have many books?",
        examples: [
          { en: "We have a lot of time.", vi: "Chúng ta có nhiều thời gian." },
          { en: "How many people are there?", vi: "Có bao nhiêu người?" },
          { en: "There isn't much milk.", vi: "Không còn nhiều sữa." }
        ]
      },
      {
        heading: "2. a little và a few: một ít (đủ dùng)",
        body: "A little + danh từ không đếm được: a little water. A few + danh từ đếm được số nhiều: a few eggs. Hai cụm này nghĩa là một ít, vừa đủ, mang nghĩa tích cực. Trả lời ngắn: 'Would you like some milk?' 'Just a little, please.'",
        examples: [
          { en: "Let's make an omelette. We have a few eggs.", vi: "Làm món trứng nhé. Chúng ta có vài quả trứng." },
          { en: "I'd like a little water, please.", vi: "Cho tôi một chút nước." },
          { en: "'Is there any bread?' 'Yes, but only a little.'", vi: "'Có bánh mì không?' 'Có, nhưng chỉ còn chút ít.'" }
        ]
      },
      {
        heading: "3. little và few: rất ít (gần như không có)",
        body: "Bỏ chữ a thì nghĩa đổi: little và few nghĩa là rất ít, hầu như không đủ, mang nghĩa tiêu cực. Little + không đếm được; few + đếm được số nhiều. So sánh: He has a few friends (anh ấy có vài người bạn, ổn) và He has few friends (anh ấy hầu như không có bạn, cô đơn).",
        table: [
          ["", "đếm được", "không đếm được", "nghĩa"],
          ["một ít (tích cực)", "a few", "a little", "đủ dùng"],
          ["rất ít (tiêu cực)", "few", "little", "gần như không có"]
        ],
        examples: [
          { en: "He has a few friends here.", vi: "Anh ấy có vài người bạn ở đây." },
          { en: "He has few friends. He's lonely.", vi: "Anh ấy hầu như không có bạn. Anh ấy cô đơn." },
          { en: "There was little food in the fridge.", vi: "Tủ lạnh gần như chẳng còn thức ăn." }
        ]
      }
    ],
    walk: [
      w("How much does it cost?", "Cái này giá bao nhiêu?", "Cost là không đếm được nên dùng How much."),
      w("I have a few good friends.", "Tôi có vài người bạn tốt.", "A few + danh từ đếm được số nhiều, nghĩa tích cực."),
      w("There's little time left.", "Gần như không còn thời gian.", "Little không có a nên mang nghĩa tiêu cực.")
    ],
    mistakes: [
      x("We have a lot time.", "We have a lot of time.", "Phải có of sau a lot."),
      x("Does she have much friends?", "Does she have many friends?", "Friends đếm được nên dùng many."),
      x("I have a little friends.", "I have a few friends.", "Friends đếm được nên dùng a few.")
    ],
    check: [
      "Danh từ đếm được hay không? || Đếm được → many, a few, few. Không đếm được → much, a little, little.",
      "Nghĩa tích cực hay tiêu cực? || Có chữ a (a little, a few) → đủ dùng. Không có a (little, few) → quá ít.",
      "Câu khẳng định? || Dùng a lot of thay cho much / many.",
      "Có of không? || a lot of, lots of luôn có of."
    ],
    questions: [
      mc("q1", "e", "There isn't ___ milk.", ["much", "many", "few"], "much", "luong-lot-much", "Không còn nhiều sữa.", "Milk không đếm được: much.", "Milk là danh từ không đếm được, câu phủ định nên dùng much."),
      mc("q2", "e", "How ___ people are there?", ["many", "much", "little"], "many", "luong-lot-much", "Có bao nhiêu người?", "People đếm được: many.", "People là số nhiều đếm được nên dùng How many."),
      mc("q3", "e", "She has a ___ of friends.", ["lot", "many", "much"], "lot", "luong-lot-much", "Cô ấy có nhiều bạn.", "a lot of.", "A lot of là cụm cố định có nghĩa là nhiều."),
      mc("q4", "e", "'Would you like some milk?' — 'Just a ___, please.'", ["little", "few", "lot"], "little", "luong-little-few", "Bạn uống chút sữa nhé? — Chỉ một chút thôi.", "Không đếm được: a little.", "Milk không đếm được nên dùng a little."),
      mc("q5", "e", "We have a ___ eggs. Let's make an omelette.", ["few", "little", "much"], "few", "luong-little-few", "Chúng ta có vài quả trứng. Làm món trứng nhé.", "Eggs đếm được: a few.", "Eggs là số nhiều đếm được nên dùng a few."),
      mc("q6", "m", "He has ___ friends. He's lonely.", ["few", "a few", "a little"], "few", "luong-little-few", "Anh ấy hầu như không có bạn. Anh ấy cô đơn.", "few = rất ít, tiêu cực.", "Cô đơn cho thấy nghĩa tiêu cực nên dùng few (không có a)."),
      mc("q7", "m", "I have ___ time. Let's have a coffee.", ["a little", "little", "a few"], "a little", "luong-little-few", "Tôi có chút thời gian. Mình uống cà phê nhé.", "a little = đủ dùng.", "Có thời gian để uống cà phê nên nghĩa tích cực: a little."),
      mc("q8", "m", "There was ___ food in the fridge. We were hungry.", ["little", "a little", "few"], "little", "luong-little-few", "Trong tủ lạnh gần như không có đồ ăn. Chúng tôi đói.", "little = gần như không có.", "Đói cho thấy nghĩa tiêu cực nên dùng little. Food là không đếm được nên không dùng few."),
      mc("q9", "m", "How ___ does it cost?", ["much", "many", "few"], "much", "luong-lot-much", "Cái này giá bao nhiêu?", "How much + giá tiền.", "Hỏi giá tiền dùng How much."),
      mc("q10", "m", "I don't have ___ books.", ["many", "much", "a little"], "many", "luong-lot-much", "Tôi không có nhiều sách.", "Books đếm được: many.", "Books là số nhiều đếm được nên dùng many."),
      mc("q11", "h", "Câu nào đúng?", ["We have a lot of time.", "We have a lot time.", "We have lots time."], "We have a lot of time.", "luong-lot-much", "Chúng ta có nhiều thời gian.", "a lot of.", "A lot of và lots of đều cần of."),
      mc("q12", "h", "Câu nào đúng?", ["Does she have many friends?", "Does she have much friends?", "Does she have a little friends?"], "Does she have many friends?", "luong-lot-much", "Cô ấy có nhiều bạn không?", "Friends đếm được: many.", "Friends là số nhiều đếm được nên dùng many."),
      mc("q13", "h", "I'd like ___ water. (không nhiều)", ["a little", "a few", "many"], "a little", "luong-little-few", "Cho tôi một ít nước.", "Water không đếm được: a little.", "Water không đếm được nên dùng a little."),
      mc("q14", "h", "Câu nào có nghĩa tích cực (vẫn có vài người bạn)?", ["I have a few friends here.", "I have few friends here.", "I have little friends here."], "I have a few friends here.", "luong-little-few", "Tôi có vài người bạn ở đây.", "a few = tích cực.", "A few mang nghĩa tích cực: có vài người. Few mang nghĩa quá ít. Little không đi với friends."),
      mc("q15", "h", "'Is there any bread?' — 'Yes, but only ___.'", ["a little", "a few", "many"], "a little", "luong-little-few", "Có bánh mì không? — Có, nhưng chỉ còn chút ít.", "Không đếm được: a little.", "Bread là không đếm được nên dùng a little.")
    ]
  });

  window.GRAMMAR.push({
    id: "articles-places", cefr: "A2",
    title: "Mạo từ: go to school, I like music, the UK",
    summary: "Khi nào không dùng the (nơi quen thuộc, nói chung) và khi nào dùng the với địa danh.",
    formula: "go to school / bed / work (không the) · the cinema / the bank · the UK, the Alps",
    see: ["articles", "prepositions-place-2"],
    selfWrite: [
      ["Viết một câu nói bạn thích điều gì nói chung (I like music / I love coffee).", "I love coffee and I like jazz music."],
      ["Viết một câu nói bạn muốn đến địa danh nào (the Alps, Japan, the UK...).", "I would like to visit Japan and the Alps."]
    ],
    sections: [
      {
        heading: "1. Nơi quen thuộc: không dùng the",
        body: "Một số nơi quen thuộc khi nói về hoạt động chính của nơi đó thì không dùng the: go to work, go to school, go to bed, be in hospital (bệnh nhân), be in prison, at university, go home. Nhưng khi nói đến tòa nhà hoặc nơi cụ thể thì dùng the: go to the cinema, go to the bank, go to the post office, go to the doctor.",
        examples: [
          { en: "What time do you go to work?", vi: "Bạn đi làm lúc mấy giờ?" },
          { en: "She's in bed.", vi: "Cô ấy đang nằm giường." },
          { en: "I'm going to the cinema tonight.", vi: "Tối nay tôi đi xem phim." }
        ]
      },
      {
        heading: "2. Nói chung: không dùng the",
        body: "Khi nói chung về một loại, dùng danh từ số nhiều hoặc không đếm được mà không có the: I like music. I hate exams. Money isn't everything. Khi nói về cái cụ thể đã biết mới dùng the: Where are the children? (con của chúng ta); I like the music they played (bản nhạc cụ thể).",
        examples: [
          { en: "I like music.", vi: "Tôi thích âm nhạc (nói chung)." },
          { en: "I hate exams.", vi: "Tôi ghét các kỳ thi." },
          { en: "We liked the music at the party.", vi: "Chúng tôi thích bản nhạc ở buổi tiệc (cụ thể)." }
        ]
      },
      {
        heading: "3. The và địa danh",
        body: "Không dùng the với hầu hết tên nước, thành phố, đảo, núi riêng lẻ, hồ: Italy, London, Mount Everest, Lake Victoria. Dùng the với: nước có từ kingdom / states / republic hoặc tên số nhiều (the UK, the USA, the Netherlands), đại dương, biển, sông, dãy núi (the Pacific, the Nile, the Alps), một số nơi như khách sạn, nhà hàng, bảo tàng (the Hilton, the Louvre).",
        table: [
          ["không the", "có the"],
          ["Italy, Vietnam", "the UK, the USA"],
          ["London, Paris", "the Netherlands"],
          ["Mount Everest", "the Alps"],
          ["Lake Victoria", "the Nile, the Pacific"]
        ],
        examples: [
          { en: "I'd love to visit Italy.", vi: "Tôi rất muốn đến thăm Ý." },
          { en: "She lives in the UK.", vi: "Cô ấy sống ở Vương quốc Anh." },
          { en: "We stayed at the Hilton.", vi: "Chúng tôi ở khách sạn Hilton." }
        ]
      }
    ],
    walk: [
      w("I go to school by bus.", "Tôi đi học bằng xe buýt.", "School ở đây là hoạt động học nên không dùng the."),
      w("The Nile is a long river.", "Sông Nile là một con sông dài.", "Sông dùng the."),
      w("I like music.", "Tôi thích âm nhạc.", "Nói chung nên không dùng the.")
    ],
    mistakes: [
      x("I go to the work by bus.", "I go to work by bus.", "Work là hoạt động quen thuộc, không dùng the."),
      x("I hate the exams.", "I hate exams.", "Nói chung thì không dùng the."),
      x("She lives in UK.", "She lives in the UK.", "UK cần the.")
    ],
    check: [
      "Đó là hoạt động quen thuộc hay tòa nhà cụ thể? || Hoạt động chính (go to school, work, bed) → không the. Tòa nhà cụ thể (the cinema, the bank) → the.",
      "Nói chung hay cụ thể? || Chung → không the. Cụ thể → the.",
      "Địa danh là loại nào? || Nước số nhiều hoặc có kingdom / states, sông, biển, dãy núi → the. Còn lại thường không the.",
      "Tên khách sạn, nhà hàng, bảo tàng? || Thường có the (the Hilton)."
    ],
    questions: [
      mc("q1", "e", "I go to ___ every day. (tôi là học sinh)", ["school", "the school", "a school"], "school", "mt-quen-thuoc", "Tôi đi học mỗi ngày.", "go to school (không the).", "Go to school nói về hoạt động đi học nên không dùng the."),
      mc("q2", "e", "She's ill. She's in ___.", ["bed", "the bed", "a bed"], "bed", "mt-quen-thuoc", "Cô ấy bị ốm. Cô ấy đang nằm giường.", "in bed (không the).", "In bed là cụm cố định, không dùng mạo từ."),
      mc("q3", "e", "I like ___. (nói chung)", ["music", "the music", "a music"], "music", "mt-chung", "Tôi thích âm nhạc.", "Nói chung: không the.", "Khi nói chung về âm nhạc không cần mạo từ."),
      mc("q4", "e", "I'm going to ___ cinema tonight.", ["the", "a", "some"], "the", "mt-quen-thuoc", "Tối nay tôi đi xem phim.", "go to the cinema.", "Rạp chiếu phim là nơi cụ thể nên dùng the cinema."),
      mc("q5", "e", "I hate ___. (nói chung)", ["exams", "the exams", "an exams"], "exams", "mt-chung", "Tôi ghét các kỳ thi.", "Nói chung: không the.", "Nói chung về kỳ thi nên không dùng the."),
      mc("q6", "m", "I'm going to ___ bank to get some money.", ["the", "a", "không cần mạo từ"], "the", "mt-quen-thuoc", "Tôi đến ngân hàng lấy ít tiền.", "go to the bank.", "Ngân hàng là tòa nhà cụ thể nên dùng the."),
      mc("q7", "m", "___ Nile is a long river.", ["The", "A", "không cần mạo từ"], "The", "mt-dia-danh", "Sông Nile là một con sông dài.", "Sông dùng the.", "Tên sông luôn dùng the."),
      mc("q8", "m", "She lives in ___ UK.", ["the", "a", "không cần mạo từ"], "the", "mt-dia-danh", "Cô ấy sống ở Vương quốc Anh.", "the UK.", "UK là tên viết tắt của United Kingdom nên dùng the."),
      mc("q9", "m", "He's at ___ work.", ["không cần mạo từ", "the", "a"], "không cần mạo từ", "mt-quen-thuoc", "Anh ấy đang ở chỗ làm.", "at work (không the).", "At work là cụm cố định."),
      mc("q10", "m", "We watched ___ film you recommended.", ["the", "a", "không cần mạo từ"], "the", "mt-chung", "Chúng tôi đã xem bộ phim bạn giới thiệu.", "Cái cụ thể đã biết: the.", "Bộ phim bạn giới thiệu là một bộ phim cụ thể nên dùng the."),
      mc("q11", "h", "Câu nào đúng?", ["Money isn't everything.", "The money isn't everything.", "A money isn't everything."], "Money isn't everything.", "mt-chung", "Tiền không phải là tất cả.", "Nói chung: không the.", "Nói chung về tiền không dùng the. Money cũng là danh từ không đếm được nên không dùng a."),
      mc("q12", "h", "I'd love to visit ___ Alps.", ["the", "a", "không cần mạo từ"], "the", "mt-dia-danh", "Tôi rất muốn thăm dãy Alps.", "Dãy núi: the.", "Dãy núi (số nhiều) dùng the: the Alps."),
      mc("q13", "h", "I'd love to visit ___ Italy.", ["không cần mạo từ", "the", "a"], "không cần mạo từ", "mt-dia-danh", "Tôi rất muốn thăm nước Ý.", "Tên nước: không the.", "Hầu hết tên nước không dùng the."),
      mc("q14", "h", "We stayed at ___ Hilton.", ["the", "a", "không cần mạo từ"], "the", "mt-dia-danh", "Chúng tôi ở khách sạn Hilton.", "the + tên khách sạn.", "Tên khách sạn thường dùng the: the Hilton."),
      mc("q15", "h", "Where's Tom? He's gone to ___ bed.", ["không cần mạo từ", "the", "a"], "không cần mạo từ", "mt-quen-thuoc", "Tom đâu rồi? Anh ấy đi ngủ rồi.", "go to bed (không the).", "Go to bed là cụm cố định, không dùng mạo từ.")
    ]
  });

  window.GRAMMAR.push({
    id: "have-to-need-to", cefr: "A2",
    title: "have to, must, mustn't và don't need to",
    summary: "Nói điều bắt buộc, bị cấm, và không cần thiết.",
    formula: "have to + V · must + V · mustn't + V (cấm) · don't have to / don't need to + V (không cần)",
    see: ["modals", "future-plans"],
    selfWrite: [
      ["Viết một điều bạn phải làm vào ngày mai (I have to...).", "I have to finish my report tomorrow."],
      ["Viết một điều bạn không cần làm vào Chủ nhật (I don't have to...).", "I don't have to get up early on Sunday."]
    ],
    sections: [
      {
        heading: "1. have to: điều bắt buộc",
        body: "Have to + động từ nguyên mẫu nghĩa là phải làm vì luật, quy định hoặc tình huống. Với he / she / it dùng has to. Quá khứ là had to. Câu hỏi và phủ định mượn do / does / did: Do you have to get up early? She doesn't have to work on Sundays. I didn't have to pay.",
        examples: [
          { en: "I have to go now. It's late.", vi: "Tôi phải đi bây giờ. Muộn rồi." },
          { en: "Everybody has to eat.", vi: "Ai cũng phải ăn." },
          { en: "Yesterday I had to work late.", vi: "Hôm qua tôi phải làm việc muộn." }
        ]
      },
      {
        heading: "2. must và mustn't",
        body: "Must nghĩa gần giống have to (phải), thường dùng khi chính người nói thấy cần thiết. Mustn't nghĩa là cấm, không được: You mustn't drive fast here. Chú ý: mustn't khác hoàn toàn với don't have to. Mustn't = bị cấm; don't have to = không bắt buộc (làm cũng được, không làm cũng được).",
        table: [
          ["Cụm", "Nghĩa", "Ví dụ"],
          ["must / have to", "bắt buộc", "You must wear a seat belt."],
          ["mustn't", "bị cấm", "You mustn't smoke here."],
          ["don't have to", "không cần, không bắt buộc", "You don't have to wear a tie."]
        ],
        examples: [
          { en: "You mustn't smoke here.", vi: "Bạn không được hút thuốc ở đây." },
          { en: "You don't have to wear a suit.", vi: "Bạn không cần mặc com-lê." }
        ]
      },
      {
        heading: "3. need to và don't need to",
        body: "Need to + động từ nghĩa là cần phải. Don't need to (hoặc needn't) nghĩa là không cần, giống don't have to. Ví dụ: You don't need to hurry (bạn không cần vội). Cẩn thận: don't need to cần to; needn't không cần to.",
        examples: [
          { en: "You don't need to hurry.", vi: "Bạn không cần phải vội." },
          { en: "I don't need to go to the bank. I have enough money.", vi: "Tôi không cần đến ngân hàng. Tôi có đủ tiền rồi." },
          { en: "Do I have to pay? — No, you don't.", vi: "Tôi có phải trả tiền không? — Không, bạn không phải." }
        ]
      }
    ],
    walk: [
      w("She has to get up at six.", "Cô ấy phải dậy lúc sáu giờ.", "Has to vì she là ngôi thứ ba số ít."),
      w("You mustn't park here.", "Bạn không được đỗ xe ở đây.", "Mustn't = cấm."),
      w("You don't have to come.", "Bạn không cần đến đâu.", "Don't have to = không bắt buộc.")
    ],
    mistakes: [
      x("You mustn't wear a tie. (ý là không cần)", "You don't have to wear a tie.", "Mustn't là cấm; không cần thì dùng don't have to."),
      x("She must to leave.", "She must leave.", "Sau must không dùng to."),
      x("She had leave early.", "She had to leave early.", "Quá khứ của have to là had to.")
    ],
    check: [
      "Bắt buộc, cấm hay không cần? || Bắt buộc → must / have to. Cấm → mustn't. Không cần → don't have to / don't need to.",
      "Chủ ngữ là ngôi nào? || he / she / it → has to. Quá khứ → had to.",
      "Sau must có to không? || Không, must + V. Have to và need to có to.",
      "Câu hỏi và phủ định của have to? || Mượn do / does / did."
    ],
    questions: [
      mc("q1", "e", "I ___ go now. It's late.", ["have to", "has to", "having to"], "have to", "ht-have-to", "Tôi phải đi bây giờ. Muộn rồi.", "I + have to.", "Chủ ngữ I đi với have to."),
      mc("q2", "e", "She doesn't ___ work on Sundays. (không bắt buộc)", ["have to", "has to", "must"], "have to", "ht-have-to", "Cô ấy không phải làm việc vào Chủ nhật.", "doesn't + have to.", "Doesn't đã mang -s nên dùng have to (không phải has to)."),
      mc("q3", "e", "Do you ___ get up early?", ["have to", "has to", "having"], "have to", "ht-have-to", "Bạn có phải dậy sớm không?", "Do you have to...?", "Câu hỏi với have to mượn do."),
      mc("q4", "e", "Yesterday I ___ work late.", ["had to", "have to", "must"], "had to", "ht-have-to", "Hôm qua tôi phải làm việc muộn.", "Quá khứ: had to.", "Yesterday nên dùng had to. Must không có dạng quá khứ."),
      mc("q5", "e", "You ___ drive fast here. It's dangerous.", ["mustn't", "don't have to", "needn't"], "mustn't", "ht-must", "Bạn không được lái nhanh ở đây. Nguy hiểm.", "mustn't = cấm.", "Lái nhanh nguy hiểm nên là điều bị cấm: mustn't."),
      mc("q6", "m", "You ___ wear a suit. It's a casual party.", ["don't have to", "mustn't", "must"], "don't have to", "ht-must", "Bạn không cần mặc com-lê. Đây là tiệc thân mật.", "Không bắt buộc: don't have to.", "Tiệc thân mật nên không bắt buộc. Mustn't là cấm."),
      mc("q7", "m", "I ___ go to the bank. I have enough money.", ["don't need to", "mustn't", "must"], "don't need to", "ht-need", "Tôi không cần đến ngân hàng. Tôi có đủ tiền.", "Không cần: don't need to.", "Có đủ tiền nên không cần đến ngân hàng."),
      mc("q8", "m", "We ___ be late for the meeting!", ["mustn't", "don't have to", "needn't to"], "mustn't", "ht-must", "Chúng ta không được đến trễ buổi họp!", "mustn't = cấm / tránh.", "Đến trễ là điều không được phép nên dùng mustn't."),
      mc("q9", "m", "What time ___ you have to leave?", ["do", "are", "does"], "do", "ht-have-to", "Bạn phải đi lúc mấy giờ?", "do + you + have to.", "Câu hỏi với have to mượn do."),
      mc("q10", "m", "Everybody ___ eat.", ["has to", "have to", "must to"], "has to", "ht-have-to", "Ai cũng phải ăn.", "Everybody → has to.", "Everybody là số ít nên dùng has to."),
      mc("q11", "h", "Câu nào đúng?", ["You don't need to hurry.", "You not need to hurry.", "You don't needs to hurry."], "You don't need to hurry.", "ht-need", "Bạn không cần phải vội.", "don't need to + V.", "Phủ định mượn don't, theo sau need (không -s)."),
      mc("q12", "h", "'Do I have to pay?' — 'No, you ___.'", ["don't", "haven't", "mustn't"], "don't", "ht-have-to", "Tôi có phải trả tiền không? — Không, bạn không phải.", "Trả lời với do.", "Câu hỏi dùng do nên trả lời No, you don't."),
      mc("q13", "h", "Câu nào đúng?", ["She had to leave early.", "She must to leave early.", "She had leave early."], "She had to leave early.", "ht-have-to", "Cô ấy phải về sớm.", "Quá khứ: had to.", "Cần had to; must không đi với to."),
      mc("q14", "h", "'You mustn't smoke here' nghĩa là gì?", ["Cấm hút thuốc ở đây", "Không cần hút thuốc", "Bạn không thể hút thuốc"], "Cấm hút thuốc ở đây", "ht-must", "Bạn không được hút thuốc ở đây.", "mustn't = cấm.", "Mustn't dùng để nói điều bị cấm."),
      mc("q15", "h", "'You don't have to smoke here' nghĩa là gì?", ["Bạn không cần hút thuốc", "Cấm hút thuốc", "Bạn phải hút thuốc"], "Bạn không cần hút thuốc", "ht-must", "Bạn không cần hút thuốc ở đây.", "don't have to = không bắt buộc.", "Don't have to chỉ nói rằng không bắt buộc, khác với mustn't (cấm).")
    ]
  });
})();
