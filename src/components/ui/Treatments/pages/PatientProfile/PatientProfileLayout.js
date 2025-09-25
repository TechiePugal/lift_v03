import React, { useState } from "react";
import Profile from "./profile/Profile";
import Appointments from "./appointments/Appointments";
import TreatmentSummaries from "./treatmentsummaries/TreatmentSummaries";
import Treatments from "./treatments/Treatments";
import Images_Documents from "./images_documents/Images_Documents";
import LabOrders from "./laborders/LabOrders";
import Payments from "./payments/Payments";
import Button from "../../../../common/buttons/Button";
import Prescriptions from "./Prescription/Prescriptions";
import { deletePatient } from "../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { useNavigate } from "react-router-dom";

const PatientProfile = ({
  patientProfile,
  getPatientData,
  appointments,
  getAppointmentsData,
  invoices,
  labs,
  treatmentSummaries,
  getAllLabs,
  getTreatmentSummariesData,
  getInvoiceData,
  treatmentsData,
  prescriptions,
  getPrescriptionData,
  treatments,
  getTreatmentsData,
  doctores,
  setSearchTreatment,
  setSearchDoctors,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const handleconfirmation = (props) => {
    setConfirmOpen(!confirmOpen);
  };

  const handleDelete = () => {
    deletePatient(patientProfile._id)
      .then((response) => {
        showSuccessToast("Deleted Successfully");
        handleconfirmation();
        navigation(-1);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-4 mb-10">
      <Profile
        patientProfile={patientProfile}
        getPatientData={getPatientData}
      />
      <Appointments
        appointments={appointments}
        patientProfile={patientProfile}
        getAppointmentsData={getAppointmentsData}
        treatments={treatments}
        doctors={doctores}
        setSearchTreatment={setSearchTreatment}
        setSearchDoctors={setSearchDoctors}
      />
      <TreatmentSummaries
        treatmentSummaries={treatmentSummaries}
        id={patientProfile._id}
        getTreatmentSummariesData={getTreatmentSummariesData}
      />
      <Treatments
        treatmentsData={treatmentsData}
        patientId={patientProfile?._id}
        patientProfile={patientProfile}
        getTreatmentsData={getTreatmentsData}
      />
      <Images_Documents images={patientProfile?.treatmentFiles} patientId={patientProfile?._id} getPatientData={getPatientData} />
      <LabOrders
        labs={labs}
        patientProfile={patientProfile}
        getAllLabs={getAllLabs}
      />
      <Prescriptions
        prescriptions={prescriptions}
        profile={patientProfile}
        getPrescriptionData={getPrescriptionData}
      />
      <Payments
        invoices={invoices}
        patientProfile={patientProfile}
        getInvoiceData={getInvoiceData}
      />
      <div className="flex justify-end">
        <div className="w-[200px]">
          <Button
            action={"button"}
            onClick={handleconfirmation}
            type={"danger"}
          >
            Delete Patient
          </Button>
        </div>
      </div>
      <ModalWrapper open={confirmOpen} handleClose={handleconfirmation}>
        <div className="flex flex-col gap-10">
          <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
            Are you sure that you want to delete this appointment
            <span className="text-bodyBB pl-1 pr-1 text-darkgrey">
              {patientProfile?.name}
            </span>
            ?
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleconfirmation}
              type={"danger"}
              className={"text-heading2B"}
            >
              No
            </Button>
            <Button
              onClick={handleDelete}
              type={"yes"}
              className={"text-heading2B"}
              loading={loading}
            >
              Yes
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default PatientProfile;
