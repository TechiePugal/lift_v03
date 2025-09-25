import React from "react";

const PendingInvoices = () => {
  return (
    <div className="min-h-full shadow-card rounded-15">
      <div
        className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-5 text-bodyBB text-darkgrey mb-2`}
      >
        Pending Invoices
      </div>
      <table className=" w-screen md:w-full  border-separate border-spacing-y-1 min-w-max  ">
        <thead className="">
          <tr>
            <th className="border-b pb-2 text-bodyBB text-darkgrey h-[50px]">
              Date
            </th>
            <th className="border-b pb-2 text-bodyBB text-darkgrey">
              Receipt No.
            </th>
            <th className="border-b pb-2 text-bodyBB text-darkgrey">
              Amount Paid
            </th>
            <th className="border-b pb-2 text-bodyBB text-darkgrey">Pending</th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="">
            <td className="text-center p-5 text-bodyRB text-darkgrey">20-04-23</td>
            <td className="text-center p-5 text-bodyRB text-darkgrey">23456</td>
            <td className="text-center p-5 text-bodyRB text-darkgrey">2000</td>
            <td className="text-center p-5 text-bodyRB text-darkgrey">1000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PendingInvoices;
