import React from 'react'
import Example from './Chart'
import { useCityContext } from '../Context/WeatherContext';

function Section2() {
    const {data, getWeatherIcon} = useCityContext()

    const getDayName = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div className='w-full flex flex-col shadow-md rounded-lg border border-gray-300 p-4'>
            <p>Today</p>
            <Example />
            <div className='grid grid-cols-7 divide-x divide-gray-300 flex-1 mt-3'>
                {data?.forecast?.forecastday.map(day => (
                    <div key={day?.date} className='flex flex-col items-center justify-center px-2 h-full gap-4'>
                        <p>{getDayName(day.date)}</p>
                        {getWeatherIcon(day?.day?.condition?.text)}
                        <p className='font-semibold'>{`${day?.day?.avgtemp_c}°`}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Section2
