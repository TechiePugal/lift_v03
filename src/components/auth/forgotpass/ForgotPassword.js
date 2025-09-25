import React, { useState } from "react";
import AuthUiLayout from "../layout";
import "react-phone-number-input/style.css"; // Import the library's CSS styles
import Button from "../../common/buttons/Button";
import Otp from "./Otp";
import CreatePassword from "./CreatePassword";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getOtp } from "../../../api/auth/user";
import { showErrorToast } from "../../../utils/toaster";
import InputBox from "../../common/input/InputBox";
import {  useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  number: Yup.string().required("required"),
});

const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [createPassword, setShowCreatePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] =  useState("")
  const navigation = useNavigate();

  const goBackHandler = () => {
    navigation(-1);
  };

  const handleClick = () => {
    setShowOtpInput(true);
  };
  const formik = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      getOtp(values.number)
        .then((response) => {
          handleClick();
        })
        .catch((error) => {
          showErrorToast(error, "error", true);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  return (
    <AuthUiLayout>
      <div className="mb-3">
        <button
          onClick={goBackHandler}
          className="flex  justify-center items-center  lg:w-[45px] lg:h-[45px] w-[50px] h-[35px] bg-white bg-opacity-[60%] shadow-card rounded-full hover:scale-01"
        >
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.337232 8.60567C0.121631 8.38689 0.000513077 8.09019 0.000513077 7.78084C0.000513077 7.47148 0.121631 7.17479 0.337232 6.956L6.84305 0.35617C6.94914 0.244741 7.07604 0.155862 7.21635 0.094718C7.35666 0.0335742 7.50757 0.00139017 7.66027 4.40491e-05C7.81297 -0.00130207 7.96441 0.0282169 8.10575 0.0868779C8.24708 0.145539 8.37549 0.232168 8.48347 0.341709C8.59145 0.451251 8.67685 0.581511 8.73467 0.72489C8.7925 0.868269 8.8216 1.0219 8.82027 1.1768C8.81894 1.33171 8.78722 1.4848 8.72694 1.62714C8.66667 1.76948 8.57906 1.89822 8.46922 2.00584L2.77648 7.78084L8.46922 13.5558C8.67871 13.7759 8.79463 14.0706 8.79201 14.3765C8.78939 14.6824 8.66844 14.975 8.45521 15.1913C8.24198 15.4076 7.95353 15.5303 7.65199 15.533C7.35046 15.5356 7.05995 15.418 6.84305 15.2055L0.337232 8.60567Z"
              fill="#DE4AC4"
            />
          </svg>

          {/* <p className="text-bodyRB text-darkgrey hidden lg:block">Back</p> */}
        </button>
      </div>
      {!showOtpInput && !createPassword && (
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-headingBB text-darkgrey mb-[44px]">
            Forgot Password
          </h1>
          <div className="mb-[30px]">
            <p className="text-bodyRB text-darkgrey mb-[6px] ">Registered Mobile Number</p>
            <InputBox
              type="number"
              name="number"
              placeholder="Enter your registered mobile number"
              className="w-full text-sm placeholder:text-xs border-[1.5px] pt-[14px] pb-[14px] pl-[22px] mr-[28px] rounded-[15px]"
              onChange={formik.handleChange}
              value={formik.values.number}
              error={formik.touched.number && formik.errors.number}
            />
          </div>
          <Button type={"primary"} loading={loading}>
            Send OTP
          </Button>
        </form>
      )}
      {showOtpInput && (
        <Otp
          setShowOtpInput={setShowOtpInput}
          setShowCreatePassword={setShowCreatePassword}
          number={formik?.values?.number}
          setToken={setToken}
        />
      )}
      {createPassword && <CreatePassword token={token} />}
    </AuthUiLayout>
  );
};

export default ForgotPassword;
