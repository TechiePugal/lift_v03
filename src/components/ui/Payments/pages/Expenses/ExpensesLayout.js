import React, { useState } from "react";
import SearchInput from "../../../../common/search";
import DatePicker from "../../../../common/datepicker/DatePicker";
import Button from "../../../../common/buttons/Button";
import ExpenseTable from "./table";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import AddExpense from "./add_expenses/AddExpense";
import NoData from "../../../../common/nodata";
import FullScreeeSpinner from "../../../../common/loading/FullScreee";
import EditExpense from "./editExpense/EditExpense";
import MultiDatePicker from "../../../../common/datepicker/MultiDatePicker";

const ExpensesLayout = ({
  utilities,
  loading,
  searchKey,
  setSearchKey,
  getUtilityData,
  setStartDate,
  setEndDate,
  endDate,
  startDate
}) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  const handleEditClick = (params) => {
    setEditData(params);
    setEditOpen(!editOpen);
  };

  const handleModalOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="grid grid-flow-row gap-3">
        <div className="grid lg:grid-cols-4 gap-3">
          <div className="lg:col-span-1">
            <SearchInput
              handleChange={(e) => {
                setSearchKey(e);
              }}
              placeholder={"Search"}
            />
          </div>
          <MultiDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          <div className="grid md:col-start-4">
          <Button
            onClick={handleModalOpen}
            type={"primary"}
            className={"py-[8px] text-bodyBB"}
          >
            Add Expense
          </Button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <FullScreeeSpinner />
          </div>
        ) : utilities?.length >= 0 ? (
          <>
            {/* List Table */}
            <ExpenseTable utilities={utilities} handleEditClick={handleEditClick} />
          </>
        ) : (
          <div className="">
            <NoData />
          </div>
        )}
      </div>
      <ModalWrapper
        handleClose={handleModalOpen}
        open={open}
        title={"Add Expense (Income or Expense)"}
      >
        <AddExpense
          getUtilityData={getUtilityData}
          handleClose={handleModalOpen}
        />
      </ModalWrapper>
      <ModalWrapper
        handleClose={handleEditClick}
        open={editOpen}
        title={"Edit Expense (Income or Expense)"}
      >
        <EditExpense
          editData={editData}
          getUtilityData={getUtilityData}
          handleClose={handleEditClick}
        />
      </ModalWrapper>
    </div>
  );
};

export default ExpensesLayout;
