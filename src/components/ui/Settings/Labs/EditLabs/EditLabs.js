import React from "react";
import Button from "../../../../common/buttons/Button";
import Arrow from "../../../../icons/Arrow";
import Switch from "../../../../common/Switch/Switch";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "../../../../common/input/InputBox";
import {
  addLab,
  deleteLabsData,
  editLabsData,
} from "../../../../../api/settings/Labs";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import ModalWrapper from "../../../../common/modal/ModalWrapper";

const validationSchema = Yup.object().shape({
  lab_name: Yup.string().required("Name is required"),
  contact_person: Yup.string().notRequired(),
  contact_number: Yup.number()
    .notRequired()
    .min(1000000000, "Contact number is too short") // Minimum 10 digits
    .max(9999999999, "Contact number is too long"),
});

const EditLabs = ({ getAllLabsData, handleClose, editData }) => {
  const [isOn, setIsOn] = useState(editData.whatsappOrderUpdate);

  const [open, setOpen] = useState(false);
  const handleconfirmation = () => {
    setOpen(!open);
  };

  const toggleSwitch = () => {
    setIsOn(!isOn);
    formik.setFieldValue("whatsappOrderUpdate", !isOn);
  };

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      lab_name: editData.lab_name,
      contact_person: editData.contact_person,
      contact_number: editData.contact_number,
      whatsappOrderUpdate: editData.whatsappOrderUpdate,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      editLabsData(values, editData._id)
        .then((response) => {
          showSuccessToast("Edited Successfully");
          getAllLabsData();
          handleClose();
        })
        .catch((error) => {
          console.log(error);
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <div className="lg:w-[523px] -mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="lg:pl-[79px] lg:pr-[79px] lg:mb-[35px]">
          <div className="grid grid-flow-row mt-2 mb-3">
            <InputBox
              title={"Lab Name"}
              type="text"
              placeholder="Enter Lab Name"
              className="h-[54px]"
              value={formik.values?.lab_name}
              name={"lab_name"}
              onChange={formik.handleChange}
              error={formik.touched.lab_name && formik.errors.lab_name}
            />
          </div>
          <div className="grid grid-flow-row mt-2 mb-3">
            <InputBox
              title={"Lab Contact Person"}
              type="text"
              placeholder="Enter Person Name"
              className=" h-[54px] "
              name={"contact_person"}
              value={formik.values?.contact_person}
              onChange={formik.handleChange}
              error={
                formik.touched.contact_person && formik.errors.contact_person
              }
            />
          </div>
          <div className="grid grid-flow-row mt-2 mb-3">
            <InputBox
              title={"Mobile Number"}
              type="number"
              placeholder="Enter Mobile  Number"
              className=" h-[54px] "
              name={"contact_number"}
              value={formik.values?.contact_number}
              onChange={formik.handleChange}
              error={
                formik.touched.contact_number && formik.errors.contact_number
              }
            />
          </div>

          <div className="relative flex justify-between items-center mb-5 mt-5">
            <div>
              <span className="text-bodyRB ">WhatsApp Order Updates</span>
            </div>
            {/*  */}
            <Switch handleClick={toggleSwitch} isOn={isOn} />
            {/*  */}
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-5 place-content-center mt-5 lg:mt-0 lg:pl-[79px] lg:pr-[79px]">
          <div className="">
            <Button
              action={"button"}
              type={"secondary"}
              onClick={handleClose}
              className={"text-heading2B"}
            >
              Close
            </Button>
          </div>
          <Button
            type={"primary"}
            loading={loading}
            className={"text-heading2B"}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditLabs;
