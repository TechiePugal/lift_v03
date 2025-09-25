import React from "react";
import TableHeadLayout from "../../../common/table/TableHeadLayout";
import RowItems from "./row";
import { APPOINMENTS } from "../../../../__mocks__/user_data";
import Cards from "./mobile/Cards";

const columns = [
  "Sl No",
  "Patient ID",
  "Patient Name",
  "Mobile Number",
  "Treatment",
  "Doctor's Name",
  "Actions",
];

const TreatmentsTable = ({ treatmentsData }) => {
  return (
    <div>
      {/* Hide on mobile view */}
      <div className="hidden md:block">
        <table className="w-full border-separate border-spacing-y-1">
          <thead className="border-b">
            <tr className="text-bodyBB text-darkgrey ">
              {columns.map((heading, index) => (
                <th
                  key={index}
                  className={`sticky -left-10 bg-secondary  border-b-2 h-14 text-darkgrey text-bodySBB  capitalize
            ${index === 0 ? "rounded-tl-15" : ""}
            ${index === columns.length - 1 ? "rounded-tr-15" : ""}
            `}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {treatmentsData.map((treatment, index) => {
              return (
                <tr
                  key={index}
                  className="text-center  rounded-15 shadow-card min-h-[50px] mb-2 
            hover:bg-bluishgrey "
                >
                  {/* Rows */}
                  <RowItems treatment={treatment} index={index} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Show only on mobile view */}
      <div className="block md:hidden">
        <Cards treatmentsData={treatmentsData} columns={columns} />
      </div>
    </div>
  );
};

export default TreatmentsTable;
