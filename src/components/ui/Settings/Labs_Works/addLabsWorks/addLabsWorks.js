import React from "react";
import { useState } from "react";
import Button from "../../../../common/buttons/Button";
import RedClose from "../../../../icons/Red-Close";
import { useFormik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { addLabWorks } from "../../../../../api/settings/LabsWorks/labsWorks";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import InputBox from "../../../../common/input/InputBox";

const initialValues = { items: [{ name: "" }] };

const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
    })
  ),
});

const AddLabsWorks = ({ handleClose, getAllLabWorkData }) => {
  const [loading, setLoading] = useState(false);

  /** Adding New row */
  const addRow = () => {
    formik.setValues({
      ...formik.values,
      items: [...formik.values.items, { name: "" }],
    });
  };

  /** Removing row using index */
  const removeRow = (index) => {
    const updatedItems = [...formik.values.items];
    updatedItems.splice(index, 1);
    formik.setValues({
      ...formik.values,
      items: updatedItems,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      addLabWorks(values.items)
        .then((response) => {
          showSuccessToast("LabWorks Added Successfully");
          getAllLabWorkData();
          handleClose();
        })
        .catch((error) => {
          console.log(error);
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoading(false);
        });
      console.log(values, "05");
    },
  });

  return (
    <div className="lg:w-[650px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="lg:pl-[79px] lg:pr-[79px] lg:mb-[40px]">
          <div className="grid grid-flow-col grid-cols-8">
            <label className="text-darkgrey text-bodyRB mb-2 col-span-4">
              Lab Work Name{" "}
            </label>
          </div>
          {formik.values.items.map((item, index) => {
            return (
              <div
                key={index}
                className={`grid grid-flow-col-dense grid-cols-8 gap-5 w-full mt-2 mb-2 items-center ${
                  formik.errors.items?.[index]?.name ? "mb-5" : ""
                }`}
              >
                <div className="grid grid-flow-row col-span-4 lg:col-span-6">
                  <InputBox
                    type="text"
                    placeholder="Enter Name"
                    className="rounded-15 border-2 w-full pl-4 h-[54px] text-darkgrey text-bodyRB"
                    name={`items.${index}.name`}
                    value={item.name}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.items?.[index]?.name &&
                      formik.errors.items?.[index]?.name
                    }
                  />
                </div>
                <div
                  onClick={() => removeRow(index)}
                  className=" grid place-content-center cursor-pointer"
                >
                  <RedClose />
                </div>
                <div className="w-full  col-span-2">
                  {index === formik.values.items.length - 1 && (
                    <Button
                      type={"secondary"}
                      onClick={addRow}
                      className="!w-[114px] h-[50px]  text-bodyBB"
                    >
                      Add Row
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-4 gap-2 place-content-center mt-5 lg:mt-0">
          <div className="lg:col-start-2">
            <Button
              action={"button"}
              type={"secondary"}
              className={"text-heading2B"}
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
          <Button
            loading={loading}
            type={"primary"}
            className={"text-heading2B"}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLabsWorks;
