import React, { useEffect, useState } from "react";
import AppointmentsTable from "./table";
import CardSmall from "../../common/card/card-small";
import Functionalities from "./Functionalities/Functionalities";
import Calendar from "./Calendar/Calendar";
import ModalWrapper from "../../common/modal/ModalWrapper";
import CreateAppointment from "./CreateAppointment/Bulk/CreateBulkAppointment";
import CheckIn from "./Checkin/index";
import CheckOut from "./CheckOut";
import WeeklyView from "./WeeklyView/WeeklyView";
import ViewAppointment from "./ViewAppointment/ViewAppointment";
import EditAppointment from "./EditAppointment/EditAppointment";
import FullScreeeSpinner from "../../common/loading/FullScreee";
import NoData from "../../common/nodata";
import CreateSingleAppointment from "./CreateAppointment/Single/CreateSingleAppointment";
import { updateAppointment } from "../../../api/Appointments";
import { showErrorToast, showSuccessToast } from "../../../utils/toaster";

const AppointmentsLayout = ({
  appointments,
  searchKey,
  setSearchKey,
  status,
  setStatus,
  loading,
  doctors,
  selectedDoctor,
  setSelectedDoctor,
  getAppointmentsData,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  createAppoinemtne,
  setCreateDirectAppoinemtne,
  newPatientId,
  setNewPatientId,
  statusCounts,
  treatments,
  setSearchTreatment,
  setSearchDoctors,
}) => {
  // const [startDate, setStartDate] = useState(new Date());
  const [createAppointment, setCreateAppointment] = useState(false);
  const [checkInConfirmation, setCheckInConfirmation] = useState(false);
  const [checkOutConfirmation, setCheckOutConfirmation] = useState(false);
  const [viewAppointment, setViewAppointment] = useState(false);
  const [editAppointment, setEditAppointment] = useState(false);
  const [calendarView, setCalendarView] = useState("Calendar View");
  const [editData, setEditData] = useState("");
  const [loadingCheckIn, setLoadingCheckIn] = useState(false);
  const [loadingCheckOut, setLoadingCheckOut] = useState(false);
  const [createAppointmentType, setCreateAppointmentType] =
    useState("Appointment");
  const [editConfirm, setEditConfirm] = useState(false);

  const handleCreateAppointmentClick = () => {
    setCreateAppointment(!createAppointment);
    setNewPatientId("");
    setCreateDirectAppoinemtne(false);
  };

  const handleCheckIn = (params) => {
    setEditData(params);
    setCheckInConfirmation(!checkInConfirmation);
  };
  const handleCheckOut = (params) => {
    setEditData(params);
    setCheckOutConfirmation(!checkOutConfirmation);
  };

  const handleViewAppointment = (params) => {
    setEditData(params);
    setEditConfirm(false);
    setViewAppointment(!viewAppointment);
  };

  const handleEditAppointment = () => {
    setViewAppointment(false);
    setEditAppointment(!editAppointment);
  };
  useEffect(() => {
    createAppoinemtne && setCreateAppointment(true);
  }, []);

  const hangleConfirmCheckIn = () => {
    const payload = {
      checkIn_status: "true",
      status: "Check In",
    };
    setLoadingCheckIn(true);
    updateAppointment(payload, editData._id)
      .then(() => {
        showSuccessToast("Checked-In");
        handleCheckIn();
        getAppointmentsData();
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoadingCheckIn(false);
      });
  };
  const hangleConfirmCheckOut = () => {
    const payload = {
      out_status: "true",
      status: "Completed",
    };
    setLoadingCheckOut(true);
    updateAppointment(payload, editData._id)
      .then(() => {
        showSuccessToast("Checked-Out");
        handleCheckOut();
        getAppointmentsData();
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setLoadingCheckOut(false);
      });
  };

  return (
    <div className="mb-[50px]">
      {/* Cards */}
      <div className=" grid grid-cols-2 lg:grid-cols-4  gap-2">
        <CardSmall
          label={"Scheduled Appointment"}
          value={statusCounts?.scheduled || 0}
          className={" bg-primary text-bodySBB"}
          valueColor={""}
        />
        <CardSmall
          label={"Upcoming"}
          value={statusCounts?.upcoming || 0}
          className={" bg-danger text-bodySBB"}
          valueColor={""}
        />
        <CardSmall
          label={"Checked-In"}
          value={statusCounts?.checkIn || 0}
          className={" bg-warning text-bodySBB"}
          valueColor={""}
        />
        <CardSmall
          label={"Completed"}
          value={statusCounts?.completed || 0}
          className={" bg-success text-bodySBB"}
          valueColor={""}
        />
      </div>
      {/* Functionalities */}
      <div className="mt-6 mb-5">
        <Functionalities
          startDate={startDate}
          endDate={endDate}
          setStatus={setStatus}
          status={status}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          createAppointmentClick={handleCreateAppointmentClick}
          setCalendarView={setCalendarView}
          calendarView={calendarView}
          doctors={doctors}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          setCreateAppointmentType={setCreateAppointmentType}
          createAppointmentType={createAppointmentType}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <FullScreeeSpinner />
        </div>
      ) : appointments?.length >= 0 ? (
        <>
          {/* List Table */}
          {calendarView === "Calendar View" && (
            <AppointmentsTable
              handleCheckIn={handleCheckIn}
              handleCheckOut={handleCheckOut}
              handleViewAppointment={handleViewAppointment}
              appointments={appointments}
            />
          )}
          {/* Calendar View */}
          {calendarView === "Monthly View" && (
             <div className="pb-10">
               <Calendar
                 startDate={startDate}
                 appointments={appointments}
                 setStartDate={setStartDate}
                 setEndDate={setEndDate}
                 setCalendarView={setCalendarView}
               />
             </div>
          )}
          {/* Weekly View */}
          {calendarView === "Weekly View" && (
            <div className="pb-10"> 
              <WeeklyView
                startDate={startDate}
                appointments={appointments}
                handleViewAppointment={handleViewAppointment}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setCalendarView={setCalendarView}
              />
            </div>
          )}
        </>
      ) : (
        <div className="">
          <NoData />
        </div>
      )}

      {/* Create Single Appointment */}
      {createAppointmentType === "Appointment" && (
        <ModalWrapper
          open={createAppointment}
          handleClose={handleCreateAppointmentClick}
          title={"Create Appointment"}
        >
          <CreateSingleAppointment
            handleCreateAppointmentClick={handleCreateAppointmentClick}
            getAppointmentsData={getAppointmentsData}
            doctors={doctors}
            treatments={treatments}
            setSearchTreatment={setSearchTreatment}
            setSearchDoctors={setSearchDoctors}
            patientInfo={{ _id: newPatientId }}
            /** From url */
            directAppiontment={createAppoinemtne}
          />
        </ModalWrapper>
      )}

      {/* Create Bulk Appointment */}
      {createAppointmentType === "Bulk Appointment" && (
        <ModalWrapper
          open={createAppointment}
          handleClose={handleCreateAppointmentClick}
          title={"Create Bulk Appointment"}
        >
          <CreateAppointment
            doctors={doctors}
            treatments={treatments}
            setSearchTreatment={setSearchTreatment}
            setSearchDoctors={setSearchDoctors}
            handleCreateAppointmentClick={handleCreateAppointmentClick}
            getAppointmentsData={getAppointmentsData}
          />
        </ModalWrapper>
      )}

      {/* Check In */}
      <ModalWrapper
        open={checkInConfirmation}
        handleClose={handleCheckIn}
        title={"Check-In"}
      >
        <CheckIn
          name={editData?.patient_id?.name}
          handleRejectCheckIn={handleCheckIn}
          hangleConfirmCheckIn={hangleConfirmCheckIn}
          loadingCheckIn={loadingCheckIn}
        />
      </ModalWrapper>

      {/* Check Out */}
      <ModalWrapper
        open={checkOutConfirmation}
        handleClose={handleCheckOut}
        title={"Check-Out"}
      >
        <CheckOut
          hangleConfirmCheckOut={hangleConfirmCheckOut}
          handleRejectCheckOut={handleCheckOut}
          loadingCheckOut={loadingCheckOut}
          name={editData?.patient_id?.name}
        />
      </ModalWrapper>

      {/* View Appointment */}
      {/* <ModalWrapper
        open={viewAppointment}
        handleClose={handleViewAppointment}
        title={"ViewAppointment"}
      >
        <ViewAppointment
          editAppointment={handleEditAppointment}
          getAppointmentsData={getAppointmentsData}
          handleViewAppointment={handleViewAppointment}
          editData={editData}
        />
      </ModalWrapper> */}

      {/* Edit Appointment */}

      <ModalWrapper
        open={viewAppointment}
        handleClose={handleViewAppointment}
        title={!editConfirm ? "ViewAppointment" : "EditAppointment"}
      >
        <EditAppointment
          editData={editData}
          doctors={doctors}
          treatments={treatments}
          handleEditAppointment={handleViewAppointment}
          getAppointmentsData={getAppointmentsData}
          editConfirm={editConfirm}
          setEditConfirm={setEditConfirm}
          setSearchTreatment={setSearchTreatment}
          setSearchDoctors={setSearchDoctors}
        />
      </ModalWrapper>
    </div>
  );
};

export default AppointmentsLayout;
