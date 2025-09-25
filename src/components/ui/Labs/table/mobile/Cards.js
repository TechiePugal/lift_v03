import React from "react";
import { ListCard, ListItem } from "../../../../common/card/list-card/ListCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../../common/buttons/Button";
import { displayDate } from "../../../../../utils/date";
import Status from "../../../../common/status/Status";

const Cards = ({ labs, columns }) => {
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  const getColumnValue = (lab, column) => {
    switch (column) {
      // case "Sl No":
      //   return lab.sno;
      case "Order ID":
        return lab.SI_NO;
      case "PIN":
        return (
          <Link to={`/patient_profile?id=${lab.patient_id?._id}`}>
            <div className={"text-primary underline cursor-pointer"}>
              {hospitalInfo?.patientId_prefix + lab.patient_id.patient_id ||
                "-"}
            </div>
          </Link>
        );
      case "Patient Name":
        return lab.patient_id.name;
      case "Mobile Number":
        return lab.patient_id.phone;
      case "Lab":
        return lab.lab;
      case "Lab Work":
        return lab.work_type;
      case "Order Date":
        return displayDate(lab.order_date) || "-";
      case "Arrived Date":
        return displayDate(lab.arrival_date) || "-";
      case "Delivery Date":
        return displayDate(lab.fixing_date) || "-";
      case "Status":
        return (
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
        );
      default:
        // Handle the case when the column is not recognized
        console.error(`Unknown column: ${column}`);
        return "";
    }
  };

  return (
    <div>
      {labs?.map((lab, index) => (
        <div key={index} className="cursor-pointer">
          <Link to={`/lab_order_details/?id=${lab._id}`}>
            <ListCard>
              {columns.map((column, columnIndex) => (
                <ListItem
                  key={columnIndex}
                  title={column}
                  value={getColumnValue(lab, column)}
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
