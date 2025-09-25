import { useEffect, useState } from "react";
import Button from "../../../../common/buttons/Button";
import Arrow from "../../../../icons/Arrow";
import Switch from "../../../../common/Switch/Switch";
import { addDoctor } from "../../../../../api/settings/Doctors/doctors";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import InputBox from "../../../../common/input/InputBox";
import SelectionInput from "../../../../common/input/Select";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.number()
    .notRequired()
    .min(1000000000, "Contact number is too short") // Minimum 10 digits
    .max(9999999999, "Contact number is too long"),
  speciality: Yup.string().notRequired(),
  appointmentWhatsapp: Yup.boolean(),
});

const AddDoctor = ({ getAllDoctorsData, handleClose }) => {
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [immediateSelected,setImmediateSelected] = useState(false)
  const options = [
    { value: "One Week", label: "1 - Week prior" },
    { value: "Three Days", label: "3 - Days prior" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      speciality: "",
      appointmentWhatsapp: isOn,
      sendAppointmentWhatsapp: "",
      appointmentWhatsappType: "",
      duration: "",
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
      console.log(values, "05");
      setLoading(true);
      addDoctor(values)
        .then(() => {
          showSuccessToast("Doctor Added Successfully");
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
  console.log(formik.values,"hashimfromikvalue")
  const toggleSwitch = () => {
    setIsOn(!isOn);
    formik.setFieldValue("appointmentWhatsapp", !isOn);
    formik.setFieldValue("sendAppointmentWhatsapp", "");
    formik.setFieldValue("appointmentWhatsappType", "");
  };

  useEffect(() => {
    
  if(formik.values.sendAppointmentWhatsapp==="Immediate"){
    setImmediateSelected(true)
  }else{
    setImmediateSelected(false)
  }
   
  }, [formik.values.sendAppointmentWhatsapp])
  

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
          <div className="grid grid-flow-row mt-2 mb-4">
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
          <div className="relative grid grid-flow-col items-center mb-3">
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
                {/* <label className="text-darkgrey text-bodyRB mb-2">
                  Appointment Type
                </label> */}
                <SelectionInput
                  title={"Appointment Type"}
                  className={"h-[54px]"}
                  placeholder={formik.values?.appointmentWhatsappType}
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
                {/* <select
                  name="appointmentWhatsappType"
                  className="rounded-15 border-2 p-2 h-[54px] appearance-none bg-transparent pl-5 pr-8 text-darkgrey text-bodyRB"
                  id=""
                  onChange={formik.handleChange}
                  value={formik.values.appointmentWhatsappType}
                >
                  <div value=""></div>
                  <div value="Own Appointments">Own Appointments</div>
                  <div value="All Appointments">All Appointments</div>
                </select> */}
                <div className="absolute inset-y-0 right-2 top-10 flex items-center pr-2 pointer-events-none rotate-90">
                  <Arrow />
                </div>
              </div>
              <div className="relative grid grid-flow-row mb-4 ">
                {/* <label className="text-darkgrey text-bodyRB mb-2">
                  Frequency
                </label> */}
                <SelectionInput
                  title={"Frequency"}
                  className={"h-[54px]"}
                  onChange={(e) =>
                    formik.setFieldValue("sendAppointmentWhatsapp", e)
                  }
                  placeholder={formik.values?.sendAppointmentWhatsapp}
                  error={
                    formik.touched.sendAppointmentWhatsapp &&
                    formik.errors.sendAppointmentWhatsapp
                  }
                >
                  <div value="Immediate">Immediate</div>
                  <div value="Every Day">Everyday</div>
                  <div value="Only Appointment Days">Only Appointment Days</div>
                </SelectionInput>
                {/* <select
                  name="sendAppointmentWhatsapp"
                  className="rounded-15 border-2 p-2 h-[54px] appearance-none bg-transparent pl-5 pr-8 text-darkgrey text-bodyRB"
                  id=""
                  onChange={formik.handleChange}
                  value={formik.values.sendAppointmentWhatsapp}
                >
                  <div value=""></div>
                  <div value="Every Day">Everyday</div>
                  <div value="Only Appointment Days">
                    Only Appointment Days
                  </div>
                </select> */}
                {/* <div className="absolute inset-y-0 right-2 top-10 flex items-center pr-2 pointer-events-none rotate-90">
                  <Arrow />
                </div> */}
              </div>
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
                {/* <select
                  name="sendAppointmentWhatsapp"
                  className="rounded-15 border-2 p-2 h-[54px] appearance-none bg-transparent pl-5 pr-8 text-darkgrey text-bodyRB"
                  id=""
                  onChange={formik.handleChange}
                  value={formik.values.sendAppointmentWhatsapp}
                >
                  <div value=""></div>
                  <div value="Every Day">Everyday</div>
                  <div value="Only Appointment Days">
                    Only Appointment Days
                  </div>
                </select> */}
                {/* <div className="absolute inset-y-0 right-2 top-10 flex items-center pr-2 pointer-events-none rotate-90">
                  <Arrow />
                </div> */}
              </div>}
              
              {/* {formik.errors.sendAppointmentWhatsapp && (
                <p className="text-danger text-smallLB mx-2 -my-3 mb-1">
                  {formik.errors.sendAppointmentWhatsapp}
                </p>
              )} */}
            </>
          )}
        </div>

        <div className="grid grid-flow-row grid-cols-2 gap-5 place-content-center mt-5 lg:mt-0 lg:pl-[75px] lg:pr-[75px] ">
          <Button
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

export default AddDoctor;
