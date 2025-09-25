import PropTypes from "prop-types";
import Spinner from "../loading/Spinner";
import { useEffect, useRef, useState } from "react";

const Button = ({ type, children, onClick, className, loading, action }) => {
  const buttonRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(null);

  useEffect(() => {
    // Measure the button width when the component mounts or when the loading state changes
    if (buttonRef.current && !loading) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [loading]);

  const buttonClassesMap = {
    primary: "bg-gradient-primary text-white hover:bg-primary-dark border hover:border-primary",
    secondary: "text-black hover:bg-primary hover:bg-opacity-[60%] border-[1.5px] border-primary hover:border-secondary",
    danger: "text-danger hover:bg-danger border border-danger hover:border-danger",
    success: "text-white hover:bg-success bg-success border border-success hover:border-success",
    yes: "text-white bg-[#2AB63F] border border-success hover:border-success",
    pink: "text-white bg-pink-gradient border border-pink-gradient hover:border-[#DE4AC4]",
    gold: "text-white bg-gold border border-white hover:border-gold",
    green:"bg-gradient-green text-white hover:bg-primary-dark border hover:border-primary",
    purple:"bg-gradient-purple text-white hover:bg-primary-dark border hover:border-primary",
  };
  
  const buttonClasses = `rounded-[15px] py-[13px] transition shadow-button duration-300 ease-in-out hover:text-white w-full ${buttonClassesMap[type] || ''}`;

  return (
    <button
      ref={buttonRef}
      type={action ? action : "submit"}
      className={`${buttonClasses} ${className} flex justify-center items-center`}
      onClick={onClick}
      disabled={loading}
    >
      <div className="flex justify-center items-center gap-2">
        {loading &&
        buttonWidth &&
        buttonWidth > 100 ? (
          <div className="!text-sm">Please Wait</div>
        ) : (
          children
        )}
        {loading && (
          <Spinner className={"w-[20px] h-[20px] -mr-1 fill-white"} />
        )}
      </div>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary", "danger", "success", "yes", "pink", "gold","green","purple"]),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
