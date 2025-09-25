import React, { useEffect, useState } from "react";
import TreatmentDetails from "../../../TreatmentDetails/TreatmentDetails";
import { getAllDoctors } from "../../../../../../../api/settings/Doctors/doctors";
import { getAllLabs } from "../../../../../../../api/settings/Labs";
import { getAllLabsWorks } from "../../../../../../../api/settings/LabsWorks/labsWorks";
import { getAllMedicines } from "../../../../../../../api/settings/Medicines/medicines";
import { getAllTreatments } from "../../../../../../../api/settings/Treatment/treatment";
import {
  getClinicalData,
  updateClinicalData,
} from "../../../../../../../api/Treatments";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../../../utils/toaster";

const AddTreatment = ({ patientId, patientProfile, callBack }) => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [labs, setLabs] = useState([]);
  const [labsWorks, setLabWorks] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [clinicalData, setClinicalData] = useState([]);
  const [loadingClinicalData, setLoadingClinicalData] = useState(false);
  const [showUpdateClinicalData, setShowUpdateClinicalData] = useState(false);

  /** for search selection */
  const [searchDoctors, setSearchDoctors] = useState("");
  const [searchMedicines, setSearchMedicines] = useState("");
  const [searchLabs, setSearchLabs] = useState("");
  const [searchLabWorks, setSearchLabWorks] = useState("");
  const [searchTreatment, setSearchTreatment] = useState("");

  const getClinicalDataInfo = (patientId, patientProfile) => {
    if (patientId) {
      getClinicalData(patientId)
        .then((response) => {
          if (response?.data.patientConfiguration) {
            setClinicalData(response?.data.patientConfiguration.data);
          } else {
            setClinicalData(response?.data.configuration.data);
          }
        })
        .catch((error) => {
          console.log(error);
          // showErrorToast(error, "error");
        })
        .finally(() => {});
    }
  };

  const updateClinicalDataInfo = () => {
    const payload = { data: clinicalData };
    console.log(payload);
    if (patientId) {
      setLoadingClinicalData(true);
      updateClinicalData(patientId, payload)
        .then((response) => {
          showSuccessToast("Clinical Data Updated");
          setShowUpdateClinicalData(false);
        })
        .catch((error) => {
          console.log(error);
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoadingClinicalData(false);
        });
    }
  };
  const fetchData = async (
    getData,
    setDataCallback,
    searchKey,
    setLoadingCallback
  ) => {
    try {
      const response = await getData(searchKey || "");
      setDataCallback(response?.data?.data);
    } catch (error) {
      console.error("Error fetching deopdown data:", error);
    } finally {
    }
  };

  const listAllDoctors = () => {
    fetchData(getAllDoctors, setDoctores, searchDoctors, () => {});
  };

  const getAllLabsData = () => {
    fetchData(getAllLabs, setLabs, searchLabs);
  };

  const getAllLabWorkData = () => {
    fetchData(getAllLabsWorks, setLabWorks, searchLabWorks);
  };

  const getAllMedicinesData = () => {
    fetchData(getAllMedicines, setMedicines, searchMedicines, () => {});
  };

  const getTreatments = () => {
    fetchData(getAllTreatments, setTreatments, searchTreatment, () => {});
  };

  useEffect(() => {
    listAllDoctors();
  }, [searchDoctors]);

  useEffect(() => {
    getAllLabsData();
  }, [searchLabs]);

  useEffect(() => {
    getAllLabWorkData();
  }, [searchLabWorks]);

  useEffect(() => {
    getAllMedicinesData();
  }, [searchMedicines]);

  useEffect(() => {
    getTreatments();
  }, [searchTreatment]);

  useEffect(() => {
    getClinicalDataInfo(patientId);
  }, [patientId]);
  return (
    <div>
      <TreatmentDetails
        doctores={doctores}
        medicines={medicines}
        labs={labs}
        labsWorks={labsWorks}
        treatments={treatments}
        clinicalData={clinicalData}
        setClinicalData={setClinicalData}
        updateClinicalDataInfo={updateClinicalDataInfo}
        loadingClinicalData={loadingClinicalData}
        patientProfile={patientProfile}
        editData={true}
        addTreatment={true}
        callBack={callBack}
        showUpdateClinicalData={showUpdateClinicalData}
        setShowUpdateClinicalData={setShowUpdateClinicalData}
        /** */
        setSearchDoctors={setSearchDoctors}
        setSearchMedicines={setSearchMedicines}
        setSearchLabs={setSearchLabs}
        setSearchLabWorks={setSearchLabWorks}
        setSearchTreatment={setSearchTreatment}
      />
    </div>
  );
};

export default AddTreatment;
