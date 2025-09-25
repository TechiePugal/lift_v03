import Button from "../../../../common/buttons/Button";
import Arrow from "../../../../icons/Arrow";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import SelectionInput from "../../../../common/input/Select";
import InputBox from "../../../../common/input/InputBox";
import { useEffect, useState } from "react";
import {
  deleteMedicine,
  editMedicinesDate,
} from "../../../../../api/settings/Medicines/medicines";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import { getUnitLabel } from "../../../../../utils/medicineType";

const validationSchema = Yup.object().shape({
  medicine: Yup.string().required("Medicine is required"),
  medicine_type: Yup.string().required("Type is required"),
  before_after_food: Yup.string().notRequired(),
  morning: Yup.string().notRequired(),
  afternoon: Yup.string().notRequired(),
  evening: Yup.string().notRequired(),
  night: Yup.string().notRequired(),
  days: Yup.number().notRequired(),
});

const Tablet_Units = [
  {
    label: "-",
    value: "0",
  },
  {
    label: "1/2",
    value: "0.5",
  },
  {
    label: "1",
    value: "1",
  },
];
const Syrup_Units = [
  {
    label: "-",
    value: "0",
  },
  {
    label: "3 ml",
    value: "3",
  },
  {
    label: "5 ml",
    value: "5",
  },
  {
    label: "10 ml",
    value: "10",
  },
  {
    label: "15 ml",
    value: "15",
  },
];

const EditMedicines = ({ editData, handleClose, getAllMedicinesData }) => {
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);

  const [open, setOpen] = useState(false);
  const handleconfirmation = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues: {
      medicine: editData.medicine,
      medicine_type: editData.medicine_type,
      before_after_food: editData.before_after_food,
      morning: editData.morning,
      afternoon: editData.afternoon,
      evening: editData.evening,
      night: editData.night,
      days: editData.days,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      editMedicinesDate(values, editData._id)
        .then((response) => {
          showSuccessToast("Medicine Edited Successfully");
          getAllMedicinesData();
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

  useEffect(() => {
    handleMedicineType(editData.medicine_type);
  }, [editData]);
  /** Check the medicine type and adding to formik also setting the unit items */
  const handleMedicineType = (e) => {
    if (
      e === "Tablet" ||
      e === "Capsule" ||
      e === "Ointment" ||
      e === "Injection" ||
      e === "Toothpaste" ||
      e === "Gel" ||
      e === "Others" ||
      e === "Toothbrush" ||
      e === "Gargle" ||
      e === "Tablet_Units"
    ) {
      formik.setFieldValue("medicine_type", e);
      setUnits(Tablet_Units);
    } else if (e === "Syrup" || e === "Mouthwash") {
      formik.setFieldValue("medicine_type", e);
      setUnits(Syrup_Units);
    }
  };
  /** handleMedicineType end */

  return (
    <div className="lg:w-[835px]">
      <div className="lg:pl-[79px] lg:pr-[79px] lg:mb-[40px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid  lg:grid-cols-2 gap-5 w-full mt-2 mb-12">
            <div className="grid grid-flow-row">
              <SelectionInput
                title={"Medicine Type"}
                placeholder={editData.medicine_type}
                value={formik.values?.medicine_type}
                className={"!h-[50px]"}
                error={
                  formik.touched.medicine_type && formik.errors.medicine_type
                }
                onChange={(e) => {
                  handleMedicineType(e);
                }}
              >
                <div value={"Tablet"}>Tablet</div>
                <div value={"Capsule"}>Capsule</div>
                <div value={"Ointment"}>Ointment</div>
                <div value={"Injection"}>Injection</div>
                <div value={"Toothpaste"}>Toothpaste</div>
                <div value={"Syrup"}>Syrup</div>
                <div value={"Mouthwash"}>Mouthwash</div>
                <div value={"Gel"}>Gel</div>
                <div value={"Others"}>Others</div>
                <div value={"Toothbrush"}>Toothbrush</div>
                <div value={"Gargle"}>Gargle</div>
              </SelectionInput>
            </div>
            <div className="grid grid-flow-row">
              <InputBox
                title={"Medicine Name"}
                placeholder="Enter Medicine Name"
                value={formik.values.medicine}
                className=" h-[50px] text-darkgrey text-bodyRB"
                error={formik.touched.medicine && formik.errors.medicine}
                name={"medicine"}
                onChange={formik.handleChange}
              />
            </div>
            <SelectionInput
              title={"BF / AF"}
              placeholder={editData.before_after_food}
              className={"!h-[50px]"}
              value={formik.values.before_after_food}
              error={
                formik.touched.before_after_food &&
                formik.errors.before_after_food
              }
              onChange={(e) => formik.setFieldValue("before_after_food", e)}
            >
              <div value={"-"}>-</div>
              <div value={"Before Food"}>Before Food</div>
              <div value={"After Food"}>After Food</div>
            </SelectionInput>
            <SelectionInput
              title={"Morning"}
              placeholder={editData.morning}
              value={getUnitLabel(
                formik.values?.medicine_type,
                formik.values?.morning
              )}
              className={"!h-[50px]"}
              error={formik.touched.morning && formik.errors.morning}
              onChange={(e) => formik.setFieldValue("morning", e)}
            >
              {units.map((item, index) => {
                return (
                  <div key={index} value={item.value}>
                    {item.label}
                  </div>
                );
              })}
            </SelectionInput>
            <SelectionInput
              title={"Afternoon"}
              placeholder={editData.afternoon}
              value={getUnitLabel(
                formik.values?.medicine_type,
                formik.values.afternoon
              )}
              className={"!h-[50px]"}
              error={formik.touched.afternoon && formik.errors.afternoon}
              onChange={(e) => formik.setFieldValue("afternoon", e)}
            >
              {units.map((item, index) => {
                return (
                  <div key={index} value={item.value}>
                    {item.label}
                  </div>
                );
              })}
            </SelectionInput>
            <SelectionInput
              title={"Evening"}
              placeholder={editData.evening}
              value={getUnitLabel(
                formik.values?.medicine_type,
                formik.values.evening
              )}
              className={"!h-[50px]"}
              error={formik.touched.evening && formik.errors.evening}
              onChange={(e) => formik.setFieldValue("evening", e)}
            >
              {units.map((item, index) => {
                return (
                  <div key={index} value={item.value}>
                    {item.label}
                  </div>
                );
              })}
            </SelectionInput>
            <SelectionInput
              title={"Night"}
              placeholder={editData.night}
              value={getUnitLabel(
                formik.values?.medicine_type,
                formik.values.night
              )}
              className={"!h-[50px]"}
              error={formik.touched.night && formik.errors.night}
              onChange={(e) => formik.setFieldValue("night", e)}
            >
              {units.map((item, index) => {
                return (
                  <div key={index} value={item.value}>
                    {item.label}
                  </div>
                );
              })}
            </SelectionInput>
            <InputBox
              title={"Days"}
              placeholder={"Days"}
              className={"!h-[50px]"}
              name={"days"}
              type={"number"}
              value={formik?.values?.days}
              error={formik.touched.days && formik.errors.days}
              onChange={formik.handleChange}
            />
          </div>
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5 place-content-center ">
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
              loading={loading}
              className={"text-heading2B"}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMedicines;
