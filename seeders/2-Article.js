"use strict";

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
    let data = [
      {
        name: "Thủ tướng đề nghị Mỹ mở cửa hơn nữa cho nông sản Việt Nam",
        premium: false,
        status: "posted",
        imgCover:
          "https://icdn.dantri.com.vn/thumb_w/1020/2023/04/19/img8324-16819057031771196709141-1681912444965.jpeg",
        description:
          "Gặp Bộ trưởng Nông nghiệp Mỹ, Thủ tướng Phạm Minh Chính đề nghị Mỹ mở cửa thị trường hơn nữa cho các sản phẩm nông sản của Việt Nam, hỗ trợ Việt Nam trong chuyển đổi xanh, thích ứng biến đổi khí hậu.",
        content: `<p>Chiều 19/4, Thủ tướng Phạm Minh Chính tiếp Bộ trưởng Nông nghiệp Mỹ Thomas Vilsack đang có chuyến thăm và làm việc tại Việt Nam.</p><p>Trong tổng thể chính sách đối ngoại, Thủ tướng Phạm Minh Chính khẳng định Việt Nam luôn coi Mỹ là một trong những đối tác quan trọng hàng đầu; đồng thời mong muốn thúc đẩy quan hệ Đối tác toàn diện với Mỹ và ủng hộ việc tăng cường quan hệ hữu nghị, hợp tác trong các lĩnh vực.</p><figure class="image align-center" contenteditable="false"><img style="width: 80%;" title="Thủ tướng đề nghị Mỹ mở cửa hơn nữa với nông sản Việt Nam - 1" src="https://icdn.dantri.com.vn/thumb_w/680/2023/04/19/thu-tuong-1681912396056.jpeg" alt="Thủ tướng đề nghị Mỹ mở cửa hơn nữa với nông sản Việt Nam - 1" data-width="2000" data-height="1500" data-original="https://icdn.dantri.com.vn/2023/04/19/thu-tuong-1681912396056.jpeg" data-photo-id="2431107" data-track-content="" data-content-name="article-content-image" data-content-piece="article-content-image_2431107" data-content-target="/xa-hoi/thu-tuong-de-nghi-my-mo-cua-hon-nua-voi-nong-san-viet-nam-20230419205733008.htm" data-src="https://icdn.dantri.com.vn/thumb_w/680/2023/04/19/thu-tuong-1681912396056.jpeg" data-srcset="https://icdn.dantri.com.vn/thumb_w/680/2023/04/19/thu-tuong-1681912396056.jpeg 1x, https://icdn.dantri.com.vn/thumb_w/1020/2023/04/19/thu-tuong-1681912396056.jpeg 1.5x, https://icdn.dantri.com.vn/thumb_w/1360/2023/04/19/thu-tuong-1681912396056.jpeg 2x" data-ll-status="loaded" class="entered loaded" srcset="https://icdn.dantri.com.vn/thumb_w/680/2023/04/19/thu-tuong-1681912396056.jpeg 1x, https://icdn.dantri.com.vn/thumb_w/1020/2023/04/19/thu-tuong-1681912396056.jpeg 1.5x, https://icdn.dantri.com.vn/thumb_w/1360/2023/04/19/thu-tuong-1681912396056.jpeg 2x"><figcaption><p>Thủ tướng Phạm Minh Chính tiếp Bộ trưởng Nông nghiệp Hoa Kỳ Thomas Vilsack (Ảnh: VGP/Nhật Bắc).</p></figcaption></figure><p>Năm 2022, kim ngạch xuất nhập khẩu sản phẩm nông nghiệp hai nước đạt 15,36 tỷ USD, trong đó Việt Nam xuất khẩu sang Mỹ 13 tỷ USD, Mỹ xuất khẩu sang Việt Nam 2,36 tỷ USD.</p><p>Nhấn mạnh nông nghiệp là một trong những lĩnh vực hợp tác quan trọng giữa hai nước, Thủ tướng Phạm Minh Chính đề nghị phía Mỹ hỗ trợ trong quá trình Việt Nam thúc đẩy ngành nông nghiệp phát triển nhanh, bền vững, xây dựng nông nghiệp sinh thái, nông thôn hiện đại, nông dân văn minh.</p><p>Bộ Nông nghiệp hai nước tăng cường hợp tác để đa dạng hóa sản phẩm và chuỗi cung ứng, Mỹ mở cửa thị trường hơn nữa cho các sản phẩm nông sản của Việt Nam và hoàn tất thủ tục mở cửa thị trường cho nông sản của Việt Nam như dừa, chanh leo… là những đề nghị thiết thực được người đứng đầu Chính phủ Việt Nam đề cập trong cuộc gặp.</p>
            <p>Thủ tướng cũng mong muốn Mỹ hỗ trợ thiết lập cơ sở chiếu xạ ở miền Bắc của Việt Nam để tạo điều kiện xuất khẩu quả vải, xoài, bưởi và thanh long; hạn chế sử dụng công cụ, hàng rào kỹ thuật không cần thiết trong thương mại nông sản với Việt Nam.</p>
            <p>Đồng thời, hỗ trợ Việt Nam quy hoạch, xây dựng vùng nguyên liệu và đáp ứng các tiêu chuẩn của Mỹ về an toàn, vệ sinh nông sản; khuyến khích, thúc đẩy doanh nghiệp Mỹ đầu tư mạnh mẽ, đa dạng hơn nữa vào ngành nông nghiệp tại Việt Nam.</p>
            <figure class="image align-center" contenteditable="false">
                <img style="width: 80%;" title="Thủ tướng đề nghị Mỹ mở cửa hơn nữa với nông sản Việt Nam - 2" src="https://icdn.dantri.com.vn/thumb_w/1020/2023/04/19/img8324-16819057031771196709141-1681912444965.jpeg" alt="Thủ tướng đề nghị Mỹ mở cửa hơn nữa với nông sản Việt Nam - 2" data-width="2000" data-height="1334" data-original="https://icdn.dantri.com.vn/2023/04/19/img8324-16819057031771196709141-1681912444965.jpeg" data-photo-id="2431111" data-track-content="" data-content-name="article-content-image" data-content-piece="article-content-image_2431111" data-content-target="/xa-hoi/thu-tuong-de-nghi-my-mo-cua-hon-nua-voi-nong-san-viet-nam-20230419205733008.htm" data-src="https://icdn.dantri.com.vn/thumb_w/680/2023/04/19/img8324-16819057031771196709141-1681912444965.jpeg" data-srcset="https://icdn.dantri.com.vn/thumb_w/680/2023/04/19/img8324-16819057031771196709141-1681912444965.jpeg 1x, https://icdn.dantri.com.vn/thumb_w/1020/2023/04/19/img8324-16819057031771196709141-1681912444965.jpeg 1.5x, https://icdn.dantri.com.vn/thumb_w/1360/2023/04/19/img8324-16819057031771196709141-1681912444965.jpeg 2x">
                <figcaption>
                    <p>Thủ tướng khẳng định Việt Nam sẵn sàng mở cửa thị trường, tăng cường nhập khẩu một số nông sản của Mỹ (Ảnh: VGP/Nhật Bắc).</p>
                </figcaption>
            </figure>
            <p>Về phần mình, Thủ tướng khẳng định Việt Nam sẵn sàng mở cửa thị trường, tăng cường nhập khẩu một số nông sản của Mỹ.</p>
            <p>Thủ tướng cũng đề nghị Bộ Nông nghiệp Mỹ tăng cường hợp tác, hỗ trợ Việt Nam trong chuyển đổi xanh, thích ứng biến đổi khí hậu, chuyển giao công nghệ và chuyển đổi số nông nghiệp…</p>
            <p>Theo lãnh đạo Chính phủ Việt Nam, việc thúc đẩy hợp tác nông nghiệp hai nước sẽ góp phần giúp tiêu thụ nông sản, tạo việc làm, sinh kế cho người nông dân, nhất là ở các vùng sâu, vùng xa, vùng chịu ảnh hưởng nặng nề của hậu quả chiến tranh, và chịu tác động mạnh của biến đổi khí hậu, đặc biệt là khu vực ĐBSCL. &nbsp;</p>
            <p>Qua 3 lần đến Việt Nam, Bộ trưởng Nông nghiệp Mỹ chia sẻ ông đều chứng kiến sự phát triển mạnh mẽ của Việt Nam cũng như quan hệ hai nước.&nbsp;</p>
            <p>Ông Thomas Vilsack khẳng định Mỹ mong muốn tăng cường quan hệ song phương với Việt Nam, nhất là quan hệ thương mại hai nước. Theo ông, hai bên có thể tiếp tục hợp tác, tham khảo kinh nghiệm lẫn nhau trong phát triển nông nghiệp, nhất là nông nghiệp thông minh, ứng phó biến đổi khí hậu.</p>
            <p>Bộ trưởng Nông nghiệp Mỹ cho biết sẽ trao đổi, làm việc với cơ quan chức năng hai bên để thúc đẩy những lĩnh vực, nội dung hợp tác như Thủ tướng Phạm Minh Chính cho ý kiến, trong đó có việc thiết lập cơ sở chiếu xạ ở miền Bắc của Việt Nam. Theo ông, việc này sẽ góp phần hỗ trợ nông sản Việt Nam đáp ứng tốt nhất nhu cầu của thị trường Mỹ và các thị trường khác, mở rộng thị trường cho nông sản hai bên.</p>`,
        nLike: 1,
        nComment: 1,
        nView: 10,
        nViewWeek: 10,
        nViewMonth: 10,
        authorId: 3,
        editorId: 7,
        createdAt: "2023-05-21 06:49:41.344 +0700",
        approve: "2023-05-21 06:49:41.344 +0700",
        reviewComment: "Bài tốt. Chấp nhận đăng.",
      },
    ];
    data.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
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
