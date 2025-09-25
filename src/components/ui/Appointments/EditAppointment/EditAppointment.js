import React, { useEffect, useState } from "react";
import ProfileSection from "../../../common/profile/Profile";
import SetTreatment from "./treatment/SetTreatment";
import Schedules from "./schedules/Schedules";
import {
  deleteAppointment,
  getAllAppointments,
  updateAppointment,
} from "../../../../api/Appointments";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { showErrorToast, showSuccessToast } from "../../../../utils/toaster";
import Whatsapp from "../../../icons/Whatsapp";
import Button from "../../../common/buttons/Button";
import SMS from "../../../icons/SMS";
import { formatDate } from "../../../../utils/date";
import ModalWrapper from "../../../common/modal/ModalWrapper";
import { openWhatsappMessager } from "../../../../utils/opneWhatsapp";

const treatment_info = {
  teeth1: "",
  teeth2: "",
  teeth3: "",
  teeth4: "",
  name: "",
};

const validationSchema = Yup.object().shape({
  next_treatment_info: Yup.array().of(
    Yup.object().shape({
      teeth1: Yup.string().notRequired(),
      teeth2: Yup.string().notRequired(),
      teeth3: Yup.string().notRequired(),
      teeth4: Yup.string().notRequired(),
      name: Yup.string().required("required"),
    })
  ),
  appointment_date: Yup.string().required(" "),
  appointment_time: Yup.string().required(" "),
  doctor: Yup.string().required("required"),
  sendWhatsapp: Yup.boolean(),
  sendSms: Yup.boolean(),
});

const EditAppointment = ({
  editData,
  handleEditAppointment,
  getAppointmentsData,
  doctors,
  treatments,
  editConfirm,
  setEditConfirm,
  viewOnly,
  setSearchTreatment,
  setSearchDoctors,
}) => {
  const [patients, setPatients] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [patientProfile, setPatientProfile] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectDoctor, setSelectDoctor] = useState(editData?.doctor);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleconfirmation = (props) => {
    setConfirmOpen(!confirmOpen);
  };

  const scheduledAppointments = () => {
    setAppointments([]);
    setProfileLoading(true);
    getAllAppointments(
      "",
      "",
      selectDoctor,
      formatDate(selectedDate),
      formatDate(selectedDate),
      ""
    )
      .then((response) => {
        setAppointments(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setProfileLoading(false);
      });
  };
  useEffect(() => {
    scheduledAppointments();
  }, [selectDoctor, selectedDate]);

  /** Adding New row */
  const addRow = () => {
    if (!editConfirm) return;
    formik.setValues({
      ...formik.values,
      next_treatment_info: [
        ...formik.values.next_treatment_info,
        treatment_info,
      ],
    });
  };

  /** Removing row using index */
  const removeRow = (index) => {
    const updatedItems = [...formik.values.next_treatment_info];
    updatedItems.splice(index, 1);
    if (!editConfirm) return;
    formik.setValues({
      ...formik.values,
      next_treatment_info: updatedItems,
    });
  };

  const formik = useFormik({
    initialValues: {
      next_treatment_info: editData.next_treatment_info,
      patient_id: editData.patient_id._id,
      appointment_date: editData.appointment_date,
      appointment_time: editData.appointment_time,
      doctor: editData.doctor,
      whatsapp: editData.whatsapp,
      sms: editData.sms,
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        appointment_date: formatDate(values.appointment_date),
      };
      setLoading(true);
      updateAppointment(payload, editData._id)
        .then((response) => {
          openWhatsappMessager(response.data?.essentials_whatsapp_url);
          showSuccessToast("Appointment Updated");
          handleEditAppointment();
          getAppointmentsData();
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleDelete = () => {
    deleteAppointment(editData._id)
      .then((response) => {
        showSuccessToast("Deleted Successfully");
        getAppointmentsData();
        handleconfirmation();
        handleEditAppointment();
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <div className="grid gap-2 lg:w-[900px]">
      <ProfileSection patientProfile={editData?.patient_id} />
      <form className="grid gap-2" onSubmit={formik.handleSubmit}>
        <SetTreatment
          formik={formik}
          addRow={addRow}
          removeRow={removeRow}
          treatments={treatments}
          editConfirm={editConfirm}
          setSearchTreatment={setSearchTreatment}
        />
        <Schedules
          formik={formik}
          doctors={doctors}
          setSearchDoctors={setSearchDoctors}
          appointments={appointments}
          loading={loading}
          setSelectDoctor={setSelectDoctor}
          setSelectedDate={setSelectedDate}
          editConfirm={editConfirm}
        />
        {!viewOnly && (
          <div className="lg:grid flex flex-col gap-2 lg:grid-cols-3 mt-1">
            {editConfirm && (
              <div className="shadow-card rounded-15 flex justify-center">
                <div className="flex items-center gap-1">
                  <input
                    checked={formik.values?.whatsapp}
                    onClick={(e) =>
                      formik.setFieldValue("whatsapp", e.target.checked)
                    }
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
                    checked={formik.values?.sms}
                    onClick={(e) =>
                      formik.setFieldValue("sms", e.target.checked)
                    }
                    type="checkbox"
                    className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                  />
                  <p className="text-bodyRB text-darkgrey">SMS</p>
                  <div className="mt-1">
                    <SMS />
                  </div>
                </div>
              </div>
            )}
            {!editConfirm && (
              <div className="grid lg:grid-flow-col col-span-1 col-start-3 gap-2">
                <Button
                  action={"button"}
                  type={"primary"}
                  onClick={() => setEditConfirm(true)}
                >
                  Edit Appointment
                </Button>
              </div>
            )}
            <div className="grid lg:grid-flow-col col-span-2 gap-3">
              {editConfirm && (
                <>
                  <div>
                    <Button
                      onClick={() => handleconfirmation()}
                      action={"button"}
                      type={"danger"}
                    >
                      Delete Appointment
                    </Button>
                  </div>
                  <Button
                    type={"secondary"}
                    action={"button"}
                    className={"min-w-[150px]"}
                    onClick={handleEditAppointment}
                  >
                    Close
                  </Button>
                  <Button type={"primary"} loading={loading}>
                    Save Appointment
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </form>

      <ModalWrapper open={confirmOpen} handleClose={handleconfirmation}>
        <div className="flex flex-col gap-10">
          <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
            Are you sure that you want to delete this appointment
            <span className="text-bodyBB pl-1 pr-1 text-darkgrey">
              {editData?.name}
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
              onClick={handleDelete}
              type={"yes"}
              className={"text-heading2B"}
            >
              Yes
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default EditAppointment;
