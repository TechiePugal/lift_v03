import React, { useState } from "react";
import AuthUiLayout from "../layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiHide, BiShow } from "react-icons/bi";
import Button from "../../common/buttons/Button";
import { Link } from "react-router-dom";
import InputBox from "../../common/input/InputBox";
import { clinic_signup } from "../../../api/auth/clenic-signup";
import { showErrorToast, showSuccessToast } from "../../../utils/toaster";
import { useNavigate } from "react-router-dom";
import PlanandPricingLayout from "../../ui/Settings/PlanandPricing/PlanandPricingLayout";
import AuthHeader from "../layout/header/AuthHeader";
import SelectPlan from "./selectplan/SelectPlan";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  company: Yup.string().required("Clinic name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Invalid phone number")
    .max(10, "Phone number must not exceed 10 characters")
    .required("Phone number is required"),
  emailId: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address1: Yup.string(),
  address2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  country: Yup.string(),
  pincode: Yup.string().matches(/^[0-9]+$/, "Invalid pin code"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  referalCode: Yup.string(),
});

const SignupLayout = () => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [showPlansSelection, setShowPlansSelection] = useState(false);

  const handlePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      company: "",
      phoneNumber: "",
      emailId: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      password: "",
      confirmPassword: "",
      referalCode: "",
      variant: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setShowPlansSelection(true);
    },
  });

  const handleSignupStartTrail = (plan) => {
    const payload = { ...formik.values, variant: plan };
    setLoading(plan);
    clinic_signup(payload)
      .then((response) => {
        showSuccessToast("Congratulations! You have successfully signed up.");
        navigation("/login");
      })
      .catch((error) => {
        showErrorToast(error, "error");
      })
      .finally(() => {
        setShowPlansSelection(false)
        setLoading('');
      });
  };

  return (
    <div>
      {!showPlansSelection && (
        <AuthUiLayout signup={true}>
          <div className="">
            <h5 className="font-semibold lg:text-headingBB text-darkgrey mb-[30px]">
              Clinic Sign Up
            </h5>
            <p className="text-bodyRB text-darkgrey">
              Sign up with clinic details
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-[18px] mb-[33px] flex flex-col gap-[18px]">
                <div className="flex gap-5">
                  <div className="w-[50%]">
                    <InputBox
                      title={"First Name"}
                      name={"name"}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && formik.errors.name}
                      placeholder={"Enter first name"}
                      className={"h-[50px] !w-full border-lightgray"}
                    />
                  </div>
                  <div className="w-[50%]">
                    <InputBox
                      title={"Last Name"}
                      name={"lastname"}
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      error={formik.touched.lastname && formik.errors.lastname}
                      placeholder={"Enter last name"}
                      className={"h-[50px] !w-full border-lightgray"}
                    />
                  </div>
                </div>
                <InputBox
                  title={"Clinic Name"}
                  name={"company"}
                  value={formik.values.company}
                  error={formik.touched.company && formik.errors.company}
                  onChange={formik.handleChange}
                  placeholder={"Enter name"}
                  className={"h-[50px] !w-full border-lightgray"}
                />
                <InputBox
                  title={"Phone Number"}
                  name={"phoneNumber"}
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  placeholder={"Enter number"}
                  type={"number"}
                  className={"h-[50px] !w-full border-lightgray"}
                />
                <InputBox
                  title={"Enter Email ID"}
                  name={"emailId"}
                  value={formik.values.emailId}
                  onChange={formik.handleChange}
                  error={formik.touched.emailId && formik.errors.emailId}
                  placeholder={"Enter your email"}
                  type={"email"}
                  className={"h-[50px] !w-full border-lightgray"}
                />
                <InputBox
                  title={"Address Line 1"}
                  name={"address1"}
                  value={formik.values.address1}
                  onChange={formik.handleChange}
                  error={formik.touched.address1 && formik.errors.address1}
                  placeholder={"Enter your address"}
                  className={"h-[50px] !w-full border-lightgray"}
                />
                <InputBox
                  title={"Address Line 2"}
                  name={"address2"}
                  value={formik.values.address2}
                  onChange={formik.handleChange}
                  error={formik.touched.address2 && formik.errors.address2}
                  placeholder={"Enter your address"}
                  className={"h-[50px] !w-full border-lightgray"}
                />
                <div className="flex  gap-5">
                  <div className="w-[50%]">
                    <InputBox
                      title={"City"}
                      name={"city"}
                      value={formik.values.city}
                      error={formik.touched.city && formik.errors.city}
                      onChange={formik.handleChange}
                      placeholder={"Enter the city"}
                      className={"h-[50px] !w-full border-lightgray"}
                    />
                  </div>
                  <div className="w-[50%]">
                    <InputBox
                      title={"State"}
                      name={"state"}
                      value={formik.values.state}
                      error={formik.touched.state && formik.errors.state}
                      onChange={formik.handleChange}
                      placeholder={"Enter the state"}
                      className={"h-[50px] !w-full border-lightgray"}
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-[50%]">
                    <InputBox
                      title={"Country"}
                      name={"country"}
                      value={formik.values.country}
                      error={formik.touched.country && formik.errors.country}
                      onChange={formik.handleChange}
                      placeholder={"Country"}
                      className={"h-[50px] !w-full border-lightgray"}
                    />
                  </div>
                  <div className="w-[50%]">
                    <InputBox
                      title={"Pin Code"}
                      name={"pincode"}
                      value={formik.values.pincode}
                      error={formik.touched.pincode && formik.errors.pincode}
                      onChange={formik.handleChange}
                      type={"number"}
                      placeholder={"Enter the pin code"}
                      className={"h-[50px] !w-full border-lightgray"}
                    />
                  </div>
                </div>
                <div className="">
                  <InputBox
                    title={"Referral code"}
                    name={"referalCode"}
                    value={formik.values.referalCode}
                    error={
                      formik.touched.referalCode && formik.errors.referalCode
                    }
                    onChange={formik.handleChange}
                    placeholder={"Enter the code"}
                    className={"h-[50px] !w-full border-lightgray"}
                  />
                </div>
                <div className="relative">
                  <InputBox
                    title={"Password"}
                    type={"password"}
                    name={"password"}
                    value={formik.values.password}
                    error={formik.touched.password && formik.errors.password}
                    onChange={formik.handleChange}
                    placeholder={"Enter your Password"}
                    className={"h-[50px] !w-full border-lightgray"}
                  />
                </div>
                <div className="relative">
                  <InputBox
                    title={"Confirm Password"}
                    name={"confirmPassword"}
                    value={formik.values.confirmPassword}
                    error={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    onChange={formik.handleChange}
                    placeholder={"Confirm  Password"}
                    type={passwordShow ? "text" : "password"}
                    className={"h-[50px] !w-full border-lightgray"}
                  />
                  <div
                    className="absolute right-1 top-[40px] text-lg cursor-pointer w-5 h-5"
                    onClick={handlePasswordShow}
                  >
                    {!passwordShow && <BiShow />}
                    {passwordShow && <BiHide />}
                  </div>
                </div>
              </div>
              <div>
                <Button type="primary">
                  Choose Plan
                </Button>
              </div>
            </form>
          </div>
        </AuthUiLayout>
      )}

      {/* Signup compleated window */}
      {showPlansSelection && (
        <div className="px-[10px] md:px-[150px] py-[40px] grid grid-flow-row grid-cols-1 xl:h-screen relative">
          <div className="flex justify-between items-center">
            <AuthHeader />
          </div>
          <div className="mt-5">
            <SelectPlan handleSignupStartTrail={handleSignupStartTrail} loading={loading} showPlansSelection={showPlansSelection} setShowPlansSelection={setShowPlansSelection}/>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default SignupLayout;
