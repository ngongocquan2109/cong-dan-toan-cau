/* Ngữ pháp bổ sung theo giáo trình Essential Grammar in Use (6/6): giới từ nơi chốn, vị trí và chuyển động, giới từ đi kèm. */
(function () {
  var mc = function (id, lv, q, o, a, tag, vi, ex, deep) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: ex, tag: tag, vi: vi, deep: deep }; };
  var fl = function (id, lv, q, a, tag, vi, ex, deep) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: ex, tag: tag, vi: vi, deep: deep }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "gn-in-at-on": "in / at / on chỉ nơi chốn",
    "gn-xe": "on a bus / in a car",
    "gn-to-in-at": "to / in / at, arrive, home",
    "vt-vi-tri": "next to, between, behind, opposite, under, above",
    "vt-chuyen-dong": "into, out of, over, through, round, along, across, past",
    "gk-on-at-by": "on, at, by, with, about",
    "gk-tinh-tu": "Tính từ + giới từ (afraid of, good at)",
    "gk-dong-tu": "Động từ + giới từ (listen to, wait for)",
    "gk-ving": "Giới từ + V-ing"
  });
  window.GRAMMAR = window.GRAMMAR || [];

  window.GRAMMAR.push({
    id: "prepositions-place-2", cefr: "A2",
    title: "Giới từ nơi chốn: in, at, on và to",
    summary: "Chọn giữa in, at, on cho nơi chốn, phương tiện; và to, in, at khi đi và ở.",
    formula: "in (bên trong) · at (một điểm) · on (trên bề mặt, phương tiện công cộng) · to (đi đến)",
    see: ["prepositions", "go-get"],
    selfWrite: [
      ["Viết một câu nói bạn đang ở đâu bây giờ (at home / in a café / at work).", "I'm at home right now."],
      ["Viết một câu nói bạn đến chỗ làm hoặc trường bằng phương tiện gì.", "I go to work on the bus."]
    ],
    sections: [
      {
        heading: "1. in, at, on",
        body: "In dùng cho không gian bên trong hoặc khu vực lớn: in a room, in the water, in a town, in Brazil, in bed, in hospital, in the sky, in a book, in a newspaper, in a car / a taxi. At dùng cho một điểm cụ thể: at the bus stop, at the door, at the top / bottom / end of..., at home, at work, at school, at university, at the station, at the airport, at a concert, at a party, at my sister's (house). On dùng cho bề mặt: on the floor, on a shelf, on the wall, on the ceiling, on a plate; và phương tiện công cộng hoặc xe để cưỡi: on a bus / train / plane / ship / bicycle / motorbike.",
        table: [
          ["in", "at", "on"],
          ["in a room", "at the bus stop", "on the floor"],
          ["in the water", "at the door", "on a shelf"],
          ["in bed / in hospital", "at home / at work", "on a bus / on a train"],
          ["in a car / in a taxi", "at the station", "on a bicycle"]
        ],
        examples: [
          { en: "She's in bed.", vi: "Cô ấy đang nằm trên giường." },
          { en: "I'll meet you at the station.", vi: "Tôi sẽ gặp bạn ở nhà ga." },
          { en: "Did you come here on the bus?", vi: "Bạn đến đây bằng xe buýt à?" }
        ]
      },
      {
        heading: "2. to, in, at với động từ chỉ chuyển động và trạng thái",
        body: "Dùng to với go, come, return, walk (chỉ đi đến): We're going to London. Dùng in hoặc at với be, stay (ở một nơi): My brother lives in Italy; Sarah wasn't at work. Đặc biệt: go home, get home, come home không có giới từ; nhưng ở trạng thái thì at home: I'm staying at home tonight.",
        examples: [
          { en: "We're going to London on Sunday.", vi: "Chủ nhật chúng tôi đi London." },
          { en: "My brother lives in Italy.", vi: "Anh trai tôi sống ở Ý." },
          { en: "I'm tired. I'm going home.", vi: "Tôi mệt. Tôi về nhà đây." }
        ]
      },
      {
        heading: "3. arrive và get",
        body: "Arrive in + nước hoặc thành phố: They arrived in this country last week. Arrive at + các nơi khác: What time did you arrive at the hotel? Không nói arrive to. Với get: get to + nơi chốn; get home / get here / get there không có to.",
        examples: [
          { en: "They arrived in this country last week.", vi: "Họ đến nước này tuần trước." },
          { en: "What time did you arrive at the hotel?", vi: "Bạn đến khách sạn lúc mấy giờ?" },
          { en: "I was tired when I got home.", vi: "Tôi mệt khi về đến nhà." }
        ]
      }
    ],
    walk: [
      w("Karen didn't go to work yesterday.", "Hôm qua Karen không đi làm.", "go + to + work (đi đến)."),
      w("Sarah wasn't at work yesterday.", "Hôm qua Sarah không có ở chỗ làm.", "Trạng thái ở một nơi dùng at."),
      w("We arrived in Paris at 8 o'clock.", "Chúng tôi đến Paris lúc 8 giờ.", "Arrive in + thành phố.")
    ],
    mistakes: [
      x("I'm going to home.", "I'm going home.", "Không dùng to trước home."),
      x("They arrived to the airport.", "They arrived at the airport.", "Arrive không đi với to."),
      x("I came here in the bus.", "I came here on the bus.", "Xe buýt dùng on, xe hơi mới dùng in.")
    ],
    check: [
      "Ở bên trong, tại một điểm, hay trên bề mặt? || Bên trong → in. Một điểm → at. Bề mặt → on.",
      "Là xe hơi hay xe buýt? || Xe hơi, taxi → in. Xe buýt, tàu, máy bay, xe đạp → on.",
      "Là đi đến hay đang ở? || Đi đến → to. Đang ở → in / at.",
      "Có phải home không? || go home, get home (không giới từ). Ở nhà → at home."
    ],
    questions: [
      mc("q1", "e", "She's ___ bed.", ["in", "on", "at"], "in", "gn-in-at-on", "Cô ấy đang ở trên giường.", "in bed.", "Cụm cố định là in bed."),
      mc("q2", "e", "I'll meet you ___ the station.", ["at", "on", "in"], "at", "gn-in-at-on", "Tôi sẽ gặp bạn ở nhà ga.", "at + điểm cụ thể.", "Nhà ga là một điểm hẹn nên dùng at."),
      mc("q3", "e", "Who is that man ___ the motorbike?", ["on", "in", "at"], "on", "gn-xe", "Người đàn ông ngồi trên xe máy kia là ai?", "on a motorbike.", "Xe để cưỡi (xe máy, xe đạp) dùng on."),
      mc("q4", "e", "Don't sit ___ the grass. It's wet.", ["on", "in", "at"], "on", "gn-in-at-on", "Đừng ngồi trên cỏ. Cỏ ướt.", "on = trên bề mặt.", "Ngồi trên bề mặt cỏ dùng on."),
      mc("q5", "e", "David's father is ___ hospital.", ["in", "at", "on"], "in", "gn-in-at-on", "Bố của David đang nằm viện.", "in hospital.", "Cụm cố định là in hospital (khi là bệnh nhân)."),
      mc("q6", "m", "Did you come here ___ the bus?", ["on", "in", "at"], "on", "gn-xe", "Bạn đến đây bằng xe buýt à?", "on the bus.", "Phương tiện công cộng dùng on: on the bus, on a train, on a plane."),
      mc("q7", "m", "The office is ___ the first floor.", ["on", "in", "at"], "on", "gn-in-at-on", "Văn phòng ở tầng một.", "on the first floor.", "Tầng nhà dùng on: on the ground floor, on the first floor."),
      mc("q8", "m", "I read about the accident ___ the newspaper.", ["in", "on", "at"], "in", "gn-in-at-on", "Tôi đọc về vụ tai nạn trên báo.", "in the newspaper.", "Nội dung trong báo, sách dùng in."),
      mc("q9", "m", "We're going ___ London on Sunday.", ["to", "in", "at"], "to", "gn-to-in-at", "Chủ nhật chúng tôi đi London.", "go to + nơi.", "Go diễn tả việc đi đến nên dùng to."),
      mc("q10", "m", "My brother lives ___ Italy.", ["in", "to", "at"], "in", "gn-to-in-at", "Anh trai tôi sống ở Ý.", "live in + nước.", "Sống ở một nước dùng in."),
      mc("q11", "h", "They arrived ___ this country last week.", ["in", "at", "to"], "in", "gn-to-in-at", "Họ đến đất nước này tuần trước.", "arrive in + nước, thành phố.", "Arrive in dùng cho nước hoặc thành phố. Arrive at dùng cho nơi nhỏ."),
      mc("q12", "h", "What time did you arrive ___ the hotel?", ["at", "in", "to"], "at", "gn-to-in-at", "Bạn đến khách sạn lúc mấy giờ?", "arrive at + nơi nhỏ.", "Khách sạn là một nơi cụ thể nên dùng arrive at."),
      mc("q13", "h", "Karen didn't go ___ work yesterday.", ["to", "at", "in"], "to", "gn-to-in-at", "Hôm qua Karen không đi làm.", "go to work.", "Go to work diễn tả việc đi làm."),
      mc("q14", "h", "Sarah wasn't ___ work yesterday.", ["at", "to", "on"], "at", "gn-to-in-at", "Hôm qua Sarah không có mặt ở chỗ làm.", "be at work.", "Nói đang ở chỗ làm dùng at work."),
      mc("q15", "h", "Câu nào đúng?", ["I'm tired. I'm going home.", "I'm tired. I'm going to home.", "I'm tired. I'm going at home."], "I'm tired. I'm going home.", "gn-to-in-at", "Tôi mệt. Tôi về nhà đây.", "go home (không giới từ).", "Home không đi với to hay at sau go.")
    ]
  });

  window.GRAMMAR.push({
    id: "prepositions-position-movement", cefr: "A2",
    title: "Giới từ vị trí và chuyển động: under, behind, into, through...",
    summary: "Nói ai ở đâu so với người khác, và đi từ đâu đến đâu.",
    formula: "next to / between / behind / opposite · into / out of / over / through / round / along / across / past",
    see: ["prepositions", "phrasal-verbs"],
    selfWrite: [
      ["Viết một câu mô tả đồ vật trong phòng bạn (on / under / next to / between).", "My bag is under the desk, next to the chair."],
      ["Viết một câu chỉ đường đơn giản (go along / past / turn).", "Go along this street and walk past the bank."]
    ],
    sections: [
      {
        heading: "1. Vị trí",
        body: "Next to = beside (bên cạnh); by cũng nghĩa là cạnh (by the window); between A and B (ở giữa); in front of (ở phía trước); behind (phía sau); opposite (đối diện); under (bên dưới); above (cao hơn, không chạm); below (thấp hơn). On the left / on the right (bên trái, bên phải); in the middle (of) (ở giữa).",
        table: [
          ["Giới từ", "Nghĩa", "Ví dụ"],
          ["next to / beside / by", "bên cạnh", "Sit by the fire."],
          ["between", "ở giữa hai vật", "B is between A and C."],
          ["in front of", "phía trước", "D is in front of B."],
          ["behind", "phía sau", "E is behind B."],
          ["opposite", "đối diện", "A is sitting opposite C."],
          ["under / above / below", "dưới / trên / thấp hơn", "The cat is under the table."]
        ],
        examples: [
          { en: "The cat is under the table.", vi: "Con mèo ở dưới bàn." },
          { en: "Our house is by the sea.", vi: "Nhà chúng tôi ở cạnh biển." },
          { en: "The pictures are above the shelves.", vi: "Những bức tranh ở phía trên các kệ." }
        ]
      },
      {
        heading: "2. Chuyển động",
        body: "To (đến), from (từ), into (vào trong), out of (ra khỏi), on / off (lên / xuống khỏi bề mặt, phương tiện), up / down (lên / xuống), over (qua trên), under (qua dưới), through (xuyên qua), round / around (vòng quanh), along (dọc theo), across (băng qua), past (đi ngang qua).",
        examples: [
          { en: "We jumped into the water.", vi: "Chúng tôi nhảy xuống nước." },
          { en: "A man came out of the house.", vi: "Một người đàn ông bước ra khỏi nhà." },
          { en: "The plane flew over the mountains.", vi: "Máy bay bay qua những ngọn núi." }
        ]
      },
      {
        heading: "3. through, round, along, across, past",
        body: "Through: đi xuyên qua bên trong (a bird flew through the window; the road goes through the village). Round / around: đi vòng (the new road goes round the village). Along: đi dọc theo (walk along the river). Across: băng qua từ bên này sang bên kia (swim across the river). Past: đi ngang qua (they walked past me).",
        examples: [
          { en: "The old road goes through the village.", vi: "Con đường cũ đi xuyên qua làng." },
          { en: "The dog swam across the river.", vi: "Con chó bơi qua sông." },
          { en: "They walked past me without speaking.", vi: "Họ đi ngang qua tôi mà không nói gì." }
        ]
      }
    ],
    walk: [
      w("A is sitting opposite C.", "A ngồi đối diện C.", "Opposite = đối diện, mặt nhìn nhau."),
      w("The bird flew through the window.", "Con chim bay xuyên qua cửa sổ.", "Through = đi qua một khoảng không bên trong."),
      w("Go along this road, past the cinema.", "Đi dọc theo con đường này, qua rạp chiếu phim.", "Along = dọc theo; past = đi ngang qua.")
    ],
    mistakes: [
      x("Don't put your feet at the table.", "Don't put your feet on the table.", "Đặt lên bề mặt dùng on."),
      x("The cat is behind of the sofa.", "The cat is behind the sofa.", "Behind không đi với of."),
      x("The car is in front the house.", "The car is in front of the house.", "Phải có of sau in front.")
    ],
    check: [
      "Là vị trí hay chuyển động? || Vị trí (đang ở đâu) → next to, between, under. Chuyển động (đi đâu) → into, over, through.",
      "Vào trong hay ra ngoài? || into (vào), out of (ra).",
      "Băng qua, đi xuyên hay đi vòng? || across (băng qua), through (xuyên qua), round (đi vòng).",
      "Cụm nào cần of? || in front of, out of."
    ],
    questions: [
      mc("q1", "e", "The cat is ___ the table.", ["under", "over", "between"], "under", "vt-vi-tri", "Con mèo ở dưới bàn.", "under = dưới.", "Under nghĩa là ở bên dưới."),
      mc("q2", "e", "Our house is ___ the sea.", ["by", "through", "across"], "by", "vt-vi-tri", "Nhà chúng tôi ở cạnh biển.", "by = cạnh.", "By nghĩa là bên cạnh, rất gần."),
      mc("q3", "e", "A is ___ B and C.", ["between", "behind", "opposite"], "between", "vt-vi-tri", "A ở giữa B và C.", "between ... and ...", "Between dùng khi ở giữa hai người hoặc hai vật."),
      mc("q4", "e", "Sit ___ me. (đối mặt với tôi)", ["opposite", "between", "through"], "opposite", "vt-vi-tri", "Ngồi đối diện tôi.", "opposite = đối diện.", "Opposite nghĩa là đối diện nhau."),
      mc("q5", "e", "The car is ___ the house.", ["in front of", "in front", "front of"], "in front of", "vt-vi-tri", "Chiếc xe ở phía trước ngôi nhà.", "in front of (đủ ba từ).", "In front of cần có of khi theo sau là danh từ."),
      mc("q6", "m", "We jumped ___ the water.", ["into", "through", "along"], "into", "vt-chuyen-dong", "Chúng tôi nhảy xuống nước.", "into = vào trong.", "Into diễn tả di chuyển vào bên trong nước."),
      mc("q7", "m", "A man came ___ the house and got into a car.", ["out of", "off", "through"], "out of", "vt-chuyen-dong", "Một người đàn ông bước ra khỏi nhà rồi lên xe.", "out of = ra khỏi.", "Out of nghĩa là ra khỏi một không gian."),
      mc("q8", "m", "The plane flew ___ the mountains.", ["over", "under", "along"], "over", "vt-chuyen-dong", "Máy bay bay qua những ngọn núi.", "over = bay qua phía trên.", "Máy bay đi ở phía trên núi nên dùng over."),
      mc("q9", "m", "The dog swam ___ the river. (sang bờ bên kia)", ["across", "along", "past"], "across", "vt-chuyen-dong", "Con chó bơi sang bờ bên kia sông.", "across = băng qua.", "Across nghĩa là từ bờ này sang bờ kia."),
      mc("q10", "m", "The old road goes ___ the village.", ["through", "over", "off"], "through", "vt-chuyen-dong", "Con đường cũ đi xuyên qua làng.", "through = xuyên qua.", "Con đường đi vào bên trong và ra khỏi làng nên dùng through."),
      mc("q11", "h", "The new road goes ___ the village. (đi vòng ngoài)", ["round", "through", "along"], "round", "vt-chuyen-dong", "Con đường mới đi vòng quanh làng.", "round = đi vòng.", "Đường đi vòng ngoài làng nên dùng round (around)."),
      mc("q12", "h", "They walked ___ me without speaking.", ["past", "across", "through"], "past", "vt-chuyen-dong", "Họ đi ngang qua tôi mà không nói gì.", "past = đi ngang qua.", "Past nghĩa là đi ngang qua một người hay vật."),
      mc("q13", "h", "Be careful! Don't fall ___ your bike.", ["off", "down", "out"], "off", "vt-chuyen-dong", "Cẩn thận! Đừng ngã khỏi xe đạp.", "fall off.", "Fall off nghĩa là rơi khỏi một vật (xe đạp, ghế)."),
      mc("q14", "h", "Don't put your feet ___ the table.", ["on", "in", "at"], "on", "vt-chuyen-dong", "Đừng gác chân lên bàn.", "on = lên trên bề mặt.", "Đặt lên bề mặt bàn dùng on."),
      mc("q15", "h", "The pictures are ___ the shelves. (cao hơn)", ["above", "below", "between"], "above", "vt-vi-tri", "Những bức tranh ở phía trên các kệ.", "above = cao hơn.", "Above nghĩa là ở vị trí cao hơn một vật khác.")
    ]
  });

  window.GRAMMAR.push({
    id: "prepositions-other", cefr: "B1",
    title: "Giới từ đi kèm: on, at, by, with, about; tính từ và động từ + giới từ",
    summary: "Những giới từ phải học theo cụm: afraid of, good at, listen to, wait for.",
    formula: "tính từ / động từ + giới từ cố định · giới từ + V-ing",
    see: ["prepositions", "gerund-infinitive", "phrasal-verbs"],
    selfWrite: [
      ["Viết một câu về điều bạn giỏi hoặc quan tâm (good at / interested in).", "I'm good at cooking and interested in photography."],
      ["Viết một câu với listen to / wait for / look for.", "I always listen to music on my way to work."]
    ],
    sections: [
      {
        heading: "1. on, at, by, with, about",
        body: "On: on holiday, on TV, on the radio, on the phone, on fire, on time. At: at the age of 21, at 50 kilometres an hour, at 100 degrees. By: by car / bus / plane (phương tiện; đi bộ là on foot), a book by Charles Dickens (tác giả). With / without: with friends, without milk, a man with a beard. About: talk / think / hear about, a book / programme about volcanoes.",
        examples: [
          { en: "I spoke to Rachel on the phone.", vi: "Tôi đã nói chuyện với Rachel qua điện thoại." },
          { en: "Jane usually goes to work by bike.", vi: "Jane thường đi làm bằng xe đạp." },
          { en: "Do you know that man with the beard?", vi: "Bạn có biết người đàn ông có râu kia không?" }
        ]
      },
      {
        heading: "2. Tính từ + giới từ",
        body: "Nhiều tính từ đi với giới từ cố định, cần học theo cụm: afraid of, angry with somebody, angry about something, different from, fed up with, full of, good at, interested in, married to, kind / nice to somebody, sorry about / for. Sau giới từ, động từ dùng V-ing: good at telling stories; sorry for not phoning; thank you for helping me; without saying goodbye.",
        table: [
          ["Cụm", "Ví dụ"],
          ["afraid of", "Are you afraid of dogs?"],
          ["good at", "Are you good at maths?"],
          ["interested in", "I'm not interested in sport."],
          ["angry with (người)", "Why are you angry with me?"],
          ["full of", "The room was full of people."]
        ],
        examples: [
          { en: "I'm not very good at telling stories.", vi: "Tôi không giỏi kể chuyện lắm." },
          { en: "Thank you for helping me.", vi: "Cảm ơn bạn đã giúp tôi." },
          { en: "Tom left without saying goodbye.", vi: "Tom rời đi mà không nói lời chào." }
        ]
      },
      {
        heading: "3. Động từ + giới từ",
        body: "Một số động từ đi với giới từ: ask for, belong to, listen to, talk / speak to somebody about, thank somebody for, think about / of, wait for, depend on. Look at (nhìn), look for (tìm), look after (chăm sóc). Không dùng giới từ với call, phone, text, email somebody.",
        examples: [
          { en: "Wait for me. I'm nearly ready.", vi: "Chờ tôi với. Tôi sắp xong rồi." },
          { en: "She's lost her key. She's looking for it.", vi: "Cô ấy làm mất chìa khóa. Cô ấy đang tìm nó." },
          { en: "It depends on the restaurant.", vi: "Còn tùy nhà hàng." }
        ]
      }
    ],
    walk: [
      w("I'm interested in learning English.", "Tôi quan tâm đến việc học tiếng Anh.", "interested in + V-ing."),
      w("Listen to this song.", "Hãy nghe bài hát này.", "Listen luôn đi với to."),
      w("I have to phone my parents.", "Tôi phải gọi điện cho bố mẹ.", "Phone somebody không có giới từ.")
    ],
    mistakes: [
      x("I'm afraid from dogs.", "I'm afraid of dogs.", "Afraid đi với of."),
      x("I phoned to my parents.", "I phoned my parents.", "Phone somebody không dùng to."),
      x("Thank you for help me.", "Thank you for helping me.", "Sau giới từ dùng V-ing.")
    ],
    check: [
      "Có thể đoán giới từ không? || Không, hãy học cả cụm: good at, afraid of, interested in...",
      "Sau giới từ là động từ? || Dùng V-ing.",
      "Là phương tiện? || by + phương tiện (by car), on foot.",
      "Tìm kiếm hay nhìn? || look for = tìm. look at = nhìn. look after = chăm sóc."
    ],
    questions: [
      mc("q1", "e", "I spoke to Rachel ___ the phone.", ["on", "by", "in"], "on", "gk-on-at-by", "Tôi đã nói chuyện với Rachel qua điện thoại.", "on the phone.", "Cụm cố định là on the phone."),
      mc("q2", "e", "We watched the news ___ TV.", ["on", "at", "by"], "on", "gk-on-at-by", "Chúng tôi xem tin tức trên TV.", "on TV.", "Cụm cố định là on TV hoặc on the radio."),
      mc("q3", "e", "She goes to work ___ bike.", ["by", "on", "in"], "by", "gk-on-at-by", "Cô ấy đi làm bằng xe đạp.", "by + phương tiện.", "By bike, by car, by bus là cách nói chung về phương tiện."),
      mc("q4", "e", "You can't get there by car. You have to go ___ foot.", ["on", "by", "with"], "on", "gk-on-at-by", "Bạn không đến đó bằng xe hơi được. Bạn phải đi bộ.", "on foot = đi bộ.", "Đi bộ có cụm cố định on foot."),
      mc("q5", "e", "Water boils ___ 100 degrees Celsius.", ["at", "on", "in"], "at", "gk-on-at-by", "Nước sôi ở 100 độ C.", "at + số đo.", "At dùng với nhiệt độ, tốc độ, độ tuổi."),
      mc("q6", "m", "Are you afraid ___ dogs?", ["of", "at", "for"], "of", "gk-tinh-tu", "Bạn có sợ chó không?", "afraid of.", "Afraid luôn đi với of."),
      mc("q7", "m", "I'm not interested ___ sport.", ["in", "on", "at"], "in", "gk-tinh-tu", "Tôi không quan tâm đến thể thao.", "interested in.", "Interested đi với in."),
      mc("q8", "m", "Are you good ___ maths?", ["at", "in", "for"], "at", "gk-tinh-tu", "Bạn có giỏi toán không?", "good at.", "Good đi với at để nói giỏi về lĩnh vực nào."),
      mc("q9", "m", "Why are you angry ___ me?", ["with", "to", "for"], "with", "gk-tinh-tu", "Sao bạn giận tôi?", "angry with + người.", "Giận một người dùng angry with; giận chuyện gì dùng angry about."),
      mc("q10", "m", "Listen ___ this music.", ["to", "at", "for"], "to", "gk-dong-tu", "Hãy nghe bản nhạc này.", "listen to.", "Listen luôn đi với to."),
      mc("q11", "h", "Thank you ___ helping me.", ["for", "to", "about"], "for", "gk-ving", "Cảm ơn bạn đã giúp tôi.", "thank somebody for + V-ing.", "Thank you for + V-ing là cấu trúc cảm ơn."),
      mc("q12", "h", "Wait ___ me. I'm nearly ready.", ["for", "to", "at"], "for", "gk-dong-tu", "Chờ tôi với. Tôi gần xong rồi.", "wait for.", "Wait luôn đi với for."),
      mc("q13", "h", "She's lost her key. She's looking ___ it.", ["for", "at", "after"], "for", "gk-dong-tu", "Cô ấy làm mất chìa khóa. Cô ấy đang tìm nó.", "look for = tìm.", "Look for nghĩa là tìm kiếm."),
      mc("q14", "h", "A: Do you like eating in restaurants? B: It depends ___ the restaurant.", ["on", "of", "from"], "on", "gk-dong-tu", "Tùy vào nhà hàng.", "depend on.", "Depend luôn đi với on."),
      mc("q15", "h", "Tom left ___ saying goodbye.", ["without", "with", "for"], "without", "gk-ving", "Tom rời đi mà không nói lời chào.", "without + V-ing.", "Without + V-ing nghĩa là không làm việc gì khi làm việc khác.")
    ]
  });
})();
