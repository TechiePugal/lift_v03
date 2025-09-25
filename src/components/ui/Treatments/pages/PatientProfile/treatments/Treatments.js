import React, { useState } from "react";
import Status from "../../../../../common/status/Status";
import Button from "../../../../../common/buttons/Button";
import ModalWrapper from "../../../../../common/modal/ModalWrapper";
import TreatmentDetails from "./TreatmentDetails/TreatmentDetails";
import AddTreatment from "./TreatmentDetails";
import EditTreatmentDetailsPage from "../../../../../../pages/Treatments/EditTreatmentDetails/EditTreatmentDetailsPage";

const Treatments = ({
  treatmentsData,
  patientId,
  patientProfile,
  getTreatmentsData,
}) => {
  const [open, setOpen] = useState(false);
  const [viewTreatment, setViewTreatment] = useState(false);
  const [editData, setEditData] = useState("");
  const [dataEditable, setDataEditable] = useState(false);

  const handleViewTreatment = (params) => {
    setViewTreatment(!viewTreatment);
    setEditData(params);
    setDataEditable(false);
  };

  const handleAdd = () => {
    setOpen(!open);
  };

  const handleEditable = () => {
    setDataEditable(!dataEditable);
  };

  const handleaAfterAdd = () => {
    getTreatmentsData();
    handleAdd();
  };

  return (
    <div>
      <div className="">
        <div className="shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 flex flex-wrap gap-2 justify-between items-center mb-1">
          <h1 className="text-bodyBB text-darkgrey">Treatments</h1>
          <div className="lg:w-[200px] w-full">
            <Button
              type={"primary"}
              className={"py-[8px] lg:py-[8px] text-bodyBB"}
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
        </div>
        {treatmentsData.length > 0 && (
          <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px]  max-h-[350px] overflow-auto">
            <div className="">
              <table className="w-full border-separate border-spacing-y-2 pl-2 pr-2 min-w-max ">
                <thead className="border-b sticky top-0 bg-white">
                  <tr className="text-bodyBB text-darkgrey text-center">
                    <th className="p-2 border-b-2">S. NO</th>
                    <th className=" border-b-2">Date</th>
                    <th className=" border-b-2">Treatment</th>
                  </tr>
                </thead>
                <tbody>
                  {treatmentsData.map((treatment, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => handleViewTreatment(treatment)}
                        className="text-center h-[52px] text-bodyRB text-darkgrey"
                      >
                        <td className="border-b-2">{treatment?.sno || "-"}</td>
                        <td className="border-b-2">{treatment?.date || "-"}</td>
                        <td className="border-b-2">
                          {treatment?.treatment_done_info || "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ModalWrapper open={open} handleClose={handleAdd} title={"Add Treatment"}>
        <div className="w-[98vw] md:w-[500px] lg:w-full">
          <AddTreatment
            patientId={patientId}
            patientProfile={patientProfile}
            callBack={handleaAfterAdd}
          />
        </div>
      </ModalWrapper>

      <ModalWrapper
        open={viewTreatment}
        handleClose={handleViewTreatment}
        title={"View Treatment"}
      >
        <div className="">
          <EditTreatmentDetailsPage
            treatmentId={editData?._id}
            patientId={patientId}
            patientProfile={patientProfile}
            handleViewTreatment={handleViewTreatment}
            viewOnly={true}
            editData={dataEditable}
            handleEditable={handleEditable}
            editTreatment={true}
          />
        </div>
      </ModalWrapper>
    </div>
  );
};

export default Treatments;
