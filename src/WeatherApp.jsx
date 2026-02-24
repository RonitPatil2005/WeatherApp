import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelslike: 24.84,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        weather: "smoke",
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }
    return (
        <div className="app-wrapper">
            <h1>🌤 Weather app</h1>

            <div className="glass-card">
                <SearchBox updateInfo={updateInfo} />
            </div>

            <div className="glass-card">
                <InfoBox info={weatherInfo} />
            </div>
        </div>
    )
}