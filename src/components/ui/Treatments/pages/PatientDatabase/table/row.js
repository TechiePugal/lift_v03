import React, { useState } from "react";
import Button from "../../../../../common/buttons/Button";
import { displayDate, formatDate } from "../../../../../../utils/date";
import { useSelector } from "react-redux";


const RowItems = ({ index, patient }) => {
  const [showTreatments, setShowTreatments] = useState(null);
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  const handleShowTreatments = (index) => {
    setShowTreatments(index);
  };
  return (
    <>
      <td>
        <UserDetail text={patient?.sno} />
      </td>
      <td>
        <UserDetail text={displayDate(patient.createdAt)} />
      </td>
      <td>
        <UserDetail     className={
              " !text-primary underline cursor-pointer"
            } text={ hospitalInfo?.patientId_prefix + patient.patient_id} />
      </td>
      <td>
        <UserDetail text={patient.name} />
      </td>
      <td>
        <UserDetail text={patient.phone} />
      </td>
      <td>
        <UserDetail text={patient.age} />
      </td>
      <td>
        <UserDetail text={patient.gender} />
      </td>
      <td className="pr-3 !max-w-[120px]">
        <UserDetail text={patient.address} />
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
      <p className="text-bodySRB  whitespace-nowrap text-ellipsis !overflow-hidden hover:whitespace-normal">{text ? text : "-"}</p>
    </div>
  );
}

export default RowItems;
