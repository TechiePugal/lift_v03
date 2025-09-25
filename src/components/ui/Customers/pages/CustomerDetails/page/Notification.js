import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSingleCustomer, getSingleCustomerlift } from "../../../../../../api/Customers/index";
import moment from "moment";

const NotificationPage = () => {
  const currentUser = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);
  const [customerProfile, setCustomerProfile] = useState("");
  const [liftdata, setLiftdata] = useState("");
  const [device_imei, setDevice_imei] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Get the current location
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const getCustomerData = () => {
    setLoading(true);
    getSingleCustomer(id)
      .then((response) => {
        setCustomerProfile(response.data.data);
        setDevice_imei(response.data.data.IMEI);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getSingleCustomerlift1 = () => {
    setLoading(true);
    getSingleCustomerlift(device_imei)
      .then((response) => {
        if (response.data.success) {
          setLiftdata(response.data.data);
          generateNotifications(response.data.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCustomerData();
  }, [id]);

  useEffect(() => {
    if (device_imei) {
      const fetchData = () => {
        getSingleCustomerlift1();
      };

      fetchData();
      const intervalId = setInterval(fetchData, 2000);
      return () => clearInterval(intervalId);
    }
  }, [device_imei]);

  const getLiftStatusMessage = (code) => {
    const codeInt = parseInt(code, 10);
    switch (codeInt) {
      case 0:
        return "No Error";
      case 1:
        return "OverLoad Error";
      case 4:
        return "Lift Up Over Travel";
      case 5:
        return "Ground Floor Door Open";
      case 6:
        return "1st Floor Door Open";
      case 7:
        return "2nd Floor Door Open";
      case 8:
        return "3rd Floor Door Open";
      case 9:
        return "Eb Power Failure";
      case 10:
        return "Safety Curtain Disturbed";
      case 11:
        return "Ground Floor or 1st Floor Sensor Failure";
      case 12:
        return "First Floor or 2nd Floor Sensor Failure";
      case 13:
        return "Ground Floor or 2nd Floor Sensor Failure";
      case 14:
        return "Ground Floor or 3rd Floor Sensor Failure";
      case 15:
        return "First Floor or 3rd Floor Sensor Failure";
      case 16:
        return "2nd Floor or 3rd Floor Sensor Failure";
      default:
        return "Unknown Error Code";
    }
  };

  const generateNotifications = (data) => {
    const newNotifications = [];
    const timestamp = moment().format("DD MMM YYYY hh:mm:ss A");

    // Error notifications
    if (data.d42 && data.d42 !== "0") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "error",
        title: "System Alert",
        message: getLiftStatusMessage(data.d42),
        timestamp: timestamp,
        priority: "high"
      });
    }

    // Communication error
    if (data.communicationError === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "error",
        title: "Connection Error",
        message: "Communication with the lift system has been lost",
        timestamp: timestamp,
        priority: "high"
      });
    }

    // Door status notifications
    if (data.d52 === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "warning",
        title: "Door Status",
        message: "Ground Floor door is open",
        timestamp: timestamp,
        priority: "medium"
      });
    }

    if (data.d53 === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "warning",
        title: "Door Status",
        message: "1st Floor door is open",
        timestamp: timestamp,
        priority: "medium"
      });
    }

    if (data.d54 === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "warning",
        title: "Door Status",
        message: "2nd Floor door is open",
        timestamp: timestamp,
        priority: "medium"
      });
    }

    if (data.d55 === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "warning",
        title: "Door Status",
        message: "3rd Floor door is open",
        timestamp: timestamp,
        priority: "medium"
      });
    }

    // Cabin position notifications
    if (data.d48 === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "info",
        title: "Cabin Position",
        message: "Cabin is at Ground Floor",
        timestamp: timestamp,
        priority: "low"
      });
    }

    if (data.d49 === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "info",
        title: "Cabin Position",
        message: "Cabin is at 1st Floor",
        timestamp: timestamp,
        priority: "low"
      });
    }

    if (data.d50 === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "info",
        title: "Cabin Position",
        message: "Cabin is at 2nd Floor",
        timestamp: timestamp,
        priority: "low"
      });
    }

    // System status notifications
    if (data.d6 === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "success",
        title: "System Status",
        message: "Cabin light is ON",
        timestamp: timestamp,
        priority: "low"
      });
    }

    if (data.d11 === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "warning",
        title: "Safety Status",
        message: "Light curtain bypass is ACTIVE",
        timestamp: timestamp,
        priority: "medium"
      });
    }

    if (data.d12 === "1") {
      newNotifications.push({
        id: Date.now() + Math.random(),
        type: "info",
        title: "Security Status",
        message: "Child lock is ENABLED",
        timestamp: timestamp,
        priority: "low"
      });
    }

    // Update notifications (keep only latest 50)
    setNotifications(prev => [...newNotifications, ...prev].slice(0, 50));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "error":
        return "🚨";
      case "warning":
        return "⚠️";
      case "success":
        return "✅";
      case "info":
        return "ℹ️";
      default:
        return "📢";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "error":
        return "bg-red-900/30 border-red-500/50 text-red-300 hover:bg-red-900/40";
      case "warning":
        return "bg-yellow-900/30 border-yellow-500/50 text-yellow-300 hover:bg-yellow-900/40";
      case "success":
        return "bg-green-900/30 border-green-500/50 text-green-300 hover:bg-green-900/40";
      case "info":
        return "bg-blue-900/30 border-blue-500/50 text-blue-300 hover:bg-blue-900/40";
      default:
        return "bg-gray-800/30 border-gray-500/50 text-gray-300 hover:bg-gray-800/40";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-900/60 text-red-300 border border-red-500/30";
      case "medium":
        return "bg-yellow-900/60 text-yellow-300 border border-yellow-500/30";
      case "low":
        return "bg-blue-900/60 text-blue-300 border border-blue-500/30";
      default:
        return "bg-gray-800/60 text-gray-300 border border-gray-500/30";
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const clearNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="container mx-auto px-4 py-6 lg:px-6 max-w-7xl">
        {/* Loading Indicator */}
        {loading && (
<div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-blue-900/80 backdrop-blur-sm border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    Loading...
  </div>
</div>

        )}

        {/* Notifications Header */}
