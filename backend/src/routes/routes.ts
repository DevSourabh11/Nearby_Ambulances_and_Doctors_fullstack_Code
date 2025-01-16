import express from 'express';
import { getAmbulances, createAmbulances, updateAmbulance, deleteAmbulance } from '../controller/ambulancesConroller';
import {getDoctors, createDoctors, updateDoctor, deleteDoctor } from '../controller/doctorsConroller';

const router = express.Router();

// Define the routes to to crud on ambulances record 
router.get('/getAmbulances', getAmbulances);
router.post('/createAmbulances', createAmbulances)
router.delete('/deleteAmbulance/:id', deleteAmbulance)
router.put('/updateAmbulance/:id', updateAmbulance)

// Define the routes to crud on doctors record
router.get('/getDoctors', getDoctors);
router.post('/createDoctors', createDoctors)
router.delete('/deleteDoctor/:id', deleteDoctor)
router.put('/updateDoctor/:id', updateDoctor)

export default router;
