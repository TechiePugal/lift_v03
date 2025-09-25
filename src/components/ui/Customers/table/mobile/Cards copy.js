import React from "react";
import Status from "../../../../common/status/Status";
import { useSelector } from "react-redux";
import { displayDate } from "../../../../../utils/date";
import { ListCard, ListItem } from "../../../../common/card/list-card/ListCard";

const Cards = ({ columns, customers }) => {
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  const getColumnValue = (customer, column) => {
    switch (column) {
      case "Sl No":
        return customer?.sno;
      case "Name":
        return customer.name;
      case "Phone Number":
        return customer.phone;
      case "Address":
        return customer.address;
      case "No Of Floors":
        return customer.floors;
      case "Installed Date":
        return customer.installed_date;
      case "Amc Due":
        return customer.amcdue;
      case "Status":
        return customer.status;
      default:
        // Handle the case when the column is not recognized
        return "";
    }
  };
  return (
    <div>
      {customers?.map((customer, index) => (
        <div key={index} className="cursor-pointer">
          <ListCard>
            {columns.map((column, columnIndex) => (
              <ListItem
                key={columnIndex}
                title={column}
                value={getColumnValue(customer, column)}
              />
            ))}
          </ListCard>
        </div>
      ))}
    </div>
  );
};

export default Cards;
