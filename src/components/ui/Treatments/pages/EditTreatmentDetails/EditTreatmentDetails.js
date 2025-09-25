import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import UploadImages from "./upload_images/UploadImages";
import Button from "../../../../common/buttons/Button";
import {
  editTreatmentData,
  updateTreatmentImages,
} from "../../../../../api/Treatments";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { formatDate } from "../../../../../utils/date";
import ClinicalData from "../TreatmentDetails/clinical_data/ClinicalData";
import TreatmentDone from "../TreatmentDetails/treatment_done/TreatmentDone";
import UpcomingTreatment from "../TreatmentDetails/upcoming_treatment/UpcomingTreatment";
import Prescription from "../TreatmentDetails/prescription/Prescription";
import LabOrder from "../TreatmentDetails/lab_order/LabOrder";
import Invoice from "../TreatmentDetails/invoice/Invoice";
import ProfileSection from "../../../../common/profile/Profile";
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
  order_date: "",
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
const validationSchema1 = Yup.object().shape({
  prescription: Yup.object().shape({
    // date: Yup.string(),
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
const EditTreatmentDetails = ({
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
  upcomingTreatments,
  prescriptions,
  labOrders,
  invoices,
  treatmentId,
  showUpdateClinicalData,
  setShowUpdateClinicalData,
  viewOnly,
  handleViewTreatment,
  fromEdit,
  editData,
  handleEditable,
  setSearchDoctors,
  setSearchMedicines,
  setSearchLabs,
  setSearchLabWorks,
  setSearchTreatment,
  editTreatment,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [oldImages, setOldImages] = useState(appointments.images);
  useEffect(() => {
    setOldImages(appointments.images);
  }, [appointments]);

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
    } else {
      formik.setValues({
        ...formik.values,
        next_treatment: {
          ...formik.values.next_treatment,
          next_treatment_info: [treatment_info],
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
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      treatment_done: {
        notes: "",
        date: appointments?.date,
        treatment_done_info:
          appointments?.treatment_done_info?.length > 0
            ? appointments?.treatment_done_info
            : [treatment_done_info],
      },
      next_treatment: {
        appointment_date: upcomingTreatments?.appointment_date,
        appointment_time: upcomingTreatments?.appointment_time,
        doctor: upcomingTreatments?.doctor,
        notes: upcomingTreatments?.notes,
        next_treatment_info: upcomingTreatments?.next_treatment_info || [
          treatment_info,
        ],
      },
      prescription: {
        date: prescriptions?.date,
        medicine_info: prescriptions?.medicine_info || [medicineInfo],
        notes: prescriptions?.notes,
        _id: prescriptions?._id

      },
      lab_info: labOrders.length > 0 ? labOrders : [labInfo],
      invoice: {
        date: invoices?.date || appointments?.appointment_date,
        treatment_done_info: invoices?.treatment_done_info || [treatmentDone],
        treatment_amount: invoices?.treatment_amount,
        total_amount: invoices?.total_amount,
        no_bill: invoices?.no_bill,
        _id: invoices?._id,
      },
    },
    // validationSchema,
    validationSchema:validationSchema1,
    onSubmit: (values) => {
      setLoading(true);
      if (imageData.length > 0) {
        updateTreatmentImages(imageData)
          .then((img) => {
            const imgNames = [...oldImages, ...img?.data?.data];
            handleAddTreatment(values, imgNames);
          })
          .catch((error) => {
            showErrorToast(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        // console.log(values, "values on submit");
        // console.log(medicines, "medicienestobecheked");
        // const isEveryMedicineIncluded = values.prescription.medicine_info.every(
        //   (prescriptionMedicine) => {
        //     const medicineName = prescriptionMedicine.medicine;
        //     return medicines.some(
        //       (medicine) => medicine.medicine === medicineName
        //     );
        //   }
        // );

        // if (!isEveryMedicineIncluded) {
        //   values.prescription.medicine_info.forEach((prescriptionMedicine) => {
        //     prescriptionMedicine.medicine = "";
        //   });
        //   handleAddTreatment(values, oldImages);
        // } else {
        //   console.log(values, "values on submits");
        //   console.log(
        //     isEveryMedicineIncluded,
        //     "console.log(isAnyMedicineIncluded)"
        //   );
        //   handleAddTreatment(values, oldImages);
        // }
        handleAddTreatment(values, oldImages);
      }
    },
  });

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
        appointment_date: formatDate(values.next_treatment.appointment_date),
      },
      lab_info: values.lab_info.map((labItem) => ({
        ...labItem,
        order_date: formatDate(labItem.order_date),
      })),
      prescription: {
        ...values.prescription,
        date: formatDate(values.prescription?.date),
        medicine_info: values.prescription.medicine_info.filter(info => info.medicine !== "")
      },
      invoice: {
        ...values.invoice,
        date: formatDate(values.invoice?.date),
      },
      appointment_id: appointments._id,
      patient_id: appointments.patient_id._id,
    };
    editTreatmentData(payload, treatmentId)

      .then(() => {
        showSuccessToast("Treatment Updated");
        if (editTreatment) {
          handleViewTreatment();
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

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 pb-10">
      <ProfileSection patientProfile={appointments?.patient_id} />
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
        fromEdit={fromEdit}
        editData={editData}
        setSearchTreatment={setSearchTreatment}
        setSearchDoctors={setSearchDoctors}
      />
      <UpcomingTreatment
        formik={formik}
        addRow={addRowUpcoming}
        removeRow={removeRowUpcoming}
        doctores={doctores}
        treatments={treatments}
        editTreatment={true}
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
      <UploadImages
        imageData={imageData}
        setImageData={setImageData}
        oldImages={oldImages}
        setOldImages={setOldImages}
      />
      <div className="grid md:grid-cols-3">
        {editData && (
          <div className="grid md:grid-cols-2 gap-5 md:col-start-3 ">
            <Button
              type={"secondary"}
              action={"button"}
              onClick={() => {
                if (!viewOnly) navigation("/treatments");
                if (viewOnly) handleViewTreatment();
              }}
            >
              Close
            </Button>
            <Button type={"primary"} loading={loading}>
              Save
            </Button>
          </div>
        )}
        {!editData && (
          <div className="grid md:grid-cols-2 gap-5 md:col-start-3 ">
            <Button
              type={"secondary"}
              action={"button"}
              onClick={() => {
                if (!viewOnly) navigation("/treatments");
                if (viewOnly) handleViewTreatment();
              }}
            >
              Close
            </Button>
            <Button onClick={handleEditable} action={"button"} type={"primary"}>
              Edit
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default EditTreatmentDetails;
