import React, { useEffect, useState } from "react";
import ProfileSection from "../../../../common/profile/Profile";
import Medicines from "./medicines/Medicines";
import Notes from "./notes/Notes";
import Button from "../../../../common/buttons/Button";
import SearchInput from "../../../../common/search";
import {
  getAllPatients,
  getSinglePatient,
} from "../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { addPrescription } from "../../../../../api/Prescriptions";
import { useNavigate } from "react-router-dom";
import { getAllMedicines } from "../../../../../api/settings/Medicines/medicines";
import DatePicker from "../../../../common/datepicker/DatePicker";
import { formatToSearchDate } from "../../../../../utils/date";
import InputBoxSelect from "../../../../common/input/InputBoxSelect";
import useDelayedSearch from "../../../../../utils/delayedsearch";

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

const initialValues = {
  medicine_info: [medicineInfo],
  notes: "",
  date: new Date(),
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

const CreatePrescription = ({
  profile,
  profilePage,
  callBackFunction,
  hideSearch,
}) => {
  const [patients, setPatients] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [patientProfile, setPatientProfile] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [searchMedicines, setSearchMedicines] = useState("");

  useEffect(() => {
    if (profile) {
      setPatientProfile(profile);
      setPatientId(profile?._id);
    }
  }, []);

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
    getSinglePatient(patient?._id)
      .then((response) => {
        setPatientProfile(response.data.data);
        console.log(response);
      })
      .catch(() => {})
      .finally(() => {
        setProfileLoading(false);
      });
  };

  /** Adding New row */
  const addRow = () => {
    formik.setValues({
      ...formik.values,
      medicine_info: [...formik.values.medicine_info, medicineInfo],
    });
    // setSearchKey("");
    setSearchMedicines("")

  };

  /** Removing row using index */
  const removeRow = (index) => {
    const updatedItems = [...formik.values.medicine_info];
    updatedItems.splice(index, 1);
    if (updatedItems?.length >= 1) {
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
        patient_id: patientId,
      };
      if (patientProfile) {
        setLoading(true);
        addPrescription(payload)
          .then((response) => {
            showSuccessToast("Prescription Added");
            if (profilePage) {
              callBackFunction();
            } else {
              console.log({ response });
              navigation(
                `/prescription_details/?id=${response?.data?.data?._id}`
              );
            }
          })
          .catch((error) => {
            showErrorToast(error);
          })
          .finally(() => {});
      } else {
        showErrorToast({ customError: "Patient Profile is Required" });
      }
    },
  });

  const getAllMedicinesData = () => {
    getAllMedicines(searchMedicines)
      .then((response) => {
        setMedicines(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getAllMedicinesData();
  }, [searchMedicines]);

  return (
    <div className="grid gap-2 pb-10">
      <div className="flex flex-col lg:flex-row justify-between lg:-mt-3 relative">
        <div className="lg:w-[400px]">
          {!hideSearch && (
            <InputBoxSelect
              searchBox={true}
              searchKey={searchKey}
              handleInputChange={(e) => setSearchKey(e)}
              value={"search for patients"}
            >
              {patients?.map((patient, index) => (
                <div key={index} className="w-full">
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
          {/* <SearchInput
            searchKey={searchKey}
            placeholder={"search for patients"}
            handleChange={handleAddPatient}
            className={patients.length > 0 ? "border-b-0 rounded-b-none" : ""}
          /> */}
        </div>
        <div className="md:col-start-4 md:w-[250px] lg:mt-0 mt-2 z-20">
          <DatePicker
            startDate={formik.values.date}
            onDateChange={(e) => formik.setFieldValue("date", e)}
          />
        </div>
        {/* {(patients.length > 0 || profileLoading) && (
          <div className="z-20 w-full lg:w-[400px] absolute top-[54px] ">
            <div className=" shadow-card  topindex max-h-[300px] overflow-y-auto bg-white rounded-bl-15 rounded-br-15 border-[1.5px] border-[#E7EBEC] border-t-0 ">
              <ul className="">
                <li className="">
                  {patients.map((patient, index) => (
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
                  ))}
                </li>
              </ul>
            </div>
          </div>
        )} */}
      </div>
      {patientProfile && (
        <div className={profileLoading ? "animate-pulse" : ""}>
          <ProfileSection patientProfile={patientProfile} />
        </div>
      )}
      <form className="grid gap-2" onSubmit={formik.handleSubmit}>
        <Medicines
          formik={formik}
          addRow={addRow}
          removeRow={removeRow}
          medicines={medicines}
          setSearchMedicines={setSearchMedicines}
          searchMedicines={searchMedicines}
        />
        <Notes formik={formik} />
        <div className="grid lg:grid-cols-3">
          <div className="lg:col-start-4 lg:w-[250px]">
            <Button type={"primary"} className={"text-heading2B"}>
              Create Prescription
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePrescription;
