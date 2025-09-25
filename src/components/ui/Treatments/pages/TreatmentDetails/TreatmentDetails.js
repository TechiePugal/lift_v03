import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../../../../common/profile/Profile";
import ClinicalData from "./clinical_data/ClinicalData";
import TreatmentDone from "./treatment_done/TreatmentDone";
import Prescription from "./prescription/Prescription";
import UpcomingTreatment from "./upcoming_treatment/UpcomingTreatment";
import LabOrder from "./lab_order/LabOrder";
import Invoice from "./invoice/Invoice";
import UploadImages from "./upload_images/UploadImages";
import Button from "../../../../common/buttons/Button";
import {
  addTreatmentData,
  updateTreatmentImages,
} from "../../../../../api/Treatments";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { formatDate } from "../../../../../utils/date";
import { generateRandomId } from "../../../../../utils/other";

const treatment_info = {
  teeth1: "",
  teeth2: "",
  teeth3: "",
  teeth4: "",
  name: "",
};
const treatment_done_info = {
  teeth1: "",
  teeth2: "",
  teeth3: "",
  teeth4: "",
  name: "",
  doctor: "",
  id: 1232,
  quantity: 1,
};

const medicineInfo = {
  medicine: "",
  days: "",
  before_after_food: "",
  morning: "",
  afternoon: "",
  evening: "",
  night: "",
  medicine_type: "",
  quantity: 0,
};

const labInfo = {
  teeth1: "",
  teeth2: "",
  teeth3: "",
  teeth4: "",
  lab: "",
  work_type: "",
  order_date: new Date(),
  notes: "",
};

const treatmentDone = {
  name: "",
  amount: "",
  quantity: 1,
};
const validationSchema = Yup.object().shape({
  prescription: Yup.object().shape({
    date: Yup.string(),
    medicine_info: Yup.array().of(
      Yup.object().shape({
        medicine: Yup.string()
        // medicine_type: Yup.string(),
        // days: Yup.number(),
        // before_after_food: Yup.string(),
        // morning: Yup.number(),
        // afternoon: Yup.number(),
        // evening: Yup.number(),
        // night: Yup.number(),
        // quantity: Yup.number(),
      })
    ),
    notes: Yup.string(),
  }),
  
});

