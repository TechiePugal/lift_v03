import React, { useEffect, useState } from "react";
import ProfileSection from "../../../../common/profile/Profile";
import Medicines from "./medicines/Medicines";
import Notes from "./notes/Notes";
import Button from "../../../../common/buttons/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  deletePrescription,
  updatePrescription,
} from "../../../../../api/Prescriptions";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import { getAllMedicines } from "../../../../../api/settings/Medicines/medicines";
import {
  formatDateToString,
  formatToSearchDate,
} from "../../../../../utils/date";
import DatePicker from "../../../../common/datepicker/DatePicker";
import Whatsapp from "../../../../icons/Whatsapp";
import SMS from "../../../../icons/SMS";
import { sendPrescriptionMessage } from "../../../../../api/communication";
import { getPrescriptionPrint } from "../../../../../api/Payment";
import { openWhatsappMessager } from "../../../../../utils/opneWhatsapp";

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

const validationSchema = Yup.object().shape({
  medicine_info: Yup.array().of(
    Yup.object().shape({
      medicine: Yup.string().required(" "),
      days: Yup.number().notRequired(),
      before_after_food: Yup.string().notRequired(),
      morning: Yup.number().notRequired(),
      afternoon: Yup.number().notRequired(),
      evening: Yup.number().notRequired(),
      night: Yup.number().notRequired(),
      medicine_type: Yup.string().required(" "),
    })
  ),
  notes: Yup.string().notRequired(),
  date: Yup.string().required(),
});

