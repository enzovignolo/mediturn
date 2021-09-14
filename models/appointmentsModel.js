import mongoose from 'mongoose';
import ErrorCreator from '../utils/ErrorCreator.js';

const appointmentSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			enum: {
				values: ['free', 'reserved', 'cancelled'],
				message:
					'{VALUE} is not valid. Please use free,reserved or cancelled.',
			},
			required: [true, 'The appointment must have a status'],
		},
		date: {
			type: Date,
			required: ['Please specify a date for the appointment'],
			min: [Date.now(), "The date can't be lower than now"],
		},
		doctor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'doctor',
			required: [
				true,
				'Please specify the doctorsId to assign the appointment',
			],
		},
		patient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'patient',
		},
	},
	{ timestamps: true }
);

/**
 * This query middleware will check if the status of the appointment is free
 * and be sure to put a null value in the patient field
 */
appointmentSchema.pre('save', function (next) {
	/* if (this.status == 'free') {
		this.patient = null;
	} */
	if (this.status == 'reserved' && !this.patient) {
		const error = new ErrorCreator(
			400,
			'If status is reserved, patient field can not be null or empty'
		);
		next(error);
	} else if (this.status == 'free' && this.patient) {
		const error = new ErrorCreator(
			400,
			'If status is free, patient field must be null or empty'
		);
		next(error);
	}
	next();
});
appointmentSchema.pre('update', function (next) {
	/* if (this.status == 'free') {
		this.patient = null;
	} */
	if (this.status == 'reserved' && !this.patient) {
		const error = new ErrorCreator(
			400,
			'If status is reserved, patient field can not be null or empty'
		);
		next(error);
	} else if (this.status == 'free' && this.patient) {
		const error = new ErrorCreator(
			400,
			'If status is free, patient field must be null or empty'
		);
		next(error);
	}
	next();
});

appointmentSchema.pre(/^find/, function (next) {
	this.populate({ path: 'doctor', select: 'name' });
	this.populate({ path: 'patient', select: 'name' });
	next();
});

const Appointment = mongoose.model('appointment', appointmentSchema);

export default Appointment;
