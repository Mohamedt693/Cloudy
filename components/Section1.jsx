import React from 'react'
import { Droplet, Sun, Sunrise, Sunset } from 'lucide-react';
import { useCityContext } from '../Context/WeatherContext';
import LoadingSpinner from './Spinner';

function Section1() {
    const {data} = useCityContext()
    return (
        <div className='w-full md:w-8/12 flex flex-col items-center justify-center gap-8'>
            <div className='w-full relative grid grid-cols-2 gap-8 py-6 px-4 shadow-md rounded-lg text-start border border-gray-300'>
                <div className='flex items-center justify-center gap-2'>
                    <Droplet color='blue' size={55} strokeWidth={1.5}/>
                    <div className='leading-7'>
                        <h2 className='font-semibold text-gray-500'>Humidity</h2>
                        {data?.current?.humidity != null
                        ? <p className='font-semibold'>{`${data.current.humidity}%`}</p>
                        : <LoadingSpinner color="blue-600" />
                        }
                    </div>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <Sunrise color='blue' size={55} strokeWidth={1.5}/>
                    <div className='leading-7'>
                        <h2 className='font-semibold text-gray-500'>Sun rise</h2>
                        {data?.forecast?.forecastday[0]?.astro.sunrise != null
                        ? <p className='font-semibold'>{data?.forecast?.forecastday[0]?.astro.sunrise}</p>
                        : <LoadingSpinner color="blue-600" />
                        }
                    </div>
                </div>
                <div className="absolute top-5 bottom-5 left-1/2 w-px bg-gray-300"></div>
                <div className='flex items-center justify-center gap-2'>
                    <Sun color='blue' size={55} strokeWidth={1.5}/>
                    <div className='leading-7'>
                        <h2 className='font-semibold text-gray-500'>UV index</h2>
                        {data?.current?.uv != null
                        ? <p className='font-semibold'>0 of 10</p>
                        : <LoadingSpinner color="blue-600" />
                        }
                        
                    </div>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <Sunset color='blue' size={55} strokeWidth={1.5}/>
                    <div className='leading-7'>
                        <h2 className='font-semibold text-gray-500'>Sun set</h2>
                        {data?.forecast?.forecastday[0]?.astro.sunset != null
                        ? <p className='font-semibold'>{data?.forecast?.forecastday[0]?.astro.sunset}</p>
                        : <LoadingSpinner color="blue-600" />
                        }
                    </div>
                </div>
            </div>
            <div className='w-full shadow-md rounded-lg p-4 leading-7 flex items-center justify-between 
            bg-gradient-to-l from-[#5b6bcf] to-[#8f9be9] text-white'>
                <div>
                    <h1>Monthly Railfull</h1>
                    <h1>45mm</h1>
                </div>
                <div className='text-end'>
                    <p>This year</p>
                    <p className='text-yellow-500'>+17%</p>
                </div>
            </div>
        </div>
    )
}

export default Section1