const TreatmentDetails = ({
  appointments,
  doctores,
  medicines,
  labs,
  labsWorks,
  treatments,
  clinicalData,
  setClinicalData,
  updateClinicalDataInfo,
  loadingClinicalData,
  showUpdateClinicalData,
  setShowUpdateClinicalData,
  patientProfile,
  fromEdit,
  editData,
  addTreatment,
  callBack,
  setSearchDoctors,
  setSearchMedicines,
  setSearchLabs,
  setSearchLabWorks,
  setSearchTreatment,
}) => {
 
 
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState([]);
  const navigation = useNavigate();

  /** Adding New row */
  const addRowUpcoming = () => {
    formik.setValues({
      ...formik.values,
      next_treatment: {
        ...formik.values.next_treatment,
        next_treatment_info: [
          ...(formik.values.next_treatment?.next_treatment_info || []),
          treatment_info,
        ],
      },
    });
  };
  const addRowMed = () => {
    formik.setValues({
      ...formik.values,
      prescription: {
        ...formik.values.prescription,
        medicine_info: [
          ...(formik.values.prescription?.medicine_info || []),
          medicineInfo,
        ],
      },
    });
  };
  const addRowLab = () => {
    formik.setValues({
      ...formik.values,
      lab_info: [...(formik.values.lab_info || []), labInfo],
    });
  };
  const addRowInvoice = () => {
    formik.setValues({
      ...formik.values,
      invoice: {
        ...formik.values.invoice,
        treatment_done_info: [
          ...(formik.values.invoice?.treatment_done_info || []),
          treatmentDone,
        ],
      },
    });
  };
  const addRow = () => {
    formik.setValues({
      ...formik.values,
      treatment_done: {
        ...formik.values.treatment_done,
        treatment_done_info: [
          ...(formik.values.treatment_done?.treatment_done_info || []),
          { ...treatment_done_info, id: generateRandomId() },
        ],
      },
    });
  };

  /** Removing row using index */
  const removeRowUpcoming = (index) => {
    const updatedItems = [...formik.values.next_treatment.next_treatment_info];
    if (updatedItems.length !== 1) {
      updatedItems.splice(index, 1);
      formik.setValues({
        ...formik.values,
        next_treatment: {
          ...formik.values.next_treatment,
          next_treatment_info: updatedItems,
        },
      });
    }
  };

  const removeRowMed = (index) => {
    const updatedItems = [...formik.values.prescription.medicine_info];
    if (updatedItems.length !== 1) {
      updatedItems.splice(index, 1);
      formik.setValues({
        ...formik.values,
        prescription: {
          ...formik.values.prescription,
          medicine_info: updatedItems,
        },
      });
    }
  };
  const removeRowLab = (index) => {
    const updatedItems = [...formik.values.lab_info];
    if (updatedItems.length !== 1) {
      updatedItems.splice(index, 1);
      formik.setValues({
        ...formik.values,
        lab_info: updatedItems,
      });
    }
  };
  const removeRowInvoice = (index) => {
    const updatedItems = [...formik.values.invoice.treatment_done_info];
    if (updatedItems.length !== 1) {
      updatedItems.splice(index, 1);
      formik.setValues({
        ...formik.values,
        invoice: {
          ...formik.values.invoice,
          treatment_done_info: updatedItems,
        },
      });
    }
  };

  const updateInvoiceTotal = (params) => {
    // Update the amounts array with the new input value
    const updatedAmounts = params.map((item, i) => item?.amount);
    try {
      // Calculate the total amount
      const newTotalAmount = updatedAmounts?.reduce(
        (acc, amount) => acc + parseFloat(amount),
        0
      );

      if (!isNaN(newTotalAmount)) {
        // Set the new total amount to formik
        formik.setFieldValue("invoice.treatment_amount", newTotalAmount);
        formik.setFieldValue("invoice.total_amount", newTotalAmount);
      } else {
        console.error("Total amount is not a valid number");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Remove row from treatment done
  const removeRow = (index, id) => {
    const { treatment_done, invoice } = formik.values;
    const updatedItems = [...treatment_done.treatment_done_info];

    if (updatedItems.length > 1) {
      updatedItems.splice(index, 1);

      const updatedInvoiceWithoutItem = invoice.treatment_done_info.filter(
        (item) => item.id !== id
      );

      if (updatedInvoiceWithoutItem.length === 0) {
        updatedInvoiceWithoutItem.push(treatmentDone); // Assuming treatmentDone is defined elsewhere
      }
      formik.setValues({
        ...formik.values,
        treatment_done: {
          ...treatment_done,
          treatment_done_info: updatedItems,
        },
        invoice: {
          ...invoice,
          treatment_done_info: updatedInvoiceWithoutItem,
        },
      });
      updateInvoiceTotal(updatedInvoiceWithoutItem);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      treatment_done: {
        date: appointments?.appointment_date || formatDate(new Date()),
        notes: "",
        treatment_done_info: appointments?.next_treatment_info || [
          treatment_done_info,
        ],
      },
      next_treatment: {
        appointment_date: "",
        appointment_time: "",
        doctor: "",
        notes: "",
        next_treatment_info: [treatment_info],
      },
      prescription: {
        date: appointments?.appointment_date || formatDate(new Date()),
        medicine_info: [medicineInfo],
        notes: "",
      },
      lab_info: [labInfo],
      invoice: {
        date: appointments?.appointment_date || formatDate(new Date()),
        treatment_done_info: [treatmentDone],
        treatment_amount: 0,
        total_amount: 0,
        no_bill: false,
      },
    },
    // validationSchema,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("11111update")
      if (imageData?.length > 0) {
        setLoading(true);
        updateTreatmentImages(imageData)
          .then((img) => {
            const imgNames = [...img?.data?.data];
            handleAddTreatment(values, imgNames);
          })
          .catch((error) => {
            showErrorToast(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        handleAddTreatment(values, []);
      }
    },
  });
  console.log(formik,"formikk in treatement details")
  console.log(formik.errors,"error formikk in treatement details")

  const handleAddTreatment = (values, imgs) => {
    const payload = {
      ...values,
      treatment_done: {
        ...values.treatment_done,
        date: formatDate(values?.treatment_done?.date),
        images: imgs,
      },
      next_treatment: {
        ...values.next_treatment,
        appointment_date: formatDate(values.next_treatment?.appointment_date),
      },
      lab_info: values.lab_info.map((labItem) => ({
        ...labItem,
        order_date: formatDate(labItem.order_date),
      })),
      prescription: {
        ...values.prescription,
        date: formatDate(values.prescription?.date),
        medicine_info: values.prescription.medicine_info.filter(info => info.medicine !== ""),
        
      },
      invoice: {
        ...values.invoice,
        date: formatDate(values.invoice?.date),
      },
      config: clinicalData,
      appointment_id: appointments?._id,
      patient_id: appointments?.patient_id?._id || patientProfile?._id,
    };
    setLoading(true);

    addTreatmentData(payload)
      .then(() => {
        showSuccessToast("Treatment Added");
        if (addTreatment) {
          callBack("close");
        } else {
          navigation("/treatments");
        }
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    formik.setFieldValue("invoice.date", appointments?.appointment_date);
    formik.setFieldValue(`prescription.date`, appointments?.appointment_date);
    formik.setFieldValue(
      `next_treatment.appointment_date`,
      appointments?.appointment_date
    );
    const updatedLabInfo = formik.values?.lab_info?.map((item) => ({
      ...item,
      order_date: appointments?.appointment_date,
    }));
    formik.setFieldValue(`lab_info`, updatedLabInfo);
  }, [appointments]);
  
   return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 pb-10">
      <ProfileSection
        patientProfile={appointments?.patient_id || patientProfile}
      />
      <ClinicalData
        clinicalData={clinicalData}
        setClinicalData={setClinicalData}
        updateClinicalDataInfo={updateClinicalDataInfo}
        loadingClinicalData={loadingClinicalData}
        showUpdateClinicalData={showUpdateClinicalData}
        setShowUpdateClinicalData={setShowUpdateClinicalData}
      />
      <TreatmentDone
        formik={formik}
        addRow={addRow}
        removeRow={removeRow}
        doctores={doctores}
        treatments={treatments}
        editData={editData}
        addTreatment={addTreatment}
        setSearchTreatment={setSearchTreatment}
        setSearchDoctors={setSearchDoctors}
      />
      <UpcomingTreatment
        formik={formik}
        addRow={addRowUpcoming}
        removeRow={removeRowUpcoming}
        doctores={doctores}
        treatments={treatments}
        editData={editData}
        setSearchTreatment={setSearchTreatment}
        setSearchDoctors={setSearchDoctors}
      />
      <Prescription
        medicines={medicines}
        formik={formik}
        addRow={addRowMed}
        removeRow={removeRowMed}
        editData={editData}
        setSearchMedicines={setSearchMedicines}
      />
      <LabOrder
        formik={formik}
        labs={labs}
        labsWorks={labsWorks}
        addRow={addRowLab}
        removeRow={removeRowLab}
        editData={editData}
        setSearchLabs={setSearchLabs}
        setSearchLabWorks={setSearchLabWorks}
      />
      <Invoice
        formik={formik}
        treatments={treatments}
        addRow={addRowInvoice}
        removeRow={removeRowInvoice}
        editData={editData}
        setSearchTreatment={setSearchTreatment}
      />
      <UploadImages imageData={imageData} setImageData={setImageData} />
      <div className="grid md:grid-cols-3">
        <div className="grid md:grid-cols-2 gap-5 md:col-start-3 ">
          <Button
            action={"button"}
            type={"secondary"}
            onClick={() => navigation("/treatments")}
          >
            Close
          </Button>
          <Button type={"primary"} loading={loading}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TreatmentDetails;
