import { useState } from "react";
import Button from "../../../common/buttons/Button";
import ModalWrapper from "../../../common/modal/ModalWrapper";
import SearchInput from "../../../common/search";
import LabsTable from "./table";
import AddLabs from "./AddLabs/AddLabs";
import FullScreeeSpinner from "../../../common/loading/FullScreee";
import EditLabs from "./EditLabs/EditLabs";
import NoData from "../../../common/nodata";
import { showErrorToast, showSuccessToast } from "../../../../utils/toaster";
import { deleteLabsData } from "../../../../api/settings/Labs";
const Labs = ({ loading, labs, getAllLabsData, setSearchKey, searchKey }) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleconfirmation = (props) => {
    setConfirmOpen(!confirmOpen);
    setEditData(props);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const handleEditClick = (params) => {
    setEditData(params);
    setEditOpen(!editOpen);
  };

  const handleDelete = () => {
    deleteLabsData(editData._id)
      .then((response) => {
        showSuccessToast("Deleted Successfully");
        getAllLabsData();
        handleconfirmation();
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {});
  };

  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-2 mb-2">
        {/* Header Searchbar */}
        <div className="col-start-1 lg:col-end-3">
          <SearchInput
            searchKey={searchKey}
            handleChange={setSearchKey}
            placeholder={"Search by Lab Name"}
          />
        </div>

        {/* Header add use Button */}
        <div className="lg:col-start-4">
          <Button
            onClick={handleClick}
            type={"primary"}
            className={"text-bodyBB"}
          >
            Add Lab{" "}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <FullScreeeSpinner />
        </div>
      ) : // {/* Treatments Listing Table */}
      labs?.length >= 0 ? (
        <div>
          <LabsTable labs={labs} handleEditClick={handleEditClick} handleconfirmation={handleconfirmation} />
        </div>
      ) : (
        <div className="h-[50vh]">
          <NoData />
        </div>
      )}

      {/*  */}
      <ModalWrapper open={open} title={"Add Lab"} handleClose={handleClick}>
        <AddLabs getAllLabsData={getAllLabsData} handleClose={handleClick} />
      </ModalWrapper>

      <ModalWrapper
        open={editOpen}
        title={"Edit Lab"}
        handleClose={handleEditClick}
      >
        <EditLabs
          getAllLabsData={getAllLabsData}
          editData={editData}
          handleClose={handleEditClick}
        />
      </ModalWrapper>

      <ModalWrapper open={confirmOpen} handleClose={handleconfirmation}>
        <div className="flex flex-col gap-10">
          <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
            Are you sure that you want to delete
            <span className="text-bodyBB pl-1 pr-1 text-darkgrey">
              {editData?.lab_name}
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

export default Labs;
