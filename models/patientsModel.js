/* const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); */

import validator from 'validator';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const patientSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'An email must be provided for the user'],
    validate: [validator.isEmail, 'Plese input a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password must be 8 characters long at least'],
  },
  passwordConfirmation: {
    type: String,
    validate: {
      validator: function () {
        return this.password == this.passwordConfirmation;
      },
      msg: "Passwords don't match",
    },
  },
  height: Number,
  weight: Number,
  clinicStory: String,
});

patientSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirmation = '';
  } catch (err) {
    next(err);
  }
});

const Patient = mongoose.model('patient', patientSchema);

export default Patient;
