import React from "react";
import {
  ListCard,
  ListItem,
} from "../../../../../common/card/list-card/ListCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../../../common/buttons/Button";

const Cards = ({ userData, columns, handleEditUser, handleconfirmation }) => {
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  /** For getting values on mobile view */
  const getColumnValue = (user, column) => {
    switch (column) {
      case "Sl No":
        return user.sno;
      case "Name":
        return user.name;
      case "Mobile Number":
        return user.phoneNumber;
      case "Role":
        return user.role1;
      case "Username":
        return user.emailId;
      case "Action":
        // Implement the logic for the "Actions"
        return (
          <div>
            <div className="flex items-center justify-center gap-1">
              <Button
                type="secondary"
                className="text-bodySRB  py-[8px]"
                onClick={() => handleEditUser(user)}
              >
                Edit
              </Button>
              <Button
                type="danger"
                className="text-bodySRB  py-[8px]"
                onClick={() => handleconfirmation(user)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      default:
        // Handle the case when the column is not recognized
        return "";
    }
  };

  return (
    <div>
      {userData?.map((user, index) => (
        <div key={index} className="cursor-pointer">
          <ListCard>
            {columns.map((column, columnIndex) => (
              <ListItem
                key={columnIndex}
                title={column}
                value={getColumnValue(user, column)}
              />
            ))}
          </ListCard>
        </div>
      ))}
    </div>
  );
};

export default Cards;
