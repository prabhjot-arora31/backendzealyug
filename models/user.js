const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  nickname: {
    trim: true,
    required: false,
    type: String,
  },
  dob: {
    required: false,
    type: String,
  },
  email: {
    required: true,
    type: String,
    trim: true,
    // validate: {
    //   validator: (value) => {
    //     const re =
    //       /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    //     return value.match(re);
    //   },
    //   message: "Please enter the valid email address",
    // },
  },
  phone: {
    type: Number,
    required: false,
  },
  password: {
    required: true,
    type: String,
  },
  gender: {
    required: false,
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
