import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./stylechart.css";
const data = [
  {
    nombre: 'Natalia',
    edad: 30,
    pesoA: 80,
    pesoI: 86,
  },
  {
    nombre: 'karla',
    edad: 45,
    pesoA: 98,
    pesoI: 100,
  },
  {
    nombre: 'Maria',
    edad: 35,
    pesoA: 79,
    pesoI: 83,
  },
  {
    nombre: 'Jared',
    edad: 29,
    pesoA: 100,
    pesoI: 115,
  },
    {
    nombre: 'Carlos',
    edad: 37,
    pesoA: 95,
    pesoI: 99,
  },
    {
    nombre: 'Marta',
    edad: 56,
    pesoA: 90,
    pesoI: 95,
  },
];
export const SimpleLineChart = () => {
    return (
      <>
    <div className="chartline" >
<ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="edad" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="pesoA" stroke="#82ca9d" />
          <Line type="monotone" dataKey="pesoI" stroke="#FF0000" />
        </LineChart>
      </ResponsiveContainer>
    </div>

</>
  );

}