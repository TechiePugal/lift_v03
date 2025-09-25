import RowLayout from "../../../../common/table/RowLayout";
import Button from "../../../../common/buttons/Button";
import { getUnitLabel } from "../../../../../utils/medicineType";




const RowItems = ({ data, index, handleEditClick, handleconfirmation }) => {
  return (
    <>
      <td>
        <UserDetail text={data?.sno} />
      </td>
      <td>
        <UserDetail text={data.medicine_type} />
      </td>
      <td>
        <UserDetail text={data.medicine} />
      </td>
      <td>
        <UserDetail text={data.before_after_food} />
      </td>
      <td>
        <UserDetail text={getUnitLabel(data.medicine_type, data.morning)} />
      </td>
      <td>
        <UserDetail text={getUnitLabel(data.medicine_type, data.afternoon)} />
      </td>
      <td>
        <UserDetail text={getUnitLabel(data.medicine_type, data.evening)} />
      </td>
      <td>
        <UserDetail text={getUnitLabel(data.medicine_type, data.night)} />
      </td>
      <td>
        <UserDetail text={data.days} />
      </td>
      <td></td>
      <td className="w-[250px]">
        <div className="flex items-center justify-center p-2.5 xl:p-2 col-span-full lg:col-span-1 gap-1 ">
          <Button
            type="secondary"
            className="text-bodySRB py-[8px]"
            onClick={() => handleEditClick(data)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            className="text-bodySRB py-[8px]"
            onClick={() => handleconfirmation(data)}
          >
            Delete
          </Button>
        </div>
      </td>
    </>
  );
};

function UserDetail({ text, className, onCLick, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onCLick}
      onMouseLeave={onMouseLeave}
      className={` ${className} py-4`}
    >
      <p className="text-bodySRB text-darkgrey">{text || "-"}</p>
    </div>
  );
}

export default RowItems;
