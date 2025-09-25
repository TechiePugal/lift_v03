import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  registerPatient,
  updatePatient,
  uploadPatientImage,
} from "../../../../../../api/Treatments/PatientDatabase/RegisterPatient";
import InputBox from "../../../../../common/input/InputBox";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import SelectionInput from "../../../../../common/input/Select";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import Camera from "../../../../../icons/Camera";
import RedClose from "../../../../../icons/Red-Close";
import Whatsapp from "../../../../../icons/Whatsapp";
import SMS from "../../../../../icons/SMS";
import Button from "../../../../../common/buttons/Button";
import ModalWrapper from "../../../../../common/modal/ModalWrapper";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../../utils/toaster";
import {
  closeCamera,
  openCamera,
  takePicture,
} from "../../../../../../utils/files";
import { calculateAge, formatDateToString } from "../../../../../../utils/date";
import Gallery from "../../../../../icons/Gallery";
import { getProfilePic } from "../../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import { openWhatsappMessager } from "../../../../../../utils/opneWhatsapp";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.string().required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.string().notRequired(),
  phone: Yup.number()
    .min(1000000000, "number is too short") // Minimum 10 digits
    .max(9999999999, "number is too long")
    .required("Phone number is required"),
  address: Yup.string().notRequired(),
  notes: Yup.string().notRequired(),
});

