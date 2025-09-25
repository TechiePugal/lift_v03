import React, { useEffect, useState } from "react";
import PrescriptionDetails from "../../../components/ui/Customers/pages/CustomerDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { showErrorToast } from "../../../utils/toaster";

import FullScreeeSpinner from "../../../components/common/loading/FullScreee";

const CustomerDetailsPage = ({ }) => {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  // Get the current location
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = () => {
    // navigate(`/prescriptions`);
  };
 

  if (loading) {
    return (
      <div>
        <FullScreeeSpinner />
      </div>
    );
  }

  return (
    <div>
      <PrescriptionDetails
      />
    </div>
  );
};

export default CustomerDetailsPage;
