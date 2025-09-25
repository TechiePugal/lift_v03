import React, { useEffect, useState } from "react";
import Labs from "../../components/ui/Settings/Labs/Labs";
import LabsLayout from "../../components/ui/Labs/LabsLayout";
import { getAllLabs } from "../../api/Labs";
import { getAllLabs as getAllLabListData } from "../../api/settings/Labs";
import { showErrorToast } from "../../utils/toaster";
import { useNavigate, useLocation } from "react-router-dom";
import { formatDate, formatToSearchDate } from "../../utils/date";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndDate,
  setSelectedLab,
  setStartDate,
  setStatus,
} from "../../store/slice/labs-slice";
import useDelayedSearch from "../../utils/delayedsearch";

const LabsPage = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [labList, setLabList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Assuming your labs slice has keys startDate, endDate, status, and selectedLab
  const startDate = useSelector((state) => state.labs.startDate);
  const endDate = useSelector((state) => state.labs.endDate);
  const status = useSelector((state) => state.labs.status);
  const selectedLab = useSelector((state) => state.labs.selectedLab);

  // Use startDate, endDate, status, and selectedLab as needed

  const setStartDateCall = (e) => {
    dispatch(setStartDate(formatToSearchDate(e)));
  };
  const setEndDateCall = (e) => {
    dispatch(setEndDate(formatToSearchDate(e)));
  };
  const setStatusCall = (e) => {
    dispatch(setStatus(e));
  };
  const setSelectedLabCall = (e) => {
    dispatch(setSelectedLab(e));
  };

  const getAllLabList = () => {
    /** For Filtering */
    getAllLabListData(searchKey)
      .then((response) => {
        setLabList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  const getLabsData = () => {
    setLoading(true);
    getAllLabs(searchKey, status, selectedLab, startDate, endDate)
      .then((response) => {
        console.log({ response });
        setLabs(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllLabList();
  }, []);


  useDelayedSearch(getLabsData, 200, [status, selectedLab, endDate, startDate]);

  return (
    <div>
      <LabsLayout
        labs={labs}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        status={status}
        setStatus={setStatusCall}
        labList={labList}
        setSelectedLab={setSelectedLabCall}
        selectedLab={selectedLab}
        loading={loading}
        setStartDate={setStartDateCall}
        setEndDate={setEndDateCall}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default LabsPage;
