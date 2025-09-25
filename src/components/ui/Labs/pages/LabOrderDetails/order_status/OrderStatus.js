import React, { useEffect } from "react";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import SelectionInput from "../../../../../common/input/Select";
import FourquadrantBox from "../../../../../common/input/FourquadrantBox";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import Status from "../../../../../common/status/Status";
import { formatDateToString } from "../../../../../../utils/date";

const OrderStatus = ({ formik, changeStatus, editOrder }) => {
  const onDateChange = (e, item) => {
    if (
      (formik?.values?.order_date || item === "order_date") &&
      !formik?.values?.arrival_date &&
      !formik?.values?.fixing_date
    ) {
      formik.setFieldValue("status", "Ordered");
    }
    if (
      formik?.values?.order_date &&
      (formik?.values?.arrival_date || item === "arrival_date") &&
      !formik?.values?.fixing_date
    ) {
      formik.setFieldValue("status", "Arrived");
    }
    if (
      formik?.values?.order_date &&
      formik?.values?.arrival_date &&
      (formik?.values?.fixing_date || item === "fixing_date")
    ) {
      formik.setFieldValue("status", "Delivered");
    }
  };

  return (
    <div>
      <div className="w-full bg-secondary p-3  rounded-tl-15 rounded-tr-15 mb-2 flex items-center  pl-5">
        <h1 className="text-bodyBB text-darkgrey">Order Status</h1>
      </div>
      <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px] ">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 relative pl-3 pr-3 pb-5">
          <div className="w-full border absolute top-10"></div>
          <div className="">
            <p className="text-bodyBB text-darkgrey mb-8 pt-2">Order Date</p>
            <div className="">
              <DatePicker
                className={"!bg-[#E45353] !bg-opacity-[20%]"}
                onDateChange={(e) => {
                  formik.setFieldValue("order_date", e);
                  onDateChange(e, "order_date");
                  if (
                    new Date(formatDateToString(formik?.values?.order_date)) < e
                  ) {
                    formik.setFieldValue("arrival_date", "");
                    formik.setFieldValue("fixing_date", "");
                  }
                }}
                startDate={
                  formik?.values?.order_date &&
                  new Date(formatDateToString(formik?.values?.order_date))
                }
                error={formik.touched?.order_date && formik.errors.order_date}
                disabled={editOrder}
              />
            </div>
          </div>
          <div className="">
            <p className="text-bodyBB text-darkgrey mb-8 pt-2">Arrival Date</p>
            <div className="">
              <DatePicker
                className={"!bg-[#F2F496] !bg-opacity-[20%]"}
                onDateChange={(e) => {
                  formik.setFieldValue("arrival_date", e);
                  onDateChange(e, "arrival_date");
                  if (
                    new Date(formatDateToString(formik?.values?.fixing_date)) <
                    e
                  ) {
                    formik.setFieldValue("fixing_date", "");
                    formik.setFieldValue("status", "Arrived");
                  }
                }}
                minDate={
                  formik?.values?.order_date &&
                  new Date(formatDateToString(formik?.values?.order_date))
                }
                handleClear={() => {
                  formik.setFieldValue("arrival_date", "");
                  formik.setFieldValue("status", "Ordered");
                }}
                startDate={
                  formik?.values?.arrival_date &&
                  new Date(formatDateToString(formik?.values?.arrival_date))
                }
                error={
                  formik.touched?.arrival_date && formik.errors?.arrival_date
                }
                disabled={editOrder}
              />
            </div>
          </div>
          <div className="">
            <p className="text-bodyBB text-darkgrey mb-8 pt-2">Delivery Date</p>
            <div className="">
              <DatePicker
                className={"!bg-[#6AB483] !bg-opacity-[20%]"}
                onDateChange={(e) => {
                  formik.setFieldValue("fixing_date", e);
                  onDateChange(e, "fixing_date");
                }}
                minDate={
                  formik?.values?.arrival_date &&
                  new Date(formatDateToString(formik?.values?.arrival_date))
                }
                handleClear={() => {
                  formik.setFieldValue("fixing_date", "");
                  if (formik.values.arrival_date)
                    formik.setFieldValue("status", "Arrived");
                }}
                startDate={
                  formik?.values?.fixing_date &&
                  new Date(formatDateToString(formik?.values?.fixing_date))
                }
                error={
                  formik.touched?.fixing_date && formik.errors?.fixing_date
                }
                disabled={editOrder}
              />
            </div>
          </div>
          <div className="text-center ">
            <p className="text-bodyBB text-darkgrey mb-8 pt-2">Status</p>
            {changeStatus && (
              <div>
                <SelectionInput
                  className={"h-[54px]"}
                  placeholder={formik.values.status}
                  onChange={(e) => formik.setFieldValue("status", e)}
                  error={formik.touched?.status && formik.errors?.status}
                  disabled={editOrder}
                >
                  <div value="Ordered" className="">
                    Ordered
                  </div>
                  <div value="Arrived" className="">
                    Arrived
                  </div>
                  <div value="Fixed" className="">
                    Fixed
                  </div>
                </SelectionInput>
              </div>
            )}
            {!changeStatus && (
              <Status
                type={
                  formik.values?.status === "Ordered"
                    ? "upcoming"
                    : formik.values?.status === "Arrived"
                    ? "checked-in"
                    : formik.values?.status === "Delivered"
                    ? "completed"
                    : "completed" // Default type if none of the above conditions match
                }
                className="text-bodySBB h-[54px]"
              >
                {formik.values.status || "-"}
              </Status>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
