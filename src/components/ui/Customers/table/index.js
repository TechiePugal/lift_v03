import React from "react";
import TableHeadLayout from "../../../common/table/TableHeadLayout";
import RowItems from "./row";
import Cards from "./mobile/Cards";

const columns = [
  "Sl No",
  "Name",
  "Phone Number",
  "Address",
  "No Of Floors",
  "Installed Date",
  "Amc Due",
  "Status",
  "Actions"
];

const CustomersTable = ({ customers }) => {
  return (
    <div className="md:overflow-y-auto  pb-10  md:h-[70vh] md:overflow-auto">
      {/* Hide on mobile view */}
      <div className="hidden md:block">
        {/* Heading */}
        <TableHeadLayout columns={columns}>
          {/* Rows */}
          {customers.map((customer, index) => {
            return <RowItems key={index} customer={customer} index={index} />;
          })}
        </TableHeadLayout>
      </div>

      {/* Show only on mobile view */}
      <div className="block md:hidden">
        <Cards customers={customers} columns={columns} />
      </div>
      {/*  */}
    </div>
  );
};

export default CustomersTable;
