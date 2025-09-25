import React, { useEffect, useState } from "react";
import PrescriptionsLayout from "../../components/ui/Prescriptions/PrescriptionsLayout";
import { showErrorToast } from "../../utils/toaster";
import { getAllPrescriptions } from "../../api/Prescriptions";
import { formatDate, formatToSearchDate } from "../../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setStartDate } from "../../store/slice/prescriptions-slice";

const PrescriptionsPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const url = new URL(window.location.href);
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.prescription.startDate);


  const setStartDateCall = (e) => {
    dispatch(setStartDate(formatToSearchDate(e)));
  };

  const getPrescriptionsData = () => {
    setLoading(true);
    // If there is a searchKey, set startDate to an empty string
    const effectiveStartDate = searchKey ? "" : startDate;
    getAllPrescriptions(searchKey, formatDate(effectiveStartDate))
      .then((response) => {
       
        setPrescriptions(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        // showErrorToast(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getPrescriptionsData();
  }, [searchKey, startDate]);
  return (
    <div>
      <PrescriptionsLayout
        prescriptions={prescriptions}
        loading={loading}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        setStartDate={setStartDateCall}
        startDate={startDate}
      />
    </div>
  );
};

export default PrescriptionsPage;
