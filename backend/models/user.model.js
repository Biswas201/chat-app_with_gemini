import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  // name: {
  //     type: String,
  //     required: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 characters"],
    maxLength: [50, "Email must be at most 50 characters"],
  },
  password: {
    type: String,
    select: false,
    // required: true,
  },
  // isAdmin: {
  //     type: Boolean,
  //     required: true,
  //     default: false,
  // },
});

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function () {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET);
}

const User = mongoose.model("User", userSchema);

export default User;