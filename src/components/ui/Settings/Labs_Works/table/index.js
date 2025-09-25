import { LABSWORKS } from "../../../../../__mocks__/user_data";
import TableHeadLayout from "../../../../common/table/TableHeadLayout";
import RowItems from "./row";

const columns = ["Sl No", "Lab Work Name", "Action"];

const LabsWorksTable = ({ handleEditClick, labsWorks, handleconfirmation }) => {
  return (
    <div className="overflow-y-auto md:h-[75vh] overflow-auto p-0.5">
      {/* Heading */}
      <TableHeadLayout columns={columns}>
        {/* Rows */}
        {labsWorks?.map((data, index) => {
          return (
            <RowItems
              key={index}
              labWorks={data}
              index={index}
              handleEditClick={handleEditClick}
              handleconfirmation={handleconfirmation}
            />
          );
        })}
      </TableHeadLayout>
    </div>
  );
};

export default LabsWorksTable;
