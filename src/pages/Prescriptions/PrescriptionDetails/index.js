import React, { useEffect, useState } from "react";
import PrescriptionDetails from "../../../components/ui/Prescriptions/pages/PrescriptionDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSinglePrescription } from "../../../api/Prescriptions";
import { showErrorToast } from "../../../utils/toaster";

import FullScreeeSpinner from "../../../components/common/loading/FullScreee";


const PrescriptionDetailsPage = ({ prescriptionId, getPrescriptionDataList, viewOnly, handleViewPrescription }) => {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  // Get the current location
  const location = useLocation();
  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = prescriptionId || queryParams.get("id");
  const navigate = useNavigate();
  const redirect = () => {
    // navigate(`/prescriptions`);
  };
  const prescriptionDetails = () => {
    setLoading(true);
    getSinglePrescription(id)
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
    prescriptionDetails();
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
      <PrescriptionDetails
        details={details}
        prescriptionDetails={prescriptionDetails}
        getPrescriptionDataList={getPrescriptionDataList}
        viewOnly={viewOnly}
        handleViewPrescription={handleViewPrescription}
      />
    </div>
  );
};

export default PrescriptionDetailsPage;
