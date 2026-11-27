/* Khối "Hiểu sâu": giải thích TẠI SAO và ranh giới giữa các cách dùng, không chỉ là quy tắc.
   Cấu trúc: id bài -> { idea, whys:[[câu hỏi, trả lời]], contrast:{ head, rows:[[A, B, khác biệt]] }, explain:[[câu hỏi tự giải thích, đáp án mẫu]] } */
window.GRAMMAR_DEEP = window.GRAMMAR_DEEP || {};
window.GRAMMAR_DEEP["present-perfect"] = {
  idea: "Hiện tại hoàn thành không phải là một thì nói về quá khứ. Nó nói về HIỆN TẠI, nhìn từ một việc đã xảy ra trước đó. Hãy hình dung một sợi dây: một đầu là việc trong quá khứ, đầu kia buộc vào bây giờ. Nếu sợi dây còn nối đến hiện tại (kết quả còn đó, thời gian chưa kết thúc, trải nghiệm còn đúng với bạn) thì dùng have / has + V3. Nếu sợi dây đã đứt (việc đó thuộc về một thời điểm đã khép lại) thì dùng quá khứ đơn.",
  whys: [
    ["Tại sao có yesterday thì không được dùng have + V3?", "Yesterday khép việc đó vào một điểm đã qua, sợi dây với hiện tại bị cắt. Hiện tại hoàn thành cần giữ liên hệ với bây giờ, mà yesterday lại nói rõ \"lúc đó, không phải bây giờ\". Hai ý này mâu thuẫn nhau, nên I have seen him yesterday là sai."],
    ["Tại sao dùng have / has, tức là động từ \"sở hữu\"?", "Nghĩa gốc của I have lost my keys là \"Tôi đang có trong tay trạng thái: chìa khóa đã mất\". Have là hiện tại (tôi đang có), V3 mô tả trạng thái kết quả. Vì vậy câu luôn nặng về kết quả hiện nay, không chỉ kể lại một sự kiện."],
    ["Tại sao ever, never, just, already, yet đi với thì này?", "Cả năm từ đều đo khoảng thời gian cho đến BÂY GIỜ chứ không chỉ đến một mốc nào đó: ever (trong suốt đời cho tới nay), yet (cho tới lúc này), just (ngay trước lúc này), already (sớm hơn mong đợi tính đến lúc này). Cùng một trục thời gian chạy đến hiện tại nên chúng hợp với have + V3."],
    ["Tại sao dùng since với mốc, for với khoảng?", "Since chỉ điểm xuất phát của sợi dây (since 2019 = từ năm 2019 đến giờ). For chỉ độ dài của sợi dây (for five years = dài năm năm). Điểm thì cần mốc, độ dài thì cần khoảng, nên đổi chỗ hai từ này là sai nghĩa chứ không chỉ sai quy tắc."],
    ["Tại sao has gone to khác has been to?", "Been to nghĩa là đã đến đó và đã quay lại, nên trải nghiệm thuộc về bạn. Gone to nghĩa là đang trên đường hoặc đang ở đó, chưa về. Dùng gone khi nói về trải nghiệm của chính mình là sai: I have gone to Japan nghe như \"tôi đã đi Nhật và vẫn ở đó\"."]
  ],
  contrast: {
    head: "Cùng một sự việc, hai thì, hai thông điệp khác nhau",
    rows: [
      ["Did you see Tom? (quá khứ đơn)", "Have you seen Tom? (hiện tại hoàn thành)", "Câu đầu hỏi về một lần nhìn thấy cụ thể trong quá khứ. Câu sau hỏi \"bạn có biết Tom đang ở đâu không?\", quan tâm đến thông tin hiện tại."],
      ["I lost my keys. (quá khứ đơn)", "I have lost my keys. (hiện tại hoàn thành)", "Câu đầu chỉ kể việc đã mất, có thể đã tìm lại. Câu sau cho biết hiện giờ tôi vẫn không có chìa khóa."],
      ["I lived in Hanoi for ten years.", "I have lived in Hanoi for ten years.", "Câu đầu: tôi không còn sống ở Hà Nội. Câu sau: tôi vẫn đang sống ở đó."],
      ["I worked here last year.", "I have worked here since last year.", "Last year là mốc đã khép lại nên dùng quá khứ đơn. Since last year kéo dài đến nay nên dùng hiện tại hoàn thành."]
    ]
  },
  explain: [
    ["Bằng lời của bạn: vì sao câu \"I have visited Paris in 2019\" sai? Sửa lại thế nào?", "Vì in 2019 là mốc đã khép lại, không còn nối với hiện tại. Sửa: I visited Paris in 2019. Hoặc bỏ mốc để nói về trải nghiệm: I have visited Paris."],
    ["Bạn nghe câu \"She has lived here for 3 years\" và \"She lived here for 3 years\". Hai câu khác nhau chỗ nào về sự thật?", "Câu thứ nhất: cô ấy vẫn đang sống ở đây. Câu thứ hai: cô ấy đã từng sống ở đây ba năm và giờ không còn."],
    ["Khi nào bạn chọn \"Have you eaten?\" thay vì \"Did you eat?\"", "Khi quan tâm tình trạng bây giờ (bạn có đói không, có cần đi ăn cùng không). Did you eat? hỏi về một bữa cụ thể trong quá khứ, thường đi kèm mốc như this morning hoặc at noon."]
  ]
};
