import React, { useEffect, useRef, useState } from "react";
import Calendar from "../../icons/Calendar";
import SelectionInput from "../../common/input/Select";
import SearchInput from "../../common/search";
import { Link } from "react-router-dom";
import Button from "../../common/buttons/Button";
import DatePicker from "../../common/datepicker/DatePicker";
import MultiDatePicker from "../../common/datepicker/MultiDatePicker";

const Functionalities = ({
  startDate,
  searchKey,
  setSearchKey,
  status,
  setStatus,
  labList,
  setSelectedLab,
  selectedLab,
  setStartDate,
  setEndDate,
  endDate,
}) => {
  const datePickerRef = useRef(null);

  /** Calendar Icon Click */
  const handleCalendarClick = () => {
    datePickerRef.current.setOpen(true);
  };

  /** On Month Change */
  const handleMonthChange = (date) => {
    if (startDate.getMonth() !== date.getMonth()) {
      setStartDate(date);
    }
  };

  return (
    <div className="grid lg:grid-flow-col gap-2 h-fit">
      {/* Search */}
      <div className="col-span-4 md:col-span-3 lg:col-span-3">
        <SearchInput
          searchKey={searchKey}
          handleChange={(e) => setSearchKey(e)}
          placeholder={"Search by P.ID / Name / Mobile"}
        />
      </div>
      {/* Date picker Section */}
      <div className="col-span-4 lg:col-span-1">
        {/* <DatePicker placeholderText={"Filter by date"} /> */}
        <MultiDatePicker
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
      {/* Date picker Section End*/}

      {/* Filter by Status */}
      <div className="col-span-4 lg:col-span-1 h-[54px] min-w-[110px] ">
        <SelectionInput
          className={""}
          onChange={(e) => setStatus(e)}
          placeholder={status || "All Status"}
        >
          <div value="" className="">
            All Status
          </div>
          <div value="Ordered" className="">
            Ordered
          </div>
          <div value="Arrived" className="">
            Arrived
          </div>
          <div value="Delivered" className="">
            Delivered
          </div>
        </SelectionInput>
      </div>
      {/* Filter by Lab */}
      <div className="col-span-4 lg:col-span-1 h-[54px] min-w-[110px]">
        <SelectionInput
          placeholder={selectedLab || "All Labs"}
          onChange={(e) => setSelectedLab(e)}
        >
          <div value="" className="">
            All Labs
          </div>
          {labList?.map((lab, index) => (
            <div key={index} value={lab?.lab_name} className="">
              {lab?.lab_name}
            </div>
          ))}
        </SelectionInput>
      </div>

      <div className="grid lg:grid-flow-col col-span-4 gap-2">
        <Link to={"/create_lab_order"}>
          <Button type={"primary"} className={"text-heading2B"}>
            Create Lab Order
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Functionalities;
