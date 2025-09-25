import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ stroke }) => {
  const data = [
    { label: "01/05/2023", value: 19 },
    { label: "01/06/2023", value: 14 },
    { label: "01/09/2023", value: 3 },
    { label: "01/07/2023", value: 24 },
    { label: "01/05/2023", value: 10 },
  ];

  const CustomizedYAxisTick = (props) => (
    <g transform={`translate(${props.x},${props.y})`}>
      <text x={0} y={0} dy={2} textAnchor="end" fill="#666" fontSize={12}>
        {props.payload.value}
      </text>
    </g>
  );

  const CustomizedXAxisTick = (props) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={25}
          y={0}
          dy={15}
          textAnchor="end"
          fontSize={9.5} // Adjust the font size as needed
          fill="#666" // Adjust the font color as needed
        //   transform="rotate(-45)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    console.log({ label });
    if (active && payload) {
      return (
        <div className="flex bg-[#6AB483] gap-1 p-1 pl-2 pr-2 rounded-[5px] items-center text-white">
          <p className="text-smallLB">{`${label}`}</p>
          <p>:</p>
          <p className="text-smallBB">{`${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="shadow-card rounded-15 pt-5 pr-5 w-[100%] h-[450px] flex items-center bg-white">
      <ResponsiveContainer style={{ width: "100%", height: "100%" }}>
        <LineChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 5" /> */}
          <XAxis
            dataKey="label"
            tickLine={false}
            tick={<CustomizedXAxisTick />}
          />
          <YAxis
            tickCount={10}
            // Set axisLine prop to false to remove the vertical line
            axisLine={false}
            tick={<CustomizedYAxisTick />}
            tickMargin={5} // Adjust the gap between Y-axis ticks and the axis line
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="linear"
            dataKey="value"
            stroke={stroke}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
