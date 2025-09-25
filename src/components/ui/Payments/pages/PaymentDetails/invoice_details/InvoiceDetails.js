import React, { useEffect, useState } from "react";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import Status from "../../../../../common/status/Status";
import { formatDateToString } from "../../../../../../utils/date";
import dayjs from "dayjs";

const InvoiceDetails = ({ details, formik, edit, status }) => {
  return (
    <div className="shadow-card rounded-15 pb-4">
      <div
        className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 text-bodyBB text-darkgrey mb-1`}
      >
        Invoice Details
      </div>
      <div>
        <div className="grid lg:grid-cols-3 p-1 lg:justify-items-center  ">
          <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 lg:items-center">
            <div className="text-bodyLB text-darkgrey">Invoice Number</div>
            <div>{details.SI_NO}</div>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:items-center">
            <div className="text-bodyLB text-darkgrey">Invoice Date</div>
            <div className="col-span-2 min-w-max">
              <DatePicker
                startDate={
                  new Date(dayjs(formik.values.date).format("YYYY-MM-DD"))
                }
                onDateChange={(e) => formik.setFieldValue("date", e)}
                error={formik?.touched?.date && formik?.errors?.date}
                disabled={!edit}
              />
            </div>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:items-center">
            <div className="text-bodyLB text-darkgrey">Status</div>
            <div className="col-span-2">
              <Status
                type={
                  status === "Pending"
                    ? "upcoming"
                    : status === "Partially-Paid"
                    ? "checked-in"
                    : ["Paid", "Free Visit"].includes(status)
                    ? "completed"
                    : "upcoming" // Default type if none of the above conditions match
                }
              >
                {status}
              </Status>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
