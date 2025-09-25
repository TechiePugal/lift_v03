import React, { useEffect, useState } from "react";
import PaymentsLayout from "../../components/ui/Payments/PaymentsLayout";
import { getAllInvoice } from "../../api/Payment";
import { showErrorToast } from "../../utils/toaster";
import { formatDate, formatToSearchDate } from "../../utils/date";
import { useLocation } from "react-router-dom";
import {
  setEndDate,
  setStartDate,
  setStatus,
} from "../../store/slice/payment-slice";
import { useDispatch, useSelector } from "react-redux";

const PaymentsPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();

  // Assuming your labs slice has keys startDate, endDate, status, and selectedLab
  const startDate = useSelector((state) => state.payment.startDate);
  const endDate = useSelector((state) => state.payment.endDate);
  const status = useSelector((state) => state.payment.status);

  const setStartDateCall = (e) => {
    dispatch(setStartDate(formatToSearchDate(e)));
  };
  const setEndDateCall = (e) => {
    dispatch(setEndDate(formatToSearchDate(e)));
  };
  const setStatusCall = (e) => {
    dispatch(setStatus(e));
  };

  const getInvoiceData = () => {
    setLoading(true);
    getAllInvoice("", status, startDate, endDate, searchKey)
      .then((response) => {
        console.log({ response });
        setInvoices(response?.data?.data);
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
    getInvoiceData();
  }, [searchKey, status, endDate, startDate]);
  return (
    <div>
      <PaymentsLayout
        invoices={invoices}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        status={status}
        setStatus={setStatusCall}
        loading={loading}
        getInvoiceData={getInvoiceData}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDateCall}
        setEndDate={setEndDateCall}
      />
    </div>
  );
};

export default PaymentsPage;
