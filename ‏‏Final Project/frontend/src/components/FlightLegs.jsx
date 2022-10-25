import { useState, useEffect } from "react";
import './FlightLegs.css'
// import Table from 'react-bootstrap/Table';


const FlightLegs = () => {
    const [legs, setLegs] = useState({});
    const [timerId, setTimerId] = useState(0);

    const getFlightLegs = async () => {
        const response = await fetch('http://127.0.0.1:3001/leg');
        const flightArray = await response.json();
        setLegs(flightArray);
    }

    useEffect(() => {
        let timerIdNum = window.setInterval(() => {
            getFlightLegs();
        }, 2000)
        setTimerId(timerIdNum)

    }, [])

    return (
        <div >
            <h3>Flight Legs</h3>

            <div className="legs">
                <table>
                    <thead>
                        <tr>
                            <th>Leg</th>
                            <th>title</th>
                            <th>flight number</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(legs).map( k => <tr key={k}><td>{k}</td><td>{legs[k].title}</td><td>  flight:{legs[k].flightNumber}</td></tr>)}
                    </tbody>
                </table>
                {/* {Object.keys(legs).map( k => <div key={k}>{k}: {legs[k].title}  flight:{legs[k].flightNumber} </div>)}     */}
            </div>

        </div>
    )
}

export default FlightLegs;