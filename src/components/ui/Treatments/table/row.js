import React, { useState } from "react";
import Button from "../../../common/buttons/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RowItems = ({ treatment, index }) => {
  const [showTreatments, setShowTreatments] = useState(null);
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const handleShowTreatments = (index) => {
    setShowTreatments(index);
  };
  return (
    <>
      <td>
        <UserDetail text={treatment?.sno} />
      </td>
      <td>
        <Link to={`/patient_profile?id=${treatment.patient_id}`}>
          <UserDetail
            className={"text-primary underline cursor-pointer"}
            text={hospitalInfo?.patientId_prefix + treatment.patientId}
          />
        </Link>
      </td>
      <td>
        <UserDetail text={treatment.name} />
      </td>
      <td>
        <UserDetail text={treatment.phone} />
      </td>
      <td>
        <UserDetail text={treatment.treatment} />
      </td>
      <td>
        <UserDetail text={treatment.doctor} />
      </td>
      <td className="pr-2">
        {treatment?.currentTreatmentId ? (
          <Link
            to={`/edit_treatment_details?id=${treatment?.currentTreatmentId}&edit=true`}
          >
            <Button className={"bg-danger text-white h-[44px] text-bodySRB"}>
              Edit
            </Button>
          </Link>
        ) : (
          <Link to={`/treatment_details?id=${treatment?.appointment_id}`}>
            <Button className={"bg-[#6AB483] text-white h-[44px] text-bodySRB"}>
              Add
            </Button>
          </Link>
        )}
      </td>
    </>
  );
};

function UserDetail({ text, className, onCLick, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onCLick}
      onMouseLeave={onMouseLeave}
      className={` ${className} py-4`}
    >
      <p className="text-bodySRB">{text}</p>
    </div>
  );
}

export default RowItems;