const EditPatient = ({ handleEdit, patientProfile, getPatientData }) => {
  console.log({patientProfile});
  const videoRef = useRef(null);
  const [previewImg, setPreviewImg] = useState("");
  const [img, setImg] = useState("");
  const [imageData, setImageData] = useState(patientProfile?.profilePicture);
  const fileInputRef = React.createRef();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function isURL(str) {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  const formik = useFormik({
    initialValues: {
      patient_id: patientProfile?.patient_id,
      name: patientProfile?.name,
      age: patientProfile?.age,
      gender: patientProfile?.gender,
      dob: patientProfile?.dob,
      phone: patientProfile?.phone,
      address: patientProfile?.address,
      sms: patientProfile?.sms,
      whatsapp: patientProfile?.whatsapp,
      welcomeMessage: patientProfile?.welcomeMessage,
      notes: patientProfile?.notes,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      updatePatient(values, patientProfile?._id)
        .then((response) => {
          openWhatsappMessager(response.data?.data?.essentials_whatsapp_url);
          handleProfilePicUpload(response);
        })
        .catch((error) => {
          console.log(error);
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleProfilePicUpload = (params) => {
    const image = previewImg || imageData;
    if (image && isURL(image)) {
      setLoading(true);
      const id = patientProfile?._id;
      uploadPatientImage(imageData, id)
        .then((response) => {
          showSuccessToast("Patient Edited Successfully");
        })
        .catch((error) => {
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoading(false);
          getPatientData();
          handleEdit();
        });
    } else {
      getPatientData();
      handleEdit();
      console.log("No pic to upload");
      showSuccessToast("Patient Edited Successfully");
    }
  };

  const handleCapture = async () => {
    try {
      setCameraOpen(true);
      openCamera(videoRef);
    } catch (error) {
      console.error("Error accessing the camera:", error);
      showErrorToast(error);
    }
  };

  // Function to close the camera
  const handleCloseCamera = () => {
    closeCamera(videoRef);
    setCameraOpen(false);
  };

  const handleTakePicture = async () => {
    try {
      const image = await takePicture(videoRef);
      const imageFile = new File([image], "captured_image.jpg", {
        type: "image/jpeg",
      }); // Adjust the filename and type
      setPreviewImg(URL.createObjectURL(image));
      setImageData(imageFile);
      handleCloseCamera();
    } catch (error) {
      console.error("Error capturing image:", error);
      showErrorToast(error);
    }
  };

  // Function to handle file input change
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImg(imageUrls);
    setImageData(e.target.files[0]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setPreviewImg("");
    setImageData("");
  };

  const generateAge = async (dateOfBirth) => {
    try {
      const age = await calculateAge(dateOfBirth);
      formik.setFieldValue("age", age);
    } catch (error) {
      console.log({ error });
      showErrorToast(error);
    }
  };

  useEffect(() => {
    getProfilePic(patientProfile._id)
      .then((response) => {
        setImg(response);
      })
      .catch((error) => {});
  }, [patientProfile]);

  return (
    <div className="md:w-[500px] lg:w-[550px] -mt-3">
      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid  lg:grid-cols-2 gap-x-5 gap-y-3 w-full ">
          <InputBox
            value={formik.values.patient_id}
            disabled={true}
            title={"Patient ID (PIN)"}
            placeholder={"Auto generated"}
            className={"h-[45px]"}
          />
          <InputBox
            title={"Patient Name"}
            placeholder={"Enter Name"}
            className={"h-[45px]"}
            name={"name"}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
          />

          <div className="">
            <p className="text-bodyRB text-darkgrey ">Date of birth</p>
            <div>
              <DatePicker
                className={"!h-[47px]"}
                name={"dob"}
                onDateChange={(e) => {
                  formik.setFieldValue("dob", e);
                  generateAge(e);
                }}
                startDate={new Date(formatDateToString(formik?.values?.dob))}
                value={formik.values.dob}
                error={formik.touched.dob && formik.errors.dob}
              />
            </div>
          </div>
          <InputBox
            title={"Age"}
            placeholder={"Auto calculated"}
            className={"h-[45px]"}
            name={"age"}
            disabled={false}
            value={formik.values.age}
            error={formik.touched.age && formik.errors.age}
          />
          <div className="">
            <SelectionInput
              title={"Gender"}
              className={"h-[48px] border-2 shadow-none"}
              placeholder={"Select gender"}
              onChange={(e) => formik.setFieldValue("gender", e)}
              value={formik.values.gender}
              error={formik.touched.gender && formik.errors.gender}
            >
              <div value={"Male"}>Male</div>
              <div value={"Female"}>Female</div>
            </SelectionInput>
          </div>
          <InputBox
            title={"Phone Number"}
            placeholder={"Enter Mobile Number"}
            className={"h-[45px]"}
            name={"phone"}
            value={formik.values.phone}
            type={"number"}
            onChange={formik.handleChange}
            error={formik.touched.phone && formik.errors.phone}
          />
          <TextAreaBox
            title={"Notes"}
            placeholder={""}
            name={"notes"}
            value={formik.values.notes}
            onChange={formik.handleChange}
            error={formik.touched.notes && formik.errors.notes}
          />
          <TextAreaBox
            title={"Address"}
            placeholder={""}
            name={"address"}
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.notes && formik.errors.address}
          />
          {!previewImg && (
            <div className="">
              <p className="text-darkgrey  text-bodyRB ">
                Upload Profile Picture
              </p>
              <div className="flex items-start">
                <button type="button" onClick={handleCapture}>
                  <Camera />
                </button>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Gallery />
                  </button>
                </div>
              </div>
            </div>
          )}
          {previewImg && (
            <div className="">
              <p className="text-darkgrey  text-bodyRB mb-2">Uploaded Image</p>
              <div className="relative w-[100px] h-[100px]">
                <img
                  src={previewImg}
                  className="w-[100px] h-[100px] rounded-15"
                  alt={`Image`}
                />
                <div
                  onClick={() => handleRemoveImage()}
                  className="absolute -top-3 -right-4 cursor-pointer"
                >
                  <RedClose />
                </div>
              </div>
            </div>
          )}
          {!previewImg && patientProfile?.profilePicture ? (
            <img
              src={img}
              className="w-[100px] h-[100px] rounded-15"
              alt={`Image`}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="lg:flex justify-between ">
          <div className="shadow-card rounded-15 mb-5 flex">
            <div className=" flex flex-col p-5 justify-center">
              <p className="text-darkgrey  text-bodyBB mb-2">
                Welcome Message{" "}
              </p>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name={"welcomeMessage"}
                  value={formik.values.welcomeMessage}
                  onChange={formik.handleChange}
                  checked={formik.values.welcomeMessage}
                  error={
                    formik.touched.welcomeMessage &&
                    formik.errors.welcomeMessage
                  }
                  className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                />
                <p className="text-bodyRB text-darkgrey">Whatsapp</p>
                <div className="mt-1">
                  <Whatsapp />
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-card rounded-15 mb-5 flex">
            <div className=" flex flex-col p-5 justify-center">
              <p className="text-darkgrey  text-bodyBB mb-2">
                Preferred Communication Channel{" "}
              </p>

              <div className="flex  justify-between">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                    name={"whatsapp"}
                    value={formik.values.whatsapp}
                    onChange={formik.handleChange}
                    error={formik.touched.whatsapp && formik.errors.whatsapp}
                    checked={formik.values.whatsapp}
                  />
                  <p className="text-bodyRB text-darkgrey">Whatsapp</p>
                  <div className="mt-1">
                    <Whatsapp />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                    name={"sms"}
                    value={formik.values.sms}
                    onChange={formik.handleChange}
                    error={formik.touched.sms && formik.errors.sms}
                    checked={formik.values.sms}
                  />
                  <p className="text-bodyRB text-darkgrey">SMS</p>
                  <div className="mt-1">
                    <SMS />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            type={"primary"}
            loading={loading}
            className={"text-heading2B !w-[200px]"}
          >
            Save
          </Button>
        </div>
      </form>

      {/* Camera */}
      <ModalWrapper
        open={cameraOpen}
        title={"Camera"}
        handleClose={handleCloseCamera}
      >
        <div className="w-[500px] p-5">
          <video
            className="rounded-15"
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
          <div className="flex justify-center mt-5">
            <button onClick={handleTakePicture}>
              <Camera />
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default EditPatient;
