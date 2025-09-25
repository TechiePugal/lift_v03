import React from "react";
import InputBox from "../../../common/input/InputBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectionInput from "../../../common/input/Select";
import Button from "../../../common/buttons/Button";
const validationSchema = Yup.object().shape({
  // medicine: Yup.string().required("Medicine is required"),
  // medicine_type: Yup.string().required("Type is required"),
  // before_after_food: Yup.string().notRequired(),
  // morning: Yup.string().notRequired(),
  // afternoon: Yup.string().notRequired(),
  // evening: Yup.string().notRequired(),
  // night: Yup.string().notRequired(),
  // days: Yup.number().notRequired(),
});

const AddItem = () => {
  const formik = useFormik({
    initialValues: {
      // medicine: "",
      // medicine_type: "",
      // before_after_food: "Before Food",
      // morning: "",
      // afternoon: "",
      // evening: "",
      // night: "",
      // days: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // setLoading(true);
      // addMedicines(values)
      //   .then((response) => {
      //     showSuccessToast("Medicine Added Successfully");
      //     getAllMedicinesData();
      //     handleClose();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     showErrorToast(error, "error");
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
      // console.log(values, "05");
    },
  });

  const handleCategoryDropdown = () => {};
  const handleUomDropdown = () => {};
  return (
    <div className="lg:w-[835px]">
      <div className="lg:pl-[79px] lg:pr-[79px] lg:mb-[40px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid  lg:grid-cols-2 gap-5 w-full mt-2 mb-12">
            <div className="grid grid-flow-row">
              <InputBox
                title={"Item Code"}
                placeholder="Auto generated"
                className=" h-[50px] text-darkgrey text-bodyRB"
                value={formik.values.itemCode}
                error={formik.touched.itemCode && formik.errors.itemCode}
                name={"itemCode"}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid grid-flow-row">
              <InputBox
                title={"Item Name"}
                placeholder="Item Name"
                className=" h-[50px] text-darkgrey text-bodyRB"
                value={formik.values.itemName}
                error={formik.touched.itemName && formik.errors.itemName}
                name={"itemName"}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid grid-flow-row">
              <SelectionInput
                title={"Category"}
                placeholder={"Choose Category"}
                value={formik.values?.category}
                className={"!h-[50px]"}
                error={formik.touched.category && formik.errors.category}
                onChange={(e) => {
                  handleCategoryDropdown(e);
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
                title={"Item Brand"}
                placeholder="Enter Brand"
                className=" h-[50px] text-darkgrey text-bodyRB"
                value={formik.values.brand}
                error={formik.touched.brand && formik.errors.brand}
                name={"brand"}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid grid-flow-row">
              <InputBox
                title={"Model"}
                placeholder="Enter Model"
                className=" h-[50px] text-darkgrey text-bodyRB"
                value={formik.values.model}
                error={formik.touched.model && formik.errors.model}
                name={"model"}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid grid-flow-row">
              <SelectionInput
                title={"Uom"}
                placeholder={"Choose Uom"}
                value={formik.values?.uom}
                className={"!h-[50px]"}
                error={formik.touched.uom && formik.errors.uom}
                onChange={(e) => {
                  handleUomDropdown(e);
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
                title={"Re-order Level"}
                placeholder="Enter Re-order Level"
                className=" h-[50px] text-darkgrey text-bodyRB"
                value={formik.values.rol}
                error={formik.touched.rol && formik.errors.rol}
                name={"rol"}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid grid-flow-row">
              <InputBox
                title={"Selling Price"}
                placeholder="Enter Selling Price"
                className=" h-[50px] text-darkgrey text-bodyRB"
                value={formik.values.sellingPrice}
                error={
                  formik.touched.sellingPrice && formik.errors.sellingPrice
                }
                name={"sellingPrice"}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-2 flex justify-center items-center">
              {/* <Button
              action={"button"}
              // onClick={handleClose}
              type={"secondary"}
              className={"text-heading2B"}
            >
              Close
            </Button> */}
              <div className="col-span-1 flex justify-cente w-1/2">
                <Button
                  // loading={loading}
                  type={"primary"}
                  className={"text-heading2B "}
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
