import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
  Legend,
} from "recharts";

const DonutChart = () => {
  const COLORS = ["#CFBB00", "Blue", "#E45353", "#6AB483"];

  const data = [
    { name: "UPI", value: 300 },
    { name: "Card", value: 200 },
    { name: "Cash", value: 100 },
    { name: "Bank transfer", value: 400 },
  ];
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const isMobile = viewportWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    fill,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 2.1;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180)) - 10;
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180)) - 2;

    // Define your original and mobile styles
    const originalStyles = {
      rect: { width: 78, height: 25, x: -40, y: -14 },
      text: { fontSize: 12 },
    };

    const mobileStyles = {
      rect: { width: 50, height: 20, x: -25, y: -11 },
      text: { fontSize: 10 },
    };

    // Choose styles based on viewport width
    const styles = viewportWidth <= 768 ? mobileStyles : originalStyles;

    const { rect, text } = styles;

    return (
      <g transform={`translate(${x},${y})`}>
        <rect
          x={rect.x}
          y={rect.y}
          rx="5"
          ry="5"
          fill={fill}
          width={rect.width}
          height={rect.height}
        />
        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          style={{ fill: "white", fontWeight: "bold", fontSize: text.fontSize }}
        >
          {value}
        </text>
      </g>
    );
  };
  return (
    <div className="shadow-card rounded-15 p-5 w-[100%] h-[450px] flex items-center bg-white">
      <ResponsiveContainer style={{ width: "100%", height: "100%" }}>
        <PieChart>
          <Legend
            align={isMobile ? "center" : "right"}
            verticalAlign={"bottom"}
            layout={isMobile ? "horizontal" : "vertical"}
            iconSize={20}
            iconType="rect"
            borderRadius={5} // Set the border radius for the icons
            wrapperStyle={{
              paddingRight: isMobile ? "0" : "10px", // Adjust the paddingRight as needed
            }}
            content={(props) => {
              const { payload } = props;
              return (
                <ul className="flex flex-row md:flex-col lg:gap-0 gap-4 justify-center">
                  {payload.map((entry, index) => (
                    <li key={`legend-item-${index}`}>
                      <div className="flex flex-row items-center">
                        <span
                          className="legend-icon mt-5 w-[20px] h-[20px]"
                          style={{
                            backgroundColor: entry.color,
                            borderRadius: "5px", // Set border radius for icons
                            marginRight: "5px", // Adjust spacing between icon and text
                          }}
                        ></span>
                        <span
                          className="legend-text mt-5"
                          style={{
                            fontSize: "13px", // Set text size
                            fontFamily: "Arial", // Change font family
                            color: "#5C5C5C",
                            fontWeight: 400,
                          }}
                        >
                          {entry.value}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              );
            }}
          />
          <Pie
            data={data}
            cx={isMobile ? "50%" : "58%"}
            cy="50%"
            innerRadius="60%"
            outerRadius="75%"
            fill="#8884d8"
            paddingAngle={0}
            labelLine={false}
            dataKey="value"
            label={CustomLabel}
          >
            {data.map((entry, index) => (
              <Cell
                style={{ outline: "none" }}
                key={`cell-${index}`}
                fill={COLORS[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
