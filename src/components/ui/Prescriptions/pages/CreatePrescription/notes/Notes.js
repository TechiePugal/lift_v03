import React from "react";
import TextAreaBox from "../../../../../common/input/TextAreaBox";

const Notes = ({formik}) => {
  return (
    <div className="shadow-card rounded-15 pb-4">
      <div
        className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 text-bodyBB text-darkgrey mb-4 sticky left-0`}
      >
        Notes
      </div>
      <div className="p-2">
        <TextAreaBox
          placeholder={"Enter Notes"}
          error={formik.touched.notes && formik.errors.notes}
          name={"notes"}
          onChange={formik.handleChange}
        />
      </div>
    </div>
  );
};

export default Notes;
