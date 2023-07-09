const cron = require("node-cron");
const models = require("./../models");

async function updateData() {
  // Đoạn mã để cập nhật dữ liệu trong bảng của bạn ở đây
  // Ví dụ: kết nối CSDL, thực hiện truy vấn và cập nhật dữ liệu
  let articles = await models.Article.findAll({
    attributes: ["id", "nViewWeek", "weekTime"],
  });

  // Lấy ngày tiếp theo
  let currentDate = new Date();
  let nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

  // Đặt giờ, phút và giây thành 0
  nextDay.setHours(0, 0, 0, 0);

  articles.forEach(async (article) => {
    // Cập nhật giá trị nViewWeek = 0
    article.nViewWeek = 0;
    article.weekTime = nextDay;

    // Lưu lại các giá trị đã cập nhật vào cơ sở dữ liệu
    await article.save();
  });
  console.log("Cập nhật dữ liệu...");
}
// 0 0 * * 0
// */30 * * * * *
const cronJob = cron.schedule("0 0 * * 0", () => {
  updateData();
});

module.exports = cronJob;
