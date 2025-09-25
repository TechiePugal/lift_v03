import React from "react";
import SelectionInput from "../../../../common/input/Select";
import RedClose from "../../../../icons/Red-Close";
import Button from "../../../../common/buttons/Button";
import InputBox from "../../../../common/input/InputBox";
import InputBoxSelect from "../../../../common/input/InputBoxSelect";

const SetTreatment = ({
  formik,
  addRow,
  removeRow,
  treatments,
  editConfirm,
  setSearchTreatment,
}) => {
  console.log({formik});
  return (
    <div className=" md:w-full lg:w-full ">
      <div className="shadow-card rounded-15">
        <div
          className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 text-bodyBB text-darkgrey mb-3`}
        >
          Set Treatment
        </div>
        <div className="overflow-auto lg:overflow-visible">
          <table className="w-full border-separate border-spacing-y-0.5 overflow-y-scroll ">
            <thead className="border-b">
              <tr className="text-bodyBB text-darkgrey ">
                <th className="pl-3 border-b-2">Sl No</th>
                <th className="sticky left-0 bg-white border-b-2">Teeth</th>
                <th className="sticky left-0 bg-white border-b-2">Treatment</th>
                {/* <th className="sticky left-0 bg-white border-b-2">
                  Estimated Duration
                </th> */}
                <th className="border-b-2"></th>
                <th className="border-b-2"></th>
              </tr>
            </thead>
            <tbody className="">
              {formik?.values?.next_treatment_info?.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="text-bodyRB border-b-2 ">{index + 1}</td>
                  <td className=" bg-white border-b-2 h-[100px] ">
                    <div className="flex justify-center">
                      <FourquadrantBox
                        formik={formik}
                        index={index}
                        disabled={!editConfirm}
                      />
                    </div>
                  </td>
                  <td className="border-b-2">
                    <InputBoxSelect
                      disabled={!editConfirm}
                      value={formik?.values?.next_treatment_info?.[index]?.name}
                      error={
                        formik?.touched?.next_treatment_info?.[index]?.name &&
                        formik?.errors?.next_treatment_info?.[index]?.name
                      }
                      className={"h-[45px]"}
                      /** For capturing the selection */
                      onChange={(e) => {
                        setSearchTreatment("");
                        formik.setFieldValue(
                          `next_treatment_info.${index}.name`,
                          e
                        );
                      }}
                      arrowIcon={true}
                      /** For capturing the input text */
                      handleInputChange={(e) => {
                        setSearchTreatment(e.target?.value);
                        formik.setFieldValue(
                          `next_treatment_info.${index}.name`,
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
                    {/*  */}
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
                        formik.values.next_treatment_info.length - 1 && (
                        <Button
                          action={"button"}
                          className={
                            "!w-[50px] lg:!w-[100px] !h-[44px] !py-[8px] text-bodyBB  "
                          }
                          onClick={addRow}
                          type={"secondary"}
                        >
                          Add row
                        </Button>
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
          className={"w-[50px] sm:w-[72px] !h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`next_treatment_info.${index}.teeth1`}
          value={formik?.values?.next_treatment_info?.[index]?.teeth1}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment_info?.[index]?.teeth1 &&
            formik?.errors?.next_treatment_info?.[index]?.teeth1
          }
          disabled={disabled}
        />
        <InputBox
          className={"w-[50px] sm:w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`next_treatment_info.${index}.teeth3`}
          value={formik?.values?.next_treatment_info[index]?.teeth3}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment_info?.[index]?.teeth3 &&
            formik?.errors?.next_treatment_info?.[index]?.teeth3
          }
          disabled={disabled}
        />
      </div>
      <div>
        <InputBox
          className={"w-[50px] sm:w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`next_treatment_info.${index}.teeth2`}
          value={formik?.values?.next_treatment_info[index]?.teeth2}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment_info?.[index]?.teeth2 &&
            formik?.errors?.next_treatment_info?.[index]?.teeth2
          }
          disabled={disabled}
        />
        <InputBox
          className={"w-[50px] sm:w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={`next_treatment_info.${index}.teeth4`}
          value={formik?.values?.next_treatment_info[index].teeth4}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.next_treatment_info?.[index]?.teeth4 &&
            formik?.errors?.next_treatment_info?.[index]?.teeth4
          }
          disabled={disabled}
        />
      </div>
      {/* {formik.errors.teeth1 && (
        <p className="text-danger text-smallLB mx-2 my-0.5">{error}</p>
      )} */}
    </div>
  );
};

export default SetTreatment;
