import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { useCityContext } from '../Context/WeatherContext';


const Example = () => {
  const {data} = useCityContext()

  const hourlyData = data?.forecast?.forecastday?.[0]?.hour?.map((hour) => ({
    time: hour.time.split(' ')[1].slice(0, 5), 
    temp_c: hour.temp_c,
  })) || [];

  return (
    <ResponsiveContainer width="100%" height={140}>
      <AreaChart
        data={hourlyData}
        margin={{ top: 10, right: 20, left: 25, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#333' }}
        />

        <Area
          type="monotone"
          dataKey="temp_c"
          stroke="#8884d8"              
          strokeWidth={2}
          fill="url(#colorPv)"       
          fillOpacity={1}
          label={({ x, y, value }) => (
            <text
              x={x}
              y={y - 10}
              fill="#8884d8"
              fontSize={12}
              textAnchor="middle"
            >
              {value}
            </text>
          )}
        />
        <Tooltip 
          cursor={{ stroke: '#8884d8', strokeWidth: 1, opacity: 0.2 }} 
          contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: 8, padding: '8px' }}
          labelStyle={{ color: '#8884d8', fontWeight: 'bold' }}
          formatter={(value, name) => [`${value}°C`, 'Temperature']}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Example;
