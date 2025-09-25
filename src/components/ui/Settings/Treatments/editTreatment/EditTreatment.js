import { useState } from "react";
import Button from "../../../../common/buttons/Button";
import RedClose from "../../../../icons/Red-Close";
import { useFormik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import {
  addTreatments,
  deleteTreatments,
  editTreatments,
} from "../../../../../api/settings/Treatment/treatment";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import InputBox from "../../../../common/input/InputBox";

const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      charges: Yup.number()
        .typeError("Charges must be a number")
        .required("Charges is required")
        .min(0, "Charges must be greater than or equal to 0"),
    })
  ),
});

const EditTreatment = ({ getTreatments, handleClose, editData }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = { name: editData.name, charges: editData.charges };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      editTreatments(values, editData?._id)
        .then((response) => {
          showSuccessToast("Treatment Edited Successfully");
          getTreatments();
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
        <div className="lg:pl-[79px] lg:pr-[79px] lg:mb-[30px]">
          <div className="grid grid-flow-col grid-cols-8">
            <label className="text-darkgrey text-bodyRB mb-2 col-span-4">
              Treatment Name
            </label>
            <label className="text-darkgrey text-bodyRB mb-2">Charges</label>
          </div>

          {/* Maping the rows */}
          <div className="grid grid-flow-col-dense grid-cols-8 gap-5 w-full  mb-2">
            <div className="grid grid-flow-row col-span-4">
              <InputBox
                type="text"
                name={`name`}
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter Treatment Name"
                className="rounded-15 border-2 w-full pl-4  text-darkgrey text-bodyRB"
                error={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className="grid grid-flow-row col-span-4">
              <InputBox
                type="number"
                name={`charges`}
                value={formik.values.charges}
                onChange={formik.handleChange}
                placeholder="Enter Price"
                className="rounded-15 border-2 pl-4 pr-1 w-full  text-darkgrey text-bodyRB"
                error={formik.touched.charges && formik.errors.charges}
              />
            </div>
          </div>
          {/* Maping end */}
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-5 place-content-center mt-5 lg:mt-0 lg:pl-[79px] lg:pr-[79px] ">
          <Button
            action={"button"}
            onClick={handleClose}
            type={"secondary"}
            className={"text-heading2B"}
          >
            Close
          </Button>
          <Button
            type={"primary"}
            className={"text-heading2B"}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTreatment;
