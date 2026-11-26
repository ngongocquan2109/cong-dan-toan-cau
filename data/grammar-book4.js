/* Ngữ pháp bổ sung theo giáo trình Essential Grammar in Use (4/6): this / that / one, all / most / both, trật tự từ, there và it. */
(function () {
  var mc = function (id, lv, q, o, a, tag, vi, ex, deep) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: ex, tag: tag, vi: vi, deep: deep }; };
  var fl = function (id, lv, q, a, tag, vi, ex, deep) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: ex, tag: tag, vi: vi, deep: deep }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "this-that": "this / that / these / those",
    "one-ones": "one và ones",
    "all-every": "every, all, everybody, everything",
    "all-most": "all / most / some + danh từ hoặc of the",
    "both-either": "both, either, neither",
    "tt-vitri": "Vị trí tân ngữ, nơi chốn, thời gian",
    "tt-trang-tu": "always, usually, never đứng ở đâu",
    "tt-give": "give something to somebody",
    "there-qk": "There was / There has been / There will be",
    "it-thoi-gian": "It dùng cho giờ, ngày, thời tiết, khoảng cách"
  });
  window.GRAMMAR = window.GRAMMAR || [];

  window.GRAMMAR.push({
    id: "this-that-one", cefr: "A1",
    title: "this, that, these, those và one, ones",
    summary: "Chỉ vật ở gần hay xa, và dùng one / ones để khỏi lặp danh từ.",
    formula: "this / these (gần) · that / those (xa) · one (số ít) / ones (số nhiều)",
    see: ["pronouns", "adjectives-adverbs"],
    selfWrite: [
      ["Viết một câu giới thiệu một người bạn bằng This is...", "This is my friend, Lan."],
      ["Viết một câu có one hoặc ones để chọn giữa hai món đồ.", "I like the blue one more than the red one."]
    ],
    sections: [
      {
        heading: "1. this, that, these, those",
        body: "This (số ít, gần) và these (số nhiều, gần) chỉ vật ở gần người nói. That (số ít, xa) và those (số nhiều, xa) chỉ vật ở xa. Có thể đứng trước danh từ (this picture, those girls) hoặc đứng một mình (Who's that?).",
        table: [
          ["", "số ít", "số nhiều"],
          ["gần", "this", "these"],
          ["xa", "that", "those"]
        ],
        examples: [
          { en: "Do you like these shoes?", vi: "Bạn có thích đôi giày này không?" },
          { en: "Those apples look nice.", vi: "Mấy quả táo kia trông ngon quá." },
          { en: "Who's that girl?", vi: "Cô gái kia là ai?" }
        ]
      },
      {
        heading: "2. Cách dùng đặc biệt",
        body: "That có thể chỉ điều vừa xảy ra hoặc lời ai vừa nói: 'I'm sorry I forgot.' 'That's all right.' / 'You're a teacher, aren't you?' 'Yes, that's right.' Khi giới thiệu người, dùng This is...: Ben, this is Chris. Khi gọi điện thoại, người nói tự xưng bằng this (Hi Sarah, this is David) và hỏi người kia bằng that (Is that Sarah?).",
        examples: [
          { en: "Ben, this is Chris.", vi: "Ben, đây là Chris." },
          { en: "Hello, this is David. Is that Sarah?", vi: "A lô, David đây. Có phải Sarah không?" },
          { en: "'I'm sorry I forgot to phone.' 'That's all right.'", vi: "'Xin lỗi tôi quên gọi.' 'Không sao đâu.'" }
        ]
      },
      {
        heading: "3. one và ones",
        body: "One = a / an + danh từ đã biết: I need a pen. Do you have one? One thay cho danh từ số ít, ones thay cho danh từ số nhiều, để không phải lặp lại. Hay gặp: this one / that one, the one on the table, the red ones, which one(s)?. Sau tính từ cũng dùng được: the brown one, some new ones. Không dùng one sau sở hữu cách hoặc sau a lot of.",
        examples: [
          { en: "Which car is yours? This one or that one?", vi: "Xe nào là của bạn? Chiếc này hay chiếc kia?" },
          { en: "I don't like the black coat, but I like the brown one.", vi: "Tôi không thích áo đen nhưng thích cái màu nâu." },
          { en: "My shoes are old. I'm going to buy some new ones.", vi: "Giày tôi cũ rồi. Tôi định mua đôi mới." }
        ]
      }
    ],
    walk: [
      w("Is that Sarah?", "Có phải Sarah đó không? (gọi điện)", "Trên điện thoại, that chỉ người ở đầu dây bên kia."),
      w("Which one do you want?", "Bạn muốn cái nào?", "One thay cho danh từ đã nhắc, tránh lặp lại."),
      w("I like those red ones.", "Tôi thích mấy cái màu đỏ kia.", "Those chỉ vật ở xa, ones thay cho danh từ số nhiều.")
    ],
    mistakes: [
      x("Do you like this shoes?", "Do you like these shoes?", "Shoes là số nhiều nên dùng these."),
      x("This is Sarah? (khi gọi điện)", "Is that Sarah?", "Hỏi người ở đầu dây bên kia dùng that."),
      x("I like the green one shoes.", "I like the green ones.", "Thay cho danh từ số nhiều dùng ones.")
    ],
    check: [
      "Vật ở gần hay xa? || Gần → this / these. Xa → that / those.",
      "Danh từ số ít hay số nhiều? || Số ít → this / that / one. Số nhiều → these / those / ones.",
      "Là gọi điện hay giới thiệu? || Tự xưng và giới thiệu → this is. Hỏi người kia → Is that...?",
      "Có thể thay danh từ đã nhắc bằng one / ones không? || Có, để câu gọn hơn."
    ],
    questions: [
      mc("q1", "e", "___ shoes are nice. (đôi giày ở gần tôi)", ["These", "This", "That"], "These", "this-that", "Đôi giày này đẹp.", "Gần + số nhiều: these.", "Shoes là số nhiều và ở gần người nói nên dùng these."),
      mc("q2", "e", "___ is my pen. (cái ở trong tay tôi)", ["This", "These", "Those"], "This", "this-that", "Đây là bút của tôi.", "Gần + số ít: this.", "Pen là số ít và ở gần nên dùng this."),
      mc("q3", "e", "Look at ___ people over there.", ["those", "these", "this"], "those", "this-that", "Hãy nhìn những người kia.", "Xa + số nhiều: those.", "Over there cho thấy ở xa và people là số nhiều nên dùng those."),
      mc("q4", "e", "Who's ___ girl over there?", ["that", "this", "these"], "that", "this-that", "Cô gái kia là ai?", "Xa + số ít: that.", "Over there cho thấy ở xa, girl là số ít nên dùng that."),
      mc("q5", "e", "Ben, ___ is Chris. (giới thiệu)", ["this", "that", "these"], "this", "this-that", "Ben, đây là Chris.", "Giới thiệu người: this is.", "Khi giới thiệu một người cho người khác, ta nói This is..."),
      mc("q6", "m", "Hi Sarah, ___ is David. (gọi điện)", ["this", "that", "these"], "this", "this-that", "Chào Sarah, David đây.", "Người gọi tự xưng: this is.", "Khi nói điện thoại, người nói dùng this is để nói tên mình."),
      mc("q7", "m", "Is ___ Sarah? (hỏi người ở đầu dây bên kia)", ["that", "this", "these"], "that", "this-that", "Có phải Sarah không?", "Hỏi người kia: Is that...?", "Khi hỏi người ở đầu dây bên kia, ta dùng that."),
      mc("q8", "m", "I need a pen. Do you have ___?", ["one", "ones", "it"], "one", "one-ones", "Tôi cần một cây bút. Bạn có không?", "one = a pen.", "One thay cho a pen, tức là một cây bút bất kỳ. It sẽ chỉ một cây bút cụ thể đã biết."),
      mc("q9", "m", "Which shoes do you want? — The white ___.", ["ones", "one", "its"], "ones", "one-ones", "Bạn muốn đôi giày nào? — Đôi màu trắng.", "Số nhiều: ones.", "Shoes là số nhiều nên dùng ones sau tính từ white."),
      mc("q10", "m", "Which car is yours? This ___ or that ___?", ["one", "ones", "it"], "one", "one-ones", "Xe nào là của bạn? Cái này hay cái kia?", "Số ít: one.", "Car là số ít nên dùng one: this one, that one."),
      mc("q11", "h", "'You're a teacher, aren't you?' 'Yes, ___'s right.'", ["that", "this", "these"], "that", "this-that", "Bạn là giáo viên, đúng không? — Vâng, đúng rồi.", "that = điều bạn vừa nói.", "That dùng để nói về điều ai vừa nói: That's right."),
      mc("q12", "h", "I don't like the black coat, but I like the brown ___.", ["one", "ones", "coat one"], "one", "one-ones", "Tôi không thích áo khoác đen, nhưng thích cái màu nâu.", "Số ít: one.", "Coat là số ít nên dùng the brown one để khỏi lặp lại coat."),
      mc("q13", "h", "My shoes are old. I'm going to buy some new ___.", ["ones", "one", "its"], "ones", "one-ones", "Giày tôi cũ rồi. Tôi sắp mua đôi mới.", "Số nhiều: some new ones.", "Shoes là số nhiều nên dùng ones: some new ones."),
      mc("q14", "h", "Câu nào đúng?", ["Do you like these shoes?", "Do you like this shoes?", "Do you like these shoe?"], "Do you like these shoes?", "this-that", "Bạn có thích đôi giày này không?", "these + danh từ số nhiều.", "These đi với danh từ số nhiều shoes."),
      mc("q15", "h", "'Which hotel did you stay at?' — '___ opposite the station.'", ["The one", "The ones", "This"], "The one", "one-ones", "Bạn đã ở khách sạn nào? — Cái đối diện nhà ga.", "the one + cụm bổ nghĩa.", "The one + cụm giới từ dùng để nói rõ cái nào. Hotel số ít nên dùng the one.")
    ]
  });

  window.GRAMMAR.push({
    id: "all-most-both", cefr: "A2",
    title: "every, all, most, some, both, either, neither",
    summary: "Nói về số lượng người và vật: tất cả, hầu hết, một số, cả hai, không cái nào.",
    formula: "every + số ít · all / most / some + số nhiều · both / either / neither (hai)",
    see: ["quantifiers", "nouns"],
    selfWrite: [
      ["Viết một câu về hầu hết bạn bè của bạn (Most of my friends...).", "Most of my friends live in the city."],
      ["Viết một câu về hai thứ bạn đều thích (Both...).", "I like both tea and coffee."]
    ],
    sections: [
      {
        heading: "1. every, all, everybody, everything",
        body: "Every + danh từ số ít, động từ số ít: Every house in the street is the same. All + danh từ số nhiều nghĩa gần giống: All the houses in the street are the same. Every day = vào mọi ngày; all day = suốt cả ngày. Everybody / everyone (mọi người), everything (mọi thứ), everywhere (mọi nơi) cũng đi với động từ số ít.",
        examples: [
          { en: "Every country has a national flag.", vi: "Nước nào cũng có quốc kỳ." },
          { en: "It rained every day last week.", vi: "Tuần trước ngày nào cũng mưa." },
          { en: "It rained all day yesterday.", vi: "Hôm qua trời mưa suốt cả ngày." }
        ]
      },
      {
        heading: "2. all / most / some / any / no + danh từ, và of",
        body: "Để nói chung chung, đặt all, most, some, any, no trực tiếp trước danh từ, không có of và không có the: Most people drive too fast. Some birds can't fly. Khi nói về nhóm cụ thể thì thêm of + the / this / my / these...: Most of the children at this school are under 11. Nếu theo sau là đại từ, dùng of: most of them, none of us, all of it.",
        examples: [
          { en: "Most children like playing.", vi: "Hầu hết trẻ em thích chơi." },
          { en: "Some of these books are very old.", vi: "Một số quyển sách này rất cũ." },
          { en: "None of my friends live near me.", vi: "Không người bạn nào của tôi sống gần tôi." }
        ]
      },
      {
        heading: "3. both, either, neither",
        body: "Chỉ dùng khi nói về hai người hoặc hai vật. Both = cả hai (both windows). Either = một trong hai, cái nào cũng được (either way). Neither = không cái nào trong hai. Both + danh từ số nhiều; either / neither + danh từ số ít. Có thể nói both of / either of / neither of + the / my / these / them...",
        examples: [
          { en: "Both windows are open.", vi: "Cả hai cửa sổ đều mở." },
          { en: "'Tea or coffee?' 'Either. I don't mind.'", vi: "'Trà hay cà phê?' 'Cái nào cũng được.'" },
          { en: "Neither of my parents is British.", vi: "Cả bố lẫn mẹ tôi đều không phải người Anh." }
        ]
      }
    ],
    walk: [
      w("Everybody needs friends.", "Ai cũng cần bạn bè.", "Everybody đi với động từ số ít (needs)."),
      w("Most of the students passed the exam.", "Hầu hết sinh viên đã đỗ kỳ thi.", "Có the nên cần of: most of the students."),
      w("Neither of us was hungry.", "Cả hai chúng tôi đều không đói.", "Neither of + đại từ, nói về hai người.")
    ],
    mistakes: [
      x("Most of people drive too fast.", "Most people drive too fast.", "Nói chung chung thì không dùng of."),
      x("Everybody have problems.", "Everybody has problems.", "Everybody đi với động từ số ít."),
      x("Both window are open.", "Both windows are open.", "Both đi với danh từ số nhiều.")
    ],
    check: [
      "Nói chung chung hay nhóm cụ thể? || Chung chung → most + danh từ. Cụ thể (the, my, these) → most of the...",
      "Danh từ số ít hay số nhiều? || every, either, neither + số ít. all, most, both + số nhiều.",
      "Có phải chỉ hai thứ không? || Chỉ hai → both, either, neither.",
      "Đi với động từ số ít không? || every, everybody, everything luôn dùng động từ số ít."
    ],
    questions: [
      mc("q1", "e", "___ house in the street is the same.", ["Every", "All", "Both"], "Every", "all-every", "Nhà nào trong phố cũng giống nhau.", "Every + danh từ số ít.", "House là số ít và động từ is là số ít nên dùng every."),
      mc("q2", "e", "___ children like playing.", ["Most", "Most of", "Each"], "Most", "all-most", "Hầu hết trẻ em thích chơi.", "Nói chung chung: most + danh từ.", "Không có the nên không dùng of: most children."),
      mc("q3", "e", "She has two sisters. ___ are married.", ["Both", "Every", "Either"], "Both", "both-either", "Cô ấy có hai chị. Cả hai đã lập gia đình.", "Hai người + số nhiều: both.", "Có hai người, động từ are số nhiều nên dùng both."),
      mc("q4", "e", "Everybody ___ friends.", ["needs", "need", "needing"], "needs", "all-every", "Ai cũng cần bạn bè.", "Everybody + động từ số ít.", "Everybody là số ít về ngữ pháp nên động từ thêm -s."),
      mc("q5", "e", "I looked ___ for my watch.", ["everywhere", "everything", "everybody"], "everywhere", "all-every", "Tôi đã tìm chiếc đồng hồ khắp nơi.", "everywhere = mọi nơi.", "Tìm một vật thì hợp với everywhere (khắp nơi)."),
      mc("q6", "m", "___ of the students passed the exam. (cả lớp)", ["All", "Every", "Each"], "All", "all-most", "Tất cả sinh viên đều đỗ kỳ thi.", "All of the + số nhiều.", "Every không đi với of the + danh từ số nhiều. All of the students là đúng."),
      mc("q7", "m", "'Would you like tea or coffee?' — '___. I don't mind.'", ["Either", "Both", "Neither"], "Either", "both-either", "Bạn muốn trà hay cà phê? — Cái nào cũng được.", "Either = cái nào cũng được.", "I don't mind cho thấy cái nào cũng được nên dùng either."),
      mc("q8", "m", "'Do you want tea or coffee?' — '___. I don't want either.'", ["Neither", "Either", "Both"], "Neither", "both-either", "Bạn muốn trà hay cà phê? — Không cái nào cả.", "Neither = không cái nào.", "Câu sau nói không muốn cái nào nên dùng neither."),
      mc("q9", "m", "Most ___ drive too fast.", ["people", "of people", "the people"], "people", "all-most", "Hầu hết mọi người lái xe quá nhanh.", "Nói chung chung: most + danh từ.", "Không có the và không có of khi nói chung chung."),
      fl("q10", "m", "Some of ___ books are very old. (these)", ["these", "the", "my"], "all-most", "Một số quyển sách này rất cũ.", "some of + these.", "Sau of cần có the, these, my... trước danh từ."),
      mc("q11", "h", "Câu nào đúng?", ["Most people drive too fast.", "Most of people drive too fast.", "Most the people drive too fast."], "Most people drive too fast.", "all-most", "Hầu hết mọi người lái xe quá nhanh.", "Không dùng of khi nói chung chung.", "Nói chung chung thì most đứng trực tiếp trước danh từ, không dùng of."),
      mc("q12", "h", "Neither of my parents ___ British.", ["is", "are", "be"], "is", "both-either", "Cả bố lẫn mẹ tôi đều không phải người Anh.", "Neither of + danh từ: động từ số ít.", "Neither dùng với động từ số ít: is."),
      mc("q13", "h", "You can have some of this cake, but not ___ of it.", ["all", "every", "both"], "all", "all-most", "Bạn có thể ăn một ít bánh này, nhưng đừng ăn hết.", "all of it.", "Sau of it dùng all, most, some, none. Every và both không đi với of it."),
      mc("q14", "h", "It rained ___ day yesterday. (suốt cả ngày)", ["all", "every", "each"], "all", "all-every", "Hôm qua trời mưa suốt cả ngày.", "all day = suốt ngày.", "All day nghĩa là suốt cả ngày. Every day nghĩa là hằng ngày."),
      mc("q15", "h", "Câu nào đúng?", ["Both windows are open.", "Both window are open.", "Both of window are open."], "Both windows are open.", "both-either", "Cả hai cửa sổ đều mở.", "Both + số nhiều.", "Both đi với danh từ số nhiều và động từ số nhiều.")
    ]
  });

  window.GRAMMAR.push({
    id: "word-order", cefr: "A2",
    title: "Trật tự từ: tân ngữ, trạng từ và give somebody something",
    summary: "Đặt từ đúng chỗ: tân ngữ sát động từ, nơi chốn trước thời gian, always / never ở giữa.",
    formula: "S + V + O + nơi chốn + thời gian · always / usually đứng trước động từ chính",
    see: ["adjectives-adverbs", "present-simple", "question-forms"],
    selfWrite: [
      ["Viết một câu có nơi chốn và thời gian (…to… every day / last night).", "I walk to work every day."],
      ["Viết một câu với always / usually / never về thói quen của bạn.", "I never drink coffee in the evening."]
    ],
    sections: [
      {
        heading: "1. Tân ngữ sát động từ; nơi chốn trước thời gian",
        body: "Động từ và tân ngữ thường đứng liền nhau: I like Italian food very much (không nói I like very much Italian food). Nơi chốn (where) thường đứng trước thời gian (when): We went to a party last night. Lisa walks to work every day.",
        examples: [
          { en: "Sue bought some new shoes yesterday.", vi: "Hôm qua Sue mua đôi giày mới." },
          { en: "He speaks English very well.", vi: "Anh ấy nói tiếng Anh rất giỏi." },
          { en: "We arrived at the airport at 7 o'clock.", vi: "Chúng tôi đến sân bay lúc 7 giờ." }
        ]
      },
      {
        heading: "2. always, usually, often, never...",
        body: "Các từ always, usually, often, sometimes, never, rarely, also, already, just, still, all, both đứng giữa câu: trước động từ chính (I always drink coffee), sau am / is / are / was / were (I am always tired), và giữa hai động từ (I will always remember you; Have you ever been to Egypt?).",
        table: [
          ["Vị trí", "Ví dụ"],
          ["trước động từ chính", "Helen often goes to London."],
          ["sau am / is / are", "They are never at home."],
          ["giữa hai động từ", "I can never find my keys."]
        ],
        examples: [
          { en: "Richard is a good footballer. He also plays tennis.", vi: "Richard chơi bóng đá giỏi. Anh ấy cũng chơi quần vợt." },
          { en: "She's always late.", vi: "Cô ấy lúc nào cũng đến muộn." },
          { en: "Do you often go to restaurants?", vi: "Bạn có hay đi nhà hàng không?" }
        ]
      },
      {
        heading: "3. give something to somebody / give somebody something",
        body: "Sau give, lend, pass, send, show (và cả buy, get) có hai cách: give something to somebody (I gave the keys to Sarah) hoặc give somebody something (I gave Sarah the keys). Khi vật là it hoặc them thì thường dùng cách đầu: I gave it to her (không nói I gave her it).",
        examples: [
          { en: "I gave the keys to Sarah. / I gave Sarah the keys.", vi: "Tôi đưa chìa khóa cho Sarah." },
          { en: "Here are the keys. Give them to your father.", vi: "Đây là chìa khóa. Đưa chúng cho bố con." },
          { en: "I'm going to the shop. Can I get you anything?", vi: "Tôi đi cửa hàng đây. Tôi mua gì cho bạn không?" }
        ]
      }
    ],
    walk: [
      w("I like Italian food very much.", "Tôi rất thích đồ ăn Ý.", "Động từ và tân ngữ đứng liền nhau; very much đứng cuối."),
      w("She is always late.", "Cô ấy lúc nào cũng đến muộn.", "Always đứng sau is."),
      w("Give it to me.", "Đưa nó cho tôi.", "Với it, dùng give it to somebody.")
    ],
    mistakes: [
      x("I like very much Italian food.", "I like Italian food very much.", "Không đặt very much giữa động từ và tân ngữ."),
      x("I drink always coffee.", "I always drink coffee.", "Always đứng trước động từ chính."),
      x("I gave her it.", "I gave it to her.", "Khi tân ngữ là it, dùng give it to somebody.")
    ],
    check: [
      "Động từ và tân ngữ có đứng sát nhau không? || Có, không chèn very much hay trạng từ vào giữa.",
      "Nơi chốn và thời gian đứng thứ tự nào? || Nơi chốn trước, thời gian sau.",
      "always / never đứng ở đâu? || Sau am / is / are, trước động từ chính.",
      "Giao cái gì cho ai? || give something to somebody hoặc give somebody something. Với it / them → to somebody."
    ],
    questions: [
      mc("q1", "e", "Câu nào đúng?", ["I like Italian food very much.", "I like very much Italian food.", "Very much I like Italian food."], "I like Italian food very much.", "tt-vitri", "Tôi rất thích đồ ăn Ý.", "Động từ + tân ngữ sát nhau.", "Very much đứng cuối, không chen giữa động từ và tân ngữ."),
      mc("q2", "e", "Câu nào đúng?", ["She always drinks coffee.", "She drinks always coffee.", "She drinks coffee always."], "She always drinks coffee.", "tt-trang-tu", "Cô ấy lúc nào cũng uống cà phê.", "always trước động từ chính.", "Always đứng trước động từ chính drinks."),
      mc("q3", "e", "He ___ late.", ["is always", "always is", "does always be"], "is always", "tt-trang-tu", "Anh ấy lúc nào cũng đến trễ.", "sau is: is always.", "Always đứng sau động từ to be."),
      mc("q4", "e", "I ___ go to bed early.", ["usually", "am usually", "usual"], "usually", "tt-trang-tu", "Tôi thường đi ngủ sớm.", "usually trước go.", "Usually là trạng từ, đứng trước động từ chính go."),
      mc("q5", "e", "Câu nào đúng?", ["We went to a party last night.", "We went last night to a party.", "Last night went we to a party."], "We went to a party last night.", "tt-vitri", "Tối qua chúng tôi đi dự tiệc.", "Nơi chốn trước thời gian.", "Cụm nơi chốn to a party đứng trước thời gian last night."),
      mc("q6", "m", "Câu nào đúng?", ["Lisa walks to work every day.", "Lisa walks every day to work.", "Lisa every day walks to work."], "Lisa walks to work every day.", "tt-vitri", "Lisa đi bộ đi làm mỗi ngày.", "Nơi chốn trước thời gian.", "To work (nơi chốn) đứng trước every day (thời gian)."),
      mc("q7", "m", "I ___ eat too much.", ["sometimes", "am sometimes", "sometime"], "sometimes", "tt-trang-tu", "Đôi khi tôi ăn quá nhiều.", "sometimes trước động từ chính.", "Sometimes đứng trước eat. Không có am vì eat là động từ chính."),
      mc("q8", "m", "She has ___ been to Egypt.", ["never", "ever never", "not"], "never", "tt-trang-tu", "Cô ấy chưa bao giờ đến Ai Cập.", "never giữa have và V3.", "Never đứng giữa has và been (giữa hai động từ)."),
      mc("q9", "m", "Câu nào đúng?", ["I gave the keys to Sarah.", "I gave to Sarah the keys.", "I gave the Sarah keys."], "I gave the keys to Sarah.", "tt-give", "Tôi đưa chìa khóa cho Sarah.", "give something to somebody.", "Vật đứng trước, to + người đứng sau."),
      mc("q10", "m", "Câu nào đúng?", ["I gave Sarah the keys.", "I gave Sarah to the keys.", "I gave to Sarah the keys."], "I gave Sarah the keys.", "tt-give", "Tôi đưa chìa khóa cho Sarah.", "give somebody something.", "Người đứng ngay sau give, vật theo sau, không có to."),
      mc("q11", "h", "Here are the keys. Give ___ to your father.", ["them", "they", "it"], "them", "tt-give", "Đây là chìa khóa. Đưa chúng cho bố con.", "Keys là số nhiều: them.", "Tân ngữ số nhiều dùng them."),
      mc("q12", "h", "Câu nào đúng?", ["I gave it to her.", "I gave her it.", "I gave to her it."], "I gave it to her.", "tt-give", "Tôi đã đưa nó cho cô ấy.", "it + to + người.", "Khi tân ngữ là it hoặc them, ta thường nói give it to somebody."),
      mc("q13", "h", "Câu nào đúng?", ["Will you be at home this evening?", "Will you be this evening at home?", "Will you this evening be at home?"], "Will you be at home this evening?", "tt-vitri", "Tối nay bạn có ở nhà không?", "Nơi chốn trước thời gian.", "At home (nơi chốn) đứng trước this evening (thời gian)."),
      mc("q14", "h", "Câu nào đúng?", ["Do you often go to restaurants?", "Do you go often to restaurants?", "Often do you go to restaurants?"], "Do you often go to restaurants?", "tt-trang-tu", "Bạn có hay đi nhà hàng không?", "often trước động từ chính.", "Trong câu hỏi, often đứng sau chủ ngữ you và trước động từ go."),
      mc("q15", "h", "I'm going to the shop. Can I ___ you anything?", ["get", "do", "make"], "get", "tt-give", "Tôi đi cửa hàng đây. Tôi mua gì cho bạn không?", "get somebody something.", "Get cũng dùng cấu trúc get somebody something, nghĩa là mua / lấy cho ai thứ gì.")
    ]
  });

  window.GRAMMAR.push({
    id: "there-it", cefr: "A2",
    title: "There was / There has been / There will be và It",
    summary: "There ở các thì khác, và dùng It cho giờ, ngày, thời tiết, khoảng cách.",
    formula: "there was / were · there has / have been · there will be · It + is...",
    see: ["there-is", "future-plans"],
    selfWrite: [
      ["Viết một câu về thời tiết hôm nay bằng It.", "It's sunny and warm today."],
      ["Viết một câu nói trong thành phố của bạn có gì (there is / there are).", "There are many coffee shops in my city."]
    ],
    sections: [
      {
        heading: "1. there was / were, there has / have been, there will be",
        body: "There is / are nói hiện tại; There was / were nói quá khứ: There was nothing on TV last night. There has / have been nói điều đã xảy ra gần đây và còn liên quan đến hiện tại (There's been an accident). Nhưng có thời gian đã qua (last night) thì dùng there was. There will be (viết tắt there won't be) nói tương lai.",
        table: [
          ["Thì", "Ví dụ"],
          ["hiện tại", "There is a train every hour."],
          ["quá khứ", "There was an accident last night."],
          ["hiện tại hoàn thành", "There's been an accident. (vừa xảy ra)"],
          ["tương lai", "There will be a new manager soon."]
        ],
        examples: [
          { en: "There was nothing on TV last night.", vi: "Tối qua không có gì trên TV." },
          { en: "This road is dangerous. There have been many accidents.", vi: "Con đường này nguy hiểm. Đã có nhiều tai nạn." },
          { en: "I'll do my packing today because there won't be time tomorrow.", vi: "Hôm nay tôi sẽ đóng đồ vì mai sẽ không có thời gian." }
        ]
      },
      {
        heading: "2. It cho giờ, ngày, khoảng cách, thời tiết",
        body: "Tiếng Anh cần chủ ngữ nên dùng it khi nói về giờ giấc, ngày tháng, khoảng cách và thời tiết: It's half past ten. It's Thursday. It's three kilometres from our house to the city centre. It's raining. Khoảng cách: dùng far trong câu hỏi và phủ định (Is it far? It isn't far), dùng a long way trong câu khẳng định (It's a long way).",
        examples: [
          { en: "What time is it? It's half past ten.", vi: "Mấy giờ rồi? Mười giờ rưỡi." },
          { en: "How far is it from New York to Los Angeles?", vi: "Từ New York đến Los Angeles bao xa?" },
          { en: "It's a long way from here to the station.", vi: "Từ đây đến nhà ga khá xa." }
        ]
      },
      {
        heading: "3. It's nice to...",
        body: "It + tính từ + to + động từ: It's nice to see you again. It's impossible to understand her. It wasn't easy to find your house. Đừng bỏ It: không nói Is true that..., phải nói Is it true that...?",
        examples: [
          { en: "It's nice to see you again.", vi: "Thật vui được gặp lại bạn." },
          { en: "It wasn't easy to find your house.", vi: "Tìm nhà bạn không dễ." },
          { en: "It's raining again.", vi: "Trời lại mưa nữa rồi." }
        ]
      }
    ],
    walk: [
      w("There was an accident last night.", "Tối qua có một vụ tai nạn.", "Last night là mốc quá khứ nên dùng There was."),
      w("It's three kilometres from our house to the city centre.", "Từ nhà tôi đến trung tâm là ba cây số.", "It dùng nói khoảng cách."),
      w("It isn't far.", "Không xa đâu.", "Far dùng trong câu phủ định.")
    ],
    mistakes: [
      x("There has been an accident last night.", "There was an accident last night.", "Có last night nên dùng quá khứ đơn."),
      x("Is raining again.", "It's raining again.", "Tiếng Anh cần chủ ngữ it."),
      x("It's far from here to the station. (khẳng định)", "It's a long way from here to the station.", "Câu khẳng định thường dùng a long way thay vì far.")
    ],
    check: [
      "Có mốc thời gian đã qua không? || Có (last night, yesterday) → There was / were.",
      "Nói về tương lai? || There will be.",
      "Nói giờ, ngày, thời tiết, khoảng cách? || Dùng It làm chủ ngữ.",
      "Hỏi khoảng cách? || How far is it...? Trả lời khẳng định bằng a long way."
    ],
    questions: [
      mc("q1", "e", "___ nothing on TV last night.", ["There was", "There is", "There were"], "There was", "there-qk", "Tối qua không có gì trên TV.", "Quá khứ + số ít: there was.", "Last night cho thấy quá khứ, nothing là số ít nên dùng There was."),
      mc("q2", "e", "___ a lot of people at the party.", ["There were", "There was", "There are"], "There were", "there-qk", "Có rất nhiều người ở bữa tiệc.", "Quá khứ + số nhiều: there were.", "People là số nhiều và câu ở quá khứ nên dùng There were."),
      mc("q3", "e", "___ rains a lot in winter.", ["It", "There", "He"], "It", "it-thoi-gian", "Mùa đông trời mưa nhiều.", "Thời tiết: It.", "Thời tiết dùng it làm chủ ngữ."),
      mc("q4", "e", "What time ___?", ["is it", "it is", "does it"], "is it", "it-thoi-gian", "Mấy giờ rồi?", "What time is it?", "Câu hỏi giờ giấc có dạng What time is it?"),
      mc("q5", "e", "___ is Thursday today.", ["It", "There", "That"], "It", "it-thoi-gian", "Hôm nay là thứ Năm.", "Ngày: It is.", "Nói về ngày trong tuần dùng It's."),
      mc("q6", "m", "Look! ___ been an accident.", ["There's", "It's", "There was"], "There's", "there-qk", "Nhìn kìa! Vừa có tai nạn.", "there's been = there has been.", "Việc vừa xảy ra còn liên quan đến hiện tại nên dùng there has been (there's been)."),
      mc("q7", "m", "There ___ a new manager soon.", ["will be", "is", "has"], "will be", "there-qk", "Sắp có người quản lý mới.", "Tương lai: will be.", "Soon nói về tương lai nên dùng There will be."),
      mc("q8", "m", "How ___ is it from New York to Los Angeles?", ["far", "long way", "much"], "far", "it-thoi-gian", "Từ New York đến Los Angeles bao xa?", "How far = khoảng cách.", "Câu hỏi khoảng cách dùng how far."),
      mc("q9", "m", "It's ___ from here to the station. (khẳng định)", ["a long way", "far", "long"], "a long way", "it-thoi-gian", "Từ đây đến nhà ga khá xa.", "Khẳng định: a long way.", "Trong câu khẳng định thường nói a long way, không dùng far."),
      mc("q10", "m", "It isn't ___. We can walk.", ["far", "a long way", "long way"], "far", "it-thoi-gian", "Không xa. Mình đi bộ được.", "Phủ định: far.", "Trong câu phủ định ta dùng far: It isn't far."),
      mc("q11", "h", "Câu nào đúng?", ["There was an accident last night.", "There has been an accident last night.", "It was an accident last night."], "There was an accident last night.", "there-qk", "Tối qua có một vụ tai nạn.", "Có mốc quá khứ: there was.", "Last night là mốc quá khứ nên không dùng there has been. It was an accident nghĩa là đó là một tai nạn (không phải có một tai nạn)."),
      mc("q12", "h", "This road is dangerous. There ___ many accidents.", ["have been", "was", "are been"], "have been", "there-qk", "Con đường này nguy hiểm. Đã có nhiều vụ tai nạn.", "Many accidents (số nhiều): have been.", "Accidents là số nhiều và không có mốc thời gian xác định nên dùng there have been."),
      mc("q13", "h", "___ nice to see you again.", ["It's", "There's", "This"], "It's", "it-thoi-gian", "Thật vui được gặp lại bạn.", "It's + tính từ + to V.", "Cấu trúc It's nice to + V dùng để nói cảm nhận về một việc."),
      mc("q14", "h", "Câu nào đúng?", ["It's raining again.", "Is raining again.", "There raining again."], "It's raining again.", "it-thoi-gian", "Trời lại mưa nữa.", "Cần chủ ngữ it.", "Tiếng Anh cần có chủ ngữ nên dùng It's raining."),
      mc("q15", "h", "___ a strong wind yesterday.", ["There was", "It was", "There were"], "There was", "there-qk", "Hôm qua có gió mạnh.", "There was + danh từ.", "Wind là danh từ không đếm được nên dùng There was a strong wind. Dùng it thì phải nói It was very windy.")
    ]
  });
})();
