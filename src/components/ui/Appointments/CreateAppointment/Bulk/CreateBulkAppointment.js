import React, { useEffect, useRef, useState } from "react";
import SelectionInput from "../../../../common/input/Select";
import TableMain from "./tablewrapper";
import RedClose from "../../../../icons/Red-Close";
import Button from "../../../../common/buttons/Button";
import { useFormik } from "formik";
import DatePicker from "../../../../common/datepicker/DatePicker";
import InputBox from "../../../../common/input/InputBox";
import { getAllPatients } from "../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import ReactDOM from "react-dom";
import InputBoxSelect from "../../../../common/input/InputBoxSelect";
import { formatDate, formatToSearchDate } from "../../../../../utils/date";
import { addBulkAppointments } from "../../../../../api/Appointments";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { IoMdAdd } from "react-icons/io";
import * as Yup from "yup";
import dayjs from "dayjs";
import { openWhatsappMessager } from "../../../../../utils/opneWhatsapp";

const treatment_info = {
  teeth1: "",
  teeth2: "",
  teeth3: "",
  teeth4: "",
  name: "",
};

const validationSchema = Yup.object().shape({
  appointments: Yup.array().of(
    Yup.object().shape({
      next_treatment_info: Yup.array().of(
        Yup.object().shape({
          teeth1: Yup.string(),
          teeth2: Yup.string(),
          teeth3: Yup.string(),
          teeth4: Yup.string(),
          name: Yup.string().required("required"),
        })
      ),
      patient_id: Yup.string().required("required"),
      appointment_time: Yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "required")
        .required("required"),
      doctor: Yup.string().required("required"),
      sendWhatsapp: Yup.boolean(),
      sendSms: Yup.boolean(),
      appointment_date: Yup.date(),
    })
  ),
});

const initialValues = {
  appointments: [
    {
      next_treatment_info: [treatment_info],
      patient_id: "",
      appointment_time: "",
      doctor: "",
      appointment_date: new Date(),
      // sendWhatsapp: false,
      // sendSms: false,
    },
  ],
};

