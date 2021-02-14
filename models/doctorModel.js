const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function () {
        return validator.isEmail(this.email);
      },
      msg: "Please inser a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirmation: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return this.password == this.passwordConfirmation;
      },
      msg: "Passwords don't match",
    },
  },
  category: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
});

doctorSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirmation = "";
  next();
});

Doctor = new mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
