import React, { useEffect, useRef, useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../../icons/Calendar";
import ArrowBackward from "../../../icons/ArrowBackward";
import ArrowForward from "../../../icons/ArrowForward";
import SelectionInput from "../../../common/input/Select";
import Button from "../../../common/buttons/Button";
import { formatDateOneWeekRange } from "../../../../utils/date";
import SearchInput from "../../../common/search";
import { Link } from "react-router-dom";
import MultiDatePicker from "../../../common/datepicker/MultiDatePicker";
import DatePicker from "../../../common/datepicker/DatePicker";

const Functionalities = ({
  startDate,
  setStartDate,
  handleRegister,
  generatingId,
  setSearchKey,
  searchKey,
}) => {
  return (
    <div className="grid lg:grid-flow-col gap-2 h-fit">
      {/* Search */}
      <div className=" md:col-span-1 col-span-4">
        <SearchInput
          handleChange={(e) => {
            setSearchKey(e);
          }}
          searchKey={searchKey}
          placeholder={"Search by P.ID / Name / Mobile"}
        />
      </div>
      {/* Date picker Section */}
      <div className="lg:w-[180px] h-[54px]  col-span-4 md:col-span-1 lg:col-span-1">
        <div className="">
          <DatePicker
            startDate={new Date(startDate)}
            onDateChange={(date) => setStartDate(date)}
            // onMonthChange={handleMonthChange}
          />
        </div>
        {/* <MultiDatePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        /> */}
      </div>
      {/* Date picker Section End*/}

      {/* All Doctors */}

      {/* All Doctors End*/}
      <div className="grid md:grid-flow-col col-span-4 md:col-span-1 gap-2">
        <Button
          type={"primary"}
          loading={generatingId}
          className={"text-heading2B !h-[54px]"}
          onClick={handleRegister}
        >
          New Registeration
        </Button>
        <Link to={"/patient_database"}>
          <Button type={"pink"} className={"text-heading2B !h-[54px]"}>
            Patient Database
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Functionalities;
