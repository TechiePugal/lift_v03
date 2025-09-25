import React, { useEffect, useState } from "react";
import ProfileSection from "./profile/ProfileSection";
import SetTreatment from "./treatment/SetTreatment";
import Schedules from "./schedules/Schedules";
import {
  deleteAppointment,
  getAllAppointments,
} from "../../../../api/Appointments";
import { showErrorToast, showSuccessToast } from "../../../../utils/toaster";
import Button from "../../../common/buttons/Button";
import CheckMarkWhite from "../../../icons/CheckMarkWhite";
import ModalWrapper from "../../../common/modal/ModalWrapper";

const ViewAppointment = ({
  editAppointment,
  editData,
  getAppointmentsData,
  handleViewAppointment,
}) => {
  const [profileLoading, setProfileLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const scheduledAppointments = () => {
    setAppointments([]);
    setProfileLoading(true);
    getAllAppointments(editData.patient_id._id, "", "")
      .then((response) => {
        setAppointments(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setProfileLoading(false);
      });
  };

  useEffect(() => {
    scheduledAppointments();
  }, []);

  return (
    <div className="grid gap-3 lg:w-[900px]">
      <div className={profileLoading ? "animate-pulse" : ""}>
        <ProfileSection patientProfile={editData?.patient_id} />
      </div>
      <SetTreatment editData={editData} />
      <Schedules
        editAppointment={editAppointment}
        editData={editData}
        appointments={appointments}
      />
      <div className="lg:grid flex flex-col gap-2 lg:grid-cols-4 mt-8">
        {/* <div>
          <Button
            onClick={() => handleconfirmation()}
            action={"button"}
            type={"danger"}
          >
            Delete Appointment
          </Button>
        </div> */}
        <div className="grid lg:grid-flow-col col-span-1 col-start-4 gap-2">
          {/* <Button type={"yes"}>
            <CheckMarkWhite />
            Send Whatsapp / SMS
          </Button> */}
          <Button type={"primary"} onClick={editAppointment}>
            Edit Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
