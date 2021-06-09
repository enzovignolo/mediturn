const express = require('express');
const doctorControllers = require(`${__dirname}/../controllers/doctorControllers`);

const router = express.Router();

//Router to handle /doctors routes
router.route("/")
            .get(doctorControllers.getAllDoctors)
            .post(doctorControllers.addDoctor);

//Router to handle /doctors/:id routes

router.route("/:id")
            .get(doctorControllers.getDoctor)
            .put(doctorControllers.updateDoctor)
            .delete(doctorControllers.deleteDoctor);

module.exports = router ;