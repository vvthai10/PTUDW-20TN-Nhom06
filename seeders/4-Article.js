"use strict";
const slugify = require("slugify");

function randomIntFromRange(a, b) {
  const min = Math.min(a, b); // Tìm số nhỏ nhất trong hai số a và b
  const max = Math.max(a, b); // Tìm số lớn nhất trong hai số a và b
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    /*NOTE:
      - 1 - 5: là nông sản
      - 6 - 10: là hải sản
      - 11 - 15: là  kinh tếtrong nước
      - 16 - 20: là kinh tế quốc tế
      - 21 - 25: là thể thao trong nước
      - 26 - 30: là thể thao quốc tế
    */
    let data = [
      /*Nông sản*/
      {
        name: "Tôm sú Cà Mau có hàng chục tiêu chuẩn quốc tế nhưng người nông dân vẫn khổ",
        imgCover:
          "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/4/6/anh-su-1680768592569925208697.jpg",
        description: `Vùng nuôi tôm sú ở Cà Mau có đến gần 10 chứng nhận tiêu chuẩn quốc tế nhưng theo ông Lê Văn Sử, Phó chủ tịch UBND tỉnh Cà Mau, lãnh đạo tỉnh vẫn chưa "thỏa mãn", chưa đạt được mục tiêu vì người nông dân vẫn khổ.`,
        content: `Sau khi nghe các diễn giả trình bày về hệ sinh thái thương hiệu tại Tọa đàm "Xây dựng thương hiệu quốc gia cho nông sản Việt" do Báo Thanh Niên tổ chức sáng nay (6.4), ông Lê Văn Sử bày tỏ vô cùng băn khoăn, hoang mang bởi muốn có thương hiệu thì phải xây dựng thành công cả hệ thống hệ sinh thái nhiều thành phần. Tuy nhiên, đối chiếu về địa phương thì có những thành phần rất khó hình thành. `,
      },
      {
        name: "Xuất khẩu lô hàng trứng lỏng đầu tiên sang Hàn Quốc",
        imgCover:
          "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/5/27/2bc18032-f68e-4eba-ba34-e2dcb2a58b04-16851534522002144839853.jpeg",
        description: `Lần đầu tiên một doanh nghiệp Việt Nam xuất khẩu thành công lô hàng trứng lỏng sang Hàn Quốc, mở ra cơ hội mới cho mặt hàng này`,
        content: `"Trứng lỏng thanh trùng là sản phẩm mới khai thác thị trường ngách dành cho chế biến trong nhà hàng hay các phòng tập thể hình dành cho gymer. Trong bối cảnh kinh tế suy thoái hiện nay, các nhà hàng khách sạn cao cấp vắng khách nên sản phẩm này của Vĩnh Thành Đạt chưa được tiêu thụ nhiều. Từ đó, chúng tôi đã chào hàng và đã xuất khẩu thành công sang thị trường Hàn Quốc.`,
      },
      {
        name: "Sầu riêng giúp xuất khẩu rau quả tăng hơn 80% trong tháng 5",
        imgCover:
          "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/3/26/dsc03063-16798061982341697032440.jpg",
        description: `Xuất khẩu rau quả tiếp tục duy trì đà tăng trưởng trong tháng 5 khi tăng 19% so với tháng 4.2023 và tăng đến 80,6% so với cùng kỳ năm 2022.`,
        content: `Báo cáo sơ bộ của hải quan cho biết, trong tháng 5, xuất khẩu rau quả đạt 466 triệu USD. Lũy kế 5 tháng đầu năm nay đạt trên 1,8 tỉ USD, tăng gần 29 % so với cùng kỳ năm trước. Trong nhóm 10 thị trường xuất khẩu lớn nhất của rau quả Việt Nam, Hà Lan tăng trưởng mạnh nhất với 72%; thị trường quan trọng nhất vẫn là Trung Quốc với tốc độ tăng trưởng gần 30%. Trung bình từ đầu năm đến nay, mỗi tháng Trung Quốc nhập khẩu rau quả từ Việt Nam trên 200 triệu USD. Trong khi đó, thị trường xuất khẩu rau quả lớn thứ 2 là Mỹ lại giảm tới 17%, trong 4 tháng đầu năm nay mới đạt trên 72 triệu USD.`,
      },
      {
        name: "Đổ xô xuất khẩu, trong nước liệu có thiếu cà phê?",
        imgCover:
          "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/5/26/ca-phe-xuat-khau-16851227955921794572178.jpg",
        description: `Cà phê xuất khẩu thô hút hàng, giá tăng cao kỷ lục trong khi sản lượng trong nước không còn nhiều. Điều này liệu có ảnh hưởng đến giá tiêu dùng nội địa?`,
        content: `Những ngày cuối tháng 5, người nông dân trồng cà phê khu vực Tây nguyên khấp khởi vui mừng khi giá cà phê liên tục tăng cao, dù rằng phải ít nhất 5 tháng nữa mới đến vụ thu hoạch mới. Hiện nay, giá cà phê Robusta trung bình ở các tỉnh giao dịch ở mức cao chưa từng có trong lịch sử, trên 60.000 đồng/kg, trước đó có thời điểm lên đến 64.000 đồng/kg. So đầu năm, giá cà phê hiện tại đã tăng khoảng 40%. Ðây là con số mơ ước của những người trồng, kinh doanh cà phê trong những năm gần đây. Thị trường thiếu hụt nên các thương lái tỏa đi các nơi để thu gom cà phê đáp ứng nhu cầu xuất khẩu.`,
      },
      {
        name: "Dân Trung Quốc mê khô cá cơm, cá chỉ vàng Việt Nam",
        imgCover:
          "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/3/2/z414889614632786b2885cf68f7f78b9842874fd17b5e3-167772324073322989480.jpg",
        description: `Bất ngờ nhóm hàng cá khô các loại xuất khẩu tăng trưởng đến 65% trong khi hầu hết các mặt hàng khác đều giảm mạnh. Dẫn đầu về tiêu thụ các sản phẩm khô của Việt Nam là Trung Quốc, chiếm tới 56% tổng kim ngạch của nhóm hàng này.`,
        content: `Theo Hiệp hội Chế biến và xuất khẩu thủy sản Việt Nam (VASEP), riêng trong tháng 4.2023, xuất khẩu cá biển khô các loại tăng 65%, đạt gần 26 triệu USD. Lũy kế 4 tháng đầu năm, sản phẩm này đã thu về gần 78 triệu USD, tăng 33% so với cùng kỳ năm 2022. Hai loại cá khô Việt Nam được ưa chuộng nhất hiện nay là cá cơm chiếm 66%, cá chỉ vàng chiếm 14%.`,
      },
      /*Hải sản*/
      {
        name: "Thủ tướng phê bình bốn địa phương để tái diễn vi phạm khai thác thuỷ sản",
        imgCover:
          "https://i1-kinhdoanh.vnecdn.net/2023/04/18/danhbatcangudaiduong-168177835-2302-2560-1681778576.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=d81LilJCgaXDQQBwLVe7Zg",
        description: `Bình Định, Khánh Hòa, Bình Thuận, Kiên Giang bị phê bình vì để tàu cá vi phạm vùng biển nước ngoài từ đầu năm 2023 đến nay.`,
        content: `Công điện của lãnh đạo Chính phủ đưa ra trong bối cảnh kinh tế thế giới biến động phức tạp, ảnh hưởng tiêu cực tới phục hồi, tăng trưởng toàn cầu; trong nước chịu tác động kép từ các yếu tố bên ngoài và những hạn chế nội tại của nền kinh tế. Nông nghiệp trong nước đối mặt khó khăn khi giá vật tư đầu vào ở mức cao, thị trường bị thu hẹp, khai thác hải sản bất hợp pháp tái diễn, ảnh hưởng tới sản xuất kinh doanh, đời sống người dân.`,
      },
      {
        name: "Ăn hải sản giúp phòng ngừa đột quỵ",
        imgCover:
          "https://i1-suckhoe.vnecdn.net/2022/11/29/hisn-1669695518-3798-1669696337.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=1-unzbZEa0dUWw9zWxDZCQ",
        description: `Hải sản chứa ít natri, nhiều kali, có iốt tự nhiên, giàu axit béo omega-3 giúp bảo vệ não và dây thần kinh, ngăn ngừa đột quỵ và bệnh tim. `,
        content: `Theo nghiên cứu của Đại học Cambridge (Anh), hải sản rất giàu chất béo lành mạnh như axit béo omega-3 gồm: axit alpha-linolenic (ALA), axit eicosapentaenoic (EPA) và axit docosahexaenoic (DHA). Những axit béo này giúp bảo vệ não và dây thần kinh, đồng thời ngăn ngừa sự tích tụ của chất béo có hại và cholesterol trong mạch máu. Nhờ những tác động này mà ăn hải sản giúp ngăn ngừa nguy cơ đôt quỵ, bệnh tim và có lợi cho sức khỏe tổng thể.`,
      },
      {
        name: "Người bệnh gout vẫn có thể ăn hải sản",
        imgCover:
          "https://i1-suckhoe.vnecdn.net/2022/09/02/shutterstock-1594970785-166208-2144-8898-1662083275.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=i6_70rv2yViWKlkjZ45IIQ",
        description: `Người bệnh gout có thể ăn các loại hải sản như tôm, cua, cá… nhưng cần đảm bảo không tiêu thụ quá lượng cho phép. `,
        content: `Là một trong những thực phẩm có hàm lượng purin cao nên từ lâu, người bệnh gout luôn được khuyến cáo không nên ăn hải sản. Tuy nhiên, hải sản lại là nguồn cung cấp chất dinh dưỡng và khoáng chất dồi dào, rất tốt cho sức khỏe, do đó, sẽ là thiệt thòi nếu người bệnh gout không thể ăn nhóm thực phẩm này. ThS.BSNT Nguyễn Thị Ánh Ngọc, khoa Cơ xương khớp, Bệnh viện Đa khoa Tâm Anh Hà Nội, cho biết thay vì "cấm cửa" hoàn toàn, người bệnh vẫn có thể ăn hải sản trong mức hợp lý để đảm bảo cân bằng dinh dưỡng.`,
      },
      {
        name: "Bị sỏi thận có được ăn hải sản không?",
        imgCover:
          "https://i1-suckhoe.vnecdn.net/2022/08/30/hai-san-1-1661833345-1488-1661833689.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=R_B-sd0bwbL3zw21vljR4A",
        description: `Hải sản rất giàu canxi nên thường được xem là yếu tố hàng đầu gây sỏi thận, tuy nhiên không phải người bệnh sỏi thận nào cũng cần kiêng hải sản.`,
        content: `Sỏi thận chiếm tỷ lệ 40% trong nhóm sỏi tiết niệu ở Việt Nam. Nguyên nhân gây bệnh chủ yếu là do thói quen ăn uống, thói quen sinh hoạt và thói quen chăm sóc sức khỏe. Theo Thầy thuốc ưu tú, Phó Giáo sư, Tiến sĩ Vũ Lê Chuyên, Giám đốc Trung tâm tiết niệu thận học Bệnh viện đa khoa Tâm Anh, có rất nhiều yếu tố thúc đẩy hình thành sỏi thận, trong đó có thực phẩm. Một số loại thực phẩm và đồ uống chứa chất có thể dẫn đến việc hình thành những tinh thể này nhanh hơn, nhưng một số khác lại không.`,
      },
      {
        name: "Xuất khẩu hải sản 9 tháng đạt 2,4 tỷ USD",
        imgCover:
          "https://i1-kinhdoanh.vnecdn.net/2021/10/24/c3-jpeg-1635046196-1635046211-6068-1635046218.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=d9ZV_l57gBdV0HOakJhxVQ",
        description: `Chín tháng qua, xuất khẩu hải sản tăng 2,8% so với cùng kỳ năm ngoái, theo Hiệp hội Chế biến và Xuất khẩu Thuỷ sản Việt Nam (Vasep). `,
        content: `Kim ngạch 2,4 tỷ USD xuất khẩu hải sản của Việt Nam đến từ các mặt hàng: cá ngừ; mực, bạch tuộc; cua, ghẹ, giáp xác; nhuyễn thể hai mảnh vỏ; nhuyễn thể khác; cá các loại (trừ cá ngừ và cá tra). Trong 9 tháng đầu năm, ba mặt hàng chiếm tỷ trọng xuất khẩu cao nhất lần lượt là: các loại cá (trừ cá ngừ và cá tra); cá ngừ và mực, bạch tuộc.`,
      },
      /*Kinh tế Trong nước*/
      {
        name: "Thủ tướng kêu gọi “chung sức, đồng tâm” gỡ khó cho bất động sản",
        imgCover:
          "https://vtv1.mediacdn.vn/thumb_w/650/562122370168008704/2023/5/27/photo1685191192413-1685191192771385362234.jpg",
        description: `Phó Thủ tướng Chính phủ Trần Hồng Hà vừa ký ban hành Công điện 469 về tháo gỡ và thúc đẩy thị trường bất động sản phát triển an toàn, lành mạnh, bền vững.`,
        content: `Công điện nêu rõ thị trường bất động sản có vai trò quan trọng trong "hệ sinh thái" kinh tế và liên quan trực tiếp đến nhiều ngành kinh tế: công nghiệp xây dựng, dịch vụ, du lịch, lưu trú, sản xuất vật liệu, tài chính, ngân hàng... tác động đến chuỗi sản xuất như vật liệu, sắt thép, đồ gia dụng, thị trường vốn, tín dụng, thị trường lao động... ảnh hưởng đến ổn định kinh tế vĩ mô, tăng trưởng, an sinh xã hội, việc làm. Quản lý và phát triển tốt thị trường bất động sản sẽ tạo điều kiện thuận lợi thu hút đầu tư, huy động nguồn nội lực to lớn, góp phần thúc đẩy phát triển kinh tế - xã hội đất nước.`,
      },
      {
        name: "Đề xuất không giảm thuế VAT 2% cho chứng khoán, bất động sản, ngân hàng",
        imgCover:
          "https://vtv1.mediacdn.vn/thumb_w/650/562122370168008704/2023/5/24/photo1684920451879-1684920452477176272266.png",
        description: `Theo đại biểu Trần Văn Lâm (đoàn Bắc Giang), vừa rồi một loạt ngân hàng báo lãi lớn lắm, thực tế lãi lớn, nên giảm thuế VAT từ 10% xuống 8% là vô lý.`,
        content: `Trình bày tờ trình, Bộ trưởng Bộ Tài chính Hồ Đức Phớc cho biết, tăng trưởng GDP quý I/2023 đạt 3,32%, thấp hơn nhiều so với mục tiêu đặt ra tại Nghị quyết số 01 của Chính phủ (kịch bản tăng trưởng GDP quý I là 5,6%). Nhiều doanh nghiệp đã sa thải hoặc giãn việc số lượng lớn công nhân do bị cắt giảm hoặc không có đơn hàng, khiến đời sống một bộ phận người lao động gặp nhiều khó khăn.`,
      },
      {
        name: "5 tháng, lượng hành khách qua các cảng hàng không tăng gần 38%",
        imgCover:
          "https://vtv1.mediacdn.vn/thumb_w/640/562122370168008704/2023/5/26/photo-1-16850959722841575216158.jpg",
        description: `Tính chung 5 tháng, có tới 45,5 triệu khách qua các cảng hàng không, tăng 37,8% so với cùng kỳ năm 2022.`,
        content: `Theo thông tin từ Cục Hàng không Việt Nam, trong tháng 5, các cảng hàng không trên cả nước đón 9 triệu khách, tăng 3,2% so tháng 4. Cũng trong tháng 5, các hãng hàng không Việt Nam vận chuyển 4,46 triệu khách, tăng 3,3% so với tháng 4/2023, (bao gồm 1,2 triệu khách quốc tế và 3,26 triệu khách nội địa).`,
      },
      {
        name: "Lương đến 40 triệu đồng/tháng, ngành kỹ thuật hàng không vẫn “khát” nhân lực",
        imgCover:
          "https://vtv1.mediacdn.vn/thumb_w/640/562122370168008704/2023/5/25/nhan-luc-hang-khong-1685017266973881408165.jpg",
        description: `Hiện nay, nhu cầu về nguồn nhân lực hàng không là rất lớn. Thực tế này đòi hỏi các cơ sở đào tạo phải đẩy mạnh chất lượng, đáp ứng sát với nhu cầu tuyển dụng.`,
        content: `"Đối với thị trường Đông Nam Á, trong 20 năm tới cần bổ sung 60.000 nhân viên kỹ thuật vì từ nay đến thời gian đó, số lượng máy bay tăng gấp đôi. Do đó, nhu cầu bảo dưỡng tày bay rất lớn. Đối với thị trường Việt Nam, các hãng hàng không đều đang mở rộng công việc kinh doanh của mình, tìm kiếm, bổ sung nhân lực, ông Nguyễn Chiến Thắng, Phó Tổng Giám đốc, Tổng công ty Hàng không Việt Nam, cho biết.`,
      },
      {
        name: "Khẩn trương gỡ vướng hoàn thuế giá trị gia tăng cho doanh nghiệp",
        imgCover:
          "https://vtv1.mediacdn.vn/thumb_w/650/562122370168008704/2023/5/27/photo1685190563569-1685190564086481270044.jpg",
        description: `Tổng cục Thuế yêu cầu khẩn trương rà soát hồ sơ khai thuế giá trị gia tăng của các DN để hướng dẫn DN kê khai, nộp hồ sơ đề nghị hoàn thuế theo đúng quy định.`,
        content: `Tổng cục Thuế vừa ban hành công văn chỉ đạo cục thuế các tỉnh, thành phố đẩy mạnh giải quyết hồ sơ hoàn thuế giá trị gia tăng (GTGT) cho doanh nghiệp, người dân. Đối với các hồ sơ hoàn thuế GTGT đang có vướng mắc, phản ánh của các hiệp hội, doanh nghiệp thì tổ chức đối thoại ngay với hiệp hội, doanh nghiệp trong tuần từ ngày 29/5/2023 đến ngày 2/6/2023 để làm rõ vướng mắc; chủ động xử lý, giải quyết các vướng mắc và thực hiện hoàn thuế theo đúng quy định, đúng thẩm quyền, không để tồn đọng kéo dài, gây bức xúc cho người dân và doanh nghiệp.`,
      },
      /*Kinh tế Quốc tế*/
      {
        name: "Những tỷ phú quyền lực nhất châu Á",
        imgCover:
          "https://i1-kinhdoanh.vnecdn.net/2023/05/23/set-1684835509-1801-1684835660.jpg?w=240&h=144&q=100&dpr=1&fit=crop&s=u8OljKJHMQ6dGRE-_ODppg",
        description: `Li Ka-shing được coi là người thay đổi vận mệnh cho Hong Kong, còn Jack Ma được đánh giá cao về tầm nhìn với thương mại điện tử toàn cầu.`,
        content: `Khi châu Á ngày càng phát triển và đóng vai trò lớn hơn trong kinh tế toàn cầu, các doanh nhân khu vực này cũng mở rộng tầm ảnh hưởng trên thế giới. Các khoản đầu tư vào năng lượng tái tạo của Mukesh Ambani, hay tầm nhìn về thương mại điện tử toàn cầu của Jack Ma được cho là sẽ tiếp tục đóng góp cho thế giới trong nhiều năm tới.`,
      },
      {
        name: "Doanh nghiệp Mỹ chuẩn bị cho kịch bản chính phủ vỡ nợ",
        imgCover:
          "https://i1-kinhdoanh.vnecdn.net/2023/05/23/national-debt-1684817441-6072-1684817448.jpg?w=240&h=144&q=100&dpr=1&fit=crop&s=OH5Ra_DeK-pfKL3K3LPp1A",
        description: `Giới chuyên gia cho rằng doanh nghiệp Mỹ cần đánh giá mức độ liên quan với chính phủ, tăng giữ tiền mặt và bán bớt trái phiếu kho bạc.`,
        content: `Dù một số cho rằng Mỹ không thể vỡ nợ, Văn phòng Ngân sách Quốc hội Mỹ (CBO) hồi đầu tháng cho biết khả năng chính phủ không thể hoàn thành tất cả nghĩa vụ thanh toán trong hai tuần đầu tháng 6 "là rất lớn". Bộ trưởng Tài chính Mỹ Janet Yellen đã cảnh báo cơ quan này hết tiền sớm nhất là đầu tháng sau.`,
      },
      {
        name: "Australia không ủng hộ Trung Quốc gia nhập CPTPP",
        imgCover:
          "https://i1-kinhdoanh.vnecdn.net/2023/05/23/fed157-1684814306-1684814320-3400-1684814388.jpg?w=240&h=144&q=100&dpr=1&fit=crop&s=8CLSvfU8f40mCRqsb4Im-w",
        description: `Trung Quốc đã không giành được ủng hộ của Australia để gia nhập Hiệp định Đối tác Toàn diện và Tiến bộ xuyên Thái Bình Dương (CPTPP). `,
        content: `Theo nguồn tin của SCMP, Bắc Kinh đã bày tỏ mong muốn có "một cam kết rõ ràng từ Australia, tốt nhất là công khai", rằng Canberra sẽ ủng hộ nỗ lực của Trung Quốc tham gia CPTPP và "từ chối tư cách thành viên của Đài Loan", trong chuyến thăm của Bộ trưởng Thương mại Don Farrell đến Trung Quốc đầu tháng này.`,
      },
      {
        name: "Áp lực núi nợ của các địa phương Trung Quốc",
        imgCover:
          "https://i1-kinhdoanh.vnecdn.net/2023/05/22/1400x-1-jpeg-1684732133-6134-1684732247.jpg?w=240&h=144&q=100&dpr=1&fit=crop&s=PRx-S_KWe5haMBXKCczriA",
        description: `Chiếm phần không nhỏ trong núi nợ công 23.000 tỷ USD, nợ của các địa phương đang trở thành rủi ro tài chính lớn mà Chính phủ Trung Quốc cần giải quyết.`,
        content: `Goldman Sachs ước tính tổng nợ công của Trung Quốc hiện khoảng 23.000 tỷ USD. Nó gồm cả trái phiếu chính phủ, trái phiếu địa phương và khoản vay ngầm của các công ty tài chính do chính quyền địa phương lập ra (LGFV). Trong đó, riêng khoản nợ ngầm này đã tăng lên 57.000 tỷ nhân dân tệ (8.300 tỷ USD) vào năm 2022, tương đương 48% GDP Trung Quốc, theo ước tính từ Quỹ Tiền tệ Quốc tế IMF.`,
      },
      {
        name: "IEA: Châu Âu vẫn còn ba rào cản lớn về năng lượng",
        imgCover:
          "https://i1-kinhdoanh.vnecdn.net/2023/05/22/oil-set-reuters-1684746082-3307-1684746142.jpg?w=240&h=144&q=100&dpr=1&fit=crop&s=N4KdBCmMFtrgmlQ24KR7Wg",
        description: `Giám đốc IEA đánh giá châu Âu đã giảm phụ thuộc vào dầu khí Nga và ngăn khủng hoảng năng lượng, nhưng chưa hoàn toàn thoát khó khăn.`,
        content: `"Châu Âu đã cải tổ được thị trường năng lượng, giảm tỷ lệ khí đốt Nga trong nền kinh tế về dưới 4% mà vẫn chưa suy thoái. Dự trữ khí đốt cũng ở mức phù hợp", Giám đốc Cơ quan Năng lượng Quốc tế (IEA) Fatih Birol đánh giá trong cuộc phỏng vấn với CNBC.`,
      },
      /*Thể thao Trong nước*/
      {
        name: "Thanh Thúy sắp đấu sao bóng chuyền giá triệu USD tại giải thế giới",
        imgCover:
          "https://static-images.vnncdn.net/files/publish/2023/5/25/thanh-thuy-1-494.jpeg",
        description: `Tay đập số 1 Việt Nam Trần Thị Thanh Thúy có cơ hội đọ sức với ngôi sao Tijana Boskovic (CLB Eczacıbaşı Dynavit) tại giải bóng chuyền vô địch các CLB thế giới 2023.`,
        content: `LĐBC thế giới (FIVB) thông báo về thể thức cúp CLB thế giới 2023. Theo đó, giải đấu diễn ra tại Trung Quốc vào tháng 12 tới, quy tụ 6 đội bóng tranh tài. Tuyển bóng chuyền nữ Việt Nam sau kỳ tích lên ngôi vô địch ở cúp CLB châu Á vừa qua tại Vĩnh Phúc, lần đầu góp mặt ở sân chơi danh giá.`,
      },
      {
        name: "Trưởng Ban trọng tài nói gì về pha 'việt vị' ở trận CAHN - SLNA?",
        imgCover:
          "https://static-images.vnncdn.net/files/publish/2023/5/27/tro-ly-trong-tai-399.jpg",
        description: `Trưởng Ban trọng tài VFF Đặng Thanh Hạ thừa nhận trợ lý trọng tài Nguyễn Thành Sơn mắc sai lầm khi phất cờ việt vị với cầu thủ SLNA.`,
        content: `"Tình huống đó rõ ràng là sai, chúng ta không cần phải nói nhiều nữa. Tuy nhiên, vấn đề là vì sao trợ lý trọng tài Nguyễn Thành Sơn đưa ra quyết định sai lầm mới là điều cần được phân tích.`,
      },
      {
        name: "Tiền thưởng SEA Games của các VĐV Việt Nam: Nguyễn Thị Oanh 'đầu bảng'",
        imgCover:
          "https://static-images.vnncdn.net/files/publish/2023/5/23/nguyen-thi-oanh-1.jpg",
        description: `Nguyễn Thị Oanh nhận được nhiều khoản thưởng nóng có giá trị sau những gì đã cống hiến cho thể thao Việt Nam ở SEA Games 32.`,
        content: `Với những đóng góp lớn và đặc biệt là hình ảnh chiến đấu kiên cường, Nguyễn Thị Oanh nhận mưa tiền thưởng sau SEA Games 32. Cụ thể, ngoài mức thưởng theo quy định của nhà nước (45 triệu đồng/1 HCV SEA Games), VĐV 27 tuổi còn được thưởng nóng hơn 400 triệu đồng từ các đơn vị, được thưởng 1 xe ô tô và một căn hộ từ mạnh thường quân.`,
      },
      {
        name: "Tuyển Việt Nam: HLV Philippe Troussier thiếu gì?",
        imgCover:
          "https://static-images.vnncdn.net/files/publish/2023/5/26/congphuong-quanghai-1483.jpeg",
        description: `Tuyển Việt Nam hội quân vào đầu tháng 6 trước khi đá giao hữu với Hong Kong trong kỳ FIFA Days với không ít thiếu thốn mà chỉ HLV Philippe Troussier mới hiểu.`,
        content: `Theo kế hoạch, tuyển Việt Nam tập trung vào ngày 7/6 khi vòng 11 V-League 2023 kết thúc. Sau đó khoảng 1 tuần, đội bóng của HLV Troussier đấu với Hong Kong tại SVĐ Lạch Tray trong khuôn khổ FIFA Days.`,
      },
      {
        name: "Golf Việt Nam nhận tin vui sau SEA Games",
        imgCover:
          "https://static-images.vnncdn.net/files/publish/2023/5/27/golf-khanh-hung-12-403.jpg",
        description: `Hiệp hội Golf Việt Nam (VGA) công bố và cho ra mắt phiên bản Luật Golf 2023 tiếng Việt.`,
        content: `Dưới chỉ đạo của VGA và sự ủy quyền, cho phép của The R&A và USGA, Hội đồng Trọng tài Golf Quốc gia chủ động phối hợp, biên dịch và chuyển ngữ tất cả các tài liệu Luật Golf 2023 sang tiếng Việt.`,
      },
      /*Thể thao Quốc tế*/
      {
        name: "Con gái rượu của Pep Guardiola khiến nhiều cầu thủ muốn... làm rể",
        imgCover:
          "https://static-images.vnncdn.net/files/publish/2023/5/23/maria-guardiola-1392.jpg",
        description: `Cô con gái xinh đẹp của Pep Guardiola thu hút mọi ánh nhìn trong lễ ăn mừng vô địch Premier League của Man City.`,
        content: `Sau khi đánh bại Chelsea để chính thức đăng quang Ngoại hạng Anh năm thứ 3 liên tiếp, Man City đã tổ chức buổi lễ trao cúp trên sân Etihad. Các thành viên gia đình, vợ con cùng bạn bè thân thiết của cầu thủ, ban huấn luyện được xuống sân để chia vui.`,
      },
      {
        name: "Dortmund bị cầm hòa, Bayern Munich nghẹt thở lên ngôi vô địch",
        imgCover:
          "https://static-images.vnncdn.net/files/publish/2023/5/27/dortmund-mainz-928.jpg",
        description: `Dortmund vất vả có được 1 điểm trước Mainz, trong khi Bayern Munich thắng Cologne 2-1 để đoạt chức vô địch Bundesliga 2022/23 theo cách kịch tính nhất có thể.`,
        content: `Vòng 34 Bundesliga kết thúc với việc Bayern Munich giành chiến thắng 2-1 trước Cologne, trong khi Dortmund vất vả hòa 2-2 trước Mainz và đánh mất đi cơ hội lên ngôi vô địch lần đầu tiên sau 11 năm. Mùa giải kết thúc với việc cả Bayern và Dortmund cùng có được 71 điểm nhưng "Hùm xám" hơn đội bóng vùng Ruhr về hiệu số lẫn chỉ số đối đầu.`,
      },
      {
        name: "MU chốt ký Pavard, Arsenal mua Ansu Fati",
        imgCover:
          "https://static-images.vnncdn.net/files/publish/2023/5/27/pavard-bayern-leipzig-389.jpg",
        description: `MU liên hệ Parvard, Arsenal đàm phán mua Ansu Fati, Milan muốn lấy Milinkovic-Savic là những tin bóng đá chính hôm nay, 27/5.`,
        content: `Đội bóng giữ kỷ lục 20 lần vô địch bóng đá Anh, MU, đang trở thành tâm điểm chuyển nhượng với hàng loạt mục tiêu được nhắm đến sau khi giành vé Champions League.`,
      },
      {
        name: `Real Madrid kích nổ 'bom tấn" Bellingham vào tuần tới`,
        imgCover:
          "https://static-images.vnncdn.net/files/publish/2023/5/26/jude-bellingham-real-madrid-1474.jpg",
        description: `Đội bóng Hoàng gia dự kiến sẽ thông báo bản hợp đồng trị giá hơn 100 triệu euro chiêu mộ Jude Bellingham từ Dortmund đầu tuần tới.`,
        content: `Tài năng trẻ người Anh từ lâu đã nằm trong tầm ngắm của đội bóng Hoàng gia. Liverpool từng rất quan tâm đến Jude Bellingham nhưng đành rút lui vì cảm thấy không thể cạnh tranh với Real Madrid.`,
      },
      {
        name: "U23 Thái Lan lớn tiếng: Thắng U23 châu Á và đến Olympic",
        imgCover:
          "https://static-images.vnncdn.net/files/publish/2023/5/26/u23-thai-lan-u23-malaysia-730.jpg",
        description: `Ngay sau khi có kết quả bốc thăm vòng loại U23 châu Á, HLV trưởng U23 Thái Lan tuyên bố về mục tiêu chinh phục vé tham dự Olympic 2024.`,
        content: `U23 Thái Lan, với nòng cốt là đội hình U22 vừa thất bại thảm hại trước U22 Indonesia trong trận chung kết SEA Games 32, sẽ đăng cai bảng H vòng loại U23 châu Á 2024. Các đối thủ của U23 Thái Lan là hai đội trong khu vực U23 Malaysia, U23 Philippines, cùng U23 Bangladesh.`,
      },
    ];

    /*NOTE:
      - 1: là admin
      - 2 - 4: default
      - 5 - 6: premium
      - 7 - 8: writer
      - 9 - 10: editor
    */
    data.forEach((item) => {
      item.slug = slugify(item.name, { lower: true, strict: true });
      item.premium = false;
      item.status = "posted";
      item.nLike = randomIntFromRange(0, 20);
      item.nComment = randomIntFromRange(0, 5);
      item.nView = randomIntFromRange(0, 100);
      item.nViewWeek = randomIntFromRange(0, 20);
      item.nViewMonth = randomIntFromRange(20, 50);
      item.authorId = randomIntFromRange(7, 8);
      item.editorId = randomIntFromRange(9, 10);
      item.createdAt = Sequelize.literal("NOW()");
      item.approve = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
      item.reviewComment = "Bài tốt. Chấp nhận đăng.";
    });
    await queryInterface.bulkInsert("Articles", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Articles", null, {});
  },
};
