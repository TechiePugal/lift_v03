import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TreatmentDetails from "../../../components/ui/Treatments/pages/TreatmentDetails/TreatmentDetails";
import FullScreeeSpinner from "../../../components/common/loading/FullScreee";
import {
  getClinicalData,
  getSingleTreatment,
  updateClinicalData,
} from "../../../api/Treatments";
import { showErrorToast, showSuccessToast } from "../../../utils/toaster";
import { getSingleAppointments } from "../../../api/Appointments";
import { getAllDoctors } from "../../../api/settings/Doctors/doctors";
import { getAllMedicines } from "../../../api/settings/Medicines/medicines";
import { getAllLabsWorks } from "../../../api/settings/LabsWorks/labsWorks";
import { getAllLabs } from "../../../api/settings/Labs";
import { getAllTreatments } from "../../../api/settings/Treatment/treatment";
import { generateRandomId } from "../../../utils/other";

const TreatmentDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [labs, setLabs] = useState([]);
  const [labsWorks, setLabWorks] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [clinicalData, setClinicalData] = useState([]);
  const [loadingClinicalData, setLoadingClinicalData] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [showUpdateClinicalData, setShowUpdateClinicalData] = useState(false);

  /** for search selection */
  const [searchDoctors, setSearchDoctors] = useState("");
  const [searchMedicines, setSearchMedicines] = useState("");
  const [searchLabs, setSearchLabs] = useState("");
  const [searchLabWorks, setSearchLabWorks] = useState("");
  const [searchTreatment, setSearchTreatment] = useState("");

  // Get the current location
  const location = useLocation();
  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const getAppointmentsData = () => {
    setLoading(true);
    getSingleAppointments(id)
      .then((response) => {
     
        const appointments = {
          ...response.data.data,
          next_treatment_info: response?.data?.data?.next_treatment_info.map(
            (item) => ({
              ...item,
              doctor: response?.data?.data?.doctor,
              id: generateRandomId(),
            })
          ),
        };
        setAppointments(appointments);
        getClinicalDataInfo(response?.data?.data?.patient_id?._id);
        setPatientId(response?.data?.data?.patient_id?._id);
      })
      .catch((error) => {
        console.log(error);
        // showErrorToast(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getClinicalDataInfo = (patientId) => {
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
    getAppointmentsData();
  }, [id]);

  const updateClinicalDataInfo = () => {
    const payload = { data: clinicalData };
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

  if (loading) {
    return (
      <div>
        <FullScreeeSpinner />
      </div>
    );
  }
  return (
    <div>
      <TreatmentDetails
        appointments={appointments}
        doctores={doctores}
        medicines={medicines}
        labs={labs}
        labsWorks={labsWorks}
        treatments={treatments}
        clinicalData={clinicalData}
        setClinicalData={setClinicalData}
        updateClinicalDataInfo={updateClinicalDataInfo}
        loadingClinicalData={loadingClinicalData}
        showUpdateClinicalData={showUpdateClinicalData}
        setShowUpdateClinicalData={setShowUpdateClinicalData}
        editData={true}
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

export default TreatmentDetailsPage;
