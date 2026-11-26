/* Ngữ pháp bổ sung theo giáo trình Essential Grammar in Use (5/6): điều kiện loại 2, bị động nâng cao, giới từ thời gian. */
(function () {
  var mc = function (id, lv, q, o, a, tag, vi, ex, deep) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: ex, tag: tag, vi: vi, deep: deep }; };
  var fl = function (id, lv, q, a, tag, vi, ex, deep) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: ex, tag: tag, vi: vi, deep: deep }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "dk2-hinh-thuc": "If + quá khứ, would + V",
    "dk2-so-sanh": "Phân biệt điều kiện loại 1 và loại 2",
    "dk2-were": "If I were you...",
    "bd2-being": "is / are being + V3 (đang được)",
    "bd2-been": "has / have been + V3 (đã được)",
    "bd2-so-sanh": "Bị động: đơn, tiếp diễn hay hoàn thành",
    "gt-tu-den": "from ... to, until, since, for",
    "gt-truoc-sau": "before, after, during, while",
    "gt-ving-sau": "before / after + V-ing"
  });
  window.GRAMMAR = window.GRAMMAR || [];

  window.GRAMMAR.push({
    id: "conditional-2", cefr: "B1",
    title: "Câu điều kiện loại 2: If I had..., I would...",
    summary: "Nói điều không có thật hoặc khó xảy ra ở hiện tại.",
    formula: "If + quá khứ đơn, S + would / could + V",
    see: ["conditionals", "might-may"],
    selfWrite: [
      ["Viết một câu về điều bạn sẽ làm nếu trúng số (If I won the lottery...).", "If I won the lottery, I would travel around the world."],
      ["Viết một lời khuyên bằng If I were you...", "If I were you, I would study a little every day."]
    ],
    sections: [
      {
        heading: "1. Hình thức và ý nghĩa",
        body: "Điều kiện loại 2 nói về tình huống không có thật ở hiện tại hoặc rất khó xảy ra. Vế if dùng quá khứ đơn nhưng nghĩa là hiện tại; vế chính dùng would + động từ nguyên mẫu. Ví dụ: Dan không có tiền nên không mua xe, nhưng nếu có tiền, anh ấy sẽ mua: If he had the money, he would buy a fast car. Có thể đảo hai vế: He would buy a car if he had the money. Rút gọn: I'd, she'd, they'd = would.",
        examples: [
          { en: "If he had the money, he would buy a fast car.", vi: "Nếu có tiền, anh ấy sẽ mua một chiếc xe nhanh." },
          { en: "I don't know the answer. If I knew, I'd tell you.", vi: "Tôi không biết đáp án. Nếu biết, tôi sẽ nói cho bạn." },
          { en: "I'd help you if I could, but I can't.", vi: "Tôi sẽ giúp bạn nếu có thể, nhưng tôi không thể." }
        ]
      },
      {
        heading: "2. Loại 1 và loại 2 khác nhau thế nào",
        body: "Loại 1 (if + hiện tại, will + V) nói điều có khả năng thật: If I have time, I'll go today. Loại 2 (if + quá khứ, would + V) nói điều không có thật bây giờ: If I had time, I would go today (nhưng thực tế tôi không có thời gian).",
        table: [
          ["Loại", "Cấu trúc", "Ví dụ"],
          ["Loại 1 (có thể thật)", "if + hiện tại, will + V", "If it isn't too expensive, I'll buy it."],
          ["Loại 2 (không thật)", "if + quá khứ, would + V", "I'd buy it if it wasn't so expensive."]
        ],
        examples: [
          { en: "If I have time, I'll go today.", vi: "Nếu có thời gian, hôm nay tôi sẽ đi." },
          { en: "If I had time, I would go today.", vi: "Giá mà tôi có thời gian thì hôm nay tôi đã đi (nhưng tôi không có)." }
        ]
      },
      {
        heading: "3. If I were you...",
        body: "Với I, he, she, it trong vế if có thể dùng was hoặc were, nhưng were trang trọng hơn và rất hay dùng trong lời khuyên: If I were you, I wouldn't go there (Nếu tôi là bạn, tôi sẽ không đi chỗ đó). Câu hỏi: What would you do if you won a million pounds?",
        examples: [
          { en: "I wouldn't go there if I were you.", vi: "Nếu tôi là bạn, tôi sẽ không đến đó." },
          { en: "What would Tom do if he were here?", vi: "Tom sẽ làm gì nếu anh ấy ở đây?" },
          { en: "If you didn't have a job, what would you do?", vi: "Nếu bạn không có việc, bạn sẽ làm gì?" }
        ]
      }
    ],
    walk: [
      w("If I had a car, I would drive to work.", "Nếu có xe, tôi sẽ lái xe đi làm.", "Hiện tại tôi không có xe; vế if dùng quá khứ (had), vế chính dùng would."),
      w("I'd tell you if I knew.", "Tôi sẽ nói cho bạn nếu tôi biết.", "Knew là quá khứ nhưng nghĩa hiện tại: tôi không biết."),
      w("If I were you, I'd stay at home.", "Nếu tôi là bạn, tôi sẽ ở nhà.", "Were dùng cho mọi ngôi trong lời khuyên.")
    ],
    mistakes: [
      x("If I would have time, I would go.", "If I had time, I would go.", "Vế if không dùng would."),
      x("If I had time, I will go.", "If I had time, I would go.", "Vế chính phải dùng would, không dùng will."),
      x("If I am you, I would go.", "If I were you, I would go.", "Giả định dùng were, không dùng am.")
    ],
    check: [
      "Điều kiện có thật hay không có thật? || Có thể thật → loại 1 (hiện tại, will). Không thật bây giờ → loại 2 (quá khứ, would).",
      "Vế if dùng thì nào? || Quá khứ đơn (had, knew, lived), dù nghĩa là hiện tại.",
      "Vế chính dùng gì? || would (could / might) + động từ nguyên mẫu.",
      "Lời khuyên? || If I were you, I would..."
    ],
    questions: [
      mc("q1", "e", "If I had a car, I ___ drive to work.", ["would", "will", "am"], "would", "dk2-hinh-thuc", "Nếu có xe, tôi sẽ lái xe đi làm.", "Vế chính: would + V.", "Điều kiện không có thật nên vế chính dùng would."),
      mc("q2", "e", "If he ___ the money, he would buy a fast car.", ["had", "has", "have"], "had", "dk2-hinh-thuc", "Nếu có tiền, anh ấy sẽ mua xe nhanh.", "Vế if: quá khứ đơn had.", "Vế if của loại 2 dùng quá khứ đơn (had) dù nghĩa là hiện tại."),
      mc("q3", "e", "I would help you if I ___.", ["could", "can", "will"], "could", "dk2-hinh-thuc", "Tôi sẽ giúp bạn nếu tôi có thể.", "can → could trong vế if.", "Trong vế if loại 2, can đổi thành could."),
      mc("q4", "e", "If we ___ more time, we would visit the museum.", ["had", "have", "will have"], "had", "dk2-hinh-thuc", "Nếu có thêm thời gian, chúng tôi sẽ đi thăm bảo tàng.", "if + had.", "Vế if dùng quá khứ đơn had."),
      mc("q5", "e", "She wouldn't be happy if she ___ in the country.", ["lived", "lives", "live"], "lived", "dk2-hinh-thuc", "Cô ấy sẽ không hạnh phúc nếu sống ở nông thôn.", "if + quá khứ đơn.", "Vế if dùng quá khứ đơn lived."),
      mc("q6", "m", "If you didn't have a job, what ___ you do?", ["would", "will", "did"], "would", "dk2-hinh-thuc", "Nếu bạn không có việc làm, bạn sẽ làm gì?", "Câu hỏi loại 2: what would you do?", "Câu hỏi dùng would. Vế if có didn't have nên đây là loại 2."),
      mc("q7", "m", "'If I have time, I'll go.' nghĩa là gì?", ["Có thể tôi sẽ có thời gian", "Tôi không có thời gian", "Tôi đã có thời gian"], "Có thể tôi sẽ có thời gian", "dk2-so-sanh", "Nếu tôi có thời gian, tôi sẽ đi (có thể thật).", "Loại 1: khả năng thật.", "Điều kiện loại 1 nói về khả năng có thật. Loại 2 mới nói về điều không có thật."),
      mc("q8", "m", "If I ___ you, I wouldn't go there.", ["were", "am", "will be"], "were", "dk2-were", "Nếu tôi là bạn, tôi sẽ không đến đó.", "If I were you.", "Giả định dùng were. Cụm If I were you rất hay dùng để khuyên."),
      mc("q9", "m", "I'd buy that jacket if it ___ so expensive.", ["wasn't", "isn't", "won't be"], "wasn't", "dk2-hinh-thuc", "Tôi sẽ mua chiếc áo đó nếu nó không đắt thế.", "Hiện tại nó đắt nên dùng quá khứ trong vế if.", "Thực tế chiếc áo đắt (nên không mua), vế if dùng quá khứ wasn't."),
      mc("q10", "m", "If it ___ raining, we would go out.", ["stopped", "stops", "stop"], "stopped", "dk2-hinh-thuc", "Nếu trời tạnh mưa, chúng tôi sẽ ra ngoài.", "if + quá khứ.", "Hiện tại trời đang mưa, giả định ngược lại nên dùng quá khứ stopped."),
      mc("q11", "h", "'I don't know the answer.' → If I ___ the answer, I'd tell you.", ["knew", "know", "would know"], "knew", "dk2-hinh-thuc", "Nếu tôi biết đáp án, tôi sẽ nói cho bạn.", "if + knew.", "Vế if dùng quá khứ đơn knew, không dùng would."),
      mc("q12", "h", "Câu nào đúng?", ["If I had time, I would go today.", "If I would have time, I would go today.", "If I had time, I will go today."], "If I had time, I would go today.", "dk2-hinh-thuc", "Nếu có thời gian, hôm nay tôi sẽ đi.", "if + quá khứ, would + V.", "Vế if không dùng would; vế chính không dùng will."),
      mc("q13", "h", "Câu nào là điều kiện loại 2 (không có thật)?", ["If I had a million dollars, I'd buy a house.", "If I have time, I'll call you.", "If it rains, we'll stay home."], "If I had a million dollars, I'd buy a house.", "dk2-so-sanh", "Câu nào nói điều không có thật?", "Quá khứ + would = loại 2.", "Có một triệu đô là điều khó xảy ra nên dùng loại 2 (had, would). Hai câu còn lại là loại 1."),
      fl("q14", "h", "I'd help you if I ___, but I can't. (can)", ["could"], "dk2-hinh-thuc", "Tôi sẽ giúp bạn nếu tôi có thể, nhưng tôi không thể.", "can → could.", "Vế if loại 2 dùng could thay cho can."),
      mc("q15", "h", "Câu nào đúng?", ["What would Tom do if he were here?", "What will Tom do if he were here?", "What would Tom do if he will be here?"], "What would Tom do if he were here?", "dk2-were", "Tom sẽ làm gì nếu anh ấy ở đây?", "would ... if + were.", "Giả định (anh ấy không có ở đây) nên vế chính dùng would, vế if dùng were.")
    ]
  });

  window.GRAMMAR.push({
    id: "passive-2", cefr: "B1",
    title: "Bị động nâng cao: is being done, has been done",
    summary: "Nói việc đang được làm và việc đã được làm xong.",
    formula: "am / is / are being + V3 · has / have been + V3",
    see: ["passive", "present-perfect", "verb-forms"],
    selfWrite: [
      ["Viết một câu bị động nói việc gì đang được làm gần nhà bạn (is / are being...).", "A new road is being built near my house."],
      ["Viết một câu bị động nói việc đã được làm xong (has / have been...).", "My phone has been repaired."]
    ],
    sections: [
      {
        heading: "1. am / is / are being + V3 (đang được)",
        body: "Dùng khi hành động đang diễn ra và người làm không quan trọng. Chủ động: Somebody is painting the door. Bị động: The door is being painted. Chú ý: so sánh hiện tại tiếp diễn bị động (The office is being cleaned at the moment) và hiện tại đơn bị động (The office is cleaned every day).",
        examples: [
          { en: "My car is being repaired.", vi: "Xe tôi đang được sửa." },
          { en: "Some new houses are being built opposite the park.", vi: "Vài ngôi nhà mới đang được xây đối diện công viên." },
          { en: "The office is cleaned every day.", vi: "Văn phòng được dọn mỗi ngày." }
        ]
      },
      {
        heading: "2. has / have been + V3 (đã được)",
        body: "Dùng khi việc đã xảy ra trước bây giờ và còn kết quả. Chủ động: Somebody has painted the door. Bị động: The door has been painted. Câu hỏi: Has this shirt been washed? Phủ định: I haven't been invited.",
        examples: [
          { en: "My key has been stolen.", vi: "Chìa khóa của tôi đã bị lấy cắp." },
          { en: "I haven't been invited to the party.", vi: "Tôi chưa được mời đến bữa tiệc." },
          { en: "Has this shirt been washed?", vi: "Cái áo này đã được giặt chưa?" }
        ]
      },
      {
        heading: "3. Chọn đúng thì bị động",
        body: "Quá khứ đơn bị động khi có mốc thời gian đã qua: My keys were stolen last week. Hiện tại hoàn thành bị động khi nói kết quả hiện tại và không có mốc thời gian: The room has been cleaned (nên nó sạch). Đang diễn ra thì dùng being.",
        table: [
          ["Thì", "Cấu trúc", "Ví dụ"],
          ["hiện tại đơn", "am / is / are + V3", "The office is cleaned every day."],
          ["hiện tại tiếp diễn", "am / is / are being + V3", "The office is being cleaned now."],
          ["hiện tại hoàn thành", "has / have been + V3", "The office has been cleaned."],
          ["quá khứ đơn", "was / were + V3", "The office was cleaned yesterday."]
        ],
        examples: [
          { en: "The room has been cleaned. It isn't dirty any more.", vi: "Phòng đã được dọn. Nó không còn bẩn nữa." },
          { en: "The room was cleaned yesterday.", vi: "Phòng được dọn hôm qua." }
        ]
      }
    ],
    walk: [
      w("Some houses are being built near the park.", "Vài ngôi nhà đang được xây gần công viên.", "Are being built = đang được xây."),
      w("My bag has been stolen.", "Túi của tôi bị lấy cắp rồi.", "Has been stolen = đã bị lấy; kết quả còn ở hiện tại."),
      w("My keys were stolen last week.", "Tuần trước chìa khóa của tôi bị lấy cắp.", "Có last week nên dùng quá khứ đơn bị động.")
    ],
    mistakes: [
      x("The window is been repaired.", "The window is being repaired.", "Đang diễn ra dùng being, không dùng been."),
      x("My bag have been stolen.", "My bag has been stolen.", "Bag là số ít nên dùng has."),
      x("My keys have been stolen last week.", "My keys were stolen last week.", "Có last week nên dùng quá khứ đơn.")
    ],
    check: [
      "Việc đang diễn ra hay đã xong? || Đang diễn ra → is / are being + V3. Đã xong, còn kết quả → has / have been + V3.",
      "Có mốc thời gian đã qua không? || Có → was / were + V3.",
      "Thói quen, sự thật? || am / is / are + V3.",
      "Chủ ngữ số ít hay nhiều? || has / is cho số ít, have / are cho số nhiều."
    ],
    questions: [
      mc("q1", "e", "My car is at the garage. It ___ repaired.", ["is being", "has", "is"], "is being", "bd2-being", "Xe tôi đang ở gara. Nó đang được sửa.", "Đang diễn ra: is being + V3.", "Việc sửa đang diễn ra nên dùng is being repaired."),
      mc("q2", "e", "Some new houses ___ built opposite the park. (đang xây)", ["are being", "are", "have"], "are being", "bd2-being", "Vài ngôi nhà mới đang được xây đối diện công viên.", "are being + V3.", "Houses là số nhiều và đang được xây nên dùng are being built."),
      mc("q3", "e", "My keys have ___ stolen.", ["been", "be", "being"], "been", "bd2-been", "Chìa khóa của tôi đã bị lấy cắp.", "have been + V3.", "Hiện tại hoàn thành bị động có dạng have been + V3."),
      mc("q4", "e", "The door is ___ painted now. (đang sơn)", ["being", "been", "be"], "being", "bd2-being", "Cánh cửa đang được sơn.", "is being painted.", "Now cho thấy đang diễn ra nên dùng is being."),
      mc("q5", "e", "I haven't ___ invited to the party.", ["been", "be", "being"], "been", "bd2-been", "Tôi chưa được mời đến bữa tiệc.", "haven't been + V3.", "Phủ định hiện tại hoàn thành bị động: haven't been invited."),
      mc("q6", "m", "The office ___ cleaned every day. (thói quen)", ["is", "is being", "has been"], "is", "bd2-so-sanh", "Văn phòng được dọn mỗi ngày.", "Thói quen: is + V3.", "Every day cho thấy thói quen nên dùng hiện tại đơn bị động."),
      mc("q7", "m", "The office ___ cleaned at the moment.", ["is being", "is", "was"], "is being", "bd2-so-sanh", "Văn phòng đang được dọn.", "At the moment: is being.", "At the moment cho thấy việc đang diễn ra nên dùng is being cleaned."),
      mc("q8", "m", "Has this shirt ___ washed?", ["been", "be", "being"], "been", "bd2-been", "Cái áo này đã được giặt chưa?", "Has + S + been + V3.", "Câu hỏi hiện tại hoàn thành bị động."),
      mc("q9", "m", "My keys ___ stolen last week.", ["were", "have been", "are being"], "were", "bd2-so-sanh", "Tuần trước chìa khóa của tôi bị lấy cắp.", "Mốc quá khứ: was / were.", "Last week là mốc quá khứ nên dùng quá khứ đơn bị động."),
      mc("q10", "m", "The room isn't dirty any more. It ___ cleaned.", ["has been", "was", "is being"], "has been", "bd2-so-sanh", "Phòng không còn bẩn nữa. Nó đã được dọn.", "Kết quả hiện tại: has been.", "Kết quả hiện tại (không còn bẩn) và không có mốc thời gian nên dùng has been cleaned."),
      mc("q11", "h", "Câu nào đúng?", ["The window is being repaired.", "The window is been repaired.", "The window being repaired."], "The window is being repaired.", "bd2-being", "Cửa sổ đang được sửa.", "is being + V3.", "Được sửa đang diễn ra nên cần is being. Câu hai dùng sai been, câu ba thiếu động từ to be."),
      mc("q12", "h", "Câu nào đúng?", ["My bag has been stolen.", "My bag is been stolen.", "My bag have been stolen."], "My bag has been stolen.", "bd2-been", "Túi của tôi bị lấy cắp rồi.", "has been + V3.", "My bag số ít nên dùng has been stolen."),
      mc("q13", "h", "Câu nào đúng?", ["Some new houses are being built opposite the park.", "Some new houses is being built opposite the park.", "Some new houses are build opposite the park."], "Some new houses are being built opposite the park.", "bd2-being", "Vài ngôi nhà mới đang được xây đối diện công viên.", "are being built.", "Houses số nhiều nên dùng are being built; built là V3 của build."),
      fl("q14", "h", "These rooms ___ cleaned every day. (is / are)", ["are"], "bd2-so-sanh", "Những phòng này được dọn mỗi ngày.", "Số nhiều: are cleaned.", "Rooms là số nhiều nên dùng are. Every day cho thấy hiện tại đơn bị động."),
      mc("q15", "h", "Câu nào là bị động hiện tại hoàn thành?", ["My key has been stolen.", "My key is being stolen.", "Somebody has stolen my key."], "My key has been stolen.", "bd2-been", "Chìa khóa của tôi đã bị lấy cắp.", "has been + V3.", "Has been stolen là bị động. Somebody has stolen my key là chủ động.")
    ]
  });

  window.GRAMMAR.push({
    id: "prepositions-time-2", cefr: "A2",
    title: "Giới từ thời gian: from, until, since, for, before, after, during, while",
    summary: "Nói bắt đầu từ lúc nào, kéo dài bao lâu, trước hay sau việc gì.",
    formula: "from ... to / until · since + mốc · for + khoảng · during + danh từ · while + mệnh đề",
    see: ["prepositions", "present-perfect", "connectors-time-words"],
    selfWrite: [
      ["Viết một câu về khoảng thời gian bạn đã học tiếng Anh (for / since).", "I have been learning English for two years."],
      ["Viết một câu có before hoặc after + V-ing về thói quen hằng ngày của bạn.", "I always brush my teeth before going to bed."]
    ],
    sections: [
      {
        heading: "1. from ... to, until, since, for",
        body: "From ... to / until nói khoảng thời gian có bắt đầu và kết thúc: We lived in Japan from 2003 to 2010. Until (till) = cho đến khi: Wait here until I come back. Since + mốc thời gian (từ lúc nào đến bây giờ) đi với hiện tại hoàn thành: He has been in hospital since Monday. For + khoảng thời gian (bao lâu): He has been in hospital for three days.",
        table: [
          ["", "Ví dụ"],
          ["from ... to", "I work from Monday to Friday."],
          ["until", "I read until 3 o'clock."],
          ["since + mốc", "since Monday, since 2010"],
          ["for + khoảng", "for three days, for ten years"]
        ],
        examples: [
          { en: "Wait here until I come back.", vi: "Chờ ở đây cho đến khi tôi quay lại." },
          { en: "We have lived in Canada since 2010.", vi: "Chúng tôi sống ở Canada từ năm 2010." },
          { en: "I'm going away for a few weeks.", vi: "Tôi sẽ đi xa vài tuần." }
        ]
      },
      {
        heading: "2. before, after, during, while",
        body: "Before = trước, after = sau, đi với danh từ (before the film) hoặc mệnh đề (before we played). During + danh từ (during the film); while + mệnh đề (while I'm reading). Không dùng during trước khoảng thời gian cụ thể (for two hours, không phải during two hours).",
        examples: [
          { en: "I fell asleep during the film.", vi: "Tôi ngủ gật trong lúc xem phim." },
          { en: "I often fall asleep while I'm reading.", vi: "Tôi hay ngủ gật khi đang đọc sách." },
          { en: "We played tennis for two hours.", vi: "Chúng tôi chơi quần vợt hai tiếng." }
        ]
      },
      {
        heading: "3. before / after + V-ing",
        body: "Sau before và after có thể dùng V-ing (không dùng to + V): before going, after doing the shopping. Cùng chủ ngữ thì thường gọn hơn khi dùng V-ing: I always have breakfast before going to work.",
        examples: [
          { en: "I always have breakfast before going to work.", vi: "Tôi luôn ăn sáng trước khi đi làm." },
          { en: "After doing the shopping, they went home.", vi: "Sau khi mua sắm xong, họ về nhà." }
        ]
      }
    ],
    walk: [
      w("He has been in hospital for three days.", "Anh ấy nằm viện ba ngày rồi.", "Three days là khoảng thời gian nên dùng for."),
      w("I fell asleep during the film.", "Tôi ngủ gật trong lúc xem phim.", "During + danh từ (the film)."),
      w("Before eating, I washed my hands.", "Trước khi ăn, tôi rửa tay.", "Before + V-ing.")
    ],
    mistakes: [
      x("I lived in London during a year.", "I lived in London for a year.", "Khoảng thời gian cụ thể dùng for, không dùng during."),
      x("We didn't speak during we were eating.", "We didn't speak while we were eating.", "Trước mệnh đề dùng while."),
      x("Before to eat, I washed my hands.", "Before eating, I washed my hands.", "Sau before dùng V-ing, không dùng to V.")
    ],
    check: [
      "Sau chỗ trống là mốc thời gian hay khoảng thời gian? || Mốc → since. Khoảng → for.",
      "Sau chỗ trống là danh từ hay mệnh đề? || Danh từ → during. Mệnh đề (có chủ ngữ và động từ) → while.",
      "Có cần cho đến khi không? || until (till).",
      "Sau before / after là động từ? || Dùng V-ing."
    ],
    questions: [
      mc("q1", "e", "We lived in Japan ___ 2003 to 2010.", ["from", "since", "for"], "from", "gt-tu-den", "Chúng tôi sống ở Nhật từ 2003 đến 2010.", "from ... to.", "Cặp from ... to nói điểm bắt đầu và điểm kết thúc."),
      mc("q2", "e", "Wait here ___ I come back.", ["until", "during", "since"], "until", "gt-tu-den", "Chờ ở đây cho đến khi tôi quay lại.", "until = cho đến khi.", "Until nối với một mệnh đề để chỉ thời điểm kết thúc."),
      mc("q3", "e", "Joe has been in hospital ___ Monday.", ["since", "for", "from"], "since", "gt-tu-den", "Joe nằm viện từ thứ Hai đến giờ.", "since + mốc thời gian.", "Monday là mốc thời gian nên dùng since."),
      mc("q4", "e", "He has been there ___ three days.", ["for", "since", "during"], "for", "gt-tu-den", "Anh ấy ở đó ba ngày rồi.", "for + khoảng thời gian.", "Three days là khoảng thời gian nên dùng for."),
      mc("q5", "e", "Everybody feels nervous ___ exams.", ["before", "during", "while"], "before", "gt-truoc-sau", "Ai cũng thấy lo trước các kỳ thi.", "before + danh từ.", "Before nghĩa là trước, đi với danh từ exams."),
      mc("q6", "m", "I fell asleep ___ the film.", ["during", "while", "for"], "during", "gt-truoc-sau", "Tôi ngủ gật trong lúc xem phim.", "during + danh từ.", "The film là danh từ nên dùng during."),
      mc("q7", "m", "I often fall asleep ___ I'm reading.", ["while", "during", "for"], "while", "gt-truoc-sau", "Tôi hay ngủ gật khi đang đọc sách.", "while + mệnh đề.", "I'm reading là một mệnh đề nên dùng while."),
      mc("q8", "m", "We played tennis ___ two hours.", ["for", "during", "while"], "for", "gt-truoc-sau", "Chúng tôi chơi quần vợt hai tiếng.", "for + khoảng thời gian.", "Two hours là khoảng thời gian cụ thể nên dùng for."),
      mc("q9", "m", "Don't forget to close the window ___ you go out.", ["before", "during", "for"], "before", "gt-truoc-sau", "Đừng quên đóng cửa sổ trước khi bạn ra ngoài.", "before + mệnh đề.", "Việc đóng cửa xảy ra trước khi ra ngoài nên dùng before."),
      mc("q10", "m", "They went home ___ they did the shopping.", ["after", "during", "while"], "after", "gt-truoc-sau", "Họ về nhà sau khi đi mua sắm.", "after + mệnh đề.", "Về nhà xảy ra sau việc mua sắm nên dùng after."),
      mc("q11", "h", "I always have breakfast before ___ to work. (go)", ["going", "to go", "go"], "going", "gt-ving-sau", "Tôi luôn ăn sáng trước khi đi làm.", "before + V-ing.", "Sau before dùng V-ing: before going."),
      fl("q12", "h", "After ___ the shopping, they went home. (do)", ["doing"], "gt-ving-sau", "Sau khi mua sắm, họ về nhà.", "after + V-ing.", "Sau after dùng V-ing: after doing the shopping."),
      mc("q13", "h", "They're going away tomorrow. They'll be away ___ Friday.", ["until", "since", "for"], "until", "gt-tu-den", "Họ sẽ đi xa vào ngày mai. Họ sẽ đi cho đến thứ Sáu.", "until + mốc kết thúc.", "Until nói đến thời điểm kết thúc trong tương lai."),
      mc("q14", "h", "We didn't speak ___ we were eating.", ["while", "during", "for"], "while", "gt-truoc-sau", "Chúng tôi không nói chuyện khi đang ăn.", "while + mệnh đề.", "We were eating là mệnh đề nên dùng while. Nếu theo sau là danh từ (the meal) thì dùng during."),
      mc("q15", "h", "Câu nào đúng?", ["I lived in London for a year.", "I lived in London during a year.", "I lived in London since a year."], "I lived in London for a year.", "gt-tu-den", "Tôi đã sống ở London một năm.", "for + khoảng thời gian.", "A year là khoảng thời gian nên dùng for. During và since không hợp trong câu này.")
    ]
  });
})();
