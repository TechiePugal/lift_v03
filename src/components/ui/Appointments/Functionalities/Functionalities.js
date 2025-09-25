import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../../icons/Calendar";
import ArrowBackward from "../../../icons/ArrowBackward";
import ArrowForward from "../../../icons/ArrowForward";
import SelectionInput from "../../../common/input/Select";
import Button from "../../../common/buttons/Button";
import CardView from "../../../icons/CardView";
import ListView from "../../../icons/ListView";
import MultiDatePicker from "../../../common/datepicker/MultiDatePicker";
import dayjs from "dayjs";

const Functionalities = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setStatus,
  createAppointmentClick,
  status,
  setCalendarView,
  calendarView,
  doctors,
  selectedDoctor,
  setSelectedDoctor,
  setCreateAppointmentType,
  createAppointmentType,
  
}) => {
  const getWeeklyStartAndEndDate = () => {
    const start = dayjs().startOf("week").toDate();
    const end = dayjs().endOf("week").toDate();
    return { start, end };
  };

  const getMonthlyStartAndEndDate = () => {
    const start = dayjs().startOf("month").toDate();
    const end = dayjs().endOf("month").toDate();
    return { start, end };
  };
  /** On View Change */
  const handleViewChange = () => {
    console.log(calendarView);
    if (calendarView === "Monthly View" || calendarView === "Weekly View") {
      // setStatus("");
      // setStartDate(new Date());
      // setEndDate(new Date());
      setCalendarView("Calendar View");
    } else {
      const { start, end } = getMonthlyStartAndEndDate();
      setStartDate(start);
      setEndDate(end);
      setCalendarView("Monthly View");
    }
  };

  /** On Status Change */
  const handleFilter = (e) => {
    setStatus(e);
  };
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-2 h-fit select-none">
      {/* show on Weekly View*/}
      {calendarView === "Weekly View" && (
        <>
          {/* Date picker Section */}
          <div className="w-full lg:w-[300px] h-[54px] rounded-15  bg-white shadow-card flex items-center justify-around">
            <MultiDatePicker
              className={"bg-none border-none shadow-none"}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startDate={startDate}
              endDate={endDate}
              hideCalendar={true}
              arrow={true}
            />
          </div>
          {/* Date picker Section End*/}
        </>
      )}

      {/* Not show on Weekly View*/}
      {calendarView === "Calendar View" && (
        <>
          {/* Date picker Section */}
          <div className="w-full lg:w-[300px] h-[54px] rounded-15  bg-white shadow-card flex items-center justify-around">
            <div className="">
              <MultiDatePicker
                className={"bg-none border-none shadow-none"}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </div>
          {/* Date picker Section End*/}
        </>
      )}
      {calendarView === "Monthly View" && (
        <>
          {/* Date picker Section */}
          <div className="w-full lg:w-[300px] h-[54px] rounded-15  bg-white shadow-card flex items-center justify-around">
            <div className="">
              <MultiDatePicker
                className={"bg-none border-none shadow-none"}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate={startDate}
                endDate={endDate}
                arrow={true}
                isMonthly={true}
              />
            </div>
          </div>
          {/* Date picker Section End*/}
        </>
      )}

      {/* All Doctors */}
      <div className="w-full lg:w-[241px] h-[54px] ">
        <SelectionInput
          placeholder={selectedDoctor || "All Doctors"}
          onChange={(e) => setSelectedDoctor(e)}
        >
          <div value="" className="">
            All Doctors
          </div>
          {doctors?.map((doctore, index) => {
            return (
              <div key={index} value={doctore.name} className="">
                {doctore.name}
              </div>
            );
          })}
        </SelectionInput>
      </div>
      {/* All Doctors End*/}

      {/* All Status */}
      {calendarView === "Calendar View" && (
        <div className=" w-full lg:w-[241px] h-[54px] ">
          <SelectionInput
            onChange={handleFilter}
            placeholder={status || "All Status"}
          >
            <div value="" className="">
              All Status
            </div>
            <div value="Upcoming" className="">
              Upcoming
            </div>
            <div value="Check In" className="">
              Check In
            </div>
            <div value="Completed" className="">
              Completed
            </div>
          </SelectionInput>
        </div>
      )}
      {/* calendar Status */}
      {(calendarView === "Monthly View" || calendarView === "Weekly View") && (
        <div className="w-full lg:w-[241px] h-[54px]">
          <SelectionInput
            onChange={(e) => setCalendarView(e)}
            placeholder={calendarView}
          >
            <div
              value="Monthly View"
              onClick={() => {
                const { start, end } = getMonthlyStartAndEndDate();
                setStartDate(start);
                setEndDate(end);
              }}
            >
              Monthly View
            </div>
            <div
              value="Weekly View"
              onClick={() => {
                const { start, end } = getWeeklyStartAndEndDate();
                setStartDate(start);
                setEndDate(end);
              }}
            >
              Weekly View
            </div>
          </SelectionInput>
        </div>
      )}
      {/* All Status End*/}
      {/* Appointment */}
      <div className="w-full lg:w-[450px] h-[51px] mb-10 lg:mb-0 lg:flex">
        <SelectionInput
          placeholder={createAppointmentType}
          className={"lg:rounded-r-none"}
          onChange={(e) => setCreateAppointmentType(e)}
        >
          <div value="Appointment" className="">
            Appointment
          </div>
          <div value="Bulk Appointment" className="">
            Bulk Appointment
          </div>
        </SelectionInput>

        {/* Create */}
        <div className="w-full flex items-center">
          <Button
            type={"primary"}
            onClick={createAppointmentClick}
            className={"lg:rounded-l-none  lg:mt-0"}
          >
            Create <span className="block sm:hidden">Appointment</span>
          </Button>
          <div onClick={handleViewChange} className="hover:cursor-pointer">
            {calendarView === "Calendar View" && <CardView />}
            {(calendarView === "Monthly View" ||
              calendarView === "Weekly View") && <ListView />}
          </div>
        </div>
      </div>
      {/* <div onClick={handleStatusChange} className="hover:cursor-pointer lg:mt-0 mt-5 flex w-full lg:w-fit justify-end lg:flex-none">
        {status === "All Status" && <CardView />}
        {status === "Calendar View" && <ListView />}
      </div> */}
      {/* Appointment End*/}
    </div>
  );
};

export default Functionalities;
