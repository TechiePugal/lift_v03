import React, { useEffect, useState } from "react";
import ProfileSection from "../../../../common/profile/Profile";

import Button from "../../../../common/buttons/Button";
import SearchInput from "../../../../common/search";
import {
  getAllPatients,
  getSinglePatient,
} from "../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { addCustomer, updateCustomer } from "../../../../../api/Customers";
import { useNavigate } from "react-router-dom";
import { getAllMedicines } from "../../../../../api/settings/Medicines/medicines";
import DatePicker from "../../../../common/datepicker/DatePicker";
import { formatDate, formatToSearchDate } from "../../../../../utils/date";
import InputBoxSelect from "../../../../common/input/InputBoxSelect";
import useDelayedSearch from "../../../../../utils/delayedsearch";
import InputBox from "../../../../common/input/InputBox";
import SelectionInput from "../../../../common/input/Select";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  name: Yup.string().notRequired(),
  date: Yup.string().required(),
});

const EditCustomer = ({
  details,
  profile,
  profilePage,
  callBackFunction,
  hideSearch,
}) => {
  const [customers, setCustomers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [patientProfile, setPatientProfile] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [searchMedicines, setSearchMedicines] = useState("");
  const [id, setId] = useState(details?._id);

  const navigation = useNavigate();

  const initialValues = {
    IMEI: details?.IMEI,
    name: details?.name || "",
    phone: details?.phone || "",
    address: details?.address || "",
    installed_date: details?.installed_date || new Date(),
    // Update amcdue here by adding 90 days
    amcdue:
      details?.amcdue ||
      (() => {
        const date = new Date();
        date.setDate(date.getDate() + 90);
        return date;
      })(),
    status: details?.status || "",
    floors: details?.floors || 1,
    wifi_username: details?.wifi_username || "",
    wifi_password: details?.wifi_password || "",
  };

  const formik = useFormik({
    initialValues,

    onSubmit: (values) => {
      const payload = {
        ...values,
        installed_date: formatDate(values.installed_date),
        amcdue: formatDate(values.amcdue),
      };
      setLoading(true);
      updateCustomer(payload, id)
        .then(() => {
          showSuccessToast("Customer Updated Successfully");
          navigation(`/customers`);
          //   getAllDoctorsData();
          // handleClose();
        })
        .catch((error) => {
          console.log("error");
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  // // Inside your functional component
  // useEffect(() => {
  //   // Check if installed_date has changed
  //   if (formik.values.installed_date) {
  //     const installedDate = dayjs(formik.values.installed_date);
  //     const amcDueDate = installedDate.add(90, "days").format("YYYY-MM-DD");
  //     formik.setFieldValue("amcdue", amcDueDate);
  //   }
  // }, [formik.values.installed_date]); // Trigger effect when installed_date changes

  return (
    <div className="lg:w-[579px] -mt-5">
      <form onSubmit={formik.handleSubmit}>
        <div className="lg:pl-[75px] lg:pr-[75px] lg:mb-[20px]">
          <div className="grid grid-flow-row mt-2 mb-2.5">
            {/* <label className="text-darkgrey text-bodyRB mb-2">
              Doctor’s Name
            </label> */}
            <InputBox
              type="text"
              name="IMEI"
              title={"IMEI"}
              placeholder="Enter IMEI"
              onChange={formik.handleChange}
              value={formik.values.IMEI}
              error={formik.touched.IMEI && formik.errors.IMEI}
            />
          </div>
          <div className="grid grid-flow-row mt-2 mb-2.5">
            {/* <label className="text-darkgrey text-bodyRB mb-2">
              Doctor’s Name
            </label> */}
            <InputBox
              type="text"
              name="name"
              title={"Customer's Name"}
              placeholder="Enter Customer's Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="grid grid-flow-row mt-2 mb-2">
            <InputBox
              type="number"
              name="phone"
              title={"Mobile Number"}
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder="Enter Mobile  Number"
              error={formik.errors.phone && formik.touched.phone}
            />
          </div>
          {/* <div className="grid grid-flow-row mt-2 mb-2">
            <InputBox
              type="text"
              name="address"
              title={"Address"}
              onChange={formik.handleChange}
              value={formik.values.address}
              placeholder="Enter Address"
              error={formik.errors.address && formik.touched.phone}
            />
          </div> */}

          <div className="grid grid-flow-row mt-2 mb-2">
            <InputBox
              type="text"
              name="address"
              title={"Address"}
              onChange={formik.handleChange}
              value={formik.values.address}
              placeholder="Enter Address"
              error={formik.errors.address && formik.touched.phone}
            />
          </div>

          <div className="md:col-start-4 md:w-[250px] lg:mt-0 mt-2 z-20">
            <label className="text-darkgrey text-bodyRB mb-2">
              Installed Date
            </label>
            <DatePicker
              // startDate={formik.values.installed_date}
              startDate={new Date(formik.values.installed_date)}
              // onDateChange={(e) => formik.setFieldValue("installed_date", e)}
              onDateChange={(e) => {
                formik.setFieldValue(
                  "installed_date",
                  dayjs(e).format("YYYY-MM-DD")
                );
                // setSelectedDate(dayjs(e).format("YYYY-MM-DD"));
              }}
            />
          </div>
          <div className="md:col-start-4 md:w-[250px] lg:mt-0 mt-2 z-20">
            <label className="text-darkgrey text-bodyRB mb-2">
              Next AMC Date
            </label>
            <DatePicker
              // startDate={formik.values.amcdue}
              startDate={new Date(formik.values.amcdue)}
              // onDateChange={(e) => {
              //   const formattedDate = e.toLocaleDateString("en-CA"); // Adjust locale if needed
              //   formik.setFieldValue("amcdue", formattedDate);
              // }}

              onDateChange={(e) => {
                formik.setFieldValue("amcdue", dayjs(e).format("YYYY-MM-DD"));
                // setSelectedDate(dayjs(e).format("YYYY-MM-DD"));
              }}
            />
          </div>

          <div className="relative grid grid-flow-row mb-4 ">
            <SelectionInput
              title={"Status"}
              className={"h-[54px]"}
              onChange={(e) => formik.setFieldValue("status", e)}
              placeholder={formik.values?.status}
              error={formik.touched.status && formik.errors.status}
            >
              <div value="Live">Live</div>
              <div value="Error">Error</div>
            </SelectionInput>
          </div>

          <div className="relative grid grid-flow-row mb-4 ">
            <SelectionInput
              title={"No Of Floors"}
              className={"h-[54px]"}
              onChange={(e) => formik.setFieldValue("floors", e)}
              placeholder={formik.values?.floors}
              error={formik.touched.floors && formik.errors.floors}
            >
              <div value="1">1</div>
              <div value="2">2</div>
              <div value="3">3</div>
            </SelectionInput>
          </div>
          <div className="grid grid-flow-row mt-2 mb-2">
            <InputBox
              type="text"
              name="wifi_username"
              title={"wifi_username"}
              onChange={formik.handleChange}
              value={formik.values.wifi_username}
              placeholder="Enter wifi_username"
              error={
                formik.errors.wifi_username && formik.touched.wifi_username
              }
            />
          </div>

          <div className="grid grid-flow-row mt-2 mb-2">
            <InputBox
              type="text"
              name="wifi_password"
              title={"wifi_password"}
              onChange={formik.handleChange}
              value={formik.values.wifi_password}
              placeholder="Enter wifi_password"
              error={
                formik.errors.wifi_password && formik.touched.wifi_password
              }
            />
          </div>
        </div>

        <div className="grid grid-flow-row grid-cols-2 gap-5 place-content-center mt-5 lg:mt-0 lg:pl-[75px] lg:pr-[75px] ">
          {/* <Button
            onClick={handleClose}
            type={"secondary"}
            className={"text-heading2B"}
          >
            Close
          </Button> */}
          <Button
            type={"primary"}
            className={"text-heading2B"}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
