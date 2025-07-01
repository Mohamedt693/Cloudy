import React from 'react'
import { Search } from 'lucide-react';
import { useCityContext } from '../Context/WeatherContext';
import LocationComponent from './Location';

function Navbar() {
    const {city, setCity} = useCityContext()

    return (
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-4'>
            <h1 className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-indigo-400 to-blue-700">Cloudy</h1>
            <div className='sm:w-8/12 md:w-4/12 flex items-center gap-2 relative mt-2 sm:mt-0'>
                <LocationComponent />

                <input 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text" 
                className="w-full px-4 py-3 text-base sm:py-2 sm:text-sm rounded-lg shadow-sm focus:outline-none"
                placeholder='Find City'
                />

                <Search 
                onClick={() => console.log('Search clicked for:', city)}
                strokeWidth={1.5} 
                className="size-6 absolute right-3 md:top-1 sm:top-3 cursor-pointer"
                />
            </div>
        </div>
    )
}

export default Navbar
