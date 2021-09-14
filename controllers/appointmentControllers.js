import controllersFactory from './controllersFactory.js';
import Appointment from '../models/appointmentsModel.js';
import Doctor from '../models/doctorsModel.js';
import Patient from '../models/patientsModel.js';
import ErrorCreator from '../utils/ErrorCreator.js';

const getAllAppointments = (req, res, next) => {
	controllersFactory.getAll(req, res, next, Appointment);
};

const addAppointment = async (req, res, next) => {
	try {
		//First we check if the doctor and patient exists in our DB
		console.log(req.body.doctor);
		if (req.body.doctor && !(await Doctor.findById(req.body.doctor))) {
			throw new ErrorCreator(404, 'There is no doctor with that id');
		}
		if (
			req.body.patient &&
			!(await Patient.findById(req.body.patient))
		) {
			throw new ErrorCreator(
				404,
				'There is no patient with that id'
			);
		}
		controllersFactory.addOne(req, res, next, Appointment);
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const getAppointment = (req, res, next) => {
	controllersFactory.getOneById(req, res, next, Appointment);
};

const updateAppointment = (req, res, next) => {
	controllersFactory.updateOneById(req, res, next, Appointment);
};

const deleteAppointment = (req, res, next) => {
	controllersFactory.deleteOneById(req, res, next, Appointment);
};

export default {
	getAllAppointments,
	addAppointment,
	getAppointment,
	updateAppointment,
	deleteAppointment,
};
