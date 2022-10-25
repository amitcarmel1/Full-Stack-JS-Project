//import simulator from "./simulator.js";
import express  from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import flightsRoutes from './routes/flights.js';
import legsRoutes from './routes/legs.js'

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors())

app.use('/flights', flightsRoutes);
app.use('/leg', legsRoutes);

app.get("/",(req,res) => res.send('hello from HomePage.'));

app.listen(PORT, ()=> console.log(`server running on port: http://localhost:${PORT}`));