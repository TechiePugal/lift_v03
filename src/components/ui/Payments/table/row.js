import React, { useState } from "react";
import RowLayout from "../../../common/table/RowLayout";
import Button from "../../../common/buttons/Button";
import Status from "../../../common/status/Status";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RowItems = ({ invoice, index }) => {
  const navigate = useNavigate();
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const handleRoute = () => {
    navigate(`/payment_details?id=${invoice._id}`);
  };
  const handleIdClick = (e, id) => {
    e.stopPropagation();
    navigate(`/patient_profile?id=${id}`);
  };
  return (
    <RowLayout onClick={handleRoute} key={index}>
      <td>
        <UserDetail
          text={invoice?.invoice_no || "-"}
          className={" min-w-[50px] text-center"}
        />
      </td>
      <td>
        <UserDetail text={invoice.date || "-"} className={""} />
      </td>
      <td
        className="w-[100px]"
        onClick={(e) => handleIdClick(e, invoice.patient_id)}
      >
        <UserDetail
          text={
            hospitalInfo?.patientId_prefix + invoice?.patientId || "-"
          }
          className={"!text-primary underline cursor-pointer"}
        />
      </td>
      <td>
        <UserDetail
          text={invoice?.patientName || "-"}
          className={" min-w-[150px] text-center"}
        />
      </td>
      <td className=" max-w-[170px]">
        <UserDetail
          text={invoice?.treatment || "-"}
          className={" min-w-[50px] "}
        />
      </td>
      <td>
        <UserDetail
          text={invoice.totalAmount || "0"}
          className={" min-w-[100px]  "}
        />
      </td>
      <td>
        <UserDetail
          text={invoice?.amountPaid || "0"}
          className={" min-w-[100px]  "}
        />
      </td>
      <td>
        <UserDetail
          text={invoice?.balance || "0"}
          className={" min-w-[100px]  "}
        />
      </td>
      {/* <td>
        <UserDetail
          text={invoice.paymentMode || "-"}
          className={" text-center"}
        />
      </td> */}
      <td className=" pr-2 h-[60px] w-[150px]">
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
            className="text-smallBB !py-[12px]"
          >
            {invoice?.status || "-"}
          </Status>
        </div>
      </td>
    </RowLayout>
  );
};

function UserDetail({ text, className, onCLick, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onCLick}
      onMouseLeave={onMouseLeave}
      className={` ${className} text-darkgrey`}
    >
      <p className="text-bodySRB   break-words">{text}</p>
    </div>
  );
}

export default RowItems;
