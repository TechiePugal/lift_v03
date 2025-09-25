import TableHeadLayout from "../../../../common/table/TableHeadLayout";
import { TREATMENTS } from "../../../../../__mocks__/user_data";
import RowItems from "./row";
import NoData from "../../../../common/nodata";

const columns = ["Sl No", "Treatment", "Charges", " ", "Action"];

const TreatmentsTable = ({ treatments, handleEditClick, handleconfirmation }) => {
  
  return (
    <div className="overflow-y-auto md:h-[75vh] overflow-auto p-0.5">  
      {/* Heading */}
      {treatments?.length > 0 && (
        <TableHeadLayout columns={columns}>
          {/* Rows */}
          {treatments.map((treatments, index) => {
            return (
              <RowItems
                key={index}
                treatments={treatments}
                index={index}
                handleEditClick={handleEditClick}
                handleconfirmation={handleconfirmation}
              />
            );
          })}
        </TableHeadLayout>
      )}
    </div>
  );
};

export default TreatmentsTable;
