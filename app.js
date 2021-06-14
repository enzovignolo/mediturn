/* const express = require('express');
const errorHandler = require(`${__dirname}/controllers/errorHandler`);
const doctorRoutes = require(`${__dirname}/routes/doctorRoutes`);
const patientRoutes = require(`${__dirname}/routes/patientRoutes`);
const authRoutes = require(`${__dirname}/routes/authRoutes`);
 */
import express from 'express';
import errorHandler from './controllers/errorHandler.js';
import doctorRoutes from './routes/doctorRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
//Middlewares
app.use(express.json());

//Routes
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/patients', patientRoutes);

app.use('/api/v1', authRoutes);

/**
 * ERROR HANDLER
 */
app.use((err, req, res, next) => errorHandler(err, req, res, next));

export default app;
