import { useState } from "react";
import Button from "../../../common/buttons/Button";
import ModalWrapper from "../../../common/modal/ModalWrapper";
import SearchInput from "../../../common/search";
import AddLabsWorks from "./addLabsWorks/addLabsWorks";
import LabsWorksTable from "./table";
import FullScreeeSpinner from "../../../common/loading/FullScreee";
import EditLabsWorks from "./editLabWorks/editLabsWorks";
import NoData from "../../../common/nodata";
import { showErrorToast, showSuccessToast } from "../../../../utils/toaster";
import { deleteLabWorkData } from "../../../../api/settings/LabsWorks/labsWorks";
const LabsWorks = ({
  loading,
  labsWorks,
  getAllLabWorkData,
  setSearchKey,
  searchKey,
}) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleconfirmation = (params) => {
    setEditData(params);
    setConfirmOpen(!confirmOpen);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleEditClick = (params) => {
    setEditData(params);
    setEditOpen(!editOpen);
  };

  const handleDelete = () => {
    deleteLabWorkData(editData._id)
      .then((response) => {
        showSuccessToast("Deleted Successfully");
        getAllLabWorkData();
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
            placeholder={"Search by Lab Works"}
            searchKey={searchKey}
            handleChange={setSearchKey}
          />
        </div>

        {/* Header add use Button */}
        <div className="lg:col-start-4">
          <Button
            onClick={handleClick}
            type={"primary"}
            className={"text-bodyBB"}
          >
            Add Lab Work{" "}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <FullScreeeSpinner />
        </div>
      ) : // {/* Treatments Listing Table */}
      labsWorks.length >= 0 ? (
        <div>
          <LabsWorksTable
            handleEditClick={handleEditClick}
            labsWorks={labsWorks}
            handleconfirmation={handleconfirmation}
          />
        </div>
      ) : (
        <div className="h-[50vh]">
          <NoData />
        </div>
      )}

      {/*  */}
      <ModalWrapper
        open={open}
        handleClose={handleClick}
        title={"Add Lab Work"}
      >
        <AddLabsWorks
          getAllLabWorkData={getAllLabWorkData}
          handleClose={handleEditClick}
        />
      </ModalWrapper>
      {/*  */}
      <ModalWrapper
        open={editOpen}
        handleClose={handleEditClick}
        title={"Edit Lab Work"}
      >
        <EditLabsWorks
          editData={editData}
          getAllLabWorkData={getAllLabWorkData}
          handleClose={handleEditClick}
        />
      </ModalWrapper>

      <ModalWrapper open={confirmOpen} handleClose={handleconfirmation}>
        <div className="flex flex-col gap-10">
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

export default LabsWorks;
