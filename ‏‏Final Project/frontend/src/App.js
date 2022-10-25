import logo from './logo.svg';
import './App.css';
import FlightList from './components/FlightList';
import { Route, Routes } from 'react-router-dom';
import FlightDetails from './components/FlightDetails';
import FlightLegs from './components/FlightLegs';
import imageSimulator from './image/image.png';
 

function App() {
  return (
    <div className="App">
      <h2>FLIGHT SIMULATOR</h2>
       <img className='image' src= {imageSimulator} alt=''/>
      <FlightLegs />
      <Routes>
        <Route path='/*' element={<FlightList/>}>
          <Route path=':id' element={<FlightDetails/>}/>
        </Route>
      </Routes>
      
        </div>
  );
}

export default App;
