import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../../utils/toaster";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import Button from "../../../../../common/buttons/Button";
import { updateTreatmentSummary } from "../../../../../../api/Treatments";
import { parse } from "date-fns";
const validationSchema = Yup.object().shape({
  content: Yup.string().required(" required"),
});
const ViewSummary = ({ editData, getTreatmentSummariesData, handleEdit }) => {
  const dateString = editData?.date;
  const [day, month, year] = dateString?.split("-");
  const formattedDate = new Date(`${year}-${month}-${day}`);
  const [loading, setLoading] = useState(false);

  const formikEdit = useFormik({
    enableReinitialize: true,
    initialValues: {
      date: formattedDate,
      content: editData?.content,
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      updateTreatmentSummary(values, editData._id)
        .then((response) => {
          showSuccessToast("Treatment Summarie Updated");
          getTreatmentSummariesData();
          handleEdit();
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
    <div>
      <form className=" md:w-[500px] lg:w-[650px] min-h-[300px] -mt-3">
        <div className="w-[200px] ">
          <p className="text-bodyRB text-darkgrey">Date</p>
          <DatePicker
            className={"!h-[40px]"}
            startDate={new Date(formikEdit?.values?.date)}
            onDateChange={(e) => formikEdit.setFieldValue("date", e)}
          />
        </div>
        <div className=" mt-2">
          <p className="text-bodyRB text-darkgrey">Treatment Summary</p>
          <TextAreaBox
            className={"h-[200px]"}
            placeholder={"Enter Summary"}
            name={"content"}
            value={formikEdit.values?.content}
            onChange={formikEdit.handleChange}
            error={formikEdit.errors.content && formikEdit.touched.content}
          />
        </div>
        <div className="flex justify-end mt-5">
          <div className="flex w-[300px]">
            <Button
              action={"button"}
              type={"secondary"}
              className={"!py-[7px]"}
              onClick={handleEdit}
            >
              Close
            </Button>
            <Button
              onClick={formikEdit.submitForm}
              loading={loading}
              type={"primary"}
              className={"!py-[7px]"}
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewSummary;
