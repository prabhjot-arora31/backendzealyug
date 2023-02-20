const express = require("express");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
var hashedPassword;
//Sign up
authRouter.post("/api/signup", async (req, res) => {
  console.log("Posted data");
  try {
    const salt = await bcryptjs.genSaltSync(10);

    const { name, email, password } = await req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists!" });
    }
    hashedPassword = await bcryptjs.hash(password, 8);
    let user = new User({
      // name: name,
      // email: email,
      // password: hashedPassword,
      name,
      email,
      password: hashedPassword,
    });
    user = await user.save();
    // res.json(user);
    res.json({ msg: "Sign Up Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//------------------------------------------------------
authRouter.post("/api/login", (req, res) => {
  console.log("api/login endpoint hitted!");
  User.findOne({ email: req.body.email }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result === null || result === "") {
      return res.status(403).json("Email incorrect");
    }
    // console.log(result.password);
    // console.log(req.body.password);
    // if (result.password === req.body.password) {
    //   // here we implement the JWT token functionality
    //   // let token = jwt.sign({ email: req.body.email }, config.key, {});
    // let token = jwt.sign({ email: req.body.email }, "kuchbhi", {});

    // res.status(200).json({
    //   token: token,
    //   msg: "success",
    // });
    // }
    bcrypt.compare(req.body.password, result.password, function (err, res1) {
      if (err) {
        // handle error
        res.send({ Errormsg: err });
      }
      if (res1) {
        // Send JWT
        let token = jwt.sign({ email: req.body.email }, "kuchbhi", {});

        res.status(200).json({
          token: token,
          msg: "success",
        });
      } else {
        // response is OutgoingMessage object that server response http request
        return res.json({
          success: false,
          message: "passwords do not match",
        });
      }
    });
    //  else {
    //   res.status(403).json("password is incorrect");
    // }
  });
});
//---------------------------------------------------------
authRouter.get("/api/", (req, res) => {
  res.sendFile(__dirname + "/try.htm", (err) => {
    if (err) res.json({ msg: err });
  });
});
// -------------------------------------------------------
authRouter.get("/api/loginPage", (req, res) => {
  res.sendFile(__dirname + "/login.html", (err) => {
    if (err) res.json({ msg: err });
  });
});
// -------------------------------------------------------
module.exports = authRouter;
