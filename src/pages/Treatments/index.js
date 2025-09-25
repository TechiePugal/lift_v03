import React, { useEffect, useState } from "react";
import TreatmentsLayout from "../../components/ui/Treatments/TreatmentsLayout";
import { getAllTreatmentPatients } from "../../api/Treatments";
import { showErrorToast } from "../../utils/toaster";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate } from "../../store/slice/treatment-slice";
import { formatToSearchDate } from "../../utils/date";
import useDelayedSearch from "../../utils/delayedsearch";

const TreatmentsPage = () => {
  const [treatmentsData, setTreatmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();


  const startDate = useSelector((state) => state.treatment.startDate);

  const setStartDateCall = (e) => {
    dispatch(setStartDate(formatToSearchDate(e)));
  };

  const getTreatmentsData = () => {
    setLoading(true);

    // If there is a searchKey, set startDate to an empty string
    const effectiveStartDate = searchKey ? "" : startDate;

    getAllTreatmentPatients(effectiveStartDate, searchKey)
      .then((response) => {
        console.log({ response });
        setTreatmentsData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };



  /** For delay in search hook */
  useDelayedSearch(getTreatmentsData, 200, [searchKey,startDate]);
  

  return (
    <div>
      <TreatmentsLayout
        treatmentsData={treatmentsData}
        loading={loading}
        setSearchKey={setSearchKey}
        searchKey={searchKey}
        startDate={startDate}
        setStartDate={setStartDateCall}
      />
    </div>
  );
};

export default TreatmentsPage;
