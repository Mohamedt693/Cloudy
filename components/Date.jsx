import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useCityContext } from "../Context/WeatherContext";


dayjs.extend(utc);
dayjs.extend(timezone);

function Clock() {
    const {data} = useCityContext()
    const [time, setTime] = useState("");
    const [day, setDay] = useState("");

    const tzId = data?.location?.tz_id;
    useEffect(() => {
        const updateTime = () => {
            if (!tzId) return;
            const now = dayjs().tz(tzId);
            setTime(now.format("h:mm a"));
            setDay(now.format("dddd"));  
        };

        updateTime(); 
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [tzId]);

    return (
        <div className="text-xl font-semibold leading-tight">
            {!data?.location?.tz_id ? (
                <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <>
                    <p className='text-2xl font-semibold'>{time}</p>
                    <p className='text-xl'>{day}</p>
                </>
            )}
        </div>
    );
}

export default Clock;