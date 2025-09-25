import React from "react";

const Header = () => {
  return (
    <div>
      <div className="w-full h-12 shadow-card rounded-15 grid grid-cols-3">
        <div>
          <h2>Follow-up Reminders</h2>
        </div>
        <div>
          <h2>Upcoming Appt Reminders</h2>
        </div>
        <div>
          <h2>Admin Reminders</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
