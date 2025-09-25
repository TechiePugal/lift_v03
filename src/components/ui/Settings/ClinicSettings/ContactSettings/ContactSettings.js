import React, { useState } from "react";
import InputBox from "../../../../common/input/InputBox";
import TextAreaBox from "../../../../common/input/TextAreaBox";
import Button from "../../../../common/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { getHospitalInfo, updateCompanyInfo } from "../../../../../api/settings/Settings";
import { setHospitalData } from "../../../../../store/slice/hospital-info-slice";

const validationSchema = Yup.object().shape({
  company: Yup.string().required("Company name is required"),
  phoneNumber1: Yup.string()
    .matches(/^[0-9]+$/, "Invalid phone number")
    .max(10, "Phone number must not exceed 10 characters")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email address"),
  addressLine1: Yup.string().required("Address Line 1 is required"),
  addressLine2: Yup.string(),
  addressLine3: Yup.string(),
  addressLine4: Yup.string(),
  reviewLink: Yup.string().url("Invalid URL format"),
});

const ContactSettings = () => {
  const dispatch = useDispatch();
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const [loading, setLoading] = useState(false);

  const [clinicEdit, setClinicEdit] = useState(false);

  const handleEditClinicData = (e) => {
    e?.stopPropagation();
    setClinicEdit(!clinicEdit);
  };
  const formik = useFormik({
    initialValues: {
      company: hospitalInfo?.company,
      phoneNumber1: hospitalInfo?.phoneNumber1,
      email: hospitalInfo.email,
      addressLine1: hospitalInfo.addressLine1,
      addressLine2: hospitalInfo.addressLine2,
      addressLine3: hospitalInfo.addressLine3,
      addressLine4: hospitalInfo.addressLine4,
      reviewLink: hospitalInfo.reviewLink,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      updateCompanyInfo(values, hospitalInfo._id)
        .then((response) => {
          showSuccessToast("Updated");
          handleEditClinicData();
          getHospitalInfo(hospitalInfo._id)
          .then((response) => {
            dispatch(setHospitalData(response?.data?.data));
          })
          .catch((error) => {
            console.log(error);
          })
        })
        .catch((error) => {
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoading(false);
        });
      console.log({ values });
    },
  });

  return (
    <div>
      <div className="shadow-card rounded-15 p-5 bg-white">
        <div className="flex items-center gap-3 mb-1">
          <div className="pt-4">
            <h1 className="mb-4 text-bodyBB text-darkgrey min-w-max">
              Contact Settings
            </h1>
          </div>
          <div className=" cursor-pointer text-primary flex w-full justify-end">
            {clinicEdit ? (
              <div className="flex gap-2">
                <p onClick={handleEditClinicData}>Cancel</p>
              </div>
            ) : (
              <p onClick={handleEditClinicData}>Edit</p>
            )}
          </div>
        </div>
        <div className="grid gap-5">
          <InputBox
            title={"Clinic Name"}
            type={"text"}
            name={"company"}
            disabled={!clinicEdit}
            value={formik.values.company}
            error={formik.touched.company && formik.errors.company}
            onChange={formik.handleChange}
            className={"h-[54px] text-darkgrey border-[#E7EBEC]"}
          />
          <TextAreaBox
            title={"Clinic Address Line 1"}
            type={"text"}
            name={"addressLine1"}
            disabled={!clinicEdit}
            value={formik.values.addressLine1}
            onChange={formik.handleChange}
            error={formik.touched.addressLine1 && formik.errors.addressLine1}
            className={"h-[54px] text-darkgrey border-[#E7EBEC] pt-4"}
          />
          <TextAreaBox
            title={"Clinic Address Line 2"}
            type={"text"}
            name={"addressLine2"}
            disabled={!clinicEdit}
            value={formik.values.addressLine2}
            onChange={formik.handleChange}
            error={formik.touched.addressLine2 && formik.errors.addressLine2}
            className={"h-[54px] text-darkgrey border-[#E7EBEC] pt-4"}
          />
          <TextAreaBox
            title={"Clinic Address Line 3"}
            type={"text"}
            name={"addressLine3"}
            value={formik.values.addressLine3}
            disabled={!clinicEdit}
            onChange={formik.handleChange}
            error={formik.touched.addressLine3 && formik.errors.addressLine3}
            className={"h-[54px] text-darkgrey border-[#E7EBEC] pt-4"}
          />
          <TextAreaBox
            title={"Clinic Address Line 4"}
            type={"text"}
            name={"addressLine4"}
            disabled={!clinicEdit}
            value={formik.values.addressLine4}
            onChange={formik.handleChange}
            error={formik.touched.addressLine4 && formik.errors.addressLine4}
            className={"h-[54px] text-darkgrey border-[#E7EBEC] pt-4"}
          />
          <InputBox
            title={"Contact Number for appointments"}
            type={"number"}
            name={"phoneNumber1"}
            disabled={!clinicEdit}
            value={formik.values.phoneNumber1}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber1 && formik.errors.phoneNumber1}
            className={"h-[54px] text-darkgrey border-[#E7EBEC]"}
          />
          <InputBox
            title={"Clinic email id"}
            type={"email"}
            name={"email"}
            disabled={!clinicEdit}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
            className={"h-[54px] text-darkgrey border-[#E7EBEC]"}
          />
          <InputBox
            title={"Google Review link"}
            name={"reviewLink"}
            disabled={!clinicEdit}
            value={formik.values.reviewLink}
            onChange={formik.handleChange}
            error={formik.touched.reviewLink && formik.errors.reviewLink}
            type={"link"}
            className={"h-[54px] text-darkgrey border-[#E7EBEC]"}
          />
        </div>
        <div className="flex w-full justify-end">
          {clinicEdit && (
            <div className="mt-6">
              <Button
                type={"primary"}
                action={"button"}
                className={"!h-[42px] !w-[100px] !py-[5px]"}
                loading={loading}
                onClick={(e) => formik.submitForm(e)}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSettings;
