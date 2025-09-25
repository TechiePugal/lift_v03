import React, { useEffect } from "react";
import InputBox from "../../../../../common/input/InputBox";
import SelectionInput from "../../../../../common/input/Select";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import RedClose from "../../../../../icons/Red-Close";
import Button from "../../../../../common/buttons/Button";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import { generateRandomId } from "../../../../../../utils/other";
import { formatDate } from "../../../../../../utils/date";
import InputBoxSelect from "../../../../../common/input/InputBoxSelect";
import ArrowBackward from "../../../../../icons/ArrowBackward";
import { useSelector } from "react-redux";

const TreatmentDone = ({
  formik,
  addRow,
  removeRow,
  doctores,
  treatments,
  editData,
  addTreatment,
  setSearchTreatment,
  setSearchDoctors,
}) => {
  const currentUser = useSelector((state) => state.auth);
  /** Function for old treatment tottal */
  const getOldTreatmentTotal = () => {
    const { values, setValues, setFieldValue } = formik;
    const { treatment_done_info, invoice } = values?.treatment_done ?? {};

    /** Getting selected treatments */
    const selectedTreatments =
      treatment_done_info
        ?.map((doneInfo) => {
          const matchingTreatment = treatments.find(
            (treatment) => treatment.name === doneInfo?.name
          );
          return matchingTreatment
            ? {
                id: doneInfo.id,
                quantity: doneInfo?.quantity || 1,
                ...matchingTreatment,
              }
            : null;
        })
        .filter(Boolean) ?? [];
    /** Treatment Total Calculation */
    const totalAmount = selectedTreatments.reduce(
      (sum, treatment) =>
        sum +
        (parseFloat(treatment?.charges) || 0) * (treatment?.quantity || 1),
      0
    );

    /** Creating object to invoice */
    const transformedArray = selectedTreatments.map((item, index) => ({
      name: item?.name || "",
      amount: (item?.charges || 0) * (item?.quantity || 1),
      id: item?.id ? item?.id : generateRandomId(),
      quantity: item?.quantity || 1,
    }));

    if (treatment_done_info) {
      if (transformedArray?.length > 0) {
        setValues({
          ...values,
          invoice: {
            ...formik?.values?.invoice,
            treatment_done_info: transformedArray,
          },
        });
        if (!Number.isNaN(totalAmount)) {
          setFieldValue("invoice.treatment_amount", totalAmount);
          setFieldValue("invoice.total_amount", totalAmount);
        } else {
          console.error("Total amount is not a valid number");
        }
      }
    }
  };
  useEffect(() => {
    getOldTreatmentTotal();
  }, [
    formik.values.treatment_done.treatment_done_info,
    formik.values.treatment_done,
  ]);

  /** Function for old treatment tottal end */

  /** Treatment selection handling */
  const handleInputChange = (index, event) => {
    try {
      // Input validation
      if (
        !event ||
        typeof event !== "object" ||
        typeof event.amount !== "number" ||
        typeof event.id !== "number"
      ) {
        console.error("Invalid input data");
        return;
      }
      /** Calculation of treatment amount */
      const inputValue =
        (parseFloat(event.amount) || 0) * (event?.quantity || 1);
      /** Calculation of treatment amount end */

      if (isNaN(inputValue)) {
        console.error("Input value is not a valid number");
        return;
      }

      const treatmentDoneInfo =
        formik.values?.invoice?.treatment_done_info || [];
      const existingIndex = treatmentDoneInfo.findIndex(
        (item) => item?.id === event?.id
      );

      const invoiceObj = {
        name: event.name,
        amount: inputValue,
        id: event.id,
        quantity: event.quantity || 1,
      };
      const updatedTreatmentDoneInfo =
        existingIndex !== -1
          ? [
              ...treatmentDoneInfo.slice(0, existingIndex),
              invoiceObj,
              ...treatmentDoneInfo.slice(existingIndex + 1),
            ]
          : !treatmentDoneInfo[0]?.name
          ? [invoiceObj, ...treatmentDoneInfo.slice(1)]
          : [...treatmentDoneInfo, invoiceObj];

      // Set the updated values in the formik object
      formik.setValues({
        ...formik.values,
        invoice: {
          ...formik.values.invoice,
          treatment_done_info: updatedTreatmentDoneInfo,
        },
      });
      /** Add treatment name */
      formik.setFieldValue(
        `treatment_done.treatment_done_info.${index}.name`,
        event.name
      );
      /** Add treatment amount */
      formik.setFieldValue(
        `treatment_done.treatment_done_info.${index}.amount`,
        event.amount
      );
    } catch (error) {
      console.log(error);
    }
  };
  /** Treatment selection handling end*/

  /** Treatment quantity change handler */
  const handleQuantityChange = async (index, event) => {
    try {
      // Input validation
      if (!event || typeof event !== "number" || event < 1) {
        console.error("Invalid input data");
        return;
      }
      const newQuantity = event;
      /** */
      const treatment =
        formik.values?.treatment_done?.treatment_done_info?.[index] || [];
      const newTreatmentTotal = treatment.amount * newQuantity;

      /** Treatment done info from invoice */
      const treatmentDoneInfo =
        formik.values?.invoice?.treatment_done_info || [];
      const existingIndex = treatmentDoneInfo.findIndex(
        (item) => item && item.id === treatment?.id
      );

      const invoiceObj = {
        ...treatmentDoneInfo?.[existingIndex],
        amount: newTreatmentTotal,
        quantity: newQuantity,
      };

      const updatedTreatmentDoneInfo = existingIndex !== -1 && [
        ...treatmentDoneInfo.slice(0, existingIndex),
        invoiceObj,
        ...treatmentDoneInfo.slice(existingIndex + 1),
      ];

      // Set the updated invoice values in the formik object
      formik.setValues({
        ...formik.values,
        invoice: {
          ...formik.values.invoice,
          treatment_done_info: updatedTreatmentDoneInfo,
        },
      });

      /** Set quantity value on formik */
      formik.setFieldValue(
        `treatment_done.treatment_done_info.${index}.quantity`,
        newQuantity
      );
      /** Set quantity value on formik end */
    } catch (error) {
      console.error(error);
    }
  };
  /** Treatment quantity change handler end*/

  return (
    <div>
      <div className="">
        <div className="w-full bg-[#E45353] h-[50px] bg-opacity-[20%] rounded-tl-15 rounded-tr-15 mb-1 flex items-center  pl-5 justify-between">
          <h1 className="text-bodyBB text-darkgrey">Treatment Done</h1>
          {editData && addTreatment && (
            <div className="mr-2">
              <DatePicker
                className={"!h-[45px]"}
                startDate={
                  new Date(formatDate(formik.values?.treatment_done?.date))
                }
                onDateChange={(e) => {
                  try {
                    formik.setFieldValue(`treatment_done.date`, formatDate(e));
                  } catch (error) {}
                }}
              />
            </div>
          )}
        </div>
        <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px] lg:overflow-visible overflow-auto pb-3">
          <div className="overflow-auto lg:overflow-visible flex min-w-[800px] border-b-2 ">
            <table className="w-full border-separate border-spacing-y-1 overflow-y-scroll">
              <thead className="border-b">
                <tr className="text-bodyBB text-darkgrey h-10">
                  <th className="sticky left-0 bg-white border-b-2">Teeth</th>
                  {currentUser.treatment_qty && (
                  <th className="sticky left-0 bg-white border-b-2">Qty</th>
                  )}
                  <th className="sticky left-0 bg-white border-b-2">
                    Treatment
                  </th>
                  <th className="sticky left-0 bg-white border-b-2">Doctor</th>
                  <th className="border-b-2"></th>
                  <th className="border-b-2"></th>
                </tr>
              </thead>
              <tbody className="">
                {formik?.values?.treatment_done?.treatment_done_info?.map(
                  (item, index) => (
                    <tr key={index} className="text-center">
                      <td
                        className={`${
                          index ===
                          formik.values?.treatment_done?.treatment_done_info
                            ?.length -
                            1
                            ? ""
                            : "border-b-2"
                        }  bg-white  h-[100px] pl-2`}
                      >
                        <div className="flex justify-center">
                          <FourquadrantBox
                            formik={formik}
                            index={index}
                            disabled={!editData}
                          />
                        </div>
                      </td>
                      {currentUser.treatment_qty && (
                        <td
                        className={`${
                          index ===
                          formik.values?.treatment_done?.treatment_done_info
                            ?.length -
                            1
                            ? ""
                            : "border-b-2"
                        }  bg-white p-2 !w-[78px]`}
                      >
                        <InputBox
                          className={"h-[45px] !w-[78px]"}
                          disabled={true}
                          name={`treatment_done.treatment_done_info.${index}.quantity`}
                          value={item?.quantity || 1}
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
                      <td
                        className={`${
                          index ===
                          formik.values?.treatment_done?.treatment_done_info
                            ?.length -
                            1
                            ? ""
                            : "border-b-2"
                        }  pr-1 w-[250px]`}
                      >
                        <InputBoxSelect
                          placeholder={"select treatment"}
                          disabled={!editData}
                          value={item?.name}
                          className={"h-[45px] "}
                          error={
                            formik?.touched?.treatment_done
                              ?.treatment_done_info?.[index]?.name &&
                            formik?.errors?.treatment_done
                              ?.treatment_done_info?.[index]?.name
                          }
                          /** For capturing the selection */
                          onChange={(e) => {
                            setSearchTreatment("");
                            const payload = {
                              name: e.name,
                              amount: e.amount,
                              quantity: item.quantity,
                            };
                            handleInputChange(index, {
                              ...payload,
                              id: item?.id,
                            });
                          }}
                          arrowIcon={true}
                          /** For capturing the input text */
                          handleInputChange={(e) => {
                            setSearchTreatment(e.target?.value);
                            formik.setFieldValue(
                              `treatment_done.treatment_done_info.${index}.name`,
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
                              }}
                            >
                              {treatment.name}
                            </div>
                          ))}
                        </InputBoxSelect>
                        {/* */}
                      </td>
                      <td
                        className={`${
                          index ===
                          formik.values?.treatment_done?.treatment_done_info
                            ?.length -
                            1
                            ? ""
                            : "border-b-2"
                        }  w-[250px]`}
                      >
                        <InputBoxSelect
                          placeholder={"select doctor"}
                          value={item?.doctor}
                          disabled={!editData}
                          error={
                            formik?.touched?.treatment_done
                              ?.treatment_done_info?.[index]?.doctor &&
                            formik?.errors?.treatment_done
                              ?.treatment_done_info?.[index]?.doctor
                          }
                          className={"h-[45px]"}
                          /** For capturing the selection */
                          onChange={(e) => {
                            setSearchDoctors("");
                            formik.setFieldValue(
                              `treatment_done.treatment_done_info.${index}.doctor`,
                              e
                            );
                          }}
                          arrowIcon={true}
                          /** For capturing the input text */
                          handleInputChange={(e) => {
                            setSearchDoctors(e.target?.value);
                            formik.setFieldValue(
                              `treatment_done.treatment_done_info.${index}.doctor`,
                              e.target?.value
                            );
                          }}
                        >
                          {doctores?.map((doctore, index) => {
                            return (
                              <div
                                key={index}
                                value={doctore.name}
                                className=""
                              >
                                {doctore.name}
                              </div>
                            );
                          })}
                        </InputBoxSelect>
                        {/*  */}
                      </td>
                      <td
                        className={`${
                          index ===
                          formik.values?.treatment_done?.treatment_done_info
                            ?.length -
                            1
                            ? ""
                            : "border-b-2"
                        } `}
                      >
                        <div
                          className="flex justify-center"
                          onClick={() => removeRow(index, item.id)}
                        >
                          <RedClose />
                        </div>
                      </td>
                      <td
                        className={`${
                          index ===
                          formik.values?.treatment_done?.treatment_done_info
                            ?.length -
                            1
                            ? ""
                            : "border-b-2"
                        } `}
                      >
                        <div className="flex items-center">
                          {index ===
                            formik.values?.treatment_done?.treatment_done_info
                              ?.length -
                              1 && (
                            <div className="w-[100px]">
                              <Button
                                action={"button"}
                                onClick={addRow}
                                type={"secondary"}
                                className={"!py-[8px] text-bodyBB"}
                              >
                                Add row
                              </Button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="border-r"></div>

            <div>
              <div className="pb-2 w-[250px]">
                <p className="text-bodyBB text-darkgrey mb-7 pt-4  border-b-2 pb-1.5 text-center">
                  Notes
                </p>
                <div className="pr-2 pl-2">
                  <TextAreaBox
                    disabled={!editData}
                    className={""}
                    name={`treatment_done.notes`}
                    value={formik?.values?.treatment_done?.notes}
                    onChange={formik?.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FourquadrantBox = ({
  type,
  onChange,
  value,
  name,
  placeholder,
  error,
  className,
  formik,
  index,
  disabled,
}) => {
  console.log({ formik }, "qq");
  return (
    <div className="flex">
      <div className="">
        <InputBox
          className={"!w-[72px] !h-[44px] rounded-[10px] text-center"}
          type={""}
          disabled={disabled}
          placeholder={""}
          name={`treatment_done.treatment_done_info.${index}.teeth1`}
          value={
            formik?.values?.treatment_done?.treatment_done_info?.[index]?.teeth1
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.treatment_done_info?.[index]?.teeth1 &&
            formik?.errors?.treatment_done_info?.[index]?.teeth1
          }
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          disabled={disabled}
          type={""}
          placeholder={""}
          name={`treatment_done.treatment_done_info.${index}.teeth3`}
          value={
            formik?.values?.treatment_done?.treatment_done_info?.[index]?.teeth3
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.treatment_done_info?.[index]?.teeth3 &&
            formik?.errors?.treatment_done_info?.[index]?.teeth3
          }
        />
      </div>
      <div>
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={""}
          disabled={disabled}
          placeholder={""}
          name={`treatment_done.treatment_done_info.${index}.teeth2`}
          value={
            formik?.values?.treatment_done?.treatment_done_info?.[index]?.teeth2
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.treatment_done_info?.[index]?.teeth2 &&
            formik?.errors?.treatment_done_info?.[index]?.teeth2
          }
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={""}
          disabled={disabled}
          placeholder={""}
          name={`treatment_done.treatment_done_info.${index}.teeth4`}
          value={
            formik?.values?.treatment_done?.treatment_done_info?.[index]?.teeth4
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.treatment_done_info?.[index]?.teeth4 &&
            formik?.errors?.treatment_done_info?.[index]?.teeth4
          }
        />
      </div>
      {/* {formik.errors.teeth1 && (
        <p className="text-danger text-smallLB mx-2 my-0.5">{error}</p>
      )} */}
    </div>
  );
};
export default TreatmentDone;
