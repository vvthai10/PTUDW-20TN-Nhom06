"use strict";
require("dotenv").config();

const express = require("express");
const app = express();
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const redisStore = require("connect-redis").default;
const { createClient } = require("redis");
const redisClient = createClient({
  url: "rediss://red-chu6hp5269vccp2pogt0:FYWZoKcd0Dyol1iqAzNqIohic1r9nTpD@oregon-redis.render.com:6379",
});
redisClient.connect().catch(console.error);
const passport = require("./controllers/passport");
const flash = require("connect-flash");
const { ifEquals, formatTime } = require("./controllers/handlebarsHelper");
const port = process.env.PORT || 5000;

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
      ifEquals, formatTime,
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
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated();
  if (res.locals.isLoggedIn) {
    res.locals.userInfo = req.user.dataValues;
  }
  // console.log(res.locals.userInfo);
  next();
});

app.use("/admin", require("./routes/adminRouter"));
app.use("/editor", require("./routes/editorRouter"));
app.use("/writer", require("./routes/writerRouter"));
app.use("/", require("./routes/indexRouter"));
app.use("/users", require("./routes/authRouter"));
app.use("/users", require("./routes/usersRouter"));

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
