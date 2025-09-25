import React, { useEffect, useState } from "react";
import PatientProfile from "../../../components/ui/Treatments/pages/PatientProfile/PatientProfileLayout";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllAppointmentsProfile,
  getAllLabsProfile,
  getAllPrescriptionsProfile,
  getAllTreatmentsProfile,
  getSinglePatient,
  getTreatmentSummaries,
  getAllinvoiceProfile,
} from "../../../api/Treatments/PatientDatabase/PatientDatabase";

import FullScreeeSpinner from "../../../components/common/loading/FullScreee";
import { getAllTreatments } from "../../../api/settings/Treatment/treatment";
import { getAllDoctors } from "../../../api/settings/Doctors/doctors";

const PatientProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [treatmentsData, setTreatmentsData] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [labs, setLabs] = useState([]);
  const [patientProfile, setPatientProfile] = useState("");
  const [treatmentSummaries, setTreatmentSummaries] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [searchTreatment, setSearchTreatment] = useState("");
  const [doctores, setDoctores] = useState([]);
  const [searchDoctors, setSearchDoctors] = useState("");

  // Get the current location
  const location = useLocation();
  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/patient_database`);
  };

  const getPatientData = () => {
    setLoading(true);
    getSinglePatient(id)
      .then((response) => {
        setPatientProfile(response.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getPrescriptionData = () => {
    setLoading(true);
    getAllPrescriptionsProfile(id)
      .then((response) => {
        setPrescriptions(response.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getAppointmentsData = () => {
    setLoading(true);
    getAllAppointmentsProfile(id)
      .then((response) => {
        setAppointments(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTreatmentsData = () => {
    setLoading(true);
    getAllTreatmentsProfile(id)
      .then((response) => {
        setTreatmentsData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getLabsData = () => {
    setLoading(true);
    getAllLabsProfile(id)
      .then((response) => {
        setLabs(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        // showErrorToast(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getInvoiceData = () => {
    setLoading(true);
    getAllinvoiceProfile(id)
      .then((response) => {
        setInvoices(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        // showErrorToast(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTreatmentSummariesData = () => {
    setLoading(true);
    getTreatmentSummaries(id)
      .then((response) => {
        setTreatmentSummaries(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTreatments = () => {
    getAllTreatments(searchTreatment)
      .then((response) => {
        setTreatments(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const listAllDoctors = () => {
    getAllDoctors(searchDoctors)
      .then((response) => {
        setDoctores(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getTreatments();
  }, [searchTreatment]);
  useEffect(() => {
    listAllDoctors();
  }, [searchDoctors]);

  // Function to fetch all data for a patient
  const fetchPatientData = async () => {
    try {
      // Make all required API calls concurrently
      const [
        patientResponse,
        prescriptionsResponse,
        appointmentsResponse,
        treatmentsDataResponse,
        labsResponse,
        invoicesResponse,
        treatmentSummariesResponse,
      ] = await Promise.all([
        getSinglePatient(id),
        getAllPrescriptionsProfile(id),
        getAllAppointmentsProfile(id),
        getAllTreatmentsProfile(id),
        getAllLabsProfile(id),
        getAllinvoiceProfile(id),
        getTreatmentSummaries(id),
      ]);

      // Update state with the fetched data
      setPatientProfile(patientResponse.data.data);
      setPrescriptions(prescriptionsResponse.data.data);
      setAppointments(appointmentsResponse?.data?.data);
      setTreatmentsData(treatmentsDataResponse?.data?.data);
      setLabs(labsResponse?.data?.data);
      setInvoices(invoicesResponse?.data?.data);
      setTreatmentSummaries(treatmentSummariesResponse?.data?.data);
    } catch (error) {
      console.error(error);
      // Handle errors if needed
    } finally {
      // Set loading state to false after all API calls
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch all patient data
      fetchPatientData();
    }
  }, [id]);

  if (loading) {
    return (
      <div>
        <FullScreeeSpinner />
      </div>
    );
  }

  return (
    <div>
      <PatientProfile
        patientProfile={patientProfile}
        getPatientData={getPatientData}
        appointments={appointments}
        getAppointmentsData={getAppointmentsData}
        invoices={invoices}
        labs={labs}
        treatmentSummaries={treatmentSummaries}
        getAllLabs={getLabsData}
        getTreatmentSummariesData={getTreatmentSummariesData}
        getInvoiceData={getInvoiceData}
        treatmentsData={treatmentsData}
        prescriptions={prescriptions}
        getPrescriptionData={getPrescriptionData}
        treatments={treatments}
        getTreatmentsData={getTreatmentsData}
        doctores={doctores}
        setSearchTreatment={setSearchTreatment}
        setSearchDoctors={setSearchDoctors}
      />
    </div>
  );
};

export default PatientProfilePage;
