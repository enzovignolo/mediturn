import { Router } from 'express';
import patientControllers from './../controllers/patientControllers.js';

const router = Router();

router
  .route('/')
  .get(patientControllers.getAllPatients)
  .post(patientControllers.addPatient);

router
  .route('/:id')
  .get(patientControllers.getPatient)
  .put(patientControllers.updatePatient)
  .delete(patientControllers.deletePatient);

export default router;
