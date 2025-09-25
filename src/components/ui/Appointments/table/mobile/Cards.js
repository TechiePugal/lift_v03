import React from "react";
import Status from "../../../../common/status/Status";
import { useSelector } from "react-redux";
import { displayDate } from "../../../../../utils/date";
import { ListCard, ListItem } from "../../../../common/card/list-card/ListCard";

const Cards = ({
  appointments,
  handleViewAppointment,
  columns = [],
  handleIdClick,
  getAppointmentTime,
  handle24Time,
  handleCheckOut,
  handleCheckIn,
}) => {
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  /** For getting values on mobile view */
  const getColumnValue = (appointment, column) => {
    switch (column) {
      case "Sl No":
        return appointment.sno;
      case "Date":
        return displayDate(appointment?.appointment_date) || "-";
      case "P.ID":
        return (
          <div
            className={" text-primary underline cursor-pointer"}
            onClick={(e) => handleIdClick(e, appointment.patient_id._id)}
          >
            {hospitalInfo?.patientId_prefix +
              appointment?.patient_id.patient_id || "-"}
          </div>
        );
      case "Patient Name":
        return appointment?.patient_id?.name || "-";
      case "Mobile Number":
        return appointment?.patient_id?.phone || "-";
      case "Appt.Time":
        return getAppointmentTime(appointment.appointment_time) || "-";
      case "Doctor":
        return appointment.doctor || "-";
      case "Treatment":
        return (
          appointment?.next_treatment_info
            ?.map((treatment) => treatment.name)
            .join(", ") || "-"
        );
      case "Checkin":
        return (
          (
            <div
              onClick={(e) => {
                e.stopPropagation();
                appointment.checkIn_status !== "true" &&
                  handleCheckIn(appointment);
              }}
              className={` ${
                appointment?.checkIn_status === "true"
                  ? ""
                  : "text-primary underline"
              }`}
            >
              {appointment?.checkIn_status === "true"
                ? handle24Time(appointment?.checkIn_time)
                : "Check In"}
            </div>
          ) || "-"
        );
      case "Checkout":
        return (
          (
            <div
              onClick={(e) => {
                e.stopPropagation();
                appointment.checkIn_status === "true" &&
                  appointment?.out_status !== "true" &&
                  handleCheckOut(appointment);
              }}
              className={`
            ${
              appointment?.checkIn_status === "true" &&
              appointment?.out_status !== "true"
                ? "text-primary underline cursor-pointer"
                : "cursor-default"
            }
            ${
              appointment?.checkIn_status !== "true" &&
              appointment?.out_status !== "true"
                ? "cursor-default text-secondary underline"
                : ""
            }
          `}
            >
              {appointment?.out_status === "true"
                ? handle24Time(appointment?.out_time)
                : "Check Out"}
            </div>
          ) || "-"
        );
      case "Status":
        return (
          <Status
            type={
              appointment?.status === "Upcoming"
                ? "upcoming"
                : appointment?.status === "Check In"
                ? "checked-in"
                : appointment?.status === "Completed"
                ? "completed"
                : "completed" // Default type if none of the above conditions match
            }
            className="text-bodySRB !py-[5px] !w-[100px]"
          >
            {appointment?.status || "-"}
          </Status>
        );
      default:
        return "-";
    }
  };
  return (
    <div>
      {appointments?.map((appointment, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => handleViewAppointment(appointment)}
        >
          <ListCard>
            {columns.map((column, columnIndex) => (
              <ListItem
                key={columnIndex}
                title={column}
                value={getColumnValue(appointment, column)}
              />
            ))}
          </ListCard>
        </div>
      ))}
    </div>
  );
};

export default Cards;
