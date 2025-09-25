import TableHeadLayout from "../../../../common/table/TableHeadLayout";
import { LABS } from "../../../../../__mocks__/user_data";
import RowItems from "./row";

const columns = [
  "Sl No",
  "Lab Name",
  "Contact Person",
  "Mobile Number",
  "Action",
];

const LabsTable = ({ labs, handleEditClick, handleconfirmation }) => {
  return (
    <div className="overflow-y-auto md:h-[75vh] overflow-auto p-0.5">  
      {/* Heading */}
      <TableHeadLayout columns={columns}>
        {/* Rows */}
        {labs.map((data, index) => {
          return <RowItems key={index} labs={data} index={index} handleEditClick={handleEditClick} handleconfirmation={handleconfirmation} />;
        })}
      </TableHeadLayout>
    </div>
  );
};

export default LabsTable;
