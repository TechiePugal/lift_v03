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
  deletePaymentIn,
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

const PaymentTransaction = ({
  pendingInvoices,
  edit,
  getpendingInvoices,
  status,
  totalAmount,
  getInvoiceDetails,
}) => {
  const [open, setOpen] = useState(false);
  const [editInfo, setEditInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleconfirmation = (props) => {
    setConfirmOpen(!confirmOpen);
  };

  const modalHandler = (params) => {
    setOpen(!open);
    setEditInfo(params);
    gettotalAmountPaidExcept(params?.invoiceId, params?._id);
  };

  const getBalance = (params) => {
    const balance = totalAmount - params;
    console.log({ params });
    setTotalBalance(balance);
  };

  const gettotalAmountPaidExcept = async (paymentin_Id, id) => {
    try {
      let data = pendingInvoices;
      if (paymentin_Id && data && Array.isArray(data) && data.length > 0) {
        const totalAmountPaid = data.reduce((total, item) => {
          if (item?.invoiceId === paymentin_Id && item?._id !== id) {
            return total + item?.amountPaid;
          }
          return total;
        }, 0);
        setTotalAmountPaid(totalAmountPaid);
        const balance = totalAmount - totalAmountPaid;
        setTotalBalance(balance);
      } else {
        setTotalAmountPaid(0);
      }
    } catch (error) {
      console.error("Error filter amount:", error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      total_amount: totalAmount || 0,
      discount: editInfo?.discount || 0,
      balance: totalBalance || 0,
      paymentIn: {
        date: selectedDate,
        cash: editInfo?.cash,
        upi: editInfo?.upi,
        card: editInfo?.card,
        bankTransfer: editInfo?.bankTransfer,
        amountPaid: editInfo?.amountPaid || 0,
        notes: editInfo?.notes,
      },
    },
    validationSchema,
    onSubmit: (values) => {
      // Check if the balance is less than 0
      if (values?.balance < 0) {
        // Display an error or take appropriate action
        console.error("Balance cannot be negative.");
        showErrorToast({ customError: "Balance cannot be negative." });
        return;
      }
      const payload = {
        _id: editInfo?._id,
        SI_NO: editInfo?.SI_NO,
        date: formatDate(values.paymentIn.date),
        cash: values.paymentIn.cash,
        upi: values.paymentIn.upi,
        bankTransfer: values.paymentIn.bankTransfer,
        card: values?.paymentIn?.card,
        amountPaid: values?.paymentIn?.amountPaid,
        notes: values?.paymentIn?.notes,
      };

      setLoading(true);
      updatePaymentIn(payload, editInfo._id)
        .then(() => {
          showSuccessToast("Pending Invoice Updated");
          modalHandler();
          getpendingInvoices();
          getInvoiceDetails();
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });

      console.log(payload, "05");
    },
  });
  const handleCustomSubmit = () => {
    // Manually call formik.handleSubmit to submit the form
    formik.handleSubmit();
  };

  const handleDelete = () => {
    deletePaymentIn(editInfo._id)
      .then((response) => {
        showSuccessToast("Deleted Successfully");
        getpendingInvoices();
        getInvoiceDetails();
        handleconfirmation();
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  /** For calculation of Balance amount */

  const calculateBalance = async () => {
    try {
      const amountPaid = formik.values?.paymentIn?.amountPaid;
      // Calculate the total amount whenever any of the inputs change
      const newBalance =
        formik.values.total_amount - totalAmountPaid - amountPaid;
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
      <div className=" ">
        <table className=" w-screen md:w-full  border-separate border-spacing-y-1 min-w-max  ">
          <thead className="">
            <tr>
              <th className="border-b pb-2 text-bodyBB text-darkgrey h-[50px]">
                Date
              </th>
              <th className="border-b pb-2 text-bodyBB text-darkgrey h-[50px]">
                Receipt No.
              </th>
              <th className="border-b pb-2 text-bodyBB text-darkgrey">Paid</th>

              {edit && (
                <th className="border-b pb-2 text-bodyBB text-darkgrey">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="">
            {pendingInvoices.map((invoice, index) => {
              return (
                <tr className="" key={index}>
                  <td className="text-center  text-bodyRB text-darkgrey">
                    {displayDate(invoice.date) || "-"}
                  </td>
                  <td className="text-center  text-bodyRB text-darkgrey">
                    {invoice.SI_NO || "-"}
                  </td>
                  <td className="text-center  text-bodyRB text-darkgrey">
                    {invoice.amountPaid || "-"}
                  </td>
                  {edit && (
                    <td className="text-center p-2 text-bodyRB text-darkgrey ">
                      <Button
                        onClick={() => modalHandler(invoice)}
                        type={"danger"}
                        action={"button"}
                        className={"!py-[5px] "}
                      >
                        Edit
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalWrapper
        title={"Transaction History"}
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
                    <dt class="text-bodyBB text-darkgrey">Treatments</dt>
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
            edit={true}
            details={editInfo}
            history={true}
          />
          <div className="grid grid-cols-2 ">
            <div className="grid col-span-2 md:col-span-1 md:grid-cols-3 gap-3 mt-3 ">
              <div>
                <Button
                  onClick={handleconfirmation}
                  action={"button"}
                  type={"danger"}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div className="grid md:col-start-2 grid-flow-col col-span-2 mt-3 gap-3">
              <div>
                <Button
                  onClick={modalHandler}
                  action={"button"}
                  type={"secondary"}
                >
                  Cancel
                </Button>
              </div>
              <div>
                <Button
                  action={"button"}
                  onClick={handleCustomSubmit}
                  type={"primary"}
                  loading={loading}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>

      {/* Confirmation */}
      <ModalWrapper open={confirmOpen} handleClose={handleconfirmation}>
        <div className="flex flex-col gap-10">
          <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
            Are you sure that you want to delete this paymentIn
            <span className="text-bodyBB pl-1 pr-1 text-darkgrey">
              {/* {editData?.name} */}
            </span>
            ?
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleconfirmation}
              type={"danger"}
              action={"button"}
              className={"text-heading2B"}
            >
              No
            </Button>
            <Button
              onClick={handleDelete}
              type={"yes"}
              action={"button"}
              className={"text-heading2B"}
            >
              Yes
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default PaymentTransaction;
