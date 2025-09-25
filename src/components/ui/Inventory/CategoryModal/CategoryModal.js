import React, { useState } from "react";
import InputBox from "../../../common/input/InputBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectionInput from "../../../common/input/Select";
import Button from "../../../common/buttons/Button";
import SearchInput from "../../../common/search";
import CategoryModalTable from "./CategoryModalTable";
import FullScreeeSpinner from "../../../common/loading/FullScreee";
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
const categoryTableData = [
  {
    slNo: 1,
    categoryCode: "123",
    categoryName: "medicine",
  },
  {
    slNo: 2,
    categoryCode: "456",
    categoryName: "electronics",
  },
  {
    slNo: 3,
    categoryCode: "789",
    categoryName: "clothing",
  },
  {
    slNo: 4,
    categoryCode: "101",
    categoryName: "books",
  },
  {
    slNo: 5,
    categoryCode: "202",
    categoryName: "toys",
  },
];

const CategoryModal = () => {
  const [loading, setLoading] = useState(false)

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
      <div className=" md:col-span-1 col-span-4">
        <SearchInput
          handleChange={(e) => {
            // setSearchKey(e);
          }}
          // searchKey={searchKey}
          placeholder={"Search by Category Code / Name"}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <FullScreeeSpinner />
        </div>
      ) : (
        // {/* List Table */}
        <CategoryModalTable
        //  treatmentsData={treatmentsData} 
         />
      )}
        <div className="grid grid-cols-2 ">
            <div className="grid grid-cols-2 gap-3 mt-3 col-start-2">
              <div>
                <Button
                  action={"button"}
                  // onClick={modalHandler}
                  type={"secondary"}
                >
                  Cancel
                </Button>
              </div>
              <div>
                <Button
                  loading={loading}
                  // onClick={handleCustomSubmit}
                  action={"button"}
                  type={"primary"}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
      </div>
      
    </div>
  );
};

export default CategoryModal;
