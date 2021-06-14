/* const bcrypt = require('bcrypt');
const path = require('path');
const Doctor = require(`${__dirname}/../models/doctorsModel.js`);
const ErrorCreator = require(`${__dirname}/../utils/ErrorCreator`); */

import bcrypt from 'bcrypt';
import Doctor from './../models/doctorsModel.js';
import ErrorCreator from './../utils/ErrorCreator.js';

const login = async (req, res, next) => {
  try {
    if (
      !req.body.userType ||
      !['doctor', 'patient'].includes(req.body.userType)
    )
      throw new ErrorCreator(400, 'userType must be doctor or patient');
    const Model = req.body.userType == 'patient' ? null : Doctor;
    const user = await Model.findOne({ email: req.body.email });
    if (!user)
      throw new ErrorCreator(
        400,
        `There is no ${req.body.userType} with that email`
      );
    await bcrypt.compare(req.body.password, user.password);
    res.status(200).json('logged!');
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default { login };
