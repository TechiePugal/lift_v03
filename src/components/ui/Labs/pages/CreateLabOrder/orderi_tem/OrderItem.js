import React from "react";
import SelectionInput from "../../../../../common/input/Select";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import FourquadrantBox from "../../../../../common/input/FourquadrantBox";
import InputBoxSelect from "../../../../../common/input/InputBoxSelect";

const OrderItem = ({
  formik,
  labs,
  labsWorks,
  setSearchLabs,
  setSearchLabWorks,
}) => {
  return (
    <div>
      <div className="w-full bg-secondary p-3  rounded-tl-15 rounded-tr-15 mb-2 flex items-center  pl-5">
        <h1 className="text-bodyBB text-darkgrey">Order Item</h1>
      </div>
      <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px] ">
        <div className="grid  md:grid-cols-4 lg:grid-cols-8 gap-3 relative pr-4 pb-5">
          <div className="w-full border absolute top-10"></div>
          <div className="text-center md:w-[150px]">
            <p className="text-bodyBB text-darkgrey mb-8 pt-2">SI No</p>
            <div className="">01</div>
          </div>
          <div className="text-center">
            <p className="text-bodyBB text-darkgrey mb-8 pt-2">Teeth</p>
            <div className="flex justify-center">
              <FourquadrantBox formik={formik} />
            </div>
          </div>
          <div className="text-center col-span-2 ">
            <p className="text-bodyBB text-darkgrey mb-8 pt-2">Lab</p>
            <div>
              <InputBoxSelect
                placeholder={formik.values?.lab}
                value={formik.values?.lab}
                className={"h-[54px]"}
                onChange={(e) => {
                  setSearchLabs("");
                  formik.setFieldValue("lab", e);
                }}
                error={formik.touched.lab && formik.errors.lab}
                arrowIcon={true}
                /** For capturing the input text */
                handleInputChange={(e) => {
                  setSearchLabs(e.target?.value);
                  formik.setFieldValue("lab", e.target?.value);
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
              {/* <SelectionInput
                placeholder={formik.values?.lab}
                className={"h-[54px]"}
                onChange={(e) => formik.setFieldValue("lab", e)}
                error={formik.touched.lab && formik.errors.lab}
              >
                {labs?.map((lab, index) => {
                  return (
                    <div key={index} value={lab?.lab_name}>
                      {lab?.lab_name}
                    </div>
                  );
                })}
              </SelectionInput> */}
            </div>
          </div>
          <div className="text-center col-span-2">
            <p className="text-bodyBB text-darkgrey mb-8 pt-2">Work</p>
            <div>
              <InputBoxSelect
                placeholder={formik.values?.work_type}
                value={formik.values?.work_type}
                className={"h-[54px]"}
                onChange={(e) => {
                  setSearchLabWorks("");
                  formik.setFieldValue("work_type", e);
                }}
                error={formik.touched.work_type && formik.errors.work_type}
                arrowIcon={true}
                /** For capturing the input text */
                handleInputChange={(e) => {
                  setSearchLabWorks(e.target?.value);
                  formik.setFieldValue("work_type", e.target?.value);
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
              {/* <SelectionInput
                placeholder={formik.values?.work_type}
                className={"h-[54px]"}
                onChange={(e) => formik.setFieldValue("work_type", e)}
                error={formik.touched.work_type && formik.errors.work_type}
              >
                {labsWorks?.map((works, index) => {
                  return (
                    <div key={index} value={works?.name}>
                      {works?.name}
                    </div>
                  );
                })}
              </SelectionInput> */}
            </div>
          </div>
          <div className="text-center col-span-2">
            <p className="text-bodyBB text-darkgrey mb-8 pt-2">Notes</p>
            <div>
              <TextAreaBox
                className="min-h-[100px]"
                name={`notes`}
                onChange={formik?.handleChange}
                error={formik?.touched?.notes && formik?.errors?.notes}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
