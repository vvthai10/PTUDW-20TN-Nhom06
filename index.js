"use strict";
require("dotenv").config();

const express = require("express");
const app = express();
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const redisStore = require("connect-redis").default;
const { createClient } = require("redis");
const redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);
const passport = require("./controllers/passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const {
  ifEquals,
  ifContains,
  formatTime,
  select,
  selectIn,
} = require("./controllers/handlebarsHelper");
const port = process.env.PORT || 5000;
const models = require("./models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const { createPagination } = require('express-handlebars-paginate');

// config public static
app.use(express.static(__dirname + "/public"));

// config express-handlebars
app.engine(
  "hbs",
  expressHandlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: "hbs",
    defaultLayout: "layout",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      ifEquals,
      ifContains,
      formatTime,
      select,
      selectIn,
      createPagination
    },
  })
);
app.set("view engine", "hbs");

// config get data from POST body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cấu hình sử dụng session
app.use(
  session({
    secret: "nhom06",
    store: new redisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 20 * 60 * 1000,
    },
  })
);

// Cấu hình sử dụng passport
app.use(passport.initialize());
app.use(passport.session());

// Cấu hình sử dụng connect-flash
app.use(flash());

// Lấy các thông tin cần khởi tạo/lấy ban đầu
app.use(async (req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated();
  if (res.locals.isLoggedIn) {
    res.locals.userInfo = req.user.dataValues;
    res.locals.userInfo.avatar = res.locals.userInfo.avatar.includes("http")
      ? res.locals.userInfo.avatar
      : `/assets/images/${res.locals.userInfo.avatar}`;

    console.log(res.locals.userInfo);

    // Kiểm tra thời hạn expiredAt premium của user
    const currentTime = new Date();
    let expiredAt = res.locals.userInfo.expiredAt;
    if (
      expiredAt != null &&
      res.locals.userInfo.role != "admin" &&
      res.locals.userInfo.role != "writer" &&
      res.locals.userInfo.role != "editor"
    ) {
      const remainingTime = expiredAt - currentTime;

      if (remainingTime < 0) {
        res.locals.userInfo.role = "default";
        await models.User.update(
          {
            role: "default",
            expiredAt: null,
          },
          { where: { id: res.locals.userInfo.id } }
        );
      } else {
        const totalDaysRemaining = Math.ceil(
          remainingTime / (1000 * 60 * 60 * 24)
        );
        const days = Math.floor(totalDaysRemaining);
        res.locals.days = days;
        if (days < 7) {
          res.locals.notePremium = true;
          console.log("Xử lý thông báo cho user thời hạn premium sắp hết");
        }
        if (res.locals.userInfo.role == "default") {
          res.locals.userInfo.role = "premium";
          await models.User.update(
            {
              role: "premium",
            },
            { where: { id: res.locals.userInfo.id } }
          );
        }
      }
    }

    // Check điều kiện về thời gian premium
    // Lấy tất cả lần đăng kí mà còn expired >= thời gian hiện tại
    // Nếu lỡ như nó chưa cập nhật thành premium thì cập nhật lại
    // if (
    //   res.locals.userInfo.role == "default" &&
    //   res.locals.userInfo.expiredAt != null
    // ) {
    //   res.locals.userInfo.role = "premium";

    //   // cập nhật trong db
    //   await models.User.update(
    //     {
    //       role: "premium",
    //     },
    //     { where: { id: res.locals.userInfo.id } }
    //   );
    // }

    // const totalDaysRemaining = Math.ceil(
    //   totalRemainingTime / (1000 * 60 * 60 * 24)
    // );

    // const days = Math.floor(totalDaysRemaining) + 1;
    // res.locals.days = days;
    // if (days < 7) {
    //   res.locals.notePremium = true;
    //   console.log("Xử lý thông báo cho user thời hạn premium sắp hết");
    // }
    // // Nếu user đã hết premium  và role vẫn là premium thì cập nhật lại cho nó thành default
    // else if (res.locals.userInfo.role == "premium") {
    //   res.locals.userInfo.role = "default";

    //   // cập nhật trong db
    //   await models.User.update(
    //     {
    //       role: "default",
    //     },
    //     { where: { id: res.locals.userInfo.id } }
    //   );
    // }
  }

  // console.log(res.locals.userInfo);
  next();
});

app.get("/createTables", (req, res) => {
  let models = require("./models");
  models.sequelize.sync().then(() => {
    res.send("Table created!");
  });
});

app.use("/admin", require("./routes/adminRouter"));
app.use("/editor", require("./routes/editorRouter"));
app.use("/writer", require("./routes/writerRouter"));
// app.use("/articles", require("./routes/articlesRouter"));
app.use("/", require("./routes/indexRouter"));
app.use("/users", require("./routes/authRouter"));
app.use("/users", require("./routes/usersRouter"));
app.use("/premium", require("./routes/premiumRouter"));

app.use((req, res, next) => {
  res.status(404).render("error", { message: "File not Found!" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("error", { message: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
