import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import FlightItem from "./FlightItem";
import './FlightList.css'


const FlightList = () => {
    const[flights, setFlights] = useState([]);
    const[timerId, setTimerId] = useState(0);

    const getFlights = async () => {
       const response = await fetch('http://127.0.0.1:3001/flights');
       const flightArray =await response.json();
       setFlights(flightArray);
    }

    useEffect( ()=>{
        
        let timerIdNum = window.setInterval( ()=>{
            getFlights();
        }, 2000)
        setTimerId(timerIdNum)
    }, [])

    return(
        <div>
            <div className="h"><p> total flights: {flights.length}</p></div>
            <div className="FlightList-columns">
                <div style={{width:'5vw'}}>Number</div>
                <div style={{width:'3vw'}}>Passengers</div>
                <div style={{width:'7vw'}}>Current Leg</div>
                <div style={{width:'10vw'}}>Leg</div>
                <div  style={{width:'25vw'}}>message</div>                
            </div>
            {flights.map( f => <FlightItem key={f.number} flight={f}/>)}
            <Outlet/>
        </div>
    )
}

export default FlightList;