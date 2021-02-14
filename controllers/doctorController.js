const controllerFactory = require(`${__dirname}/controllerFactory`);
const Doctor = require(`${__dirname}/../models/doctorModel.js`);

exports.getAllDoctors = (req, res, next) => {
  controllerFactory.getAll(req, res, next, Doctor);
};
exports.createDoctor = (req, res, next) => {
  controllerFactory.createOne(req, res, next, Doctor);
};
exports.getDoctor = (req, res) => {
  controllerFactory.getOne(req, res, next, Doctor);
};
exports.updateDoctor = (req, res) => {
  controllerFactory.updateOne(req, res, next, Doctor);
};
exports.deleteDoctor = (req, res) => {
  controllerFactory.deleteOne(req, res, next, Doctor);
};
