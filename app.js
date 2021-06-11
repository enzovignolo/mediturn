const express = require('express');
const errorHandler = require(`${__dirname}/controllers/errorHandler`);
const doctorRoutes = require(`${__dirname}/routes/doctorRoutes`);
const authRoutes = require(`${__dirname}/routes/authRoutes`);
app = express();
//Middlewares
app.use(express.json());

//Routes
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1', authRoutes);

/**
 * ERROR HANDLER
 */
app.use((err, req, res, next) => errorHandler(err, req, res, next));
module.exports = app;
