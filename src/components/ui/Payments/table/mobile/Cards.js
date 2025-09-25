import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Status from "../../../../common/status/Status";
import { ListCard, ListItem } from "../../../../common/card/list-card/ListCard";

const Cards = ({ invoices, columns }) => {
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  const getColumnValue = (invoice, column) => {
    switch (column) {
      case "Invoice No":
        return invoice.invoice_no;
      case "Date":
        return invoice.date || "-";
      case "PIN":
        return (
          <Link to={`/patient_profile?id=${invoice.patient_id}`}>
            <div className={"text-primary underline cursor-pointer"}>
              {hospitalInfo?.patientId_prefix + invoice?.patientId || "-"}
            </div>
          </Link>
        );
      case "Patient Name":
        return invoice.patientName;
      case "Treatment":
        return invoice.treatment || "0";
      case "Total Amount":
        return invoice.totalAmount || "0";
      case "Amount Paid":
        return invoice.amountPaid || "0";
      case "Balance":
        return invoice.balance;
      case "Status":
        return (
          <div className="">
            <Status
              type={
                invoice?.status === "Upcoming"
                  ? "upcoming"
                  : invoice?.status === "Partially-Paid"
                  ? "checked-in"
                  : ["Free Visit"].includes(invoice?.status)
                  ? "purple"
                  : invoice.status === "Paid"
                  ? "completed"
                  : "upcoming" // Default type if none of the above conditions match
              }
              // className="text-bodySRB py-[10px]"
              className="text-smallBB !py-[8px]"
            >
              {invoice?.status || "-"}
            </Status>
          </div>
        );
      default:
        // Handle the case when the column is not recognized
        console.error(`Unknown column: ${column}`);
        return "";
    }
  };
  return (
    <div>
      {invoices?.map((invoice, index) => (
        <div key={index} className="cursor-pointer">
          <Link to={`/payment_details?id=${invoice._id}`}>
            <ListCard>
              {columns.map((column, columnIndex) => (
                <ListItem
                  key={columnIndex}
                  title={column}
                  value={getColumnValue(invoice, column)}
                />
              ))}
            </ListCard>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
