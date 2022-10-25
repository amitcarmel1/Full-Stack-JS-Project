import { flights, flightLeg, getFlightsFromDB } from "../Simulator/logic.js";

export const getFlights = async (req, res) => {
    //res.send(flights);
    getFlightsFromDB().then(f => {
        console.log('flights', f); 
        res.send(f);
    })
    

}

export const getLegs = (req, res) => {
    res.send(flightLeg);
}

export const createflight = (req, res) => {
    const flight = req.body;
    flights.push({ ...flight, terminal: 1 });

    res.send('flight added to terminal');
}

export const getFlight = (req, res) => {
    const { id } = req.params;

    const foundFlight = flights.find((flight) => flight.number === id);
    res.send(foundFlight);
}

export const deleteFlight = (req, res) => {
    const { terminal } = req.params;

    flights = flights.filter((flight) => flight.terminal !== terminal);

    res.send('flight deleted from terminal');
}

export const updateFlight = (req, res) => {
    const { terminal } = req.params;
    const { number, passengers, brand, CurrentLeg, Landed, TookOf } = req.body;
    const flight = flights.find((flight) => flight.ternimal === terminal);

    if (number) flight.number = number;
    if (passengers) flight.passengers = passengers;
    if (brand) flight.brand = brand;
    if (CurrentLeg) flight.CurrentLeg = CurrentLeg;
    if (Landed) flight.Landed = Landed;
    if (TookOf) flight.TookOf = TookOf;

    res.send('flight updated in terminal');

}

