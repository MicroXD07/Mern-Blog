const Joi = require("joi");
const mongoose = require("mongoose");
// const jwt = require('jsonwebtoken');
// const config = require('config');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
    default: "blank-profile-picture-973460_960_720.wepb",
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now },
  cards: Array,
});

// userSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign(
//     {
//       _id: this._id,
//       username: this.name,
//       email: this.email,
//     },
//     config.get("jwtPrivateKey")
//   );
//   return token;
// };

const User = mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(user);
}

module.exports = mongoose.model("User", UserSchema);
exports.User = User;
exports.validate = validateUser;
