import React, { useState } from "react";
import Button from "../../../../../common/buttons/Button";
import ModalWrapper from "../../../../../common/modal/ModalWrapper";
import CreatePrescription from "../../../../Prescriptions/pages/CreatePrescription";
import PrescriptionDetailsPage from "../../../../../../pages/Prescriptions/PrescriptionDetails";

const Prescriptions = ({ prescriptions, profile, getPrescriptionData }) => {
  const [open, setOpen] = useState(false);
  const [viewPrescription, setViewPrescription] = useState(false);
  const [editData, setEditData] = useState("");

  const handleViewPrescription = (params) => {
    setViewPrescription(!viewPrescription);
    setEditData(params);
    // if (editData) getPrescriptionData();
  };

  const handleCreate = () => {
    setOpen(!open);
  };
  return (
    <div className="">
      <div className="shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 flex flex-wrap gap-2 justify-between items-center mb-1">
        <h1 className="text-bodyBB text-darkgrey">Prescriptions</h1>
        <div className="lg:w-[200px] w-full">
          <Button
            type={"primary"}
            className={"py-[8px] lg:py-[10px] text-bodyBB"}
            action={"button"}
            onClick={() => {
              handleCreate();
            }}
          >
            Create Prescription
          </Button>
        </div>
      </div>
      {prescriptions?.length > 0 && (
        <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px]  max-h-[350px] overflow-auto">
          <div className="">
            <table className="w-full border-separate border-spacing-y-2 pl-2 pr-2 min-w-max ">
              <thead className="border-b sticky top-0 bg-white">
                <tr className="text-bodyBB text-darkgrey text-center">
                  <th className="p-2 border-b-2">Presc. ID</th>
                  <th className=" border-b-2">Date</th>
                  <th className=" border-b-2"> Patient Name</th>
                  <th className=" border-b-2"> Mobile Number</th>
                  {/* <th className=" border-b-2">Doctor’s Name</th> */}
                </tr>
              </thead>
              <tbody>
                {prescriptions?.map((Prescription, index) => {
                  return (
                    <tr
                      onClick={() => handleViewPrescription(Prescription)}
                      key={index}
                      className="text-center h-[55px] text-bodyRB text-darkgrey"
                    >
                      <td className="border-b-2">
                        {Prescription?.prescId || "-"}
                      </td>
                      <td className="border-b-2">
                        {Prescription?.date || "-"}
                      </td>
                      <td className="border-b-2 ">
                        {Prescription?.name || "-"}
                      </td>
                      <td className="border-b-2  pl-5">
                        {Prescription?.phone || "-"}
                      </td>
                      {/* <td className="border-b-2">{"-"}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ModalWrapper
        open={open}
        title={"Create Prescription"}
        handleClose={handleCreate}
      >
        <CreatePrescription
          profile={profile}
          profilePage={true}
          callBackFunction={getPrescriptionData}
          hideSearch={true}
        />
      </ModalWrapper>

      <ModalWrapper
        open={viewPrescription}
        title={"View Prescription"}
        handleClose={handleViewPrescription}
      >
        <PrescriptionDetailsPage prescriptionId={editData?._id} getPrescriptionDataList={getPrescriptionData} viewOnly={true} handleViewPrescription={handleViewPrescription} />
      </ModalWrapper>
    </div>
  );
};

export default Prescriptions;
