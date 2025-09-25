import React from "react";
import { useState } from "react";
import Button from "../../../../common/buttons/Button";
import RedClose from "../../../../icons/Red-Close";
import { useFormik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import {
  addLabWorks,
  deleteLabWorkData,
  editLabWorksData,
} from "../../../../../api/settings/LabsWorks/labsWorks";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import InputBox from "../../../../common/input/InputBox";
import ModalWrapper from "../../../../common/modal/ModalWrapper";

const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
    })
  ),
});

const EditLabsWorks = ({ handleClose, getAllLabWorkData, editData }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = { name: editData.name };
  const [open, setOpen] = useState(false);
  const handleconfirmation = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      editLabWorksData(values, editData?._id)
        .then((response) => {
          showSuccessToast("Edited Successfully");
          getAllLabWorkData();
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
    <div className="lg:w-[701px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="lg:pl-[79px] lg:pr-[79px] lg:mb-[40px]">
          <div className="grid grid-flow-col grid-cols-8">
            <label className="text-darkgrey text-bodyRB mb-2 col-span-4">
              Lab Work Name{" "}
            </label>
          </div>
          <div className={`grid grid-flow-col-dense  gap-5 w-full mt-2 mb-2 `}>
            <div className="grid grid-flow-row col-span-4 lg:col-span-6">
              <InputBox
                type="text"
                placeholder="Enter Name"
                className="rounded-15 border-2 w-full pl-4 h-[54px] text-darkgrey text-bodyRB"
                name={`name`}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name?.name && formik.errors.items?.name}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-2 place-content-center mt-5 lg:mt-0">
          <Button
            action={"button"}
            type={"danger"}
            className={"text-heading2B"}
            onClick={handleconfirmation}
          >
            Delete
          </Button>
          <Button
            action={"button"}
            type={"secondary"}
            className={"text-heading2B"}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            loading={loading}
            type={"primary"}
            className={"text-heading2B"}
          >
            Save
          </Button>
        </div>
      </form>

     
    </div>
  );
};

export default EditLabsWorks;
