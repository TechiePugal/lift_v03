import React from "react";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import Button from "../../../../../common/buttons/Button";
import RedClose from "../../../../../icons/Red-Close";
import SelectionInput from "../../../../../common/input/Select";
import InputBox from "../../../../../common/input/InputBox";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import { formatDate } from "../../../../../../utils/date";
import InputBoxSelect from "../../../../../common/input/InputBoxSelect";

const LabOrder = ({
  formik,
  addRow,
  removeRow,
  labs,
  labsWorks,
  editData,
  setSearchLabs,
  setSearchLabWorks,
}) => {
  return (
    <div>
      <div className="">
        <div className="w-full bg-[#6AB483] h-[55px] bg-opacity-[50%] rounded-tl-15 rounded-tr-15 mb-1 flex items-center  pl-5">
          <h1 className="text-bodyBB text-darkgrey">Lab Order</h1>
        </div>
        <div className="rounded-bl-15 rounded-br-15  shadow-card bg-white min-h-[100px]  lg:overflow-x-visible overflow-x-scroll ">
          <table className="w-full border-separate border-spacing-y-1 pb-1">
            <thead className="border-b">
              <tr className="text-bodyBB text-darkgrey h-10">
                <th className="sticky left-0 bg-white border-b-2">SL No</th>
                <th className="sticky left-0 bg-white border-b-2">Teeth</th>
                <th className="sticky left-0 bg-white border-b-2">
                  Order Date
                </th>
                <th className="sticky left-0 bg-white border-b-2">Lab</th>
                <th className="sticky left-0 bg-white border-b-2">Work</th>
                <th className="sticky left-0 bg-white border-b-2">Notes</th>
                <th className="border-b-2"></th>
                <th className="border-b-2"></th>
              </tr>
            </thead>
            <tbody className="">
              {formik?.values?.lab_info?.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className=" bg-white border-b-2 h-[100px]">
                    {index + 1}
                  </td>
                  <td className=" bg-white border-b-2 pr-1 h-[100px]">
                    <div className="flex justify-center">
                      <FourquadrantBox
                        formik={formik}
                        index={index}
                        disabled={!editData}
                      />
                    </div>
                  </td>
                  <td className="border-b-2 pr-1 w-[200px]">
                    <DatePicker
                      disabled={!editData}
                      className={"!h-[45px]"}
                      startDate={
                        new Date(
                          formatDate(
                            formik?.values?.lab_info?.[index]?.order_date
                          )
                        )
                      }
                      onDateChange={(e) =>
                        formik.setFieldValue(`lab_info.${index}.order_date`, e)
                      }
                      error={
                        formik.touched?.lab_info?.[index]?.order_date &&
                        formik.errors?.lab_info?.[index]?.order_date
                      }
                    />
                  </td>
                  <td className="border-b-2 pr-1 w-[190px] lg:min-w-full min-w-[190px] max-w-min">
                    <InputBoxSelect
                      disabled={!editData}
                      placeholder={"Select lab"}
                      value={formik?.values?.lab_info?.[index]?.lab}
                      onChange={(e) => {
                        setSearchLabs("");
                        formik.setFieldValue(`lab_info.${index}.lab`, e);
                      }}
                      error={formik.touched.lab && formik.errors.lab}
                      arrowIcon={true}
                      /** For capturing the input text */
                      className={"h-[45px]"}
                      handleInputChange={(e) => {
                        setSearchLabs(e.target?.value);
                        formik.setFieldValue(
                          `lab_info.${index}.lab`,
                          e.target?.value
                        );
                      }}
                    >
                      {labs?.map((lab, index) => {
                        return (
                          <div key={index} value={lab?.lab_name}>
                            {lab?.lab_name}
                          </div>
                        );
                      })}
                    </InputBoxSelect>
                    {/* */}
                  </td>
                  <td className="border-b-2 pr-5 w-[190px] lg:min-w-full min-w-[190px] max-w-min">
                    <InputBoxSelect
                      disabled={!editData}
                      placeholder={"Select work"}
                      value={formik?.values?.lab_info?.[index].work_type}
                      className={"h-[45px]"}
                      onChange={(e) => {
                        setSearchLabWorks("");
                        formik.setFieldValue(`lab_info.${index}.work_type`, e);
                      }}
                      error={
                        formik.touched.work_type && formik.errors.work_type
                      }
                      arrowIcon={true}
                      /** For capturing the input text */
                      handleInputChange={(e) => {
                        setSearchLabWorks(e.target?.value);
                        formik.setFieldValue(
                          `lab_info.${index}.work_type`,
                          e.target?.value
                        );
                      }}
                    >
                      {labsWorks?.map((works, index) => {
                        return (
                          <div key={index} value={works?.name}>
                            {works?.name}
                          </div>
                        );
                      })}
                    </InputBoxSelect>
                    {/*  */}
                  </td>
                  <td className="border-b-2 pr-5 w-[150px] lg:min-w-full min-w-[150px] max-w-min">
                    <TextAreaBox
                      disabled={!editData}
                      className={""}
                      name={`lab_info.${index}.notes`}
                      value={formik?.values?.lab_info?.[index]?.notes}
                      onChange={formik?.handleChange}
                      error={
                        formik?.touched?.lab_info?.[index]?.notes &&
                        formik?.errors?.lab_info?.[index]?.notes
                      }
                    />
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
                      {index === formik.values?.lab_info?.length - 1 && (
                        <div className="w-[100px]">
                          <Button
                            onClick={addRow}
                            type={"secondary"}
                            className={"!py-[8px] text-bodyBB"}
                          >
                            Add row
                          </Button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  disabled,
}) => {
  return (
    <div className="flex">
      <div className="">
        <InputBox
          className={"!w-[72px] !h-[44px] rounded-[10px] text-center"}
          type={"text"}
          disabled={disabled}
          placeholder={""}
          name={`lab_info.${index}.teeth1`}
          value={formik?.values?.lab_info?.[index]?.teeth1}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.lab_info?.[index]?.teeth1 &&
            formik?.errors?.lab_info?.[index]?.teeth1
          }
        />
        <InputBox
          disabled={disabled}
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`lab_info.${index}.teeth3`}
          value={formik?.values?.lab_info?.[index]?.teeth3}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.lab_info?.[index]?.teeth3 &&
            formik?.errors?.lab_info?.[index]?.teeth3
          }
        />
      </div>
      <div>
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          disabled={disabled}
          type={"text"}
          placeholder={""}
          name={`lab_info.${index}.teeth2`}
          value={formik?.values?.lab_info?.[index]?.teeth2}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.lab_info?.[index]?.teeth2 &&
            formik?.errors?.lab_info?.[index]?.teeth2
          }
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          disabled={disabled}
          type={"text"}
          placeholder={""}
          name={`lab_info.${index}.teeth4`}
          value={formik?.values?.lab_info?.[index].teeth4}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.lab_info?.[index]?.teeth4 &&
            formik?.errors?.lab_info?.[index]?.teeth4
          }
        />
      </div>
      {/* {formik.errors.teeth1 && (
        <p className="text-danger text-smallLB mx-2 my-0.5">{error}</p>
      )} */}
    </div>
  );
};
export default LabOrder;
