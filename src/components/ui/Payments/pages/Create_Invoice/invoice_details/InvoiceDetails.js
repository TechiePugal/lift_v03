import React from "react";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import Status from "../../../../../common/status/Status";

const InvoiceDetails = () => {
  return (
    <div className="shadow-card rounded-15 pb-4">
      <div
        className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-5 text-bodyBB text-darkgrey mb-4`}
      >
        Invoice Details
      </div>
      <div>
        <div className="grid lg:grid-cols-3 p-1 lg:justify-items-center  ">
          <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 lg:items-center">
            <div className="text-bodyLB text-darkgrey">Invoice Number</div>
            <div>0234567</div>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:items-center">
            <div className="text-bodyLB text-darkgrey">Invoice Date</div>
            <div className="col-span-2 min-w-max">
              <DatePicker />
            </div>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:items-center">
            <div className="text-bodyLB text-darkgrey">Status</div>
            <div className="col-span-2">
              <Status type={"completed"}>Paid</Status>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
