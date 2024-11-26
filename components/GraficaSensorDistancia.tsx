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

interface Distancia {
  id: number;
  sensor_value: number;
  fecha: string;
}

const GraficaSensorDistancia = () => {
  const [data, setData] = useState<Distancia[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/sensor4");
        setData(response.data);
      } catch (error) {
        console.error("Error obteniendo datos de distancia:", error);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-lg font-semibold mb-4">Grafica Sensor Distancia</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sensor_value" stroke="#8A2BE2" name="Distancia" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficaSensorDistancia;
