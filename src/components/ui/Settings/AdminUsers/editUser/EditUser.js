import { useState } from "react";
import Button from "../../../../common/buttons/Button";
import Arrow from "../../../../icons/Arrow";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addUser,
  deleteUser,
  editUser,
  getAllUsers,
} from "../../../../../api/settings/Admin/admin";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import SelectionInput from "../../../../common/input/Select";
import ModalWrapper from "../../../../common/modal/ModalWrapper";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  emailId: Yup.string().notRequired().email(),
  role: Yup.string().required("Role is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  company_id: Yup.string(),
});

const EditUser = ({ getAllUserData, handleClose, editData }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: editData?.name,
      emailId: editData?.emailId,
      // password: editData.password,
      role: editData?.role1,
      phoneNumber: editData?.phoneNumber,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      editUser(values, editData._id)
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
        <div className="lg:pl-[40px] lg:pr-[40px] mb-[15px]">
          <div className="grid grid-flow-row mt-2 mb-2">
            <label className="text-darkgrey text-bodyRB mb-1">Name</label>
            <InputBox
              type="text"
              name={"name"}
              placeholder="Enter Name"
              onChange={formik.handleChange}
              value={formik.values?.name}
              error={formik.errors?.name}
            />
          </div>
          <div className="grid grid-flow-row mt-2 mb-1">
            <label className="text-darkgrey text-bodyRB mb-2">
              Mobile Number
            </label>
            <InputBox
              type="number"
              name={"phoneNumber"}
              placeholder="Enter Mobile  Number"
              onChange={formik.handleChange}
              value={formik.values?.phoneNumber}
              error={formik.errors?.phoneNumber}
            />
          </div>
          <div className="grid grid-flow-row mt-2 mb-2">
            <label className="text-darkgrey text-bodyRB mb-1">Email ID</label>
            <InputBox
              type="text"
              placeholder="Enter Email ID"
              name={"emailId"}
              onChange={formik.handleChange}
              value={formik.values?.emailId}
              error={formik.errors?.emailId}
            />
          </div>
          {/* <div className="grid grid-flow-row mt-2 mb-2">
            <label className="text-darkgrey text-bodyRB mb-1">Password</label>
            <InputBox
              type="text"
              placeholder="Enter Password"
              name={"password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
            />
          </div> */}
          <div className="relative grid grid-flow-row">
            <SelectionInput
              onChange={(e) => formik.setFieldValue("role", e)}
              title={"Role"}
              value={formik.values?.role}
              className={"h-[45px] border border-[#B9B9B9] !shadow-none"}
            >
              <div value={`Owner`}>Owner</div>
              <div value={`Admin`}>Admin</div>
              <div value={`Doctor`}>Doctor</div>
            </SelectionInput>
          </div>
          {formik.errors.role && (
            <p className="text-danger text-smallLB ">{formik.errors?.role}</p>
          )}
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-5 place-content-center lg:pl-[50px] lg:pr-[50px]">
          <Button action={"button"} type={"secondary"} onClick={handleClose}>
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

function InputBox({ type, onChange, value, name, placeholder, error }) {
  return (
    <>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`rounded-15 pl-4 h-[45px] text-darkgrey  border border-[#B9B9B9] text-bodyRB ${
          error ? "border-danger outline-none " : ""
        }`}
      />
      {error && <p className="text-danger text-smallLB mx-2 my-0.5">{error}</p>}
    </>
  );
}

export default EditUser;
