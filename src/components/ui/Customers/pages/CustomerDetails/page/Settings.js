import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { showErrorToast } from "../../../../../../utils/toaster";
import { getSingleCustomer, sendtodevice, getSingleCustomerlift } from "../../../../../../api/Customers/index";

// Mobile-optimized Switch component
const Switch = ({ isOn, handleClick, color = "green" }) => {
  const colorClasses = {
    green: isOn ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-gray-600',
    blue: isOn ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gray-600',
    purple: isOn ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-gray-600'
  };

  return (
    <div 
      className={`w-12 h-6 sm:w-14 sm:h-7 rounded-full p-0.5 sm:p-1 cursor-pointer transition-all duration-300 ${colorClasses[color]} ${isOn ? 'shadow-lg' : 'shadow-sm'}`} 
      onClick={handleClick}
    >
      <div 
        className={`w-5 h-5 sm:w-5 sm:h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${isOn ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}`}
      />
    </div>
  );
};

const SettingsPage = () => {
  const currentUser = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);
  const [customerProfile, setCustomerProfile] = useState("");
  const [liftdata, setLiftdata] = useState("");
  const [device_imei, setDevice_imei] = useState("");
  const [connectionStatus, setConnectionStatus] = useState('connecting');

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
      .catch(() => {
        setConnectionStatus('error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSingleCustomerlift1 = () => {
    getSingleCustomerlift(device_imei)
      .then((response) => {
        if (response.data.success) {
          setLiftdata(response.data.data);
          setConnectionStatus('connected');
        }
      })
      .catch(() => {
        setConnectionStatus('disconnected');
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

  const handleFloorButtonClick = (key, value) => {
    const payload = {
      imei: customerProfile.IMEI,
      [key]: value,
    };
    setLoading(true);
    sendtodevice(payload)
      .then(() => {})
      .catch((error) => {
        console.error("Error:", error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const StatusIndicator = ({ status }) => {
    const config = {
      connected: { color: 'bg-emerald-500', text: 'Connected' },
      disconnected: { color: 'bg-red-500', text: 'Disconnected' },
      connecting: { color: 'bg-amber-500', text: 'Connecting' },
      error: { color: 'bg-red-500', text: 'Error' }
    }[status] || { color: 'bg-red-500', text: 'Disconnected' };

    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${config.color} ${status === 'connecting' ? 'animate-pulse' : ''}`}></div>
        <span className={`text-xs font-medium ${status === 'connected' ? 'text-emerald-400' : 'text-red-400'}`}>
          {config.text}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-3 sm:p-6">
      <div className="max-w-4xl mt-[60px] mx-auto">
        
        {/* Header */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-xl mb-4 sm:mb-6 border border-gray-700/50 p-4 sm:p-6">
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "16px",
    backgroundColor: "#1f1f1f", // dark background
    borderRadius: "8px",
  }}
>
  <div>
    <h1
      style={{
        fontSize: "1.25rem", // xl
        fontWeight: "700",
        background: "linear-gradient(to right, #06b6d4, #a78bfa)", // cyan to purple
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        margin: 0,
      }}
    >
      System Controls
    </h1>
    <p
      style={{
        fontSize: "0.75rem", // xs
        color: "#9ca3af", // gray-400
        marginTop: "4px",
      }}
    >
      Elevator management system
    </p>
  </div>
</div>

        </div>

        {/* Controls */}
        <div className="space-y-4">
          
          {/* Light/Fan Control */}
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 hover:border-cyan-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="flex items-center space-x-0.5">
                    <span className="text-sm sm:text-base">💡</span>
                    <span className="text-sm sm:text-base">🌀</span>
                  </div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white">Light/Fan</div>
                  <div className="text-xs sm:text-sm text-gray-400 hidden sm:block">Control cabin lighting & fan</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold border ${
                  liftdata.d6 === "1" 
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50" 
                    : "bg-gray-600/50 text-gray-300 border-gray-500/50"
                }`}>
                  {liftdata.d6 === "1" ? "ON" : "OFF"}
                </span>
                <Switch
                  color="blue"
                  isOn={liftdata.d6 === "1"}
                  handleClick={() => handleFloorButtonClick("v7", liftdata.d6 === "0" ? 1 : 0)}
                />
              </div>
            </div>
          </div>

          {/* Light Curtain Bypass */}
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-base sm:text-xl">🚧</span>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white">Light Curtain Bypass</div>
                  <div className="text-xs sm:text-sm text-gray-400 hidden sm:block">Safety system override</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold border ${
                  liftdata.d11 === "1" 
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" 
                    : "bg-gray-600/50 text-gray-300 border-gray-500/50"
                }`}>
                  {liftdata.d11 === "1" ? "ON" : "OFF"}
                </span>
                <Switch
                  color="green"
                  isOn={liftdata.d11 === "1"}
                  handleClick={() => handleFloorButtonClick("v12", liftdata.d11 === "0" ? 1 : 0)}
                />
              </div>
            </div>
          </div>

          {/* Child Lock */}
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-base sm:text-xl">🔒</span>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white">Child Lock</div>
                  <div className="text-xs sm:text-sm text-gray-400 hidden sm:block">Prevent unauthorized access</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold border ${
                  liftdata.d12 === "1" 
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/50" 
                    : "bg-gray-600/50 text-gray-300 border-gray-500/50"
                }`}>
                  {liftdata.d12 === "1" ? "ON" : "OFF"}
                </span>
                <Switch
                  color="purple"
                  isOn={liftdata.d12 === "1"}
                  handleClick={() => handleFloorButtonClick("v13", liftdata.d12 === "0" ? 1 : 0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info - Compact for mobile */}
        <div className="mt-4 sm:mt-6 bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-sm sm:text-base">👤</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">Customer Info</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-700/50 rounded-lg border border-gray-600/30">
              <div className="text-xs text-gray-400">Name</div>
              <div className="font-bold text-white text-sm truncate">{customerProfile.name || "N/A"}</div>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg border border-gray-600/30">
              <div className="text-xs text-gray-400">Phone</div>
              <div className="font-bold text-white text-sm truncate">{customerProfile.phone || "N/A"}</div>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg border border-gray-600/30 col-span-2 sm:col-span-1">
              <div className="text-xs text-gray-400">IMEI</div>
              <div className="font-mono text-cyan-400 text-xs truncate">{customerProfile.IMEI || "N/A"}</div>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg border border-gray-600/30">
              <div className="text-xs text-gray-400">Floors</div>
              <div className="font-bold text-white text-sm">{(customerProfile.floors || 0) + 1}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button 
            className="p-4 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl text-white shadow-lg transition-all duration-300 transform active:scale-95"
            onClick={() => window.location.reload()}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🔄</div>
              <div className="font-bold text-sm sm:text-base">Refresh</div>
            </div>
          </button>
          
          <button 
            className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-white shadow-lg transition-all duration-300 transform active:scale-95"
            onClick={() => console.log("Export clicked")}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">📁</div>
              <div className="font-bold text-sm sm:text-base">Export</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;