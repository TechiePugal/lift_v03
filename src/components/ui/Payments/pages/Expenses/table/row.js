import React, { useState } from "react";
import RowLayout from "../../../../../common/table/RowLayout";
import { Link, useNavigate } from "react-router-dom";
import { displayDate, formatDate } from "../../../../../../utils/date";

const RowItems = ({ utility, index, handleEditClick }) => {
  return (
    <RowLayout onClick={() => handleEditClick(utility)} key={index}>
      <td>
        <UserDetail text={utility?.SI_NO || "-"} />
      </td>
      <td>
        <UserDetail
          text={displayDate(utility?.utility_date) || "-"}
          className={""}
        />
      </td>
      <td>
        <UserDetail text={utility?.utility_name || "_"} className={""} />
      </td>
      <td>
        <UserDetail text={utility?.utility_type || "-"} className={""} />
      </td>
      <td>
        <UserDetail text={utility?.utility_amount || "-"} className={""} />
      </td>
      <td>
        <UserDetail text={utility?.utility_paid_type || "-"} className={""} />
      </td>
      <td>
        <UserDetail
          text={displayDate(utility?.utility_next_due_date) || "-"}
          className={""}
        />
      </td>
      <td>
        <UserDetail text={utility?.utility_remarks || "-"} className={"  "} />
      </td>
    </RowLayout>
  );
};

function UserDetail({ text, className, onCLick, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onCLick}
      onMouseLeave={onMouseLeave}
      className={` ${className} p-3`}
    >
      <p className="text-bodySRB text-darkgrey min-w-max">{text}</p>
    </div>
  );
}

export default RowItems;
