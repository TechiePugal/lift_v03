import React, { useState } from "react";
import Status from "../../../../../common/status/Status";
import Button from "../../../../../common/buttons/Button";
import ModalWrapper from "../../../../../common/modal/ModalWrapper";
import CreateLabOrder from "../../../../Labs/pages/CreateLabOrder";
import { formatDate } from "../../../../../../utils/date";
import LabOrderDetailsPage from "../../../../../../pages/Labs/LabOrderDetails/LabOrderDetails";

const LabOrders = ({ labs, patientProfile, getAllLabs }) => {
  const [open, setOpen] = useState(false);
  const [viewLab, setviewLab] = useState(false);
  const [editData, setEditData] = useState("");

  const handleViewLab = (params) => {
    setviewLab(!viewLab);
    setEditData(params);
    if (viewLab) getAllLabs();
  };

  const handleCreateClick = (apiCall) => {
    if (apiCall) {
      getAllLabs();
    }
    setOpen(!open);
  };
  return (
    <div>
      <div className="">
        <div className="shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 flex flex-wrap gap-2 justify-between items-center mb-1">
          <h1 className="text-bodyBB text-darkgrey">Lab Orders</h1>
          <div className="lg:w-[200px] w-full">
            <Button
              type={"primary"}
              className={"py-[8px] lg:py-[10px] text-bodyBB"}
              action={"button"}
              onClick={() => handleCreateClick(false)}
            >
              Create Lab Order
            </Button>
          </div>
        </div>
        {labs?.length > 0 && (
          <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px]  max-h-[350px] overflow-auto">
            <div className="">
              <table className="w-full border-separate border-spacing-y-2 pl-2 pr-2 min-w-max ">
                <thead className="border-b sticky top-0 bg-white">
                  <tr className="text-bodyBB text-darkgrey text-center">
                    <th className="p-2 border-b-2">S. NO</th>
                    <th className=" border-b-2">Order Date</th>
                    <th className=" border-b-2">Lab</th>
                    <th className=" border-b-2"> Work</th>
                    <th className=" border-b-2">Arrival Date</th>
                    <th className=" border-b-2">Fixed On</th>
                    {/* <th className=" border-b-2">Amount Paid</th>
                  <th className=" border-b-2">Balance</th> */}
                    <th className=" border-b-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {labs?.map((lab, index) => {
                    return (
                      <tr
                        onClick={() => handleViewLab(lab)}
                        key={index}
                        className="text-center h-[55px] text-bodyRB text-darkgrey"
                      >
                        <td className="border-b-2">{lab?.sno || "-"}</td>
                        <td className="border-b-2">{lab?.orderDate || "-"}</td>
                        <td className="border-b-2 ">{lab?.lab || "-"}</td>
                        <td className="border-b-2 text-left pl-5">
                          {lab?.work_type || "-"}
                        </td>
                        <td className="border-b-2">
                          {formatDate(lab?.arrival_date) || "-"}
                        </td>
                        <td className="border-b-2">
                          {formatDate(lab?.fixing_date) || "-"}
                        </td>

                        <td className="border-b-2">
                          <Status
                            type={
                              lab?.status === "Ordered"
                                ? "upcoming"
                                : lab?.status === "Arrived"
                                ? "checked-in"
                                : lab?.status === "Delivered"
                                ? "completed"
                                : "completed" // Default type if none of the above conditions match
                            }
                            className="text-bodySRB py-[10px]"
                          >
                            {lab.status || "-"}
                          </Status>
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
      <ModalWrapper
        open={open}
        handleClose={handleCreateClick}
        title={"Create Lab Order"}
      >
        <div className="lg:w-[1100px]">
          <CreateLabOrder
            profile={patientProfile}
            callBack={handleCreateClick}
            hideSearch={true}
          />
        </div>
      </ModalWrapper>

      <ModalWrapper
        open={viewLab}
        handleClose={handleViewLab}
        title={"View Lab Order"}
      >
        <div className="lg:w-[1100px]">
          <LabOrderDetailsPage
            labId={editData?._id}
            viewOnly={true}
            handleViewLab={handleViewLab}
          />
        </div>
      </ModalWrapper>
    </div>
  );
};

export default LabOrders;
