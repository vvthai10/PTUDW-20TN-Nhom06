"use strict";

const express = require("express");
const app = express();
const expressHandlebars = require("express-handlebars");
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
  })
);

// create table data
app.get("/createTables", (req, res) => {
  let models = require("./models");
  models.sequelize.sync().then(() => {
    res.send("Table created!");
  });
});

// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/:page", (req, res) => {
  res.render(req.params.page);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
