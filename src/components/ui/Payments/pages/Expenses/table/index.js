import React from "react";
import TableHeadLayout from "../../../../../common/table/TableHeadLayout";
import RowItems from "./row";
import Cards from "./mobile/Cards";

const columns = [
  "Sl No",
  "Date",
  "Name",
  "Type",
  "Amount",
  "Payment Mode",
  "Next Due Date",
  "Remarks",
];

const ExpenseTable = ({ utilities, handleEditClick }) => {
  return (
    <div>
      <div className="overflow-auto p-0.5 hidden md:block">
        {/* Heading */}
        <TableHeadLayout columns={columns}>
          {/* Rows */}
          {utilities.map((utility, index) => {
            return (
              <RowItems
                key={index}
                index={index}
                utility={utility}
                handleEditClick={handleEditClick}
              />
            );
          })}
        </TableHeadLayout>
      </div>

      {/* Show only on mobile view */}
      <div className="block md:hidden">
        <Cards
          utilities={utilities}
          columns={columns}
          handleEditClick={handleEditClick}
        />
      </div>
    </div>
  );
};

export default ExpenseTable;