const CreateAppointment = ({
  doctors,
  handleCreateAppointmentClick,
  getAppointmentsData,
  patientInfo,
  treatments,
  setSearchTreatment,
  setSearchDoctors,
}) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [amPm, setAmPm] = useState("AM"); // Default value is 'AM'
  const [patients, setPatients] = useState([]);
  const [searchKey, setSearchKey] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [whatsapp, setWhatsapp] = useState(false);
  const [sms, setSms] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const mainDivRef = useRef(null);

  const handleWhatsappClick = () => {
    setWhatsapp(!whatsapp);
  };
  const handleSmsClick = () => {
    setSms(!sms);
  };

  // Common function to update formik values
  const updateFormikValues = (hour, minute, amPm, index, formik) => {
    const railwayTime = getRailwayTime(hour, amPm, minute);
    console.log(railwayTime);
    if (hour || minute || amPm) {
      formik.setFieldValue(
        `appointments.${index}.appointment_time`,
        railwayTime
      );
    }
  };

  const handleHourChange = (event, index) => {
    const newHour = event.target.value;

    // Check if newHour is a number between 0 and 12
    if (!isNaN(newHour) && newHour >= 0 && newHour <= 12) {
      setHour((prevHours) => {
        const updatedHours = [...prevHours];
        updatedHours[index] = newHour;
        return updatedHours;
      });
      updateFormikValues(newHour, minute[index], amPm, index, formik);
    } else {
      // Handle invalid input (e.g., show an error message)
      console.error(
        "Invalid hour input. Please enter a number between 0 and 12."
      );
    }
  };

  const handleMinuteChange = (event, index) => {
    const newMinute = event.target.value;

    // Check if newMinute is a number between 0 and 59
    if (!isNaN(newMinute) && newMinute >= 0 && newMinute <= 59) {
      setMinute((prevMinutes) => {
        const updatedMinutes = [...prevMinutes];
        updatedMinutes[index] = newMinute;
        return updatedMinutes;
      });
      updateFormikValues(hour[index], newMinute, amPm, index, formik);
    } else {
      // Handle invalid input (e.g., show an error message)
      console.error(
        "Invalid minute input. Please enter a number between 0 and 59."
      );
    }
  };

  const handleAmPmChange = (event, index) => {
    setAmPm(event);
    updateFormikValues(hour[index], minute[index], event, index, formik);
  };

  const getRailwayTime = (hour, amPm, minute) => {
    // Ensure that the input variables are defined
    if (!hour || !amPm || !minute) {
      return "-";
    }

    let railwayHour = parseInt(hour, 10);

    // Convert to 24-hour format
    if (amPm.toUpperCase() === "PM" && railwayHour !== 12) {
      railwayHour += 12;
    } else if (amPm.toUpperCase() === "AM" && railwayHour === 12) {
      railwayHour = 0;
    }

    // Add leading zeros if necessary
    const formattedHour = railwayHour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");

    return `${formattedHour}:${formattedMinute}`;
  };

  const getTimePeriod = (timeString) => {
    const hour = parseInt(timeString.split(":")[0], 10);

    if (hour >= 0 && hour < 12) {
      return "AM";
    } else if (hour >= 12 && hour < 24) {
      return "PM";
    } else {
      return amPm;
    }
  };

  const handleSearchKey = (string, index) => {
    setSearchKey({
      ...searchKey,
      [index]: string,
    });
  };

  /** Searching for patient and listing */
  const handleAddPatient = (string, index) => {
    handleSearchKey(string, index);
    if (string) {
      getAllPatients(string)
        .then((response) => {
          setPatients(response.data.data);
        })
        .catch(() => {})
        .finally(() => {});
    } else {
      setPatients([]);
    }
  };

  /** Selection of patient from list */
  const handleSelectPatient = (patient, index) => {
    formik.setFieldValue(`appointments.${index}.patient_id`, patient._id);
    handleSearchKey(patient.name, index);
    setPatients([]);
  };

  const addRow = () => {
    formik.setValues({
      ...formik.values,
      appointments: [
        ...formik.values.appointments,
        {
          ...initialValues.appointments[0],
          appointment_date: new Date(), // Optionally reset the date for the new row
        },
      ],
    });
  };
  /** Removing row using index */
  const removeRow = (index) => {
    const updatedItems = [...formik.values.appointments];
    if (updatedItems?.length !== 1) {
      updatedItems.splice(index, 1);
      formik.setValues({
        ...formik.values,
        appointments: updatedItems,
      });
    }
  };

  /** For adding the multi treatment */
  const addTreatment = (index) => {
    formik.setValues({
      ...formik.values,
      appointments: formik.values.appointments.map((appointment, i) => {
        if (i === index) {
          return {
            ...appointment,
            next_treatment_info: [
              ...appointment.next_treatment_info,
              treatment_info,
            ],
          };
        }
        return appointment;
      }),
    });
  };
  /** adding the multi treatment end */

  /** For removeing the multi treatment */
  const removeTreatment = (appointmentIndex, treatmentIndex) => {
    formik.setValues({
      ...formik.values,
      appointments: formik.values.appointments.map((appointment, i) => {
        if (i === appointmentIndex) {
          const { next_treatment_info } = appointment;

          // Check if there is more than one treatment before removing
          if (next_treatment_info.length > 1) {
            return {
              ...appointment,
              next_treatment_info: next_treatment_info.filter(
                (treatment, j) => j !== treatmentIndex
              ),
            };
          }
        }
        return appointment;
      }),
    });
  };
  /** removeing the multi treatment end*/

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const payload = {
        appointments: values.appointments.map((appointment) => ({
          ...appointment,
          appointment_date: formatDate(selectedDate),
          whatsapp: whatsapp,
          sms: sms,
        })),
      };
      addBulkAppointments(payload)
        .then((response) => {
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
    },
  });

  return (
    <div className="w-[500px] md:w-[850px] lg:w-full min-h-[300px]">
      <div
        className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary  left-0   xl:w-full`}
      >
        {/* Head main*/}
        <div className="flex justify-between items-center ">
          <div className="text-center pt-5 pb-5 px-5">
            <h5 className="text-darkgrey text-bodySBB  capitalize">
              Add Patient
            </h5>
          </div>
          <div className=" flex justify-end topindex">
            <DatePicker
              onDateChange={(e) => setSelectedDate(e)}
              startDate={selectedDate}
              error={
                formik.touched?.appointments?.appointment_date &&
                formik.errors?.appointments?.appointment_date
              }
              minDate={false}
              className={"!h-11 !w-[200px] !z-50"}
            />
          </div>
        </div>
        {/* Head main end*/}
      </div>
      <form onSubmit={formik.handleSubmit}>
        {/* Add Patient Section */}
        <div className="mt-1 shadow-card rounded-15 pb-5 w-full overflow-x-auto ">
          {/* Head sub */}

          {/* Table Section */}
          <TableMain>
            {/* Maping the rows */}
            {formik?.values?.appointments.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="text-bodyRB border-b-2 ">{index + 1}</td>
                <td className="pr-2  left-0  border-b-2">
                  <div className="min-w-[160px] relative">
                    <InputBoxSelect
                      handleInputChange={(e) =>
                        handleAddPatient(e.target.value, index)
                      }
                      placeholder={"Search patients"}
                      value={searchKey[index]}
                      // arrowIcon={true}
                      // onChange={(e) => handleSelectPatient(e, index)}
                      error={
                        formik?.touched?.appointments?.[index]?.patient_id &&
                        formik?.errors?.appointments?.[index]?.patient_id
                      }
                    >
                      {patients.map((patient, pindex) => (
                        <div
                          key={pindex}
                          onClick={() => handleSelectPatient(patient, index)}
                          className="flex w-full justify-between"
                        >
                          <p>{patient?.name}</p>
                          <p className="text-[13px] mr-5">
                            Id:
                            {patient?.patient_id}
                          </p>
                        </div>
                      ))}
                    </InputBoxSelect>
                  </div>
                </td>
                <td className="pr-2 min-w-[100px]  left-0  border-b-2 h-[100px]">
                  {/* Formaping the multi treatment name FourquadrantBox only */}
                  {formik.values.appointments?.[
                    index
                  ]?.next_treatment_info?.map((_, treatmentIndex) => (
                    <div className="pb-1" key={treatmentIndex}>
                      <FourquadrantBox
                        formik={formik}
                        index={index}
                        treatmentIndex={treatmentIndex}
                      />
                    </div>
                  ))}
                  {/* Formaping the  FourquadrantBox end  */}
                </td>
                <td className=" min-w-[250px]  left-0  border-b-2">
                  {/* Formaping the multi treatment name selection */}
                  {formik.values.appointments?.[
                    index
                  ]?.next_treatment_info?.map((_, treatmentIndex) => (
                    <div className="h-[90px]  grid place-content-center relative">
                      <div
                        key={treatmentIndex}
                        className="max-w-[250px] flex items-center mt-1"
                      >
                        <InputBoxSelect
                          value={
                            formik?.values?.appointments?.[index]
                              ?.next_treatment_info?.[treatmentIndex]?.name
                          }
                          error={
                            formik?.touched?.appointments?.[index]
                              ?.next_treatment_info?.[treatmentIndex]?.name &&
                            formik?.errors?.appointments?.[index]
                              ?.next_treatment_info?.[treatmentIndex]?.name
                          }
                          placeholder={"select treatment"}
                          /** For capturing the selection */
                          onChange={(e) => {
                            setSearchTreatment("");
                            formik.setFieldValue(
                              `appointments.${index}.next_treatment_info.${treatmentIndex}.name`,
                              e
                            );
                          }}
                          arrowIcon={true}
                          /** For capturing the input text */
                          handleInputChange={(e) => {
                            setSearchTreatment(e.target?.value);
                            formik.setFieldValue(
                              `appointments.${index}.next_treatment_info.${treatmentIndex}.name`,
                              e.target?.value
                            );
                          }}
                        >
                          {treatments?.map((treatment, index) => (
                            <div key={index} value={treatment.name}>
                              {treatment.name}
                            </div>
                          ))}
                        </InputBoxSelect>

                        {/* Conditionaly rendering the remove treatment icon */}
                        {formik.values.appointments?.[index]
                          ?.next_treatment_info?.length > 1 && (
                          <div
                            onClick={() => {
                              removeTreatment(index, treatmentIndex);
                            }}
                          >
                            <RedClose />
                          </div>
                        )}
                        {/* Conditionaly rendering icon end */}

                        {/* Add multi treatment icon */}
                        {treatmentIndex ===
                          formik.values.appointments?.[index]
                            ?.next_treatment_info?.length -
                            1 && (
                          <div
                            className={`flex items-center mb-1 ${
                              treatmentIndex !== 0
                                ? "absolute -right-6"
                                : "ml-1 mr-1"
                            } `}
                          >
                            <div
                              className={`p-[5px] flex items-center justify-center 
                      text-white bg-success hover:bg-opacity-[90%]  
                      border-[1.5px] border-success rounded-full transition  shadow-button 
                      duration-300 ease-in-out hover:text-white hover:border-secondary`}
                              onClick={() => addTreatment(index)}
                            >
                              <IoMdAdd className="" />
                            </div>
                          </div>
                        )}
                        {/* Add multi treatment icon end */}
                      </div>
                    </div>
                  ))}
                  {/* Formaping end */}
                </td>
                <td className="pr-2 min-w-[200px]  left-0  border-b-2">
                  <InputBoxSelect
                    // placeholder={formik.values?.doctor || "All Doctors"}
                    value={formik.values?.appointments?.[index]?.doctor}
                    error={
                      formik?.touched?.appointments?.[index]?.doctor &&
                      formik?.errors?.appointments?.[index]?.doctor
                    }
                    placeholder={"select doctor"}
                    /** For capturing the selection */
                    onChange={(e) => {
                      setSearchDoctors("");
                      formik.setFieldValue(`appointments.${index}.doctor`, e);
                    }}
                    arrowIcon={true}
                    /** For capturing the input text */
                    handleInputChange={(e) => {
                      setSearchDoctors(e.target?.value);
                      formik.setFieldValue(
                        `appointments.${index}.doctor`,
                        e.target?.value
                      );
                    }}
                  >
                    {/* <option value={""} className="">
                      All Doctors
                    </option> */}
                    {doctors?.map((doctore, index) => {
                      return (
                        <div key={index} value={doctore.name} className="">
                          {doctore.name}
                        </div>
                      );
                    })}
                  </InputBoxSelect>
                  {/*  */}
                </td>
                <td className=" w-[100px]  border-b-2">
                  <div className="flex gap-1">
                    <InputBox
                      className={"w-[50px]  text-center"}
                      type={"number"}
                      placeholder={"hh"}
                      onChange={(e) => handleHourChange(e, index)}
                      value={hour?.[index]}
                    />
                    <InputBox
                      className={"w-[50px]  text-center"}
                      type={"number"}
                      placeholder={"mm"}
                      onChange={(e) => handleMinuteChange(e, index)}
                      value={minute?.[index]}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-danger absolute">
                      {formik.touched.appointments?.[index]?.appointment_time &&
                        formik.errors.appointments?.[index]?.appointment_time}
                    </p>
                  </div>
                </td>{" "}
                <td className=" left-0  w-[110px] border-b-2">
                  <SelectionInput
                    onChange={(e) => handleAmPmChange(e, index)}
                    className={"!w-[86px]"}
                    placeholder={amPm}
                    value={getTimePeriod(
                      formik.values.appointments?.[index]?.appointment_time
                    )}
                  >
                    <div value="AM">AM</div>
                    <div value="PM">PM</div>
                  </SelectionInput>
                </td>
                <td className="border-b-2 pl-2 pr-2">
                  <div onClick={() => removeRow(index)}>
                    <RedClose />
                  </div>
                </td>
              </tr>
            ))}
          </TableMain>

          <div className="sticky left-0   grid place-content-end mr-2 mt-2">
            <Button
              className={"min-w-[108px] py-[8px] text-bodyBB  "}
              onClick={addRow}
              action={"button"}
              type={"secondary"}
            >
              Add row
            </Button>
          </div>
        </div>
        <div className="lg:grid flex flex-col gap-2 lg:grid-cols-2  pb-1 mt-3">
          <div className="shadow-card rounded-15 flex justify-center">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                checked={whatsapp}
                onClick={handleWhatsappClick}
              />
              <p className="text-bodyRB text-darkgrey capitalize">
                Send appointment details
              </p>
              {/* <div className="mt-1">
                <Whatsapp />
              </div> */}
            </div>
          </div>
          <div className="md:flex justify-end gap-3">
            <Button
              onClick={() => handleCreateAppointmentClick()}
              type={"secondary"}
              action={"button"}
              className={"text-heading2B lg:w-[230px]"}
            >
              Close
            </Button>
            <Button
              type={"primary"}
              className={"text-heading2B lg:w-[230px]"}
              loading={loading}
            >
              Create Appointment
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const FourquadrantBox = ({
  type,
  onChange,
  value,
  name,
  placeholder,
  error,
  className,
  formik,
  index,
  treatmentIndex,
}) => {
  return (
    <div className="flex">
      <div className="">
        <InputBox
          className={"!w-[72px] !h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`appointments.${index}.next_treatment_info.${treatmentIndex}.teeth1`}
          value={
            formik?.values?.appointments?.[index].next_treatment_info?.[
              treatmentIndex
            ]?.teeth1
          }
          onChange={formik?.handleChange}
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`appointments.${index}.next_treatment_info.${treatmentIndex}.teeth3`}
          value={
            formik?.values?.appointments?.[index]?.next_treatment_info?.[
              treatmentIndex
            ]?.teeth3
          }
          onChange={formik?.handleChange}
        />
      </div>
      <div>
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`appointments.${index}.next_treatment_info.${treatmentIndex}.teeth2`}
          value={
            formik?.values?.appointments?.[index]?.next_treatment_info?.[
              treatmentIndex
            ]?.teeth2
          }
          onChange={formik?.handleChange}
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`appointments.${index}.next_treatment_info.${treatmentIndex}.teeth4`}
          value={
            formik?.values?.appointments?.[index]?.next_treatment_info?.[
              treatmentIndex
            ]?.teeth4
          }
          onChange={formik?.handleChange}
        />
      </div>
    </div>
  );
};

export default CreateAppointment;
