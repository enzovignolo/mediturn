import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Doctor from './../models/doctorsModel.js';
import Patient from '../models/patientsModel.js';
import ErrorCreator from './../utils/ErrorCreator.js';

const login = async (req, res, next) => {
	try {
		//Check if the userType is corrrect
		if (
			!req.body.userType ||
			!['doctor', 'patient'].includes(req.body.userType)
		)
			throw new ErrorCreator(
				400,
				'userType must be doctor or patient'
			);
		//Choose a Model where it can fin the user info
		const Model = req.body.userType == 'patient' ? Patient : Doctor;
		const user = await Model.findOne({ email: req.body.email });

		if (!user)
			throw new ErrorCreator(
				400,
				`There is no ${req.body.userType} with that email`
			);
		//Compare passwords

		if (!(await bcrypt.compare(req.body.password, user.password))) {
			throw new ErrorCreator(401, `Wrong user or password`);
		}
		//Create signed token and sent it as response.

		const token = await jwt.sign(
			JSON.stringify(user),
			process.env.JWT_dev
		);
		//Send the token by cookie
		res.cookie('token', token, {
			//Stablish expiration for cookie at 1 day (sec min hours days 1000)
			maxAge: 60 * 60 * 24 * 1 * 1000,
		});
		res.status(200).json({ token });
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const isLogged = async (req, res, next) => {
	try {
		//If there is no token in the headers, denegate access
		if (!req.headers.authorization)
			throw new ErrorCreator(401, 'Missing token, please login.');
		//Isolate token from header that has the form Bearer <token>
		const token = req.headers.authorization.split(' ')[1];
		if (!(await jwt.verify(token, process.env.JWT_dev)))
			throw new ErrorCreator(
				401,
				'Wrong token information. Please login again!'
			);
		next();
	} catch (err) {
		next(err);
	}
};

const signUp = async (req, res, next) => {
	try {
		let user;
		if (req.params.userRole == 'doctor') {
			user = await Doctor.create(req.body);
		} else if (req.params.userRole == 'patient') {
			user = await Patient.create(req.body);
		} else {
			throw new ErrorCreator(404, 'This route does not exist');
		}
		if (!user)
			throw new ErrorCreator(
				500,
				'There was an error and user was not created'
			);

		req.body.userType = req.params.userRole;
		next();
	} catch (err) {
		next(err);
	}
};

export default { login, isLogged, signUp };
