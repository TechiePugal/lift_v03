import React from "react";
import PropTypes from "prop-types";

const Status = ({ type, children, onClick, className }) => {
  let buttonClasses = "";

  if (type === "upcoming") {
    buttonClasses =
      "bg-danger  text-danger ";
  } else if (type === "checked-in") {
    buttonClasses =
      " text-primary bg-primary bg-opacity-[40%]";
  } else if (type === "completed") {
    buttonClasses =
      " text-success bg-success ";
  } else if (type === "purple") {
    buttonClasses =
      " text-white bg-pink-gradient";
  } else if (type === "yes") {
    buttonClasses =
      " text-white bg-[#2AB63F]  border border-success hover:border-success";
  }

  buttonClasses +=
    " rounded-[15px]  py-[10px] transition    duration-300 ease-in-out hover:bg-opacity-[50%] w-full ";

  return (
    <button
      type="button"
      className={`${buttonClasses} ${className} bg-opacity-[20%]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Status.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Status;
