/* Đối chiếu 115 unit của sách Essential Grammar in Use (Elementary) với bài trong app, bài nên xem thêm, và phụ lục tra cứu. */
window.BOOK_UNITS = [
  [1, "am / is / are", "to-be"], [2, "am / is / are (questions)", "to-be"],
  [3, "I am doing (present continuous)", "present-continuous"], [4, "are you doing? (present continuous questions)", "present-continuous"],
  [5, "I do / work / like (present simple)", "present-simple"], [6, "I don't... (present simple negative)", "present-simple"], [7, "Do you...? (present simple questions)", "present-simple"],
  [8, "I am doing and I do", "present-simple-vs-continuous"], [9, "I have... and I've got...", "there-is"],
  [10, "was / were", "past-simple"], [11, "worked / got / went (past simple)", "past-simple"], [12, "I didn't... Did you...?", "past-simple"],
  [13, "I was doing (past continuous)", "past-continuous"], [14, "I was doing and I did", "past-continuous"],
  [15, "I have done (present perfect 1)", "present-perfect"], [16, "I've just... I've already... yet", "present-perfect"], [17, "Have you ever...?", "present-perfect"],
  [18, "How long have you...?", "present-perfect"], [19, "for, since, ago", "present-perfect"], [20, "I have done and I did", "present-perfect"],
  [21, "is done, was done (passive 1)", "passive"], [22, "is being done, has been done (passive 2)", "passive-2"],
  [23, "be / have / do in present and past tenses", "verb-forms"], [24, "Regular and irregular verbs", "verb-forms"],
  [25, "What are you doing tomorrow?", "future-plans"], [26, "I'm going to...", "future"], [27, "will / shall 1", "future"], [28, "will / shall 2", "future-plans"],
  [29, "might", "might-may"], [30, "can and could", "modals"], [31, "must, mustn't, don't need to", "have-to-need-to"], [32, "should", "modals"],
  [33, "I have to...", "have-to-need-to"], [34, "Would you like...? I'd like...", "used-to-would-like"], [35, "Do this! Don't do that! Let's do this!", "used-to-would-like"], [36, "I used to...", "used-to-would-like"],
  [37, "there is, there are", "there-is"], [38, "there was / were, there has been, there will be", "there-it"], [39, "It...", "there-it"],
  [40, "I am, I don't etc.", "short-answers"], [41, "Have you? Are you? Don't you?", "short-answers"], [42, "too / either, so am I / neither do I", "short-answers"], [43, "isn't, haven't, don't (negatives)", "short-answers"],
  [44, "Is it...? Have you...? Do they...? (questions 1)", "question-forms"], [45, "Who saw you? Who did you see? (questions 2)", "question-forms"], [46, "Who is she talking to? What is it like? (questions 3)", "question-forms"],
  [47, "What...? Which...? How...? (questions 4)", "question-words-more"], [48, "How long does it take...?", "question-words-more"], [49, "Do you know where...? I don't know what...", "indirect-questions"],
  [50, "She said that... He told me that...", "reported-speech"], [51, "work / working, go / going, do / doing", "verb-forms"], [52, "to... (I want to do) and -ing (I enjoy doing)", "gerund-infinitive"],
  [53, "I want you to... I told you to...", "verb-object-infinitive"], [54, "I went to the shop to...", "gerund-infinitive"],
  [55, "go to..., go on..., go for..., go -ing", "go-get"], [56, "get", "go-get"], [57, "do and make", "do-make-have"], [58, "have", "do-make-have"],
  [59, "I / me, he / him, they / them", "pronouns"], [60, "my / his / their", "pronouns"], [61, "Whose is this? It's mine / yours", "pronouns"], [62, "I / me / my / mine", "pronouns"],
  [63, "myself / yourself / themselves", "reflexive-pronouns"], [64, "-'s (Kate's camera)", "pronouns"],
  [65, "a / an", "articles"], [66, "train(s), bus(es) (singular and plural)", "nouns"], [67, "a bottle / some water (countable / uncountable 1)", "nouns"], [68, "a cake / some cake / some cakes (2)", "nouns"],
  [69, "a / an and the", "articles"], [70, "the...", "articles"], [71, "go to work, go home, go to the cinema", "articles-places"], [72, "I like music, I hate exams", "articles-places"], [73, "the... (names of places)", "articles-places"],
  [74, "this / that / these / those", "this-that-one"], [75, "one / ones", "this-that-one"],
  [76, "some and any", "quantifiers"], [77, "not + any, no, none", "quantifiers"], [78, "not + anybody / anything, nobody / nothing", "quantifiers"], [79, "somebody / anything / nowhere", "quantifiers"],
  [80, "every and all", "all-most-both"], [81, "all, most, some, any, no / none", "all-most-both"], [82, "both, either, neither", "all-most-both"],
  [83, "a lot, much, many", "little-few"], [84, "(a) little, (a) few", "little-few"],
  [85, "old / nice / interesting (adjectives)", "adjectives-adverbs"], [86, "quickly / badly / suddenly (adverbs)", "adjectives-adverbs"],
  [87, "old / older, expensive / more expensive", "comparison"], [88, "older than..., more expensive than...", "comparison"], [89, "not as... as", "comparison"], [90, "the oldest, the most expensive", "comparison"],
  [91, "enough", "quantifiers"], [92, "too", "quantifiers"],
  [93, "He speaks English very well (word order 1)", "word-order"], [94, "always / usually / often (word order 2)", "word-order"], [95, "still, yet, already", "connectors-time-words"], [96, "Give me that book! Give it to me!", "word-order"],
  [97, "and, but, or, so, because", "connectors-time-words"], [98, "When...", "connectors-time-words"], [99, "If we go... If you see...", "conditionals"], [100, "If I had... If we went...", "conditional-2"],
  [101, "a person who..., a thing that / which...", "relative-clauses"], [102, "the people we met, the hotel you stayed at", "relative-clauses"],
  [103, "at 8 o'clock, on Monday, in April", "prepositions"], [104, "from... to, until, since, for", "prepositions-time-2"], [105, "before, after, during, while", "prepositions-time-2"],
  [106, "in, at, on (places 1)", "prepositions-place-2"], [107, "in, at, on (places 2)", "prepositions-place-2"], [108, "to, in, at (places 3)", "prepositions-place-2"],
  [109, "under, behind, opposite", "prepositions-position-movement"], [110, "up, over, through", "prepositions-position-movement"],
  [111, "on, at, by, with, about", "prepositions-other"], [112, "afraid of..., good at... (+ -ing)", "prepositions-other"], [113, "listen to..., look at... (verb + preposition)", "prepositions-other"],
  [114, "go in, fall off, run away (phrasal verbs 1)", "phrasal-verbs"], [115, "put on your shoes / put your shoes on (phrasal verbs 2)", "phrasal-verbs"]
];

