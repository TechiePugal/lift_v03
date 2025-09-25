import { useState } from "react";
import Button from "../../../common/buttons/Button";
import ModalWrapper from "../../../common/modal/ModalWrapper";
import SearchInput from "../../../common/search";
import AddUser from "./addUser/AddUser";
import UserTable from "./table";
import FullScreeeSpinner from "../../../common/loading/FullScreee";
import EditUser from "./editUser/EditUser";
import NoData from "../../../common/nodata";
import { showErrorToast, showSuccessToast } from "../../../../utils/toaster";
import { deleteUser } from "../../../../api/settings/Admin/admin";
import { useSelector } from "react-redux";
const AdminUsers = ({
  users,
  loading,
  getAllUserData,
  setSearchKey,
  searchKey,
}) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEdidData] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth);
  // console.log(currentUser,"current user register new patient razi")

  const handleconfirmation = (props) => {
    setConfirmOpen(!confirmOpen);
    setEdidData(props);
  };
  const handleAddUser = () => {
    setOpen(!open);
  };
  const handleEditUser = (props) => {
    setOpenEdit(!openEdit);
    setEdidData(props);
  };

  const handleDelete = () => {
    // setLoading(true);
    deleteUser(editData._id)
      .then((response) => {
        showSuccessToast("Deleted Successfully");
        getAllUserData();
        handleconfirmation();
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-2 mb-2">
        {/* Header Searchbar */}
        <div className="col-start-1 lg:col-end-3">
          <SearchInput
            searchKey={searchKey}
            handleChange={setSearchKey}
            placeholder={"Search by User Name"}
          />
        </div>

        {/* Header add use Button */}
        <div className="lg:col-start-4">
          {currentUser?.role==="Owner" && <Button
            onClick={handleAddUser}
            type={"primary"}
            className={"text-bodyBB"}
          >
            Add User
          </Button>}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <FullScreeeSpinner />
        </div>
      ) : users?.length >= 0 ? (
        <>
          {/* User Data Listing Table */}
          <div>
            <UserTable
              users={users}
              handleEditUser={handleEditUser}
              handleconfirmation={handleconfirmation}
            />
          </div>
        </>
      ) : (
        <div className="h-[50vh]">
          <NoData />
        </div>
      )}
      {/*  */}
      <ModalWrapper
        open={open}
        handleClose={handleAddUser}
        title={"Add Admin User"}
      >
        <AddUser getAllUserData={getAllUserData} handleClose={handleAddUser} />
      </ModalWrapper>
      <ModalWrapper
        handleClose={handleEditUser}
        open={openEdit}
        title={"Edit Admin User"}
      >
        <EditUser
          editData={editData}
          getAllUserData={getAllUserData}
          handleClose={handleEditUser}
        />
      </ModalWrapper>
      {/*  */}
      <ModalWrapper open={confirmOpen} handleClose={handleconfirmation}>
        <div className=" flex flex-col gap-10">
          <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
            Are you sure that you want to delete
            <span className="text-bodyBB pl-1 pr-1 text-darkgrey">
              {editData?.name}
            </span>
            ?
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleconfirmation}
              type={"danger"}
              className={"text-heading2B"}
            >
              No
            </Button>
            <Button
              onClick={handleDelete}
              type={"yes"}
              className={"text-heading2B"}
            >
              Yes
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default AdminUsers;
