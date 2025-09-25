import React, { useEffect, useState } from "react";
import ProfileSection from "../../../../common/profile/Profile";
import OrderStatus from "./order_status/OrderStatus";
import OrderItem from "./orderi_tem/OrderItem";
import Button from "../../../../common/buttons/Button";
import CheckMarkWhite from "../../../../icons/CheckMarkWhite";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { deleteLab, updateLab } from "../../../../../api/Labs";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import { getAllLabsWorks } from "../../../../../api/settings/LabsWorks/labsWorks";
import { getAllLabs } from "../../../../../api/settings/Labs";
import Whatsapp from "../../../../icons/Whatsapp";
import SMS from "../../../../icons/SMS";
import { formatDate } from "../../../../../utils/date";
import { openWhatsappMessager } from "../../../../../utils/opneWhatsapp";

const validationSchema = Yup.object().shape({
  lab: Yup.string().required("required"),
  work_type: Yup.string().required(" required"),
});

const LabOrderDetails = ({ details, viewOnly, handleViewLab }) => {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [labs, setLabs] = useState([]);
  const [labsWorks, setLabWorks] = useState([]);
  const [searchLabs, setSearchLabs] = useState("");
  const [searchLabWorks, setSearchLabWorks] = useState("");
  const [editOrder, setEditOrder] = useState(true);

  const handleEditOrder = () => {
    setEditOrder(!editOrder);
  };

  const handleconfirmation = () => {
    setOpen(!open);
  };

  const initialValues = {
    teeth1: details.teeth1,
    teeth2: details.teeth2,
    teeth3: details.teeth3,
    teeth4: details.teeth4,
    order_date: details?.order_date || "",
    arrival_date: details?.arrival_date || "",
    fixing_date: details?.fixing_date || "",
    lab: details.lab,
    work_type: details.work_type,
    status: details.status,
    notes: details.notes,
    sendWhatsapp: false,
    sendSms: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        patient_id: details.patient_id._id,
        order_date: formatDate(values?.order_date),
        arrival_date: formatDate(values?.arrival_date),
        fixing_date: formatDate(values?.fixing_date),
      };
      setLoading(true);
      updateLab(payload, details._id)
        .then((response) => {
          showSuccessToast("Lab Updated");
          /** viewOnly props from patient profile */
          if (viewOnly) handleViewLab();
          if (!viewOnly) handleEditOrder();
          /** Open Whatsapp for essentials subscription users */
          openWhatsappMessager(response.data?.data?.essentials_whatsapp_url);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
      console.log(payload, "05");
    },
  });

  const handleSendWhatsapp = () => {
    formik.setFieldValue("sendWhatsapp", !formik.values?.sendWhatsapp);
  };
  const handleSendSms = () => {
    formik.setFieldValue("sendSms", !formik.values?.sendSms);
  };

  const handleDeletePrescription = () => {
    setLoadingDelete(true);
    deleteLab(details._id)
      .then(() => {
        showSuccessToast("Lab Deleted");
        if (viewOnly) handleViewLab();
        if (!viewOnly) navigation("/labs");
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  const handleChangeStatus = () => {
    setChangeStatus(true);
  };

  const fetchData = (searchFunction, setDataFunction, searchKey) => {
    searchFunction(searchKey)
      .then((response) => {
        setDataFunction(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(getAllLabs, setLabs, searchLabs);
  }, [searchLabs]);

  useEffect(() => {
    fetchData(getAllLabsWorks, setLabWorks, searchLabWorks);
  }, [searchLabWorks]);

  useEffect(() => {
    if (details.patient_id) {
      formik.setFieldValue("sendSms", details?.patient_id?.sms);
      formik.setFieldValue("sendWhatsapp", details?.patient_id?.whatsapp);
    }
  }, [details.patient_id]);

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 pb-12"
      >
        <ProfileSection patientProfile={details.patient_id} />
        <OrderItem
          formik={formik}
          labs={labs}
          labsWorks={labsWorks}
          editOrder={editOrder}
          setSearchLabs={setSearchLabs}
          setSearchLabWorks={setSearchLabWorks}
        />
        <OrderStatus
          formik={formik}
          changeStatus={changeStatus}
          editOrder={editOrder}
        />
        <div className="">
          <div className="grid lg:grid-flow-col lg:col-span-2 gap-2 lg:col-start-2">
            {!editOrder ? (
              <div className="grid lg:justify-end lg:grid-cols-2 items-center">
                <div>
                  <div className="shadow-card rounded-15 min-h-[50px] lg:w-[400px] bg-white">
                    <div className="flex justify-center text-darkgrey capitalize">
                      <p>lab order status</p>
                    </div>
                    <div className=" flex  justify-center ">
                      <div className="flex items-center gap-1">
                        <input
                          onClick={handleSendWhatsapp}
                          checked={formik?.values?.sendWhatsapp}
                          type="checkbox"
                          className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                        />
                        <p className="text-bodyRB text-darkgrey">Whatsapp</p>
                        <div className="mt-1">
                          <Whatsapp />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          checked={formik?.values?.sendSms}
                          onClick={handleSendSms}
                          type="checkbox"
                          className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                        />
                        <p className="text-bodyRB text-darkgrey">SMS</p>
                        <div className="mt-1">
                          <SMS />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid lg:justify-end mt-5 lg:mt-0">
                  <div className="flex gap-3 ">
                    <Button
                      type={"secondary"}
                      action={"button"}
                      onClick={handleEditOrder}
                      className={"text-heading2B lg:!w-[150px] !h-[50px]"}
                    >
                      Cancel
                    </Button>
                    <Button
                      loading={loading}
                      type={"primary"}
                      className={"text-heading2B lg:!w-[150px] !h-[50px]"}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid lg:justify-end  mt-1">
                <div className="flex gap-3 ">
                  <Button
                    type={"danger"}
                    className={"text-heading2B lg:!w-[150px]"}
                    action={"button"}
                    onClick={handleconfirmation}
                    // loading={loadingDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    loading={loading}
                    action={"button"}
                    onClick={handleEditOrder}
                    type={"primary"}
                    className={"text-heading2B lg:!w-[150px]"}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      <ModalWrapper open={open} handleClose={handleconfirmation}>
        <div className="flex flex-col gap-10">
          <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
            Are you sure that you want to delete
            <span className="text-bodyBB pl-1 pr-1 text-darkgrey">
              {details.patient_id.name}
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
              onClick={handleDeletePrescription}
              type={"yes"}
              className={"text-heading2B"}
            >
              Yes
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default LabOrderDetails;
