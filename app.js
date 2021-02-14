const express = require("express");
const dotenv = require("dotenv");
const patientRouter = require(`${__dirname}/routes/patientRoutes`);
const doctorRouter = require(`${__dirname}/routes/doctorRoutes.js`);
const { errorHandler } = require(`${__dirname}/utils/errorHandler`);
dotenv.config();

const app = express();
app.use(express.json());
app.use("/v1/patient", patientRouter);
app.use("/v1/doctor", doctorRouter);

app.use((err, req, res, next) => {
  errorHandler(err, res);
});
module.exports = app;
