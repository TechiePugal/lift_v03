import React, { useEffect, useState } from "react";
import Button from "../../../../../common/buttons/Button";
import ModalWrapper from "../../../../../common/modal/ModalWrapper";
import InputBox from "../../../../../common/input/InputBox";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import SelectionInput from "../../../../../common/input/Select";
import PaymentInfo from "../payment_info/PaymentInfo";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../../utils/toaster";
import {
  payPendingInvoice,
  updatePaymentIn,
} from "../../../../../../api/Payment";
import { displayDate, formatDate } from "../../../../../../utils/date";
const validationSchema = Yup.object().shape({
  paymentIn: Yup.object().shape({
    date: Yup.string().required("Payment date is required"),
    cash: Yup.number().required("required"),
    upi: Yup.number().required("required"),
    card: Yup.number().required("required"),
    bankTransfer: Yup.number().required("required"),
    amountPaid: Yup.number().required("required"),
    notes: Yup.string().notRequired(),
  }),
});
const PendingInvoices = ({
  pendingInvoices,
  getpendingInvoices,
  patientId,
}) => {
  const [open, setOpen] = useState(false);
  const [editInfo, setEditInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const modalHandler = (params) => {
    setOpen(!open);
    setEditInfo(params);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      total_amount: editInfo?.total_amount || 0,
      discount: editInfo?.discount || 0,
      balance: editInfo?.balance || 0,
      paymentIn: {
        date: selectedDate,
        cash: 0,
        upi: 0,
        card: 0,
        bankTransfer: 0,
        amountPaid: 0,
        notes: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      // Check if the balance is less than 0
      if (values.balance < 0) {
        // Display an error or take appropriate action
        console.error("Balance cannot be negative.");
             showErrorToast({customError:"Balance cannot be negative."});
        return;
      }
      const payload = {
        invoiceId: editInfo?._id,
        SI_NO: editInfo?.SI_NO,
        date: formatDate(values.paymentIn.date),
        cash: values.paymentIn.cash,
        upi: values.paymentIn.upi,
        bankTransfer: values.paymentIn.bankTransfer,
        card: values.paymentIn.card,
        amountPaid: values.paymentIn.amountPaid,
        notes: values.paymentIn.notes,
      };
      setLoading(true);
      payPendingInvoice(payload, editInfo._id)
        .then(() => {
          showSuccessToast("Pending Invoice Updated");
          getpendingInvoices(patientId);
          modalHandler();
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  const handleCustomSubmit = () => {
    // Manually call formik.handleSubmit to submit the form
    formik.handleSubmit();
  };

  const handleDiscountChange = (event) => {
    const totalAmount = editInfo?.total_amount;
    const appliedDiscount = formik.values?.discount || 0;
    const discountedTotal = totalAmount - appliedDiscount;
    const amountPaid = formik.values?.paymentIn?.amountPaid;

    // Calculate amountPaid and balance based on the discount and existing balance
    const balance = discountedTotal;

    // Update Formik values
    formik.setFieldValue("total_amount", totalAmount);
  };

  useEffect(() => {
    handleDiscountChange();
  }, [formik.values.discount]);

  /** For calculation of Balance amount */

  const calculateBalance = async () => {
    try {
      const amountPaid =
        editInfo?.totalAmountPaid + formik.values?.paymentIn?.amountPaid;
      // Calculate the total amount whenever any of the inputs change
      const newBalance = formik?.values?.total_amount - amountPaid;
      console.log(formik?.values, {amountPaid});
      formik.setFieldValue("balance", newBalance);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    calculateBalance();
  }, [formik.values.total_amount, formik.values.paymentIn]);

  /** calculation of Balance amount end */

  return (
    <div>
      <div className="min-h-full shadow-card rounded-15  ">
        <div
          className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 text-bodyBB text-darkgrey mb-2`}
        >
          Pending Invoices
        </div>
        <div className="overflow-x-auto lg:max-h-[300px] overflow-y-auto ">
          
        <table className=" w-screen md:w-full  border-separate border-spacing-y-1 min-w-max  ">
          <thead className="">
            <tr>
              <th className="border-b pb-2 text-bodyBB text-darkgrey h-[50px]">
                Inv No.
              </th>
              <th className="border-b pb-2 text-bodyBB text-darkgrey h-[50px]">
                Date
              </th>
              <th className="border-b pb-2 text-bodyBB text-darkgrey">
                Treatment
              </th>
              <th className="border-b pb-2 text-bodyBB text-darkgrey">
                Balance
              </th>
              <th className="border-b pb-2 text-bodyBB text-darkgrey">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {pendingInvoices.map((invoice, index) => {
              return (
                <tr className="" key={index}>
                  <td className="text-center  text-bodyRB text-darkgrey">
                    {invoice.SI_NO || "-"}
                  </td>
                  <td className="text-center  text-bodyRB text-darkgrey">
                    {displayDate(invoice.date) || "-"}
                  </td>
                  <td className="text-center  text-bodyRB text-darkgrey">
                    {invoice?.treatment_done_info?.[0]?.name || "-"}
                  </td>
                  <td className="text-center  text-bodyRB text-darkgrey">
                    {invoice.balance || "-"}
                  </td>
                  <td className="text-center p-2 text-bodyRB text-darkgrey ">
                    <Button
                      onClick={() => modalHandler(invoice)}
                      type={"danger"}
                      className={"!py-[5px] "}
                      action={"button"}
                    >
                      Pay
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
      <ModalWrapper
        title={"Pay Pending Invoice"}
        open={open}
        handleClose={modalHandler}
      >
        <div className="md:w-[500px] lg:w-[1000px]">
          <div className="lg:flex justify-between">
            <div className="lg:flex gap-11">
              <div>
                <dl>
                  <div class="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                    <dt class="text-bodyBB text-darkgrey">Invoice No. </dt>
                    <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                      {editInfo?.SI_NO || "-"}
                    </dd>
                  </div>
                  <div class="bg-white px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                    <dt class="text-bodyBB text-darkgrey">Services</dt>
                    <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                      {editInfo?.treatment_done_info
                        ?.map((item) => item?.name)
                        .join(", ") || "-"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div>
              <div>
                <dl>
                  <div class=" px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                    <dt class="text-bodyBB text-darkgrey">Invoice Date</dt>
                    <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                      {formatDate(editInfo?.date) || "-"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <PaymentInfo
            formik={formik}
            details={{ oldTotalPayment: 0 }}
            discount={false}
          />
          <div className="grid grid-cols-2 ">
            <div className="grid grid-cols-2 gap-3 mt-3 col-start-2">
              <div>
                <Button
                  action={"button"}
                  onClick={modalHandler}
                  type={"secondary"}
                >
                  Cancel
                </Button>
              </div>
              <div>
                <Button
                  loading={loading}
                  onClick={handleCustomSubmit}
                  action={"button"}
                  type={"primary"}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default PendingInvoices;
