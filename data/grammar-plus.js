/* Bổ sung cho 17 chủ đề ngữ pháp: bậc CEFR, mức khó của câu hỏi, công thức, phân tích ví dụ,
   lỗi thường gặp, checklist và câu hỏi mới. Do AI sinh sẵn một lần (phương án B).
   lv: mỗi ký tự là mức của một câu cũ theo thứ tự q1, q2...  e = Dễ, m = Vừa, h = Khó. */
(function () {
  var mc = function (id, lv, q, o, a, e, t) { return { id: id, type: "mc", lv: lv, q: q, options: o, answer: a, explain: e, tag: t }; };
  var fl = function (id, lv, q, a, e, t) { var A = Array.isArray(a) ? a : [a]; return { id: id, type: "fill", lv: lv, q: q, answers: A, answer: A[0], explain: e, tag: t }; };
  var w = function (en, vi, note) { return { en: en, vi: vi, note: note }; };
  var x = function (wrong, right, why) { return { wrong: wrong, right: right, why: why }; };

  window.TAG_LABELS = Object.assign(window.TAG_LABELS || {}, {
    "dau-hieu-qua-khu": "Dấu hiệu nhận biết quá khứ (ago, last, yesterday)"
  });

  window.GRAMMAR_PLUS = {
    "to-be": {
      cefr: "A1", formula: "S + am / is / are + bổ ngữ", lv: "eeeeeemmmmmmhh",
      walk: [
        w("She is a student.", "Cô ấy là học sinh.", "She là ngôi thứ ba số ít nên dùng is; sau is là cụm danh từ cho biết nghề nghiệp."),
        w("They are not at home.", "Họ không ở nhà.", "Phủ định chỉ thêm not sau are, không cần trợ động từ do."),
        w("Are you hungry?", "Bạn có đói không?", "Câu hỏi đảo are lên trước chủ ngữ you, không thêm do.")
      ],
      mistakes: [
        x("She are a doctor.", "She is a doctor.", "She là ngôi thứ ba số ít nên dùng is, không dùng are."),
        x("Do you are tired?", "Are you tired?", "To be tự làm trợ động từ, nên không thêm do hay does."),
        x("I have 12 years old.", "I am 12 years old.", "Tiếng Anh dùng to be để nói tuổi, không dùng have.")
      ],
      check: ["Chủ ngữ của câu là ai? || Tìm từ đứng trước chỗ trống. I → am. He, she, it (hoặc một người, một vật) → is. You, we, they (hoặc nhiều người) → are.", "Em đã chọn đúng am, is, are chưa? || Đọc lại cả câu. Ví dụ: My brother ___ tall. My brother thay được bằng he nên chọn is.", "Nếu là câu phủ định, not nằm ngay sau to be chưa? || Phủ định chỉ cần thêm not sau am, is, are. Ví dụ: She is not tired. Không thêm do hay does.", "Nếu là câu hỏi, em đã đưa am, is, are lên đầu câu chưa? || Đổi chỗ to be và chủ ngữ: She is ready → Is she ready? Không cần do hay does."],
      more: [
        mc("q15", "m", "Tom and Ben ___ brothers.", ["are", "is", "am"], "are", "Hai người (Tom and Ben) là số nhiều nên dùng are.", "chia-to-be"),
        fl("q16", "m", "My parents ___ at work now.", "are", "Parents là số nhiều nên dùng are.", "chia-to-be"),
        mc("q17", "m", "___ your keys on the table?", ["Are", "Is", "Am"], "Are", "Keys là số nhiều nên câu hỏi bắt đầu bằng Are.", "cau-hoi-to-be"),
        mc("q18", "h", "Câu nào đúng?", ["She isn't a nurse.", "She not is a nurse.", "She doesn't a nurse."], "She isn't a nurse.", "Phủ định của is là isn't, không dùng doesn't với to be.", "phu-dinh-to-be"),
        mc("q19", "h", "Câu nào đúng?", ["How old are you?", "How old do you?", "How old you are?"], "How old are you?", "Câu hỏi dùng to be: How old + are + you.", "cau-hoi-to-be"),
        mc("q20", "h", "Are Tom and Anna here? — No, they ___.", ["aren't", "isn't", "don't"], "aren't", "Tom and Anna là they, câu trả lời ngắn dùng aren't.", "tra-loi-ngan"),
        fl("q21", "h", "He ___ at school today. (phủ định, viết tắt)", ["isn't", "is not"], "Phủ định của is là isn't hoặc is not.", "viet-tat-to-be"),
        mc("q22", "h", "Câu nào đúng?", ["It is hot today.", "Is hot today.", "It are hot today."], "It is hot today.", "Câu tiếng Anh cần chủ ngữ it để nói về thời tiết, và it đi với is.", "chia-to-be")
      ]
    },

    "present-simple": {
      cefr: "A1", formula: "S + V(s/es) · don't / doesn't + V · Do / Does + S + V?", lv: "eeeeeemmmmmmmhh",
      walk: [
        w("She works in a bank.", "Cô ấy làm việc ở ngân hàng.", "She là ngôi thứ ba số ít nên động từ thêm -s: works."),
        w("He doesn't like coffee.", "Anh ấy không thích cà phê.", "Phủ định dùng doesn't + động từ nguyên mẫu; like không thêm -s."),
        w("Do they live in Hue?", "Họ có sống ở Huế không?", "Câu hỏi bắt đầu bằng Do với they; động từ live giữ nguyên.")
      ],
      mistakes: [
        x("He work in a shop.", "He works in a shop.", "Với he, she, it, động từ thêm -s hoặc -es."),
        x("She doesn't likes tea.", "She doesn't like tea.", "Sau doesn't là động từ nguyên mẫu, không thêm -s."),
        x("Does she works here?", "Does she work here?", "Does đã mang -s nên động từ chính giữ nguyên.")
      ],
      check: ["Chủ ngữ có phải he, she, it (hoặc một người, một vật) không? || Nếu có, động từ thêm -s hoặc -es: She works. He watches. Với I, you, we, they thì giữ nguyên: I work.", "Câu phủ định đã dùng don't hoặc doesn't chưa? || Dùng don't với I, you, we, they; doesn't với he, she, it. Sau don't hoặc doesn't, động từ về nguyên mẫu: She doesn't work.", "Câu hỏi đã bắt đầu bằng Do hoặc Does chưa? || Do với I, you, we, they; Does với he, she, it. Động từ chính sau đó không có -s: Does she work?", "Trạng từ tần suất (always, usually, never) đã đặt đúng chỗ chưa? || Đứng trước động từ thường: I always eat. Đứng sau to be: She is always late."],
      more: [
        mc("q16", "m", "My mother ___ dinner every evening.", ["cooks", "cook", "cooking"], "cooks", "My mother là she nên động từ thêm -s.", "them-s-es"),
        fl("q17", "m", "The baby ___ (cry) a lot.", "cries", "Động từ tận cùng phụ âm + y đổi y thành i rồi thêm -es: cries.", "them-s-es"),
        mc("q18", "m", "___ your brother play the guitar?", ["Does", "Do", "Is"], "Does", "Your brother là he nên dùng Does.", "cau-hoi-hien-tai-don"),
        mc("q19", "h", "Câu nào đúng?", ["Does he like fish?", "Do he likes fish?", "Does he likes fish?"], "Does he like fish?", "Sau Does động từ giữ nguyên, không thêm -s.", "cau-hoi-hien-tai-don"),
        mc("q20", "h", "Câu nào đúng?", ["She doesn't have a car.", "She doesn't has a car.", "She don't have a car."], "She doesn't have a car.", "She đi với doesn't, sau đó là have nguyên mẫu.", "phu-dinh-hien-tai-don"),
        fl("q21", "h", "We ___ (not / go) to school on Sunday.", ["don't go", "do not go"], "We đi với don't, sau đó là động từ nguyên mẫu go.", "phu-dinh-hien-tai-don"),
        mc("q22", "h", "Water ___ at 100 degrees.", ["boils", "boil", "is boiling"], "boils", "Sự thật hiển nhiên dùng hiện tại đơn; water là it nên thêm -s.", "them-s-es"),
        fl("q23", "h", "How often ___ he visit his grandparents?", "does", "Câu hỏi với he dùng does, động từ visit giữ nguyên.", "cau-hoi-hien-tai-don")
      ]
    },

    "present-continuous": {
      cefr: "A1", formula: "S + am / is / are + V-ing", lv: "eeeeeemmmmmmhh",
      walk: [
        w("She is reading a book now.", "Bây giờ cô ấy đang đọc sách.", "Từ now cho thấy hành động đang diễn ra, nên dùng is + reading."),
        w("I am not sleeping.", "Tôi đang không ngủ.", "Phủ định: am not + V-ing."),
        w("What are they doing?", "Họ đang làm gì?", "Từ để hỏi What + are + chủ ngữ + V-ing.")
      ],
      mistakes: [
        x("I working now.", "I am working now.", "Không được bỏ to be trước V-ing."),
        x("She is sit on the sofa.", "She is sitting on the sofa.", "Sau to be cần V-ing, và sit gấp đôi phụ âm: sitting."),
        x("I am knowing the answer.", "I know the answer.", "Know là động từ trạng thái, thường không dùng ở thì tiếp diễn.")
      ],
      check: ["Việc này đang xảy ra ngay lúc nói chưa? || Có now, at the moment, look!, listen! thì dùng hiện tại tiếp diễn: I am reading now.", "Em đã chọn am, is, are đúng chủ ngữ chưa? || Công thức: am / is / are + động từ-ing. Ví dụ: They are playing.", "Động từ -ing viết đúng chính tả chưa? || Bỏ e rồi thêm ing: make → making. Gấp đôi phụ âm cuối với từ ngắn: run → running, sit → sitting.", "Có động từ chỉ trạng thái (know, like, want, love) không? || Các từ này thường không dùng -ing. Nói I know the answer, không nói I am knowing."],
      more: [
        mc("q15", "m", "Look! The children ___ in the garden.", ["are playing", "play", "is playing"], "are playing", "Look! cho thấy đang diễn ra; children là số nhiều nên dùng are playing.", "cau-truc-tiep-dien"),
        fl("q16", "m", "She is ___ (swim) in the pool.", "swimming", "Swim gấp đôi phụ âm cuối rồi thêm -ing: swimming.", "them-ing"),
        mc("q17", "m", "Is it ___ now?", ["raining", "rain", "rains"], "raining", "Sau Is it cần V-ing: raining.", "cau-hoi-tiep-dien"),
        mc("q18", "h", "Câu nào đúng?", ["He is not watching TV.", "He not is watching TV.", "He doesn't watching TV."], "He is not watching TV.", "Phủ định: is + not + V-ing, không dùng doesn't.", "phu-dinh-tiep-dien"),
        fl("q19", "h", "They are ___ (lie) on the beach.", "lying", "Lie đổi ie thành y rồi thêm -ing: lying.", "them-ing"),
        mc("q20", "h", "Câu nào đúng?", ["I want a coffee.", "I am wanting a coffee.", "I wanting a coffee."], "I want a coffee.", "Want là động từ trạng thái, thường không dùng tiếp diễn.", "dong-tu-trang-thai"),
        mc("q21", "h", "Where ___ you going?", ["are", "do", "is"], "are", "Câu hỏi tiếp diễn: Where + are + you + V-ing.", "cau-hoi-tiep-dien"),
        mc("q22", "h", "She usually walks to work, but today she ___ the bus.", ["is taking", "takes", "take"], "is taking", "Today cho thấy hành động đang diễn ra khác thói quen, nên dùng is taking.", "cau-truc-tiep-dien")
      ]
    },

    "past-simple": {
      cefr: "A2", formula: "S + V2 / V-ed · didn't + V · Did + S + V?", lv: "eeeeeemmmmmmmmhh",
      walk: [
        w("We visited Hue last summer.", "Mùa hè năm ngoái chúng tôi đã thăm Huế.", "Last summer là mốc quá khứ đã kết thúc; visit thêm -ed."),
        w("She didn't go to school yesterday.", "Hôm qua cô ấy không đi học.", "Phủ định: didn't + động từ nguyên mẫu go, không dùng went."),
        w("Did you see the film?", "Bạn đã xem bộ phim đó chưa?", "Câu hỏi: Did + chủ ngữ + động từ nguyên mẫu see.")
      ],
      mistakes: [
        x("I didn't went to school.", "I didn't go to school.", "Sau didn't dùng động từ nguyên mẫu, không dùng V2."),
        x("Did you went there?", "Did you go there?", "Sau Did động từ về nguyên mẫu."),
        x("She goed home.", "She went home.", "Go là động từ bất quy tắc: go – went – gone.")
      ],
      check: ["Câu có mốc thời gian đã qua không? || Các dấu hiệu: yesterday, last week, two days ago, in 2019. Có chúng thì dùng quá khứ đơn.", "Động từ có quy tắc đã thêm -ed chưa? || Thêm ed: work → worked. Từ kết thúc bằng e chỉ thêm d: like → liked. Phụ âm + y đổi thành ied: study → studied.", "Động từ bất quy tắc đã dùng đúng dạng quá khứ chưa? || Các từ này không thêm ed mà đổi hẳn: go → went, eat → ate, see → saw. Cần học thuộc.", "Sau did hoặc didn't, động từ đã về nguyên mẫu chưa? || Did đã mang nghĩa quá khứ rồi, nên động từ giữ nguyên: Did you go? (không nói Did you went)."],
      more: [
        mc("q17", "m", "She ___ the door and went in.", ["opened", "open", "opens"], "opened", "Hành động đã xong trong quá khứ: open + -ed.", "dong-tu-co-quy-tac"),
        fl("q18", "m", "They ___ (play) tennis last Sunday.", "played", "Play + -ed = played (y sau nguyên âm giữ nguyên).", "chinh-ta-ed"),
        mc("q19", "m", "I ___ a lovely present from my aunt last week.", ["got", "get", "gets"], "got", "Get là động từ bất quy tắc: get – got.", "bat-quy-tac"),
        mc("q20", "h", "Câu nào đúng?", ["Did he come yesterday?", "Did he came yesterday?", "Does he came yesterday?"], "Did he come yesterday?", "Sau Did động từ về nguyên mẫu come.", "cau-hoi-qua-khu"),
        fl("q21", "h", "He ___ (not / eat) breakfast yesterday morning.", ["didn't eat", "did not eat"], "Phủ định quá khứ: didn't + eat.", "phu-dinh-qua-khu"),
        mc("q22", "h", "I ___ my keys yesterday, so I couldn't open the door.", ["lost", "lose", "losed"], "lost", "Lose là động từ bất quy tắc: lose – lost – lost.", "bat-quy-tac"),
        mc("q23", "h", "Where ___ you go last weekend?", ["did", "do", "were"], "did", "Last weekend là quá khứ; câu hỏi dùng did + go.", "cau-hoi-qua-khu"),
        mc("q24", "h", "I met Lan two years ___.", ["ago", "before", "last"], "ago", "Two years ago là cách nói khoảng thời gian trước hiện tại.", "dau-hieu-qua-khu"),
        mc("q25", "m", "___ you at work yesterday?", ["Were", "Was", "Did"], "Were", "Câu hỏi với to be quá khứ: đưa were lên trước you.", "to-be-qua-khu"),
        fl("q26", "m", "My grandparents ___ (not / be) at home last Sunday.", ["weren't", "were not"], "Chủ ngữ số nhiều đi với were; phủ định là weren't.", "to-be-qua-khu"),
        mc("q27", "h", "Was the hotel nice? — No, it ___.", ["wasn't", "didn't", "weren't"], "wasn't", "Trả lời ngắn nhắc lại was: No, it wasn't.", "to-be-qua-khu")
      ]
    },

    "future": {
      cefr: "A2", formula: "will + V · am / is / are + going to + V", lv: "eeeeeemmmmmmhh",
      walk: [
        w("I will call you tomorrow.", "Ngày mai tôi sẽ gọi cho bạn.", "Will + động từ nguyên mẫu, dùng cho lời hứa hoặc quyết định ngay lúc nói."),
        w("She is going to study medicine.", "Cô ấy dự định học y.", "Be going to nói về kế hoạch đã có sẵn: is going to + study."),
        w("It won't rain tonight.", "Tối nay trời sẽ không mưa.", "Won't là will not; sau won't vẫn là động từ nguyên mẫu.")
      ],
      mistakes: [
        x("She will goes home.", "She will go home.", "Sau will dùng động từ nguyên mẫu, không thêm -s."),
        x("I will to call you.", "I will call you.", "Sau will không có to."),
        x("He going to work tomorrow.", "He is going to work tomorrow.", "Be going to cần am, is hoặc are.")
      ],
      check: ["Sau will, động từ có ở nguyên mẫu không? || Will + động từ nguyên mẫu, không to, không -s: She will come. (không nói She will comes)", "Với be going to, đã chọn am, is, are đúng chủ ngữ chưa? || Công thức: am / is / are going to + động từ. Ví dụ: He is going to travel.", "Đây là quyết định tức thì hay kế hoạch đã có sẵn? || Quyết định ngay lúc nói, lời hứa, dự đoán: dùng will. Kế hoạch đã định hoặc có dấu hiệu rõ ràng: dùng be going to.", "Phủ định đã viết đúng chưa? || Will not = won't: I won't go. Be going to thì thêm not sau to be: She isn't going to come."],
      more: [
        mc("q15", "m", "I think it ___ be sunny tomorrow.", ["will", "am", "goes"], "will", "Dự đoán dùng will + động từ nguyên mẫu.", "cau-truc-will"),
        fl("q16", "m", "She will ___ (be) 18 next year.", "be", "Sau will là nguyên mẫu be.", "sau-will"),
        mc("q17", "m", "My brother ___ going to buy a new phone.", ["is", "are", "will"], "is", "My brother là he nên dùng is going to.", "cau-truc-going-to"),
        mc("q18", "h", "Câu nào đúng?", ["I am going to visit my aunt.", "I going to visit my aunt.", "I am going visit my aunt."], "I am going to visit my aunt.", "Cấu trúc đủ: am + going to + động từ nguyên mẫu.", "cau-truc-going-to"),
        mc("q19", "h", "I have bought the tickets. We ___ see a film tonight.", ["are going to", "will to", "is going to"], "are going to", "Đã mua vé nghĩa là có kế hoạch sẵn; We đi với are going to.", "chon-will-going-to"),
        fl("q20", "h", "They ___ (not / come) to the party tomorrow. (dùng will)", ["won't come", "will not come"], "Phủ định với will: won't + động từ nguyên mẫu.", "phu-dinh-tuong-lai"),
        mc("q21", "h", "___ she going to move to Hanoi?", ["Is", "Will", "Does"], "Is", "Câu hỏi với going to đảo is lên đầu.", "cau-hoi-tuong-lai"),
        mc("q22", "h", "Câu nào đúng?", ["Will you help me?", "Do you will help me?", "Will you to help me?"], "Will you help me?", "Will đảo lên đầu, sau đó là chủ ngữ và động từ nguyên mẫu.", "cau-hoi-tuong-lai")
      ]
    },

    "past-continuous": {
      cefr: "A2", formula: "S + was / were + V-ing", lv: "eeeeeemmmmhh",
      walk: [
        w("I was sleeping at ten o'clock last night.", "Lúc 10 giờ tối qua tôi đang ngủ.", "Một thời điểm cụ thể trong quá khứ nên dùng was + sleeping."),
        w("They were playing football when it started to rain.", "Họ đang chơi bóng thì trời bắt đầu mưa.", "Hành động dài (were playing) bị hành động ngắn (started) cắt ngang; when đứng trước hành động ngắn."),
        w("While she was cooking, he was watching TV.", "Trong lúc cô ấy nấu ăn thì anh ấy xem TV.", "While nối hai hành động cùng diễn ra song song.")
      ],
      mistakes: [
        x("I was sleep when you called.", "I was sleeping when you called.", "Sau was hoặc were cần V-ing."),
        x("They was playing.", "They were playing.", "They đi với were, không dùng was."),
        x("While I was walking, I see a dog.", "While I was walking, I saw a dog.", "Hành động ngắn xen vào dùng quá khứ đơn: saw.")
      ],
      check: ["Em đã chọn was hoặc were đúng chủ ngữ chưa? || I, he, she, it → was. You, we, they → were.", "Động từ chính đã thêm -ing chưa? || Công thức: was / were + động từ-ing. Ví dụ: I was cooking.", "Có một thời điểm cụ thể hoặc một việc khác xen vào không? || Dùng cho việc đang diễn ra tại một lúc trong quá khứ: At 8 pm I was studying. Hoặc việc dài bị việc ngắn cắt ngang.", "When và while dùng đúng chưa? || While + việc kéo dài (quá khứ tiếp diễn). When + việc ngắn xen vào (quá khứ đơn). Ví dụ: I was sleeping when the phone rang."],
      more: [
        mc("q13", "m", "At 7 p.m. yesterday, she ___ dinner. (đang nấu)", ["was cooking", "cooked", "is cooking"], "was cooking", "Mốc 7 p.m. yesterday cho thấy hành động đang diễn ra trong quá khứ.", "qk-tiep-dien-cau-truc"),
        fl("q14", "m", "We were ___ (watch) a film at nine.", "watching", "Sau were cần V-ing: watching.", "qk-tiep-dien-cau-truc"),
        mc("q15", "m", "___ he sleeping when you called?", ["Was", "Were", "Did"], "Was", "He đi với was; câu hỏi đảo was lên đầu.", "qk-tiep-dien-cau-truc"),
        mc("q16", "h", "I was walking home ___ I saw an accident.", ["when", "while", "during"], "when", "When đứng trước hành động ngắn bất ngờ xen vào (saw).", "when-while"),
        mc("q17", "h", "She ___ TV when the lights went out.", ["was watching", "watched", "is watching"], "was watching", "Hành động đang diễn ra thì bị cắt ngang bởi went out.", "qk-don-hay-tiep-dien"),
        mc("q18", "h", "Câu nào đúng?", ["They weren't listening.", "They wasn't listening.", "They didn't listening."], "They weren't listening.", "They đi với weren't + V-ing.", "qk-tiep-dien-cau-truc"),
        fl("q19", "h", "What ___ you doing at 8 o'clock last night?", "were", "You đi với were trong câu hỏi quá khứ tiếp diễn.", "qk-tiep-dien-cau-truc"),
        mc("q20", "h", "I was washing the dishes when I ___ a glass.", ["broke", "was breaking", "break"], "broke", "Hành động ngắn xen vào dùng quá khứ đơn: broke.", "qk-don-hay-tiep-dien")
      ]
    },

    "modals": {
      cefr: "A2", formula: "S + can / must / should + V (nguyên mẫu)", lv: "eeeemmmmmehh",
      walk: [
        w("She can swim very well.", "Cô ấy bơi rất giỏi.", "Can chỉ khả năng; sau can là động từ nguyên mẫu swim."),
        w("You must wear a helmet.", "Bạn phải đội mũ bảo hiểm.", "Must nói điều bắt buộc; mustn't là cấm."),
        w("You should see a doctor.", "Bạn nên đi khám bác sĩ.", "Should dùng để khuyên; shouldn't là khuyên không nên.")
      ],
      mistakes: [
        x("She cans swim.", "She can swim.", "Động từ khuyết thiếu không thêm -s."),
        x("He can to drive.", "He can drive.", "Sau can không có to."),
        x("Does she can swim?", "Can she swim?", "Can tự đảo lên đầu câu hỏi, không dùng do hay does.")
      ],
      check: ["Sau can, must, should... động từ có ở nguyên mẫu không? || Không thêm to, không thêm -s: She can swim. (không nói She can swims hay She can to swim)", "Câu phủ định đã dùng đúng dạng rút gọn chưa? || can't (không thể), mustn't (cấm), shouldn't (không nên). Không dùng do hoặc does.", "Câu hỏi đã đưa động từ khuyết thiếu lên đầu chưa? || Đưa can, should, must lên trước chủ ngữ: Can you help me? Không cần do.", "Em đã phân biệt mustn't và don't have to chưa? || mustn't = cấm, không được làm. don't have to = không bắt buộc, làm cũng được, không làm cũng được."],
      more: [
        mc("q13", "m", "___ you help me with this bag, please?", ["Could", "Do", "Are"], "Could", "Could you... là cách nhờ giúp lịch sự.", "modal-can"),
        fl("q14", "m", "He can ___ (play) the piano.", "play", "Sau can là nguyên mẫu play.", "modal-cau-truc"),
        mc("q15", "m", "You ___ drink so much coffee. It's bad for you.", ["shouldn't", "don't should", "can to"], "shouldn't", "Lời khuyên không nên làm: shouldn't + nguyên mẫu.", "modal-should"),
        mc("q16", "h", "Câu nào đúng?", ["You mustn't use your phone here.", "You don't must use your phone here.", "You mustn't to use your phone here."], "You mustn't use your phone here.", "Phủ định của must là mustn't, sau đó là nguyên mẫu không có to.", "modal-must"),
        mc("q17", "h", "You ___ wear a uniform. It's a rule.", ["must", "might", "mustn't to"], "must", "Quy định bắt buộc dùng must.", "modal-must"),
        mc("q18", "h", "I'm sorry, I ___ come to your party. I'm busy.", ["can't", "mustn't", "don't can"], "can't", "Không có khả năng tham dự do bận nên dùng can't.", "modal-can"),
        fl("q19", "h", "You ___ wear a tie. It's not necessary. (don't have to)", ["don't have to", "do not have to"], "Không cần làm gì thì dùng don't have to.", "modal-must"),
        mc("q20", "h", "Câu nào là lời khuyên?", ["You should rest.", "You can rest.", "You mustn't rest."], "You should rest.", "Should dùng để khuyên; can là được phép hoặc có thể.", "modal-should")
      ]
    },

    "wh-questions": {
      cefr: "A1", formula: "Wh- + do / does / did / be + S + V?", lv: "eeeeeemmmhhm",
      walk: [
        w("Where do you live?", "Bạn sống ở đâu?", "Where + do + you + động từ nguyên mẫu live."),
        w("What does she want?", "Cô ấy muốn gì?", "Does đi với she; want giữ nguyên, không thêm -s."),
        w("Who lives here?", "Ai sống ở đây?", "Who là chủ ngữ nên không cần do hay does; lives có -s.")
      ],
      mistakes: [
        x("Where you live?", "Where do you live?", "Câu hỏi Wh- với động từ thường cần do hoặc does."),
        x("What does she wants?", "What does she want?", "Sau does động từ giữ nguyên."),
        x("Who does live here?", "Who lives here?", "Khi Who hỏi về chủ ngữ thì không dùng do hay does.")
      ],
      check: ["Từ để hỏi có hợp với điều muốn biết không? || What (cái gì), where (ở đâu), who (ai), when (khi nào), why (tại sao), how (như thế nào).", "Em đã chọn đúng trợ động từ chưa? || Hiện tại: do / does. Quá khứ: did. Với to be thì dùng am, is, are, was, were.", "Sau do, does, did, động từ có ở nguyên mẫu không? || Ví dụ: Where does she live? (không nói Where does she lives)", "Nếu who hoặc what làm chủ ngữ, em đã bỏ do, does chưa? || Who lives here? (ai sống ở đây) không cần does. Nhưng Who does she meet? (cô ấy gặp ai) vẫn cần does."],
      more: [
        mc("q13", "m", "___ is your birthday? — It's on 5 May.", ["When", "Where", "Who"], "When", "Hỏi thời gian dùng When.", "wh-tu-hoi"),
        mc("q14", "m", "___ does she go to work? — By bus.", ["How", "Why", "Who"], "How", "Hỏi cách thức, phương tiện dùng How.", "wh-tu-hoi"),
        fl("q15", "m", "Where ___ your parents live?", "do", "Your parents là they nên dùng do.", "wh-cau-truc"),
        mc("q16", "h", "Câu nào đúng?", ["How much is this bag?", "How much this bag is?", "How much does this bag is?"], "How much is this bag?", "Với to be: Wh- + is + chủ ngữ.", "wh-cau-truc"),
        mc("q17", "h", "___ do you study English? — Because I want to travel.", ["Why", "What", "Which"], "Why", "Câu trả lời bắt đầu bằng Because nên hỏi bằng Why.", "wh-tu-hoi"),
        mc("q18", "h", "What time ___ the film start?", ["does", "do", "is"], "does", "The film là it nên dùng does + start.", "wh-cau-truc"),
        mc("q19", "h", "Câu nào đúng?", ["Who broke the window?", "Who did broke the window?", "Who does break the window?"], "Who broke the window?", "Who là chủ ngữ nên không cần did; động từ dùng quá khứ broke.", "wh-who-chu-ngu"),
        fl("q20", "h", "How many brothers ___ you have?", "do", "Với you dùng do trong câu hỏi hiện tại đơn.", "wh-cau-truc")
      ]
    },

    "nouns": {
      cefr: "A1", formula: "a / an + danh từ đếm được số ít · some / any / many / much", lv: "eeeeememmmmh",
      walk: [
        w("I have two boxes.", "Tôi có hai cái hộp.", "Box tận cùng -x nên số nhiều thêm -es: boxes."),
        w("There isn't much water.", "Không còn nhiều nước.", "Water không đếm được nên dùng much, không dùng many."),
        w("She gave me some advice.", "Cô ấy cho tôi vài lời khuyên.", "Advice không đếm được: không thêm -s và không dùng a hay an.")
      ],
      mistakes: [
        x("two childs", "two children", "Child có số nhiều bất quy tắc: children."),
        x("an information", "some information", "Information không đếm được nên không dùng an và không thêm -s."),
        x("much books", "many books", "Books đếm được nên dùng many.")
      ],
      check: ["Danh từ này đếm được hay không đếm được? || Đếm được: book, apple (đếm 1, 2, 3 được). Không đếm được: water, rice, money, advice (không đếm trực tiếp).", "Số nhiều đã viết đúng chưa? || Thường thêm s: cat → cats. Tận cùng s, sh, ch, x thì thêm es: box → boxes. Phụ âm + y thì ies: baby → babies. Có từ bất quy tắc: man → men.", "Em dùng many hay much đúng chưa? || many + danh từ đếm được (many books). much + danh từ không đếm được (much water).", "A hoặc an có đứng trước danh từ số ít đếm được không? || a book, an apple. Không dùng a, an trước danh từ số nhiều hoặc không đếm được."],
      more: [
        mc("q13", "m", "Two ___ are crossing the road.", ["women", "womans", "womens"], "women", "Woman có số nhiều bất quy tắc: women.", "danh-tu-so-nhieu"),
        fl("q14", "m", "I have three ___ (watch).", "watches", "Danh từ tận cùng -ch thêm -es: watches.", "danh-tu-so-nhieu"),
        mc("q15", "m", "How ___ money do you have?", ["much", "many", "a"], "much", "Money không đếm được nên dùng much.", "luong-tu"),
        mc("q16", "h", "Câu nào đúng?", ["There are many people here.", "There is many people here.", "There are many peoples here."], "There are many people here.", "People đã là số nhiều nên dùng are và không thêm -s.", "danh-tu-so-nhieu"),
        mc("q17", "h", "She gave me ___ good advice.", ["some", "an", "many"], "some", "Advice không đếm được nên dùng some.", "dem-duoc-khong-dem-duoc"),
        mc("q18", "h", "Câu nào đúng?", ["I need some bread.", "I need a bread.", "I need breads."], "I need some bread.", "Bread không đếm được nên dùng some.", "dem-duoc-khong-dem-duoc"),
        fl("q19", "h", "Three ___ (leaf) fell from the tree.", "leaves", "Danh từ tận cùng -f đổi f thành v rồi thêm -es: leaves.", "danh-tu-so-nhieu"),
        mc("q20", "h", "We don't have ___ eggs. Let's buy some.", ["any", "much", "a"], "any", "Trong câu phủ định, dùng any với danh từ số nhiều.", "luong-tu")
      ]
    },

    "articles": {
      cefr: "A1", formula: "a / an + danh từ số ít đếm được · the + đối tượng đã biết · (không mạo từ)", lv: "eeeeeeemmmmh",
      walk: [
        w("She is a teacher.", "Cô ấy là giáo viên.", "Nghề nghiệp, danh từ số ít đếm được nên dùng a."),
        w("I saw a dog. The dog was big.", "Tôi thấy một con chó. Con chó đó rất to.", "Lần đầu nhắc đến dùng a; lần sau là con đã biết nên dùng the."),
        w("She plays football on Sundays.", "Cô ấy chơi bóng đá vào Chủ nhật.", "Tên môn thể thao không dùng mạo từ.")
      ],
      mistakes: [
        x("I am teacher.", "I am a teacher.", "Nghề nghiệp ở số ít cần a hoặc an."),
        x("a apple", "an apple", "Dùng an trước âm nguyên âm."),
        x("The life is beautiful.", "Life is beautiful.", "Nói chung về một khái niệm thì không dùng the.")
      ],
      check: ["Danh từ số ít đếm được đã có a, an hoặc the chưa? || Không nói I have book. Phải nói I have a book.", "Chọn a hay an theo âm đọc, không theo chữ cái. || an hour (h không đọc), a university (đọc /ju/ như phụ âm). Nghe âm đầu: nguyên âm → an, phụ âm → a.", "Người nghe đã biết đối tượng nào chưa? || Chưa biết, nhắc lần đầu: a. Đã biết hoặc đã nhắc rồi: the. Ví dụ: I saw a dog. The dog was big.", "Nói chung chung thì có cần mạo từ không? || Số nhiều hoặc không đếm được nói chung thì bỏ mạo từ: I like music. Dogs are friendly."],
      more: [
        mc("q13", "m", "He is ___ honest man. (một người)", ["an", "a", "the"], "an", "Honest bắt đầu bằng âm nguyên âm /ɒ/ vì h câm nên dùng an.", "a-an"),
        mc("q14", "m", "I need ___ umbrella. (một cái)", ["an", "a", "the"], "an", "Umbrella bắt đầu bằng âm nguyên âm nên dùng an.", "a-an"),
        fl("q15", "m", "My sister is ___ engineer. (nghề nghiệp)", "an", "Engineer bắt đầu bằng âm nguyên âm nên dùng an.", "a-an"),
        mc("q16", "h", "Câu nào đúng?", ["The Earth goes around the Sun.", "Earth goes around Sun.", "An Earth goes around the Sun."], "The Earth goes around the Sun.", "Earth và Sun là vật duy nhất nên dùng the.", "mao-tu-the"),
        mc("q17", "h", "___ moon is bright tonight.", ["The", "A", "An"], "The", "Moon là vật duy nhất nên dùng the.", "mao-tu-the"),
        mc("q18", "h", "I usually have ___ breakfast at 7.", ["(không cần mạo từ)", "a", "the"], "(không cần mạo từ)", "Tên bữa ăn thường không dùng mạo từ.", "khong-mao-tu"),
        mc("q19", "h", "Câu nào đúng?", ["She goes to school by bus.", "She goes to the school by the bus.", "She goes to a school by a bus."], "She goes to school by bus.", "Go to school và by bus là cụm cố định, không dùng mạo từ.", "khong-mao-tu"),
        mc("q20", "h", "Can you pass me ___ salt, please?", ["the", "a", "an"], "the", "Cả hai đều biết là lọ muối đang ở trên bàn nên dùng the.", "mao-tu-the")
      ]
    },

    "pronouns": {
      cefr: "A1", formula: "I – me – my – mine", lv: "eeeeeemmmmmh",
      walk: [
        w("She helps me with my homework.", "Cô ấy giúp tôi làm bài tập.", "Me là tân ngữ đứng sau động từ; my là tính từ sở hữu đứng trước danh từ."),
        w("This book is mine.", "Quyển sách này là của tôi.", "Mine đứng một mình, thay cho my book."),
        w("Those are our shoes.", "Những đôi kia là giày của chúng tôi.", "Those chỉ vật số nhiều ở xa; our đứng trước danh từ.")
      ],
      mistakes: [
        x("Me like it.", "I like it.", "Chủ ngữ phải là I, không phải me."),
        x("This is mine book.", "This is my book.", "Trước danh từ dùng my, không dùng mine."),
        x("He's name is Tom.", "His name is Tom.", "Sở hữu của he là his, không phải he's.")
      ],
      check: ["Từ cần điền là chủ ngữ hay tân ngữ? || Làm chủ ngữ (đứng trước động từ): I, he, she, we, they. Làm tân ngữ (đứng sau động từ): me, him, her, us, them.", "Đứng trước danh từ hay đứng một mình? || Trước danh từ: my, your, his, her, our, their (my book). Đứng một mình: mine, yours, his, hers, ours, theirs (The book is mine).", "Vật ở gần hay xa, một hay nhiều? || Gần: this (một), these (nhiều). Xa: that (một), those (nhiều).", "Sở hữu của một người cụ thể đã thêm 's chưa? || Tom's book (sách của Tom). Không dùng dấu 's cho vật vô tri trong câu đơn giản."],
      more: [
        mc("q13", "m", "___ is my friend. He lives next door.", ["He", "Him", "His"], "He", "Làm chủ ngữ của câu thì dùng he.", "dai-tu-nhan-xung"),
        mc("q14", "m", "Can you help ___? (tôi)", ["me", "I", "my"], "me", "Tân ngữ sau động từ help là me.", "dai-tu-nhan-xung"),
        fl("q15", "m", "These keys are not ___. (của tôi)", "mine", "Đứng một mình, không có danh từ phía sau thì dùng mine.", "so-huu"),
        mc("q16", "h", "Câu nào đúng?", ["Their house is big.", "They house is big.", "Them house is big."], "Their house is big.", "Trước danh từ dùng tính từ sở hữu their.", "so-huu"),
        mc("q17", "h", "Is this pen yours? — No, it isn't ___. (của tôi)", ["mine", "my", "me"], "mine", "Không có danh từ sau nên dùng đại từ sở hữu mine.", "so-huu"),
        mc("q18", "h", "___ are my parents. (người ở xa)", ["Those", "That", "This"], "Those", "Parents là số nhiều và ở xa nên dùng those.", "chi-dinh-so-huu-cach"),
        mc("q19", "h", "She loves ___ children. (con của cô ấy)", ["her", "hers", "she"], "her", "Trước danh từ children dùng tính từ sở hữu her.", "so-huu"),
        mc("q20", "h", "Where is Lan's bag? — ___ is on the chair.", ["It", "Its", "Them"], "It", "Bag là một vật số ít, làm chủ ngữ nên dùng it.", "dai-tu-nhan-xung")
      ]
    },

    "adjectives-adverbs": {
      cefr: "A1", formula: "tính từ + danh từ · V + trạng từ (thường thêm -ly)", lv: "eeeeemmmehhh",
      walk: [
        w("She has a beautiful voice.", "Cô ấy có giọng hát đẹp.", "Tính từ beautiful đứng trước danh từ voice."),
        w("He drives carefully.", "Anh ấy lái xe cẩn thận.", "Trạng từ carefully bổ nghĩa cho động từ drives; thêm -ly vào tính từ careful."),
        w("She sings well.", "Cô ấy hát hay.", "Well là trạng từ của good; không nói sings good.")
      ],
      mistakes: [
        x("She speaks slow.", "She speaks slowly.", "Bổ nghĩa cho động từ cần trạng từ slowly."),
        x("He sings good.", "He sings well.", "Trạng từ của good là well."),
        x("a house big", "a big house", "Tính từ đứng trước danh từ.")
      ],
      check: ["Từ cần bổ nghĩa là danh từ hay động từ? || Bổ nghĩa cho danh từ: dùng tính từ (a quick car). Bổ nghĩa cho động từ: dùng trạng từ (He drives quickly).", "Tính từ đã đứng đúng chỗ chưa? || Đứng trước danh từ (a big house) hoặc sau to be (The house is big).", "Trạng từ chỉ cách thức đã thêm -ly chưa? || Thường lấy tính từ + ly: slow → slowly, careful → carefully. Phụ âm + y → ily: happy → happily.", "Có phải từ đặc biệt không thêm -ly không? || fast, hard, late, early giữ nguyên khi là trạng từ. Riêng good → well (She sings well)."],
      more: [
        mc("q13", "m", "The soup is ___.", ["hot", "hotly", "heat"], "hot", "Sau to be dùng tính từ hot.", "tinh-tu"),
        fl("q14", "m", "He is a quick runner. He runs ___. (quick)", "quickly", "Bổ nghĩa cho động từ runs cần trạng từ quickly.", "trang-tu-cach-thuc"),
        mc("q15", "m", "She is a ___ driver.", ["careful", "carefully", "care"], "careful", "Trước danh từ driver dùng tính từ careful.", "tinh-tu-hay-trang-tu"),
        mc("q16", "h", "Câu nào đúng?", ["He works hard.", "He works hardly.", "He works hards."], "He works hard.", "Hard vừa là tính từ vừa là trạng từ; hardly có nghĩa là hầu như không.", "tinh-tu-hay-trang-tu"),
        mc("q17", "h", "She arrived ___ for the meeting. (muộn)", ["late", "lately", "latly"], "late", "Late vừa là tính từ vừa là trạng từ; lately có nghĩa là gần đây.", "tinh-tu-hay-trang-tu"),
        mc("q18", "h", "Câu nào đúng?", ["She is a very good singer.", "She is a very well singer.", "She is very good singer."], "She is a very good singer.", "Trước danh từ singer dùng tính từ good, và cần a.", "tinh-tu"),
        mc("q19", "h", "He speaks English ___. (tốt)", ["well", "good", "goodly"], "well", "Bổ nghĩa cho động từ cần trạng từ well.", "trang-tu-cach-thuc"),
        mc("q20", "h", "The test was ___ easy. I finished in ten minutes.", ["extremely", "extreme", "extremeness"], "extremely", "Bổ nghĩa cho tính từ easy cần trạng từ chỉ mức độ extremely.", "trang-tu-muc-do")
      ]
    },

    "comparison": {
      cefr: "A2", formula: "tính từ ngắn + -er / the -est · more / the most + tính từ dài", lv: "eeeeemmemmmh",
      walk: [
        w("My bag is heavier than your bag.", "Túi của tôi nặng hơn túi của bạn.", "Heavy là tính từ ngắn tận cùng -y: đổi y thành i rồi thêm -er."),
        w("This is the most beautiful beach.", "Đây là bãi biển đẹp nhất.", "Beautiful là tính từ dài nên dùng the most."),
        w("He isn't as tall as his brother.", "Anh ấy không cao bằng anh trai.", "Not as ... as nói kém hơn.")
      ],
      mistakes: [
        x("more taller", "taller", "Tính từ ngắn đã có -er thì không thêm more."),
        x("the most tallest", "the tallest", "Tính từ ngắn đã có -est thì không thêm most."),
        x("She is more good.", "She is better.", "Good là tính từ bất quy tắc: good – better – best.")
      ],
      check: ["Tính từ này ngắn hay dài? || Ngắn (1 âm tiết): thêm -er, -est (taller, tallest). Dài (từ 2 âm tiết trở lên): dùng more, most (more beautiful).", "Chính tả đã đúng chưa? || Gấp đôi phụ âm: big → bigger. Phụ âm + y → ier: happy → happier. Tận cùng e chỉ thêm r: nice → nicer.", "So sánh hơn hay nhất? || So sánh hơn (giữa hai) có than: taller than. So sánh nhất (cao nhất trong nhóm) có the: the tallest.", "Có phải tính từ bất quy tắc không? || good → better → the best. bad → worse → the worst. Cần học thuộc."],
      more: [
        mc("q13", "m", "Mai is ___ than Lan. (young)", ["younger", "more young", "youngest"], "younger", "Young là tính từ ngắn nên thêm -er.", "so-sanh-hon"),
        fl("q14", "m", "This is the ___ (big) house in the street.", "biggest", "Big gấp đôi phụ âm cuối rồi thêm -est: biggest.", "chinh-ta-so-sanh"),
        mc("q15", "m", "English is ___ than Math for me. (easy)", ["easier", "more easy", "easiest"], "easier", "Easy tận cùng -y: đổi y thành i rồi thêm -er.", "chinh-ta-so-sanh"),
        mc("q16", "h", "Câu nào đúng?", ["This is the best day of my life.", "This is the goodest day of my life.", "This is the most good day of my life."], "This is the best day of my life.", "So sánh nhất của good là the best.", "bat-quy-tac-so-sanh"),
        mc("q17", "h", "Travelling by plane is ___ than travelling by bus. (expensive)", ["more expensive", "expensiver", "most expensive"], "more expensive", "Expensive là tính từ dài nên dùng more + tính từ.", "so-sanh-hon"),
        fl("q18", "h", "She isn't as ___ as her sister. (tall)", "tall", "Cấu trúc as ... as dùng tính từ nguyên dạng: tall.", "so-sanh-bang"),
        mc("q19", "h", "Which is the ___ month of the year? (short)", ["shortest", "most short", "shorter"], "shortest", "Short là tính từ ngắn; so sánh nhất thêm the + -est.", "so-sanh-nhat"),
        mc("q20", "h", "Today's weather is ___ than yesterday's. (bad)", ["worse", "worst", "more bad"], "worse", "So sánh hơn của bad là worse.", "bat-quy-tac-so-sanh")
      ]
    },

    "prepositions": {
      cefr: "A1", formula: "at + giờ / điểm · on + ngày · in + tháng, năm, mùa", lv: "eeeeeemmmmmh",
      walk: [
        w("The class starts at 8 o'clock.", "Lớp học bắt đầu lúc 8 giờ.", "At dùng cho giờ chính xác."),
        w("My birthday is on Sunday.", "Sinh nhật tôi vào Chủ nhật.", "On dùng cho thứ trong tuần và ngày cụ thể."),
        w("She lives in Hanoi.", "Cô ấy sống ở Hà Nội.", "In dùng cho thành phố và quốc gia.")
      ],
      mistakes: [
        x("in Monday", "on Monday", "Thứ trong tuần dùng on."),
        x("at the morning", "in the morning", "Buổi trong ngày dùng in the morning."),
        x("arrive to Hanoi", "arrive in Hanoi", "Arrive đi với in hoặc at, không đi với to.")
      ],
      check: ["Giới từ chỉ thời gian: at, on hay in? || at + giờ (at 5 pm). on + ngày (on Monday). in + tháng, năm, mùa, buổi (in May, in 2020, in the morning).", "Giới từ chỉ nơi chốn: at, in hay on? || at + một điểm (at the bus stop). in + bên trong không gian (in the room). on + trên bề mặt (on the table).", "Phương tiện đã dùng by chưa? || by bus, by car, by train, by plane. Đi bộ thì on foot.", "Có phải cụm cố định không? || Có những cụm phải nhớ nguyên: at night, at home, on time (đúng giờ), in time (kịp giờ)."],
      more: [
        mc("q13", "m", "We have dinner ___ 7 p.m.", ["at", "on", "in"], "at", "Giờ chính xác dùng at.", "gioi-tu-thoi-gian"),
        mc("q14", "m", "My birthday is ___ March.", ["in", "on", "at"], "in", "Tháng dùng in.", "gioi-tu-thoi-gian"),
        mc("q15", "m", "The picture is ___ the wall.", ["on", "in", "at"], "on", "Trên bề mặt dùng on.", "gioi-tu-noi-chon"),
        mc("q16", "h", "Câu nào đúng?", ["I stay at home at night.", "I stay in home in night.", "I stay on home at the night."], "I stay at home at night.", "At home và at night là cụm cố định.", "gioi-tu-thoi-gian"),
        mc("q17", "h", "She arrived ___ Hue yesterday.", ["in", "to", "on"], "in", "Arrive in dùng với thành phố.", "gioi-tu-khac"),
        mc("q18", "h", "Câu nào đúng?", ["The cat is behind the sofa.", "The cat is behind of the sofa.", "The cat is in behind the sofa."], "The cat is behind the sofa.", "Behind đã là giới từ, không thêm of hay in.", "gioi-tu-noi-chon"),
        mc("q19", "h", "I was born ___ 2005.", ["in", "on", "at"], "in", "Năm dùng in.", "gioi-tu-thoi-gian"),
        mc("q20", "h", "He is good ___ maths.", ["at", "in", "on"], "at", "Good at + môn học là cụm cố định.", "gioi-tu-khac")
      ]
    },

    "there-is": {
      cefr: "A1", formula: "There is / There are + danh từ · have / has got", lv: "eeeeeemmmmmh",
      walk: [
        w("There is a bank near here.", "Gần đây có một ngân hàng.", "There is + danh từ số ít, dùng để nói có cái gì ở đâu."),
        w("There aren't any chairs.", "Không có cái ghế nào.", "Phủ định với danh từ số nhiều: aren't any."),
        w("She has got two brothers.", "Cô ấy có hai anh em trai.", "Has got nghĩa là có; chủ ngữ she dùng has.")
      ],
      mistakes: [
        x("There is two books.", "There are two books.", "Two books là số nhiều nên dùng There are."),
        x("It has a book on the table.", "There is a book on the table.", "Muốn nói có cái gì ở đâu thì dùng There is."),
        x("She have got a bike.", "She has got a bike.", "She đi với has got.")
      ],
      check: ["Danh từ đứng sau là số ít hay số nhiều? || There is + số ít (There is a cat). There are + số nhiều (There are two cats).", "Danh từ không đếm được dùng is hay are? || Không đếm được luôn dùng is: There is some water. (không nói There are some water)", "Câu phủ định đã dùng any chưa? || There isn't any milk. There aren't any eggs. Dùng any trong câu phủ định và câu hỏi.", "Nếu dùng have got, đã chọn have hay has đúng chủ ngữ chưa? || He, she, it → has got. I, you, we, they → have got. Ví dụ: She has got a car."],
      more: [
        mc("q13", "m", "There ___ an apple on the table.", ["is", "are", "have"], "is", "An apple là số ít nên dùng is.", "there-is-are"),
        mc("q14", "m", "There ___ any eggs in the fridge.", ["aren't", "isn't", "don't"], "aren't", "Eggs là số nhiều nên phủ định là aren't.", "there-phu-dinh-cau-hoi"),
        mc("q15", "m", "___ there a post office near here?", ["Is", "Are", "Do"], "Is", "A post office là số ít nên câu hỏi bắt đầu bằng Is.", "there-phu-dinh-cau-hoi"),
        mc("q16", "h", "Câu nào đúng?", ["There is some water in the glass.", "There are some water in the glass.", "There have some water in the glass."], "There is some water in the glass.", "Water không đếm được nên dùng There is.", "there-is-are"),
        fl("q17", "h", "Have you got a pen? — Yes, I ___.", "have", "Trả lời ngắn lặp lại have.", "have-got"),
        mc("q18", "h", "Câu nào đúng?", ["We haven't got any money.", "We hasn't got any money.", "We don't got any money."], "We haven't got any money.", "We đi với haven't got.", "have-got"),
        mc("q19", "h", "Câu nào đúng?", ["Is there a cinema in your town?", "Are there a cinema in your town?", "Has there a cinema in your town?"], "Is there a cinema in your town?", "A cinema là số ít nên dùng Is there.", "there-phu-dinh-cau-hoi"),
        mc("q20", "h", "How many students ___ there in your class?", ["are", "is", "have"], "are", "Students là số nhiều nên dùng are.", "there-is-are")
      ]
    },

    "conditionals": {
      cefr: "B1", formula: "If + hiện tại đơn, will + V (nguyên mẫu)", lv: "eeeeeemmmhhm",
      walk: [
        w("If you heat water to 100 degrees, it boils.", "Nếu đun nước đến 100 độ thì nước sôi.", "Loại 0 nói sự thật hiển nhiên: cả hai vế đều hiện tại đơn."),
        w("If it rains tomorrow, we will stay at home.", "Nếu ngày mai trời mưa thì chúng tôi sẽ ở nhà.", "Loại 1: if + hiện tại đơn, kết quả dùng will + nguyên mẫu."),
        w("Unless you hurry, you will miss the bus.", "Nếu bạn không nhanh lên thì sẽ lỡ xe buýt.", "Unless có nghĩa là if ... not.")
      ],
      mistakes: [
        x("If it will rain, I will stay home.", "If it rains, I will stay home.", "Mệnh đề if không dùng will."),
        x("If I will see him, I tell him.", "If I see him, I will tell him.", "Vế if dùng hiện tại đơn, vế kết quả dùng will."),
        x("Unless you don't hurry, you will be late.", "Unless you hurry, you will be late.", "Unless đã mang nghĩa phủ định nên không thêm don't.")
      ],
      check: ["Mệnh đề if có dùng hiện tại đơn không? || Sau if, dù nói về tương lai vẫn dùng hiện tại đơn: If it rains... (không nói If it will rain)", "Mệnh đề kết quả có dùng will + nguyên mẫu không? || Ví dụ: If it rains, we will stay at home.", "Unless đã dùng đúng nghĩa chưa? || Unless = if ... not (nếu không). Unless you hurry, you will be late. Không thêm not hoặc don't sau unless.", "Đây là sự thật hiển nhiên hay khả năng ở tương lai? || Sự thật luôn đúng: If + hiện tại, hiện tại (If you heat ice, it melts). Khả năng sắp tới: If + hiện tại, will + động từ."],
      more: [
        mc("q13", "m", "If you mix blue and yellow, you ___ green.", ["get", "will got", "getting"], "get", "Sự thật hiển nhiên dùng hiện tại đơn ở cả hai vế.", "dk-loai-0"),
        fl("q14", "m", "If she ___ (come), we will start the meeting.", "comes", "Vế if dùng hiện tại đơn; she thêm -s.", "dk-loai-1"),
        mc("q15", "m", "We will go for a picnic if it ___ rainy.", ["isn't", "won't be", "wasn't"], "isn't", "Vế if dùng hiện tại đơn, không dùng will.", "dk-loai-1"),
        mc("q16", "h", "Câu nào đúng?", ["If you don't study, you will fail.", "If you won't study, you will fail.", "If you don't studied, you will fail."], "If you don't study, you will fail.", "Vế if dùng hiện tại đơn phủ định don't study.", "dk-loai-1"),
        mc("q17", "h", "You will miss the train ___ you leave now.", ["unless", "if", "because"], "unless", "Unless có nghĩa là nếu không: bạn sẽ lỡ tàu nếu không đi ngay.", "dk-unless"),
        fl("q18", "h", "If it ___ (be) sunny tomorrow, we will go to the beach.", "is", "Vế if dùng hiện tại đơn: is.", "dk-loai-1"),
        mc("q19", "h", "If I ___ him, I will give him your message.", ["see", "will see", "saw"], "see", "Vế if dùng hiện tại đơn: see.", "dk-loai-1"),
        mc("q20", "h", "Câu nào nói một sự thật hiển nhiên?", ["If you drop a glass, it breaks.", "If you drop the glass, it will break tomorrow.", "If you dropped a glass, it would break."], "If you drop a glass, it breaks.", "Sự thật hiển nhiên dùng hiện tại đơn ở cả hai vế.", "dk-loai-0")
      ]
    },

    "passive": {
      cefr: "B1", formula: "S + am / is / are / was / were + V3 (+ by ...)", lv: "eeeeeemmmmmh",
      walk: [
        w("English is spoken in many countries.", "Tiếng Anh được nói ở nhiều nước.", "Is + spoken (V3 của speak); không cần nói ai nói."),
        w("The window was broken by a boy.", "Cửa sổ bị một cậu bé làm vỡ.", "Was + broken; by a boy cho biết ai làm."),
        w("Was this house built in 1990?", "Ngôi nhà này có được xây năm 1990 không?", "Câu hỏi đưa was lên đầu; động từ giữ dạng V3.")
      ],
      mistakes: [
        x("The window broke by a boy.", "The window was broken by a boy.", "Bị động cần be + V3."),
        x("The house built in 1990.", "The house was built in 1990.", "Không được bỏ was."),
        x("It was wrote by Anna.", "It was written by Anna.", "V3 của write là written, không phải wrote.")
      ],
      check: ["Em đã chọn đúng dạng của be theo thì chưa? || Hiện tại: am, is, are. Quá khứ: was, were. Tương lai: will be. Ví dụ: The room is cleaned every day.", "Động từ chính đã ở dạng V3 chưa? || Công thức: be + V3 (quá khứ phân từ). Ví dụ: The window was broken. Động từ bất quy tắc: write → written.", "Có cần nói ai làm không? || Muốn nhắc người làm thì thêm by: The book was written by Tom. Nếu không quan trọng thì bỏ by.", "Câu hỏi hoặc phủ định đã đúng chưa? || Phủ định: thêm not sau be (It was not made here). Câu hỏi: đưa be lên đầu (Was it made here?)."],
      more: [
        mc("q13", "m", "Cars ___ in this factory.", ["are made", "make", "is made"], "are made", "Cars là số nhiều, hiện tại đơn bị động: are + V3.", "bi-dong-cau-truc"),
        fl("q14", "m", "The film was ___ (see) by millions of people.", "seen", "V3 của see là seen.", "phan-tu-qua-khu"),
        mc("q15", "m", "This email ___ by my boss yesterday.", ["was sent", "sent", "is sent"], "was sent", "Yesterday là quá khứ nên dùng was + V3.", "bi-dong-cau-truc"),
        mc("q16", "h", "Câu nào đúng?", ["The book was written by a student.", "The book was wrote by a student.", "The book written by a student."], "The book was written by a student.", "Bị động: was + V3 (written).", "phan-tu-qua-khu"),
        mc("q17", "h", "They clean the room every day. → The room ___ every day.", ["is cleaned", "was cleaned", "cleans"], "is cleaned", "Câu chủ động ở hiện tại đơn nên bị động là is + V3.", "bi-dong-chuyen-cau"),
        mc("q18", "h", "Anna wrote this letter. → This letter ___ by Anna.", ["was written", "is written", "wrote"], "was written", "Câu chủ động ở quá khứ đơn nên bị động là was + V3.", "bi-dong-chuyen-cau"),
        mc("q19", "h", "___ these cakes made by your mother?", ["Are", "Is", "Do"], "Are", "Cakes là số nhiều nên câu hỏi bắt đầu bằng Are.", "bi-dong-phu-dinh-cau-hoi"),
        mc("q20", "h", "The windows ___ cleaned yesterday. (phủ định)", ["weren't", "wasn't", "didn't"], "weren't", "Windows là số nhiều, quá khứ phủ định: weren't + V3.", "bi-dong-phu-dinh-cau-hoi")
      ]
    }
  };

})();
