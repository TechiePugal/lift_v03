import React, { useEffect, useRef, useState } from "react";
import SelectionInput from "../../../../common/input/Select";
import DatePicker from "../../../../common/datepicker/DatePicker";
import InputBox from "../../../../common/input/InputBox";
import Whatsapp from "../../../../icons/Whatsapp";
import SMS from "../../../../icons/SMS";
import Button from "../../../../common/buttons/Button";
import CheckMarkWhite from "../../../../icons/CheckMarkWhite";
import { formatDateToString } from "../../../../../utils/date";
import dayjs from "dayjs";

const Schedules = ({
  formik,
  doctores,
  loading,
  handleCreateAppointmentClick,
  appointments,
  editAppointment,
  editData,
}) => {
  const timeFunction = (data) => {
    try{
      // Parse the railway time using Day.js
      const parsedDate = dayjs(`2023-01-01 ${data}`, {
        format: "YYYY-MM-DD HH:mm",
      });
  
      // Format the time with AM/PM
      const formattedTime = parsedDate.format("hh:mm A");
      return formattedTime;
    }catch(error){
      console.log(error, "time function");
    }
  };
  const timeString = timeFunction(editData?.appointment_time);
  const [time, amorpm] = timeString?.split(" ");
  const [hour, minutes] = time?.split(":");





  return (
    <div className="w-[100%] md:w-[750px] lg:w-full overflow-auto">
      <div className="lg:block hidden">
        <table className="w-full border-separate border-spacing-y-1 overflow-y-scroll">
          <thead className="border-b">
            <tr className="text-bodyBB text-darkgrey ">
              <th className="p-1">Doctor</th>
              <th className=" left-0 ">Date</th>
              <th className=" left-0 ">Time</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="text-center">
              <td className="pr-5 w-[250px]  left-0 bg-white">
                <SelectionInput
                  className={"py-2 h-[54px]"}
                  placeholder={editData?.doctor}
                  disabled={true}
                ></SelectionInput>
              </td>
              <td className="pr-5 max-w-[100px]  left-0 bg-white h-[100px]">
                {/* Date picker Section */}
                <div className="">
                  <DatePicker
                    disabled={true}
                    startDate={
                      new Date(formatDateToString(editData?.appointment_date))
                    }
                  />
                </div>
                {/* Date picker Section End*/}
              </td>
              <td className=" w-[160px] bg-white">
                <div className="flex gap-2">
                  <InputBox
                    className={"w-[70px] h-[54px] text-center"}
                    type={"number"}
                    value={parseInt(hour, 10)}
                    disabled={true}
                  />
                  <InputBox
                    className={"w-[70px] h-[54px] text-center"}
                    type={"number"}
                    value={minutes}
                    disabled={true}
                  />
                </div>
                <div></div>
              </td>{" "}
              <td className=" left-0 bg-white min-w-[10px]">
                <SelectionInput
                  disabled={true}
                  className={" h-[54px]"}
                  placeholder={amorpm}
                ></SelectionInput>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="visible lg:hidden grid gap-2">
        <div className="mb-2  left-0 bg-white">
          <p className="text-bodyBB text-darkgrey ">Doctor</p>
          <SelectionInput
            className={"py-2 h-[54px]"}
            placeholder={editData?.doctor}
            disabled={true}
          ></SelectionInput>
        </div>
        <div className="  left-0 bg-white h-[100px]">
          {/* Date picker Section */}
          <p className="text-bodyBB text-darkgrey ">Date</p>

          <div className="">
            <DatePicker
              disabled={true}
              startDate={
                new Date(formatDateToString(editData?.appointment_date))
              }
            />
          </div>
          {/* Date picker Section End*/}
        </div>
        <p className="text-bodyBB text-darkgrey ">Time</p>
        <div className="  grid grid-cols-2 justify-items-center mb-3 bg-white">
          <div className="flex gap-2">
            <InputBox
              className={"w-[70px] h-[54px] text-center"}
              type={"number"}
              value={parseInt(hour, 10)}
              disabled={true}
            />
            <InputBox
              className={"w-[70px] h-[54px] text-center"}
              type={"number"}
              value={parseInt(minutes, 10)}
              disabled={true}
            />
          </div>
          <div className=" left-0 bg-white min-w-[10px]">
            <SelectionInput
              disabled={true}
              className={"w-[100px] h-[54px]"}
              placeholder={amorpm}
            ></SelectionInput>
          </div>
        </div>{" "}
      </div>

      {/* Schedules list */}
      {appointments?.length > 0 && (
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
                  <th className=" left-0 bg-white border-b-2">
                    Treatment
                  </th>
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
                        {` ${timeFunction( appointment?.appointment_time)}` || "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Schedules list end*/}

     
    </div>
  );
};

export default Schedules;
