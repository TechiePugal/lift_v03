import TableHeadLayout from "../../../../common/table/TableHeadLayout";
import { DOCTORS } from "../../../../../__mocks__/user_data";
import RowItems from "./row";
import RowLayout from "../../../../common/table/RowLayout";

const columns = [
  "Sl No",
  "Name",
  "Mobile Number",
  "Specialty",
  "Whatsapp",
  "Action",
];

const DoctorsTable = ({ doctors, handleEditClick, handleconfirmation }) => {
  return (
    <div className="overflow-y-auto md:h-[75vh] overflow-auto p-0.5">  
      {/* Heading */}
      <TableHeadLayout columns={columns}>
        {/* Rows */}
        {doctors.map((doctors, index) => {
          return (
            <RowItems
              key={index}
              doctors={doctors}
              index={index}
              handleEditClick={handleEditClick}
              handleconfirmation={handleconfirmation}
            />
          );
        })}
      </TableHeadLayout>

      {doctors.length === 0 && (
        <p className="flex justify-center items-center h-[200px]">
          No data available.
        </p>
      )}
    </div>
  );
};

export default DoctorsTable;
