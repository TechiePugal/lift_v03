import React, { useEffect, useState } from "react";
import AdminUsers from "../../../components/ui/Settings/AdminUsers/AdminLayout";
import { getAllUsers } from "../../../api/settings/Admin/admin";
import useDelayedSearch from "../../../utils/delayedsearch";

const AdminUsersPage = () => {
  const [users, SetUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const getAllUserData = () => {
    setLoading(true);
    getAllUsers(searchKey)
      .then((response) => {
        SetUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  /** For delay in search hook */
  useDelayedSearch(getAllUserData, 200, [searchKey]);

  return (
    <div>
      <AdminUsers
        users={users}
        loading={loading}
        getAllUserData={getAllUserData}
        setSearchKey={setSearchKey}
        searchKey={searchKey}
      />
    </div>
  );
};

export default AdminUsersPage;
