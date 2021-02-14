const express = require("express");
const { route } = require(`${__dirname}/../app`);
const patientController = require("../controllers/patientController");
const router = express.Router();

router
  .route("/")
  .get(patientController.getAllPatients)
  .post(patientController.createPatient);
router
  .route("/:id")
  .get(patientController.getPatient)
  .put(patientController.updatePatient)
  .delete(patientController.deletePatient);
module.exports = router;
