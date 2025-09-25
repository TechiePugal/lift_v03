import React, { useEffect, useState } from "react";
import RowLayout from "../../../common/table/RowLayout";
import Button from "../../../common/buttons/Button";
import Status from "../../../common/status/Status";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { displayDate, formatDate } from "../../../../utils/date";
import { useSelector } from "react-redux";

const RowItems = ({
  appointment,
  index,
  handleEditUser,
  handleCheckOut,
  handleCheckIn,
  handleViewAppointment,
  handleIdClick,
  getAppointmentTime,
  handle24Time
}) => {
  const [showTreatments, setShowTreatments] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const handleShowTreatments = (index) => {
    setShowTreatments(index);
  };

  // useEffect(() => {
  //   // Parse the railway time using Day.js
  //   const parsedDate = dayjs(`2023-01-01 ${appointment.appointment_time}`, {
  //     format: "YYYY-MM-DD HH:mm",
  //   });

  //   // Format the time with AM/PM
  //   const formattedTime = parsedDate.format("hh:mm A");
  //   setAppointmentTime(formattedTime);
  // }, [appointment]);

  // const handle24Time = (time) => {
  //   try {
  //     // Format the time with AM/PM
  //     const formattedTime = moment(time).format("hh:mm A");
  //     return formattedTime;
  //   } catch {
  //     console.log("Time Format Error");
  //   }
  // };

  return (
    <RowLayout key={index} onClick={() => handleViewAppointment(appointment)}>
      <td>
        <UserDetail text={appointment.sno || "-"} />
      </td>
      <td>
        <UserDetail
          text={`${displayDate(appointment?.appointment_date)}` || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>
      <td>
        <div onClick={(e) => handleIdClick(e, appointment.patient_id._id)}>
          <UserDetail
            text={
              hospitalInfo?.patientId_prefix +
                appointment?.patient_id.patient_id || "-"
            }
            className={"col-span-1 text-center text-primary underline"}
          />
        </div>
      </td>
      <td>
        <UserDetail
          text={appointment?.patient_id?.name || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>
      <td>
        <UserDetail
          text={appointment?.patient_id?.phone || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>
      <td>
        <UserDetail
          text={getAppointmentTime(appointment.appointment_time) || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>
      <td>
        <UserDetail
          text={appointment?.doctor || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>
      <td>
        <div
          className="relative hover:text-primary"
          onMouseEnter={() =>
            appointment?.next_treatment_info?.length > 1 &&
            handleShowTreatments(index)
          }
          onMouseLeave={() => handleShowTreatments(null)}
          onClick={(e) => {
            e.stopPropagation();
            handleShowTreatments(index);
          }}
        >
          <UserDetail
            text={`${appointment?.next_treatment_info?.[0]?.name || ""} ${
              appointment?.next_treatment_info?.length > 1
                ? `+${appointment?.next_treatment_info?.length - 1}`
                : ""
            }
              `}
            onCLick={() => handleShowTreatments(index)}
            className={"col-span-2 min-w-[70px] "}
          />
          {showTreatments === index && (
            <>
              <div className="p-3 z-10 bg-bluishgrey shadow-card absolute rounded-15 text-bodySRB">
                {appointment?.next_treatment_info?.map((treatment, index) => {
                  return (
                    <p
                      key={index}
                      className="text-black min-w-[50px] capitalize"
                    >
                      {treatment.name}
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </td>
      <td>
        <div
          className="col-span-2 min-w-[70px]"
          onClick={(e) => {
            e.stopPropagation();
            appointment.checkIn_status !== "true" && handleCheckIn(appointment);
          }}
        >
          <UserDetail
            text={
              appointment?.checkIn_status === "true"
                ? handle24Time(appointment?.checkIn_time)
                : "Check In"
            }
            className={` ${
              appointment?.checkIn_status === "true"
                ? ""
                : "text-primary underline"
            }`}
          />
        </div>
      </td>
      <td>
        <div
          className="col-span-2 min-w-[70px]"
          onClick={(e) => {
            e.stopPropagation();
            appointment.checkIn_status === "true" &&
              appointment?.out_status !== "true" &&
              handleCheckOut(appointment);
          }}
        >
          <UserDetail
            text={
              appointment?.out_status === "true"
                ? handle24Time(appointment?.out_time)
                : "Check Out"
            }
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
          />
        </div>
      </td>
      <td className=" pr-2 h-[60px]">
        <div className="">
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
            className="text-bodySRB py-[10px]"
          >
            {appointment?.status || "-"}
          </Status>
        </div>
      </td>
    </RowLayout>
  );
};

function UserDetail({ text, className, onCLick, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onCLick}
      onMouseLeave={onMouseLeave}
      className={` ${className}`}
    >
      <p className="text-bodySRB capitalize">{text}</p>
    </div>
  );
}

export default RowItems;
