import React from 'react'
import { useCityContext } from '../Context/WeatherContext'
import Clock from './Date'
import Image from 'next/image'
import LoadingSpinner from "./Spinner"


function Banner() {
    const {data, getWeatherIcon, getWeatherImage} = useCityContext()
    return (
    <div className='relative w-full h-[200px] md:h-[280px] mt-4'>
        {data?.current?.condition?.text != null
        ?getWeatherImage(data?.current?.condition?.text ?? "clear")
        : <Image src='/cloud.jpg' alt='' fill className='object-cover rounded-lg' priority/>
        }
        <div className='absolute bottom-0 flex items-end justify-between w-full px-8 py-6 text-white'>
            <div>
                {data?.current?.condition?.text != null
                ? getWeatherIcon(data?.current?.condition?.text ?? "clear", { fill: "white", color: "white" })
                : <LoadingSpinner />
                }
                {data?.current?.temp_c != null
                ? <h1 className='text-7xl'>{`${data.current.temp_c}°`}</h1>
                : <LoadingSpinner />
                }
                {data?.location?.name != null 
                ? <h2 className='text-xl'>{`${data.location.name} ${data.location.country}`}</h2>
                : <LoadingSpinner />
                }
            </div>
            <div className='text-end md:text-end w-full md:w-auto mt-4 md:mt-0'>
                <Clock />
            </div>
        </div>
    </div>
    )
}

export default Banner
