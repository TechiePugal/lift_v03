import React, { useState } from "react";
import Status from "../../../../../common/status/Status";
import Button from "../../../../../common/buttons/Button";
import ModalWrapper from "../../../../../common/modal/ModalWrapper";
import CreateInvoiceLayout from "../../../../Payments/pages/Create_Invoice/CreateInvoice";
import PaymentDetailsPage from "../../../../../../pages/Payments/PaymentDetails/PaymentDetailsPage";

const Payments = ({ invoices, patientProfile, getInvoiceData }) => {
  const [open, setOpen] = useState(false);
  const [view, setview] = useState(false);
  const [editData, setEditData] = useState("");

  const handleView = (params, apiCall) => {
    setview(!view);
    setEditData(params);
    if (apiCall) {
      getInvoiceData();
    }
  };

  const handleCreateClick = (apiCall) => {
    if (apiCall) {
      getInvoiceData();
    }
    setOpen(!open);
  };
  return (
    <div>
      <div className="">
        <div className="shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 flex flex-wrap gap-2 justify-between items-center mb-1">
          <h1 className="text-bodyBB text-darkgrey">Payments</h1>
          <div className="lg:w-[200px] w-full">
            <Button
              type={"primary"}
              className={"py-[8px] lg:py-[10px] text-bodyBB"}
              onClick={() => handleCreateClick(false)}
            >
              Add Invoice
            </Button>
          </div>
        </div>
        {invoices.length > 0 && (
          <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px]  max-h-[350px] overflow-auto">
            <div className="">
              <table className="w-full border-separate border-spacing-y-2 pl-2 pr-2 min-w-max ">
                <thead className="border-b sticky top-0 bg-white">
                  <tr className="text-bodyBB text-darkgrey text-center">
                    <th className="p-2 border-b-2">Invoice #</th>
                    <th className=" border-b-2">Invoice Date</th>
                    <th className=" border-b-2">Service / Treatment</th>
                    <th className=" border-b-2"> Payment Mode</th>
                    <th className=" border-b-2">Amount</th>
                    <th className=" border-b-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices?.map((invoice, index) => {
                    return (
                      <>
                        <tr
                          key={index}
                          onClick={() => handleView(invoice)}
                          className="text-center h-[55px] text-bodyRB text-darkgrey cursor-pointer"
                        >
                          <td className="border-b-2">
                            {invoice?.invoice_no || "-"}
                          </td>
                          <td className="border-b-2">{invoice?.date || "-"}</td>
                          <td className="border-b-2 ">
                            {invoice?.treatment || "-"}
                          </td>

                          <td className="border-b-2">
                            {invoice?.paymentMode || "-"}
                          </td>
                          <td className="border-b-2">
                            {invoice?.amount || "-"}
                          </td>
                          <td className="border-b-2">
                            <Status
                              type={
                                invoice?.status === "Upcoming"
                                  ? "upcoming"
                                  : invoice?.status === "Partially-Paid"
                                  ? "checked-in"
                                  : ["Paid", "Free Visit"].includes(
                                      invoice?.status
                                    )
                                  ? "completed"
                                  : "upcoming" // Default type if none of the above conditions match
                              }
                              // className="text-bodySRB py-[10px]"
                              className="text-smallRB !py-[12px]"
                            >
                              {invoice?.status || "-"}
                            </Status>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ModalWrapper
        open={open}
        handleClose={handleCreateClick}
        title={"Add Invoice"}
      >
        <div className="lg:w-[90vw]">
          <CreateInvoiceLayout
            patientProfileData={patientProfile}
            callBack={handleCreateClick}
            hideSearch={true}
          />
        </div>
      </ModalWrapper>
      <ModalWrapper open={view} handleClose={handleView} title={"View Invoice"}>
        <div className="md:min-w-[90vw]">
          <PaymentDetailsPage
            paymentId={editData?._id}
            viewOnly={true}
            handleView={handleView}
          />
        </div>
      </ModalWrapper>
    </div>
  );
};

export default Payments;
