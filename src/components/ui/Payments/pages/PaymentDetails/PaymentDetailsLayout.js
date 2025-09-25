import React, { useEffect, useState } from "react";
import ProfileSection from "../../../../common/profile/Profile";
import InvoiceDetails from "./invoice_details/InvoiceDetails";
import ServiceTreatmentInfo from "./service_treatment_Info/ServiceTreatmentInfo";
import PendingInvoices from "./payment_history/PaymentHistory";
import PaymentInfo from "./payment_info/PaymentInfo";
import Button from "../../../../common/buttons/Button";
import CheckMarkWhite from "../../../../icons/CheckMarkWhite";
import Close from "../../../../icons/Close";
import Printer from "../../../../icons/Printer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { useNavigate } from "react-router-dom";
import {
  getAllPatients,
  getSinglePatient,
} from "../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import {
  deleteInvoice,
  getInvoicePrint,
  getPaymentTransactionHistory,
  getPendingInvoices,
  getPrescriptionPrint,
  updateInvoice,
} from "../../../../../api/Payment";
import { formatToSearchDate } from "../../../../../utils/date";
import PaymentTransaction from "./pendint_bills/PaymentTransactions";
import Whatsapp from "../../../../icons/Whatsapp";
import SMS from "../../../../icons/SMS";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import {
  sendInvoiceMessage,
  sendNextappointmentMessage,
  sendPrescriptionMessage,
} from "../../../../../api/communication";
import PaymentTransactionToggle from "./PaymentTransactionToggle";
import { openWhatsappMessager } from "../../../../../utils/opneWhatsapp";

const treatmentInfo = {
  name: "",
  amount: 0,
  quantity: 1,
};

const initialValues = {
  patient_id: "",
  date: "",
  treatment_done_info: [treatmentInfo],
  treatment_amount: 0,
  total_amount: 0,
  discount: "",
  paymentIn: {
    date: "",
    cash: 0,
    upi: 0,
    card: 0,
    bankTransfer: 0,
    amountPaid: 0,
    notes: "",
  },
};

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  treatment_done_info: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Treatment name is required"),
      amount: Yup.number().required("required"),
    })
  ),
  treatment_amount: Yup.number().required("required"),
  total_amount: Yup.number().required("required"),
  balance: Yup.number().notRequired(),
  discount: Yup.number().notRequired(),
  paymentIn: Yup.object().shape({
    date: Yup.string().required("Payment date is required"),
    cash: Yup.number()
      .transform((originalValue, originalObject) => {
        const parsedValue = parseFloat(originalValue);
        return isNaN(parsedValue) ? undefined : parsedValue;
      })
      .required("Please enter a valid amount"),
    upi: Yup.number()
      .transform((originalValue, originalObject) => {
        const parsedValue = parseFloat(originalValue);
        return isNaN(parsedValue) ? undefined : parsedValue;
      })
      .required("Please enter a valid amount"),
    card: Yup.number()
      .transform((originalValue, originalObject) => {
        const parsedValue = parseFloat(originalValue);
        return isNaN(parsedValue) ? undefined : parsedValue;
      })
      .required("Please enter a valid amount"),
    bankTransfer: Yup.number()
      .transform((originalValue, originalObject) => {
        const parsedValue = parseFloat(originalValue);
        return isNaN(parsedValue) ? undefined : parsedValue;
      })
      .required("Please enter a valid amount"),
    amountPaid: Yup.number().nullable().required("Required"),
    notes: Yup.string().notRequired(),
  }),
});

