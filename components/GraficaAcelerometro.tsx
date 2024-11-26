'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface Accelerometer {
  id: number;
  x_axis: number;
  y_axis: number;
  z_axis: number;
  fecha: string;
}

const GraficaAcelerometro = () => {
  const [data, setData] = useState<Accelerometer[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/accelerometer");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching accelerometer data:", error);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-lg font-semibold mb-4">Acelerómetro</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="x_axis" stroke="#FF0000" name="Eje X" />
          <Line type="monotone" dataKey="y_axis" stroke="#00FF00" name="Eje Y" />
          <Line type="monotone" dataKey="z_axis" stroke="#0000FF" name="Eje Z" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficaAcelerometro;
