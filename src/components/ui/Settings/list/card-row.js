import React from "react";
import Arrow from "../../../icons/Arrow";

const CardRow = ({ label, value, onClick }) => {
  return (
    <div onClick={onClick} className="flex justify-between bg-white rounded-15 shadow-card items-center pl-8 p-5 h-[60px] hover:cursor-pointer hover:scale-01">
      <div className="text-bodyRB text-darkgrey">{label}</div>
      <div className="flex gap-3 items-center">
        <div className="text-bodyRB text-darkgrey">{value}</div>
        <Arrow className={""}/>
      </div>
    </div>
  );
};

export default CardRow;
