import React from "react";
import InputBox from "../../../../../../../common/input/InputBox";
import SelectionInput from "../../../../../../../common/input/Select";
import TextAreaBox from "../../../../../../../common/input/TextAreaBox";
import RedClose from "../../../../../../../icons/Red-Close";
import Button from "../../../../../../../common/buttons/Button";

const TreatmentDone = ({ formik, addRow, removeRow, doctores }) => {
  console.log({ formik });
  return (
    <div>
      <div className="">
        <div className="w-full bg-[#E45353] h-[50px] bg-opacity-[20%] rounded-tl-15 rounded-tr-15 mb-1 flex items-center  pl-5">
          <h1 className="text-bodyBB text-darkgrey">Treatment Done</h1>
        </div>
        <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px] ">
          <div className="overflow-auto lg:overflow-visible">
            <table className="w-full border-separate border-spacing-y-1 overflow-y-scroll pb-3">
              <thead className="border-b">
                <tr className="text-bodyBB text-darkgrey h-10">
                  <th className="sticky left-0 bg-white border-b-2">Teeth</th>
                  <th className="sticky left-0 bg-white border-b-2">
                    Treatment
                  </th>
                  <th className="sticky left-0 bg-white border-b-2">Doctor</th>
                  <th className="border-b-2"></th>
                  <th className="border-b-2"></th>
                </tr>
              </thead>
              <tbody className="">
                {formik?.values?.treatment_done?.treatment_done_info?.map(
                  (item, index) => (
                    <tr key={index} className="text-center">
                      <td className=" bg-white border-b-2 h-[100px]">
                        <div className="flex justify-center">
                          <FourquadrantBox
                            formik={formik?.values?.treatment_done}
                            index={index}
                          />
                        </div>
                      </td>
                      <td className="border-b-2 pr-5 min-w-[100px]">
                        <SelectionInput
                          className={"py-2"}
                          placeholder={item?.name}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `treatment_done.treatment_done_info.${index}.name`,
                              e
                            )
                          }
                          error={
                            formik?.touched?.treatment_done
                              ?.treatment_done_info?.[index]?.name &&
                            formik?.errors?.treatment_done
                              ?.treatment_done_info?.[index]?.name
                          }
                        >
                          <div value={"test treatment"}>
                            test treatment
                          </div>
                        </SelectionInput>
                      </td>
                      <td className="border-b-2 min-w-[100px]">
                        <SelectionInput
                          className={"py-2"}
                          placeholder={item?.doctor}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `treatment_done.treatment_done_info.${index}.doctor`,
                              e
                            )
                          }
                          error={
                            formik?.touched?.treatment_done
                              ?.treatment_done_info?.[index]?.doctor &&
                            formik?.errors?.treatment_done
                              ?.treatment_done_info?.[index]?.doctor
                          }
                        >
                          {doctores?.map((doctore, index) => {
                            return (
                              <div
                                key={index}
                                value={doctore.name}
                                className=""
                              >
                                {doctore.name}
                              </div>
                            );
                          })}
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
                            formik.values.treatment_done.treatment_done_info
                              .length -
                              1 && (
                            <div className="w-[100px]">
                              <Button
                                onClick={addRow}
                                type={"secondary"}
                                className={"py-[8px] text-bodyBB"}
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

          <div>
            <div className=" pl-4 pb-2 pr-4">
              <p className="text-bodyBB text-darkgrey mb-2">Notes</p>
              <div className="">
                <TextAreaBox
                  className={""}
                  name={`treatment_done.notes`}
                  value={formik?.values?.treatment_done?.notes}
                  onChange={formik?.handleChange}
                />
              </div>
            </div>
          </div>
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
          type={"text"}
          placeholder={""}
          name={`treatment_done.treatment_done_info.${index}.teeth1`}
          value={formik?.treatment_done_info?.[index]?.teeth1}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.treatment_done_info?.[index]?.teeth1 &&
            formik?.errors?.treatment_done_info?.[index]?.teeth1
          }
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`treatment_done.treatment_done_info.${index}.teeth3`}
          value={formik?.treatment_done_info[index]?.teeth3}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.treatment_done_info?.[index]?.teeth3 &&
            formik?.errors?.treatment_done_info?.[index]?.teeth3
          }
        />
      </div>
      <div>
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`treatment_done.treatment_done_info.${index}.teeth2`}
          value={formik?.treatment_done_info[index]?.teeth2}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.treatment_done_info?.[index]?.teeth2 &&
            formik?.errors?.treatment_done_info?.[index]?.teeth2
          }
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`treatment_done.treatment_done_info.${index}.teeth4`}
          value={formik?.treatment_done_info[index].teeth4}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.treatment_done_info?.[index]?.teeth4 &&
            formik?.errors?.treatment_done_info?.[index]?.teeth4
          }
        />
      </div>
      {/* {formik.errors.teeth1 && (
        <p className="text-danger text-smallLB mx-2 my-0.5">{error}</p>
      )} */}
    </div>
  );
};
export default TreatmentDone;
