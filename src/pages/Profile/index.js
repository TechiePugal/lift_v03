import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalWrapper from "../../components/common/modal/ModalWrapper";
import {
  cleanupUserSettings,
  closeProfileModal,
  userSettings,
} from "../../store/slice/auth-slice";
import InputBox from "../../components/common/input/InputBox";
import Button from "../../components/common/buttons/Button";
import ChangePassword from "./changePass/ChangePassword";
import ForgotPassword from "./updatepass/ForgotPassword";
import { getUserProfile, updateUserProfile } from "../../api/auth/user";
import { showErrorToast, showSuccessToast } from "../../utils/toaster";
import { BiShow, BiHide } from "react-icons/bi";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  wifi_username: Yup.string(),
  wifi_password: Yup.string(),
  // emailId: Yup.string().notRequired().email(),
  currentPassword: Yup.string().required("Password is required"),
  phoneNumber: Yup.number()
    .required("Phone number is required")
    .min(1000000000, "Contact number is too short") // Minimum 10 digits
    .max(9999999999, "Contact number is too long"),
});

const ProfileModal = () => {
  const currentUser = useSelector((state) => state.auth);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const handlePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  const getUpdatedProfile = () => {
    setLoading(true);
    getUserProfile()
      .then((response) => {
        const userInfo = {
          ...response.data,
          token: token,
        };
        dispatch(userSettings(userInfo));
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.displayName,
      // emailId: currentUser?.email,
      currentPassword: "",
      phoneNumber: currentUser?.phone,
      wifi_username: currentUser?.wifi_username,
      wifi_password: currentUser?.wifi_password,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      updateUserProfile(values)
        .then(() => {
          showSuccessToast("Profile updated");
          getUpdatedProfile();
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleChangePassword = () => {
    setChangePassword(!changePassword);
    setForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
    setChangePassword(false);
  };

  const handleCloseProfile = () => {
    formik.resetForm();
    setEditProfile(false);
    setChangePassword(false);
    setForgotPassword(false);
    if (currentUser.isOpen) {
      dispatch(closeProfileModal());
    } else {
    }
  };

  return (
    <div className="topindex">
      <ModalWrapper
        handleClose={handleCloseProfile}
        title={!changePassword ? "Profile" : "Change Password"}
        open={currentUser.isOpen}
      >
        {/* <h1 className="text-headingBB text-darkgrey">Hi {currentUser?.displayName}!</h1> */}
        <div className="w-[85vw] md:w-[467px] ">
          {!changePassword && !forgotPassword && (
            <form onSubmit={formik.handleSubmit}>
              <div className="lg:pl-[50px] lg:pr-[50px] lg:mb-[20px] flex flex-col">
                <div className="grid grid-flow-row mt-2 mb-2.5">
                  <InputBox
                    title={"Name"}
                    type="text"
                    name={"name"}
                    className={"!h-[54px]"}
                    placeholder="Enter Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.touched.name && formik.errors.name}
                    disabled={!editProfile}
                  />
                </div>
                {/* <div className="grid grid-flow-row mt-2 mb-2.5">
                  <InputBox
                    title={"Email address"}
                    type="text"
                    className={"!h-[54px]"}
                    placeholder="Enter Email ID"
                    name={"emailId"}
                    disabled={!editProfile}
                    onChange={formik.handleChange}
                    value={formik.values.emailId}
                    error={formik.touched.emailId && formik.errors.emailId}
                  />
                </div> */}
                <div className="grid grid-flow-row mt-2 mb-2.5">
                  <InputBox
                    title={"Mobile Number"}
                    type="number"
                    className={"!h-[54px]"}
                    name={"phoneNumber"}
                    disabled={!editProfile}
                    placeholder="Enter Mobile  Number"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    error={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                </div>
                {editProfile && (
                  <div className="grid grid-flow-row mt-2 mb-2.5 relative">
                    <InputBox
                      title={"Password"}
                      type={passwordShow ? "text" : "password"}
                      placeholder="Enter Password"
                      className={"!h-[54px]"}
                      disabled={!editProfile}
                      name={"currentPassword"}
                      onChange={formik.handleChange}
                      value={formik.values.currentPassword}
                      error={
                        formik.touched.currentPassword &&
                        formik.errors.currentPassword
                      }
                    />
                    <div
                      className="absolute right-1 top-[45px] text-lg cursor-pointer w-5 h-5"
                      onClick={handlePasswordShow}
                    >
                      {!passwordShow && <BiShow />}
                      {passwordShow && <BiHide />}
                    </div>

                    <div className="grid grid-flow-row mt-2 mb-2.5">
                      <InputBox
                        title={"Wifi Username"}
                        type="text"
                        name={"wifi_username"}
                        className={"!h-[54px]"}
                        placeholder="Enter Username"
                        onChange={formik.handleChange}
                        value={formik.values.wifi_username}
                        error={
                          formik.touched.wifi_username &&
                          formik.errors.wifi_username
                        }
                        disabled={!editProfile}
                      />
                    </div>

                    <div className="grid grid-flow-row mt-2 mb-2.5">
                      <InputBox
                        title={"Wifi Password"}
                        type="text"
                        name={"wifi_password"}
                        className={"!h-[54px]"}
                        placeholder="Enter Username"
                        onChange={formik.handleChange}
                        value={formik.values.wifi_password}
                        error={
                          formik.touched.wifi_password &&
                          formik.errors.wifi_password
                        }
                        disabled={!editProfile}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className=" place-content-center lg:pl-[50px] lg:pr-[50px]">
                {!editProfile ? (
                  <Button
                    className={"text-heading2B"}
                    type={"primary"}
                    action={"button"}
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    className={"text-heading2B"}
                    type={"primary"}
                    action={"button"}
                    onClick={formik.submitForm}
                    loading={loading}
                  >
                    Update Profile
                  </Button>
                )}
              </div>
              <div className=" flex justify-center mt-[30px] lg:pl-[50px] lg:pr-[50px] cursor-pointer">
                {editProfile ? (
                  <p
                    className="text-bodyRB text-danger"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password
                  </p>
                ) : (
                  <p
                    className="text-bodyRB text-danger"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </p>
                )}
              </div>
            </form>
          )}
          {changePassword && (
            <div className="lg:pl-[50px] lg:pr-[50px]">
              <ChangePassword
                handleChangePassword={handleChangePassword}
                handleCloseProfile={handleCloseProfile}
              />
              <div className=" flex justify-center mt-[30px] cursor-pointer">
                {/* <p
                  className="text-bodyRB text-danger"
                  onClick={handleForgotPassword}
                >
                  Forgot Password
                </p> */}
              </div>
            </div>
          )}
          {forgotPassword && (
            <ForgotPassword
              number={currentUser?.phone}
              handleCloseProfile={handleCloseProfile}
            />
          )}
        </div>
      </ModalWrapper>
    </div>
  );
};

export default ProfileModal;
