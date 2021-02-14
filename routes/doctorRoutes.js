const express = require("express");
const { route } = require(`${__dirname}/../app`);
const doctorController = require(`${__dirname}/../controllers/doctorController`);

const router = express.Router();

router
  .route("/")
  .get(doctorController.getAllDoctors)
  .post(doctorController.createDoctor);

router
  .route("/:id")
  .get(doctorController.getDoctor)
  .put(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

module.exports = router;
