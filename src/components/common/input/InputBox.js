import React from "react";

const InputBox = ({
  type,
  onChange,
  value,
  name,
  placeholder,
  error,
  className,
  title,
  onBlur,
  disabled,
  customUi
}) => {
  return (
    <div className="grid grid-flow-row relative">
      {title && (
        <label className="text-darkgrey text-bodyRB mb-[2px]">{title}</label>
      )}
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value || ""}
        placeholder={placeholder}
        disabled={disabled || false}
        className={`rounded-15  border-[1.5px] min-h-[40px] max-h-[100px] border-[#B9B9B9] outline-none text-darkgrey text-bodyRB p-2  ${
          error ? `border-danger outline-none ${className}` : ""
        }${className}`}
      />
      {error && (
        <p className="text-danger text-smallLB mx-2 my-0.5 -mb-5 max-w-[200px]">{error}</p>
      )}
      <div className="absolute right-0">
        {customUi}
      </div>
    </div>
  );
};

export default InputBox;
