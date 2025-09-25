import React, { useState } from "react";
import Functionalities from "./Functionalities/Functionalities";
import TreatmentsTable from "./table";
import ModalWrapper from "../../common/modal/ModalWrapper";
import RegisterPatient from "./RegisterPatient/RegisterPatient";
import { getPatientId } from "../../../api/Treatments/PatientDatabase/RegisterPatient";
import { showErrorToast } from "../../../utils/toaster";
import FullScreeeSpinner from "../../common/loading/FullScreee";

const TreatmentsLayout = ({
  treatmentsData,
  loading,
  searchKey,
  setSearchKey,
  startDate,
  setStartDate,
}) => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [generatingId, setGeneratingId] = useState(false);
  const [patientId, setPatientId] = useState("");
  const handleRegister = () => {
    setPatientId("");

    if (!registerOpen) {
      setGeneratingId(true);
      getPatientId()
        .then((response) => {
          setPatientId(response.data.data);
          setRegisterOpen(!registerOpen);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setGeneratingId(false);
        });
    } else {
      setRegisterOpen(!registerOpen);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Functionalities */}
      <div className="">
        <Functionalities
          handleRegister={handleRegister}
          startDate={startDate}
          setStartDate={setStartDate}
          generatingId={generatingId}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <FullScreeeSpinner />
        </div>
      ) : (
        // {/* List Table */}
        <TreatmentsTable treatmentsData={treatmentsData} />
      )}

      {/* Register Patient*/}
      <ModalWrapper
        restrictClickOutSide={true}
        open={registerOpen}
        handleClose={handleRegister}
        title={"Register new Patient"}
      >
        <RegisterPatient
          handleRegister={handleRegister}
          patientId={patientId}
        />
      </ModalWrapper>
    </div>
  );
};

export default TreatmentsLayout;
