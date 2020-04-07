import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function BarChartWrapper(props) {
  const { data, width, height } = props;
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  );
}