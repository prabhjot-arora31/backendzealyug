const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const authRouter = require("./routes/auth");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("", authRouter);
const DB =
  "mongodb+srv://Prabhjot:qwert993112@cluster0.bt0aqbr.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on the port ${PORT}`);
});
