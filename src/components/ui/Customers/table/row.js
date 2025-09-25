import React, { useState } from "react";
import RowLayout from "../../../common/table/RowLayout";
import Button from "../../../common/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { displayDate, formatDate } from "../../../../utils/date";
import { deleteCustomer } from "../../../../api/Customers";
import { useSelector } from "react-redux";
import { showErrorToast } from "../../../../utils/toaster";

const RowItems = ({ customer, index }) => {
  const navigate = useNavigate();
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const handleControl = () => {
    navigate(`/customer_details?id=${customer?._id}`);
    // navigate(`/customer_details?id=${id}`);
  };
  const handleEdit = () => {
    navigate(`/edit_customer?id=${customer?._id}`);
    // navigate(`/customer_details?id=${id}`);
  };
  const handleIdClick = (e, id) => {
    e.stopPropagation();
    navigate(`/patient_profile?id=${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      // e.stopPropagation();
      deleteCustomer(customer?._id)
        .then((response) => {
          // setDetails(response.data?.data);
        })
        .catch((error) => {
          showErrorToast(error, "error");
          // redirect();
        })
        .finally(() => {
          // setLoading(false);
          // navigate(`/customers`, { state: { refresh: true } });
          window.location.href = "/customers"; // Force full page reload
        });
    }
  };
  return (
    // <RowLayout onClick={handleRoute} key={index}>
    <RowLayout key={index}>
      {/* <td className="h-14">
        <UserDetail text={customer?._id} />
      </td> */}
      <td className="h-14">
        <UserDetail text={customer?.sno} />
      </td>
      {/* <td>
        <UserDetail
          text={customer?.SI_NO}
          className={" min-w-[100px] text-center"}
        />
      </td> */}
      <td>
        <UserDetail text={customer.name} className={""} />
      </td>

      <td>
        <UserDetail text={customer.phone} className={""} />
      </td>

      <td>
        <UserDetail text={customer.address} className={""} />
      </td>
      <td>
        <UserDetail text={customer.floors} className={""} />
      </td>

      <td>
        <UserDetail
          text={`${displayDate(customer?.installed_date)}` || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>
      {/* <td>
        <UserDetail text={customer.installed_date} className={""} />
      </td> */}
      <td>
        <UserDetail
          text={`${displayDate(customer?.amcdue)}` || "-"}
          className={"col-span-2 min-w-[100px] text-center"}
        />
      </td>

      {/* <td>
        <UserDetail text={customer.amcdue} className={""} />
      </td> */}

      {/* <td>
        <UserDetail text={customer.status} className={""} />
      </td> */}

      <td>
        {/* <UserDetail text={customer?.communicationStatus} className={""} /> */}
        <div
          style={{
            width: "20px",
            height: "20px",
            // borderRadius: "50%",
            // border: "2px solid",
            // borderColor:
            //   customer?.communicationStatus === "0" ? "green" : "red",
            display: "inline-block",
            textAlign: "center",
            lineHeight: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            color: customer?.communicationStatus === "0" ? "green" : "red",
          }}
        >
          {customer?.communicationStatus === "0" ? "LIVE" : "ERROR"}
        </div>
      </td>
      <td className="w-[250px]">
        <div className="flex items-center justify-center p-2.5 xl:p-2 col-span-full lg:col-span-1 gap-1 ">
          <Button
            type="secondary"
            className="text-bodySRB py-[8px]"
            onClick={() => handleControl()}
          >
            Control
          </Button>
          <Button
            type="secondary"
            className="text-bodySRB py-[8px]"
            onClick={() => handleEdit()}
          >
            Edit
          </Button>
          <Button
            type="danger"
            className="text-bodySRB py-[8px]"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </div>
      </td>

      {/* <td>
  <UserDetail text={customer.status} className={""} />
  {customer.status === "live" ? (
    <span style={{ color: "green" }}>✓</span>
  ) : (
    <span style={{ color: "red" }}>✗</span>
  )}
</td> */}

      {/* <td>
        <div onClick={(e) => handleIdClick(e, customer.patient_id)}>
          <UserDetail
            className={"text-primary underline cursor-pointer"}
            text={hospitalInfo?.patientId_prefix + customer.patientId}
          />
        </div>
      </td> */}
      {/* <td>
        <UserDetail
          text={customer.name}
          className={" min-w-[150px] text-center"}
        />
      </td> */}
      {/* <td>
        <UserDetail
          text={customer.phone}
          className={" min-w-[50px] text-center"}
        />
      </td> */}
      {/* <td>
        <Button className={"!py-[7px]"} type={"primary"}>
          View
        </Button>
      </td> */}
    </RowLayout>
  );
};

function UserDetail({ text, className, onCLick, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onCLick}
      onMouseLeave={onMouseLeave}
      className={` ${className} text-darkgrey `}
    >
      <p className="text-bodySRB min-w-max">{text}</p>
    </div>
  );
}

export default RowItems;
