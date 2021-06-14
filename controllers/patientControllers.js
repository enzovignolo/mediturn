/* const Patient = require(`${__dirname}/../models/patientsModel.js`);
const controllersFactory = require(`${__dirname}/controllersFactory.js`); */

import Patient from './../models/patientsModel.js';
import controllersFactory from './controllersFactory.js';

const getAllPatients = (req, res, next) => {
  controllersFactory.getAll(req, res, next, Patient);
};

const addPatient = (req, res, next) => {
  controllersFactory.addOne(req, res, next, Patient);
};

const getPatient = (req, res, next) => {
  controllersFactory.getOneById(req, res, next, Patient);
};

const updatePatient = (req, res, next) => {
  controllersFactory.updateOneById(req, res, next, Patient);
};

const deletePatient = (req, res, next) => {
  controllersFactory.deleteOneById(req, res, next, Patient);
};

export default {
  getAllPatients,
  addPatient,
  getPatient,
  updatePatient,
  deletePatient,
};