<div className="bg-white/80 mt-[60px] backdrop-blur-sm border border-gray-200 rounded-2xl mb-2 p-4 lg:p-6">
  <div className="flex items-center justify-between gap-4 flex-wrap">
    <h1 className="text-l lg:text-l font-bold bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent flex items-center gap-2 whitespace-nowrap">
      <span className="text-l lg:text-l">🔔</span>
      Notifications
    </h1>
    {notifications.length > 0 && (
      <button
        onClick={clearAllNotifications}
        className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-md whitespace-nowrap"
      >
        Clear All
      </button>
    )}
  </div>
</div>



<div className="flex flex-col gap-3 p-2">
  {/* Current Alert */}
<div className={`flex items-center justify-between p-2 rounded-2xl shadow-md backdrop-blur-sm transition-transform transform hover:scale-[1.01] 
  ${(liftdata.d42 && liftdata.d42 !== "0") || liftdata.communicationError === "1"
    ? "bg-red-100 border border-red-300"
    : "bg-green-100 border border-green-300"
  }`}>
  
  {/* Icon + Title */}
  <div className="flex items-center gap-2 flex-1 min-w-0">
    <span className="text-xl">{(liftdata.d42 && liftdata.d42 !== "0") || liftdata.communicationError === "1" ? "🚨" : "✅"}</span>
    <p className={`font-bold text-sm truncate ${((liftdata.d42 && liftdata.d42 !== "0") || liftdata.communicationError === "1") ? "text-red-600" : "text-green-600"}`}>
      {(liftdata.d42 && liftdata.d42 !== "0") || liftdata.communicationError === "1" ? "System Alert" : "System Normal"}
    </p>
  </div>

  {/* Status Badge */}
  <div className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0 ${
      (liftdata.d42 && liftdata.d42 !== "0") || liftdata.communicationError === "1"
        ? "bg-red-600 text-white"
        : "bg-green-600 text-white"
    }`}>
    {(liftdata.d42 && liftdata.d42 !== "0") || liftdata.communicationError === "1" ? "CRITICAL" : "NORMAL"}
  </div>
</div>


  {/* Notification Summary (Optional if notifications exist) */}
  {notifications.length > 0 && (
    <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-4 shadow-md">
      <div className="flex items-center justify-between text-sm font-medium">
        <span>Errors</span>
        <span>{notifications.filter(n => n.type === 'error').length}</span>
      </div>
      <div className="flex items-center justify-between text-sm font-medium mt-2">
        <span>Warnings</span>
        <span>{notifications.filter(n => n.type === 'warning').length}</span>
      </div>
    </div>
  )}

  {/* System Info */}
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-md">
    <div className="flex justify-between items-center text-sm font-medium">
      <span>Customer:</span>
      <span className="text-gray-200 text-ls">{customerProfile?.name || "Loading..."}</span>
    </div>
    <div className="flex justify-between items-center text-sm font-medium mt-1">
      <span>Status:</span>
      <span className={`px-2 py-1 rounded text-xs font-bold ${
        (liftdata.d42 && liftdata.d42 !== "0") || liftdata.communicationError === "1"
          ? "bg-red-600 text-white"
          : "bg-green-600 text-white"
      }`}>
        {(liftdata.d42 && liftdata.d42 !== "0") || liftdata.communicationError === "1" ? "ALERT" : "NORMAL"}
      </span>
    </div>
    <div className="flex justify-between items-center text-sm font-medium mt-1">
      <span>Last Update:</span>
      <span className="text-gray-500 text-xs">{moment().format("HH:mm:ss")}</span>
    </div>
  </div>
</div>


        {/* Notification History */}
<div className="mt-6">
  <h2 className="text-lg lg:text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
    <span className="text-2xl">📋</span>
    Notification History
    {notifications.length > 0 && (
      <span className="bg-gray-700/60 text-gray-300 px-2 py-0.5 rounded-full text-sm border border-gray-600/30">
        {notifications.length}
      </span>
    )}
  </h2>

  {notifications.length === 0 ? (
    <div className="text-center py-12">
      <span className="text-5xl mb-4 block animate-bounce">📭</span>
      <p className="text-gray-300 text-base mb-2">No notifications yet</p>
      <p className="text-gray-500 text-sm">Notifications will appear here when system events occur</p>
    </div>
  ) : (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center justify-between p-2 rounded-2xl shadow-md transition-transform transform hover:scale-[1.01] backdrop-blur-sm ${getNotificationColor(notification.type)}`}
        >
          {/* Icon + Title */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xl">{getNotificationIcon(notification.type)}</span>
            <p className="font-bold text-sm truncate">{notification.title}</p>
          </div>

          {/* Clear Button */}
          <button
            onClick={() => clearNotification(notification.id)}
            className="text-gray-400 hover:text-red-400 text-sm p-1 rounded-full ml-2"
            title="Clear notification"
          >
            ✕
          </button>

          {/* Priority Badge */}
          <div className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0 ${getPriorityColor(notification.priority)}`}>
            {notification.priority.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  )}
</div>


        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2024 Lift Monitoring System - Real-time notifications and alerts</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;