// Bài nên xem thêm cho các chủ điểm cũ (chủ điểm mới đã có sẵn trường see).
window.GRAMMAR_SEE = {
  "to-be": ["short-answers", "question-forms", "there-it"],
  "present-simple": ["present-simple-vs-continuous", "short-answers", "word-order"],
  "present-continuous": ["present-simple-vs-continuous", "future-plans"],
  "past-simple": ["verb-forms", "present-perfect"],
  "future": ["future-plans", "might-may"],
  "past-continuous": ["past-simple", "connectors-time-words"],
  "modals": ["might-may", "have-to-need-to"],
  "wh-questions": ["question-forms", "question-words-more", "indirect-questions"],
  "nouns": ["little-few", "quantifiers"],
  "articles": ["articles-places", "this-that-one"],
  "pronouns": ["reflexive-pronouns", "this-that-one"],
  "adjectives-adverbs": ["word-order", "comparison"],
  "comparison": ["adjectives-adverbs", "quantifiers"],
  "prepositions": ["prepositions-time-2", "prepositions-place-2", "prepositions-position-movement"],
  "there-is": ["there-it", "do-make-have"],
  "conditionals": ["conditional-2", "future-plans"],
  "passive": ["passive-2", "verb-forms"]
};

/* Phụ lục tra cứu (theo cấu trúc Appendix của sách, viết lại bằng tiếng Việt). */
window.APPENDIX = {
  irregular: [
    { title: "V2 và V3 giống V1", rows: [["cost", "cost", "cost"], ["cut", "cut", "cut"], ["hit", "hit", "hit"], ["hurt", "hurt", "hurt"], ["let", "let", "let"], ["put", "put", "put"], ["shut", "shut", "shut"], ["set", "set", "set"]] },
    { title: "V2 và V3 giống nhau (kết thúc -t / -d)", rows: [["lend", "lent", "lent"], ["send", "sent", "sent"], ["spend", "spent", "spent"], ["build", "built", "built"], ["keep", "kept", "kept"], ["sleep", "slept", "slept"], ["feel", "felt", "felt"], ["leave", "left", "left"], ["meet", "met", "met"], ["lose", "lost", "lost"], ["shoot", "shot", "shot"], ["get", "got", "got"], ["light", "lit", "lit"], ["sit", "sat", "sat"], ["mean", "meant", "meant"], ["dream", "dreamt", "dreamt"], ["burn", "burnt", "burnt"], ["learn", "learnt", "learnt"], ["smell", "smelt", "smelt"]] },
    { title: "V2 và V3 giống nhau (đuôi -ught / -aught)", rows: [["bring", "brought", "brought"], ["buy", "bought", "bought"], ["fight", "fought", "fought"], ["think", "thought", "thought"], ["catch", "caught", "caught"], ["teach", "taught", "taught"]] },
    { title: "V2 và V3 giống nhau (nhóm khác)", rows: [["sell", "sold", "sold"], ["tell", "told", "told"], ["find", "found", "found"], ["have", "had", "had"], ["hear", "heard", "heard"], ["hold", "held", "held"], ["read", "read (đọc là /red/)", "read (đọc là /red/)"], ["say", "said", "said"], ["pay", "paid", "paid"], ["make", "made", "made"], ["stand", "stood", "stood"], ["understand", "understood", "understood"]] },
    { title: "V3 tận cùng -n / -en", rows: [["break", "broke", "broken"], ["choose", "chose", "chosen"], ["speak", "spoke", "spoken"], ["steal", "stole", "stolen"], ["wake", "woke", "woken"], ["drive", "drove", "driven"], ["ride", "rode", "ridden"], ["rise", "rose", "risen"], ["write", "wrote", "written"], ["beat", "beat", "beaten"], ["bite", "bit", "bitten"], ["hide", "hid", "hidden"], ["eat", "ate", "eaten"], ["fall", "fell", "fallen"], ["forget", "forgot", "forgotten"], ["give", "gave", "given"], ["see", "saw", "seen"], ["take", "took", "taken"]] },
    { title: "V3 tận cùng -n (nhóm -ew → -own)", rows: [["blow", "blew", "blown"], ["grow", "grew", "grown"], ["know", "knew", "known"], ["throw", "threw", "thrown"], ["fly", "flew", "flown"], ["draw", "drew", "drawn"], ["show", "showed", "shown"]] },
    { title: "Đổi nguyên âm: i - a - u", rows: [["begin", "began", "begun"], ["drink", "drank", "drunk"], ["swim", "swam", "swum"], ["ring", "rang", "rung"], ["sing", "sang", "sung"]] },
    { title: "V3 giống V1", rows: [["run", "ran", "run"], ["come", "came", "come"], ["become", "became", "become"]] },
    { title: "Ba động từ quan trọng nhất", rows: [["be", "was / were", "been"], ["do", "did", "done"], ["go", "went", "gone (hoặc been)"]] }
  ],
  shortForms: {
    intro: "Khi nói, ta thường đọc gọn hai từ thành một. Khi viết, dùng dấu nháy ' để thay chữ bị bỏ.",
    rows: [["I am", "I'm"], ["he is / he has", "he's"], ["we are", "we're"], ["I have", "I've"], ["I had / I would", "I'd"], ["I will", "I'll"], ["let us", "let's"], ["is not", "isn't"], ["are not", "aren't"], ["was not", "wasn't"], ["were not", "weren't"], ["have not", "haven't"], ["has not", "hasn't"], ["do not", "don't"], ["does not", "doesn't"], ["did not", "didn't"], ["will not", "won't"], ["cannot", "can't"], ["could not", "couldn't"], ["must not", "mustn't"], ["should not", "shouldn't"], ["would not", "wouldn't"]],
    notes: [
      "'s có thể là is (it's raining), has (she's gone), hoặc sở hữu (Kate's camera = camera của Kate); let's = let us.",
      "'d có thể là would (I'd like) hoặc had (I'd lost).",
      "Không dùng viết tắt 'm / 's / 've ở cuối câu trả lời: Yes, I am (không viết Yes, I'm)."
    ]
  },
  spelling: [
    { title: "Thêm -s / -es", body: "Danh từ số nhiều và động từ ngôi thứ ba thêm -s: bird → birds, think → thinks. Tận cùng -s, -sh, -ch, -x thì thêm -es: bus → buses, watch → watches, box → boxes. Một số từ tận cùng -o thêm -es: potato → potatoes, go → goes. Từ tận cùng -f / -fe đổi thành -ves: shelf → shelves, knife → knives (ngoại lệ: roof → roofs)." },
    { title: "Tận cùng -y", body: "Phụ âm + y đổi y thành ies, ied, ier / iest, ily: study → studies / studied, easy → easier / easiest / easily. Nguyên âm + y giữ nguyên y: holiday → holidays, enjoy → enjoyed, stay → stayed, buy → buys. Ngoại lệ bất quy tắc: say → said, pay → paid." },
    { title: "Thêm -ing", body: "Bỏ e cuối rồi thêm -ing: make → making, write → writing, dance → dancing. Tận cùng -ie đổi thành -ying: lie → lying, die → dying." },
    { title: "Gấp đôi phụ âm cuối", body: "Từ một âm tiết kết thúc bằng một nguyên âm + một phụ âm thì gấp đôi phụ âm trước khi thêm -ing / -ed / -er / -est: stop → stopping / stopped, run → running, big → bigger / biggest, hot → hotter. Không gấp đôi khi tận cùng hai phụ âm (help → helping), hai nguyên âm (wait → waiting), hoặc -y, -w (enjoy → enjoying). Từ nhiều âm tiết chỉ gấp đôi khi nhấn vào âm cuối: prefer → preferring, begin → beginning; nhưng visit → visiting, happen → happening." }
  ],
  phrasal: [
    { title: "Cụm động từ không có tân ngữ", rows: [
      ["carry on", "tiếp tục", "Don't stop. Carry on working."], ["come on", "nhanh lên", "Come on! We're late."], ["get on", "làm ăn, thi cử thế nào", "How did you get on in the exam?"],
      ["hold on", "chờ một chút", "Hold on a minute, please."], ["take off", "cất cánh", "The plane took off on time."], ["go off", "nổ; reo (chuông báo)", "The alarm clock goes off at six."],
      ["give up", "bỏ cuộc", "It's hard, but don't give up."], ["grow up", "lớn lên", "I grew up in a small town."], ["hurry up", "nhanh lên", "Hurry up or we'll miss the bus."],
      ["speak up", "nói to lên", "Speak up, I can't hear you."], ["wake up", "thức dậy", "I woke up at five."], ["wash up", "rửa bát đĩa", "I'll wash up after dinner."],
      ["slow down", "chạy chậm lại", "Slow down! The road is wet."], ["break down", "bị hỏng (xe, máy)", "My car broke down on the way."], ["fall over", "bị ngã", "He fell over in the street."]
    ] },
    { title: "Cụm động từ có tân ngữ", rows: [
      ["fill in / fill out", "điền (mẫu đơn)", "Please fill in this form."], ["put out", "dập tắt", "They put out the fire."], ["cross out", "gạch bỏ", "Cross out the wrong word."],
      ["try on", "mặc thử", "Can I try this jacket on?"], ["give up", "bỏ (thói quen, việc)", "She gave up her job."], ["look up", "tra (từ điển)", "Look the word up in a dictionary."],
      ["turn up", "vặn to lên", "Turn the radio up, please."], ["turn down", "vặn nhỏ xuống", "Turn the music down."], ["wake up", "đánh thức ai", "Wake me up at 6.30."],
      ["knock down", "phá, húc đổ", "They will knock down the old school."], ["knock over", "làm đổ", "Don't knock your cup over."], ["throw away", "vứt đi", "I threw away the old magazines."],
      ["put away", "cất vào chỗ cũ", "Put your toys away."], ["pay back", "trả lại tiền", "I'll pay you back next week."], ["show round", "dẫn đi tham quan", "She showed us round the factory."]
    ] }
  ]
};
