import { useEffect, useState } from "react";
import { isSameDay, parseISO, addDays } from "date-fns";
import { formatDateToString } from "./date";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const renderWeeks = (startDate, callBackDate) => {
  const daysInWeek = 7; // Number of days in a week
  const dates = [];

  // Clone the start date to avoid mutating it
  const currentDate = new Date(startDate);

  // Generate dates for the current week
  for (let i = 0; i < daysInWeek; i++) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  // Function to format the start date display as "eg:09 Oct 2023"
  const formatDisplay = (date) => {
    try {
      if (date) {
        // Format as "eg:09 Oct 2023"
        return `${date
          .getDate()
          .toString()
          .padStart(2, "0")} ${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`;
      } else {
        return "Select a date";
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return Weeks.map((day, index) => (
    <div
      onClick={() => callBackDate(dates[index])}
      className=" text-center text-bodyBB select-none cursor-pointer"
      key={index}
    >
      <p className="text-bodyRB text-darkgrey hidden md:block">{day}</p>
      <p className="text-bodyRB text-darkgrey block md:hidden">{day.slice(0, 3)}</p>
      <p className="text-bodySBB md:text-bodyBB text-darkgrey">{formatDisplay(dates[index])}</p>
    </div>
  ));
};
// export const filterWeeklyAppointments = (startDate, appointments) => {
//   const daysInWeek = 7; // Number of days in a week

//   // Clone the start date to avoid mutating it
//   const currentDate = new Date(startDate);
//   const currentMonth = currentDate.getMonth();

//   return Weeks.map((day, index) => {
//     // Generate dates for the current week
//     const weekStart = new Date(startDate);
//     weekStart.setDate(currentDate.getDate() + daysInWeek * index);

//     const appointmentsForWeekDay = appointments?.filter(
//       (appointment) =>
//         new Date(formatNormalDate(appointment.appointment_date)).getDate() ===
//           weekStart.getDate()
//     );

//     console.log(appointmentsForWeekDay);

//     return (
//       <div className="" key={index}>
//         <div className="border-r-[2px] border-lightgray h-full">
//           {appointmentsForWeekDay.map((appointment, appIndex) => (
//             <div key={appIndex} className=" ">
//               <div
//                 className={` rounded-[10px]
//                 bg-opacity-[20%] p-4 m-2 flex flex-col justify-center items-center

//                ${
//                  appointment?.status === "Upcoming"
//                    ? "bg-danger  text-danger"
//                    : appointment?.status === "Check In"
//                    ? "text-[#CFBB00] bg-[#F2F496] bg-opacity-[40%]"
//                    : appointment?.status === "Completed"
//                    ? "text-[#6AB483] bg-[#6AB483]"
//                    : "bg-secondary"
//                }

//                `}
//               >
//                 <p className="text-smallBB mb-[2px]">10:00 AM</p>
//                 <p className="text-center text-smallRB">
//                   {appointment.patient_id.name} <br />{" "}
//                   {appointment.treatment_type}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   });
// };

export const filterWeeklyAppointments = (startDate, appointments) => {
  const daysInWeek = 7; // Number of days in a week

  // Clone the start date to avoid mutating it
  const currentDate = new Date(startDate);
  const currentMonth = currentDate.getMonth();

  const weeklyAppointments = [];

  for (let day = 0; day < daysInWeek; day++) {
    // Generate dates for the current day
    const weekStart = new Date(startDate);
    weekStart.setDate(currentDate.getDate() + day);

    const appointmentsForWeekDay = appointments?.filter((appointment) => {
      const appointmentDate = new Date(
        formatDateToString(appointment.appointment_date)
      );
      return appointmentDate.getDate() === weekStart.getDate();
    });

    weeklyAppointments.push({
      date: weekStart,
      appointment: appointmentsForWeekDay,
    });
  }

  return weeklyAppointments;
};

export const renderDaysOfWeek = () => {
  return daysOfWeek.map((day, index) => (
    <div className=" text-center text-bodyBB select-none" key={index}>
      {day}
    </div>
  ));
};

const RenderCalendarDays = ({ startDate, appointments, handleSelectDate }) => {
  const currentDate = new Date(startDate);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    const newCalendarDays = [];
    const totalDays = 6 * 7; // 6 rows x 7 days in a week
    let dayCounter = 1;

    for (let day = 1; day <= totalDays; day++) {
      if (day > firstDayOfMonth && dayCounter <= daysInMonth) {
        // Render the days of the month
        /** Filtering appointments */
        const appointmentsForDay = appointments?.filter(
          (appointment) =>
            new Date(
              formatDateToString(appointment.appointment_date)
            ).getDate() === dayCounter &&
            new Date(
              formatDateToString(appointment.appointment_date)
            ).getMonth() === currentMonth
        );

        const currentDateString = `${currentYear}-${
          currentMonth + 1
        }-${dayCounter}`;

        newCalendarDays.push(
          <div
            onClick={() =>
              handleSelectDate(currentDateString, appointmentsForDay)
            }
            className="flex flex-col justify-center gap-1 items-center border border-bluishgrey pb-4 pt-4 hover:bg-bluishgrey select-none overflow-x-hidden"
            key={`day-${dayCounter}`}
          >
            <div className="text-center lg:text-bodyRB lg:flex gap-1">
              <p className="text-bodySBB lg:text-bodyRB ">{dayCounter}</p>
              <p className="text-smallBB lg:text-bodyRB w-10 md:w-full lg:w-full overflow-hidden whitespace-nowrap text-ellipsis">
                {monthNames[currentMonth]}
              </p>
            </div>

            {/* Display the count of total appointments for the current date */}
            <h1 className="text-heading2R lg:text-headingBB">
              {appointmentsForDay.length}
            </h1>
          </div>
        );
        dayCounter++;
      } else {
        // Render blank cells
        newCalendarDays.push(
          <div
            className="flex justify-center items-center border"
            key={`blank-${day}`}
          >
            {/* &nbsp; */}
          </div>
        );
      }
    }

    setCalendarDays(newCalendarDays);
  }, [startDate, daysInMonth, firstDayOfMonth, currentMonth]);

  return calendarDays;
};

export default RenderCalendarDays;
