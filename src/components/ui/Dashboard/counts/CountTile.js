import React from "react";

const items = [
  {
    title: "Total Appointments",
    value: "200",
    color: "#219FD9",
    bgColor: "#219FD9",
  },
  { title: "Upcoming", value: "100", color: "#E45353", bgColor: "#E45353" },
  {
    title: "Checked-In",
    value: "50",
    color: "#CFBB00",
    bgColor: "#F2F496",
  },
  {
    title: "Completed",
    value: "10",
    color: "#6AB483",
    bgColor: "#6AB483",
  },
  {
    title: "Open Reminders",
    value: "80",
    color: "#DE4AC4",
    bgColor: "#DE4AC4",
  },
  {
    title: "Lab Orders - Arrived",
    value: "400",
    color: "#6AB483",
    bgColor: "#6AB483",
  },
  {
    title: "Pending Invoices",
    value: "500",
    color: "#E45353",
    bgColor: "#E45353",
  },
  {
    title: "Items below RoL",
    value: "80",
    color: "#219FD9",
    bgColor: "#219FD9",
  },
];

const CountTile = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-wrap gap-5">
        {items.map((item, index) => (
          <div key={index}>
            <Tile {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Tile = ({ title, value, bgColor, color }) => {
  return (
    <div className="">
      <div
        className={`w-[200px] lg:w-[240px] min-h-[110px] rounded-15 bg-[${bgColor}] text-[${color}] bg-opacity-[30%] text-center grid place-content-center gap-1`}
      >
        <h3 className="text-bodyRB">{title}</h3>
        <h2 className="text-headingBB">{value}</h2>
      </div>
    </div>
  );
};

export default CountTile;
