import React from "react";

const TextAreaBox = ({
  type,
  onChange,
  value,
  name,
  placeholder,
  error,
  className,
  title,
  disabled
}) => {
  return (
    <div className="grid grid-flow-row">
      {title && (
        <label className="text-darkgrey text-bodyRB mb-[2px]">{title}</label>
      )}
      <textarea
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled || false}
        placeholder={placeholder}
        className={`rounded-15 border border-[#B9B9B9] text-darkgrey text-bodyRB outline-none  w-full min-h-[50px] p-2 ${
          error ? "border-danger outline-none " : ""
        }${className}`}
      />
      {error && <p className="text-danger text-smallLB mx-2 my-0.5 -mb-5">{error}</p>}
    </div>
  );
};
export default TextAreaBox;
