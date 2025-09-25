import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { displayDate } from "../../../../../utils/date";
import { ListCard, ListItem } from "../../../../common/card/list-card/ListCard";
import Button from "../../../../common/buttons/Button";
import { deleteCustomer } from "../../../../../api/Customers";
import { showErrorToast } from "../../../../../utils/toaster";
import { FaEdit, FaTrash, FaCog } from "react-icons/fa"; // Example icons from react-icons

const Cards = ({ columns, customers }) => {
  const navigate = useNavigate();
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
        return displayDate(customer.installed_date);
      case "Amc Due":
        return displayDate(customer.amcdue);
      case "Status":
        return customer?.communicationStatus === "0" ? "LIVE" : "ERROR";
      case "Actions":
        return (
          <div className="flex justify-center space-x-2">
            <Button
              type="secondary"
              className="text-bodySRB py-[8px]"
              onClick={() => handleControl(customer._id)}
            >
              <FaCog className="mr-2" /> Control
            </Button>
            <Button
              type="secondary"
              className="text-bodySRB py-[8px]"
              onClick={() => handleEdit(customer._id)}
            >
              <FaEdit className="mr-2" /> Edit
            </Button>
            <Button
              type="danger"
              className="text-bodySRB py-[8px]"
              onClick={() => handleDelete(customer._id)}
            >
              <FaTrash className="mr-2" /> Delete
            </Button>
          </div>
        );
      default:
        return "";
    }
  };

  const handleControl = (id) => {
    navigate(`/customer_details?id=${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit_customer?id=${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(id)
        .then((response) => {})
        .catch((error) => {
          showErrorToast(error, "error");
        })
        .finally(() => {
          window.location.href = "/customers";
        });
    }
  };

  return (
    <div>
      {customers?.map((customer, index) => (
        <div key={index} className="cursor-pointer mb-4">
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
