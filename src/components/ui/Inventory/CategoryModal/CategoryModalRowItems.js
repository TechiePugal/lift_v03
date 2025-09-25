import React, { useState } from "react";
import Button from "../../../common/buttons/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryModalRowItems = ({ category, index }) => {
  const [showTreatments, setShowTreatments] = useState(null);
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const handleShowTreatments = (index) => {
    setShowTreatments(index);
  };
  return (
    <>
      <td>
        <UserDetail text={category?.slNo} />
      </td>
      {/* <td>
        <Link to={`/patient_profile?id=${category.patient_id}`}>
          <UserDetail
            className={"text-primary underline cursor-pointer"}
            text={hospitalInfo?.patientId_prefix + category.patientId}
          />
        </Link>
      </td> */}
      <td>
        <UserDetail text={category.categoryCode} />
      </td>
      <td>
        <UserDetail text={category.categoryName} />
      </td>
      

      <td className=" grid  py-2 pr-2 space-x-1">
       
         
        
          <Link to={`/`}>
            <Button className={"bg-[#6AB483]  text-white text-bodySRB "}>
              Edit
            </Button>
          </Link>
        
        
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
      className={` ${className}`}
    >
      <p className="text-bodySRB">{text}</p>
    </div>
  );
}

export default CategoryModalRowItems;
