/* const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); */

import validator from 'validator';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//Defines Doctor schema with fields and validators
const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email must be provided'],
    unique: true,
    validate: [validator.isEmail, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password must be provided'],
    minLength: [8, 'Password must have at least 8 characters!'],
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'Please enter the password confirmation'],
    validate: {
      validator: function () {
        return this.password == this.passwordConfirmation;
      },
      msg: 'Passwords did not match!',
      reason: 'Password did not match',
    },
  },
  name: {
    type: String,
    required: [true, 'Doctor must have a name'],
  },
  license: {
    type: String,
    required: [true, 'Doctor must provide a license number'],
  },
  birthdate: {
    type: Date,
  },
  phone: String,
  speciality: String,
});

/**
 * This query middleware will be triggered for saves on the DB
 * and will be in charge of encrypting the password before saving it
 */
doctorSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirmation = '';
  } catch (err) {
    next(err);
  }
});

//Apply the schema to create the Model
const Doctor = mongoose.model('doctor', doctorSchema);

//Exports the model
export default Doctor;