const PaymentDetailsLayout = ({
  details,
  getInvoiceDetails,
  prescription,
  next_appointment,
  viewOnly,
  handleView,
}) => {
  const [pendingInv, setPendingInv] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [communicationChannel, setCommunicationChannel] = useState({
    whatsapp: details?.patient_id?.whatsapp || false,
    sms: details?.patient_id?.sms || false,
  });
  const [prescriptionSendSuccess, setPrescriptionSendSuccess] = useState(false);
  const [nextAppntSendSuccess, setNextAppntSendSuccess] = useState(false);
  const [invoiceSendSuccess, setInvoiceSendSuccess] = useState(false);
  const [prescriptionLoading, setPrescriptionLoading] = useState(false);
  const [nextAppntLoading, setNextAppntLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [loadingPrintInvoice, setLoadingPrintInvoice] = useState(false);
  const [loadingPrintPrescription, setLoadingPrintPrescription] =
    useState(false);
  const [toggle, setToggle] = useState("Payment History");

  const handleWhatsappClick = () => {
    setCommunicationChannel((prevState) => ({
      ...prevState,
      whatsapp: !prevState.whatsapp, // Toggle the value
    }));
  };

  const handleSmsClick = () => {
    setCommunicationChannel((prevState) => ({
      ...prevState,
      sms: !prevState.sms, // Toggle the value
    }));
  };

  const handleconfirmation = (props) => {
    setConfirmOpen(!confirmOpen);
  };

  const navigation = useNavigate();

  const handleEdit = () => {
    setEdit(!edit);
  };

  const pendingInvoices = () => {
    if (details?.patient_id?._id) {
      setPendingInv([]);
      getPendingInvoices(details?.patient_id?._id)
        .then((response) => {
          setPendingInv(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
  };

  useEffect(() => {
    if (details && (details?.sendWhatsapp || details?.sms)) {
      setInvoiceSendSuccess(true);
    }
    if (prescription && (prescription?.sendWhatsapp || prescription?.sms)) {
      setPrescriptionSendSuccess(true);
    }
    if (
      next_appointment &&
      (next_appointment?.sendWhatsapp || next_appointment?.sms)
    ) {
      setNextAppntSendSuccess(true);
    }
  }, [details]);

  const getPaymentHistory = () => {
    if (details?._id) {
      setPaymentHistory([]);
      getPaymentTransactionHistory(details?._id)
        .then((response) => {
          setPaymentHistory(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
  };

  const getTheBills = () => {
    getPaymentHistory();
    pendingInvoices();
  };

  useEffect(() => {
    getTheBills();
  }, [details]);

  /** Adding New row */
  const addRow = () => {
    formik.setValues({
      ...formik.values,
      treatment_done_info: [
        ...formik.values.treatment_done_info,
        treatmentInfo,
      ],
    });
  };

  /** Removing row using index */
  const removeRow = (index) => {
    const updatedItems = [...formik.values.treatment_done_info];
    if (updatedItems.length !== 1) updatedItems.splice(index, 1);
    formik.setValues({
      ...formik.values,
      treatment_done_info: updatedItems,
    });
    calculateTotal(updatedItems);
  };

  const formik = useFormik({
    initialValues: {
      patient_id: details?.patient_id?._id,
      date: details?.date,
      treatment_done_info: details?.treatment_done_info,
      treatment_amount: details.treatment_amount,
      total_amount: details.total_amount,
      discount: details?.discount,
      balance: details?.oldBalance,
      paymentIn: {
        date: new Date(),
        cash: 0,
        upi: 0,
        card: 0,
        bankTransfer: 0,
        amountPaid: 0,
        notes: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Check if the balance is less than 0
      if (values?.balance < 0) {
        // Display an error or take appropriate action
        console.error("Balance cannot be negative.");
        showErrorToast({ customError: "Balance cannot be negative." });
        return;
      }
      const payload = {
        ...values,
        date: formatToSearchDate(values.date),
        paymentIn: {
          ...values.paymentIn,
          date: formatToSearchDate(values.paymentIn.date),
        },
      };
      setLoading(true);
      updateInvoice(payload, details._id)
        .then(() => {
          showSuccessToast("Invoice Updated");
          getInvoiceDetails();
          setEdit(false);
          formik.resetForm();
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const calculateTotal = (params) => {
    try {
      // Calculate the total amount
      const updatedAmounts = params.map((item, i) => item.amount);

      const newTotalAmount = updatedAmounts.reduce(
        (acc, amount) => acc + parseFloat(amount),
        0
      );
      /** Set to formik */
      if (newTotalAmount)
        formik.setFieldValue("treatment_amount", newTotalAmount);
      if (newTotalAmount) formik.setFieldValue("total_amount", newTotalAmount);
      const newBalance =
        parseFloat(newTotalAmount) - formik?.values?.paymentIn?.amountPaid;
      if (newBalance >= 0) formik.setFieldValue("balance_amount", newBalance);
      if (newBalance >= 0) formik.setFieldValue("balance", newBalance);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    deleteInvoice(details?._id)
      .then((response) => {
        showSuccessToast("Deleted Successfully");
        handleconfirmation();
        navigation(-1);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const sendPrescription = () => {
    const payload = {
      prescriptionId: prescription?._id,
      ...communicationChannel,
    };
    if (payload.sms || payload.whatsapp) {
      setPrescriptionLoading(true);
      sendPrescriptionMessage(payload)
        .then((response) => {
          showSuccessToast("Prescription Send Successfully");
          setPrescriptionSendSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          showErrorToast(error, "error");
        })
        .finally(() => {
          setPrescriptionLoading(false);
        });
    } else {
      showErrorToast(
        {
          customError: "Please Select any Communication Channel",
        },
        "error"
      );
    }
  };

  const sendInvoice = () => {
    const payload = { invoiceId: details?._id, ...communicationChannel };
    if (payload.sms || payload.whatsapp) {
      setInvoiceLoading(true);
      sendInvoiceMessage(payload)
        .then((response) => {
          showSuccessToast("Invoice Send Successfully");
          setInvoiceSendSuccess(true);
          /** Open Whatsapp for essentials subscription users */
          openWhatsappMessager(response.data?.essentials_whatsapp_url);
        })
        .catch((error) => {
          console.log(error);
          showErrorToast(error, "error");
        })
        .finally(() => {
          setInvoiceLoading(false);
        });
    } else {
      showErrorToast(
        {
          customError: "Please Select any Communication Channel",
        },
        "error"
      );
    }
  };
  const sendNextappointment = () => {
    const payload = {
      appointmentId: next_appointment?._id,
      ...communicationChannel,
    };
    if (payload.sms || payload.whatsapp) {
      sendNextappointmentMessage(payload)
        .then((response) => {
          showSuccessToast("Nextappointment Send Successfully");
          setNextAppntSendSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          showErrorToast(error, "error");
        })
        .finally(() => {
          setNextAppntLoading(false);
        });
    } else {
      showErrorToast(
        {
          customError: "Please Select any Communication Channel",
        },
        "error"
      );
    }
  };

  const printInvoice = () => {
    setLoadingPrintInvoice(true);
    getInvoicePrint(details?._id)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setLoadingPrintInvoice(false);
      });
  };
  const printPrescription = () => {
    setLoadingPrintPrescription(true);
    getPrescriptionPrint(prescription?._id)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setLoadingPrintPrescription(false);
      });
  };

  /** For calculating the total amount */

  const calculateTotalAmount = () => {
    try {
      const allTotal = formik?.values?.treatment_done_info?.reduce(
        (sum, treatment) => sum + (parseFloat(treatment?.amount) || 0),
        0
      );

      const discountedTotal =
        allTotal - (parseFloat(formik.values?.discount) || 0);
      // Calculate amountPaid and balance based on the discount and existing balance
      const balanceTotal = discountedTotal;
      formik.setFieldValue("total_amount", balanceTotal);
      formik.setFieldValue("treatment_amount", allTotal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [formik.values.discount, formik.values.treatment_done_info]);

  /** Total calculation end */

  /** For calculation of Balance amount */

  const calculateBalance = async () => {
    try {
      const amountPaid =
        details?.oldTotalPayment + formik.values?.paymentIn?.amountPaid;
      // Calculate the total amount whenever any of the inputs change
      const newBalance = formik.values.total_amount - amountPaid;
      formik.setFieldValue("balance", newBalance);

      if (formik.values.total_amount === 0) {
        setStatus("Free Visit");
      } else if (formik.values.total_amount === newBalance) {
        setStatus("Pending");
      } else if (newBalance === 0) {
        setStatus("Paid");
      } else if (newBalance > 0) {
        setStatus("Partially-Paid");
      } else setStatus("ERROR");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    calculateBalance();
  }, [pendingInv, formik.values.total_amount, formik.values.paymentIn]);

  /** calculation of Balance amount end */

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 pb-12">
      <ProfileSection patientProfile={details.patient_id} />
      <InvoiceDetails
        details={details}
        status={status}
        formik={formik}
        edit={edit}
      />

      <div className="grid grid-cols-1 lg:grid-flow-col lg:auto-cols-fr gap-1 ">
        <ServiceTreatmentInfo
          formik={formik}
          addRow={addRow}
          removeRow={removeRow}
          edit={edit}
        />
        <PaymentTransactionToggle
          toggle={toggle}
          setToggle={setToggle}
          pendingInv={pendingInv}
          paymentHistory={paymentHistory}
        >
          {toggle === "Payment History" && (
            <PaymentTransaction
              status={status}
              getpendingInvoices={getPaymentHistory}
              pendingInvoices={paymentHistory}
              edit={edit}
              getInvoiceDetails={getInvoiceDetails}
              totalAmount={details?.total_amount}
            />
          )}
          {toggle === "Pending Bills" && (
            <PendingInvoices
              status={status}
              getInvoiceDetails={getInvoiceDetails}
              getpendingInvoices={pendingInvoices}
              pendingInvoices={pendingInv}
              edit={edit}
              details={details} 
            />
          )}
        </PaymentTransactionToggle>

        {/* {status &&
          (status === "Free Visit" ||
            status === "Pending" ||
            status === "Create" ||
            status === "ERROR") &&
          pendingInv?.length >= 0 && (
            <PaymentHistory
              status={status}
              getpendingInvoices={pendingInvoices}
              getInvoiceDetails={getInvoiceDetails}
              pendingInvoices={pendingInv}
              edit={edit}
            />
          )}
        {status &&
          (status === "Partially-Paid" || status === "Paid") &&
          pendingInv?.length >= 0 && (
            <PaymentTransaction
              status={status}
              getpendingInvoices={getPaymentHistory}
              pendingInvoices={pendingInv}
              edit={edit}
              getInvoiceDetails={getInvoiceDetails}
              totalAmount={details?.total_amount}
            />
          )} */}
      </div>
      <PaymentInfo formik={formik} edit={edit} details={details} />
      {!edit && (
        <div className="lg:flex justify-between items-start">
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <p className="text-bodyRB">Communications</p>
              <div className="shadow-card rounded-15 flex justify-center p-2">
                <div className="flex items-center gap-1">
                  <input
                    checked={communicationChannel?.whatsapp}
                    onClick={handleWhatsappClick}
                    type="checkbox"
                    className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                  />
                  <p className="text-bodyRB text-darkgrey">Whatsapp</p>
                  <div className="mt-1">
                    <Whatsapp />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    onClick={handleSmsClick}
                    checked={communicationChannel?.sms}
                    type="checkbox"
                    className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                  />
                  <p className="text-bodyRB text-darkgrey">SMS</p>
                  <div className="mt-1">
                    <SMS />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-bodyRB">Messaging</p>
              <div className="shadow-card rounded-15 flex flex-col justify-center p-2 gap-2">
                {next_appointment && (
                  <Button
                    action={"button"}
                    type={"yes"}
                    className={"!py-[5px] h-[40px]"}
                    loading={nextAppntLoading}
                    onClick={sendNextappointment}
                  >
                    {nextAppntSendSuccess && <CheckMarkWhite />}
                    Next Appnt
                  </Button>
                )}
                {prescription && (
                  <Button
                    action={"button"}
                    type={"yes"}
                    className={"!py-[5px] h-[40px]"}
                    onClick={sendPrescription}
                    loading={prescriptionLoading}
                  >
                    {prescriptionSendSuccess && <CheckMarkWhite />}
                    Prescription
                  </Button>
                )}
                <Button
                  type={"yes"}
                  action={"button"}
                  className={"!py-[5px] h-[40px]"}
                  loading={invoiceLoading}
                  onClick={sendInvoice}
                >
                  {invoiceSendSuccess && <CheckMarkWhite />}
                  Invoice
                </Button>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 col-span-2 col-start-4 gap-2 items-center">
            <div className="">
              <p className="text-bodyRB">Print</p>
              <div className="shadow-card rounded-15 flex flex-col gap-2 justify-center p-2 items-center">
                {prescription && (
                  <Button
                    onClick={printPrescription}
                    action={"button"}
                    loading={loadingPrintPrescription}
                    className={"bg-pink-gradient text-white !py-[5px] h-[40px]"}
                  >
                    <Printer />
                    Prescription
                  </Button>
                )}
                <Button
                  onClick={printInvoice}
                  loading={loadingPrintInvoice}
                  action={"button"}
                  className={"bg-pink-gradient text-white !py-[5px] h-[40px]"}
                >
                  <Printer />
                  Invoice
                </Button>
              </div>
            </div>
            <div className="mt-5">
              <Button
                onClick={() => {
                  handleconfirmation();
                }}
                action={"button"}
                type={"danger"}
                className={"!py-[5px] h-[45px] lg:!w-[200px]"}
              >
                Delete
              </Button>
            </div>
            <div className="mt-5">
              <Button
                onClick={handleEdit}
                action={"button"}
                type={"primary"}
                className={"!py-[5px] h-[45px] lg:!w-[200px]"}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      )}
      {edit && (
        <div className="grid lg:grid-cols-3">
          <div className="flex flex-col md:flex-row lg:col-start-3 gap-3">
            <Button action={"button"} type={"danger"} onClick={handleEdit}>
              Cancel
            </Button>
            <Button loading={loading} type={"primary"}>
              Save
            </Button>
          </div>
        </div>
      )}
      <ModalWrapper open={confirmOpen} handleClose={handleconfirmation}>
        <div className="flex flex-col gap-10">
          <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
            Are you sure that you want to delete this Payment
            <span className="text-bodyBB pl-1 pr-1 text-darkgrey"></span>?
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleconfirmation}
              type={"danger"}
              className={"text-heading2B"}
            >
              No
            </Button>
            <Button
              onClick={handleDelete}
              type={"yes"}
              className={"text-heading2B"}
            >
              Yes
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </form>
  );
};

export default PaymentDetailsLayout;
