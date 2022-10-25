
import {insertFlight, updateFlight, selectFlight} from '../database/flightsdb.js';

export const flights = [];
const airLines = ['El-Al', 'Arkia', 'al-Italia', 'air France'];
export const flightLeg = {
    leg0:{title:"לפני כניסה למסלול", flightNumber:-1, delay:2},
    leg1:{title:"גישה לנחיתה", flightNumber:-1, delay:2},
    leg2:{title:"גישה לנחיתה", flightNumber:-1, delay:2},
    leg3:{title:"גישה לנחיתה", flightNumber:-1, delay:2},
    leg4:{title:"מסלול המראה/נחיתה", flightNumber:-1, delay:1},
    leg5:{title:"מסלול הסעה", flightNumber:-1, delay:1},
    leg6:{title:"הורדה ואיסוף נוסעים", flightNumber:-1, delay:1},
    leg7:{title:"הורדה ואיסוף נוסעים", flightNumber:-1, delay:1},
    leg8:{title:"מסלול הסעה", flightNumber:-1, delay:1},
    leg9:{title:"טיסה", flightNumber:-1, delay:1},
}

var downloadTimer;
let count = 0;


const runInterval = () => {
    downloadTimer = setInterval( genarateFlight, 3000)
}

const handleFlightLeg = (flightIndex) =>{
    const currentLeg = flights[flightIndex].CurrentLeg;
    switch(currentLeg){
        case 0:
            if(flightLeg['leg1'].flightNumber == -1){
                flights[flightIndex].CurrentLeg = 1;
                flightLeg['leg1'].flightNumber =  flights[flightIndex].number;
            }else{
                flights[flightIndex].message = "leg1 was occupied by " +flightLeg['leg1'].flightNumber;
            }
            break;
        case 1:
            if(flightLeg['leg2'].flightNumber == -1){
                flights[flightIndex].CurrentLeg = 2;
                flightLeg['leg2'].flightNumber =  flights[flightIndex].number;
                flightLeg['leg1'].flightNumber = -1;
            }else{
                flights[flightIndex].message = "leg2 was occupied by " +flightLeg['leg2'].flightNumber;
            }
            break;
        case 2:
            if(flightLeg['leg3'].flightNumber == -1){
                flights[flightIndex].CurrentLeg = 3;
                flightLeg['leg3'].flightNumber =  flights[flightIndex].number;
                flightLeg['leg2'].flightNumber = -1;
            }else{
                flights[flightIndex].message = "leg3 was occupied by " +flightLeg['leg3'].flightNumber;
            }
            break;
        case 3:
            if(flightLeg['leg4'].flightNumber == -1){
                flights[flightIndex].CurrentLeg = 4;
                flightLeg['leg4'].flightNumber =  flights[flightIndex].number;
                flightLeg['leg3'].flightNumber = -1;
            }else{
                flights[flightIndex].message = "leg4 was occupied by " +flightLeg['leg4'].flightNumber;
            }
            break;
        case 4:
            if(flights[flightIndex].Landed === false){    // move to 5
                if(flightLeg['leg5'].flightNumber == -1){
                    flights[flightIndex].CurrentLeg = 5;
                    flights[flightIndex].Landed = true;
                    flightLeg['leg5'].flightNumber =  flights[flightIndex].number;
                    flightLeg['leg4'].flightNumber = -1;
                }else{
                    flights[flightIndex].message = "leg5 was occupied by " +flightLeg['leg5'].flightNumber;
                }
            }else{  // move to 9
                    flights[flightIndex].CurrentLeg = 9;
            }
            break;
        case 5:
            if(flightLeg['leg6'].flightNumber == -1){
                flights[flightIndex].CurrentLeg = 6;
                flightLeg['leg6'].flightNumber =  flights[flightIndex].number;
                flightLeg['leg5'].flightNumber = -1;
            }else if(flightLeg['leg7'].flightNumber == -1){
                flights[flightIndex].CurrentLeg = 7;
                flightLeg['leg7'].flightNumber =  flights[flightIndex].number;
                flightLeg['leg5'].flightNumber = -1;
            }else{
                flights[flightIndex].message = "leg6 was occupied by " +flightLeg['leg6'].flightNumber;
                flights[flightIndex].message += " leg7 was occupied by " +flightLeg['leg7'].flightNumber;
            }
            break;  
        case 6:
            if(flightLeg['leg8'].flightNumber == -1){
                flights[flightIndex].CurrentLeg = 8;
                flightLeg['leg8'].flightNumber =  flights[flightIndex].number;
                flightLeg['leg6'].flightNumber = -1;
            }else{
                flights[flightIndex].message = "in leg 6: leg8 was occupied by " +flightLeg['leg8'].flightNumber;
            }
            break;                      
        case 7:
            if(flightLeg['leg8'].flightNumber == -1){
                flights[flightIndex].CurrentLeg = 8;
                flightLeg['leg8'].flightNumber =  flights[flightIndex].number;
                flightLeg['leg7'].flightNumber = -1;
            }else{
                flights[flightIndex].message = "in leg 7: leg8 was occupied by " +flightLeg['leg8'].flightNumber;
            }
            break;                      
        case 8:
            if(flightLeg['leg4'].flightNumber == -1 || flightLeg['leg4'].flightNumber == flights[flightIndex].number){
                flights[flightIndex].CurrentLeg = 4;
                flightLeg['leg4'].flightNumber =  flights[flightIndex].number;
                flightLeg['leg8'].flightNumber = -1;
            }else{
                flights[flightIndex].message = "in leg 8: leg4 was occupied by " +flightLeg['leg4'].flightNumber;
            }
            break;
        case 9:
            flightLeg['leg4'].flightNumber = -1;
            flights[flightIndex].message = "";
            break;
        default:
            console.log('invalid leg for ', flights[flightIndex]);

    }

    if(currentLeg != flights[flightIndex].CurrentLeg){
        updateFlight(flights[flightIndex])
    }
}
const genarateFlight = () => {

    clearInterval(downloadTimer)
    let hasReadyFlights = false;
            
    for(let i = flights.length-1; i > -1; i--){
        handleFlightLeg(i)
        if(flights[i].CurrentLeg <9){
            hasReadyFlights = true;
        }
    }
    const airLineIndex = Math.floor((Math.random() * airLines.length))
    if(count < 100){
        const f = {
            number: (Math.random() * 90000 + 10000).toFixed(0),
            passengers: (Math.random() * 900 + 100).toFixed(0),
            brand: airLines[airLineIndex],
            CurrentLeg: 0,
            Landed: false,
            TookOf: false,
            message:""
        }    
        insertFlight(f);
        flights.push(f);
        count++;
    }
    if(hasReadyFlights === true || count < 100){
        runInterval();
    }
} 

genarateFlight();

export const getFlightsFromDB = async () => {
    const flights = await selectFlight();
    console.log('logic', flights);
    return flights;
}