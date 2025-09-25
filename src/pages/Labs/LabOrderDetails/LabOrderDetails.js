import React, { useEffect, useState } from "react";
import LabOrderDetails from "../../../components/ui/Labs/pages/LabOrderDetails";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreeeSpinner from "../../../components/common/loading/FullScreee";
import { showErrorToast } from "../../../utils/toaster";
import { getSingleLab } from "../../../api/Labs";

const LabOrderDetailsPage = ({ labId,  viewOnly, handleViewLab }) => {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  // Get the current location
  const location = useLocation();
  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = labId || queryParams.get("id");
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/labs`);
  };
  useEffect(() => {
    setLoading(true);
    getSingleLab(id)
      .then((response) => {
        console.log({ response });
        setDetails(response.data.data);
      })
      .catch((error) => {
        showErrorToast(error, "error");
        redirect();
      })
      .finally(() => {
        setLoading(false);
      });
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
      <LabOrderDetails details={details}  viewOnly={viewOnly} handleViewLab={handleViewLab}/>
    </div>
  );
};

export default LabOrderDetailsPage;
