import { Router } from 'express';

import appointmentControllers from '../controllers/appointmentControllers.js';

const router = Router();

router
	.route('/:id')
	.get(appointmentControllers.getAppointment)
	.put(appointmentControllers.updateAppointment)
	.delete(appointmentControllers.deleteAppointment);

router
	.route('/')
	.get(appointmentControllers.getAllAppointments)
	.post(appointmentControllers.addAppointment);

export default router;
