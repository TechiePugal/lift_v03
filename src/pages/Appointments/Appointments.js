import React, { useEffect, useState } from "react";
import AppointmentsLayout from "../../components/ui/Appointments/AppointmentsLayout";
import { showErrorToast } from "../../utils/toaster";
import { getAllAppointments } from "../../api/Appointments";
import { getAllDoctors } from "../../api/settings/Doctors/doctors";
import { useNavigate, useLocation } from "react-router-dom";
import { formatToSearchDate } from "../../utils/date";
import { getAllTreatments } from "../../api/settings/Treatment/treatment";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateEnd,
  setDateStart,
  setDoctor,
  setSelectStatus,
} from "../../store/slice/appointment-slice";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [searchDoctors, setSearchDoctors] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [statusCounts, setStatusCounts] = useState({});
  const [treatments, setTreatments] = useState([]);
  const [searchTreatment, setSearchTreatment] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const url = new URL(window.location.href);
  const [createDirectAppoinemtne, setCreateDirectAppoinemtne] = useState(
    Boolean(searchParams.get("createNew"))
  );
  const [newPatientId, setNewPatientId] = useState(searchParams.get("_id"));

  const startDate = useSelector((state) => state.appointment.dateStart);
  const endDate = useSelector((state) => state.appointment.dateEnd);
  const selectedDoctor = useSelector((state) => state.appointment.doctor);
  const status = useSelector((state) => state.appointment.status);

  const setStartDate = (e) => {
    dispatch(setDateStart(formatToSearchDate(e)));
  };

  const setEndDate = (e) => {
    dispatch(setDateEnd(formatToSearchDate(e)));
  };

  const setStatus = (e) => {
    dispatch(setSelectStatus(e));
  };

  const setSelectedDoctor = (e) => {
    dispatch(setDoctor(e));
  };

  /** Create new appointment params removing after page load */
  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    // Check if the 'createNew' parameter is present
    if (searchParams.has("createNew")) {
      // Remove the 'createNew' parameter
      searchParams.delete("createNew");
      // Update the URL without 'createNew'
      window.history.replaceState({}, "", url.toString());
    }
    if (searchParams.has("_id")) {
      // Remove the 'createNew' parameter
      searchParams.delete("_id");
      // Update the URL without 'createNew'
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  const getAppointmentsData = () => {
    setLoading(true);
    getAllAppointments(searchKey, status, selectedDoctor, startDate, endDate)
      .then((response) => {
        console.log({ response });
        setAppointments(response?.data?.data);
        setStatusCounts(response.data);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchData = async (
    getData,
    setDataCallback,
    searchKey,
    setLoadingCallback
  ) => {
    try {
      const response = await getData(searchKey);
      setDataCallback(response?.data?.data);
    } catch (error) {
      console.error("Error fetching deopdown data:", error);
    } finally {
      setLoadingCallback(false);
    }
  };

const listAllDoctors = ()=>{
  fetchData(getAllDoctors, setDoctors, searchDoctors, () => {});
}

  const getTreatments = () => {
    fetchData(getAllTreatments, setTreatments, searchTreatment, () => {});
  };

  useEffect(() => {
    listAllDoctors();
  }, [searchDoctors]);
  useEffect(() => {
    getTreatments();
  }, [searchTreatment]);

  useEffect(() => {
    getAppointmentsData();
  }, [searchKey, status, selectedDoctor, endDate]);
  return (
    <div>
      <AppointmentsLayout
        appointments={appointments}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        status={status}
        setStatus={setStatus}
        loading={loading}
        doctors={doctors}
        setSelectedDoctor={setSelectedDoctor}
        selectedDoctor={selectedDoctor}
        getAppointmentsData={getAppointmentsData}
        startDate={startDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        endDate={endDate}
        createAppoinemtne={createDirectAppoinemtne}
        setCreateDirectAppoinemtne={setCreateDirectAppoinemtne}
        statusCounts={statusCounts}
        treatments={treatments}
        setSearchTreatment={setSearchTreatment}
        setSearchDoctors={setSearchDoctors}
        /** newPatientId for create appointment redirected form reg patient */
        newPatientId={newPatientId}
        setNewPatientId={setNewPatientId}
      />
    </div>
  );
};

export default AppointmentsPage;
