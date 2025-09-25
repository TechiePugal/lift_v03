import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../../../../../../common/profile/Profile";
import ClinicalData from "./clinical_data/ClinicalData";
import TreatmentDone from "./treatment_done/TreatmentDone";
import Prescription from "./prescription/Prescription";
import UpcomingTreatment from "./upcoming_treatment/UpcomingTreatment";
import LabOrder from "./lab_order/LabOrder";
import Invoice from "./invoice/Invoice";
import UploadImages from "./upload_images/UploadImages";
import Button from "../../../../../../common/buttons/Button";
import {
  addTreatmentData,
  updateTreatmentImages,
} from "../../../../../../../api/Treatments";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../../../utils/toaster";

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
};

const treatmentInfoSchema = Yup.object().shape({
  teeth1: Yup.string(),
  teeth2: Yup.string(),
  teeth3: Yup.string(),
  teeth4: Yup.string(),
  name: Yup.string().required("required"),
});
const treatmentSchema = Yup.object().shape({
  teeth1: Yup.string(),
  teeth2: Yup.string(),
  teeth3: Yup.string(),
  teeth4: Yup.string(),
  name: Yup.string().required("required"),
  doctor: Yup.string().required("required"),
});

const medicineInfoSchema = Yup.object().shape({
  medicine: Yup.string().required("required"),
  days: Yup.string().required("required"),
  before_after_food: Yup.string().required("required "),
  morning: Yup.string(),
  afternoon: Yup.string(),
  evening: Yup.string(),
  night: Yup.string(),
  medicine_type: Yup.string(),
  quantity: Yup.number().notRequired(),
});

const labInfoSchema = Yup.object().shape({
  teeth1: Yup.string(),
  teeth2: Yup.string(),
  teeth3: Yup.string(),
  teeth4: Yup.string(),
  lab: Yup.string().required("required"),
  work_type: Yup.string().required("required"),
  order_date: Yup.date().required("required"),
  notes: Yup.string(),
});

const treatmentDoneSchema = Yup.object().shape({
  name: Yup.string().required("required"),
  amount: Yup.number().required("required").positive(""),
});

const validationSchema = Yup.object().shape({
  treatment_done: Yup.object().shape({
    notes: Yup.string(),
    next_treatment_info: Yup.array().of(treatmentSchema),
  }),
  next_treatment: Yup.object().shape({
    appointment_date: Yup.string().required("required"),
    appointment_time: Yup.string().required("required"),
    doctor: Yup.string().required("required"),
    notes: Yup.string(),
    next_treatment_info: Yup.array().of(treatmentInfoSchema),
  }),
  prescription: Yup.object().shape({
    medicine_info: Yup.array().of(medicineInfoSchema),
    notes: Yup.string(),
  }),
  lab_info: Yup.array().of(labInfoSchema),
  invoice: Yup.object().shape({
    date: Yup.date().required("required"),
    treatment_done_info: Yup.array().of(treatmentDoneSchema),
    treatment_amount: Yup.number(),
    total_amount: Yup.number(),
    no_bill: Yup.boolean(),
  }),
});

const TreatmentDetails05 = ({
  patientProfile,
  doctores,
  medicines,
  labs,
  labsWorks,
  treatments,
  clinicalData,
  setClinicalData,
  updateClinicalDataInfo,
  loadingClinicalData,
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
        next_treatment_info: [
          ...(formik.values.treatment_done?.next_treatment_info || []),
          treatment_done_info,
        ],
      },
    });
  };

  /** Removing row using index */
  const removeRowUpcoming = (index) => {
    const updatedItems = [...formik.values.next_treatment.next_treatment_info];
    updatedItems.splice(index, 1);
    formik.setValues({
      ...formik.values,
      next_treatment: {
        ...formik.values.next_treatment,
        next_treatment_info: updatedItems,
      },
    });
  };

  const removeRowMed = (index) => {
    const updatedItems = [...formik.values.prescription.medicine_info];
    updatedItems.splice(index, 1);
    formik.setValues({
      ...formik.values,
      prescription: {
        ...formik.values.prescription,
        medicine_info: updatedItems,
      },
    });
  };
  const removeRowLab = (index) => {
    const updatedItems = [...formik.values.lab_info];
    updatedItems.splice(index, 1);
    formik.setValues({
      ...formik.values,
      lab_info: updatedItems,
    });
  };
  const removeRowInvoice = (index) => {
    const updatedItems = [...formik.values.invoice.treatment_done_info];
    updatedItems.splice(index, 1);
    formik.setValues({
      ...formik.values,
      invoice: {
        ...formik.values.invoice,
        treatment_done_info: updatedItems,
      },
    });
  };
  const removeRow = (index) => {
    const updatedItems = [...formik.values.treatment_done.next_treatment_info];
    updatedItems.splice(index, 1);
    formik.setValues({
      ...formik.values,
      treatment_done: {
        ...formik.values.treatment_done,
        next_treatment_info: updatedItems,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      treatment_done: {
        notes: "",
        treatment_done_info: [treatment_done_info],
      },
      next_treatment: {
        appointment_date: "",
        appointment_time: "",
        doctor: "",
        notes: "",
        next_treatment_info: [treatment_info],
      },
      prescription: {
        medicine_info: [medicineInfo],
        notes: "",
      },
      lab_info: [labInfo],
      invoice: {
        date: "",
        treatment_done_info: [treatmentDone],
        treatment_amount: 0,
        total_amount: 0,
        no_bill: false,
      },
    },
    // validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      if (imageData.length > 0) {
        updateTreatmentImages(imageData)
          .then(() => {
            handleAddTreatment(values);
          })
          .catch((error) => {
            showErrorToast(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        handleAddTreatment(values);
      }
    },
  });

  const handleAddTreatment = (values) => {
    const payload = {
      ...values,
      config: clinicalData,
      patient_id: patientProfile._id,
    };
    addTreatmentData(payload)
      .then(() => {
        showSuccessToast("Treatment Added");
        navigation("/treatments");
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(payload);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <ProfileSection patientProfile={patientProfile} />
      <ClinicalData
        clinicalData={clinicalData}
        setClinicalData={setClinicalData}
        updateClinicalDataInfo={updateClinicalDataInfo}
        loadingClinicalData={loadingClinicalData}
      />
      <TreatmentDone
        formik={formik}
        addRow={addRow}
        removeRow={removeRow}
        doctores={doctores}
      />
      <UpcomingTreatment
        formik={formik}
        addRow={addRowUpcoming}
        removeRow={removeRowUpcoming}
        doctores={doctores}
      />
      <Prescription
        medicines={medicines}
        formik={formik}
        addRow={addRowMed}
        removeRow={removeRowMed}
      />
      <LabOrder
        formik={formik}
        labs={labs}
        labsWorks={labsWorks}
        addRow={addRowLab}
        removeRow={removeRowLab}
      />
      <Invoice
        formik={formik}
        treatments={treatments}
        addRow={addRowInvoice}
        removeRow={removeRowInvoice}
      />
      <UploadImages imageData={imageData} setImageData={setImageData} />
      <div className="grid md:grid-cols-3">
        <div className="grid md:grid-cols-2 gap-5 md:col-start-3 ">
          <Button type={"secondary"} onClick={""}>
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

export default TreatmentDetails05;
