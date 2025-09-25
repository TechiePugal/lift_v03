import React from "react";
import TableHeadLayout from "../../../common/table/TableHeadLayout";
import RowItems from "./row";
import { APPOINMENTS } from "../../../../__mocks__/user_data";
import Cards from "./mobile/Cards";

const columns = [
  // "S.No",
  "Order ID",
  "PIN",
  "Patient Name",
  "Mobile Number",
  "Lab",
  "Lab Work",
  "Order Date",
  "Arrived Date",
  "Delivery Date",
  "Status",
];

const LabsTable = ({ labs }) => {
  return (
    <div>
      <div className="overflow-y-auto md:h-[75vh] overflow-auto hidden md:block">
        {/* Heading */}
        <TableHeadLayout columns={columns}>
          {/* Rows */}
          {labs.map((lab, index) => {
            return <RowItems key={index} index={index} lab={lab} />;
          })}
        </TableHeadLayout>
      </div>

      {/* Show only on mobile view */}
      <div className="block md:hidden">
        <Cards labs={labs} columns={columns} />
      </div>
    </div>
  );
};

export default LabsTable;
