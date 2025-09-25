import { useState } from "react";
import Button from "../../../../common/buttons/Button";
import Arrow from "../../../../icons/Arrow";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addUser, getAllUsers } from "../../../../../api/settings/Admin/admin";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import SelectionInput from "../../../../common/input/Select";
import InputBox from "../../../../common/input/InputBox";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  emailId: Yup.string().notRequired().email(),
  role1: Yup.string().required("Role1 is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phoneNumber: Yup.number()
    .required("Phone number is required")
    .min(1000000000, "Contact number is too short") // Minimum 10 digits
    .max(9999999999, "Contact number is too long"),
  company_id: Yup.string(),
});

const AddUser = ({ getAllUserData, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      emailId: "",
      role1: null,
      password: "",
      confirm_password: "",
      phoneNumber: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      addUser(values)
        .then((response) => {
          showSuccessToast("User Added Successfully");
          getAllUserData();
          handleClose();
        })
        .catch((error) => {
          console.log(error);
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoading(false);
        });
      console.log(values, "05");
    },
  });

  return (
    <div className="w-[90vw] lg:w-[510px] -mt-5">
      <form onSubmit={formik.handleSubmit}>
        <div className="lg:pl-[50px] lg:pr-[50px] lg:mb-[20px]">
          <div className="grid grid-flow-row mt-2 mb-2.5">
            <InputBox
              title={"Name"}
              type="text"
              name={"name"}
              placeholder="Enter Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="grid grid-flow-row mt-2 mb-2.5">
            <InputBox
              title={"Mobile Number"}
              type="number"
              name={"phoneNumber"}
              placeholder="Enter Mobile  Number"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
          </div>
          <div className="grid grid-flow-row mt-2 mb-2.5">
            <InputBox
              title={"Email ID"}
              type="text"
              placeholder="Enter Email ID"
              name={"emailId"}
              onChange={formik.handleChange}
              value={formik.values.emailId}
              error={formik.touched.emailId && formik.errors.emailId}
            />
          </div>
          <div className="relative grid grid-flow-row">
            <div>
              <SelectionInput
                onChange={(e) => formik.setFieldValue("role1", e)}
                title={"Role"}
                className={"h-[45px] border border-[#B9B9B9] !shadow-none"}
                error={formik.touched.role1 && formik.errors.role1}
                value={formik.values?.role1}
              >
                <div value={`Owner`}>Owner</div>
                <div value={`Admin`}>Admin</div>
                <div value={`Doctor`}>Doctor</div>
              </SelectionInput>
            </div>
            {/* <label className="text-darkgrey text-bodyRB mb-1">Role1</label>
            <select
              name="role1"
              className={`rounded-15 border-2 p-2 h-[54px] appearance-none bg-transparent pl-5 pr-8 text-darkgrey text-bodyRB ${
                formik.errors.role1 ? "border-danger outline-none " : ""
              }`}
              id=""
              onChange={formik.handleChange}
              value={formik.values.role1}
            >
              <div value=""></div>
              <div value={`${1}`}>1</div>
              <div value={`${2}`}>2</div>
              <div value={`${3}`}>3</div>
            </select>
            <div className="absolute inset-y-0 right-2 top-10 flex items-center pr-2 pointer-events-none rotate-90">
              <Arrow />
            </div> */}
          </div>

          <div className="grid grid-flow-row mt-2 mb-2.5">
            <InputBox
              title={"Password"}
              type="password"
              placeholder="Enter Password"
              name={"password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className="grid grid-flow-row mt-2 mb-1">
            <InputBox
              title={"Confirm Password"}
              type="test"
              placeholder="Confirm Password"
              name={"confirm_password"}
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
              error={
                formik.touched.confirm_password &&
                formik.errors.confirm_password
              }
            />
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-5 place-content-center lg:pl-[50px] lg:pr-[50px]">
          <Button type={"secondary"} onClick={handleClose}>
            Close
          </Button>
          <Button type={"primary"} loading={loading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
