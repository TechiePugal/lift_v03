import React from "react";
import {
  filterWeeklyAppointments,
  renderWeeks,
} from "../../../../utils/calendar";
import { handle24Time } from "../../../../utils/date";

const WeeklyView = ({
  startDate,
  appointments,
  handleViewAppointment,
  setStartDate,
  setEndDate,
  setCalendarView,
}) => {
  const getDate = (date) => {
    setStartDate(date);
    setEndDate(date);
    setCalendarView("Calendar View");
  };
  return (
    <div className="shadow-card rounded-15">
      <div className="grid grid-cols-7 shadow-card rounded-tl-15 rounded-tr-15 bg-secondary pt-2 pb-2 ">
        {renderWeeks(startDate, getDate)}
      </div>
      {/* Col */}
      <div className="grid grid-cols-7 min-h-[200px] max-h-[55vh] overflow-auto">
        {/* Row */}
        {filterWeeklyAppointments(startDate, appointments).map(
          ({ appointment, date }, appIndex) => (
            <div key={appIndex} className="border">
              {appointment.map((data, index) => (
                <div
                  onClick={() => handleViewAppointment(data)}
                  key={index}
                  className={`rounded-[10px] bg-opacity-[20%] p-2 md:p-4 md:m-2 mt-2  flex flex-col justify-center items-center cursor-pointer  min-w-[40px]
          ${
            data?.status === "Upcoming"
              ? "bg-danger text-danger"
              : data?.status === "Check In"
              ? "text-[#CFBB00] bg-[#F2F496] bg-opacity-[40%]"
              : data?.status === "Completed"
              ? "text-[#6AB483] bg-[#6AB483]"
              : "bg-secondary"
          }`}
                >
                  <p className="text-smallBB mb-[2px]">
                    {handle24Time(data.appointment_time)}
                  </p>
                  <p className="text-center text-smallBB">
                    {data?.patient_id?.name} <br />
                    {/* {data?.treatment_type} */}
                    <div className=" text-smallRB mt-0.5">
                      {data.next_treatment_info
                        .map((obj) => obj?.name)
                        .filter((name) => name !== "")
                        .join(", ")}
                    </div>
                  </p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WeeklyView;
