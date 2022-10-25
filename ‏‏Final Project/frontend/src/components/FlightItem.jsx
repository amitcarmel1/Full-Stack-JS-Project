import { Link } from 'react-router-dom';
import './FlightItem.css'
const flightLeg = {
    leg0:{title:"לפני כניסה למסלול", flightNumber:-1},
    leg1:{title:"גישה לנחיתה", flightNumber:-1},
    leg2:{title:"גישה לנחיתה", flightNumber:-1},
    leg3:{title:"גישה לנחיתה", flightNumber:-1},
    leg4:{title:"מסלול", flightNumber:-1},
    leg5:{title:"מסלול הסעה", flightNumber:-1},
    leg6:{title:"מסלול הסעה", flightNumber:-1},
    leg7:{title:"מסלול הסעה", flightNumber:-1},
    leg8:{title:"מסלול הסעה", flightNumber:-1},
    leg9:{title:"טיסה", flightNumber:-1},
}
const FlightItem = (props) => {
    //const flight = props.flight;
    const { flight } = props;
    return (
        <div className="FlightItem">
            <Link to={`/${flight.number}`} style={{width:'5vw'}}>
                <div>{flight.number}</div>
            </Link>
            <div  style={{width:'3vw'}}>{flight.passengers}</div>
            <div style={{width:'7vw'}}>{flight.currentLeg}</div>
            <div style={{width:'10vw'}}>{flightLeg[`leg${flight.currentLeg}`].title}</div>
            <div  style={{width:'25vw'}}>{flight.message}</div>
        </div>
    )
};

export default FlightItem;