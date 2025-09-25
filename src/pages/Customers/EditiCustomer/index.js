import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditCustomer from "../../../components/ui/Customers/pages/EditCustomer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSingleCustomer } from "../../../api/Customers";
import { showErrorToast } from "../../../utils/toaster";

import FullScreeeSpinner from "../../../components/common/loading/FullScreee";
import PrivateRouteCustomers from "../../../components/core/customersPrivateRoute/PrivateRouteCustomers";

const EditCustomerPage = () => {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  // Get the current location
  const location = useLocation();
  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.auth); // Moved useSelector here
  const redirect = () => {
    // navigate(`/prescriptions`);
  };
  const customerDetails = () => {
    setLoading(true);
    getSingleCustomer(id)
      .then((response) => {
        setDetails(response.data?.data);
      })
      .catch((error) => {
        showErrorToast(error, "error");
        redirect();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    customerDetails();
  }, [id]);

  if (loading) {
    return (
      <div>
        <FullScreeeSpinner />
      </div>
    );
  }

  return (
    <PrivateRouteCustomers path="/edit_customer" currentUser={currentUser}>
      <div>
        <EditCustomer
          details={details}
          // prescriptionDetails={prescriptionDetails}
          // getPrescriptionDataList={getPrescriptionDataList}
          // viewOnly={viewOnly}
          // handleViewPrescription={handleViewPrescription}
        />
      </div>{" "}
    </PrivateRouteCustomers>
  );
};

export default EditCustomerPage;
