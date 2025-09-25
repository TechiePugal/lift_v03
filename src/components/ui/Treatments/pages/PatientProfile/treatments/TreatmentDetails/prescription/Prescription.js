import React, { useState } from "react";
import Button from "../../../../../../../common/buttons/Button";
import RedClose from "../../../../../../../icons/Red-Close";
import TextAreaBox from "../../../../../../../common/input/TextAreaBox";
import SelectionInput from "../../../../../../../common/input/Select";
import { handleMedicineType } from "../../../../../../../../utils/medicineType";

const Prescription = ({ formik, addRow, removeRow, medicines }) => {
  const [units, setUnits] = useState([]);
  const handleType = (e, index) => {
    const info = handleMedicineType(e);
    formik.setFieldValue(
      `prescription.medicine_info.${index}.medicine_type`,
      info.type
    );
    setUnits(info.units);
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
              {formik.values?.prescription?.medicine_info?.map(
                (item, index) => (
                  <tr key={index} className="">
                    <td className="text-center h-14 w-[80px]">{index + 1}</td>
                    <td className="w-[150px]">
                      <SelectionInput
                        placeholder={item.medicine}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]?.medicine &&
                          formik.errors.prescription?.medicine_info?.[index]?.medicine
                        }
                        onChange={(e) => {
                          handleType(e.type, index);
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.medicine`,
                            e.med
                          );
                        }}
                      >
                        {medicines.map((medicine, index) => {
                          return (
                            <div
                              key={index}
                              value={{
                                type: medicine?.medicine_type,
                                med: medicine.medicine,
                              }}
                            >
                              {medicine?.medicine}
                            </div>
                          );
                        })}
                      </SelectionInput>
                    </td>
                    <td className="w-[150px]">
                      <SelectionInput
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
                        <div value={""}>-</div>
                        <div value={"Before Food"}>Before Food</div>
                        <div value={"After Food"}>After Food</div>
                      </SelectionInput>
                    </td>
                    <td className="w-[90px]">
                      <SelectionInput
                        placeholder={item.morning}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]?.morning &&
                          formik.errors.prescription?.medicine_info?.[index]?.morning
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.morning`,
                            parseInt(e)
                          )
                        }
                      >
                        {units.map((item, index) => {
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
                        placeholder={item.afternoon}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]?.afternoon &&
                          formik.errors.prescription?.medicine_info?.[index]?.afternoon
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.afternoon`,
                            parseInt(e)
                          )
                        }
                      >
                        {units.map((item, index) => {
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
                        placeholder={item.evening}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]?.evening &&
                          formik.errors.prescription?.medicine_info?.[index]?.evening
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.evening`,
                            parseInt(e)
                          )
                        }
                      >
                        {units.map((item, index) => {
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
                        placeholder={item.night}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]?.night &&
                          formik.errors.prescription?.medicine_info?.[index]?.night
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.night`,
                            parseInt(e)
                          )
                        }
                      >
                        {units.map((item, index) => {
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
                        placeholder={item.days}
                        className={"border shadow-none border-[#B9B9B9]"}
                        error={
                          formik.touched.prescription?.medicine_info?.[index]?.days &&
                          formik.errors.prescription?.medicine_info?.[index]?.days
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            `prescription.medicine_info.${index}.days`,
                            parseInt(e)
                          )
                        }
                      >
                        <div value={"1"}>1</div>
                        <div value={"2"}>2</div>
                        <div value={"3"}>3</div>
                        <div value={"4"}>4</div>
                        <div value={"5"}>5</div>
                      </SelectionInput>
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
                          className={" py-[8px] text-bodyBB"}
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
