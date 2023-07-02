import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import "./stylechart.css";

const data = [
    {nombre: 'María', kg: 80, Kcal: 1590},
    {nombre: 'Susana', kg: 65, Kcal: 1960},
    {nombre: 'Pedro', kg: 85, Kcal: 1698},
    {nombre: 'Felipe', kg: 72, Kcal: 1976},
    {nombre: 'Laura', kg: 76, Kcal: 1873},
    {nombre: 'Adrián', kg: 66, Kcal: 1978},
]

export const SimpleBarCharts = () => {
  return (
    <>
    <div className="chartbart">
    <ResponsiveContainer width="100%" aspect={2}>
        <BarChart 
            data={data}
            width={500}
            height={300}
            margin={{
                top:5,
                right:30,
                left:20,
                bottom:5
            }}
        >
        <CartesianGrid strokeDasharray="4 1 2" />    
        <XAxis dataKey="nombre"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="kg" fill="#6b48ff"/>
        <Bar dataKey="Kcal" fill="#1ee3cf"/>
        </BarChart>
    </ResponsiveContainer>
    </div>
    </>
    
  )
}

