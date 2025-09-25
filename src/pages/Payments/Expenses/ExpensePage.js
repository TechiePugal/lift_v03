import React, { useEffect, useState } from "react";
import ExpensesLayout from "../../../components/ui/Payments/pages/Expenses/ExpensesLayout";
import { getAllUtility } from "../../../api/Payment/utilitys";
import { showErrorToast } from "../../../utils/toaster";
import { formatDateToString, formatToSearchDate } from "../../../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { setEndDate, setStartDate } from "../../../store/slice/expense";

const ExpensePage = () => {
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();

  // Assuming your labs slice has keys startDate, endDate, status, and selectedLab
  const startDate = useSelector((state) => state.expense.startDate);
  const endDate = useSelector((state) => state.expense.endDate);

  // Use startDate, endDate, status, and selectedLab as needed

  const setStartDateCall = (e) => {
    dispatch(setStartDate(formatToSearchDate(e)));
  };
  const setEndDateCall = (e) => {
    dispatch(setEndDate(formatToSearchDate(e)));
  };

  const getUtilityData = () => {
    setLoading(true);
    getAllUtility(
      searchKey,
      formatDateToString(startDate),
      formatDateToString(endDate)
    )
      .then((response) => {
        console.log({ response });
        setUtilities(response?.data?.data);
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
    getUtilityData();
  }, [searchKey, endDate, startDate]);
  return (
    <div>
      <ExpensesLayout
        utilities={utilities}
        loading={loading}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        getUtilityData={getUtilityData}
        setStartDate={setStartDateCall}
        setEndDate={setEndDateCall}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default ExpensePage;
