import RowLayout from "../../../../common/table/RowLayout";
import Button from "../../../../common/buttons/Button";

const RowItems = ({ doctors, index, handleEditClick, handleconfirmation }) => {
  return (
    <RowLayout key={index}>
      <td>
        <UserDetail text={doctors?.sno} />
      </td>
      <td>
        <UserDetail text={doctors?.name} />
      </td>
      <td>
        <UserDetail text={doctors?.phone} />
      </td>
      <td>
        <UserDetail text={doctors?.speciality} />
      </td>
      <td>
        <UserDetail text={doctors?.appointmentWhatsapp ? "Yes" : "No"} />
      </td>
      <td className="w-[250px]">
        <div className="flex items-center justify-center p-2.5 xl:p-2 col-span-full lg:col-span-1 gap-1 ">
          <Button
            type="secondary"
            className="text-bodySRB py-[8px]"
            onClick={() => handleEditClick(doctors)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            className="text-bodySRB py-[8px]"
            onClick={() => handleconfirmation(doctors)}
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
    <div className="flex items-center justify-center p-2.5 xl:p-5 col-span-3 lg:col-span-1">
      <p className="text-bodySRB">{text ? text : "-"}</p>
    </div>
  );
}

export default RowItems;
