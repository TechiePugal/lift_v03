import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditTreatmentDetails from "../../../components/ui/Treatments/pages/EditTreatmentDetails/EditTreatmentDetails";
import FullScreeeSpinner from "../../../components/common/loading/FullScreee";
import {
  getClinicalData,
  getEditClinicalData,
  getInvoices,
  getLabOrders,
  getPrescriptions,
  getSingleTreatment,
  getUpcomingTreatments,
  updateClinicalData,
  updateClinicalDataEdit,
} from "../../../api/Treatments";
import { showErrorToast, showSuccessToast } from "../../../utils/toaster";
import { getAllDoctors } from "../../../api/settings/Doctors/doctors";
import { getAllMedicines } from "../../../api/settings/Medicines/medicines";
import { getAllLabsWorks } from "../../../api/settings/LabsWorks/labsWorks";
import { getAllLabs } from "../../../api/settings/Labs";
import { getAllTreatments } from "../../../api/settings/Treatment/treatment";
import { generateRandomId } from "../../../utils/other";

const EditTreatmentDetailsPage = ({
  treatmentId,
  viewOnly,
  handleViewTreatment,
  editData = true, // Set default value to true if editData is falsy
  handleEditable,
  editTreatment = false,
}) => {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [labs, setLabs] = useState([]);
  const [labsWorks, setLabWorks] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [clinicalData, setClinicalData] = useState([]);
  const [loadingClinicalData, setLoadingClinicalData] = useState(false);
  const [upcomingTreatments, setUpcomingTreatments] = useState([]);
  const [prescriptions, setPrescription] = useState([]);
  const [labOrders, setLabOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
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
  const id = treatmentId || queryParams.get("id");
  const edit = Boolean(queryParams.get("edit")) || false;
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/treatments`);
  };

  const getTreatmentDetails = () => {
    // setLoading(true);
    getSingleTreatment(id)
      .then((response) => {
        const appointments = {
          ...response.data.data,
          treatment_done_info: response?.data?.data?.treatment_done_info.map(
            (item) => ({
              ...item,
              id: generateRandomId(),
            })
          ),
        };
        setAppointments(appointments);
        getClinicalDataInfo(response?.data?.data?.patient_id?._id);
        setPatientId(response?.data?.data?.patient_id?._id);
      })
      .catch((error) => {
        showErrorToast(error, "error");
        // redirect();
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const getClinicalDataInfo = (patientId) => {
    if (patientId) {
      getEditClinicalData(patientId, id)
        .then((response) => {
          if (response?.data.patientTreatmentConfiguration) {
            setClinicalData(response?.data.patientTreatmentConfiguration.data);
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
    if (patientId) {
      setLoadingClinicalData(true);
      updateClinicalDataEdit(patientId, payload)
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

  const fetchMainData = async (getData, setDataCallback) => {
    try {
      const response = await getData(id);
      setDataCallback(response?.data?.data);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const getAllData = async () => {
    setLoading(true);

    try {
      await Promise.all([
        fetchMainData(getUpcomingTreatments, setUpcomingTreatments),
        fetchMainData(getPrescriptions, setPrescription),
        fetchMainData(getLabOrders, setLabOrders),
        fetchMainData(getInvoices, setInvoices),
        getTreatmentDetails(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, [id]);

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

  if (loading) {
    return (
      <div>
        <FullScreeeSpinner />
      </div>
    );
  }

  return (
    <div>
      <EditTreatmentDetails
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
        upcomingTreatments={upcomingTreatments}
        prescriptions={prescriptions}
        labOrders={labOrders}
        invoices={invoices}
        treatmentId={id}
        showUpdateClinicalData={showUpdateClinicalData}
        setShowUpdateClinicalData={setShowUpdateClinicalData}
        viewOnly={viewOnly}
        handleViewTreatment={handleViewTreatment}
        fromEdit={true}
        editData={editData}
        handleEditable={handleEditable}
        editTreatment={editTreatment}
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

export default EditTreatmentDetailsPage;
