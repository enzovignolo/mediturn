const express = require('express');
const authControllers = require(`${__dirname}/../controllers/authControllers`);

//Create router object
const router = express.Router();

router.post('/login', authControllers.login);

module.exports = router;
