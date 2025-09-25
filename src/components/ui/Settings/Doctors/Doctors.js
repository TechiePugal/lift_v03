import { useState } from "react";
import Button from "../../../common/buttons/Button";
import SearchInput from "../../../common/search";
import DoctorsTable from "./table";
import ModalWrapper from "../../../common/modal/ModalWrapper";
import AddDoctor from "./addDoctor/AddDoctor";
import FullScreeeSpinner from "../../../common/loading/FullScreee";
import EditDoctor from "./editDoctor/EditDoctor";
import NoData from "../../../common/nodata";
import { showErrorToast, showSuccessToast } from "../../../../utils/toaster";
import { deleteDoctor } from "../../../../api/settings/Doctors/doctors";
const Doctors = ({
  doctors,
  getAllDoctorsData,
  setSearchKey,
  searchKey,
  loading,
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
    console.log(params);
    setEditOpen(!editOpen);
    setEditData(params);
  };

  const handleDelete = () => {
    deleteDoctor(editData._id)
      .then((response) => {
        showSuccessToast("Deleted Successfully");
        handleconfirmation();
        getAllDoctorsData();
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
            placeholder={"Search by Doctor Name"}
          />
        </div>

        {/* Header add use Button */}
        <div className="lg:col-start-4">
          <Button
            onClick={handleClick}
            type={"primary"}
            className={"text-bodyBB"}
          >
            Add Doctor{" "}
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <FullScreeeSpinner />
        </div>
      ) : doctors?.length > 0 ? (
        <>
          {/* Doctor Listing Table */}
          <div>
            <DoctorsTable
              doctors={doctors}
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
      {/* Modal */}
      <ModalWrapper title={"Add Doctor"} open={open} handleClose={handleClick}>
        <AddDoctor
          getAllDoctorsData={getAllDoctorsData}
          handleClose={handleClick}
        />
      </ModalWrapper>

      {/* Modal */}
      <ModalWrapper
        title={"Edit Doctor"}
        open={editOpen}
        handleClose={handleEditClick}
      >
        <EditDoctor
          getAllDoctorsData={getAllDoctorsData}
          handleClose={handleEditClick}
          editData={editData}
        />
      </ModalWrapper>
      {/*  */}
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

export default Doctors;
