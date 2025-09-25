import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListCard, ListItem } from "../../../../../../common/card/list-card/ListCard";
import { displayDate } from "../../../../../../../utils/date";

const Cards = ({ utilities, columns, handleEditClick }) => {
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  const getColumnValue = (utility, column) => {
    switch (column) {
      case "Sl No":
        return utility.SI_NO;
      case "Date":
        return displayDate(utility?.utility_date) || "-";
      case "Name":
        return utility?.utility_name || "-";
      case "Type":
        return utility.utility_type || "-";
      case "Amount":
        return utility.utility_amount || "-";
      case "Payment Mode":
        return utility.utility_paid_type || "-";
      case "Next Due Date":
        return displayDate(utility.utility_next_due_date )|| "-";
      case "Remarks":
        return utility.utility_remarks || "-";
      default:
        // Handle the case when the column is not recognized
        console.error(`Unknown column: ${column}`);
        return "";
    }
  };

  return (
    <div>
      {utilities?.map((utility, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => handleEditClick(utility)}
        >
          <Link to={`/payment_details?id=${utility._id}`}>
            <ListCard>
              {columns.map((column, columnIndex) => (
                <ListItem
                  key={columnIndex}
                  title={column}
                  value={getColumnValue(utility, column)}
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
