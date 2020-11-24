const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

//protocol://localhost//dbName
mongoose.connect("mongodb://localhost/portfolio", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

//MIDDLEWARES:
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  next();
});

//putting /api before api routes
app.use("/api", require("./routes/api"));

//error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(422).send({ error: err.message });
});

app.listen(1300, () => {
  console.log("listening: " + 1300);
});
