import React from "react";
import InputBox from "../../../../../../../common/input/InputBox";
import RedClose from "../../../../../../../icons/Red-Close";
import Button from "../../../../../../../common/buttons/Button";
import SelectionInput from "../../../../../../../common/input/Select";
import DatePicker from "../../../../../../../common/datepicker/DatePicker";

const Invoice = ({ formik, addRow, removeRow, treatments }) => {
  const handleInputChange = (index, event) => {
    try {
      const inputValue = parseFloat(event?.target?.value) || 0;

      if (isNaN(inputValue)) {
        console.error("Input value is not a valid number");
        return;
      }

      // Update the amounts array with the new input value
      const updatedAmounts = formik.values.invoice.treatment_done_info.map(
        (item, i) => (i === index ? inputValue : item.amount)
      );

      // Calculate the total amount
      const newTotalAmount = updatedAmounts.reduce(
        (acc, amount) => acc + parseFloat(amount),
        0
      );

      if (!isNaN(newTotalAmount)) {
        // Set the new total amount to formik
        formik.setFieldValue("invoice.total_amount", newTotalAmount);
      } else {
        console.error("Total amount is not a valid number");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveRow = (index) => {
    // Remove the row from the formik values
    const updatedTreatmentInfo = [...formik.values.invoice.treatment_done_info];
    updatedTreatmentInfo.splice(index, 1);
    try {
      // Recalculate the total amount
      const newTotalAmount = updatedTreatmentInfo?.reduce(
        (acc, item) => acc + parseFloat(item.amount),
        0
      );

      if (!isNaN(newTotalAmount)) {
        // Set the updated treatment info and total amount to formik
        formik.setFieldValue("invoice.total_amount", newTotalAmount);
      } else {
        console.error("Total amount is not a valid number");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="">
        <div className="w-full bg-secondary h-[55px] rounded-tl-15 rounded-tr-15 mb-2 flex items-center  pl-5">
          <h1 className="text-bodyBB text-darkgrey">Invoice</h1>
        </div>
        <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px] ">
          <div className="lg:flex p-2 lg:p-0  overflow-auto lg:overflow-visible">
            {/* <div className="w-full border absolute top-10"></div> */}
            <table className=" w-screen md:w-full border-separate  min-w-max ">
              <thead className="">
                <tr>
                  <th className="border-b pb-2 text-bodyBB text-darkgrey h-[35px]">
                    Sl No
                  </th>
                  <th className="border-b pb-2 text-bodyBB text-darkgrey">
                    Service / Treatment
                  </th>
                  <th className="border-b pb-2 text-bodyBB text-darkgrey">
                    Amount
                  </th>
                  <th className="border-b pb-2 text-bodyBB text-darkgrey"></th>
                  <th className="border-b pb-2 text-bodyBB text-darkgrey"></th>
                </tr>
              </thead>
              <tbody>
                {formik?.values?.invoice?.treatment_done_info?.map(
                  (item, index) => (
                    <tr className="" key={index}>
                      <td className="text-center p-2 text-bodyRB text-darkgrey">
                        {index + 1}
                      </td>
                      <td className="">
                        <SelectionInput
                          className={"h-[45px]"}
                          placeholder={
                            formik?.values?.invoice.treatment_done_info?.[index]
                              ?.name
                          }
                          error={
                            formik?.touched?.invoice?.treatment_done_info?.[
                              index
                            ]?.name &&
                            formik?.errors?.invoice?.treatment_done_info?.[
                              index
                            ]?.name
                          }
                          onChange={(e) => {
                            formik.setFieldValue(
                              `invoice.treatment_done_info.${index}.name`,
                              e
                            );
                            /** Auto fill date */
                            formik.setFieldValue(`invoice.date`, new Date());
                          }}
                        >
                          {treatments.map((treatment, index) => (
                            <div key={index} value={treatment.name}>
                              {treatment.name}
                            </div>
                          ))}
                        </SelectionInput>
                      </td>
                      <td className="p-2 !w-[78px]">
                        <InputBox
                          className={"h-[45px] !w-[78px]"}
                          name={`invoice.treatment_done_info.${index}.amount`}
                          value={item.amount}
                          onChange={(e) => {
                            formik.handleChange(e);
                            handleInputChange(index, e);
                          }}
                          error={
                            formik.touched?.invoice?.treatment_done_info?.[
                              index
                            ]?.amount &&
                            formik.errors?.invoice?.treatment_done_info?.[index]
                              ?.amount
                          }
                        />
                      </td>
                      <td>
                        <div
                          onClick={() => {
                            removeRow(index);
                            handleRemoveRow(index);
                          }}
                        >
                          <RedClose />
                        </div>
                      </td>

                      <td className=" w-[100px]">
                        {index ===
                          formik.values.invoice.treatment_done_info.length -
                            1 && (
                          <Button
                            onClick={addRow}
                            type={"secondary"}
                            className={"py-[8px] text-bodyBB"}
                          >
                            Add row
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="lg:border-r mr-1"></div>
            <div className="pb-6 pr-1">
              <div className="flex gap-2 items-center">
                <div className="text-center w-[200px]">
                  <p className="text-bodyBB text-darkgrey mb-8 pt-2">
                    Invoice Date
                  </p>
                  <div className="">
                    <DatePicker
                      className={"!h-[46px]"}
                      startDate={formik?.values?.invoice?.date}
                      onDateChange={(e) =>
                        formik.setFieldValue(`invoice.date`, e)
                      }
                      error={
                        formik.touched?.invoice?.date &&
                        formik.errors?.invoice?.date
                      }
                    />
                  </div>
                </div>
                <div className="text-center  w-[200px]">
                  <p className="text-bodyBB text-darkgrey mb-8 pt-2">
                    Total Amount
                  </p>
                  <div className="w-full text-heading2B p-3 bg-[#6AB483] bg-opacity-[40%] rounded-15 ">
                    ₹{formik.values?.invoice?.total_amount}
                  </div>
                </div>
              </div>
              {/* <div className="flex items-center gap-2 mt-2 pl-2">
                <InputBox
                  type="checkbox"
                  className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                />
                <p className="text-bodyRB text-darkgrey">
                Mark this as NO BILL
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
