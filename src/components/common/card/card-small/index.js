import React from "react";

const  CardSmall = ({
  label,
  value,
  className,
  valueColor
}) => {

  return (
    <div className={`w-full md:min-w-[200px] lg:max-w-[385px] h-[60px] p-5 rounded-[15px] gap-[31px] flex justify-between items-center bg-opacity-[25%] shadow-card ${className}`}>
      <div className="">{label}</div>
      <div className={`text-headingBB ${valueColor}`}>{value}</div>
    </div>
  );
};

export default CardSmall;
