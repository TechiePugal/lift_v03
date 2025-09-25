import React, { useEffect, useState } from "react";
import ProfileSection from "../../../../common/profile/Profile";
import OrderStatus from "./order_status/OrderStatus";
import OrderItem from "./orderi_tem/OrderItem";
import Button from "../../../../common/buttons/Button";
import CheckMarkWhite from "../../../../icons/CheckMarkWhite";
import SearchInput from "../../../../common/search";
import {
  getAllPatients,
  getSinglePatient,
} from "../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { addLab } from "../../../../../api/Labs";
import { getAllLabs } from "../../../../../api/settings/Labs";
import { getAllLabsWorks } from "../../../../../api/settings/LabsWorks/labsWorks";
import { formatDate } from "../../../../../utils/date";
import useDelayedSearch from "../../../../../utils/delayedsearch";
import InputBoxSelect from "../../../../common/input/InputBoxSelect";

const initialValues = {
  teeth1: "",
  teeth2: "",
  teeth3: "",
  teeth4: "",
  order_date: new Date(),
  arrival_date: "",
  fixing_date: "",
  lab: "",
  work_type: "",
  status: "Ordered",
  notes: "",
  sendWhatsapp: false,
};

const validationSchema = Yup.object().shape({
  teeth1: Yup.string().notRequired(),
  teeth2: Yup.string().notRequired(),
  teeth3: Yup.string().notRequired(),
  teeth4: Yup.string().notRequired(),
  order_date: Yup.date().required("required"),
  arrival_date: Yup.date().notRequired(),
  fixing_date: Yup.date().notRequired(),
  lab: Yup.string().required("required"),
  work_type: Yup.string().required(" required"),
  status: Yup.string().required(" required"),
  notes: Yup.string().notRequired(),
});

const CreateLabOrder = ({ profile, callBack, hideSearch }) => {
  const [patients, setPatients] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [patientProfile, setPatientProfile] = useState(profile || "");
  const [profileLoading, setProfileLoading] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [labs, setLabs] = useState([]);
  const [labsWorks, setLabWorks] = useState([]);
  const [searchLabs, setSearchLabs] = useState("");
  const [searchLabWorks, setSearchLabWorks] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    if (profile) setPatientId(profile._id);
  }, []);

  /** Searching for patient and listing */
  const handleAddPatient = () => {
    setSearchKey(searchKey);
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

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        patient_id: patientId,
        order_date: formatDate(values?.order_date),
        arrival_date: formatDate(values?.arrival_date),
        fixing_date: formatDate(values?.fixing_date),
      };
      if (patientProfile) {
        setLoading(true);
        addLab(payload)
          .then(() => {
            if (callBack) {
              callBack(true);
            } else {
              navigation("/labs");
            }
            showSuccessToast("Lab Added");
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

  const fetchData = (searchFunction, setDataFunction, searchKey) => {
    searchFunction(searchKey)
      .then((response) => {
        setDataFunction(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(getAllLabs, setLabs, searchLabs);
  }, [searchLabs]);

  useEffect(() => {
    fetchData(getAllLabsWorks, setLabWorks, searchLabWorks);
  }, [searchLabWorks]);

  return (
    <div className="flex flex-col gap-3 pb-12">
      <div className="grid lg:grid-cols-2">
        <div className="grid lg:grid-cols-2 gap-3 relative">
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
      {patientProfile && (
        <div className={profileLoading ? "animate-pulse" : ""}>
          <ProfileSection patientProfile={patientProfile} />
        </div>
      )}
      <form className="grid gap-2" onSubmit={formik.handleSubmit}>
        <OrderItem
          formik={formik}
          labs={labs}
          labsWorks={labsWorks}
          setSearchLabs={setSearchLabs}
          setSearchLabWorks={setSearchLabWorks}
        />
        <OrderStatus formik={formik} />
        <div className="grid lg:justify-end lg:grid-cols-3">
          <div className=" lg:col-start-3">
            <Button
              type={"primary"}
              loading={loading}
              className={"text-heading2B"}
            >
              Create Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateLabOrder;
