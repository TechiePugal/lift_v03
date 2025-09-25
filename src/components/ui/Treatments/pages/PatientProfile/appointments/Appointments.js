import React, { useEffect, useState } from "react";
import RedClose from "../../../../../icons/Red-Close";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import SelectionInput from "../../../../../common/input/Select";
import FourquadrantBox from "../../../../../common/input/FourquadrantBox";
import Button from "../../../../../common/buttons/Button";
import Status from "../../../../../common/status/Status";

import ModalWrapper from "../../../../../common/modal/ModalWrapper";
import CreateSingleAppointment from "../../../../Appointments/CreateAppointment/Single/CreateSingleAppointment";
import { getAllDoctors } from "../../../../../../api/settings/Doctors/doctors";
import {
  displayDate,
  formatDate,
  formatNormalTime,
  handle24Time,
} from "../../../../../../utils/date";
import moment from "moment";
import ViewAppointment from "../../../../Appointments/ViewAppointment/ViewAppointment";
import EditAppointment from "../../../../Appointments/EditAppointment/EditAppointment";

const Appointments = ({
  appointments,
  getAppointmentsData,
  patientProfile,
  treatments,
  doctors,
  setSearchTreatment,
  setSearchDoctors,
}) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [editData, seteditData] = useState({});
  const [editConfirm, setEditConfirm] = useState(false);

  const handleCreate = () => {
    setOpen(!open);
  };

  const handleView = (params) => {
    setView(!view);
    seteditData(params);
    setEditConfirm(false);
  };
  return (
    <div>
      <div className="">
        <div className="shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 flex flex-wrap gap-2 justify-between items-center mb-1">
          <h1 className="text-bodyBB text-darkgrey">Appointments</h1>
          <div className="lg:w-[200px] w-full">
            <Button
              type={"primary"}
              action={"button"}
              className={"py-[8px] lg:py-[10px] text-bodyBB"}
              onClick={handleCreate}
            >
              Create Appointment
            </Button>
          </div>
        </div>
        {appointments?.length > 0 && (
          <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px]  max-h-[350px] overflow-auto">
            <div className="">
              <table className="w-full border-separate border-spacing-y-2 pl-2 pr-2 min-w-max ">
                <thead className="border-b sticky top-0 bg-white">
                  <tr className="text-bodyBB text-darkgrey text-center">
                    <th className="p-2 border-b-2">S. NO</th>
                    <th className=" border-b-2">Date & Time</th>
                    <th className=" border-b-2">Treatment</th>
                    <th className=" border-b-2">Doctor’s Name</th>
                    <th className=" border-b-2">Check-In</th>
                    <th className=" border-b-2">Check-Out</th>
                    <th className=" border-b-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((appointment, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => handleView(appointment)}
                        className="text-center h-[60px] text-bodyRB text-darkgrey cursor-pointer"
                      >
                        <td className="border-b-2">
                          {appointment?.sno || "-"}
                        </td>
                        <td className="border-b-2">
                          {displayDate(appointment?.appointment_date)},{" "}
                          {handle24Time(appointment.appointment_time)}
                        </td>
                        <td className="border-b-2">
                          {appointment?.next_treatment_info
                            ?.map((item) => item.name)
                            .join(", ")}
                        </td>
                        <td className="border-b-2">
                          {appointment?.doctor || "-"}
                        </td>
                        <td className="border-b-2">
                          {appointment?.checkIn_time
                            ? moment(appointment?.checkIn_time).format(
                                "hh:mm A"
                              ) || "-"
                            : "-"}
                        </td>
                        <td className="border-b-2">
                          {appointment?.out_time
                            ? moment(appointment?.out_time).format("hh:mm A") ||
                              "-"
                            : "-"}
                        </td>
                        <td className="border-b-2">
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
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* Create Single Appointment */}
      <ModalWrapper
        open={open}
        handleClose={handleCreate}
        title={"Create Appointment"}
      >
        <CreateSingleAppointment
          handleCreateAppointmentClick={handleCreate}
          getAppointmentsData={getAppointmentsData}
          doctors={doctors}
          patientInfo={patientProfile}
          treatments={treatments}
          directAppiontment={true}
          setSearchTreatment={setSearchTreatment}
          setSearchDoctors={setSearchDoctors}
        />
      </ModalWrapper>

      {/* View Appointment */}
      <ModalWrapper
        open={view}
        handleClose={handleView}
        title={!editConfirm ? "ViewAppointment" : "EditAppointment"}
      >
        <EditAppointment
          doctors={doctors}
          treatments={treatments}
          getAppointmentsData={getAppointmentsData}
          editData={editData}
          editConfirm={editConfirm}
          handleEditAppointment={handleView}
          setEditConfirm={setEditConfirm}
        />
      </ModalWrapper>
    </div>
  );
};

export default Appointments;
