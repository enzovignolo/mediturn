const Patient = require(`${__dirname}/../models/patientModel`);
const { ErrorCreator } = require(`${__dirname}/../utils/errorHandler.js`);
const controllerFactory = require(`${__dirname}/controllerFactory`);

//Here are defined CRUD operations for patient.
exports.getAllPatients = (req, res, next) => {
  controllerFactory.getAll(req, res, next, Patient);
};
exports.createPatient = (req, res, next) => {
  console.log("jejfjf");
  controllerFactory.createOne(req, res, next, Patient);
};

exports.getPatient = (req, res, next) => {
  controllerFactory.getOne(req, res, next, Patient);
};

exports.updatePatient = (req, res, next) => {
  controllerFactory.updateOne(req, res, next, Patient);
};

exports.deletePatient = (req, res, next) => {
  controllerFactory.deleteOne(req, res, next, Patient);
};
