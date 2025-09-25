import React from "react";
import TableHeadLayout from "../../../common/table/TableHeadLayout";
import RowItems from "./row";
import { APPOINMENTS } from "../../../../__mocks__/user_data";
import Cards from "./mobile/Cards";

const columns = [
  // "Sl No",
  "Invoice No",
  "Date",
  "PIN",
  "Patient Name",
  "Treatment",
  "Total Amount",
  "Amount Paid",
  "Balance",
  // "Mode",
  "Status",
];

const PaymetsTable = ({ invoices }) => {
  return (
    <div>
      <div className="overflow-y-auto md:h-[75vh] overflow-auto hidden md:block">
        {/* Heading */}
        <TableHeadLayout columns={columns}>
          {/* Rows */}
          {invoices.map((invoice, index) => {
            return <RowItems key={index} invoice={invoice} index={index} />;
          })}
        </TableHeadLayout>
      </div>
      {/* Show only on mobile view */}
      <div className="block md:hidden">
        <Cards invoices={invoices} columns={columns} />
      </div>
    </div>
  );
};

export default PaymetsTable;
