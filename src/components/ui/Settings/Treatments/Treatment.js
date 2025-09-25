import { useState } from "react";
import Button from "../../../common/buttons/Button";
import ModalWrapper from "../../../common/modal/ModalWrapper";
import SearchInput from "../../../common/search";
import AddTreatment from "./addTreatment/AddTreatment";
import TreatmentsTable from "./table";
import FullScreeeSpinner from "../../../common/loading/FullScreee";
import EditTreatment from "./editTreatment/EditTreatment";
import NoData from "../../../common/nodata";
import { deleteTreatments } from "../../../../api/settings/Treatment/treatment";
import { showErrorToast, showSuccessToast } from "../../../../utils/toaster";
const Treatments = ({
  treatments,
  loading,
  getTreatments,
  setSearchKey,
  searchKey,
}) => {
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
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
    setEditOpen(!editopen);
  };

  const handleDelete = (params) => {
    deleteTreatments(editData._id)
      .then((response) => {
        showSuccessToast("Deleted Successfully");
        getTreatments();
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
            placeholder={"Search by Treatment Name"}
          />
        </div>

        {/* Header add use Button */}
        <div className="lg:col-start-4">
          <Button
            onClick={handleClick}
            type={"primary"}
            className={"text-bodyBB"}
          >
            Add Treatment{" "}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <FullScreeeSpinner />
        </div>
      ) : treatments?.length > 0 ? (
        <>
          {/* Treatments Listing Table */}
          <div>
            <TreatmentsTable
              treatments={treatments}
              handleEditClick={handleEditClick}
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
        handleClose={handleClick}
        title={"Add Treatment"}
      >
        <AddTreatment getTreatments={getTreatments} handleClose={handleClick} />
      </ModalWrapper>

      {/*  */}
      <ModalWrapper
        open={editopen}
        handleClose={handleEditClick}
        title={"Add Treatment"}
      >
        <EditTreatment
          getTreatments={getTreatments}
          handleClose={handleEditClick}
          editData={editData}
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

export default Treatments;
