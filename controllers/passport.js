/*TODO: Quản lý các hàm xác thực người dùng*/
"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const models = require("../models");

// Hàm được gọi khi xác thực người dùng thành công
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Hàm được gọi bởi passport.session để lấy thông tin của user từ cơ sở dữ liệu và đưau vào
// req.user
passport.deserializeUser(async (id, done) => {
  try {
    let user = await models.User.findOne({
      attributes: ["id", "name", "email", "role", "slug", "avatar"],
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Hàm xác thực người dùng khi đăng nhập
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email", // Tên đăng nhập là email
      passwordField: "password",
      passReqToCallback: true, // Cho phép truyền req vào callback để lấy thông tin user đã đặp nhập chưa
    },
    async (req, email, password, done) => {
      if (email) {
        email = email.toLowerCase();
      }
      try {
        // Nếu chưa đăng nhập
        if (!req.user) {
          let user = await models.User.findOne({
            where: { email },
          });
          console.log("Get user");
          console.log(user);
          // User không tồn tại
          if (!user) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Email does not exist!")
            );
          }
          // Kiểm tra mật khẩu
          if (!bcrypt.compareSync(password, user.password)) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Invalid Password!")
            );
          }
          // Cho phép đăng nhập
          return done(null, user);
        }
        // Nếu đăng nhập rồi thì bỏ qua
        done(null, req.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Hàm đăng kí tài khoản
passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      if (email) {
        email = email.toLowerCase();
      }
      if (req.user) {
        return done(null, req.user);
      }
      try {
        let user = await models.User.findOne({ where: { email } });
        if (user) {
          return done(
            null,
            false,
            req.flash("registerMessage", "Email is already taken!")
          );
        }

        user = await models.User.create({
          email: email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
          name: req.body.name,
        });

        // Thông báo đk thành công
        done(
          null,
          false,
          req.flash(
            "registerMessage",
            "You have registered successfully. Please login!"
          )
        );
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
