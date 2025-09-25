import React, { useEffect, useState } from "react";
import ProfileSection from "../../../../common/profile/Profile";
import SetTreatment from "./treatment/SetTreatment";
import Schedules from "./schedules/Schedules";
import SearchInput from "../../../../common/search";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import {
  getAllPatients,
  getSinglePatient,
} from "../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import {
  addAppointment,
  getAllAppointments,
} from "../../../../../api/Appointments";
import { formatDate, formatToSearchDate } from "../../../../../utils/date";
import Button from "../../../../common/buttons/Button";
import SMS from "../../../../icons/SMS";
import Whatsapp from "../../../../icons/Whatsapp";
import useDelayedSearch from "../../../../../utils/delayedsearch";
import InputBoxSelect from "../../../../common/input/InputBoxSelect";
import { openWhatsappMessager } from "../../../../../utils/opneWhatsapp";

const treatment_info = {
  teeth1: "",
  teeth2: "",
  teeth3: "",
  teeth4: "",
  name: "",
};
const initialValues = {
  next_treatment_info: [treatment_info],
  patient_id: "",
  appointment_date: new Date(),
  appointment_time: "",
  doctor: "",
  whatsapp: false,
  sms: false,
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
  appointment_time: Yup.string().matches(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    "Invalid time format. Use (HH:mm)"
  ),
  doctor: Yup.string().required("required"),
  whatsapp: Yup.boolean(),
  sms: Yup.boolean(),
});

const CreateSingleAppointment = ({
  doctors,
  handleCreateAppointmentClick,
  getAppointmentsData,
  patientInfo,
  treatments,
  directAppiontment,
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
  const [selectDoctor, setSelectDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

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
    setSearchKey(patient?.name);
    setPatients([]);
    setProfileLoading(true);
    setPatientId(patient?._id);
    getSinglePatient(patient?._id)
      .then((response) => {
        setPatientProfile(response.data.data);
        // scheduledAppointments(patient?._id);
      })
      .catch(() => {})
      .finally(() => {
        setProfileLoading(false);
      });
  };

  const scheduledAppointments = () => {
    setAppointments([]);
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
      .finally(() => {});
  };

  useEffect(() => {
    scheduledAppointments();
  }, [selectDoctor, selectedDate]);

  /** Adding New row */
  const addRow = () => {
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
    if (updatedItems.length !== 1) {
      updatedItems.splice(index, 1);
      formik.setValues({
        ...formik.values,
        next_treatment_info: updatedItems,
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        patient_id: patientId,
        appointment_date: formatDate(values.appointment_date),
      };
      if (patientProfile) {
        setLoading(true);
        addAppointment(payload)
          .then((response) => {
            console.log({ response }, "added");
            showSuccessToast("Appointment Added");
            handleCreateAppointmentClick();
            getAppointmentsData();

            /** Open Whatsapp for essentials subscription users */
            openWhatsappMessager(response.data?.essentials_whatsapp_url);
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

  useEffect(() => {
    if (patientInfo?._id) {
      handleSelectPatient(patientInfo);
    }
  }, []);

  useEffect(() => {
    if (patientProfile) {
      console.log({ patientProfile });
      formik.setFieldValue("sms", patientProfile?.sms);
      formik.setFieldValue("whatsapp", patientProfile?.whatsapp);
    }
  }, [patientProfile]);

  return (
    <div className="grid gap-3 w-[80vw] md:w-full lg:w-[900px] overflow-x-auto">
      <div className="grid grid-cols-2">
        <div className="grid lg:grid-flow-col gap-3 relative">
          {!directAppiontment && (
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
      {patientProfile && (
        <div className={profileLoading ? "animate-pulse" : ""}>
          <ProfileSection patientProfile={patientProfile} />
        </div>
      )}
      <form className="grid gap-2" onSubmit={formik.handleSubmit}>
        <SetTreatment
          treatments={treatments}
          setSearchTreatment={setSearchTreatment}
          formik={formik}
          addRow={addRow}
          removeRow={removeRow}
        />
        <Schedules
          doctors={doctors}
          setSearchDoctors={setSearchDoctors}
          handleCreateAppointmentClick={handleCreateAppointmentClick}
          formik={formik}
          loading={loading}
          appointments={appointments}
          setSelectDoctor={setSelectDoctor}
          setSelectedDate={setSelectedDate}
        />
        <div className="lg:grid flex flex-col gap-2 lg:grid-cols-2  pb-1">
          <div className="shadow-card rounded-15 flex justify-center">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                checked={formik.values?.whatsapp}
                onClick={(e) =>
                  formik.setFieldValue("whatsapp", e.target.checked)
                }
              />
              <p className="text-bodyRB text-darkgrey">Whatsapp</p>
              <div className="mt-1">
                <Whatsapp />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <input
                checked={formik.values?.sms}
                type="checkbox"
                className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                onClick={(e) => formik.setFieldValue("sms", e.target.checked)}
              />
              <p className="text-bodyRB text-darkgrey">SMS</p>
              <div className="mt-1">
                <SMS />
              </div>
            </div>
          </div>
          <div className="md:flex gap-3">
            <Button
              action={"button"}
              type={"secondary"}
              className={"min-w-[150px]"}
              onClick={handleCreateAppointmentClick}
            >
              Close
            </Button>
            <Button type={"primary"} loading={loading}>
              Save Appointment
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSingleAppointment;
