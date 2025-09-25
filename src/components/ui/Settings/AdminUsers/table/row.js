import React from "react";
import RowLayout from "../../../../common/table/RowLayout";
import Button from "../../../../common/buttons/Button";
import { useSelector } from "react-redux";

const RowItems = ({ user, index, handleEditUser, handleconfirmation }) => {
  const currentUser = useSelector((state) => state.auth);
  // console.log(currentUser,"current user register new patient razi")
  return (
    <>
      <td>
        <UserDetail text={user?.sno} />
      </td>
      <td>
        <UserDetail text={user?.name} />
      </td>
      <td>
        <UserDetail text={user?.phoneNumber} />
      </td>
      <td>
        <UserDetail text={user?.role1} />
      </td>
      <td>
        <UserDetail text={user?.emailId || "-"} />
      </td>
      {
        currentUser.role === "Owner" && <td className="w-[250px]">
        <div className="flex items-center justify-center p-2.5 xl:p-2 col-span-full lg:col-span-1 gap-1">
          <Button
            type="secondary"
            className="text-bodySRB  py-[8px]"
            onClick={() => handleEditUser(user)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            className="text-bodySRB  py-[8px]"
            onClick={() => handleconfirmation(user)}
          >
            Delete
          </Button>
        </div>
      </td>
      }
    </>
  );
};

function UserDetail({ text }) {
  return (
    <div className="flex items-center justify-center p-2.5 xl:p-5 col-span-3 lg:col-span-1">
      <p className="text-bodySRB">{text}</p>
    </div>
  );
}

export default RowItems;
