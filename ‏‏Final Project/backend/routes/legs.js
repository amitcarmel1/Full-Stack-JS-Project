import express from 'express';
import { getLegs } from '../Controllers/flights.js';

const router = express.Router();

router.get('/', getLegs);

export default router;