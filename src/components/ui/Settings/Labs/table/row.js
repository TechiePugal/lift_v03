import RowLayout from "../../../../common/table/RowLayout";
import Button from "../../../../common/buttons/Button";

const RowItems = ({ labs, index, handleEditClick, handleconfirmation }) => {
  return (
    <RowLayout key={index}>
      <td>
        <UserDetail text={labs?.sno} />
      </td>
      <td>
        <UserDetail text={labs.lab_name} />
      </td>
      <td>
        <UserDetail text={labs.contact_person} />
      </td>
      <td>
        <UserDetail text={labs.contact_number} />
      </td>
      <td className="w-[250px]">
        <div className="flex items-center justify-center p-2.5 xl:p-2 col-span-full lg:col-span-1 gap-1 ">
          <Button
            type="secondary"
            className="text-bodySRB py-[8px]"
            onClick={() => handleEditClick(labs)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            className="text-bodySRB py-[8px]"
            onClick={() => handleconfirmation(labs)}
          >
            Delete
          </Button>
        </div>
      </td>
    </RowLayout>
  );
};

function UserDetail({ text }) {
  return (
    <div className="flex items-center justify-center  p-2.5 xl:p-5 col-span-3 lg:col-span-1">
      <p className="text-bodySRB">{text ? text : "-"}</p>
    </div>
  );
}

export default RowItems;
