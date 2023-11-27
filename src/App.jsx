import { useState, useEffect } from 'react';

//allow users to enter longitude and latitude, and also auto-fill when clicking "near me" button
//when user clicks search, a list of closest pinball locations appear on the page

export default function App() {
  //latitude and longitudes are strings
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  //list of locations
  const [locations, setLocations] = useState([]);
  const [fetchLocation, setFetchLocation] = useState(false);


  useEffect(() => {
    const getLocation = async () => {
      if (fetchLocation && navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        } catch (error) {
          console.error('Error getting current location:', error.message);
        }
      }
    };

    getLocation();
  }, [fetchLocation]);

  const handleNearMe = () => {
    setFetchLocation(true);
  }

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${latitude}&lon=${longitude}`, {
        params: {
          longitude,
          latitude,
        }
      })

      console.log('API RESPONSE:', response);

      if (response && response.data) {
        setLocations([...locations, response.data]);
      } else {
        console.error('INVALID API RESPONSE:', response)
      }
    }
    catch (error) {
      console.error('Error fetching pinball locations', error)
    }
  }



  // const machines = async () => {
  //   await fetch(`https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${latitude}&lon=${longitude}`)
  //     .then(response => response.json())
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err))
  // }


  return (
    <div className="App">
      <label>
        <input type="text"
          placeholder={"Latitude"}
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)} />
      </label>
      <label>
        <input
          type="text"
          placeholder={"Longitude"}
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)} />
      </label>
      <br />
      <button onClick={handleNearMe}>Near me</button>
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Pinball locations</h2>
        <ul>
          {console.log('LOCATIONS: ', locations)}
          {locations.map((location) => (
            <li key={location.id}>{location.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}