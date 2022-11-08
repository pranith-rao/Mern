var express = require("express");
var dotenv = require("dotenv");
require("./db/conn");

var app = express();
app.use(express.json());
app.use(require("./routes/route"));

dotenv.config({
  path: "./config.env",
});

middleware = (req, res, next) => {
  console.log("hai from middleware");
  next();
};

app.listen(process.env.PORT, () => {
  console.log("Server started....");
});
