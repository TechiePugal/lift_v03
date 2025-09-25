import React, { useState } from "react";
import RowLayout from "../../../common/table/RowLayout";
import Button from "../../../common/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RowItems = ({ prescription, index }) => {
  const navigate = useNavigate();
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const handleRoute = () => {
    navigate(`/prescription_details/?id=${prescription._id}`);
  };
  const handleIdClick = (e, id) => {
    e.stopPropagation();
    navigate(`/patient_profile?id=${id}`);
  };
  return (
    <RowLayout onClick={handleRoute} key={index}>
      <td className="h-14">
        <UserDetail text={prescription?.sno} />
      </td>
      <td>
        <UserDetail
          text={prescription?.prescId}
          className={" min-w-[100px] text-center"}
        />
      </td>
      <td>
        <UserDetail text={prescription.date} className={""} />
      </td>
      <td>
        <div onClick={(e) => handleIdClick(e, prescription.patient_id)}>
          <UserDetail
            className={"text-primary underline cursor-pointer"}
            text={hospitalInfo?.patientId_prefix + prescription.patientId}
          />
        </div>
        {/* <UserDetail text={prescription.patient_id.patient_id} className={""} /> */}
      </td>
      <td>
        <UserDetail
          text={prescription.name}
          className={" min-w-[150px] text-center"}
        />
      </td>
      <td>
        <UserDetail
          text={prescription.phone}
          className={" min-w-[50px] text-center"}
        />
      </td>
      <td>
        <Button className={"!py-[7px]"} type={"primary"}>
          View
        </Button>
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
      className={` ${className} text-darkgrey `}
    >
      <p className="text-bodySRB min-w-max">{text}</p>
    </div>
  );
}

export default RowItems;
