import React from "react";
import TableHeadLayout from "../../../common/table/TableHeadLayout";
import RowItems from "./row";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import moment from "moment";
import Cards from "./mobile/Cards";

/** Main colum headings */
const columns = [
  "Sl No",
  "Date",
  "P.ID",
  "Patient Name",
  "Mobile Number",
  "Appt.Time",
  "Doctor",
  "Treatment",
  "Checkin",
  "Checkout",
  "Status",
];

const AppointmentsTable = ({
  appointments,
  handleCheckOut,
  handleCheckIn,
  handleViewAppointment,
}) => {
  const navigate = useNavigate();

  const handleIdClick = (e, id) => {
    e.stopPropagation();
    navigate(`/patient_profile?id=${id}`);
  };

  const getAppointmentTime = (time) => {
    // Parse the railway time using Day.js
    const parsedDate = dayjs(`2023-01-01 ${time}`, {
      format: "YYYY-MM-DD HH:mm",
    });

    // Format the time with AM/PM
    const formattedTime = parsedDate.format("hh:mm A");
    return formattedTime;
  };

  const handle24Time = (time) => {
    try {
      // Format the time with AM/PM
      const formattedTime = moment(time).format("hh:mm A");
      return formattedTime;
    } catch {
      console.log("Time Format Error");
    }
  };

  return (
    <div className="md:overflow-y-auto  pb-10  md:h-[70vh] md:overflow-auto">
      {/* Hide on mobile view */}
      <div className="hidden md:block">
        <TableHeadLayout
          className={"max-h-[100px] overflow-hidden"}
          columns={columns}
        >
          {/* Rows */}
          {appointments.map((appointment, index) => {
            return (
              <RowItems
                key={index}
                appointment={appointment}
                handleCheckOut={handleCheckOut}
                handleCheckIn={handleCheckIn}
                index={index}
                handleViewAppointment={handleViewAppointment}
                handleIdClick={handleIdClick}
                getAppointmentTime={getAppointmentTime}
                handle24Time={handle24Time}
              />
            );
          })}
        </TableHeadLayout>
        {/* Heading */}
      </div>

      {/* Show only on mobile view */}
      <div className="block md:hidden">
        <Cards
          appointments={appointments}
          handleViewAppointment={handleViewAppointment}
          handleIdClick={handleIdClick}
          getAppointmentTime={getAppointmentTime}
          handle24Time={handle24Time}
          handleCheckOut={handleCheckOut}
          handleCheckIn={handleCheckIn}
          columns={columns}
        />
      </div>
      {/*  */}
    </div>
  );
};

export default AppointmentsTable;
