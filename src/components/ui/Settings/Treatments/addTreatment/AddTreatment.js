import { useState } from "react";
import Button from "../../../../common/buttons/Button";
import RedClose from "../../../../icons/Red-Close";
import { useFormik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { addTreatments } from "../../../../../api/settings/Treatment/treatment";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";

const initialValues = { items: [{ name: "", charges: 0 }] };

const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      charges: Yup.number()
        .typeError("Charges must be a number")
        .required("Charges is required")
        .min(0, "Charges must be greater than or equal to 0"),
    })
  ),
});

const AddTreatment = ({ getTreatments, handleClose }) => {
  const [loading, setLoading] = useState(false);

  /** Adding New row */
  const addRow = () => {
    formik.setValues({
      ...formik.values,
      items: [...formik.values.items, { name: "", charges: 0 }],
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
      addTreatments(values.items)
        .then((response) => {
          showSuccessToast("Treatment Added Successfully");
          getTreatments();
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
    <div className="lg:w-[701px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="lg:pl-[79px] lg:pr-[79px] lg:mb-[40px]">
          <div className="grid grid-flow-col grid-cols-8">
            <label className="text-darkgrey text-bodyRB mb-2 col-span-4">
              Treatment Name
            </label>
            <label className="text-darkgrey text-bodyRB mb-2">Charges</label>
          </div>

          {/* Maping the rows */}
          {formik.values.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-flow-col-dense grid-cols-8 gap-5 w-full mt-2 mb-2 items-center"
            >
              <div className="grid grid-flow-row col-span-4">
                <input
                  type="text"
                  name={`items.${index}.name`}
                  value={item.name}
                  onChange={formik.handleChange}
                  placeholder="Enter Treatment Name"
                  className="rounded-15 border-2 w-full pl-4 h-[54px] text-darkgrey text-bodyRB"
                />

                {/* Validation errors */}
                {formik.touched.items?.[index]?.name &&
                  formik.errors.items?.[index]?.name && (
                    <p className="text-danger text-smallLB mx-2 my-0.5">
                      {formik.errors.items[index].name}
                    </p>
                  )}
              </div>
              <div className="grid grid-flow-row col-span-2">
                <input
                  type="number"
                  name={`items.${index}.charges`}
                  value={item.charges}
                  onChange={formik.handleChange}
                  placeholder="Enter Price"
                  className="rounded-15 border-2 pl-4 pr-1 w-full h-[54px] text-darkgrey text-bodyRB"
                />

                {/* Validation errors */}
                {formik.touched.items?.[index]?.charges &&
                  formik.errors.items?.[index]?.charges && (
                    <p className="text-danger text-smallLB mx-2 my-0.5">
                      {formik.errors.items[index].charges}
                    </p>
                  )}
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
                    className="!w-[114px] h-[50px] text-bodyBB"
                  >
                    Add Row
                  </Button>
                )}
              </div>
            </div>
          ))}
          {/* Maping end */}
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-5 place-content-center mt-5 lg:mt-0 lg:pl-[79px] lg:pr-[79px]">
          <Button
            onClick={handleClose}
            type={"secondary"}
            className={"text-heading2B"}
          >
            Close
          </Button>
          <Button
            type={"primary"}
            className={"text-heading2B"}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTreatment;
