import Button from "./components/MyButton";
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locations, setLocations] = useState([]);

  // fetch('https://pinballmap.com/api/v1/machines.json')
  //   .then(response => response.json())
  //   .then(console.log("ALL MACHINES", json()))

  const handleNearMeClick = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setLatitude(position.coords.latitude.toFixed(6));
      setLongitude(position.coords.longitude.toFixed(6));
    } catch (error) {
      console.error('Error getting current location:', error);

      if (error.code === error.PERMISSION_DENIED) {
        //in case user denied the geolocation request
        alert('Please allow the browser to access your location for this feature.')
      }
    }
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(`https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${latitude}&lon=${longitude}`);


      console.log("RESPONSE", response)
      const data = response.data;

      // console.log(data);


      setLocations(data);
    } catch (error) {
      console.error('Error fetchinig pinball locations:', error);
    }
  }
  return (
    <div className="App">
      <label>
        Latitude:
        <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      </label>
      <label>
        Longitude:
        <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      </label>
      <Button onClick={handleNearMeClick} text={"Near me"} />
      <Button onClick={handleSearchClick} text={"Search"} />

      <div>
        <h2>Pinball Locations</h2>
        <ul>
          {locations.map((location) => (
            <li key={location.id}>{location.name}</li>

          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
