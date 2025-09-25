import React from "react";
import RenderCalendarDays, {
  renderCalendarDays,
  renderDaysOfWeek,
} from "../../../../utils/calendar";

const Calendar = ({
  startDate,
  appointments,
  setStartDate,
  setEndDate,
  setCalendarView,
}) => {
  const handleSelect = (e, appointmentsForDay) => {
    if (appointmentsForDay?.length > 0) {
      setStartDate(e);
      setEndDate(e);
      setCalendarView("Calendar View");
    }
  };
  return (
    <div>
      <div className="grid shadow-sm">
        <div className="grid grid-cols-7 shadow-card rounded-tl-15 rounded-tr-15 bg-secondary pt-3 pb-3">
          {renderDaysOfWeek()}
        </div>
        <div className="grid grid-cols-7">
          <RenderCalendarDays
            handleSelectDate={handleSelect}
            startDate={startDate}
            appointments={appointments}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
