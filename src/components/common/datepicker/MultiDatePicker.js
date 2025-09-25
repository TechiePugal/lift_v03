import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import Calendar from "../../icons/Calendar";
import { useLocation } from "react-router-dom";
import ArrowBackward from "../../icons/ArrowBackward";
import ArrowForward from "../../icons/ArrowForward";
import dayjs from "dayjs";
import Button from "../../common/buttons/Button";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

const MultiDatePicker = ({
  disabled,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  className,
  hideCalendar,
  arrow,
  isMonthly,
}) => {
  const location = useLocation();
  // Initialize state with parsed values from URL or default values
  const [dates, setDates] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const startDateString = searchParams.get("startDate");
    const endDateString = searchParams.get("endDate");

    // Use startDate if available, otherwise use URL parameter or default to current date
    const dateStart =
      startDate || (startDateString ? new Date(startDateString) : new Date());

    // Use endDate if available, otherwise use URL parameter or default to current date
    const dateEnd =
      endDate || (endDateString ? new Date(endDateString) : new Date());

    return [dateStart, dateEnd];
  });

  // Update state when startDate or endDate changes
  useEffect(() => {
    if (startDate && endDate)
      setDates([new Date(startDate), new Date(endDate)]);
  }, [startDate, endDate]);

  const datePickerRef = useRef();

  const handleCalendarClick = () => {
    if (datePickerRef.current) {
      if (datePickerRef.current.isOpen) {
        datePickerRef.current.closeCalendar();
      } else {
        datePickerRef.current.openCalendar();
      }
    }
  };

  const getMonthStartAndEndDate = (date, monthsToAdd = 0) => {
    // Ensure the input is a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Use dayjs for easier date manipulation
    const monthStart = dayjs(date)
      .add(monthsToAdd, "month")
      .startOf("month")
      .toDate();
    const monthEnd = dayjs(date)
      .add(monthsToAdd, "month")
      .endOf("month")
      .toDate();

    return { monthStart, monthEnd };
  };

  const handleArrowClick = (increment) => {
    // Use the current start date as the base date
    let newDate = new Date(dates[0]);
    newDate.setDate(newDate.getDate() + increment);

    if (isMonthly) {
      if (increment === -7) {
        // Get the start and end dates of the previous month
        const { monthStart, monthEnd } = getMonthStartAndEndDate(newDate, -0);

        // Update the state with the new month start and end dates
        setStartDate(monthStart);
        setEndDate(monthEnd);
        setDates([monthStart, monthEnd]);
      } else {
        // Get the start and end dates of the month after the next month
        const { monthStart, monthEnd } = getMonthStartAndEndDate(newDate, 1);

        // Update the state with the new month start and end dates
        setStartDate(monthStart);
        setEndDate(monthEnd);
        setDates([monthStart, monthEnd]);
      }
    } else {
      // For weekly date range
      const end = new Date(newDate);
      end.setDate(newDate.getDate() + 6);

      // Update the state with the new weekly start and end dates
      setStartDate(newDate);
      setEndDate(end);
      setDates([newDate, end]);
    }
  };

  const handleDateChange = (dates) => {
    if (dates[0] && dates[1]) {
      handleCalendarClick();
      setStartDate && setStartDate(dates[0]?.toDate?.().toString());
      setEndDate && setEndDate(dates[1]?.toDate?.().toString());
      console.log(dates[0]?.toDate?.().toString(), "Start Date");
      //   console.log(dates[1]?.toDate?.().toString(), "Start Date");
    }
  };

  const handleExtraButtions = (selectedOption) => {
    let startDate, endDate;

    switch (selectedOption) {
      case "today":
        startDate = endOfDay(new Date());
        endDate = startOfDay(new Date());
        break;
      case "thisWeek":
        startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Assuming Monday is the start of the week
        endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
        break;
      case "thisMonth":
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        break;
      default:
        // Default case, you can handle it as needed
        break;
    }

    if (startDate && endDate) {
      handleCalendarClick();
      setStartDate && setStartDate(startDate.toString());
      setEndDate && setEndDate(endDate.toString());
      console.log(startDate.toString(), "Start Date");
      console.log(endDate.toString(), "End Date");
    }
  };

  return (
    <div className="flex items-center">
      <div
        className={`w-full lg:w-fit h-[54px] rounded-15 border border-[#B9B9B9] bg-white shadow-card flex justify-center md:justify-normal items-center  pl-3 pr-3 ${className}
        `}
      >
        {arrow && (
          <div className="" onClick={() => handleArrowClick(-7)}>
            <ArrowBackward className={" cursor-pointer"} />
          </div>
        )}
        <DatePicker
          ref={datePickerRef}
          value={dates}
          onChange={handleDateChange}
          range
          numberOfMonths={1}
          showOtherDays
          dateSeparator=" - "
          format={isMonthly ? `MMM YYYY` : `D MMM YYYY`}
          style={{
            height: "40px",
            width: "230px",
            borderRadius: "8px",
            border: "5px",
            fontSize: "15px",
            padding: "3px 10px",
            outline: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <div className="flex justify-around gap-2 h-10 p-2 ">
            <Button
              type={"secondary"}
              className={"!py-[1px] text-bodySEBB"}
              onClick={() => handleExtraButtions("today")}
            >
              Today
            </Button>
            <Button
              type={"secondary"}
              className={"!py-[1px] text-bodySEBB"}
              onClick={() => handleExtraButtions("thisWeek")}
            >
              Week
            </Button>
            <Button
              className={"!py-[1px] text-bodySEBB"}
              type={"secondary"}
              onClick={() => handleExtraButtions("thisMonth")}
            >
              Month
            </Button>
          </div>
        </DatePicker>
        {arrow && (
          <div onClick={() => handleArrowClick(7)}>
            <ArrowForward className={" cursor-pointer mr-2"} />
          </div>
        )}
        {!hideCalendar && (
          <div className="cursor-pointer" onClick={handleCalendarClick}>
            <Calendar className={""} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiDatePicker;
