/* const express = require('express');
const authControllers = require(`${__dirname}/../controllers/authControllers`); */

import { Router } from 'express';
import authControllers from './../controllers/authControllers.js';
//Create router object
const router = Router();

router.post('/login', authControllers.login);

export default router;
