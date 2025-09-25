import React, { useState } from "react";
import HomePage from "./page/Home";
import LiftControlPage from "./page/LiftControl";
import SettingsPage from "./page/Settings";
import NotificationPage from "./page/Notification";

// React Icons
import { AiOutlineHome } from "react-icons/ai";
import { MdElevator, MdSettings } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";

const CustomerDetailsContainer = ({ details, prescriptionDetails }) => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage details={details} prescriptionDetails={prescriptionDetails} />;
      case "control":
        return <LiftControlPage />;
      case "settings":
        return <SettingsPage />;
      case "notification":
        return <NotificationPage />;
      default:
        return <HomePage details={details} prescriptionDetails={prescriptionDetails} />;
    }
  };

  const getIconBgColor = (page) => (currentPage === page ? "#004262" : "#E88400"); // black when active, green otherwise
  const getIconColor = (page) => "#fff"; // icon color inside circle is always white

  const iconStyle = (page) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    boxShadow: "0 2px 6px #000000ff",
    border: "3px solid #ffffffff", 
    backgroundColor: getIconBgColor(page),
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: "90px" }}>
        {renderCurrentPage()}
      </div>

      {/* Floating Footer Nav Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          position: "fixed",
          bottom: "10px",
          left: "10px",
          right: "10px",
          height: "65px",
          backgroundColor: "#F6E6BB",
          border: "5px solid #E88400", // corrected border syntax
          borderRadius: "30px",
          boxShadow: "0 4px 12px #F6E6BB",
          zIndex: 1000,
          padding: "0 10px",
        }}
      >
        {/* Home */}
        <div style={iconStyle("home")} onClick={() => setCurrentPage("home")}>
          <AiOutlineHome size={28} color={getIconColor("home")} />
        </div>

        {/* Elevator */}
        <div style={iconStyle("control")} onClick={() => setCurrentPage("control")}>
          <MdElevator size={28} color={getIconColor("control")} />
        </div>

        {/* Settings */}
        <div style={iconStyle("settings")} onClick={() => setCurrentPage("settings")}>
          <MdSettings size={28} color={getIconColor("settings")} />
        </div>
        
        {/* Notification */}
        <div style={iconStyle("notification")} onClick={() => setCurrentPage("notification")}>
          <IoMdNotificationsOutline size={28} color={getIconColor("notification")} />
        </div>

      </div>
    </div>
  );
};

export default CustomerDetailsContainer;
