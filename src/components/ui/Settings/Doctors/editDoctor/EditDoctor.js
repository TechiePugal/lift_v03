import { useEffect, useState } from "react";
import Button from "../../../../common/buttons/Button";
import Arrow from "../../../../icons/Arrow";
import Switch from "../../../../common/Switch/Switch";
import {
  deleteDoctor,
  editDoctor,
} from "../../../../../api/settings/Doctors/doctors";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import InputBox from "../../../../common/input/InputBox";
import SelectionInput from "../../../../common/input/Select";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.number()
    .min(1000000000, "number is too short") // Minimum 10 digits
    .max(9999999999, "number is too long")
    .notRequired(),
  speciality: Yup.string().notRequired(),
  appointmentWhatsapp: Yup.boolean(),
});

const EditDoctor = ({ getAllDoctorsData, handleClose, editData }) => {
  console.log({ editData });
  const [isOn, setIsOn] = useState(editData?.appointmentWhatsapp);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [immediateSelected,setImmediateSelected] = useState(false)

  const options = [
    { value: "One Week", label: "1 - Week prior" },
    { value: "Three Days", label: "3 - Days prior" },
  ];

  const handleconfirmation = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues: {
      name: editData.name,
      phone: editData.phone,
      speciality: editData.speciality,
      appointmentWhatsapp: editData.appointmentWhatsapp,
      sendAppointmentWhatsapp: editData.sendAppointmentWhatsapp,
      appointmentWhatsappType: editData.appointmentWhatsappType,
      duration:editData.duration
    },
    validationSchema: validationSchema,
    validate: (values) => {
      const errors = {};
      if (isOn) {
        if (!values.sendAppointmentWhatsapp) {
          errors.sendAppointmentWhatsapp = "AppointmentWhatsapp Required";
        }
        if (!values.appointmentWhatsappType) {
          errors.appointmentWhatsappType = "AppointmentWhatsapp Required";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      setLoading(true);
      editDoctor(values, editData._id)
        .then(() => {
          showSuccessToast("Edited Successfully");
          getAllDoctorsData();
          handleClose();
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
  useEffect(() => {
    
    if(formik.values.sendAppointmentWhatsapp==="Immediate"){
      setImmediateSelected(true)
    }else{
      setImmediateSelected(false)
    }
     
    }, [formik.values.sendAppointmentWhatsapp])
  const toggleSwitch = () => {
    setIsOn(!isOn);
    formik.setFieldValue("appointmentWhatsapp", !isOn);
    formik.setFieldValue("sendAppointmentWhatsapp", "");
    formik.setFieldValue("appointmentWhatsappType", "");
    formik.setFieldValue("duration", "");
  };



  return (
    <div className="lg:w-[579px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="lg:pl-[75px] lg:pr-[75px] lg:mb-[20px]">
          <div className="grid grid-flow-row mt-2 mb-2.5">
            <InputBox
              type="text"
              name="name"
              title={" Doctor’s Name"}
              placeholder="Enter Doctor’s Name"
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
          <div className="grid grid-flow-row mt-2 mb-7">
            <InputBox
              type="text"
              name="speciality"
              title={"Specialty"}
              onChange={formik.handleChange}
              value={formik.values.speciality}
              placeholder="Enter Specialty"
              error={formik.errors.speciality && formik.touched.speciality}
            />
          </div>
          <div className="relative grid grid-flow-col items-center mb-5">
            <span className="text-bodyRB ">
              Send appointment schedule via WhatsApp
            </span>
            {/*  */}
            <Switch handleClick={toggleSwitch} isOn={isOn} />
            {/*  */}
          </div>

          {isOn && (
            <>
              <div className="relative grid grid-flow-row mb-4">
                <SelectionInput
                  title={"Appointment Type"}
                  className={"h-[54px] shadow-none"}
                  placeholder={formik?.values?.appointmentWhatsappType}
                  onChange={(e) =>
                    formik.setFieldValue("appointmentWhatsappType", e)
                  }
                  error={
                    formik.touched.appointmentWhatsappType &&
                    formik.errors.appointmentWhatsappType
                  }
                >
                  <div value="Own Appointments">Own Appointments</div>
                  <div value="All Appointments">All Appointments</div>
                </SelectionInput>
                <div className="absolute inset-y-0 right-2 top-10 flex items-center pr-2 pointer-events-none rotate-90">
                  <Arrow />
                </div>
              </div>
              {formik.errors.appointmentWhatsappType && (
                <p className="text-danger text-smallLB mx-2 my-0.5">
                  {formik.errors.appointmentWhatsappType}
                </p>
              )}
              <div className="relative grid grid-flow-row mb-4 ">
                <SelectionInput
                  title={"Frequency"}
                  className={"h-[54px] shadow-none"}
                  onChange={(e) =>
                    formik.setFieldValue("sendAppointmentWhatsapp", e)
                  }
                  placeholder={formik.values.sendAppointmentWhatsapp}
                  error={
                    formik.touched.sendAppointmentWhatsapp &&
                    formik.errors.sendAppointmentWhatsapp
                  }
                >
                  <div value="Immediate">Immediate</div>
                  <div value="Every Day">Everyday</div>
                  <div value="Only Appointment Days">Only Appointment Days</div>
                </SelectionInput>
                <div className="absolute inset-y-0 right-2 top-10 flex items-center pr-2 pointer-events-none rotate-90">
                  <Arrow />
                </div>
              </div>
              {formik.errors.sendAppointmentWhatsapp && (
                <p className="text-danger text-smallLB mx-2 -my-3 mb-1">
                  {formik.errors.sendAppointmentWhatsapp}
                </p>
              )}
              
                {!immediateSelected && <div className="relative grid grid-flow-row mb-4 ">
                {/* <label className="text-darkgrey text-bodyRB mb-2">
                  Frequency
                </label> */}
                <SelectionInput
                  title={"Customise Duration : Optional"}
                  className={"h-[54px]"}
                  onChange={(e) => formik.setFieldValue("duration", e)}
                  placeholder={options.find(item=>item.value===formik.values?.duration)?.label}
                  error={formik.touched.duration && formik.errors.duration}
                >
                  {options?.map(each=>(

                  <div value={each.value}>{each.label}</div>
                  ))}
                  
                </SelectionInput>
                
              </div>}
              
              
            </>
          )}
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-5 place-content-center mt-5 lg:mt-0 lg:pl-[75px] lg:pr-[75px]">
          <Button
            action={"button"}
            onClick={handleClose}
            type={"secondary"}
            className={"text-heading2B"}
          >
            Close
          </Button>
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

// function InputBox({ type, onChange, value, name, placeholder, error }) {
//   return (
//     <>
//       <input
//         type={type}
//         name={name}
//         onChange={onChange}
//         value={value}
//         placeholder={placeholder}
//         className={`rounded-15 border-2 pl-4 h-[54px]  text-darkgrey text-bodyRB ${
//           error ? "border-danger outline-none " : ""
//         }`}
//       />
//       {error && <p className="text-danger text-smallLB mx-2 my-0.5">{error}</p>}
//     </>
//   );
// }

export default EditDoctor;
