import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { displayDate } from "../../../../../../../utils/date";
import {
  ListCard,
  ListItem,
} from "../../../../../../common/card/list-card/ListCard";

const Cards = ({ patients, columns }) => {
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  const getColumnValue = (patient, column) => {
    switch (column) {
      case "Sl No":
        return patient.sno;
      case "Reg. Date":
        return displayDate(patient.createdAt);
      case "Patient ID":
        return (
          <div className={" !text-primary underline cursor-pointer"}>
            {hospitalInfo?.patientId_prefix + patient.patient_id}
          </div>
        );
      case "Patient Name":
        return patient.name;
      case "Mobile Number":
        return patient.phone;
      case "Age":
        return patient.age;
      case "Gender":
        return patient.gender;
      case "Address":
        return patient.address;
      default:
        // Handle the case when the column is not recognized
        console.error(`Unknown column: ${column}`);
        return "";
    }
  };

  return (
    <div>
      {patients?.map((patient, index) => (
        <div key={index} className="cursor-pointer">
          <Link to={`/patient_profile?id=${patient._id}`}>
            <ListCard>
              {columns.map((column, columnIndex) => (
                <ListItem
                  key={columnIndex}
                  title={column}
                  value={getColumnValue(patient, column)}
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
