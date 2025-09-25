import React, { useEffect, useState } from "react";
import SelectionInput from "../../../../../common/input/Select";
import InputBox from "../../../../../common/input/InputBox";
import RedClose from "../../../../../icons/Red-Close";
import Button from "../../../../../common/buttons/Button";
import { getAllTreatments } from "../../../../../../api/settings/Treatment/treatment";
import InputBoxSelect from "../../../../../common/input/InputBoxSelect";
import ArrowBackward from "../../../../../icons/ArrowBackward";
import { useSelector } from "react-redux";

const ServiceTreatmentInfo = ({ formik, addRow, removeRow, edit }) => {
  const [treatments, setTreatments] = useState([]);
  const [search, setSearch] = useState("");
  const currentUser = useSelector((state) => state.auth);

  const getTreatments = () => {
    getAllTreatments(search)
      .then((response) => {
        setTreatments(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  useEffect(() => {
    getTreatments();
  }, [search]);

  const handleInputChange = (index, event) => {
    try {
      const inputValue = parseFloat(event?.target?.value) || 0;

      if (isNaN(inputValue)) {
        console.error("Input value is not a valid number");
        return;
      }
      // Calculate the total amount
      const updatedAmounts = formik.values.treatment_done_info.map((item, i) =>
        i === index ? inputValue : parseFloat(item.amount) || 0
      );

      const newTotalAmount = updatedAmounts.reduce(
        (acc, amount) => acc + parseFloat(amount),
        0
      );
      const discountedTotal =
        parseFloat(newTotalAmount) - (parseFloat(formik.values?.discount) || 0);

      if (!isNaN(newTotalAmount)) {
        /** Set to formik */
        formik.setFieldValue("treatment_amount", newTotalAmount);
        formik.setFieldValue("total_amount", discountedTotal);
        const newBalance =
          parseFloat(newTotalAmount) - formik?.values?.paymentIn?.amountPaid;
        formik.setFieldValue("balance", newBalance);
      } else {
        console.error("Total amount is not a valid number");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /** Treatment quantity change handler */
  const handleQuantityChange = async (index, event) => {
    // Input validation
    if (!event || typeof event !== "number" || event < 1) {
      console.error("Invalid input data");
      return;
    }
    const newQuantity = event;
    /** */
    const treatment = formik.values?.treatment_done_info?.[index] || [];
    const newTreatmentTotal = treatment.actualAmount * newQuantity;

    /** Set quantity value on formik */
    formik.setFieldValue(`treatment_done_info.${index}.quantity`, newQuantity);
    /** Set quantity value on formik end */

    /** Set quantity value on formik */
    formik.setFieldValue(
      `treatment_done_info.${index}.amount`,
      newTreatmentTotal
    );
    /** Set quantity value on formik end */
    const values = {
      target: {
        value: treatment.amount,
        quantity: newQuantity,
      },
    };

    handleInputChange(index, values);
  };
  /** Treatment quantity change handler end*/

  return (
    <div className="shadow-card rounded-15 ">
      <div
        className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 text-bodyBB text-darkgrey mb-2 `}
      >
        Service / Treatment Info
      </div>
      <div className=" overflow-auto lg:max-h-[300px] overflow-y-auto">
        <table className=" w-screen md:w-full border-separate border-spacing-y-1 min-w-max ">
          <thead className="">
            <tr>
              <th className="border-b pb-2 text-bodyBB text-darkgrey h-[50px]">
                Sl No
              </th>
              <th className="border-b pb-2 text-bodyBB text-darkgrey">
                Service / Treatment
              </th>
              {currentUser.treatment_qty && (
                <th className="border-b pb-2 text-bodyBB text-darkgrey">Qty</th>
              )}
              <th className="border-b pb-2 text-bodyBB text-darkgrey">
                Amount
              </th>
              <th className="border-b pb-2 text-bodyBB text-darkgrey"></th>
              <th className="border-b pb-2 text-bodyBB text-darkgrey"></th>
            </tr>
          </thead>
          <tbody>
            {formik?.values?.treatment_done_info?.map((item, index) => (
              <tr className="" key={index}>
                <td className="text-center p-2 text-bodyRB text-darkgrey">
                  {index + 1}
                </td>
                <td className="">
                  <InputBoxSelect
                    value={formik?.values?.treatment_done_info?.[index]?.name}
                    error={
                      formik?.touched?.treatment_done_info?.[index]?.name &&
                      formik?.errors?.treatment_done_info?.[index]?.name
                    }
                    className={"!h-[45px]"}
                    /** For capturing the selection */
                    onChange={(e) => {
                      setSearch("");
                      formik.setFieldValue(
                        `treatment_done_info.${index}.name`,
                        e.name
                      );
                      formik.setFieldValue(
                        `treatment_done_info.${index}.amount`,
                        e.amount
                      );
                      formik.setFieldValue(
                        `treatment_done_info.${index}.actualAmount`,
                        e.amount
                      );
                      const event = {
                        target: {
                          value: e.amount,
                          quantity: e?.quantity,
                        },
                      };
                      handleInputChange(index, event);
                    }}
                    arrowIcon={true}
                    /** For capturing the input text */
                    handleInputChange={(e) => {
                      setSearch(e.target?.value);
                      formik.setFieldValue(
                        `treatment_done_info.${index}.name`,
                        e.target?.value
                      );
                    }}
                  >
                    {treatments?.map((treatment, index) => (
                      <div
                        key={index}
                        value={{
                          name: treatment.name,
                          amount: treatment.charges,
                          quantity: treatment?.quantity,
                        }}
                      >
                        {treatment.name}
                      </div>
                    ))}
                  </InputBoxSelect>
                </td>
                {currentUser.treatment_qty && (
                  <td className={`p-2 !w-[78px]`}>
                    <InputBox
                      className={"h-[45px] !w-[78px]"}
                      disabled={true}
                      name={`treatment_done_info.${index}.quantity`}
                      value={item?.quantity}
                      type={"number"}
                      customUi={
                        <div className="w-5  h-10 grid items-center mt-[2px] mr-1 bg-white rounded-15">
                          <div
                            onClick={() => {
                              const value = !isNaN(item?.quantity + 1)
                                ? item?.quantity + 1
                                : 1;
                              handleQuantityChange(index, value);
                            }}
                            className="w-4 h-4 rotate-[90deg] rounded-full flex items-center justify-center cursor-pointer"
                          >
                            <ArrowBackward />
                          </div>
                          <div
                            onClick={() => {
                              const value =
                                !isNaN(item?.quantity - 1) &&
                                item.quantity - 1 > 1
                                  ? item?.quantity - 1
                                  : 1;
                              handleQuantityChange(index, value);
                            }}
                            className="w-4 h-4  rotate-[270deg] rounded-full flex items-center justify-center cursor-pointer"
                          >
                            <ArrowBackward />
                          </div>{" "}
                        </div>
                      }
                    />
                  </td>
                )}
                <td className="p-1 !w-[78px]">
                  <InputBox
                    className={"h-[45px] !w-[78px]"}
                    name={`treatment_done_info.${index}.amount`}
                    type={"number"}
                    value={item.amount}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleInputChange(index, e);
                    }}
                    error={
                      formik.touched.treatment_done_info?.[index]?.amount &&
                      formik.errors.treatment_done_info?.[index]?.amount
                    }
                  />
                </td>
                <td>
                  <div onClick={() => removeRow(index)}>
                    <RedClose />
                  </div>
                </td>
                <td className="pr-5 xl:pr-1">
                  {index === formik.values.treatment_done_info.length - 1 && (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTreatmentInfo;
