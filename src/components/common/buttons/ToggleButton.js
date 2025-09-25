import React, { useState } from "react";

function ToggleButton({ children, isChecked, handleClick }) {


  return (
    <button
      onClick={handleClick}
      className={` rounded-[15px] text-bodyRB  py-[10px] transition  shadow-button duration-300 ease-in-out  min-w-[170px]  ${
        isChecked
          ? "bg-[#DE4AC4] bg-opacity-[100%] text-darkgrey"
          : "bg-[#DE4AC4] bg-opacity-[20%] text-darkgrey hover:bg-opacity-[50%]"
      } focus:outline-none`}
    >
      {children}
    </button>
  );
}

export default ToggleButton;
