import React, { useEffect } from "react";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import InputBox from "../../../../../common/input/InputBox";
import TextAreaBox from "../../../../../common/input/TextAreaBox";

const PaymentInfo = ({ formik, details, discount=true }) => {

  // Function to calculate amountPaid, balance, and apply discount
  const calculateAmounts = (
    cashValue,
    cardValue,
    upiValue,
    bankTransferValue,
    totalAmount,
    existingAmountPaid,
    discount
  ) => {
    const appliedDiscount = discount || 0;
    const discountedTotal = totalAmount - appliedDiscount;
    const amountPaid =
      cashValue + cardValue + upiValue + bankTransferValue + existingAmountPaid;
    const balance = discountedTotal - amountPaid;
    return { amountPaid, balance, appliedDiscount };
  };

  // Assuming this is part of your component or form
  // ...
  const handlePaymentChange = (paymentType, e) => {
    // Get current values from formik
    const cashValue = formik.values.paymentIn.cash || 0;
    const cardValue = formik.values.paymentIn.card || 0;
    const upiValue = formik.values.paymentIn.upi || 0;
    const bankTransferValue = formik.values.paymentIn.bankTransfer || 0;
    const totalAmount = formik.values.total_amount;
    const existingAmountPaid = details?.oldTotalPayment || 0;
    const discount = formik.values.discount || 0;

    // Store the updated value in a temporary variable
    const updatedValue = parseFloat(e.target.value) || null;

    // Update the specific payment type value
    formik.setFieldValue(
      `paymentIn.${paymentType}`,
      parseFloat(e.target.value)
    );

    // Calculate new amountPaid, balance, and applied discount
    const { amountPaid, balance, appliedDiscount } = calculateAmounts(
      paymentType === "cash" ? updatedValue : cashValue,
      paymentType === "card" ? updatedValue : cardValue,
      paymentType === "upi" ? updatedValue : upiValue,
      paymentType === "bankTransfer" ? updatedValue : bankTransferValue,
      totalAmount,
      existingAmountPaid,
      discount
    );

    // Update formik values
    formik.setFieldValue("paymentIn.amountPaid", amountPaid);
  };

  const handleDiscountChange = (event) => {
    const discount = parseFloat(event.target.value) || null; // Parse the discount as a float, default to 0 if not a valid number
    const totalAmount = formik.values.total_amount;
    const appliedDiscount = discount || 0;
    const discountedTotal = totalAmount - appliedDiscount;
    const amountPaid = formik.values.paymentIn.amountPaid;

    // Calculate amountPaid and balance based on the discount and existing balance
    const balance = discountedTotal - amountPaid;

    // Update Formik values
    formik.setFieldValue("discount", discount);
  };

  // ...

  return (
    <div className="shadow-card rounded-15">
      <div
        className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-2 pl-4 text-bodyBB text-darkgrey mb-2 grid gap-2 md:grid-cols-2 lg:grid-cols-3 items-center `}
      >
        <div>Payment Info</div>
        <div className=" lg:col-start-4">
          <DatePicker
            className={"!h-[40px] !w-[260px] text-bodyRB"}
            startDate={formik.values?.paymentIn?.date}
            onDateChange={(e) => {
              formik.setFieldValue("paymentIn.date", e);
            }}
            error={
              formik.touched?.paymentIn?.date && formik.errors?.paymentIn?.date
            }
          />
        </div>
      </div>
      <div className="lg:flex  justify-around p-5">
        <div className="grid lg:grid-cols-2 gap-3 mr-3">
          <div>
            <p className="text-bodySB text-darkgrey pb-1">Cash</p>
            <InputBox
              type={"number"}
              name={`paymentIn.cash`}
              value={formik.values.paymentIn.cash}
              onChange={(e) => {
                formik.handleChange(e);
                handlePaymentChange("cash", e);
              }}
              error={
                formik.touched.paymentIn?.cash && formik.errors.paymentIn?.cash
              }
            />
          </div>
          <div>
            <p className="text-bodySB text-darkgrey pb-1">Card</p>
            <InputBox
              type={"number"}
              name={`paymentIn.card`}
              value={formik.values.paymentIn.card}
              onChange={(e) => {
                formik.handleChange(e);
                handlePaymentChange("card", e);
              }}
              error={
                formik.touched.paymentIn?.card && formik.errors.paymentIn?.card
              }
            />
          </div>
          <div>
            <p className="text-bodySB text-darkgrey pb-1">UPI</p>
            <InputBox
              type={"number"}
              name={`paymentIn.upi`}
              value={formik.values.paymentIn.upi}
              onChange={(e) => {
                formik.handleChange(e);
                handlePaymentChange("upi", e);
              }}
              error={
                formik.touched.paymentIn?.upi && formik.errors.paymentIn?.upi
              }
            />
          </div>
          <div className="">
            <p className="text-bodySB text-darkgrey pb-1">Bank Transfer</p>
            <InputBox
              type={"number"}
              name={`paymentIn.bankTransfer`}
              value={formik.values.paymentIn.bankTransfer}
              onChange={(e) => {
                formik.handleChange(e);
                handlePaymentChange("bankTransfer", e);
              }}
              error={
                formik.touched.paymentIn?.bankTransfer &&
                formik.errors.paymentIn?.bankTransfer
              }
            />
          </div>
          <div className="lg:col-span-2">
            <p className="text-bodySB text-darkgrey pb-1">Notes</p>
            <TextAreaBox
              className={""}
              name={`paymentIn.notes`}
              value={formik.values.paymentIn.notes}
              onChange={formik.handleChange}
              error={
                formik.touched.paymentIn?.notes &&
                formik.errors.paymentIn?.notes
              }
            />
          </div>
        </div>

        <div className="border-r-2 border-[#B9B9B9] hidden lg:block w-5"></div>
        <div className="border-b-2 border-[#B9B9B9] block lg:hidden mt-2 mb-2"></div>
        {/*  */}
        <div className="grid lg:grid-cols-2 gap-3 h-fit ml-3">
          {discount && 
          <div>
            <p className="text-bodySB text-darkgrey pb-1">Discount</p>
            <InputBox
              type={"number"}
              name={`discount`}
              value={formik.values.discount}
              onChange={handleDiscountChange}
              error={formik.touched.discount && formik.errors.discount}
            />
          </div>
          }
          <div>
            <p className="text-bodyBB mt-1 text-darkgrey pb-1">Total Amount</p>
            <InputBox
              type={"number"}
              name={`total_amount`}
              className={"!h-[42px]"}
              value={formik.values.total_amount}
              onChange={formik.handleChange}
              error={formik.touched.total_amount && formik.errors.total_amount}
              disabled={true}
            />
          </div>
          <div>
            <p className="text-bodySB text-darkgrey pb-1">Amount Paid</p>
            <InputBox
              className={"bg-[#6AB483] bg-opacity-[20%]"}
              type={"number"}
              name={`paymentIn.amountPaid`}
              value={formik.values.paymentIn.amountPaid}
              onChange={formik.handleChange}
              error={
                formik.touched.paymentIn?.amountPaid &&
                formik.errors.paymentIn?.amountPaid
              }
              disabled={true}
            />
          </div>
          <div>
            <p className="text-bodySB text-darkgrey pb-1 ">Balance Amount</p>
            <InputBox
              className={"bg-[#E45353] bg-opacity-[20%]"}
              type={"number"}
              name={`balance`}
              value={formik.values.balance}
              onChange={formik.handleChange}
              error={formik.touched.balance && formik.errors.balance}
              disabled={true}
            />
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
