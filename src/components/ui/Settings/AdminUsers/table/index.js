import React from "react";
import TableHeadLayout from "../../../../common/table/TableHeadLayout";
import { ADMIN_USERS } from "../../../../../__mocks__/user_data";
import RowItems from "./row";
import Cards from "./mobile/Cards";
import { useSelector } from "react-redux";

const columns = [
  "Sl No",
  "Name",
  "Mobile Number",
  "Role",
  "Username",
  
];

const UserTable = ({ users, handleEditUser, handleconfirmation }) => {
  const currentUser = useSelector((state) => state.auth);
  const tableheaders = currentUser.role==="Owner" ?[...columns,"Action"]:columns
  return (
    <div className="overflow-y-auto md:h-[75vh] overflow-auto p-0.5">
      <div className="hidden md:block">
      {/* Heading */}
      <TableHeadLayout columns={tableheaders}>
        {/* Rows */}
        {users?.map((user, index) => {
          return (
            <tr
              className="text-center cursor-pointer rounded-15 shadow-card min-h-[50px] mb-2 
              hover:bg-bluishgrey"
            >
              <RowItems
                key={index}
                user={user}
                index={index}
                handleEditUser={handleEditUser}
                handleconfirmation={handleconfirmation}
              />
            </tr>
          );
        })}
      </TableHeadLayout>
      </div>

      {/* Show only on mobile view */}
      <div className="block md:hidden">
        <Cards
          userData={users}
          columns={columns}
          handleEditUser={handleEditUser}
          handleconfirmation={handleconfirmation}
        />
      </div>
    </div>
  );
};

export default UserTable;
