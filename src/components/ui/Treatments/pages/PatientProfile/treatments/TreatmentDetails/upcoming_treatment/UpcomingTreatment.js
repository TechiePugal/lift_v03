import React, { useEffect, useState } from "react";
import SelectionInput from "../../../../../../../common/input/Select";
import InputBox from "../../../../../../../common/input/InputBox";
import DatePicker from "../../../../../../../common/datepicker/DatePicker";
import RedClose from "../../../../../../../icons/Red-Close";
import Button from "../../../../../../../common/buttons/Button";
import TextAreaBox from "../../../../../../../common/input/TextAreaBox";

const UpcomingTreatment = ({ formik, addRow, removeRow, doctores }) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [amPm, setAmPm] = useState("AM"); // Default value is 'AM'

  // Update the state when the input values change
  const handleHourChange = (event) => {
    setHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setMinute(event.target.value);
  };

  const handleAmPmChange = (event) => {
    setAmPm(event);
  };
  const formattedTime = `${hour}:${minute} ${amPm}`;

  // Update the Formik field
  useEffect(() => {
    if (hour && minute && amPm) {
      formik.setFieldValue("next_treatment.appointment_time", formattedTime);
    }
  }, [hour, minute, amPm]);

  return (
    <div>
      <div className="">
        <div className="w-full bg-[#F2F496] h-[55px] bg-opacity-[50%] rounded-tl-15 rounded-tr-15 mb-2 flex items-center  pl-5">
          <h1 className="text-bodyBB text-darkgrey">Upcoming treatment</h1>
        </div>
        <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px] ">
          <div className="">
            <div className="overflow-auto lg:overflow-visible">
              <table className="w-full border-separate border-spacing-y-1 overflow-y-scroll pb-1">
                <thead className="border-b">
                  <tr className="text-bodyBB text-darkgrey h-10">
                    <th className="sticky left-0 bg-white border-b-2">Teeth</th>
                    <th className="sticky left-0 bg-white border-b-2">
                      Treatment
                    </th>
                    <th className="border-b-2"></th>
                    <th className="border-b-2"></th>
                  </tr>
                </thead>
                <tbody className="">
                  {formik?.values?.next_treatment?.next_treatment_info?.map(
                    (item, index) => (
                      <tr key={index} className="text-center">
                        <td className=" bg-white border-b-2 h-[100px]">
                          <div className="flex justify-center">
                            <FourquadrantBox formik={formik} index={index} />
                          </div>
                        </td>
                        <td className="border-b-2 pr-5 min-w-[100px]">
                          <SelectionInput
                            className={"py-2"}
                            placeholder={item?.name}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `next_treatment.next_treatment_info.${index}.name`,
                                e
                              )
                            }
                            error={
                              formik?.touched?.next_treatment
                                ?.next_treatment_info?.[index]?.name &&
                              formik?.errors?.next_treatment
                                ?.next_treatment_info?.[index]?.name
                            }
                          >
                            <div value={"test treatment"}>
                              test treatment
                            </div>
                          </SelectionInput>
                        </td>
                        <td className="border-b-2 ">
                          <div
                            className="flex justify-center"
                            onClick={() => removeRow(index)}
                          >
                            <RedClose />
                          </div>
                        </td>
                        <td className="border-b-2 ">
                          <div className="flex items-center">
                            {index ===
                              formik.values?.next_treatment?.next_treatment_info
                                .length -
                                1 && (
                              <div className="w-[100px]">
                                <Button
                                  onClick={addRow}
                                  type={"secondary"}
                                  className={"py-[10px] text-bodyBB"}
                                >
                                  Add row
                                </Button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:flex lg:flex-wrap lg:justify-around grid grid-col-2 lg:grid-cols-4 gap-2 lg:justify-items-center pl-5 pr-5 pb-1 md:items-center">
            <div className="">
              <p className="text-bodyBB text-darkgrey mb-2 ">
                Choose doctor for this treatment
              </p>
              <div>
                <SelectionInput
                  placeholder={formik.values?.next_treatment?.doctor}
                  onChange={(e) =>
                    formik.setFieldValue(`next_treatment.doctor`, e)
                  }
                  error={
                    formik?.touched?.next_treatment?.doctor &&
                    formik?.errors?.next_treatment?.doctor
                  }
                >
                  {doctores?.map((doctore, index) => {
                    return (
                      <div key={index} value={doctore.name} className="">
                        {doctore.name}
                      </div>
                    );
                  })}
                </SelectionInput>
              </div>
            </div>
            <div className=" ">
              <p className="text-bodyBB text-darkgrey mb-2 ">Date</p>
              <div>
                <DatePicker
                  className={"!h-[45px]"}
                  onDateChange={(e) => {
                    formik.setFieldValue(`next_treatment.appointment_date`, e);
                  }}
                  error={
                    formik?.touched?.next_treatment?.appointment_date &&
                    formik?.errors?.next_treatment?.appointment_date
                  }
                />
              </div>
            </div>
            <div className="">
              <p className="text-bodyBB text-darkgrey mb-3 ">Set Time</p>
              <div className="flex  gap-2 ">
                <InputBox
                  className={"w-[70px] h-[45px] text-center"}
                  type={"number"}
                  placeholder={"hh"}
                  onChange={handleHourChange}
                  error={
                    formik.touched?.next_treatment?.appointment_time &&
                    formik.errors?.next_treatment?.appointment_time
                  }
                />
                <InputBox
                  className={"w-[70px] h-[45px] text-center"}
                  type={"number"}
                  placeholder={"mm"}
                  onChange={handleMinuteChange}
                  error={
                    formik.touched?.next_treatment?.appointment_time &&
                    formik.errors?.next_treatment?.appointment_time
                  }
                />
                <SelectionInput
                  onChange={(e) => handleAmPmChange(e)}
                  className={"!w-[100px] h-[45px]"}
                  placeholder={amPm}
                  error={
                    formik.touched?.next_treatment?.appointment_time &&
                    formik.errors?.next_treatment?.appointment_time
                  }
                >
                  <div value="AM">AM</div>
                  <div value="PM">PM</div>
                </SelectionInput>
              </div>
            </div>
            <div className=" pl-4 pb-2 pr-4">
              <p className="text-bodyBB text-darkgrey mb-2">Notes</p>
              <div className="">
                <TextAreaBox
                  className={""}
                  name={`next_treatment.notes`}
                  value={formik?.values?.next_treatment?.notes}
                  onChange={formik?.handleChange}
                />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
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
}) => {
  return (
    <div className="flex">
      <div className="">
        <InputBox
          className={"!w-[72px] !h-[44px] rounded-[10px] text-center"}
          type={""}
          placeholder={""}
          name={`next_treatment.next_treatment_info.${index}.teeth1`}
          value={
            formik?.values?.next_treatment?.next_treatment_info?.[index]?.teeth1
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment?.next_treatment_info?.[index]
              ?.teeth1 &&
            formik?.errors?.next_treatment?.next_treatment_info?.[index]?.teeth1
          }
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={""}
          placeholder={""}
          name={`next_treatment.next_treatment_info.${index}.teeth3`}
          value={
            formik?.values?.next_treatment?.next_treatment_info?.[index]?.teeth3
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment?.next_treatment_info?.[index]
              ?.teeth3 &&
            formik?.errors?.next_treatment?.next_treatment_info?.[index]?.teeth3
          }
        />
      </div>
      <div>
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={""}
          placeholder={""}
          name={`next_treatment.next_treatment_info.${index}.teeth2`}
          value={
            formik?.values?.next_treatment?.next_treatment_info?.[index]?.teeth2
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment?.next_treatment_info?.[index]
              ?.teeth2 &&
            formik?.errors?.next_treatment?.next_treatment_info?.[index]?.teeth2
          }
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={""}
          placeholder={""}
          name={`next_treatment.next_treatment_info.${index}.teeth4`}
          value={
            formik?.values?.next_treatment?.next_treatment_info?.[index].teeth4
          }
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment?.next_treatment_info?.[index]
              ?.teeth4 &&
            formik?.errors?.next_treatment?.next_treatment_info?.[index]?.teeth4
          }
        />
      </div>
      {/* {formik.errors.teeth1 && (
        <p className="text-danger text-smallLB mx-2 my-0.5">{error}</p>
      )} */}
    </div>
  );
};

export default UpcomingTreatment;
