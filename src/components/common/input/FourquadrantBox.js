import React from "react";
// import InputBox from "./InputBox";

const FourquadrantBox = ({
  type,
  onChange,
  value,
  name,
  placeholder,
  error,
  className,
  formik,
}) => {
  return (
    <div className="flex">
      <div className="">
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          // type={"number"}
          placeholder={""}
          name={"teeth1"}
          value={formik?.values?.teeth1}
          onChange={formik?.handleChange}
          error={formik?.touched?.teeth1 && formik?.errors?.teeth1}
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          // type={"number"}
          placeholder={""}
          name={"teeth3"}
          value={formik?.values?.teeth3}
          onChange={formik?.handleChange}
          error={formik?.touched?.teeth3 && formik?.errors?.teeth3}
        />
      </div>
      <div>
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          // type={"number"}
          placeholder={""}
          name={"teeth2"}
          value={formik?.values?.teeth2}
          onChange={formik?.handleChange}
          error={formik?.touched?.teeth2 && formik?.errors?.teeth2}
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          // type={"number"}
          placeholder={""}
          name={"teeth4"}
          value={formik?.values?.teeth4}
          onChange={formik?.handleChange}
          error={formik?.touched?.teeth4 && formik?.errors?.teeth4}
        />
      </div>
      {/* {formik.errors.teeth1 && (
        <p className="text-danger text-smallLB mx-2 my-0.5">{error}</p>
      )} */}
    </div>
  );
};

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
}) => {
  return (
    <div className="grid grid-flow-row ">
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled || false}
        className={`rounded-15 border-[1.5px] border-[#B9B9B9] outline-none text-darkgrey text-bodyRB p-2 w-[72px] h-[44px]  ${
          error ? "border-danger outline-none" : ""
        }${className}`}
      />
    </div>
  );
};

export default FourquadrantBox;
