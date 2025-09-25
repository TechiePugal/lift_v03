import React, { useEffect, useRef, useState } from "react";
import SelectionInput from "../../../../common/input/Select";
import DatePicker from "../../../../common/datepicker/DatePicker";
import InputBox from "../../../../common/input/InputBox";
import Whatsapp from "../../../../icons/Whatsapp";
import SMS from "../../../../icons/SMS";
import Button from "../../../../common/buttons/Button";
import { formatDateToString } from "../../../../../utils/date";
import dayjs from "dayjs";
import InputBoxSelect from "../../../../common/input/InputBoxSelect";

const Schedules = ({
  formik,
  doctors,
  loading,
  handleCreateAppointmentClick,
  appointments,
  setSelectDoctor,
  setSelectedDate,
  editConfirm,
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
      return formattedTime;
    } catch (error) {
      console.log(error);
    }
  };
  const timeString = timeFunction(formik?.values?.appointment_time);
  const [time, amorpm] = timeString?.split(" ");
  const [hr, minutes] = time?.split(":");

  const [hour, setHour] = useState(hr);
  const [minute, setMinute] = useState(minutes);
  const [amPm, setAmPm] = useState(amorpm);

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
    const formattedHour = railwayHour.toString().padStart(2, "0");
    const formattedMinute = minute.padStart(2, "0");

    return `${formattedHour}:${formattedMinute}`;
  };

  // Update the Formik field
  useEffect(() => {
    const railwayTime = getRailwayTime();

    if (hour && minute && amPm) {
      formik.setFieldValue("appointment_time", railwayTime);
    }
  }, [hour, minute, amPm]);
  return (
    <div className="w-[100%] md:w-[750px] lg:w-full overflow-auto">
      <div className="lg:block hidden">
        <table className="w-full border-separate border-spacing-y-1 overflow-y-scroll">
          <thead className="border-b">
            <tr className="text-bodyBB text-darkgrey ">
              <th className="p-1">Select Doctor</th>
              <th className=" left-0 ">Set Date</th>
              <th className=" left-0 ">Set Time</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="text-center ">
              <td className="pr-5 w-[250px]  left-0 bg-white">
                <InputBoxSelect
                  disabled={!editConfirm}
                  placeholder={formik.values?.doctor || "All Doctors"}
                  value={formik.values?.doctor}
                  error={formik.touched?.doctor && formik.errors.doctor}
                  className={"h-[53px]"}
                  /** For capturing the selection */
                  onChange={(e) => {
                    setSearchDoctors("");
                    formik.setFieldValue(`doctor`, e);
                    setSelectDoctor(e);
                  }}
                  arrowIcon={true}
                  /** For capturing the input text */
                  handleInputChange={(e) => {
                    setSearchDoctors(e.target?.value);
                    formik.setFieldValue(`doctor`, e.target?.value);
                  }}
                >
                  <div value={""} className="">
                    All Doctors
                  </div>
                  {doctors?.map((doctore, index) => {
                    return (
                      <div key={index} value={doctore.name} className="">
                        {doctore.name}
                      </div>
                    );
                  })}
                </InputBoxSelect>
                {/*  */}
              </td>
              <td className="pr-5 min-w-[150px]  left-0 bg-white h-[60px]">
                {/* Date picker Section */}
                <div className="">
                  <DatePicker
                    disabled={!editConfirm}
                    onDateChange={(e) => {
                      formik.setFieldValue(
                        "appointment_date",
                        dayjs(e).format("YYYY-MM-DD")
                      );
                      setSelectedDate(dayjs(e).format("YYYY-MM-DD"));
                    }}
                    startDate={
                      new Date(
                        formatDateToString(formik?.values?.appointment_date)
                      )
                    }
                    error={
                      formik?.touched?.appointment_date &&
                      formik?.errors?.appointment_date
                    }
                    minDate={false}
                  />
                </div>
                {/* Date picker Section End*/}
              </td>
              <td className=" w-[160px] bg-white">
                <div className="flex gap-2">
                  <InputBox
                    className={"w-[70px] h-[54px] text-center"}
                    type={"number"}
                    placeholder={"hh"}
                    onChange={handleHourChange}
                    value={parseInt(hour, 10)}
                    disabled={!editConfirm}
                    error={
                      formik?.touched?.appointment_time &&
                      formik?.errors?.appointment_time
                    }
                  />
                  <InputBox
                    className={"w-[70px] h-[54px] text-center"}
                    type={"number"}
                    placeholder={"mm"}
                    onChange={handleMinuteChange}
                    value={minute}
                    disabled={!editConfirm}
                    error={
                      formik?.touched?.appointment_time &&
                      formik?.errors?.appointment_time
                    }
                  />
                </div>
                <div>
                  <p className="text-xs text-danger absolute">
                    {formik.touched.appointments?.appointment_time &&
                      formik.errors.appointments?.appointment_time}
                  </p>
                </div>
              </td>{" "}
              <td className=" left-0 bg-white min-w-[100px]">
                <SelectionInput
                  onChange={(e) => handleAmPmChange(e)}
                  className={" h-[54px]"}
                  disabled={!editConfirm}
                  placeholder={amPm}
                  error={
                    formik?.touched?.appointment_time &&
                    formik?.errors?.appointment_time
                  }
                >
                  <div value="AM">AM</div>
                  <div value="PM">PM</div>
                </SelectionInput>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile View  */}
      <div className="visible lg:hidden grid gap-2">
        <div className="   left-0 bg-white mb-2">
          <p className="text-bodyBB text-darkgrey ">Select Doctor</p>
          <InputBoxSelect
            disabled={!editConfirm}
            placeholder={formik.values?.doctor || "All Doctors"}
            value={formik.values?.doctor}
            error={formik.touched?.doctor && formik.errors.doctor}
            className={"h-[54px]"}
            /** For capturing the selection */
            onChange={(e) => {
              setSearchDoctors("");
              formik.setFieldValue(`doctor`, e);
              setSelectDoctor(e);
            }}
            arrowIcon={true}
            /** For capturing the input text */
            handleInputChange={(e) => {
              setSearchDoctors(e.target?.value);
              formik.setFieldValue(`doctor`, e.target?.value);
            }}
          >
            <div value={""} className="">
              All Doctors
            </div>
            {doctors?.map((doctore, index) => {
              return (
                <div key={index} value={doctore.name} className="">
                  {doctore.name}
                </div>
              );
            })}
          </InputBoxSelect>
        </div>
        <div className="min-w-[150px]  left-0 bg-white mb-2">
          {/* Date picker Section */}
          <p className="text-bodyBB text-darkgrey ">Set Date</p>
          <div className="">
            <DatePicker
              onDateChange={(e) => formik.setFieldValue("appointment_date", e)}
              startDate={
                new Date(formatDateToString(formik?.values?.appointment_date))
              }
              error={
                formik?.touched?.appointment_date &&
                formik?.errors?.appointment_date
              }
            />
          </div>
          {/* Date picker Section End*/}
        </div>
        <p className="text-bodyBB text-darkgrey ">Set Time</p>
        <div className=" grid grid-cols-2 justify-items-center bg-white mb-3">
          <div className="flex gap-2">
            <InputBox
              className={"w-[70px] h-[54px] text-center"}
              type={"number"}
              onChange={handleHourChange}
              placeholder={"hh"}
              value={parseInt(hour, 10)}
              error={
                formik?.touched?.appointment_time &&
                formik?.errors?.appointment_time
              }
            />
            <InputBox
              className={"w-[70px] h-[54px] text-center"}
              type={"number"}
              onChange={handleMinuteChange}
              placeholder={"mm"}
              value={minute}
              error={
                formik?.touched?.appointment_time &&
                formik?.errors?.appointment_time
              }
            />
          </div>
          <div className=" left-0 bg-white min-w-[100px]">
            <SelectionInput
              onChange={(e) => handleAmPmChange(e)}
              className={"w-[100px] h-[54px]"}
              placeholder={amPm}
              error={
                formik?.touched?.appointment_time &&
                formik?.errors?.appointment_time
              }
            >
              <div value="AM">AM</div>
              <div value="PM">PM</div>
            </SelectionInput>
          </div>
        </div>{" "}
      </div>

      {/* Schedules list */}
      {appointments?.length >= 0 && (
        <div className="shadow-card rounded-15 pb-4">
          <div
            className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 text-bodyRB text-darkgrey mb-1 flex items-center gap-1`}
          >
            Scheduled appointments
            <span className="text-bodyBB">{appointments?.length}</span>
          </div>
          <div className="max-h-[200px] overflow-auto">
            <table className="w-full border-separate border-spacing-y-2 overflow-scroll">
              <thead className="border-b">
                <tr className="text-bodyBB text-darkgrey ">
                  <th className="p-3 border-b-2">Sl No</th>
                  <th className=" left-0 bg-white border-b-2">Doctor </th>
                  <th className=" left-0 bg-white border-b-2">Patient Name</th>
                  <th className=" left-0 bg-white border-b-2">Treatment</th>
                  <th className="border-b-2">Appointment Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => {
                  return (
                    <tr key={index} className="text-center h-[40px]">
                      <td className="text-bodyRB border-b-2 ">
                        {appointment?.SI_NO || "-"}{" "}
                      </td>
                      <td className="text-bodyRB border-b-2 ">
                        {appointment?.doctor || "-"}
                      </td>
                      <td className="text-bodyRB border-b-2 ">
                        {appointment?.patient_id?.name || "-"}
                      </td>
                      <td className="text-bodyRB border-b-2 ">
                        {appointment?.next_treatment_info?.[0]?.name}
                      </td>
                      <td className="text-bodyRB border-b-2 ">
                        {`${timeFunction(appointment?.appointment_time)}` ||
                          "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {appointments?.length === 0 && (
              <>
                <div className="capitalize flex justify-center w-full h-10">
                  no appointments
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Schedules list end*/}
    </div>
  );
};

export default Schedules;
