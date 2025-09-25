import React, { useEffect, useState } from "react";
import PaymentDetailsLayout from "../../../components/ui/Payments/pages/PaymentDetails/PaymentDetailsLayout";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreeeSpinner from "../../../components/common/loading/FullScreee";
import { showErrorToast } from "../../../utils/toaster";
import { getSingleInvoice } from "../../../api/Payment";

const PaymentDetailsPage = ({paymentId, viewOnly, handleView}) => {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [prescription, setPrescription] = useState({});
  const [next_appointment, setNext_appointment] = useState({});
  // Get the current location
  const location = useLocation();
  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = paymentId || queryParams.get("id");
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/payments`);
  };
  const getInvoiceDetails = () => {
    setLoading(true);
    getSingleInvoice(id)
      .then((response) => {
        console.log({ response });
        setDetails(response?.data?.data);
        setPrescription(response?.data?.prescription);
        setNext_appointment(response?.data?.next_appointment);
      })
      .catch((error) => {
        // showErrorToast(error, "error");
        redirect();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getInvoiceDetails();
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
      <PaymentDetailsLayout
        details={details}
        getInvoiceDetails={getInvoiceDetails}
        prescription={prescription}
        next_appointment={next_appointment}
        viewOnly={viewOnly}
        handleView={handleView}
      />
    </div>
  );
};

export default PaymentDetailsPage;
