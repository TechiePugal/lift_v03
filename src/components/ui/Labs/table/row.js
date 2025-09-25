import React, { useState } from "react";
import RowLayout from "../../../common/table/RowLayout";
import Button from "../../../common/buttons/Button";
import Status from "../../../common/status/Status";
import { Link, useNavigate } from "react-router-dom";
import { displayDate, formatDate } from "../../../../utils/date";
import { useSelector } from "react-redux";

const RowItems = ({ lab, index }) => {
  const navigate = useNavigate();
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const handleRoute = () => {
    navigate(`/lab_order_details/?id=${lab._id}`);
  };
  const handlePatientIdClick = (e, id) => {
    e.stopPropagation();
    navigate(`/patient_profile?id=${id}`);
  };
  return (
    <RowLayout onClick={handleRoute} key={index}>
      {/* <td>
        <UserDetail
          text={lab?.sno || "-"}
          className={"col-span-2 min-w-[50px] text-center"}
        />
      </td> */}
      <td>
        <UserDetail
          text={lab.SI_NO || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>
      <td>
        <div onClick={(e) => handlePatientIdClick(e, lab.patient_id?._id)}>
          <UserDetail
            text={
              hospitalInfo?.patientId_prefix + lab.patient_id.patient_id || "-"
            }
            className={
              "col-span-1 text-center !text-primary underline cursor-pointer"
            }
          />
        </div>
      </td>
      <td>
        <UserDetail
          text={lab.patient_id.name || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>
      <td>
        <UserDetail
          text={lab.patient_id.phone || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>
      <td>
        <UserDetail
          text={lab.lab || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>
      <td>
        <UserDetail
          text={lab.work_type || "-"}
          className={"col-span-2 min-w-[70px]  "}
        />
      </td>
      <td>
        <UserDetail
          text={displayDate(lab.order_date) || "-"}
          className={"col-span-2 min-w-[70px]  "}
        />
      </td>
      <td>
        <UserDetail
          text={displayDate(lab.arrival_date) || "-"}
          className={"col-span-2 min-w-[70px]  "}
        />
      </td>
      <td>
        <UserDetail
          text={displayDate(lab.fixing_date) || "-"}
          className={"col-span-2 min-w-[70px]  "}
        />
      </td>
      <td className=" pr-2 h-[60px] w-[100px]">
        <div className="">
          <Status
            type={
              lab?.status === "Ordered"
                ? "upcoming"
                : lab?.status === "Arrived"
                ? "checked-in"
                : lab?.status === "Fixed"
                ? "completed"
                : "completed" // Default type if none of the above conditions match
            }
            className="text-bodySRB py-[10px]"
          >
            {lab.status || "-"}
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
      <p className="text-bodySRB  min-w-max">{text}</p>
    </div>
  );
}

export default RowItems;
