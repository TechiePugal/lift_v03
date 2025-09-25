import React, { useState } from "react";
import Button from "../../../../../common/buttons/Button";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import InputBox from "../../../../../common/input/InputBox";
import SelectionInput from "../../../../../common/input/Select";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addUtility } from "../../../../../../api/Payment/utilitys";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../../utils/toaster";
import { formatDate, formatToSearchDate } from "../../../../../../utils/date";

const validationSchema = Yup.object().shape({
  utility_date: Yup.string().required("Utility date is required"),
  utility_name: Yup.string().required("Utility name is required"),
  utility_type: Yup.string().required("Utility type is required"),
  utility_amount: Yup.string().required("Utility amount is required").matches(/^[0-9]+$/, "Please enter only numbers"),
  utility_paid_type: Yup.string().required("Paid type is required"),
  utility_next_due_date: Yup.string().required("Next due date is required"),
  utility_remarks: Yup.string().required("Remarks are required"),
});

const AddExpense = ({ getUtilityData, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      utility_date: new Date(),
      utility_name: "",
      utility_type: "",
      utility_amount: "",
      utility_paid_type: "",
      utility_next_due_date: new Date(),
      utility_remarks: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        utility_date: formatDate(values.utility_date),
        utility_next_due_date: formatDate(values.utility_next_due_date),
      };
      setLoading(true);
      addUtility(payload)
        .then((response) => {
          showSuccessToast("Utility Added Successfully");
          getUtilityData();
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
    <div className="md:w-[500px] lg:w-[835px] p-5">
      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid  lg:grid-cols-2 gap-3 w-full -mt-2 mb-2 ">
          <div className="">
            <p className="text-bodyRB text-darkgrey  pt-2">Date</p>
            <div>
              <DatePicker
                startDate={formik.values?.utility_date}
                className={"border-[1.5px] border-[#B9B9B9]"}
                error={
                  formik.touched.utility_date && formik.errors.utility_date
                }
                onDateChange={(e) => formik.setFieldValue("utility_date", e)}
              />
            </div>
          </div>
          <InputBox
            title={"Particulars"}
            placeholder={"Enter Name"}
            className={"h-[54px]"}
            name={"utility_name"}
            // value={formik.values?.utility_name}
            error={formik.touched.utility_name && formik.errors.utility_name}
            onChange={formik.handleChange}
          />
          <SelectionInput
            title={"Type"}
            className={"h-[55px] border-[1.5px] border-[#B9B9B9] shadow-none"}
            placeholder={"Select type"}
            value={formik.values?.utility_type}
            error={formik.touched.utility_type && formik.errors.utility_type}
            onChange={(e) => formik.setFieldValue("utility_type", e)}
          >
            <div value={"Income"}>Income</div>
            <div value={"Expense"}>Expense</div>
          </SelectionInput>
          <InputBox
            title={"Amount"}
            placeholder={"Enter Amount"}
            className={"h-[54px]"}
            name={"utility_amount"}
            value={formik.values?.utility_amount}
            error={
              formik.touched.utility_amount && formik.errors.utility_amount
            }
            onChange={formik.handleChange}
          />
          <SelectionInput
            title={"Mode of Payment"}
            className={
              "h-[55px] border-[1.5px] border-[#B9B9B9] shadow-none capitalize"
            }
            placeholder={"Select Mode of Payment"}
            value={formik.values?.utility_paid_type}
            error={
              formik.touched.utility_paid_type &&
              formik.errors.utility_paid_type
            }
            onChange={(e) => formik.setFieldValue("utility_paid_type", e)}
          >
            <div value={"Cash"}>Cash</div>
            <div value={"Upi"}>Upi</div>
            <div value={"BankTransfer"}>BankTransfer</div>
            <div value={"Card"}>Card</div>
          </SelectionInput>
          <div className="">
            <p className="text-bodyRB text-darkgrey  pt-2">Next Due Date</p>
            <div>
              <DatePicker
                className={"border-[1.5px] border-[#B9B9B9]"}
                startDate={formik.values?.utility_next_due_date}
                error={
                  formik.touched.utility_next_due_date &&
                  formik.errors.utility_next_due_date
                }
                onDateChange={(e) =>
                  formik.setFieldValue("utility_next_due_date", e)
                }
              />
            </div>
          </div>
        </div>
        <TextAreaBox
          title={"Remarks"}
          name={"utility_remarks"}
          error={
            formik.touched.utility_remarks && formik.errors.utility_remarks
          }
          onChange={formik.handleChange}
        />
        <div className="grid grid-cols-3 ">
          <div className="grid grid-flow-col col-start-3 gap-3 mt-3">
            <Button
              action={"button"}
              type={"secondary"}
              className={"text-heading2B "}
              onClick={handleClose}
            >
              Close
            </Button>

            <Button
              loading={loading}
              type={"primary"}
              className={"text-heading2B "}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
