import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthUiLayout from "../layout";
import Button from "../../common/buttons/Button";
import { useDispatch } from "react-redux";
import {
  cleanupUserSettings,
  userSettings,
} from "../../../store/slice/auth-slice";
import { getUserProfile, requestUserLogin } from "../../../api/auth/user";
import { showErrorToast } from "../../../utils/toaster";
import { BiShow, BiHide } from "react-icons/bi";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 6 characters long"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const handlePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  const getUser = (token) => {
    setLoading(true);
    getUserProfile()
      .then((response) => {
        const userInfo = {
          ...response.data,
          token: token,
        };
        dispatch(userSettings(userInfo));
        navigation("/", { replace: true });
        // navigation("/create_customer", { replace: true });
      })
      .catch((error) => {
        dispatch(cleanupUserSettings());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      requestUserLogin(values)
        .then((response) => {
          localStorage.setItem("token", response.data.data.token);

          /** Calling /me for user data */
          getUser(response.data.data.token);
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
      <div className="">
        <h5 className="font-semibold lg:text-headingBB text-darkgrey mb-[30px]">
          CROWN HOME ELEVATOR Login
        </h5>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-[18px] mb-[33px] flex flex-col gap-[18px]">
            <div className="">
              <p className="text-bodyRB text-darkgrey mb-[6px] ">
                Mobile Number/Email address
              </p>
              <input
                type="text"
                name="username"
                placeholder="Enter your registered mobile number/email"
                className="w-full text-sm border-[1.5px] placeholder:text-xs pl-[10px]  pt-[14px] pb-[14px]  mr-[28px]  border-lightgray rounded-[15px]"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-smallLB text-danger">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="relative">
              <p className="text-bodyRB text-darkgrey mb-[6px]">Password</p>
              <input
                type={passwordShow ? "text" : "password"}
                className="w-full text-sm border-[1.5px] pr-8 pt-[14px] pb-[14px] placeholder:text-xs pl-[10px] mr-[28px]  border-lightgray rounded-[15px]"
                placeholder="Enter password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <div
                className="absolute right-1 top-[43px] text-lg cursor-pointer w-5 h-5"
                onClick={handlePasswordShow}
              >
                {!passwordShow && <BiHide />}
                {passwordShow && <BiShow />}
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-smallLB text-danger">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <Button type="primary" loading={loading}>
              Proceed
            </Button>
          </div>
        </form>
      </div>
    </AuthUiLayout>
  );
};

export default Login;
