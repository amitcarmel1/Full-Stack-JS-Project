import express from 'express';

import { createflight, getFlights, getFlight, deleteFlight, updateFlight } from '../Controllers/flights.js';
const router = express.Router();



router.get('/',getFlights );
router.get('/:id',getFlight );

router.post('/',createflight);

router.get('/terminal',getFlight );

router.delete('/terminal',deleteFlight);

router.patch('/terminal',updateFlight);

export default router;