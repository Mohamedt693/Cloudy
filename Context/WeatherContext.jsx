"use client";
import { createContext, useContext, useState, useEffect } from "react";
import debounce from "lodash.debounce";
const CityContext = createContext(undefined);
import { Sun, CloudRain, Wind, Cloud, CloudLightning, Snowflake, CloudFog  } from 'lucide-react';
import Image from "next/image";

export const CityProvider = ({ children }) => {
    const [city, setCity] = useState("");
    const [data, setData] = useState(null)

    const fetchWeather = async () => {
        if (!city) return;
        try {
            const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=f0e1bd4a499240aabd0144235253005&q=${city}&days=7&aqi=no&alerts=no`
            );
            if (!res.ok) throw new Error("Failed to fetch weather data");
            const data = await res.json();
            setData(data)
        } catch (error) {
            console.error(error.message);
        }
    };

    // Debounce function => fetch weather data after 1.5sec
    const debouncedFetchWeather = debounce(fetchWeather, 1500);
    useEffect(() => {
        debouncedFetchWeather();
        return () => {
            debouncedFetchWeather.cancel();
        };
    }, [debouncedFetchWeather]);

    // get Icon function
    const getWeatherIcon = (condition, props = {}) => {
        const c = condition?.toLowerCase();

        if (c.includes("sun") || c.includes("clear")) {
            return <Sun color="goldenrod" {...props} size={25} strokeWidth={1.5} />;
        }
        if (c.includes("cloud")) {
            return <Cloud color="gray" {...props} size={25} strokeWidth={1.5} />;
        }
        if (c.includes("rain") || c.includes("drizzle")) {
            return <CloudRain color="blue" {...props} size={25} strokeWidth={1.5} />;
        }
        if (c.includes("thunder")) {
            return <CloudLightning color="orange" {...props} size={25} strokeWidth={1.5} />;
        }
        if (c.includes("snow") || c.includes("sleet") || c.includes("blizzard")) {
            return <Snowflake color="skyblue" {...props} size={25} strokeWidth={1.5} />;
        }
        if (c.includes("fog") || c.includes("mist") || c.includes("haze")) {
            return <CloudFog color="lightgray" {...props} size={25} strokeWidth={1.5} />;
        }
        if (c.includes("wind")) {
            return <Wind color="teal" {...props} size={25} strokeWidth={1.5} />;
        }

        return <Sun color="goldenrod" {...props} size={25} strokeWidth={1.5} />;
    };

    // get Banner Image function
    const getWeatherImage = (condition) => {
        const c = condition?.toLowerCase();

        if (c.includes("sun") || c.includes("clear")) {
            return <Image src='/sunny.jpg' alt='' fill className='object-cover rounded-lg' priority/>
        }
        if (c.includes("cloud")) {
            return <Image src='/cloud.jpg' alt='' fill className='object-cover rounded-lg' priority/>
        }
        if (c.includes("rain") || c.includes("drizzle")) {
            return <Image src='/rain.jpg' alt='' fill className='object-cover rounded-lg' priority/>
        }
        if (c.includes("thunder")) {
            return <Image src='/cloud.jpg' alt='' fill className='object-cover rounded-lg' priority/>
        }
        if (c.includes("snow") || c.includes("sleet") || c.includes("blizzard")) {
            return <Image src='/snow.jpg' alt='' fill className='object-cover rounded-lg' priority/>
        }
        if (c.includes("fog") || c.includes("mist") || c.includes("haze")) {
            return <Image src='/cloud.jpg' alt='' fill className='object-cover rounded-lg' priority/>
        }
        if (c.includes("wind")) {
            return <Image src='/cloud.jpg' alt='' fill className='object-cover rounded-lg' priority/>
        }

        return <Image src='/cloud.jpg' alt='' fill className='object-cover rounded-lg' priority/>
    };

    return (
        <CityContext.Provider value={{ city , setCity, data, getWeatherIcon, getWeatherImage }} >
            {children}
        </CityContext.Provider>
    );
};


export const useCityContext = () => {
    const context = useContext(CityContext);
    if (!context) {
        throw new Error("useCityContext must be used within a CityProvider");
    }
    return context;
};