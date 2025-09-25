import React, { useEffect, useState } from "react";
import SelectionInput from "../../../../../common/input/Select";
import InputBox from "../../../../../common/input/InputBox";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import RedClose from "../../../../../icons/Red-Close";
import Button from "../../../../../common/buttons/Button";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import dayjs from "dayjs";
import { formatDate } from "../../../../../../utils/date";
import InputBoxSelect from "../../../../../common/input/InputBoxSelect";

const UpcomingTreatment = ({
  formik,
  addRow,
  removeRow,
  doctores,
  treatments,
  editTreatment,
  editData,
  setSearchTreatment,
  setSearchDoctors,
}) => {
  const timeFunction = (data) => {
    try {
      // Parse the railway time using Day.js
      const parsedDate = dayjs(`2023-01-01 ${data}`, {
        format: "YYYY-MM-DD HH:mm",
      });

      // Format the time with AM/PM
      const formattedTime = parsedDate.format("hh:mm A");
      return formattedTime !== "Invalid Date" ? formattedTime : "";
    } catch (error) {
      console.log(error);
    }
  };
  const timeString = timeFunction(
    formik?.values?.next_treatment?.appointment_time
  );
  const [time, amorpm] = timeString?.split(" ");
  const [hr, minutes] = time?.split(":");

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [amPm, setAmPm] = useState("AM");

  useEffect(() => {
    if (editTreatment) {
      hr && setHour(hr);
      minutes && setMinute(minutes);
      amorpm && setAmPm(amorpm);
    }
  }, []);

  const handleHourChange = (event) => {
    const newHour = event.target.value;

    // Check if newHour is a number between 0 and 12
    if (!isNaN(newHour) && newHour >= 0 && newHour <= 12) {
      setHour(newHour);
    } else {
      // Handle invalid input (e.g., show an error message)
      console.error(
        "Invalid hour input. Please enter a number between 0 and 12."
      );
    }
  };

  const handleMinuteChange = (event) => {
    const newMinute = event.target.value;

    // Check if newMinute is a number between 0 and 59
    if (!isNaN(newMinute) && newMinute >= 0 && newMinute <= 59) {
      setMinute(newMinute);
    } else {
      // Handle invalid input (e.g., show an error message)
      console.error(
        "Invalid minute input. Please enter a number between 0 and 59."
      );
    }
  };
  const handleAmPmChange = (event) => {
    setAmPm(event);
  };
  const getRailwayTime = () => {
    let railwayHour = parseInt(hour, 10);

    // Convert to 24-hour format
    if (amPm === "PM" && railwayHour !== 12) {
      railwayHour += 12;
    } else if (amPm === "AM" && railwayHour === 12) {
      railwayHour = 0;
    }

    // Add leading zeros if necessary
    const formattedHour = railwayHour?.toString()?.padStart(2, "0");
    const formattedMinute = minute?.padStart(2, "0");

    return `${formattedHour}:${formattedMinute}`;
  };

  // Update the Formik field
  useEffect(() => {
    const railwayTime = getRailwayTime();
    if (hour && minute && amPm) {
      formik.setFieldValue("next_treatment.appointment_time", railwayTime);
    }
  }, [hour, minute, amPm]);

  return (
    <div>
      <div className="">
        <div className="w-full bg-[#F2F496] h-[55px] bg-opacity-[50%] rounded-tl-15 rounded-tr-15 mb-2 flex items-center  pl-5">
          <h1 className="text-bodyBB text-darkgrey">Upcoming treatment</h1>
        </div>
        <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px] lg:overflow-visible overflow-auto">
          <div className="">
            <div className="overflow-auto lg:overflow-visible flex min-w-[800px] border-b-2">
              <table className="w-full border-separate  overflow-y-scroll">
                <thead className="border-b">
                  <tr className="text-bodyBB text-darkgrey h-10">
                    <th className="sticky left-0 bg-white border-b-2">Teeth</th>
                    <th className="sticky left-0 bg-white border-b-2">
                      Treatment
                    </th>
                    <th className="border-b-2"></th>
                    <th className="border-b-2"></th>
                  </tr>
                </thead>
                <tbody className="">
                  {formik?.values?.next_treatment?.next_treatment_info?.map(
                    (item, index) => (
                      <tr key={index} className="text-center">
                        <td
                          className={`${
                            index ===
                            formik.values?.next_treatment?.next_treatment_info
                              .length -
                              1
                              ? ""
                              : "border-b-2"
                          } bg-white  h-[100px]`}
                        >
                          <div className="flex justify-center">
                            <FourquadrantBox
                              formik={formik}
                              index={index}
                              disabled={!editData}
                            />
                          </div>
                        </td>
                        <td
                          /** For avoiding double border */
                          className={`${
                            index ===
                            formik.values?.next_treatment?.next_treatment_info
                              .length -
                              1
                              ? ""
                              : "border-b-2"
                          }  pr-4 min-w-[200px]`}
                        >
                          <InputBoxSelect
                            placeholder={"select treatment"}
                            disabled={!editData}
                            value={item?.name}
                            className={"h-[45px] "}
                            error={
                              formik?.touched?.next_treatment
                                ?.next_treatment_info?.[index]?.name &&
                              formik?.errors?.next_treatment
                                ?.next_treatment_info?.[index]?.name
                            }
                            /** For capturing the selection */
                            onChange={(e) => {
                              setSearchTreatment("");
                              formik.setFieldValue(
                                `next_treatment.next_treatment_info.${index}.name`,
                                e
                              );
                            }}
                            arrowIcon={true}
                            /** For capturing the input text */
                            handleInputChange={(e) => {
                              setSearchTreatment(e.target?.value);
                              formik.setFieldValue(
                                `next_treatment.next_treatment_info.${index}.name`,
                                e.target?.value
                              );
                            }}
                          >
                            {treatments.map((treatment, index) => (
                              <div key={index} value={treatment.name}>
                                {treatment.name}
                              </div>
                            ))}
                          </InputBoxSelect>
                          {/* */}
                        </td>
                        <td
                          className={`${
                            index ===
                            formik.values?.next_treatment?.next_treatment_info
                              .length -
                              1
                              ? ""
                              : "border-b-2"
                          }`}
                        >
                          <div
                            className="flex justify-center"
                            onClick={() => removeRow(index)}
                          >
                            <RedClose />
                          </div>
                        </td>
                        <td
                          className={`${
                            index ===
                            formik.values?.next_treatment?.next_treatment_info
                              .length -
                              1
                              ? ""
                              : "border-b-2"
                          }`}
                        >
                          <div className="flex items-center">
                            {index ===
                              formik.values?.next_treatment?.next_treatment_info
                                .length -
                                1 && (
                              <div className="w-[100px]">
                                <Button
                                  onClick={addRow}
                                  action={"button"}
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
              <div className="pb-2 w-[320px]">
                <p className="text-bodyBB text-darkgrey  mb-7 pt-3.5  border-b-2 pb-1.5 text-center">
                  Notes
                </p>
                <div className="pr-2 pl-2">
                  <TextAreaBox
                    disabled={!editData}
                    className={""}
                    name={`next_treatment.notes`}
                    value={formik?.values?.next_treatment?.notes}
                    onChange={formik?.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex lg:flex-wrap mt-1  lg:justify-around sticky left-0 grid grid-col-2 lg:grid-cols-4 gap-2 lg:justify-items-center pl-5 pr-5 pb-2 md:items-center">
            <div className="lg:w-[250px]">
              <p className="text-bodyBB text-darkgrey mb-1 ">Doctor</p>
              <div>
                <InputBoxSelect
                  placeholder={"select doctor"}
                  value={formik.values?.next_treatment?.doctor}
                  disabled={!editData}
                  error={
                    formik?.touched?.next_treatment?.doctor &&
                    formik?.errors?.next_treatment?.doctor
                  }
                  className={"h-[45px]"}
                  /** For capturing the selection */
                  onChange={(e) => {
                    setSearchDoctors("");
                    formik.setFieldValue(`next_treatment.doctor`, e);
                  }}
                  arrowIcon={true}
                  /** For capturing the input text */
                  handleInputChange={(e) => {
                    setSearchDoctors(e.target?.value);
                    formik.setFieldValue(
                      `next_treatment.doctor`,
                      e.target?.value
                    );
                  }}
                >
                  {doctores?.map((doctore, index) => {
                    return (
                      <div key={index} value={doctore.name} className="">
                        {doctore.name}
                      </div>
                    );
                  })}
                </InputBoxSelect>
                {/*  */}
              </div>
            </div>
            <div className=" ">
              <p className="text-bodyBB text-darkgrey mb-1 ">Date</p>
              <div>
                <DatePicker
                  className={"!h-[45px]"}
                  disabled={!editData}
                  startDate={
                    new Date(
                      formatDate(
                        formik.values?.next_treatment?.appointment_date
                      )
                    )
                  }
                  onDateChange={(e) => {
                    try {
                      formik.setFieldValue(
                        `next_treatment.appointment_date`,
                        e
                      );
                    } catch (error) {}
                  }}
                  error={
                    formik?.touched?.next_treatment?.appointment_date &&
                    formik?.errors?.next_treatment?.appointment_date
                  }
                />
              </div>
            </div>
            <div className="">
              <p className="text-bodyBB text-darkgrey mb-1 ">Set Time</p>
              <div className="flex  gap-2 ">
                <InputBox
                  disabled={!editData}
                  className={"w-[70px] h-[45px] text-center"}
                  type={"number"}
                  placeholder={"hh"}
                  onChange={handleHourChange}
                  value={parseInt(hour, 10)}
                  error={
                    formik.touched?.next_treatment?.appointment_time &&
                    formik.errors?.next_treatment?.appointment_time
                  }
                />
                <InputBox
                  disabled={!editData}
                  className={"w-[70px] h-[45px] text-center"}
                  type={"number"}
                  placeholder={"mm"}
                  onChange={handleMinuteChange}
                  value={minute}
                  error={
                    formik.touched?.next_treatment?.appointment_time &&
                    formik.errors?.next_treatment?.appointment_time
                  }
                />
                <SelectionInput
                  disabled={!editData}
                  onChange={(e) => handleAmPmChange(e)}
                  className={"!w-[100px] h-[45px]"}
                  placeholder={amPm}
                  error={
                    formik.touched?.next_treatment?.appointment_time &&
                    formik.errors?.next_treatment?.appointment_time
                  }
                >
                  <div value="AM">AM</div>
                  <div value="PM">PM</div>
                </SelectionInput>
              </div>
            </div>
            {/* <div className=" lg:pl-4 pb-2 lg:pr-4">
              <p className="text-bodyBB text-darkgrey mb-2">Notes</p>
              <div className="">
                <TextAreaBox
                  disabled={!editData}
                  className={""}
                  name={`next_treatment.notes`}
                  value={formik?.values?.next_treatment?.notes}
                  onChange={formik?.handleChange}
                />
              </div>
            </div> */}
          </div>
          <div></div>
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
  return (
    <div className="flex">
      <div className="">
        <InputBox
          className={"!w-[72px] !h-[44px] rounded-[10px] text-center"}
          type={""}
          disabled={disabled}
          placeholder={""}
          name={`next_treatment.next_treatment_info.${index}.teeth1`}
          value={
            formik?.values?.next_treatment?.next_treatment_info?.[index]?.teeth1
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment?.next_treatment_info?.[index]
              ?.teeth1 &&
            formik?.errors?.next_treatment?.next_treatment_info?.[index]?.teeth1
          }
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          disabled={disabled}
          type={""}
          placeholder={""}
          name={`next_treatment.next_treatment_info.${index}.teeth3`}
          value={
            formik?.values?.next_treatment?.next_treatment_info?.[index]?.teeth3
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment?.next_treatment_info?.[index]
              ?.teeth3 &&
            formik?.errors?.next_treatment?.next_treatment_info?.[index]?.teeth3
          }
        />
      </div>
      <div>
        <InputBox
          disabled={disabled}
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={""}
          placeholder={""}
          name={`next_treatment.next_treatment_info.${index}.teeth2`}
          value={
            formik?.values?.next_treatment?.next_treatment_info?.[index]?.teeth2
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment?.next_treatment_info?.[index]
              ?.teeth2 &&
            formik?.errors?.next_treatment?.next_treatment_info?.[index]?.teeth2
          }
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          disabled={disabled}
          type={""}
          placeholder={""}
          name={`next_treatment.next_treatment_info.${index}.teeth4`}
          value={
            formik?.values?.next_treatment?.next_treatment_info?.[index].teeth4
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment?.next_treatment_info?.[index]
              ?.teeth4 &&
            formik?.errors?.next_treatment?.next_treatment_info?.[index]?.teeth4
          }
        />
      </div>
      {/* {formik.errors.teeth1 && (
        <p className="text-danger text-smallLB mx-2 my-0.5">{error}</p>
      )} */}
    </div>
  );
};

export default UpcomingTreatment;
