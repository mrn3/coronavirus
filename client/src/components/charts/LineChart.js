import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">{payload.value}</text>
      </g>
    );
  }
}

export default function LineChartWrapper(props) {
  console.log('props', props)
  const { lineChartSeriesArray, height, payload } = props;
  return (
    <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <LineChart width={500} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" type="category" allowDuplicatedCategory={false} />
            <YAxis dataKey="value" />
            <Tooltip />
            <Legend />
            {lineChartSeriesArray.map(s => (
              <Line dataKey="value" data={s.data} name={s.name} key={s.name} />
            ))}
        </LineChart>

        
          {/* <LineChart
              data={data}
              margin={{
                top: 20, right: 30, left: 20, bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
              <YAxis />
              <Tooltip />
              <Legend payload={payload} />
              <Line type="monotone" dataKey="monthlyTraffic" stroke="#8884d8" />
              <Line type="monotone" dataKey="serviceTrend" stroke="#8884d8" />
          </LineChart> */}
        </ResponsiveContainer>
      </div>
  );
}