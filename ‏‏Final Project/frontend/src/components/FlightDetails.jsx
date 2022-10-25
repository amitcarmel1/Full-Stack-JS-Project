import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const FlightDetails = () => {
    const [flight, setFlight] = useState({});

    const params = useParams();

    const getFlight = async () => {
        const flightNum = params.id;
        const response = await fetch(`http://127.0.0.1:3001/flights/${flightNum}`);
        const flight = await response.json();
        setFlight(flight);
    }
    console.log(params);

    useEffect( ()=>{
        getFlight()
    }, [params.id])

    if(!flight.number)return<div>Loading... please wait</div>
    return(
        <div>
            <div>{flight.number}</div>
        </div>
    )
}

export default FlightDetails;