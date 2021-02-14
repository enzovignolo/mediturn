const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

//Define the patient schema

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    lower: true,
    required: true,
    unique: true,
    validate: {
      validator: function () {
        return validator.isEmail(this.email);
      },
      msg: "Please provide a valid email address",
    },
  },
  password: { type: String, required: true, minlength: 8 },
  passwordConfirmation: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return this.password == this.passwordConfirmation;
      },
      msg: "Password doesn't match with confirmation",
    },
  },
  birthdate: { type: Date, required: true },
  phone: { type: String, required: true },
});

// Encrypt password before save
patientSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirmation = "";
  next();
});

// Apply schema to model
Patient = mongoose.model("Patient", patientSchema);

// Export the model
module.exports = Patient;
