import React from "react";
import { ListCard, ListItem } from "../../../../common/card/list-card/ListCard";
import { useSelector } from "react-redux";
import Button from "../../../../common/buttons/Button";
import { Link } from "react-router-dom";

const Cards = ({ columns, prescriptions }) => {
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  const getColumnValue = (prescription, column) => {
    switch (column) {
      case "Sl No":
        return prescription.sno;
      case "Presc. ID":
        return prescription.prescId;
      case "Date":
        return prescription.date;
      case "Patient ID":
        return (
          <Link to={`/patient_profile?id=${prescription.patient_id}`}>
            <div className={"text-primary underline cursor-pointer"}>
              {hospitalInfo?.patientId_prefix + prescription.patientId}
            </div>
          </Link>
        );
      case "Patient Name":
        return prescription.name;
      case "Mobile Number":
        return prescription.phone;
      case "Action":
        // Implement the logic for the "Action" column if needed
        return (
          <Link to={`/prescription_details/?id=${prescription._id}`}>
            <Button className={"!py-[7px]"} type={"primary"}>
              View
            </Button>
          </Link>
        );
      default:
        // Handle the case when the column is not recognized
        return "";
    }
  };
  return (
    <div>
      {prescriptions?.map((prescription, index) => (
        <div key={index} className="cursor-pointer">
          <ListCard>
            {columns.map((column, columnIndex) => (
              <ListItem
                key={columnIndex}
                title={column}
                value={getColumnValue(prescription, column)}
              />
            ))}
          </ListCard>
        </div>
      ))}
    </div>
  );
};

export default Cards;
