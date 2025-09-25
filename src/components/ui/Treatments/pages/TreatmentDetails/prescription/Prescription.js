import React, { useState } from "react";
import Button from "../../../../../common/buttons/Button";
import RedClose from "../../../../../icons/Red-Close";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import SelectionInput from "../../../../../common/input/Select";
import InputBox from "../../../../../common/input/InputBox";
import {
  getUnitLabel,
  handleMedicineType,
} from "../../../../../../utils/medicineType";
import InputBoxSelect from "../../../../../common/input/InputBoxSelect";

const Prescription = ({
  formik,
  addRow,
  removeRow,
  medicines,
  editData,
  setSearchMedicines,
}) => {
  console.log(formik,"formimkkkkkkkkkk")
  const [units, setUnits] = useState([]);
  const [typedValue, setTypedValue] = useState(() => {
    return formik?.values?.prescription?.medicine_info?.map(obj => obj.medicine);
  });
  
 

  const handleType = (e, index) => {
    const info = handleMedicineType(e);
    formik.setFieldValue(
      `prescription.medicine_info.${index}.medicine_type`,
      info.type
    );
    setUnits({
      ...units,
      [info.type]: info.units,
    });
  };

  const handleMedChange = (e, index) => {
    formik?.setFieldValue(`prescription.medicine_info.${index}.medicine`, e.med);
    formik.setFieldValue(
      `prescription.medicine_info.${index}.before_after_food`,
      e.bfaf
    );
    formik.setFieldValue(`prescription.medicine_info.${index}.morning`, e.mrng);
    formik.setFieldValue(
      `prescription.medicine_info.${index}.afternoon`,
      e.afn
    );
    formik.setFieldValue(`prescription.medicine_info.${index}.night`, e.nit);
    formik.setFieldValue(`prescription.medicine_info.${index}.evening`, e.evn);
    formik.setFieldValue(`prescription.medicine_info.${index}.days`, e.days);
    setTypedValue((prev) => {
      const updatedArray = [...prev];
      updatedArray[index] = e.med; // Update the value at the specified index
      return updatedArray;
    });
  };


  return (
    <div>
      <div className="">
        <div className="w-full bg-[#DE4AC4] h-[55px] bg-opacity-[50%] rounded-tl-15 rounded-tr-15 mb-2 flex items-center  pl-5">
          <h1 className="text-bodyBB text-darkgrey">Prescription</h1>
        </div>
        <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px] lg:overflow-visible overflow-auto ">
          <table className=" w-screen md:w-full h-auto  border-separate border-spacing-y-1 min-w-max">
            <thead className="">
              <tr>
                <th className={`text-bodyBB border-b pb-2`}>Sl No</th>
                <th className={`text-bodyBB border-b pb-2`}>Medicine</th>
                <th className={`text-bodyBB border-b pb-2`}>BF / AF</th>
                <th className={`text-bodyBB border-b pb-2`}>Morning</th>
                <th className={`text-bodyBB border-b pb-2`}>Afternoon</th>
                <th className={`text-bodyBB border-b pb-2`}>Evening</th>
                <th className={`text-bodyBB border-b pb-2`}>Night</th>
                <th className={`text-bodyBB border-b pb-2`}>Days</th>
                <th className={`text-bodyBB border-b pb-2`}></th>
                <th className={`text-bodyBB border-b pb-2`}></th>
              </tr>
            </thead>
            <tbody>
              {/* Maping the rows */}
              {formik?.values?.prescription?.medicine_info?.map(
                (item, index) => (
                  <tr key={index} className="">
                    <td className="text-center h-14 w-[80px]">{index + 1}</td>
                    <td className="w-[150px]">
                      <InputBoxSelect
                        placeholder={"select medicine"}
                        value={typedValue[index]}
                        className={"h-[45px]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]?.medicine &&
                          formik.errors.prescription?.medicine_info?.[index]?.medicine
                        }
                        onChange={(e) => {
                          setSearchMedicines("");
                          handleType(e.type, index);
                          handleMedChange(e, index);
                        }}
                        arrowIcon={true}
                        /** For capturing the input text */
                        handleInputChange={(e) => {
                          setSearchMedicines(e.target?.value);
                          setTypedValue((prev) => {
                            const updatedArray = [...prev];
                            updatedArray[index] = e.target.value; // Update the value at the specified index
                            return updatedArray;
                          });
                          // formik.setFieldValue(
                          //   `prescription.medicine_info.${index}.medicine`,
                          //   e.target?.value
                          // );
                        }}
                      >
                        {medicines?.map((medicine, index) => {
                          return (
                            <div
                              key={index}
                              value={{
                                type: medicine?.medicine_type,
                                med: medicine.medicine,
                                bfaf: medicine.before_after_food,
                                mrng: medicine.morning,
                                afn: medicine.afternoon,
                                nit: medicine.night,
                                evn: medicine.evening,
                                days: medicine.days,
                              }}
                            >
                              {medicine?.medicine}
                            </div>
                          );
                        })}
                      </InputBoxSelect>

                      {/*  */}
                    </td>
                    <td className="w-[150px]">
                      <SelectionInput
                        disabled={!editData}
                        placeholder={item.before_after_food}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]
                            ?.before_after_food &&
                          formik.errors.prescription?.medicine_info?.[index]
                            ?.before_after_food
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.before_after_food`,
                            e
                          )
                        }
                      >
                        <div value={"-"}>-</div>
                        <div value={"Before Food"}>Before Food</div>
                        <div value={"After Food"}>After Food</div>
                      </SelectionInput>
                    </td>
                    <td className="w-[90px]">
                      <SelectionInput
                        disabled={!editData}
                        placeholder={getUnitLabel(
                          item?.medicine_type,
                          item.morning
                        )}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]
                            ?.morning &&
                          formik.errors.prescription?.medicine_info?.[index]
                            ?.morning
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.morning`,
                            parseFloat(e)
                          )
                        }
                      >
                        {units?.[
                          formik.values?.prescription.medicine_info?.[index]
                            ?.medicine_type
                        ]?.map((item, index) => {
                          return (
                            <div key={index} value={item.value}>
                              {item.label}
                            </div>
                          );
                        })}
                      </SelectionInput>
                    </td>
                    <td className="w-[90px] ">
                      <SelectionInput
                        disabled={!editData}
                        placeholder={getUnitLabel(
                          item?.medicine_type,
                          item.afternoon
                        )}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]
                            ?.afternoon &&
                          formik.errors.prescription?.medicine_info?.[index]
                            ?.afternoon
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.afternoon`,
                            parseFloat(e)
                          )
                        }
                      >
                        {units?.[
                          formik.values?.prescription.medicine_info?.[index]
                            ?.medicine_type
                        ]?.map((item, index) => {
                          return (
                            <div key={index} value={item.value}>
                              {item.label}
                            </div>
                          );
                        })}
                      </SelectionInput>
                    </td>
                    <td className="w-[90px]">
                      <SelectionInput
                        disabled={!editData}
                        placeholder={getUnitLabel(
                          item?.medicine_type,
                          item.evening
                        )}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]
                            ?.evening &&
                          formik.errors.prescription?.medicine_info?.[index]
                            ?.evening
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.evening`,
                            parseFloat(e)
                          )
                        }
                      >
                        {units?.[
                          formik.values?.prescription.medicine_info?.[index]
                            ?.medicine_type
                        ]?.map((item, index) => {
                          return (
                            <div key={index} value={item.value}>
                              {item.label}
                            </div>
                          );
                        })}
                      </SelectionInput>
                    </td>
                    <td className="w-[90px]">
                      <SelectionInput
                        disabled={!editData}
                        placeholder={getUnitLabel(
                          item?.medicine_type,
                          item?.night
                        )}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]
                            ?.night &&
                          formik.errors.prescription?.medicine_info?.[index]
                            ?.night
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.night`,
                            parseFloat(e)
                          )
                        }
                      >
                        {units?.[
                          formik.values?.prescription.medicine_info?.[index]
                            ?.medicine_type
                        ]?.map((item, index) => {
                          return (
                            <div key={index} value={item.value}>
                              {item.label}
                            </div>
                          );
                        })}
                      </SelectionInput>
                    </td>
                    <td className="w-[90px] ">
                      <div className="flex justify-center">
                        <InputBox
                          disabled={!editData}
                          value={
                            formik.values?.prescription?.medicine_info?.[index]
                              ?.days
                          }
                          className={"!w-[80px] !h-[45px] text-center"}
                          name={`prescription.medicine_info.${index}.days`}
                          type={"number"}
                          error={
                            formik.touched.prescription?.medicine_info?.[index]
                              ?.days &&
                            formik.errors.prescription?.medicine_info?.[index]
                              ?.days
                          }
                          onChange={(e) =>
                            formik.setFieldValue(
                              `prescription.medicine_info.${index}.days`,
                              e?.targrt?.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td
                      className="w-[50px] cursor-pointer"
                      onClick={() => removeRow(index)}
                    >
                      <RedClose />
                    </td>
                    <td className="w-[100px] pr-2">
                      {index ===
                        formik.values.prescription.medicine_info.length - 1 && (
                        <Button
                          type={"secondary"}
                          onClick={addRow}
                          className={" !py-[8px] text-bodyBB"}
                        >
                          Add Row
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div>
            <div className="pl-2 pr-2 pb-2">
              <p className="text-bodyBB text-darkgrey mb-2">Notes</p>
              <div className="">
                <TextAreaBox
                  disabled={!editData}
                  className={""}
                  name={`prescription.notes`}
                  value={formik?.values?.prescription?.notes}
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

export default Prescription;
