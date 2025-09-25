import React, { useEffect, useState } from "react";
import InputBox from "../../../../../common/input/InputBox";
import SelectionInput from "../../../../../common/input/Select";
import RedClose from "../../../../../icons/Red-Close";
import Button from "../../../../../common/buttons/Button";
import { getUnitLabel, handleMedicineType } from "../../../../../../utils/medicineType";
import InputBoxSelect from "../../../../../common/input/InputBoxSelect";

const Medicines = ({
  formik,
  addRow,
  removeRow,
  medicines,
  setSearchMedicines,
}) => {
  const [units, setUnits] = useState([]);

  const handleType = (e, index) => {
    const info = handleMedicineType(e);
    formik.setFieldValue(`medicine_info.${index}.medicine_type`, info.type);
    // setUnits(info.units);
    setUnits({
      ...units,
      [info.type]: info.units,
    });
  };

  const handleMedChange = (e, index) => {
    formik.setFieldValue(`medicine_info.${index}.medicine`, e.med);
    formik.setFieldValue(`medicine_info.${index}.before_after_food`, e.bfaf);
    formik.setFieldValue(`medicine_info.${index}.morning`, e.mrng);
    formik.setFieldValue(`medicine_info.${index}.afternoon`, e.afn);
    formik.setFieldValue(`medicine_info.${index}.night`, e.nit);
    formik.setFieldValue(`medicine_info.${index}.evening`, e.evn);
    formik.setFieldValue(`medicine_info.${index}.days`, e.days);
  };

  return (
    <div className="shadow-card rounded-15 pb-4 overflow-x-auto   max-h-[400px] ">
      <div
        className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 text-bodyBB text-darkgrey mb-4 sticky left-0 top-0 z-10`}
      >
        Medicines
      </div>
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
          {formik.values?.medicine_info?.map((item, index) => (
            <tr key={index} className="">
              <td className="text-center w-20 h-14">{index + 1}</td>
              <td className="w-[160px] ">
                <InputBoxSelect
                  value={item.medicine}
                  className={"h-[45px]"}
                  error={
                    formik.touched.medicine_info?.[index]?.medicine &&
                    formik.errors.medicine_info?.[index]?.medicine
                  }
                  onChange={(e) => {
                    handleType(e.type, index);
                    handleMedChange(e, index);
                  }}
                  arrowIcon={true}
                  /** For capturing the input text */
                  handleInputChange={(e) => {
                    setSearchMedicines(e.target?.value);
                    formik.setFieldValue(
                      `medicine_info.${index}.medicine`,
                      e.target?.value
                    );
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
              </td>
              <td className="w-[160px]">
                <SelectionInput
                  placeholder={
                    formik.values?.medicine_info?.[index]?.before_after_food
                  }
                  className={"border shadow-none border-[#B9B9B9]"}
                  error={
                    formik.touched.medicine_info?.[index]?.before_after_food &&
                    formik.errors.medicine_info?.[index]?.before_after_food
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      `medicine_info.${index}.before_after_food`,
                      e
                    )
                  }
                >
                  <div value={""}>-</div>
                  <div value={"Before Food"}>Before Food</div>
                  <div value={"After Food"}>After Food</div>
                </SelectionInput>
              </td>
              <td className="w-[80px]">
                <SelectionInput
                  placeholder={getUnitLabel(
                    formik.values?.medicine_info?.[index]?.medicine_type,
                    formik.values?.medicine_info?.[index]?.morning
                  )}
                  className={"border shadow-none border-[#B9B9B9]"}
                  error={
                    formik.touched.medicine_info?.[index]?.morning &&
                    formik.errors.medicine_info?.[index]?.morning
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      `medicine_info.${index}.morning`,
                      parseFloat(e)
                    )
                  }
                >
                  {units?.[
                    formik.values?.medicine_info?.[index]?.medicine_type
                  ]?.map((item, index) => {
                    return (
                      <div key={index} value={item.value}>
                        {item.label}
                      </div>
                    );
                  })}
                </SelectionInput>
              </td>
              <td className="w-[80px] ">
                <SelectionInput
                  placeholder={getUnitLabel(
                    formik.values?.medicine_info?.[index]?.medicine_type,
                    formik.values?.medicine_info?.[index]?.afternoon
                  )}
                  className={"border shadow-none border-[#B9B9B9]"}
                  error={
                    formik.touched.medicine_info?.[index]?.afternoon &&
                    formik.errors.medicine_info?.[index]?.afternoon
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      `medicine_info.${index}.afternoon`,
                      parseFloat(e)
                    )
                  }
                >
                  {units?.[
                    formik.values?.medicine_info?.[index]?.medicine_type
                  ]?.map((item, index) => {
                    return (
                      <div key={index} value={item.value}>
                        {item.label}
                      </div>
                    );
                  })}
                </SelectionInput>
              </td>
              <td className="w-[80px]">
                <SelectionInput
                  placeholder={getUnitLabel(
                    formik.values?.medicine_info?.[index]?.medicine_type,
                    formik.values?.medicine_info?.[index]?.evening
                  )}
                  className={"border shadow-none border-[#B9B9B9]"}
                  error={
                    formik.touched.medicine_info?.[index]?.evening &&
                    formik.errors.medicine_info?.[index]?.evening
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      `medicine_info.${index}.evening`,
                      parseFloat(e)
                    )
                  }
                >
                  {units?.[
                    formik.values?.medicine_info?.[index]?.medicine_type
                  ]?.map((item, index) => {
                    return (
                      <div key={index} value={item.value}>
                        {item.label}
                      </div>
                    );
                  })}
                </SelectionInput>
              </td>
              <td className="w-[80px]">
                <SelectionInput
                  placeholder={getUnitLabel(
                    formik.values?.medicine_info?.[index]?.medicine_type,
                    formik.values?.medicine_info?.[index]?.night
                  )}
                  className={"border shadow-none border-[#B9B9B9]"}
                  error={
                    formik.touched.medicine_info?.[index]?.night &&
                    formik.errors.medicine_info?.[index]?.night
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      `medicine_info.${index}.night`,
                      parseFloat(e)
                    )
                  }
                >
                  {units?.[
                    formik.values?.medicine_info?.[index]?.medicine_type
                  ]?.map((item, index) => {
                    return (
                      <div key={index} value={item.value}>
                        {item.label}
                      </div>
                    );
                  })}
                </SelectionInput>
              </td>
              <td className="w-[80px]">
                <div className="flex justify-center">
                  <InputBox
                    value={formik.values?.medicine_info?.[index]?.days}
                    className={"!w-[80px] !h-[45px] text-center"}
                    name={`medicine_info.${index}.days`}
                    type={"number"}
                    error={
                      formik.touched.medicine_info?.[index]?.days &&
                      formik.errors.medicine_info?.[index]?.days
                    }
                    onChange={formik.handleChange}
                  />
                </div>
                {/* <SelectionInput
                  placeholder={""}
                  className={"border shadow-none border-[#B9B9B9]"}
                  error={
                    formik.touched.medicine_info?.[index]?.days &&
                    formik.errors.medicine_info?.[index]?.days
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      `medicine_info.${index}.days`,
                      parseFloat(e)
                    )
                  }
                >
                  <div value={"1"}>1</div>
                  <div value={"2"}>2</div>
                  <div value={"3"}>3</div>
                  <div value={"4"}>4</div>
                  <div value={"5"}>5</div>
                </SelectionInput> */}
              </td>
              <td className="w-[50px]">
                <div onClick={() => removeRow(index)}>
                  <RedClose />
                </div>
              </td>
              <td className="w-[110px] pr-2 sticky bottom-0">
                {index === formik.values.medicine_info.length - 1 && (
                  <Button
                    type={"secondary"}
                    onClick={addRow}
                    className={"text-bodyBB py-[8px]"}
                  >
                    Add Row
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medicines;
