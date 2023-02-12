const express = require("express");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const authRouter = express.Router();
//Sign up
authRouter.post("/api/signup", async (req, res) => {
  console.log("Posted data")
  try {
    const salt = await bcryptjs.genSaltSync(10);

    const { name, email, password } = await req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists!" });
    }
    var hashedPassword = await bcryptjs.hash(password, 8);
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
authRouter.get("/api/", (req, res) => {
  res.sendFile(__dirname + "/try.htm", (err) => {
    if (err) res.json({ msg: err });
  });
});
module.exports = authRouter;
