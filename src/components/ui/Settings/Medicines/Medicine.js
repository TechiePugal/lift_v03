import { useState } from "react";
import Button from "../../../common/buttons/Button";
import SearchInput from "../../../common/search";
import MedicinesTable from "./table";
import ModalWrapper from "../../../common/modal/ModalWrapper";
import AddMedicines from "./addMedicines/AddMedicines";
import EditMedicines from "./editMedicine/EditMedicine";
import FullScreeeSpinner from "../../../common/loading/FullScreee";
import NoData from "../../../common/nodata";
import { showErrorToast, showSuccessToast } from "../../../../utils/toaster";
import { deleteMedicine } from "../../../../api/settings/Medicines/medicines";
const Medicines = ({
  loading,
  medicines,
  getAllMedicinesData,
  setSearchKey,
  searchKey,
}) => {
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
    deleteMedicine(editData._id)
      .then((response) => {
        showSuccessToast("Deleted Successfully");
        getAllMedicinesData();
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
            placeholder={"Search by Medicine Name"}
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
            Add Medicines{" "}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <FullScreeeSpinner />
        </div>
      ) : // {/* Treatments Listing Table */}
      medicines?.length > 0 ? (
        <div>
          <MedicinesTable
            handleEditClick={handleEditClick}
            handleconfirmation={handleconfirmation}
            medicines={medicines}
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
        title={"Add Medicines"}
      >
        <AddMedicines
          getAllMedicinesData={getAllMedicinesData}
          handleClose={handleClick}
        />
      </ModalWrapper>

      {/*  */}
      <ModalWrapper
        open={editOpen}
        handleClose={handleEditClick}
        title={"Edit Medicines"}
      >
        <EditMedicines
          editData={editData}
          handleClose={handleEditClick}
          getAllMedicinesData={getAllMedicinesData}
        />
      </ModalWrapper>

      <ModalWrapper open={confirmOpen} handleClose={handleconfirmation}>
        <div className="flex flex-col gap-10">
          <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
            Are you sure that you want to delete
            <span className="text-bodyBB pl-1 pr-1 text-darkgrey">
              {editData?.medicine}
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

export default Medicines;
