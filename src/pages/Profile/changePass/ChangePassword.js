import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "../../../components/common/input/InputBox";
import Button from "../../../components/common/buttons/Button";
import { updatePassword } from "../../../api/auth/user";
import { showErrorToast, showSuccessToast } from "../../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanupUserSettings } from "../../../store/slice/auth-slice";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .notOneOf(
      [Yup.ref("currentPassword"), null],
      "New Password must not be the same as the Current Password"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = ({ handleChangePassword, handleCloseProfile }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(cleanupUserSettings());
    navigation("/login");
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      updatePassword(values)
        .then(() => {
          showSuccessToast("Password has been updated");
          handleLogout();
          handleCloseProfile()
        })
        .catch((error) => {
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 mt-[23px] mb-[30px]">
        <InputBox
          type="password"
          title={"Current Password"}
          name={"currentPassword"}
          value={formik.values.currentPassword}
          error={
            formik.touched.currentPassword && formik.errors.currentPassword
          }
          onChange={formik.handleChange}
          placeholder="Enter your current password"
          className="w-full text-sm border-[1.5px] pt-[14px] pb-[14px] pl-[22px] !h-[54px] mr-[28px]   rounded-[15px]"
        />
        <InputBox
          type="text"
          title={"New Password"}
          name={"newPassword"}
          value={formik.values.newPassword}
          error={formik.touched.newPassword && formik.errors.newPassword}
          onChange={formik.handleChange}
          placeholder="Enter your new password"
          className="w-full text-sm border-[1.5px] pt-[14px] pb-[14px] pl-[22px] !h-[54px] mr-[28px]   rounded-[15px]"
        />
        <div className="grid grid-flow-row mt-2 mb-1">
          <InputBox
            title={"Re-enter new Password"}
            type="text"
            placeholder="Re-enter your new password"
            className={
              "w-full text-sm border-[1.5px] pt-[14px] pb-[14px] pl-[22px] !h-[54px] mr-[28px] "
            }
            name={"confirmPassword"}
            onChange={formik.handleChange}
            value={formik.values?.confirmPassword}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </div>
      </div>
      <Button loading={loading} type={"primary"}>
        Continue{" "}
      </Button>
    </form>
  );
};

export default ChangePassword;
