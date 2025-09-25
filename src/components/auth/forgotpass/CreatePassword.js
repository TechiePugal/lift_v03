import React, { useState } from "react";
import Button from "../../common/buttons/Button";
import { Link } from "react-router-dom";
import InputBox from "../../common/input/InputBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updatePassword, updatePasswordOtp } from "../../../api/auth/user";
import { showErrorToast, showSuccessToast } from "../../../utils/toaster";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("currentPassword"), null], "Passwords must match"),
});
const CreatePassword = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      updatePasswordOtp(values, token)
        .then((response) => {
          showSuccessToast("Password Updated");
          navigate("/login");
        })
        .catch((error) => {
          showErrorToast(error, "error", true);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
      console.log(values, "05");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-headingBB text-darkgrey">Create new Password</h1>
      <div className="flex flex-col gap-4 mt-[23px] mb-[30px]">
        <InputBox
          type="password"
          name={"currentPassword"}
          value={formik.values.currentPassword}
          error={
            formik.touched.currentPassword && formik.errors.currentPassword
          }
          onChange={formik.handleChange}
          placeholder="Enter new password"
          className="w-full text-sm border-[1.5px] pt-[14px] pb-[14px] pl-[22px] mr-[28px]   rounded-[15px]"
        />
        <InputBox
          type="text"
          name={"newPassword"}
          value={formik.values.newPassword}
          error={formik.touched.newPassword && formik.errors.newPassword}
          onChange={formik.handleChange}
          placeholder="Confirm password"
          className="w-full text-sm border-[1.5px] pt-[14px] pb-[14px] pl-[22px] mr-[28px]   rounded-[15px]"
        />
      </div>
      <Button loading={loading} type={"primary"}>
        Save password
        {/* <Link to="/login">
        
        </Link> */}
      </Button>
    </form>
  );
};

export default CreatePassword;
