import { useState } from "react";
import Button from "../../../../common/buttons/Button";
import Arrow from "../../../../icons/Arrow";

import { useFormik } from "formik";
import * as Yup from "yup";
import { addMedicines } from "../../../../../api/settings/Medicines/medicines";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import SelectionInput from "../../../../common/input/Select";
import InputBox from "../../../../common/input/InputBox";
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

const AddMedicines = ({ getAllMedicinesData, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);

  const formik = useFormik({
    initialValues: {
      medicine: "",
      medicine_type: "",
      before_after_food: "Before Food",
      morning: "",
      afternoon: "",
      evening: "",
      night: "",
      days: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      addMedicines(values)
        .then((response) => {
          showSuccessToast("Medicine Added Successfully");
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

  /** Check the medicine type and adding to formik also setting the unit items */
  const handleMedicineType = (e) => {
    if (
      e === "Tablet" ||
      e === "Capsule" ||
      e === "Ointment" ||
      e === "Injection" ||
      e === "Toothpaste"||
      e === "Gel" ||
      e === "Others" ||
      e === "Toothbrush" ||
      e === "Gargle"
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
                placeholder={"Choose Medicine type"}
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
                className=" h-[50px] text-darkgrey text-bodyRB"
                value={formik.values.medicine}
                error={formik.touched.medicine && formik.errors.medicine}
                name={"medicine"}
                onChange={formik.handleChange}
              />
            </div>
            <SelectionInput
              title={"BF / AF"}
              placeholder={formik.values.before_after_food}
              className={"!h-[50px]"}
              error={
                formik.touched.before_after_food &&
                formik.errors.before_after_food
              }
              onChange={(e) => formik.setFieldValue("before_after_food", e)}
            >
              <div value={""}>-</div>
              <div value={"Before Food"}>Before Food</div>
              <div value={"After Food"}>After Food</div>
            </SelectionInput>
            <SelectionInput
              title={"Morning"}
              placeholder={"Select"}
              value={getUnitLabel(formik.values?.medicine_type , formik.values?.morning)}
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
              placeholder={"Select"}
              value={getUnitLabel(formik.values?.medicine_type ,formik.values?.afternoon)}
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
              placeholder={"Select"}
              value={getUnitLabel(formik.values?.medicine_type ,formik.values?.evening)}
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
              placeholder={"Select"}
              value={getUnitLabel(formik.values?.medicine_type ,formik.values?.night)}
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
            {/* <SelectionInput
              title={"Days"}
              placeholder={"Select"}
              className={"!h-[50px]"}
              error={formik.touched.days && formik.errors.days}
              onChange={(e) => formik.setFieldValue("days", e)}
            >
              <div value={"1"}>1</div>
              <div value={"2"}>2</div>
              <div value={"3"}>3</div>
              <div value={"4"}>4</div>
              <div value={"5"}>5</div>
            </SelectionInput> */}
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
              loading={loading}
              type={"primary"}
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

// const SelectionInput = ({ title, divs, placeholder }) => {
//   return (
//     <div className="relative grid grid-flow-row">
//       <label className="text-darkgrey text-bodyRB mb-2">{title}</label>
//       <select
//         name=""
//         className="rounded-15 border-2 p-2 h-[50px] appearance-none bg-transparent pl-5 pr-8 text-darkgrey text-bodyRB"
//         id=""
//       >
//         <div
//           value=""
//           disabled
//           selected
//           hidden
//           className="text-greyedtext opacity-10"
//         >
//           {placeholder}
//         </div>
//         <div value="" className="">
//           {divs}
//         </div>
//       </select>
//       <div className="absolute inset-y-0 right-2 top-10 flex items-center pr-2 pointer-events-none rotate-90">
//         <Arrow />
//       </div>
//     </div>
//   );
// };

export default AddMedicines;
