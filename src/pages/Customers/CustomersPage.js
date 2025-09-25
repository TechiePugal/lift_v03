import React, { useEffect, useState } from "react";
import CustomersLayout from "../../components/ui/Customers/CustomersLayout";
import { showErrorToast } from "../../utils/toaster";
import { getAllCustomers } from "../../api/Customers";
import { formatDate, formatToSearchDate } from "../../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PrivateRouteCustomers from "../../components/core/customersPrivateRoute/PrivateRouteCustomers";


// import { setStartDate } from "../../store/slice/customers-slice";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const url = new URL(window.location.href);
  const dispatch = useDispatch();
  //   const startDate = useSelector((state) => state.customer.startDate);

  //   const setStartDateCall = (e) => {
  //     dispatch(setStartDate(formatToSearchDate(e)));
  //   };

  const getCustomersData = () => {
    setLoading(true);
    // If there is a searchKey, set startDate to an empty string
    // const effectiveStartDate = searchKey ? "" : startDate;
    getAllCustomers()
      .then((response) => {
        setCustomers(response?.data?.data);
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
    console.log(searchKey);
    console.log("call 1");
    getCustomersData();
  }, [searchKey]);
  return (
    <PrivateRouteCustomers
    path="/customers"
    currentUser={useSelector((state) => state?.auth)}
  >
    <div>
      <CustomersLayout
        customers={customers}
        loading={loading}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        // setStartDate={setStartDateCall}
        // startDate={startDate}
      />
    </div>
    </PrivateRouteCustomers>
  );
};

export default CustomersPage;