const PrescriptionDetails = ({
  details,
  prescriptionDetails,
  getPrescriptionDataList,
  viewOnly,
  handleViewPrescription,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [searchMedicines, setSearchMedicines] = useState("");
  const [edit, setEdit] = useState(true);
  const [communicationChannel, setCommunicationChannel] = useState({
    whatsapp: details?.patient_id?.whatsapp || false,
    sms: details?.patient_id.sms || false,
  });
  const [prescriptionSendSuccess, setPrescriptionSendSuccess] = useState(false);
  const [prescriptionLoading, setPrescriptionLoading] = useState(false);
  const [loadingPrintPrescription, setLoadingPrintPrescription] =
    useState(false);

  const handleconfirmation = () => {
    setOpen(!open);
  };

  const initialValues = {
    medicine_info: details?.medicine_info,
    notes: details?.notes,
    date: details?.date || new Date(),
  };

  /** Adding New row */
  const addRow = () => {
    formik.setValues({
      ...formik.values,
      medicine_info: [...formik.values.medicine_info, medicineInfo],
    });
    setSearchMedicines("")
  };

  /** Removing row using index */
  const removeRow = (index) => {
    const updatedItems = [...formik.values.medicine_info];
    if (updatedItems.length !== 1) {
      updatedItems.splice(index, 1);
      formik.setValues({
        ...formik.values,
        medicine_info: updatedItems,
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        date: formatToSearchDate(values.date),
        patient_id: details?.patient_id?._id,
      };
      const id = details._id;
      setLoading(true);
      updatePrescription(payload, id)
        .then((response) => {
          showSuccessToast("Prescription Updated");
          prescriptionDetails();
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleDeletePrescription = () => {
    setLoadingDelete(true);
    deletePrescription(details._id)
      .then(() => {
        showSuccessToast("Prescription Deleted");
        if (viewOnly) {
          getPrescriptionDataList();
          handleViewPrescription();
        }
        navigation("/prescriptions");
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  const getAllMedicinesData = () => {
    getAllMedicines(searchMedicines)
      .then((response) => {
        setMedicines(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllMedicinesData();
  }, [searchMedicines]);

  const sendPrescription = () => {
    const payload = {
      prescriptionId: details?._id,
      ...communicationChannel,
    };
    if (payload?.sms || payload?.whatsapp) {
      setPrescriptionLoading(true);
      sendPrescriptionMessage(payload)
        .then((response) => {
          showSuccessToast("Prescription Send Successfully");
          /** Open Whatsapp for essentials subscription users */
          openWhatsappMessager(response.data?.essentials_whatsapp_url);
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

  const printPrescription = () => {
    setLoadingPrintPrescription(true);
    getPrescriptionPrint(details?._id)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setLoadingPrintPrescription(false);
      });
  };
  console.log(edit,"edit")

  return (
    <>
      <form className="grid gap-2 lg:-mt-3" onSubmit={formik.handleSubmit}>
        <div className="grid lg:justify-end">
          <div className="md:w-[250px] z-[2]">
            <DatePicker
              startDate={new Date(formatDateToString(formik?.values?.date))}
              onDateChange={(e) => formik.setFieldValue("date", e)}
              disabled={edit}
            />
          </div>
        </div>
        <ProfileSection patientProfile={details?.patient_id} />
        <Medicines
          formik={formik}
          addRow={addRow}
          removeRow={removeRow}
          medicines={medicines}
          edit={edit}
          setSearchMedicines={setSearchMedicines}
        />
        <Notes formik={formik} />
        <div className="md:flex w-full lg:flex-row flex-col md:justify-between  gap-2 mt-5 mb-10">
          <div className="shadow-card rounded-15 flex  justify-center lg:w-[400px] h-[50px] bg-white">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                onClick={
                  () =>
                    setCommunicationChannel({
                      ...communicationChannel,
                      whatsapp: !communicationChannel.whatsapp,
                    })
                  // sendPrescription({
                  //   ...communicationChannel,
                  //   whatsapp: !communicationChannel.whatsapp,
                  // })
                }
                checked={communicationChannel?.whatsapp}
                className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
              />
              <p className="text-bodyRB text-darkgrey">Whatsapp</p>
              <div className="mt-1">
                <Whatsapp />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <input
                onClick={
                  () =>
                    setCommunicationChannel({
                      ...communicationChannel,
                      sms: !communicationChannel.sms,
                    })
                  // sendPrescription({
                  //   ...communicationChannel,
                  //   sms: !communicationChannel.sms,
                  // })
                }
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
          {edit && (
            <div className="grid md:grid-cols-4 gap-2 ">
              <Button
                type={"danger"}
                className={"text-heading2B md:!w-[150px]"}
                action={"button"}
                onClick={handleconfirmation}
                loading={loadingDelete}
              >
                Delete
              </Button>
              <div className="">
                <Button
                  action={"button"}
                  type={"yes"}
                  className={"text-heading2B"}
                  onClick={sendPrescription}
                  loading={prescriptionLoading}
                >
                  Send
                </Button>
              </div>
              <Button
                action={"button"}
                onClick={printPrescription}
                loading={loadingPrintPrescription}
                className={"bg-pink-gradient text-heading2B text-white"}
              >
                Print
              </Button>
              <Button
                loading={loading}
                onClick={() => setEdit(!edit)}
                type={"primary"}
                action={"button"}
                className={"text-heading2B"}
              >
                Edit
              </Button>
            </div>
          )}
          {!edit && (
            <div className="grid lg:grid-cols-2 gap-2">
              <Button
                action={"button"}
                onClick={() => setEdit(!edit)}
                className={
                  "bg-pink-gradient text-heading2B text-white md:!w-[200px]"
                }
              >
                Cancel
              </Button>
              <Button
                loading={loading}
                type={"primary"}
                className={"text-heading2B"}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </form>

      <ModalWrapper open={open} handleClose={handleconfirmation}>
        <div className="flex flex-col gap-10">
          <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
            Are you sure that you want to delete
            <span className="text-bodyBB pl-1 pr-1 text-darkgrey">
              {details?.patient_id?.name}
            </span>
            ?
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
              onClick={handleDeletePrescription}
              type={"yes"}
              className={"text-heading2B"}
            >
              Yes
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default PrescriptionDetails;
