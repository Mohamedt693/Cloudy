"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { useCityContext } from "../Context/WeatherContext";

const LocationComponent = () => {
    const { setCity } = useCityContext();
    const [error, setError] = useState(null);


  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setError(null);
        fetchWeather(lat, lon); 
      },
      (err) => {
        setError("Unable to retrieve location.");
        console.error(err);
      }
    );
  };
  

    const fetchWeather = async (latitude, longitude) => {
        try {
            const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=f0e1bd4a499240aabd0144235253005&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`
            );
            if (!res.ok) throw new Error("Failed to fetch weather data");
            const data = await res.json();
            setCity(data?.location?.name);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError("Failed to fetch weather data.");
        }
    };



    return (
        <MapPin 
        onClick={getLocation}
        strokeWidth={1.5} 
        className="size-7 absolute -left-10 sm:top-3 md:top-1 cursor-pointer"
        />
    );
};

export default LocationComponent;




