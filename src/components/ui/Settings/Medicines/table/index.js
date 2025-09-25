import TableHeadLayout from "../../../../common/table/TableHeadLayout";
import { MEDICINES } from "../../../../../__mocks__/user_data";
import RowItems from "./row";

const columns = [
  "Sl No",
  "Type",
  "Medicine",
  "BF / AF",
  "Morning",
  "Afternoon",
  "Evening",
  "Night",
  "Days",
  "",
  "Action",
];

const MedicinesTable = ({ handleEditClick, medicines, handleconfirmation }) => {
  return (
    <div className="overflow-y-auto md:h-[75vh] overflow-auto p-0.5">  
      <table className=" w-screen lg:w-full border-separate border-spacing-y-1 ">
        <thead className="border-b sticky top-0">
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
          {medicines.map((data, index) => {
            return (
              <tr
                key={index}
                className="text-center cursor-pointer rounded-15 shadow-card min-h-[50px] mb-2 
            hover:bg-bluishgrey"
              >
                {/* Rows */}
                <RowItems
                  key={index}
                  data={data}
                  index={index}
                  handleconfirmation={handleconfirmation}
                  handleEditClick={handleEditClick}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MedicinesTable;
