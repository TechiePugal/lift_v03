import React from "react";
import TableHeadLayout from "../../../common/table/TableHeadLayout";
import RowItems from "./row";
import { APPOINMENTS } from "../../../../__mocks__/user_data";
import Cards from "./mobile/Cards";

const columns = [
  "Sl No",
  "Presc. ID",
  "Date",
  "Patient ID",
  "Patient Name",
  // "Doctor’s Name",
  "Mobile Number",
  "Action",
];

const PrescriptionsTable = ({ prescriptions }) => {
  return (
    <div>
      <div className="overflow-auto p-0.5 hidden md:block">
        {/* Heading */}
        <TableHeadLayout columns={columns}>
          {/* Rows */}
          {prescriptions.map((prescription, index) => {
            return (
              <RowItems key={index} prescription={prescription} index={index} />
            );
          })}
        </TableHeadLayout>
      </div>

      {/* Show only on mobile view */}
      <div className="block md:hidden">
        <Cards columns={columns} prescriptions={prescriptions} />
      </div>
    </div>
  );
};

export default PrescriptionsTable;
