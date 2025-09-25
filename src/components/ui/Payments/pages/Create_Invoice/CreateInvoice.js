import React, { useEffect, useRef, useState } from "react";
import ProfileSection from "../../../../common/profile/Profile";
import InvoiceDetails from "./invoice_details/InvoiceDetails";
import ServiceTreatmentInfo from "./service_treatment_Info/ServiceTreatmentInfo";
import PaymentInfo from "./payment_info/PaymentInfo";
import Button from "../../../../common/buttons/Button";
import PendingInvoices from "./pending_invoices/PendingInvoices";
import SearchInput from "../../../../common/search";
import DatePicker from "../../../../common/datepicker/DatePicker";

import { useFormik } from "formik";
import * as Yup from "yup";
import { addInvoice, getPendingInvoices } from "../../../../../api/Payment";
import { useNavigate } from "react-router-dom";
import {
  getAllPatients,
  getSinglePatient,
} from "../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { formatDate } from "../../../../../utils/date";
import useDelayedSearch from "../../../../../utils/delayedsearch";
import InputBoxSelect from "../../../../common/input/InputBoxSelect";

const treatmentInfo = {
  name: "",
  amount: 0,
  quantity: 1,
};

const initialValues = {
  patient_id: "",
  date: new Date(),
  treatment_done_info: [treatmentInfo],
  treatment_amount: 0,
  total_amount: 0,
  discount: "",
  paymentIn: {
    date: new Date(),
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
  balance_amount: Yup.number().notRequired(),
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
    amountPaid: Yup.number().required("required"),
    notes: Yup.string().notRequired(),
  }),
});

const CreateInvoiceLayout = ({ patientProfileData, callBack, hideSearch }) => {
  const [patients, setPatients] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [patientProfile, setPatientProfile] = useState(
    patientProfileData || ""
  );
  const [profileLoading, setProfileLoading] = useState(false);
  const [patientId, setPatientId] = useState(patientProfileData?._id || "");
  const [pendingInv, setPendingInv] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  /** Searching for patient and listing */
  const handleAddPatient = () => {
    if (searchKey) {
      getAllPatients(searchKey)
        .then((response) => {
          setPatients(response.data.data);
        })
        .catch(() => {})
        .finally(() => {});
    } else {
      setPatients([]);
    }
  };

  /** For delay in search hook */
  useDelayedSearch(handleAddPatient, 200, [searchKey]);

  /** Selection of patient from list */
  const handleSelectPatient = (patient) => {
    setSearchKey(patient.name);
    setPatients([]);
    setProfileLoading(true);
    setPatientId(patient?._id);
    /** Get pendingInvoices */
    pendingInvoices(patient?._id);
    /** pendingInvoices end */
    getSinglePatient(patient?._id)
      .then((response) => {
        setPatientProfile(response.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setProfileLoading(false);
      });
  };

  const pendingInvoices = (id) => {
    setPendingInv([]);
    getPendingInvoices(id)
      .then((response) => {
        setPendingInv(response.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setProfileLoading(false);
      });
  };

  useEffect(() => {
    if (patientProfileData) {
      pendingInvoices(patientProfileData?._id);
    }
  }, [patientProfileData]);

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
    initialValues,
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
        date: formatDate(values.date),
        // total_amount: values.total_amount - values.discount,
        total_amount: values.total_amount ,
        paymentIn: {
          ...values.paymentIn,
          date: formatDate(values.paymentIn.date),
        },
        patient_id: patientId,
      };

      if (patientProfile) {
        setLoading(true);
        addInvoice(payload)
          .then((response) => {
            if (callBack) {
              callBack(true);
            } else {
              if (response.data?._id) {
                navigation(`/payment_details?id=${response?.data?._id}`);
              }
            }
            showSuccessToast("Invoice Added");
          })
          .catch((error) => {
            showErrorToast(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        showErrorToast({ customError: "Patient Profile is Required" });
      }
    },
  });

  const calculateTotal = (params) => {
    try {
      // Calculate the total amount
      const updatedAmounts = params.map((item, i) => item.amount);

      const newTotalAmount = updatedAmounts?.reduce(
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

  useEffect(() => {
    const allTotal = formik?.values?.treatment_done_info?.reduce(
      (sum, treatment) => sum + (parseFloat(treatment?.amount) || 0),
      0
    );
    const discountedTotal =
      allTotal - (parseFloat(formik.values?.discount) || 0);
    // Calculate amountPaid and balance based on the discount and existing balance
    const balanceTotal = discountedTotal;
    formik.setFieldValue("total_amount", balanceTotal);
  }, [formik.values.discount, formik.values.treatment_done_info]);

  /** For calculation of Balance amount */

  const calculateBalance = async () => {
    try {
      const amountPaid = formik.values?.paymentIn?.amountPaid;
      // Calculate the total amount whenever any of the inputs change
      const newBalance = formik.values.total_amount - amountPaid;
      formik.setFieldValue("balance", newBalance);
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
      <div
        id="block"
        className="flex flex-col lg:flex-row gap-3 lg:justify-between lg:items-center"
      >
        <div className=" flex flex-col lg:flex-row gap-3 ">
          <div className="lg:w-[350px] relative">
            {!hideSearch && (
              <InputBoxSelect
                searchBox={true}
                searchKey={searchKey}
                handleInputChange={(e) => setSearchKey(e)}
                value={"search for patients"}
              >
                {patients?.map((patient, index) => (
                  <div className="w-full">
                    <div
                      key={index}
                      className={`pl-5 border-b h-10 flex justify-between items-center capitalize text-bodyRB text-darkgrey hover:text-white hover:bg-primary hover:cursor-pointer ${
                        index === patient.length - 1
                          ? "rounded-br-15 rounded-bl-15"
                          : ""
                      }`}
                      onClick={() => handleSelectPatient(patient)}
                    >
                      <p>{patient?.name}</p>
                      <p className="text-[13px] mr-5">
                        Id:
                        {patient?.patient_id}
                      </p>
                    </div>
                  </div>
                ))}
              </InputBoxSelect>
            )}
          </div>
        </div>
        <div className="lg:flex items-center gap-3">
          <p className="text-bodyBB text-darkgrey">Invoice Date</p>
          <DatePicker
            className={"lg:!w-[260px] !h-[50px]"}
            startDate={formik?.values?.date}
            onDateChange={(e) => {
              formik.setFieldValue("date", e);
            }}
            error={formik.touched.date && formik.errors.date}
          />
        </div>
      </div>

      {/* Conditionaly rendering profile section  */}
      {patientProfile && (
        <div className={profileLoading ? "animate-pulse" : ""}>
          <ProfileSection patientProfile={patientProfile} />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-flow-col lg:auto-cols-fr gap-1 ">
        <ServiceTreatmentInfo
          formik={formik}
          addRow={addRow}
          removeRow={removeRow}
        />
        <PendingInvoices
          patientId={patientId}
          getpendingInvoices={pendingInvoices}
          pendingInvoices={pendingInv}
        />
      </div>
      <PaymentInfo formik={formik} />
      <div className="grid lg:grid-cols-3">
        <div className="flex flex-col md:flex-row lg:col-start-3 gap-3">
          <Button
            onClick={() => navigation(-1)}
            action={"button"}
            type={"danger"}
          >
            Cancel
          </Button>
          <Button loading={loading} type={"primary"}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateInvoiceLayout;
