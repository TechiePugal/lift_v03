import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSingleCustomer, getSingleCustomerlift } from "../../../../../../api/Customers/index";
import bgImageUrl from "../icon/bg.png";
// Assets
import liftImage from "../icon/lift.png";



const Home = () => {
  const currentUser = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);
  const [customerProfile, setCustomerProfile] = useState({});
  const [liftData, setLiftData] = useState({});
  const [deviceImei, setDeviceImei] = useState("");
  const [showError, setShowError] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const res = await getSingleCustomer(id);
      setCustomerProfile(res.data.data);
      setDeviceImei(res.data.data.IMEI);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLiftData = async () => {
    if (!deviceImei) return;
    try {
      const res = await getSingleCustomerlift(deviceImei);
      if (res.data.success) {
        setLiftData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching lift data:", error);
    }
  };

  useEffect(() => {
    if (id) fetchCustomerData();
  }, [id]);

  useEffect(() => {
    if (deviceImei) {
      fetchLiftData();
      const interval = setInterval(fetchLiftData, 2000);
      return () => clearInterval(interval);
    }
  }, [deviceImei]);

  useEffect(() => {
    if (liftData.communicationError !== "1" && showError) {
      const timer = setTimeout(() => setShowError(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [liftData.communicationError, showError]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 p-8 flex items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-lg font-medium text-gray-200">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const isMoving = liftData.direction === "UP" || liftData.direction === "DOWN";
  const arrowClasses = isMoving ? "text-red-500 animate-pulse" : "text-green-500";
  const arrowSymbol =
    liftData.direction === "UP" ? "⬆️" : liftData.direction === "DOWN" ? "⬇️" : "⏸️";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-0 relative"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0"></div>

      {/* Content card */}
      <div className="relative flex flex-col items-center max-w-sm text-center z-4">
        {/* Welcome */}
        <div className="text-white mb-2">
          <h1 className="text-xl font-semibold leading-none">Welcome</h1>
          <p className="text-1xl font-extrabold text-blue-400 sm:mt-2">
            {customerProfile.name || "Customer"}
          </p>
        </div>

        {/* Lift Image */}
        <img src={liftImage} alt="Lift" className="w-50 h-auto mb-2 sm:w-48" />

        {/* Lift Status */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-200 mb-2 sm:text-xl">Your Lift At</p>
          <div className="flex items-center justify-center gap-4">
            {liftData.currentFloor ? (
              <>
                <span className={`text-4xl ${arrowClasses}`}>{arrowSymbol}</span>
                <span className="text-6xl font-extrabold text-white">{liftData.currentFloor}</span>
              </>
            ) : (
              <span className="text-xl font-semibold text-red-500">Not available</span>
            )}
          </div>
        </div>

        {/* Optional error */}
        {liftData.communicationError === "1" && showError && (
          <p className="mt-4 text-red-500 font-medium text-sm sm:text-base">
            Lift communication error!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
