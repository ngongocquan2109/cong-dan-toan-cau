/* Ngữ pháp bổ sung (2/3): used to / would like / mệnh lệnh, từ nối và trạng từ, V-ing hay to V. Do AI sinh sẵn một lần. */
(function () {
  var mc = function (id, lv, q, o, a, tag, vi, ex, deep) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: ex, tag: tag, vi: vi, deep: deep }; };
  var fl = function (id, lv, q, a, tag, vi, ex, deep) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: ex, tag: tag, vi: vi, deep: deep }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "used-to": "used to (thói quen trong quá khứ)",
    "would-like": "would like / I'd like (lời mời, yêu cầu)",
    "menh-lenh": "Câu mệnh lệnh và Let's",
    "noi-and-but": "and, but, or",
    "so-because": "so và because",
    "when-before": "when, before, after, while",
    "still-yet-already": "still, yet, already",
    "ving-sau-dt": "Động từ + V-ing",
    "to-v-sau-dt": "Động từ + to V",
    "gioi-tu-ving": "Giới từ + V-ing",
    "hai-dang": "Động từ đi được cả hai dạng (stop, remember...)"
  });

  window.GRAMMAR = window.GRAMMAR || [];

  window.GRAMMAR.push({
    id: "used-to-would-like", cefr: "A2",
    title: "Used to, would like và câu mệnh lệnh",
    summary: "Nói thói quen đã bỏ, đề nghị lịch sự và ra lệnh, rủ rê.",
    formula: "used to + V · would like + N / to V · V (mệnh lệnh) · Let's + V",
    sections: [
      {
        heading: "1. used to + V: thói quen và trạng thái trong quá khứ",
        body: "Used to + động từ nguyên mẫu nói về việc ta thường làm hoặc trạng thái từng có trong quá khứ, nhưng bây giờ không còn nữa. Phủ định và câu hỏi dùng did và đổi thành use to (không còn d): I didn't use to like fish. Did you use to play football? Đừng nhầm với be used to + V-ing nghĩa là quen với việc gì: I'm used to getting up early.",
        examples: [
          { en: "I used to play football when I was a child.", vi: "Hồi nhỏ tôi hay chơi bóng đá (giờ thì không)." },
          { en: "She didn't use to like coffee.", vi: "Trước đây cô ấy không thích cà phê." },
          { en: "I'm used to getting up early.", vi: "Tôi quen dậy sớm rồi." }
        ]
      },
      {
        heading: "2. would like: lời mời và yêu cầu lịch sự",
        body: "Would like nghĩa là muốn, nhưng lịch sự hơn want. Dạng viết tắt là 'd like. Sau would like có thể là danh từ (I'd like a coffee) hoặc to + V (I'd like to sit here). Câu hỏi: Would you like...? Cần phân biệt: Do you like tea? (bạn có thích trà nói chung không) khác với Would you like some tea? (mời bạn dùng trà ngay bây giờ).",
        examples: [
          { en: "I'd like a table for two, please.", vi: "Tôi muốn một bàn cho hai người." },
          { en: "Would you like some tea?", vi: "Bạn có muốn uống chút trà không?" },
          { en: "Would you like to come with us?", vi: "Bạn có muốn đi cùng chúng tôi không?" }
        ]
      },
      {
        heading: "3. Câu mệnh lệnh và Let's",
        body: "Câu mệnh lệnh dùng động từ nguyên mẫu, không có chủ ngữ: Open the door. Phủ định dùng Don't + V: Don't be late. Thêm please cho lịch sự. Let's + V (let us) dùng để rủ cùng làm: Let's go! Phủ định là Let's not + V: Let's not wait. Có thể rủ bằng Shall we + V...? hoặc Why don't we + V...?",
        examples: [
          { en: "Please sit down.", vi: "Mời ngồi." },
          { en: "Don't be late!", vi: "Đừng đến trễ!" },
          { en: "Let's go to the cinema.", vi: "Mình đi xem phim đi." }
        ]
      }
    ],
    walk: [
      w("We used to live in Hanoi.", "Trước đây chúng tôi sống ở Hà Nội.", "used to + V nói về trạng thái trong quá khứ; ý ngầm là bây giờ không còn sống ở đó."),
      w("Would you like to join us?", "Bạn có muốn tham gia cùng chúng tôi không?", "Would you like + to V là lời mời lịch sự."),
      w("Let's not argue.", "Chúng ta đừng tranh cãi nữa.", "Phủ định của Let's là Let's not + V.")
    ],
    mistakes: [
      x("I didn't used to like fish.", "I didn't use to like fish.", "Sau didn't, used to trở về use to (chỉ một dấu quá khứ)."),
      x("I want a coffee, please. (khi gọi món lịch sự)", "I'd like a coffee, please.", "Want nghe trực tiếp; would like lịch sự hơn."),
      x("Let's to go home.", "Let's go home.", "Sau Let's là động từ nguyên mẫu, không có to.")
    ],
    check: [
      "Việc đó còn đúng bây giờ không? || Nếu đó là thói quen trong quá khứ và không còn nữa → used to + V. Nếu quen với việc hiện tại → be used to + V-ing.",
      "Phủ định hoặc câu hỏi với used to? || Dùng did / didn't, và đổi thành use to: didn't use to, Did you use to...?",
      "Đây là lời mời hay hỏi sở thích? || Would you like...? = mời ngay lúc này. Do you like...? = hỏi sở thích chung.",
      "Câu mệnh lệnh có chủ ngữ không? || Không. Chỉ dùng V nguyên mẫu. Phủ định: Don't + V. Rủ cùng: Let's + V."
    ],
    questions: [
      mc("q1", "e", "I ___ play football when I was a child.", ["used to", "use to", "am used to"], "used to", "used-to", "Hồi nhỏ tôi hay chơi bóng đá.", "used to + V cho thói quen quá khứ.", "Câu ở thì quá khứ (when I was a child) nên dùng used to + V. Use to chỉ dùng sau did / didn't, còn am used to + V-ing có nghĩa là quen với."),
      mc("q2", "e", "I ___ like a glass of water, please.", ["would", "do", "am"], "would", "would-like", "Cho tôi một ly nước.", "I would like = lời yêu cầu lịch sự.", "Would like = muốn (lịch sự). Do like nghĩa là thích nói chung, không dùng để yêu cầu."),
      mc("q3", "e", "___ late! The class starts at 8.", ["Don't be", "Not be", "Be not"], "Don't be", "menh-lenh", "Đừng đến trễ! Lớp bắt đầu lúc 8 giờ.", "Phủ định mệnh lệnh: Don't + V.", "Câu mệnh lệnh phủ định dùng Don't + động từ nguyên mẫu, kể cả với be: Don't be late."),
      mc("q4", "e", "___ go to the cinema tonight!", ["Let's", "Let", "We"], "Let's", "menh-lenh", "Tối nay mình đi xem phim đi!", "Let's + V để rủ nhau.", "Let's (= let us) + động từ nguyên mẫu dùng để rủ cùng làm. Let không có 's thì thiếu nghĩa 'chúng ta'."),
      mc("q5", "e", "Would you like to ___ with us?", ["come", "coming", "came"], "come", "would-like", "Bạn có muốn đi cùng chúng tôi không?", "Would you like to + V nguyên mẫu.", "Cấu trúc là would like + to + động từ nguyên mẫu. Vì vậy cần come, không dùng coming hay came."),
      mc("q6", "m", "She didn't ___ to like coffee.", ["use", "used", "uses"], "use", "used-to", "Trước đây cô ấy không thích cà phê.", "Sau didn't, dùng use to.", "Phủ định của used to dùng didn't use to. Chữ d của used biến mất vì didn't đã mang dấu quá khứ."),
      fl("q7", "m", "He ___ to live in London, but now he lives in Paris.", "used", "used-to", "Anh ấy từng sống ở London, nhưng giờ sống ở Paris.", "Khẳng định: used to + V.", "Used to nói về trạng thái trong quá khứ đã chấm dứt. Mệnh đề sau (now he lives in Paris) cho thấy điều đó."),
      mc("q8", "m", "___ you like some more cake? — Yes, please.", ["Would", "Do", "Are"], "Would", "would-like", "Bạn có muốn thêm bánh không? — Có, cảm ơn.", "Lời mời dùng Would you like...?", "Khi mời ai ăn uống ngay lúc đó, ta dùng Would you like. Do you like hỏi sở thích chung chung."),
      mc("q9", "m", "I ___ a table for two, please.", ["would like", "like", "am liking"], "would like", "would-like", "Tôi muốn đặt một bàn cho hai người.", "Would like = muốn (lịch sự).", "Khi gọi món hoặc đặt chỗ, would like lịch sự và tự nhiên. Like nghĩa là thích, am liking không dùng vì like là động từ trạng thái."),
      mc("q10", "m", "Câu nào đúng?", ["Did you use to play the piano?", "Did you used to play the piano?", "Do you used to play the piano?"], "Did you use to play the piano?", "used-to", "Trước đây bạn có chơi piano không?", "Câu hỏi: Did + S + use to + V.", "Câu hỏi dùng Did và use to (không có d). Do you used to không tồn tại vì used to là thì quá khứ."),
      mc("q11", "h", "Câu nào đúng?", ["I'm used to getting up early.", "I used to getting up early.", "I use to get up early now."], "I'm used to getting up early.", "used-to", "Tôi quen dậy sớm rồi.", "be used to + V-ing = quen với.", "Be used to + V-ing nghĩa là quen với việc gì, nói về hiện tại. Used to + V mới là thói quen quá khứ. Câu hai và ba trộn lẫn hai cấu trúc nên sai."),
      mc("q12", "h", "Câu nào lịch sự nhất để gọi món?", ["I'd like a pizza, please.", "I want a pizza.", "Give me a pizza."], "I'd like a pizza, please.", "would-like", "Cho tôi một chiếc pizza.", "I'd like + please = lịch sự.", "I'd like (I would like) cộng với please là cách gọi món lịch sự nhất. I want nghe thẳng, còn Give me nghe như ra lệnh."),
      fl("q13", "h", "___ we have lunch together? (lời rủ)", "Shall", "menh-lenh", "Mình ăn trưa cùng nhau nhé?", "Shall we + V...? để rủ hoặc đề nghị.", "Shall we + động từ nguyên mẫu là cách rủ lịch sự, gần nghĩa với Let's. Chỉ dùng shall với I và we trong câu hỏi dạng này."),
      mc("q14", "h", "Câu nào đúng?", ["Let's not wait.", "Let's no wait.", "Let's doesn't wait."], "Let's not wait.", "menh-lenh", "Mình đừng chờ nữa.", "Phủ định: Let's not + V.", "Với Let's, phủ định chỉ cần thêm not sau Let's: Let's not wait. Không dùng no hay doesn't."),
      mc("q15", "h", "My grandfather ___ smoke, but he stopped ten years ago.", ["used to", "is used to", "uses to"], "used to", "used-to", "Ông tôi từng hút thuốc nhưng đã bỏ mười năm rồi.", "Thói quen quá khứ đã bỏ: used to + V.", "Ten years ago và stopped cho thấy việc hút thuốc đã chấm dứt, nên dùng used to + V. Is used to cần V-ing và có nghĩa khác (quen với).")
    ]
  });

  window.GRAMMAR.push({
    id: "connectors-time-words", cefr: "A2",
    title: "Từ nối và trạng từ: and, but, so, because, when, still, yet",
    summary: "Nối ý trong câu: thêm, đối lập, nguyên nhân, kết quả, thời gian.",
    formula: "S + V, and / but / so + S + V · because + S + V · when / before / after + S + V",
    sections: [
      {
        heading: "1. and, but, or, so, because",
        body: "And nối ý cùng hướng. But nối hai ý trái ngược. Or đưa ra lựa chọn. So chỉ kết quả: ý đứng trước so là lý do, ý đứng sau là kết quả. Because chỉ lý do: ý đứng sau because là lý do. Cùng một nghĩa có thể viết bằng hai cách: It was raining, so we stayed at home. = We stayed at home because it was raining. Because of + danh từ: We were late because of the traffic.",
        examples: [
          { en: "I like tea but I don't like coffee.", vi: "Tôi thích trà nhưng không thích cà phê." },
          { en: "He was tired, so he went to bed early.", vi: "Anh ấy mệt nên đi ngủ sớm." },
          { en: "We were late because of the traffic.", vi: "Chúng tôi đến trễ vì kẹt xe." }
        ]
      },
      {
        heading: "2. when, before, after, while",
        body: "When (khi), before (trước khi), after (sau khi) và while (trong lúc) nối hai mệnh đề về thời gian. Quan trọng: khi nói về tương lai, mệnh đề sau when, before, after dùng hiện tại đơn, không dùng will. While thường đi với thì tiếp diễn vì nói việc đang diễn ra.",
        examples: [
          { en: "Call me when you arrive.", vi: "Gọi tôi khi bạn đến." },
          { en: "I will phone you when I get home.", vi: "Tôi sẽ gọi bạn khi tôi về đến nhà." },
          { en: "She was cooking while he was watching TV.", vi: "Cô ấy nấu ăn trong lúc anh ấy xem TV." }
        ]
      },
      {
        heading: "3. still, yet, already",
        body: "Still nghĩa là vẫn còn, đứng trước động từ chính (sau to be): He is 80 but he still works. Yet nghĩa là chưa, dùng ở cuối câu phủ định và câu hỏi: I haven't eaten yet. Already nghĩa là đã rồi, thường đứng giữa have và V3: She has already left.",
        examples: [
          { en: "I'm still waiting for him.", vi: "Tôi vẫn đang chờ anh ấy." },
          { en: "Have you finished yet?", vi: "Bạn xong chưa?" },
          { en: "She has already left.", vi: "Cô ấy đã đi rồi." }
        ]
      }
    ],
    walk: [
      w("It was cold, so I wore a coat.", "Trời lạnh nên tôi mặc áo khoác.", "Ý trước so là lý do (cold), ý sau là kết quả (wore a coat)."),
      w("I'll call you when I arrive.", "Tôi sẽ gọi bạn khi tôi đến nơi.", "Sau when dùng hiện tại đơn (arrive), không dùng will arrive."),
      w("He still lives with his parents.", "Anh ấy vẫn sống với bố mẹ.", "Still đứng trước động từ chính lives.")
    ],
    mistakes: [
      x("Because it was raining, so we stayed home.", "Because it was raining, we stayed home.", "Không dùng cả because và so trong cùng một câu."),
      x("I will call you when I will arrive.", "I will call you when I arrive.", "Sau when không dùng will khi nói về tương lai."),
      x("I haven't finished still.", "I haven't finished yet.", "Cuối câu phủ định dùng yet, không dùng still.")
    ],
    check: [
      "Hai ý quan hệ gì với nhau? || Thêm vào → and. Đối lập → but. Lựa chọn → or. Kết quả → so. Lý do → because.",
      "Ý nào là lý do, ý nào là kết quả? || Because đứng trước lý do. So đứng trước kết quả. Đừng dùng cả hai trong một câu.",
      "Nói về tương lai? || Sau when, before, after dùng hiện tại đơn: when I get home (không dùng will get).",
      "Chọn still, yet hay already? || Vẫn còn → still. Chưa (cuối câu phủ định / câu hỏi) → yet. Đã rồi (câu khẳng định) → already."
    ],
    questions: [
      mc("q1", "e", "I like tea ___ I don't like coffee.", ["but", "so", "because"], "but", "noi-and-but", "Tôi thích trà nhưng không thích cà phê.", "But nối hai ý trái ngược.", "Thích trà và không thích cà phê là hai ý đối lập nên dùng but. So chỉ kết quả, because chỉ lý do, đều không hợp nghĩa."),
      mc("q2", "e", "She is tired, ___ she goes to bed early.", ["so", "because", "but"], "so", "so-because", "Cô ấy mệt nên đi ngủ sớm.", "Mệt là lý do, đi ngủ sớm là kết quả: dùng so.", "Ý trước dấu phẩy (mệt) là nguyên nhân, ý sau (đi ngủ sớm) là kết quả, nên dùng so. Because phải đứng trước phần lý do."),
      mc("q3", "e", "I stayed at home ___ it was raining.", ["because", "so", "but"], "because", "so-because", "Tôi ở nhà vì trời mưa.", "Because đứng trước lý do.", "Trời mưa là lý do của việc ở nhà, nên dùng because. So đặt trước kết quả, không đặt trước lý do."),
      mc("q4", "e", "Do you want tea ___ coffee?", ["or", "and", "but"], "or", "noi-and-but", "Bạn muốn trà hay cà phê?", "Or dùng để đưa ra lựa chọn.", "Hỏi chọn một trong hai thì dùng or. And nối hai thứ cùng được chọn, but nối hai ý đối lập."),
      mc("q5", "e", "He is hungry, ___ he is eating a sandwich.", ["so", "but", "because"], "so", "so-because", "Anh ấy đói nên đang ăn bánh sandwich.", "Đói là lý do, ăn là kết quả: so.", "Đói dẫn đến việc ăn, nên dùng so. Nếu dùng but thì hai ý sẽ mâu thuẫn nhau."),
      mc("q6", "m", "Call me ___ you arrive.", ["when", "because", "but"], "when", "when-before", "Gọi tôi khi bạn đến.", "When = khi.", "When nối hai việc theo thời gian: gọi vào lúc bạn đến nơi. Because và but không hợp nghĩa trong câu này."),
      mc("q7", "m", "I will phone you when I ___ home.", ["get", "will get", "am getting"], "get", "when-before", "Tôi sẽ gọi bạn khi tôi về đến nhà.", "Sau when dùng hiện tại đơn, không dùng will.", "Khi nói về tương lai, mệnh đề sau when dùng hiện tại đơn (get). Phần chính của câu mới dùng will phone. Đây là lỗi rất hay gặp."),
      mc("q8", "m", "___ you finish your homework, you can play.", ["After", "Because", "But"], "After", "when-before", "Sau khi làm xong bài tập, bạn có thể chơi.", "After = sau khi.", "After + mệnh đề chỉ việc xảy ra trước. Câu này cũng dùng hiện tại đơn (finish) vì nói về tương lai gần."),
      mc("q9", "m", "He is 80 but he ___ works every day.", ["still", "yet", "already"], "still", "still-yet-already", "Ông ấy 80 tuổi mà vẫn làm việc mỗi ngày.", "Still = vẫn còn.", "Still đứng trước động từ chính và nhấn rằng việc đó vẫn tiếp diễn dù đã lâu. Yet dùng trong câu phủ định và câu hỏi, already dùng khi việc đã hoàn thành."),
      fl("q10", "m", "She has ___ left. (đã đi rồi)", "already", "still-yet-already", "Cô ấy đã đi rồi.", "Already = đã rồi, đứng giữa has và V3.", "Already dùng trong câu khẳng định, đứng giữa have / has và V3 để nhấn việc đã xảy ra, có khi sớm hơn dự kiến."),
      mc("q11", "h", "Câu nào đúng?", ["She has already finished.", "She has yet finished.", "She is already finish."], "She has already finished.", "still-yet-already", "Cô ấy đã làm xong rồi.", "already đứng giữa has và V3.", "Câu đúng là has already finished. Yet không dùng trong câu khẳng định. Câu ba sai vì is finish không hợp ngữ pháp."),
      mc("q12", "h", "We were late ___ the traffic.", ["because of", "because", "so"], "because of", "so-because", "Chúng tôi đến trễ vì kẹt xe.", "because of + danh từ; because + mệnh đề.", "The traffic là một cụm danh từ, nên dùng because of. Because phải đứng trước một mệnh đề có chủ ngữ và động từ, ví dụ: because the traffic was bad."),
      fl("q13", "h", "He was tired, ___ he went to bed early. (kết quả)", "so", "so-because", "Anh ấy mệt nên đi ngủ sớm.", "Kết quả dùng so.", "Ý đi ngủ sớm là kết quả của mệt, nên dùng so. Không thể dùng because ở vị trí này."),
      mc("q14", "h", "It's late and I haven't finished ___.", ["yet", "still", "already"], "yet", "still-yet-already", "Muộn rồi mà tôi vẫn chưa làm xong.", "Cuối câu phủ định dùng yet.", "Yet đặt ở cuối câu phủ định với nghĩa chưa. Still ở cuối câu là sai vị trí. Already không dùng trong câu phủ định kiểu này."),
      mc("q15", "h", "Câu nào đúng?", ["I'm still waiting for him.", "I'm waiting still for him.", "I still am waiting for him."], "I'm still waiting for him.", "still-yet-already", "Tôi vẫn đang chờ anh ấy.", "Still đứng sau to be hoặc trước động từ chính.", "Vị trí chuẩn của still là sau to be (I'm still waiting). Câu hai đặt still sai chỗ, câu ba nghe không tự nhiên.")
    ]
  });

  window.GRAMMAR.push({
    id: "gerund-infinitive", cefr: "B1",
    title: "Động từ + V-ing hay to V",
    summary: "Sau enjoy dùng V-ing, sau want dùng to V; và vài động từ đi được cả hai.",
    formula: "enjoy / finish / mind + V-ing · want / decide / hope + to V · giới từ + V-ing",
    sections: [
      {
        heading: "1. Động từ + V-ing và giới từ + V-ing",
        body: "Một số động từ luôn có V-ing theo sau: enjoy, finish, mind, avoid, keep, suggest, practise, give up. Sau giới từ (in, at, of, for, about, before, after, without...) cũng dùng V-ing: good at swimming, thank you for helping, interested in learning. Lưu ý look forward to + V-ing vì ở đây to là giới từ.",
        examples: [
          { en: "I enjoy listening to music.", vi: "Tôi thích nghe nhạc." },
          { en: "Would you mind opening the window?", vi: "Bạn có phiền mở cửa sổ không?" },
          { en: "Thank you for helping me.", vi: "Cảm ơn bạn đã giúp tôi." }
        ]
      },
      {
        heading: "2. Động từ + to V và to V chỉ mục đích",
        body: "Nhóm sau đi với to + V: want, need, hope, decide, plan, promise, learn, would like, agree. To + V còn chỉ mục đích (để làm gì): I went to the shop to buy bread. Sau tính từ cũng dùng to V: I'm happy to see you.",
        examples: [
          { en: "She wants to be a doctor.", vi: "Cô ấy muốn trở thành bác sĩ." },
          { en: "We decided to buy a new car.", vi: "Chúng tôi quyết định mua xe mới." },
          { en: "He went to the shop to buy some bread.", vi: "Anh ấy ra cửa hàng để mua bánh mì." }
        ]
      },
      {
        heading: "3. Động từ đi được cả hai và dạng đặc biệt",
        body: "Like, love, hate, start đi với cả V-ing và to V, nghĩa gần như nhau. Nhưng stop và remember đổi nghĩa: stop + V-ing = ngừng làm việc đó (He stopped running: anh ấy ngừng chạy). stop + to V = dừng lại để làm việc khác (He stopped to buy water: anh ấy dừng lại để mua nước). remember + to V = nhớ để làm (Remember to lock the door), remember + V-ing = nhớ là đã làm (I remember locking the door). Make và let đi với động từ nguyên mẫu không to: My mother made me clean my room. Sau can, must, should cũng là động từ nguyên mẫu.",
        examples: [
          { en: "He stopped running because he was tired.", vi: "Anh ấy ngừng chạy vì mệt." },
          { en: "He stopped to buy some water.", vi: "Anh ấy dừng lại để mua nước." },
          { en: "My mother made me clean my room.", vi: "Mẹ bắt tôi dọn phòng." }
        ]
      }
    ],
    walk: [
      w("I'm looking forward to seeing you.", "Tôi mong được gặp bạn.", "To trong look forward to là giới từ nên sau nó dùng V-ing."),
      w("She promised to call me.", "Cô ấy hứa sẽ gọi cho tôi.", "promise + to V."),
      w("He avoids eating sugar.", "Anh ấy tránh ăn đường.", "avoid + V-ing.")
    ],
    mistakes: [
      x("I enjoy to listen to music.", "I enjoy listening to music.", "Enjoy luôn đi với V-ing."),
      x("She wants going home.", "She wants to go home.", "Want đi với to + V."),
      x("I'm good at to swim.", "I'm good at swimming.", "Sau giới từ at dùng V-ing.")
    ],
    check: [
      "Trước chỗ trống là động từ nào? || Enjoy, finish, mind, avoid, keep → V-ing. Want, need, hope, decide, plan, promise → to V.",
      "Trước chỗ trống có giới từ không? || Nếu có (at, in, for, about, before, after, without...) thì dùng V-ing, kể cả look forward to + V-ing.",
      "Mục đích của hành động là gì? || Muốn nói để làm gì thì dùng to + V: I went out to buy milk.",
      "Có phải stop hoặc remember không? || stop + V-ing = ngừng việc đó. stop + to V = dừng lại để làm. remember + to V = nhớ để làm; remember + V-ing = nhớ đã làm."
    ],
    questions: [
      mc("q1", "e", "I enjoy ___ music.", ["listening to", "to listen to", "listen to"], "listening to", "ving-sau-dt", "Tôi thích nghe nhạc.", "Enjoy + V-ing.", "Enjoy luôn đi với V-ing (enjoy listening). Không dùng to listen hay listen ngay sau enjoy."),
      mc("q2", "e", "She wants ___ a doctor.", ["to be", "being", "be"], "to be", "to-v-sau-dt", "Cô ấy muốn trở thành bác sĩ.", "Want + to V.", "Want đi với to + V nên cần to be. Being và be đều không đúng sau want."),
      mc("q3", "e", "He finished ___ his homework.", ["doing", "to do", "do"], "doing", "ving-sau-dt", "Anh ấy làm xong bài tập.", "Finish + V-ing.", "Finish đi với V-ing nên dùng doing. Không nói finish to do."),
      mc("q4", "e", "We decided ___ a new car.", ["to buy", "buying", "buy"], "to buy", "to-v-sau-dt", "Chúng tôi quyết định mua xe mới.", "Decide + to V.", "Decide thuộc nhóm đi với to + V (decide to buy)."),
      mc("q5", "e", "I'm good at ___ English.", ["speaking", "to speak", "speak"], "speaking", "gioi-tu-ving", "Tôi giỏi nói tiếng Anh.", "Giới từ at + V-ing.", "Sau giới từ ta luôn dùng V-ing. At là giới từ nên cần speaking."),
      mc("q6", "m", "Would you mind ___ the window?", ["opening", "to open", "open"], "opening", "ving-sau-dt", "Bạn có phiền mở cửa sổ không?", "Mind + V-ing.", "Mind đi với V-ing: Would you mind opening...? Đây là cách nhờ lịch sự rất hay gặp."),
      mc("q7", "m", "I'm learning ___ the guitar.", ["to play", "playing", "play"], "to play", "to-v-sau-dt", "Tôi đang học chơi ghi-ta.", "Learn + to V.", "Learn đi với to + V khi nói về học cách làm gì. Nên dùng to play."),
      mc("q8", "m", "She went to the shop ___ some bread.", ["to buy", "buying", "for buy"], "to buy", "to-v-sau-dt", "Cô ấy ra cửa hàng để mua ít bánh mì.", "To + V chỉ mục đích.", "Để nói mục đích của việc đi, ta dùng to + động từ nguyên mẫu. For buy là sai vì sau for không đi với động từ nguyên mẫu."),
      mc("q9", "m", "Thank you for ___ me.", ["helping", "to help", "help"], "helping", "gioi-tu-ving", "Cảm ơn bạn đã giúp tôi.", "Giới từ for + V-ing.", "For là giới từ nên sau nó dùng V-ing: thank you for helping."),
      mc("q10", "m", "They hope ___ you soon.", ["to see", "seeing", "see"], "to see", "to-v-sau-dt", "Họ hy vọng sớm gặp bạn.", "Hope + to V.", "Hope đi với to + V. Cấu trúc hope to see rất thường gặp khi kết thư."),
      mc("q11", "h", "He stopped ___ because he was tired.", ["running", "to run", "run"], "running", "hai-dang", "Anh ấy ngừng chạy vì mệt.", "stop + V-ing = ngừng làm việc đó.", "Vì anh ấy mệt nên ngừng chạy, tức là việc chạy chấm dứt, dùng stop + V-ing. Stop to run lại có nghĩa dừng lại để chạy."),
      mc("q12", "h", "I stopped ___ some water because I was thirsty.", ["to buy", "buying", "buy"], "to buy", "hai-dang", "Tôi dừng lại để mua nước vì khát.", "stop + to V = dừng lại để làm gì.", "Ở đây tôi dừng việc đang làm để đi mua nước (mục đích), nên dùng stop + to V. Nếu dùng stop buying thì nghĩa là ngừng mua."),
      mc("q13", "h", "My mother made me ___ my room.", ["clean", "to clean", "cleaning"], "clean", "hai-dang", "Mẹ bắt tôi dọn phòng.", "make + O + động từ nguyên mẫu (không to).", "Sau make + người, dùng động từ nguyên mẫu không có to: made me clean. Đây là điểm khác với want me to clean."),
      mc("q14", "h", "Remember ___ the door when you leave.", ["to lock", "locking", "lock"], "to lock", "hai-dang", "Nhớ khóa cửa khi bạn đi nhé.", "remember + to V = nhớ để làm.", "Việc khóa cửa là việc sắp làm trong tương lai nên dùng remember + to V. Remember locking nói về việc đã làm trong quá khứ (nhớ là mình đã khóa)."),
      mc("q15", "h", "Câu nào đúng?", ["I'm looking forward to seeing you.", "I'm looking forward to see you.", "I'm looking forward see you."], "I'm looking forward to seeing you.", "gioi-tu-ving", "Tôi mong được gặp bạn.", "look forward to + V-ing (to là giới từ).", "Trong look forward to, từ to là giới từ chứ không phải to + V, nên sau đó dùng V-ing. Đây là lỗi rất hay gặp.")
    ]
  });
})();
