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

app.use("/", require("./routes/indexRouter"));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
