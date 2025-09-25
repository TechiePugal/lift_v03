import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../utils/toaster";
import Button from "../../../components/common/buttons/Button";
import { resendOtp, verifyOtp } from "../../../api/auth/user";

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{4}$/, "Must be a 4-digit number")
    .required("OTP is required"),
});

const inputStyle = {
  width: "54px", // Default width
  height: "54px", // Default height
  fontSize: "1.5rem", // Default font size
  border: "1px solid #ccc", // Default border styles
  borderRadius: "15px", // Default border radius
};

const Otp = ({ setShowOtpInput, setShowCreatePassword, number, setToken }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isDisabled, setIsDisabled] = useState(false);

  const startCountdown = () => {
    setIsDisabled(true);

    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setCountdown(30);
      setIsDisabled(false);
    }, 30000);
  };

  const handleResendClick = () => {
    // Your logic for resending OTP goes here
    // For demonstration purposes, let's just start the countdown
    resendOtp(number)
      .then((response) => {
        showSuccessToast("OTP send");
      })
      .catch((error) => {
        showErrorToast(error, "error", true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    startCountdown();
  };

  useEffect(() => {
    if (countdown === 0) {
      setIsDisabled(false);
    }
  }, [countdown]);

  const handleClick = () => {
    setShowOtpInput(false);
    setShowCreatePassword(true);
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      verifyOtp(number,values.otp)
        .then((response) => {
          console.log({response},"tokk");
          setToken(response?.token)
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
      <h1 className="text-headingBB mb-[24px] text-darkgrey">Enter OTP</h1>
      <form onSubmit={formik.handleSubmit} className="w-full h-full ">
        <div className="mb-[16px]">
          <p className="text-bodyRB text-darkgrey">
            Enter the OTP sent to your mobile number
          </p>
          <p className="text-bodyBB text-darkgrey">+91 {number}</p>
        </div>
        <div className="mb-10">
          <OtpInput
            value={formik.values?.otp}
            onChange={(e) => formik.setFieldValue("otp", e)}
            numInputs={4}
            renderSeparator={<span style={{ width: "15px" }}> </span>}
            renderInput={(props) => <input type="number" {...props} />}
            //   inputStyle={{width:"55px", height:"54px", borderRadius:"15px", border: "2px solid #E7EBEC", display:"flex", justifyContent: "space-between"}}
            inputStyle={{ ...inputStyle }}
          />
          {formik.touched.otp && formik.errors.otp && (
            <p className="!text-xs text-danger">{formik.errors.otp}</p>
          )}
        </div>
        <Button loading={loading} type={"primary"}>Verify</Button>

        <div className="flex justify-center mt-5 ">
          <p
            className={`text-${
              isDisabled ? "darkgrey" : "danger cursor-pointer"
            } underline`}
            onClick={isDisabled ? null : handleResendClick}
          >
            {isDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Otp;
