import React, { useEffect, useRef, useState } from "react";
import Button from "../../../common/buttons/Button";
import InputBox from "../../../common/input/InputBox";
import DatePicker from "../../../common/datepicker/DatePicker";
import ModalWrapper from "../../../common/modal/ModalWrapper";
import { closeCamera, openCamera, takePicture } from "../../../../utils/files";
import Camera from "../../../icons/Camera";
import Gallery from "../../../icons/Gallery";
import RedClose from "../../../icons/Red-Close";
import Arrow from "../../../icons/Arrow";
import SelectionInput from "../../../common/input/Select";
import Whatsapp from "../../../icons/Whatsapp";
import SMS from "../../../icons/SMS";
import TextAreaBox from "../../../common/input/TextAreaBox";
import { showErrorToast, showSuccessToast } from "../../../../utils/toaster";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  calculateAge,
  formatDateToString,
  formatToSearchDate,
} from "../../../../utils/date";
import {
  registerPatient,
  uploadPatientImage,
} from "../../../../api/Treatments/PatientDatabase/RegisterPatient";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getAllPatients } from "../../../../api/Treatments/PatientDatabase/PatientDatabase";
import { MdFlipCameraAndroid } from "react-icons/md";
import { useSelector } from "react-redux";
import { openWhatsappMessager } from "../../../../utils/opneWhatsapp";

const RegisterPatient = ({ patientId, handleRegister }) => {
  const videoRef = useRef(null);
  const [previewImg, setPreviewImg] = useState("");
  const [imageData, setImageData] = useState("");
  const fileInputRef = React.createRef();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigate();
  const [patientsData, setPatientsData] = useState([]);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const currentUser = useSelector((state) => state.auth);


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required*"),
    age: Yup.number().required("Age is required*"),
    gender: Yup.string().required("Gender is required*"),
    dob: Yup.string().notRequired(),
    phone: Yup.number()
      .required("Phone number is required*")
      .min(1000000000, "Number is too short") // Minimum 10 digits
      .max(9999999999, "Number is too long"),
    address: Yup.string().notRequired(),
    notes: Yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      patientId_prefix: hospitalInfo?.patientId_prefix,
      patient_id: patientId?.patient_id,
      name: "",
      age: "",
      gender: "",
      dob: "",
      phone: "",
      address: "",
      sms: currentUser?.subscriptionInfo==="Essentials"?true:false,
      whatsapp: false,
      welcomeMessage: true,
      notes: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        dob: values.dob && dayjs(values.dob).format("YYYY-MM-DD"),
      };
      setLoading(true);
      registerPatient(payload)
        .then((response) => {
          /** Open Whatsapp for essentials subscription users */
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

  console.log(formik.values,"razi values formik")

  const handleProfilePicUpload = (params) => {
    if (imageData) {
      setLoading(true);
      const id = params?.data?.data?._id;
      uploadPatientImage(imageData, id)
        .then((response) => {
          navigation(
            `/appointments?createNew=true&_id=${params?.data?.data?._id}`
          );
          showSuccessToast("Patient Added Successfully");
        })
        .catch((error) => {
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoading(false);
          handleRegister();
        });
    } else {
      handleRegister();
      console.log("No pic to upload");
      navigation(`/appointments?createNew=true&_id=${params?.data?.data?._id}`);
      showSuccessToast("Patient Added Successfully");
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

  const handleToggleCamera = async () => {
    setIsFrontCamera(!isFrontCamera);
    // Close the current camera stream
    const currentStream = videoRef?.current?.srcObject;
    const tracks = currentStream?.getTracks();
    tracks?.forEach((track) => track?.stop());
    // Open the camera with the new facing mode
    openCamera(videoRef, !isFrontCamera);
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

  const getPatientsData = () => {
    getAllPatients(phoneNumber)
      .then((response) => {
        console.log({ response });
        setPatientsData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    setPatientsData([]);
    if (phoneNumber.length === 10) {
      getPatientsData();
    }
  }, [phoneNumber]);
  return (
    <div className="md:w-[500px] lg:w-[550px] -mt-5">
      <form onSubmit={formik.handleSubmit} className="">
        <div className={`grid  lg:grid-cols-2 gap-x-5 gap-y-3 w-full mt-2`}>
          <div
            className={`  ${
              hospitalInfo?.patientId_prefix ? "flex items-center gap-1" : ""
            }`}
          >
            {hospitalInfo?.patientId_prefix && (
              <div className="">
                <InputBox
                  value={formik.values.patientId_prefix}
                  disabled={true}
                  title={"prefix"}
                  className={"h-[45px] !w-[100px]"}
                />
              </div>
            )}
            <InputBox
              value={formik.values.patient_id}
              name={"patient_id"}
              onChange={formik.handleChange}
              disabled={false}
              title={"Patient ID (PIN)"}
              placeholder={"Auto generated"}
              className={`h-[45px]  ${
                hospitalInfo?.patientId_prefix ? "lg:!w-[165px]" : ""
              }`}
            />
          </div>
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
            type={"number"}
            onChange={(e) => {
              // Trim the input value to a maximum length of 3 characters
              let inputValue = e.target.value.slice(0, 3);

              // Update the formik values with the trimmed value
              formik.setFieldValue("age", inputValue);
            }}
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
            onChange={(e) => {
              formik.handleChange(e);
              setPhoneNumber(e.target.value);
            }}
            error={
              (formik.touched.phone && formik.errors.phone) ||
              (patientsData.length > 0 && "Phone number is already used")
            }
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
            <div className="mt-1">
              <p className="text-darkgrey  text-bodyRB mb-1">
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
            <div className="mt-1">
              <p className="text-darkgrey  text-bodyRB mb-1">Uploaded Image</p>
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
        </div>
        <div className="lg:flex justify-between ">
          <div className="shadow-card rounded-15 mb-5 flex">
            <div className=" flex flex-col p-5 justify-center">
              {/* <p className="text-darkgrey  text-bodyBB mb-2">
                Welcome Message{" "}
              </p> */}
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name={"welcomeMessage"}
                  checked={formik.values.welcomeMessage}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.welcomeMessage &&
                    formik.errors.welcomeMessage
                  }
                  className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                />
                <p className="text-bodyBB text-darkgrey"> Welcome Message </p>
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
                    checked={formik.values.whatsapp}
                    onChange={formik.handleChange}
                    error={formik.touched.whatsapp && formik.errors.whatsapp}
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
                    // value={true}
                    checked={formik.values.sms}
                    onChange={formik.handleChange}
                    error={formik.touched.sms && formik.errors.sms}
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
            Register
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
          <div className="flex justify-center mt-5 items-center">
            <button
              className="w-14 h-12 flex justify-center items-center  text-pink bg-white text-[30px] shadow-card rounded-15"
              onClick={handleToggleCamera}
            >
              <MdFlipCameraAndroid />
            </button>
            <button onClick={handleTakePicture}>
              <Camera />
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default RegisterPatient;
