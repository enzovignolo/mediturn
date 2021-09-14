/* const express = require('express');
const authControllers = require(`${__dirname}/../controllers/authControllers`); */

import { Router } from 'express';
import authControllers from './../controllers/authControllers.js';
//Create router object
const router = Router();

router.post('/login', authControllers.login);

router.post(
	'/signUp/:userRole',
	authControllers.signUp,
	authControllers.login
);

export default router;
