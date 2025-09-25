import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css"; // Import the library's CSS styles
import Button from "../../../components/common/buttons/Button";
import Otp from "./Otp";
import CreatePassword from "./CreatePassword";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getOtp } from "../../../api/auth/user";
import { showErrorToast } from "../../../utils/toaster";
import InputBox from "../../../components/common/input/InputBox";

const validationSchema = Yup.object().shape({
  number: Yup.string().required("required"),
});

const ForgotPassword = ({ number, handleCloseProfile }) => {
  const [value, setValue] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [createPassword, setShowCreatePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const navigation = useNavigate();


  const handleClick = () => {
    setShowOtpInput(true);
  };
  const formik = useFormik({
    initialValues: {
      number: number,
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
    <div>
      {!showOtpInput && !createPassword && (
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-bodyBB text-darkgrey mb-[40px]">
            Forgot Password
          </h1>
          <div className="mb-[30px]">
            <p className="text-smallLB mb-[6px] ">Registered Mobile Number</p>
            <InputBox
              type="number"
              name="number"
              placeholder="Enter your registered mobile number"
              className="w-full text-sm border-[1.5px] pt-[14px] pb-[14px] pl-[22px] mr-[28px] rounded-[15px]"
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
      {createPassword && (
        <CreatePassword
          token={token}
          handleCloseProfile={handleCloseProfile}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
