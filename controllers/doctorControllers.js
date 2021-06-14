/* const Doctor = require(`${__dirname}/../models/doctorsModel.js`);
const controllersFactory = require(`${__dirname}/controllersFactory`); */

import Doctor from './../models/doctorsModel.js';
import controllersFactory from './controllersFactory.js';

const getAllDoctors = (req, res, next) => {
  controllersFactory.getAll(req, res, next, Doctor);
};

const addDoctor = (req, res, next) => {
  controllersFactory.addOne(req, res, next, Doctor);
};

const getDoctor = (req, res, next) => {
  controllersFactory.getOneById(req, res, next, Doctor);
};

const updateDoctor = (req, res, next) => {
  controllersFactory.updateOneById(req, res, next, Doctor);
};

const deleteDoctor = (req, res, next) => {
  controllersFactory.deleteOneById(req, res, next, Doctor);
};

export default {
  getAllDoctors,
  addDoctor,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
