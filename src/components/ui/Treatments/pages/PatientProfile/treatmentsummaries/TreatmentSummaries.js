import React, { useState } from "react";
import Button from "../../../../../common/buttons/Button";
import CheckMarkWhite from "../../../../../icons/CheckMarkWhite";
import ModalWrapper from "../../../../../common/modal/ModalWrapper";
import DatePicker from "../../../../../common/datepicker/DatePicker";
import TextAreaBox from "../../../../../common/input/TextAreaBox";
import { useFormik } from "formik";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../../utils/toaster";
import {
  addTreatmentSummary,
  deleteTreatmentSummary,
  updateTreatmentSummary,
} from "../../../../../../api/Treatments";
import * as Yup from "yup";
import { formatDate } from "../../../../../../utils/date";
import ViewSummary from "./ViewSummary";
import {
  printTreatmentSummaries,
  sendMessageTreatmentSummaries,
} from "../../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import { openWhatsappMessager } from "../../../../../../utils/opneWhatsapp";

const validationSchema = Yup.object().shape({
  content: Yup.string().required(" required"),
});

const TreatmentSummaries = ({
  treatmentSummaries,
  id,
  getTreatmentSummariesData,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  // Initialize loading states array
  const [printLoadingStates, setPrintLoadingStates] = useState(
    Array(treatmentSummaries?.length).fill(false)
  );
  const [communicationLoading, setCommunicationLoading] = useState(
    Array(treatmentSummaries?.length).fill(false)
  );

  const handleAdd = () => {
    setOpen(!open);
  };

  const handleconfirmation = (params) => {
    setEditData(params);
    setConfirmOpen(!confirmOpen);
  };

  const handleEdit = (params) => {
    setEditData(params);
    setOpenEdit(!openEdit);
  };

  const formik = useFormik({
    initialValues: {
      patient_id: id,
      date: new Date(),
      content: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      addTreatmentSummary(values)
        .then((response) => {
          showSuccessToast("Treatment Summary Added");
          getTreatmentSummariesData();
        })
        .catch((error) => {
          console.log(error);
          showErrorToast(error, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleDeletePrescription = () => {
    deleteTreatmentSummary(editData?._id)
      .then(() => {
        showSuccessToast("Summary Deleted");
        getTreatmentSummariesData();
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {});
  };

  const handlePrintSummary = (summary, index) => {
    // Copy the loading states array to avoid mutating the state directly
    const updatedLoadingStates = [...printLoadingStates];

    // Set loading state to true for the current item
    updatedLoadingStates[index] = true;

    // Update the loading states array
    setPrintLoadingStates(updatedLoadingStates);
    printTreatmentSummaries(summary?._id)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        // Set loading state to false for all indices
        const updatedStatesFalse = Array(updatedLoadingStates[index]).fill(
          false
        );
        setPrintLoadingStates(updatedStatesFalse);
      });
  };

  const sendMessage = (id, index) => {
    // Copy the loading states array to avoid mutating the state directly
    const updatedLoadingStates = [...communicationLoading];

    // Set loading state to true for the current item
    updatedLoadingStates[index] = true;

    // Update the loading states array
    setCommunicationLoading(updatedLoadingStates);
    const payload = {
      summaryId: id,
      whatsapp: "true",
      message: "true",
    };
    sendMessageTreatmentSummaries(payload)
      .then((response) => {
        showSuccessToast("Success!");
        getTreatmentSummariesData();
        /** Open Whatsapp for essentials subscription users */
        openWhatsappMessager(response.data?.essentials_whatsapp_url);
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        // Set loading state to false for all indices
        const updatedStatesFalse = Array(updatedLoadingStates[index]).fill(
          false
        );
        setCommunicationLoading(updatedStatesFalse);
      });
  };

  return (
    <div>
      <div className="">
        <div className="shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 flex flex-wrap gap-2 justify-between items-center mb-1">
          <h1 className="text-bodyBB text-darkgrey">Treatment Summaries</h1>
          <div className="lg:w-[300px] w-full">
            <Button
              type={"primary"}
              className={"!py-[7px] lg:py-[10px] text-bodyBB"}
              onClick={handleAdd}
            >
              Add Treatment Summary
            </Button>
          </div>
        </div>
        {treatmentSummaries?.length > 0 && (
          <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px]  max-h-[350px] overflow-auto">
            <div className="">
              <table className="w-full border-separate border-spacing-y-2 pl-2 pr-2 min-w-max ">
                <thead className="border-b">
                  <tr className="text-bodyBB text-darkgrey text-center">
                    <th className="p-2 border-b-2">Sl No</th>
                    <th className=" border-b-2">Date</th>
                    <th className=" border-b-2">View</th>
                    <th className=" border-b-2">Print</th>
                    <th className=" border-b-2">Delete</th>
                    <th className=" border-b-2">Communication</th>
                  </tr>
                </thead>
                <tbody>
                  {treatmentSummaries?.map((summary, index) => {
                    return (
                      <tr className="text-center h-[60px]" key={index}>
                        <td className="border-b-2">{index + 1}</td>
                        <td className="border-b-2">{summary?.date || "-"}</td>
                        <td className="border-b-2 pl-5 pr-5 min-w-[100px] w-[230px]">
                          <Button
                            onClick={() => handleEdit(summary)}
                            type={"primary"}
                            className={" !py-[7px]"}
                            action={"button"}
                          >
                            View
                          </Button>
                        </td>
                        <td className="border-b-2 pl-5 pr-5 min-w-[100px] w-[230px]">
                          <Button
                            action={"button"}
                            className={
                              "bg-pink-gradient  text-white !py-[7px] "
                            }
                            onClick={() => handlePrintSummary(summary, index)}
                            loading={printLoadingStates[index]}
                          >
                            Print
                          </Button>
                        </td>
                        <td className="border-b-2 pl-5 pr-5 min-w-[100px] w-[230px]">
                          <Button
                            action={"button"}
                            type={"danger"}
                            onClick={() => handleconfirmation(summary)}
                            className={" !py-[7px]"}
                          >
                            Delete
                          </Button>
                        </td>
                        <td className="border-b-2 w-[250px]">
                          <Button
                            onClick={() => sendMessage(summary?._id, index)}
                            type={"yes"}
                            action={"button"}
                            className={"!py-[7px]"}
                            loading={communicationLoading[index]}
                          >
                            {summary?.sendWhatsapp && <CheckMarkWhite />}
                            Send treatment summary
                          </Button>
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

      {/* Add Modal */}
      <ModalWrapper
        title={"Add Treatment Summary"}
        open={open}
        handleClose={handleAdd}
      >
        <form
          onSubmit={formik.handleSubmit}
          className=" md:w-[500px] lg:w-[650px] min-h-[300px] -mt-3"
        >
          <div className="w-[200px] ">
            <p className="text-bodyRB text-darkgrey">Date</p>
            <DatePicker
              className={"!h-[40px]"}
              startDate={new Date(formik.values?.date)}
              onDateChange={(e) => formik.setFieldValue("date", formatDate(e))}
            />
          </div>
          <div className=" mt-2">
            <p className="text-bodyRB text-darkgrey">Treatment Summary</p>
            <TextAreaBox
              className={"h-[200px]"}
              placeholder={"Enter Summary"}
              name={"content"}
              onChange={formik.handleChange}
              error={formik.errors.content && formik.touched.content}
            />
          </div>
          <div className="flex justify-end mt-5">
            <div className="flex w-[300px]">
              <Button
                action={"button"}
                type={"secondary"}
                className={"!py-[7px]"}
                onClick={handleAdd}
              >
                Close
              </Button>
              <Button
                loading={loading}
                type={"primary"}
                className={"!py-[7px]"}
              >
                Add
              </Button>
            </div>
          </div>
        </form>
      </ModalWrapper>

      {/* Edit Modal */}
      <ModalWrapper
        title={"View Treatment Summary"}
        open={openEdit}
        handleClose={handleEdit}
      >
        <ViewSummary
          editData={editData}
          getTreatmentSummariesData={getTreatmentSummariesData}
          handleEdit={handleEdit}
        />
      </ModalWrapper>

      {/* Delect Modal */}
      <ModalWrapper open={confirmOpen} handleClose={handleconfirmation}>
        <div className="flex flex-col gap-10">
          <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
            Are you sure that you want to delete this smmary
            <span className="text-bodyBB pl-1 pr-1 text-darkgrey">{""}</span>?
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
              onClick={handleDeletePrescription}
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

export default TreatmentSummaries;
