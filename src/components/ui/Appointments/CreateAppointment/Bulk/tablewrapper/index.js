import React from "react";
import DatePicker from "../../../../../common/datepicker/DatePicker";

const TableMain = ({ children }) => {
  return (
    <>
      <table className="w-full border-separate">
        <thead className="border-b">
          <tr className="text-bodyBB text-darkgrey ">
            <th className="p-3 border-b-2">Sl No</th>
            <th className=" -left-10 bg-white border-b-2">Patient</th>
            <th className=" left-0 bg-white border-b-2">Teeth</th>
            <th className=" left-0 bg-white border-b-2">Treatment</th>
            <th className=" left-0 bg-white border-b-2">Doctor</th>
            <th className=" left-9 bg-white border-b-2">Time</th>
            <th className="border-b-2"></th>
            <th className="border-b-2"></th>
            <th className="border-b-2"></th>
          </tr>
        </thead>
        <tbody className="">{children}</tbody>
      </table>
    </>
  );
};

export default TableMain;
