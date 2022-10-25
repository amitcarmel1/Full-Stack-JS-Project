import sqlite3 from "sqlite3";

const db = new sqlite3.Database('flightsdb', (err)=>{
    if(err){
        console.error('error connecting to db', err);
    }else{
        console.log('connected to db');
    }

});

const deleteFlights = () => {
    const sql = 'delete from flights';
    db.serialize(()=> {
        try{
            const statement = db.prepare(sql);
            statement.run()
            statement.finalize();
        }catch(err){
            console.log('error in deleteFlights', err.message)
        }
        
    })
}

deleteFlights()
const createTable = () => {
    console.log('5');
    const sql = `create table flights(
        number INTEGER, 
        passengers INTEGER,
        brand TEXT,
        currentLeg INTEGER,
        landed INTEGER,
        tookoff INTEGER
        )`
    db.serialize( () => {
        db.run(sql);
    })
}

//createTable();

export const insertFlight = (flight) => {
    console.log('4');
    const sql = `INSERT INTO flights VALUES (?,?,?,?,?,?)`;
    const landed = flight.landed == true ? 1 : 0;
    const tookoff = flight.tookoff == true ? 1 : 0;

    db.serialize(()=> {
        try{
            const statement = db.prepare(sql);
            statement.run(flight.number, flight.passengers, flight.brand, flight.CurrentLeg, landed, tookoff)
            statement.finalize();
        }catch(err){
            console.log('error in insert', err.message)
        }
        
    })

   
}
export const updateFlight = (flight) => {
    console.log('3');
    const sql = `UPDATE flights SET passengers = ?, brand = ?, currentLeg = ?, landed = ?, tookoff = ? WHERE number = ?`;
    const landed = flight.landed == true ? 1 : 0;
    const tookoff = flight.tookoff == true ? 1 : 0;
    db.serialize(()=> {
        const statement = db.prepare(sql);
        statement.run(flight.passengers, flight.brand, flight.CurrentLeg, landed, tookoff, flight.number)
        statement.finalize();
    })
}

export const selectFlightByLeg = (leg) => {
    const sql = `SELECT * FROM flights WHERE currentLeg = ?`;
    console.log('2');
    db.get(sql, [leg], (err, rows)=>{
        if(err){
            console.error('error in selectFlightByLeg', err);
            return []
        }else{
            return rows;
        }
    })
}
export const selectFlight = async () => {
    const sql = `SELECT * FROM flights`;
    console.log('1');
    try{
        return new Promise( (resolve, reject) => {
            db.all(sql, [], (err, rows)=>{
                if(err){
                    console.error('error in selectFlight', err);
                    resolve([])
                }else{
                    resolve( rows)
                }
            })
        })
         
        
    }
    catch(err){
        console.log('error in selectFlights', err.message);
    }
    
}

/*
            number: (Math.random() * 90000 + 10000).toFixed(0),
            passengers: (Math.random() * 900 + 100).toFixed(0),
            brand: airLines[airLineIndex],
            CurrentLeg: 0,
            Landed: false,
            TookOf: false,
            message:""
*/