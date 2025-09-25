import React, { useEffect, useRef, useState } from "react";
import DatePickerComp from "react-datepicker";
import Calendar from "../../icons/Calendar";
import "react-datepicker/dist/react-datepicker.css";
import RedClose from "../../icons/Red-Close";
import { IoCloseCircle } from "react-icons/io5";
import { formatDate } from "../../../utils/date";

// Regular expression to match the expected date format
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const DatePicker = ({
  placeholderText,
  className,
  startDate,
  onDateChange,
  error,
  disabled,
  handleClear,
  minDate,
}) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    // Check if startDate is a valid date format
    if (startDate && !isNaN(new Date(startDate))) {
      setDate(startDate);
    } else if (startDate === "") {
      setDate("");
    } else {
      // Handle the case where startDate is not a valid date format
      console.warn("Invalid date format for startDate:", startDate);
    }
  }, [startDate]);

  const datePickerRef = useRef(null);

  /** Calendar Icon Click */
  const handleCalendarClick = (e) => {
    e?.stopPropagation();
    if (!disabled) {
      const isOpen = datePickerRef.current.isCalendarOpen();
      datePickerRef.current.setOpen(!isOpen);
    }
  };

  const handleDateChange = (date) => {
    handleCalendarClick();
    onDateChange && onDateChange(date);
    setDate(date);
  };
  return (
    <div>
      {/* Date picker Section */}
      <div
        className={`w-full h-[54px] rounded-15  bg-white shadow-card flex items-center justify-between pl-3 pr-3 ${className}
        ${error ? "border-[1.5px] border-danger" : "border border-[#B9B9B9]"}
        `}
      >
        <div className="">
          <DatePickerComp
            wrapperClassName="datePicker"
            ref={datePickerRef}
            className="border-none text-bodyRB cursor-pointer outline-0 w-28 text-center mt-[2px] select-none bg-transparent"
            selected={date instanceof Date ? date : null}
            onChange={(date) => handleDateChange(date)}
            minDate={minDate ? minDate : ""}
            dateFormat="d MMM yyyy"
            placeholderText={placeholderText || "Select Date"}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            autoComplete="off"
            disabled={disabled}
          />
        </div>
        <div className="cursor-pointer flex items-center gap-1">
          <div onClick={handleCalendarClick}>
            <Calendar className={""} />
          </div>
          {handleClear && !disabled && (
            <div
              className="w-5 text-xl text-gray-500 mt-1"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              <IoCloseCircle />
            </div>
          )}
        </div>
      </div>
      {error && (
        <p className="text-danger text-smallLB mx-2 my-0.5 -mb-5 absolute">
          {error}
        </p>
      )}
      {/* Date picker Section End */}
    </div>
  );
};

export default DatePicker;
