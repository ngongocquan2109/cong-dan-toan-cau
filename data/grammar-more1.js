/* Ngữ pháp bổ sung (1/3): hiện tại hoàn thành, hoàn thành tiếp diễn, lượng từ. Do AI sinh sẵn một lần. */
(function () {
  var mc = function (id, lv, q, o, a, tag, vi, ex, deep) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: ex, tag: tag, vi: vi, deep: deep }; };
  var fl = function (id, lv, q, a, tag, vi, ex, deep) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: ex, tag: tag, vi: vi, deep: deep }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "hp-hinh-thuc": "Hiện tại hoàn thành: have / has + V3",
    "hp-for-since": "for và since",
    "hp-vs-qk": "Hiện tại hoàn thành hay quá khứ đơn",
    "hp-ever-yet": "ever, never, just, already, yet",
    "hpt-hinh-thuc": "Hoàn thành tiếp diễn: have been + V-ing",
    "hpt-vs-hp": "Hoàn thành tiếp diễn hay hoàn thành",
    "luong-some-any": "some / any / no",
    "luong-hop-chat": "somebody, anything, nothing...",
    "luong-enough-too": "enough và too",
    "luong-every": "every, all, both, neither"
  });

  window.GRAMMAR = window.GRAMMAR || [];

  window.GRAMMAR.push({
    id: "present-perfect", cefr: "A2",
    title: "Hiện tại hoàn thành (Present perfect)",
    summary: "Nói về trải nghiệm, việc vừa xảy ra và việc kéo dài đến bây giờ.",
    formula: "S + have / has + V3 (quá khứ phân từ)",
    sections: [
      {
        heading: "1. Hình thức: have / has + V3",
        body: "Dùng have với I, you, we, they và has với he, she, it, rồi thêm quá khứ phân từ (V3). Động từ có quy tắc thì V3 giống V2 (thêm -ed): worked, visited. Động từ bất quy tắc phải học thuộc: go → gone, see → seen, eat → eaten, do → done, write → written. Phủ định thêm not (haven't, hasn't), câu hỏi đưa have / has lên trước chủ ngữ.",
        table: [
          ["Chủ ngữ", "Khẳng định", "Phủ định", "Câu hỏi"],
          ["I / you / we / they", "have worked", "haven't worked", "Have you worked?"],
          ["he / she / it", "has worked", "hasn't worked", "Has she worked?"]
        ],
        examples: [
          { en: "I have finished my homework.", vi: "Tôi đã làm xong bài tập." },
          { en: "She hasn't seen that film.", vi: "Cô ấy chưa xem bộ phim đó." },
          { en: "Have they eaten lunch?", vi: "Họ đã ăn trưa chưa?" }
        ]
      },
      {
        heading: "2. Ba cách dùng chính",
        body: "(a) Trải nghiệm trong đời, không nói rõ lúc nào: I have been to Japan. Hay đi với ever (từng) và never (chưa bao giờ). (b) Việc vừa xảy ra và còn kết quả ở hiện tại: I have lost my keys (nên bây giờ tôi không vào nhà được). Hay đi với just, already, yet. (c) Việc bắt đầu trong quá khứ và còn kéo dài đến nay: I have lived here for five years. Hay đi với for và since.",
        examples: [
          { en: "Have you ever tried sushi?", vi: "Bạn đã bao giờ ăn thử sushi chưa?" },
          { en: "He has just left.", vi: "Anh ấy vừa mới đi." },
          { en: "We have known each other since 2015.", vi: "Chúng tôi quen nhau từ năm 2015." }
        ]
      },
      {
        heading: "3. for / since và khi nào dùng quá khứ đơn",
        body: "for + một khoảng thời gian (for two years, for a week). since + một mốc thời gian (since 2019, since Monday, since I was a child). Nếu câu có mốc thời gian đã kết thúc rõ ràng như yesterday, last year, in 2020, two days ago thì phải dùng quá khứ đơn, không dùng hiện tại hoàn thành. Ngoài ra, gone to nghĩa là đã đi và chưa về, còn been to nghĩa là đã đi rồi và đã về.",
        examples: [
          { en: "I saw him yesterday.", vi: "Hôm qua tôi đã gặp anh ấy. (có mốc thời gian nên dùng quá khứ đơn)" },
          { en: "She has gone to the bank.", vi: "Cô ấy đã đi ngân hàng (và chưa về)." },
          { en: "She has been to the bank.", vi: "Cô ấy đã đi ngân hàng rồi (và đã về)." }
        ]
      }
    ],
    walk: [
      w("I have lived here for ten years.", "Tôi đã sống ở đây mười năm (và vẫn đang sống).", "Have + lived (V3) cho việc kéo dài đến nay; for + khoảng thời gian."),
      w("Has she called you yet?", "Cô ấy đã gọi cho bạn chưa?", "Câu hỏi đảo has lên trước she; yet dùng ở cuối câu hỏi và câu phủ định."),
      w("They didn't come last night.", "Tối qua họ đã không đến.", "Có last night (mốc thời gian đã qua) nên dùng quá khứ đơn, không dùng hiện tại hoàn thành.")
    ],
    mistakes: [
      x("I have seen him yesterday.", "I saw him yesterday.", "Có yesterday (mốc thời gian đã qua) thì dùng quá khứ đơn."),
      x("She has live here since 2019.", "She has lived here since 2019.", "Sau has phải là quá khứ phân từ (lived), không dùng dạng gốc."),
      x("I have known him since five years.", "I have known him for five years.", "Khoảng thời gian (five years) đi với for; since cần một mốc thời gian.")
    ],
    check: [
      "Câu có mốc thời gian đã qua không? || Nếu thấy yesterday, last week, in 2020, ago thì chọn quá khứ đơn. Nếu không có mốc, hoặc có ever, never, just, already, yet, for, since thì nghĩ tới hiện tại hoàn thành.",
      "Chủ ngữ đi với have hay has? || I, you, we, they → have. He, she, it (hoặc một người, một vật) → has.",
      "Sau have / has là dạng nào của động từ? || Luôn là V3. Động từ có quy tắc thêm -ed; động từ bất quy tắc cần nhớ (go → gone, see → seen).",
      "Chỗ trống đi với for hay since? || Nếu sau đó là một khoảng thời gian (two years) → for. Nếu là một mốc thời gian (2019, Monday) → since."
    ],
    questions: [
      mc("q1", "e", "I ___ finished my homework.", ["have", "has", "am"], "have", "hp-hinh-thuc", "Tôi đã làm xong bài tập.", "I đi với have.", "Hiện tại hoàn thành có dạng have / has + V3. Chủ ngữ I đi với have, nên đáp án là have. Am không đi với finished trong thì này."),
      mc("q2", "e", "She ___ visited Paris three times.", ["has", "have", "is"], "has", "hp-hinh-thuc", "Cô ấy đã đến Paris ba lần.", "She đi với has.", "She là ngôi thứ ba số ít nên dùng has. Cấu trúc đầy đủ là has + visited (V3). Câu nói về trải nghiệm trong đời nên dùng hiện tại hoàn thành."),
      fl("q3", "e", "We have ___ lunch already. (eat)", "eaten", "hp-hinh-thuc", "Chúng tôi đã ăn trưa rồi.", "V3 của eat là eaten.", "Sau have phải dùng quá khứ phân từ (V3). Eat là động từ bất quy tắc: eat → ate → eaten. Dạng ate là V2 nên không dùng được ở đây."),
      mc("q4", "e", "He has ___ his keys.", ["lost", "lose", "losing"], "lost", "hp-hinh-thuc", "Anh ấy đã làm mất chìa khóa.", "Sau has dùng V3: lost.", "Sau has là quá khứ phân từ. Lose → lost → lost. Câu cho thấy việc mất chìa khóa còn ảnh hưởng đến hiện tại (bây giờ không có chìa)."),
      mc("q5", "e", "They ___ not seen that film.", ["have", "has", "did"], "have", "hp-hinh-thuc", "Họ chưa xem bộ phim đó.", "They đi với have; phủ định là have not.", "Phủ định hiện tại hoàn thành là have / has + not + V3. They đi với have. Did not seen là sai vì sau did phải dùng động từ nguyên mẫu, và seen là V3."),
      mc("q6", "m", "I have lived here ___ 2019.", ["since", "for", "ago"], "since", "hp-for-since", "Tôi đã sống ở đây từ năm 2019.", "2019 là mốc thời gian nên dùng since.", "Since đi với một mốc thời gian (2019, Monday, I was ten). For đi với một khoảng thời gian (five years). Ago dùng với quá khứ đơn, không đi với hiện tại hoàn thành."),
      mc("q7", "m", "She has worked here ___ five years.", ["for", "since", "from"], "for", "hp-for-since", "Cô ấy đã làm việc ở đây năm năm.", "Five years là khoảng thời gian nên dùng for.", "For + khoảng thời gian (five years, two months, a long time). Nếu muốn dùng since thì phải đổi thành mốc, ví dụ since 2020."),
      fl("q8", "m", "Have you ___ been to Japan?", "ever", "hp-ever-yet", "Bạn đã từng đến Nhật Bản chưa?", "Ever = từng, dùng trong câu hỏi về trải nghiệm.", "Khi hỏi về trải nghiệm trong đời, ta dùng ever (từng) đặt giữa have và V3. Câu trả lời thường là Yes, I have. hoặc No, I never have / No, never."),
      mc("q9", "m", "Where is Tom? — He has ___ to the shop. (anh ấy chưa về)", ["gone", "been", "went"], "gone", "hp-vs-qk", "Tom đâu rồi? — Anh ấy đã đi cửa hàng (chưa về).", "Gone to = đã đi và chưa về.", "Gone to nghĩa là đã đi đến đó và vẫn còn ở đó, nên hợp với câu hỏi Tom đang ở đâu. Been to nghĩa là đã đi rồi và đã quay về. Went là V2, không đi với has."),
      fl("q10", "m", "I haven't finished the report ___.", "yet", "hp-ever-yet", "Tôi vẫn chưa làm xong bản báo cáo.", "Yet = chưa, đặt cuối câu phủ định và câu hỏi.", "Yet dùng trong câu phủ định và câu hỏi, nghĩa là cho đến lúc này vẫn chưa. Đối lập là already (đã rồi), dùng trong câu khẳng định."),
      mc("q11", "h", "Câu nào đúng?", ["I saw him yesterday.", "I have seen him yesterday.", "I have saw him yesterday."], "I saw him yesterday.", "hp-vs-qk", "Hôm qua tôi đã gặp anh ấy.", "Có yesterday nên dùng quá khứ đơn.", "Yesterday là mốc thời gian đã kết thúc, nên phải dùng quá khứ đơn (saw). Hiện tại hoàn thành không đi với yesterday, last week, ago... Câu thứ ba còn sai thêm vì sau have phải là seen, không phải saw."),
      mc("q12", "h", "She ___ here since she was a child.", ["has lived", "lived", "is living"], "has lived", "hp-for-since", "Cô ấy đã sống ở đây từ nhỏ.", "Since + mốc thời gian đi với hiện tại hoàn thành.", "Việc bắt đầu từ lúc nhỏ và còn kéo dài đến nay nên dùng hiện tại hoàn thành. Lived (quá khứ đơn) ngụ ý đã không còn sống ở đó nữa; is living không đi với since."),
      fl("q13", "h", "My grandmother has never ___ in a plane. (fly)", "flown", "hp-hinh-thuc", "Bà tôi chưa bao giờ đi máy bay.", "V3 của fly là flown.", "Fly là động từ bất quy tắc: fly → flew → flown. Sau has never phải dùng V3 nên đáp án là flown, không phải flew."),
      mc("q14", "h", "When ___ you move to this city?", ["did", "have", "do"], "did", "hp-vs-qk", "Bạn chuyển đến thành phố này khi nào?", "When hỏi về thời điểm cụ thể nên dùng quá khứ đơn.", "When hỏi một thời điểm đã xác định, nên câu hỏi dùng quá khứ đơn: When did you move...? Không nói When have you moved. Câu trả lời cũng ở quá khứ đơn: I moved here in 2020."),
      mc("q15", "h", "Câu nào đúng?", ["How long have you known her?", "How long do you know her?", "How long did you have known her?"], "How long have you known her?", "hp-for-since", "Bạn quen cô ấy bao lâu rồi?", "How long + hiện tại hoàn thành để hỏi độ dài đến nay.", "Hỏi việc kéo dài từ quá khứ đến hiện tại thì dùng How long have / has + S + V3. Know là động từ trạng thái nên không dùng thì tiếp diễn. Câu thứ ba sai vì did không đi với have known.")
    ]
  });

  window.GRAMMAR.push({
    id: "present-perfect-continuous", cefr: "B1",
    title: "Hiện tại hoàn thành tiếp diễn",
    summary: "Nhấn mạnh việc đã và đang diễn ra liên tục trong một thời gian.",
    formula: "S + have / has + been + V-ing",
    sections: [
      {
        heading: "1. Hình thức: have / has been + V-ing",
        body: "Thêm been và V-ing sau have / has. Phủ định: haven't / hasn't been + V-ing. Câu hỏi: Have / Has + chủ ngữ + been + V-ing? Thì này hay đi với for, since và How long.",
        table: [
          ["Chủ ngữ", "Khẳng định", "Phủ định", "Câu hỏi"],
          ["I / you / we / they", "have been waiting", "haven't been waiting", "Have you been waiting?"],
          ["he / she / it", "has been waiting", "hasn't been waiting", "Has he been waiting?"]
        ],
        examples: [
          { en: "I have been studying English for two years.", vi: "Tôi đã học tiếng Anh được hai năm (và vẫn đang học)." },
          { en: "It has been raining since morning.", vi: "Trời đã mưa từ sáng." },
          { en: "How long have you been waiting?", vi: "Bạn đã chờ bao lâu rồi?" }
        ]
      },
      {
        heading: "2. Khi nào dùng",
        body: "(a) Việc bắt đầu trong quá khứ, vẫn đang diễn ra hoặc vừa mới dừng, nhấn mạnh quá trình kéo dài: She has been working all day. (b) Việc vừa dừng và còn dấu vết ở hiện tại: Your eyes are red. Have you been crying?",
        examples: [
          { en: "We have been living here since 2020.", vi: "Chúng tôi sống ở đây từ năm 2020." },
          { en: "You look tired. Have you been working?", vi: "Trông bạn mệt quá. Bạn đã làm việc liên tục à?" }
        ]
      },
      {
        heading: "3. So với hiện tại hoàn thành",
        body: "Hoàn thành tiếp diễn nhấn mạnh quá trình và dùng với How long. Hiện tại hoàn thành nhấn mạnh kết quả và số lượng, dùng với How many / How much. Động từ trạng thái (know, like, love, have = sở hữu, want, believe) không dùng thì tiếp diễn, nên dùng hiện tại hoàn thành: I have known her for years (không nói I have been knowing).",
        examples: [
          { en: "I have been writing emails all morning.", vi: "Cả sáng nay tôi viết email. (nhấn quá trình)" },
          { en: "I have written ten emails this morning.", vi: "Sáng nay tôi đã viết mười email. (nhấn số lượng)" },
          { en: "I have had this phone for three years.", vi: "Tôi dùng chiếc điện thoại này ba năm rồi. (have = sở hữu, không dùng tiếp diễn)" }
        ]
      }
    ],
    walk: [
      w("She has been working here since June.", "Cô ấy làm việc ở đây từ tháng Sáu đến giờ.", "has been working: quá trình kéo dài từ mốc June đến nay; since + mốc thời gian."),
      w("Why are you out of breath? — I have been running.", "Sao bạn thở dốc vậy? — Tôi vừa chạy.", "Việc chạy vừa dừng và còn dấu vết (đang thở dốc), nên dùng hiện tại hoàn thành tiếp diễn."),
      w("How long have they been waiting?", "Họ đã chờ bao lâu rồi?", "How long hỏi độ dài của quá trình; đảo have lên trước they.")
    ],
    mistakes: [
      x("I have been know her for years.", "I have known her for years.", "Know là động từ trạng thái, không dùng thì tiếp diễn."),
      x("He has been work all day.", "He has been working all day.", "Sau been phải là V-ing."),
      x("She have been waiting for an hour.", "She has been waiting for an hour.", "She đi với has, không đi với have.")
    ],
    check: [
      "Câu nhấn mạnh quá trình hay kết quả? || Quá trình hoặc How long → have been + V-ing. Kết quả hoặc số lượng (How many) → have + V3.",
      "Động từ trong câu có phải động từ trạng thái không? || Know, like, love, want, believe, have (sở hữu) không dùng tiếp diễn. Dùng have + V3.",
      "Chủ ngữ đi với have hay has? || I, you, we, they → have. He, she, it → has. Sau đó luôn có been.",
      "Sau been là dạng nào? || Luôn là V-ing: been working, been waiting, been studying."
    ],
    questions: [
      mc("q1", "e", "I have been ___ English for two years.", ["studying", "study", "studied"], "studying", "hpt-hinh-thuc", "Tôi đã học tiếng Anh được hai năm.", "Sau have been là V-ing.", "Hiện tại hoàn thành tiếp diễn có cấu trúc have / has been + V-ing nên cần studying. Study và studied đều không đúng sau been."),
      mc("q2", "e", "She ___ been waiting for an hour.", ["has", "have", "is"], "has", "hpt-hinh-thuc", "Cô ấy đã chờ một tiếng rồi.", "She đi với has.", "She là ngôi thứ ba số ít nên dùng has: has been waiting. Have dùng với I, you, we, they."),
      fl("q3", "e", "They have been ___ since 8 o'clock. (work)", "working", "hpt-hinh-thuc", "Họ làm việc từ 8 giờ đến giờ.", "Sau been dùng V-ing: working.", "Cấu trúc là have been + V-ing. Since 8 o'clock là một mốc thời gian, báo hiệu việc kéo dài đến bây giờ."),
      mc("q4", "e", "How long have you been ___ here?", ["living", "live", "lived"], "living", "hpt-hinh-thuc", "Bạn sống ở đây bao lâu rồi?", "How long + have + S + been + V-ing.", "Câu hỏi về độ dài của một quá trình dùng How long have you been + V-ing. Living là V-ing của live."),
      mc("q5", "e", "He hasn't ___ sleeping well lately.", ["been", "be", "being"], "been", "hpt-hinh-thuc", "Dạo này anh ấy ngủ không ngon.", "hasn't + been + V-ing.", "Phủ định giữ nguyên cấu trúc, chỉ thêm not: hasn't been sleeping. Sau has / have luôn dùng been, không dùng be hay being."),
      mc("q6", "m", "It ___ raining since morning.", ["has been", "have been", "is"], "has been", "hpt-hinh-thuc", "Trời mưa từ sáng đến giờ.", "It đi với has been; since + mốc thời gian.", "It là ngôi thứ ba số ít nên dùng has been. Since morning là mốc thời gian, báo hiệu việc kéo dài đến hiện tại. Is raining không đi với since."),
      mc("q7", "m", "I'm tired. I ___ all day.", ["have been working", "worked", "am working"], "have been working", "hpt-vs-hp", "Tôi mệt. Tôi làm việc cả ngày rồi.", "Quá trình kéo dài và còn hậu quả: have been + V-ing.", "Việc làm việc cả ngày vừa dừng và để lại kết quả (mệt) ở hiện tại, nên dùng hiện tại hoàn thành tiếp diễn. Worked chỉ nói việc đã xong và không liên hệ với hiện tại."),
      fl("q8", "m", "We have been learning English ___ three months.", "for", "hp-for-since", "Chúng tôi học tiếng Anh được ba tháng.", "Khoảng thời gian dùng for.", "Three months là một khoảng thời gian nên dùng for. Nếu có mốc thời gian (since March) thì dùng since."),
      fl("q9", "m", "She has been living here ___ 2020.", "since", "hp-for-since", "Cô ấy sống ở đây từ năm 2020.", "2020 là mốc thời gian nên dùng since.", "Since + mốc thời gian (2020, June, Monday). For + khoảng thời gian. Cả hai đều đi được với hiện tại hoàn thành tiếp diễn."),
      mc("q10", "m", "Why are your hands dirty? — I ___ in the garden.", ["have been digging", "dig", "digged"], "have been digging", "hpt-vs-hp", "Sao tay bạn dơ vậy? — Tôi vừa đào đất ngoài vườn.", "Việc vừa dừng, còn dấu vết: have been + V-ing.", "Tay dơ là kết quả nhìn thấy của việc vừa làm, nên dùng hiện tại hoàn thành tiếp diễn. Digged sai vì dig là động từ bất quy tắc (dug)."),
      mc("q11", "h", "Câu nào đúng?", ["I have written five emails this morning.", "I have been writing five emails this morning.", "I am writing five emails this morning."], "I have written five emails this morning.", "hpt-vs-hp", "Sáng nay tôi đã viết năm email.", "Có số lượng (five emails) thì dùng hiện tại hoàn thành.", "Khi nói đến số lượng hoặc kết quả hoàn tất (five emails) ta dùng have + V3. Tiếp diễn dùng khi nhấn quá trình, ví dụ: I have been writing emails all morning."),
      mc("q12", "h", "I ___ this phone for three years.", ["have had", "have been having", "had"], "have had", "hpt-vs-hp", "Tôi dùng chiếc điện thoại này ba năm rồi.", "Have (sở hữu) là động từ trạng thái, không dùng tiếp diễn.", "Have với nghĩa sở hữu không dùng thì tiếp diễn, nên dùng have had. Had (quá khứ đơn) ngụ ý bây giờ không còn nữa, không hợp với for three years kéo dài đến nay."),
      mc("q13", "h", "Câu nào đúng?", ["She has known him for years.", "She has been knowing him for years.", "She knows him since years."], "She has known him for years.", "hpt-vs-hp", "Cô ấy quen anh ấy nhiều năm rồi.", "Know là động từ trạng thái, dùng have + V3.", "Know không dùng thì tiếp diễn nên câu hai sai. Câu ba sai vì since cần một mốc thời gian, và knows không phải thì hoàn thành."),
      fl("q14", "h", "How long ___ you been waiting? (have / has)", "have", "hpt-hinh-thuc", "Bạn đã chờ bao lâu rồi?", "You đi với have.", "Chủ ngữ you đi với have: How long have you been waiting? Has chỉ dùng với he, she, it."),
      mc("q15", "h", "Câu nào đúng?", ["He has been cooking, so the kitchen smells good.", "He is cooking since two hours.", "He cooks since two hours."], "He has been cooking, so the kitchen smells good.", "hpt-vs-hp", "Anh ấy vừa nấu ăn nên nhà bếp thơm lắm.", "Việc vừa dừng và còn dấu vết: has been cooking.", "Mùi thơm trong bếp là dấu vết của việc nấu vừa diễn ra, nên dùng hiện tại hoàn thành tiếp diễn. Hai câu còn lại sai vì since cần mốc thời gian và phải đi với thì hoàn thành, không dùng thì hiện tại.")
    ]
  });

  window.GRAMMAR.push({
    id: "quantifiers", cefr: "A2",
    title: "Lượng từ: some, any, no, every, enough, too",
    summary: "Nói có bao nhiêu và đủ hay chưa: some, any, no, somebody, enough, too.",
    formula: "some (khẳng định) · any (phủ định, nghi vấn) · no = not any · enough / too",
    sections: [
      {
        heading: "1. some, any, no và các từ ghép",
        body: "Some dùng trong câu khẳng định (I have some money). Any dùng trong câu phủ định và câu hỏi (I don't have any money. Do you have any money?). No = not any và đi với động từ khẳng định (I have no money). Khi dùng trong lời mời và lời đề nghị mà người nói mong nhận được câu trả lời Yes, vẫn dùng some: Would you like some tea? Các từ ghép theo cùng quy tắc: somebody / someone / something / somewhere, anybody / anyone / anything / anywhere, nobody / no one / nothing / nowhere. Chúng đi với động từ số ít.",
        table: [
          ["Khẳng định", "Phủ định / Nghi vấn", "Phủ định bằng no"],
          ["some", "any", "no"],
          ["somebody / someone", "anybody / anyone", "nobody / no one"],
          ["something", "anything", "nothing"],
          ["somewhere", "anywhere", "nowhere"]
        ],
        examples: [
          { en: "There is some milk in the fridge.", vi: "Trong tủ lạnh có ít sữa." },
          { en: "I didn't see anyone at the party.", vi: "Tôi không thấy ai ở bữa tiệc." },
          { en: "Would you like some coffee?", vi: "Bạn có muốn uống chút cà phê không?" }
        ]
      },
      {
        heading: "2. every, all, both, neither",
        body: "Every + danh từ số ít, đi với động từ số ít: Every student has a book. Everyone / everybody / everything cũng đi với động từ số ít. All + danh từ số nhiều hoặc không đếm được: All students have books. Both nói về hai người hoặc hai vật (cả hai): Both of my sisters live in London. Neither nghĩa là không cái nào trong hai: Neither answer is correct.",
        examples: [
          { en: "Everyone is happy today.", vi: "Hôm nay ai cũng vui." },
          { en: "Both of my parents are teachers.", vi: "Cả bố và mẹ tôi đều là giáo viên." },
          { en: "Neither bag is mine.", vi: "Không cái túi nào là của tôi." }
        ]
      },
      {
        heading: "3. enough và too",
        body: "Enough nghĩa là đủ. Với danh từ: enough đứng trước (enough money). Với tính từ hoặc trạng từ: enough đứng sau (old enough, fast enough). Too nghĩa là quá (mức cần thiết, nên thường mang ý tiêu cực) và đứng trước tính từ: too hot, too expensive. Khác với very (rất), too ngụ ý không làm được: The soup is too hot to eat.",
        examples: [
          { en: "We have enough time.", vi: "Chúng ta có đủ thời gian." },
          { en: "She is old enough to drive.", vi: "Cô ấy đủ tuổi để lái xe." },
          { en: "This bag is too heavy for me.", vi: "Cái túi này quá nặng đối với tôi." }
        ]
      }
    ],
    walk: [
      w("I don't have any questions.", "Tôi không có câu hỏi nào.", "Câu phủ định dùng any, không dùng some."),
      w("Would you like some water?", "Bạn có muốn uống chút nước không?", "Lời mời lịch sự dùng some dù là câu hỏi."),
      w("The room is not big enough for fifty people.", "Căn phòng không đủ rộng cho năm mươi người.", "Enough đứng sau tính từ (big enough).")
    ],
    mistakes: [
      x("I don't know nothing.", "I don't know anything.", "Tiếng Anh chuẩn không dùng hai lần phủ định. Dùng not + any hoặc no."),
      x("Everyone are happy.", "Everyone is happy.", "Everyone đi với động từ số ít."),
      x("She is enough old to drive.", "She is old enough to drive.", "Enough đứng sau tính từ, không đứng trước.")
    ],
    check: [
      "Câu là khẳng định, phủ định hay câu hỏi? || Khẳng định → some. Phủ định hoặc câu hỏi → any. Nếu câu đã có no / nobody / nothing thì không thêm not.",
      "Chỗ trống là người, vật hay nơi chốn? || Người → -body / -one. Vật → -thing. Nơi chốn → -where. Chọn some-, any- hoặc no- theo kiểu câu.",
      "Danh từ đi sau là số ít hay số nhiều? || Every + số ít. All + số nhiều hoặc không đếm được. Every / everyone luôn đi với động từ số ít.",
      "Enough hay too? || Enough = đủ, đứng sau tính từ hoặc trước danh từ. Too = quá mức, đứng trước tính từ và thường mang nghĩa không tốt."
    ],
    questions: [
      mc("q1", "e", "There is ___ milk in the fridge.", ["some", "any", "many"], "some", "luong-some-any", "Trong tủ lạnh có ít sữa.", "Câu khẳng định dùng some.", "Some dùng trong câu khẳng định. Any dùng cho câu phủ định và câu hỏi. Many chỉ đi với danh từ đếm được số nhiều, mà milk là danh từ không đếm được."),
      mc("q2", "e", "I don't have ___ money.", ["any", "some", "a"], "any", "luong-some-any", "Tôi không có đồng nào.", "Câu phủ định dùng any.", "Trong câu phủ định ta dùng any thay cho some. Money là danh từ không đếm được nên không đi với a."),
      mc("q3", "e", "Is there ___ bread?", ["any", "some", "no"], "any", "luong-some-any", "Có bánh mì không?", "Câu hỏi thông thường dùng any.", "Câu hỏi thông thường dùng any. No không dùng trong câu hỏi dạng này."),
      mc("q4", "e", "There is ___ in the box. It is empty.", ["nothing", "anything", "something"], "nothing", "luong-hop-chat", "Không có gì trong hộp. Nó trống.", "Nothing = không có gì.", "Hộp trống nghĩa là không có gì, nên dùng nothing. Anything dùng trong câu phủ định hoặc nghi vấn; something nghĩa là có một vật nào đó."),
      mc("q5", "e", "___ is at the door. Please open it.", ["Somebody", "Anybody", "Nobody"], "Somebody", "luong-hop-chat", "Có ai đó ở cửa. Làm ơn mở cửa đi.", "Câu khẳng định có người cụ thể ở cửa: somebody.", "Có một người (chưa biết ai) ở cửa nên dùng somebody. Anybody dùng trong phủ định hoặc nghi vấn. Nobody (không ai) không hợp với yêu cầu mở cửa."),
      mc("q6", "m", "I didn't see ___ at the party.", ["anyone", "someone", "everyone"], "anyone", "luong-hop-chat", "Tôi không thấy ai ở bữa tiệc.", "Câu phủ định dùng anyone.", "Trong câu phủ định ta dùng anyone (không dùng someone). Câu này nghĩa là tôi không thấy ai cả."),
      mc("q7", "m", "Every student ___ a book.", ["has", "have", "are having"], "has", "luong-every", "Mỗi học sinh có một quyển sách.", "Every + danh từ số ít, động từ số ít.", "Every luôn đi với danh từ số ít và động từ số ít, nên dùng has. Have dành cho chủ ngữ số nhiều."),
      mc("q8", "m", "We have ___ time. Let's not hurry.", ["enough", "too", "none"], "enough", "luong-enough-too", "Chúng ta có đủ thời gian. Đừng vội.", "Enough + danh từ = đủ.", "Enough đứng trước danh từ (enough time) và nghĩa là đủ. Too đứng trước tính từ, không đứng trước danh từ."),
      fl("q9", "m", "She is old ___ to drive. (enough)", "enough", "luong-enough-too", "Cô ấy đủ tuổi để lái xe.", "Tính từ + enough.", "Với tính từ, enough đứng sau: old enough. Đây là lỗi hay gặp vì tiếng Việt nói đủ già, nhưng tiếng Anh đặt enough sau tính từ."),
      mc("q10", "m", "Câu nào đúng?", ["Everyone is happy.", "Everyone are happy.", "Every one are happy."], "Everyone is happy.", "luong-every", "Ai cũng vui.", "Everyone đi với động từ số ít.", "Dù nghĩa là mọi người, everyone về ngữ pháp là số ít nên đi với is. Các câu còn lại dùng are là sai."),
      mc("q11", "h", "Câu nào đúng?", ["I don't know anything.", "I don't know nothing.", "I know anything not."], "I don't know anything.", "luong-hop-chat", "Tôi không biết gì cả.", "Không dùng hai phủ định: not + anything.", "Tiếng Anh chuẩn chỉ dùng một phủ định trong câu. Có thể nói I don't know anything hoặc I know nothing, nhưng không nói I don't know nothing."),
      mc("q12", "h", "Would you like ___ tea?", ["some", "any", "no"], "some", "luong-some-any", "Bạn có muốn uống chút trà không?", "Lời mời dùng some.", "Dù là câu hỏi, lời mời và lời đề nghị thường dùng some vì người nói mong người kia trả lời Yes."),
      fl("q13", "h", "The room is not big ___ for 50 people.", "enough", "luong-enough-too", "Căn phòng không đủ rộng cho 50 người.", "Tính từ + enough.", "Enough đứng sau tính từ big. Cấu trúc này hay đi với for + người hoặc to + động từ."),
      mc("q14", "h", "He is ___ young to vote.", ["too", "enough", "very"], "too", "luong-enough-too", "Anh ấy còn quá trẻ để đi bầu.", "Too + tính từ + to V = quá... để không thể.", "Too ngụ ý quá mức nên không làm được. Very chỉ nhấn mạnh mà không nói không làm được, và very young to vote là câu sai. Enough sẽ làm nghĩa ngược lại."),
      mc("q15", "h", "Câu nào đúng?", ["There is no milk left.", "There isn't no milk left.", "There not is no milk left."], "There is no milk left.", "luong-some-any", "Không còn chút sữa nào.", "No đã mang nghĩa phủ định nên động từ giữ khẳng định.", "No = not any, đã chứa nghĩa phủ định, nên động từ không thêm not nữa. Câu hai dùng hai lần phủ định, còn câu ba sai trật tự từ.")
    ]
  });
})();
