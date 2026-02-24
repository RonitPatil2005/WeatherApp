import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState("");
    const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
    const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    let getCoordinates = async () => {
    let res = await fetch(
        `${GEO_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    let data = await res.json();
    return data[0]; // { lat, lon }
};

let getWeatherInfo = async () => {
    try {
        let location = await getCoordinates();

        if (!location) {
            throw new Error("Location not found");
        }

        let res = await fetch(
            `${WEATHER_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
        );

        let jsonResponse = await res.json();

        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description
        };
        return result;

    } catch (err) {
        throw err;
    }
};

let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        try {evt.preventDefault();
        console.log(city);
        setCity("");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
    }catch (err)  {
         setError("No such place found");
    }
        
    };
    
    return(
        <div className='SearchBox'>
            
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} sx={{width: 300 }}/>
                <br></br><br></br>
                <Button variant="contained" type='submit'>Search</Button>
                {error && <p style={{color:"red"}}>No such place found</p>}
            </form>
        </div>
    )
}      

