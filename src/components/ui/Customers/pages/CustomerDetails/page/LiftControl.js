import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { showErrorToast } from "../../../../../../utils/toaster";
import { getSingleCustomer, sendtodevice, getSingleCustomerlift } from "../../../../../../api/Customers/index";
import "./LiftControlPage.css";
import bgImageUrl from "../icon/bg.png";
// Floor & Door Images
import G from "../icon/Button/G.png";
import GA from "../icon/Button/GA.png";
import _1 from "../icon/Button/1.png";
import _1A from "../icon/Button/1A.png";
import _2 from "../icon/Button/2.png";
import _2A from "../icon/Button/2A.png";
import _3 from "../icon/Button/3.png";
import _3A from "../icon/Button/3A.png";
import DoorOpen from "../icon/Button/Open.png";
import DoorClose from "../icon/Button/Close.png";

const floorImages = { G: { inactive: G, active: GA }, "1": { inactive: _1, active: _1A }, "2": { inactive: _2, active: _2A }, "3": { inactive: _3, active: _3A } };

const LiftControlPage = () => {
  const currentUser = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);
  const [customerProfile, setCustomerProfile] = useState({});
  const [liftData, setLiftData] = useState({});
  const [deviceImei, setDeviceImei] = useState("");

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try { const response = await getSingleCustomer(id); setCustomerProfile(response.data.data); setDeviceImei(response.data.data.IMEI); }
      catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchCustomerData();
  }, [id]);

  useEffect(() => {
    if (!deviceImei) return;
    const fetchLiftData = async () => { try { const res = await getSingleCustomerlift(deviceImei); if (res.data.success) setLiftData(res.data.data); } catch (err) { console.error(err); } };
    fetchLiftData();
    const interval = setInterval(fetchLiftData, 2000);
    return () => clearInterval(interval);
  }, [deviceImei]);

  const handleButtonClick = async (key, value, duration = 0) => {
    setLoading(true);
    try { await sendtodevice({ imei: customerProfile.IMEI, [key]: value });
      if (duration > 0) setTimeout(() => sendtodevice({ imei: customerProfile.IMEI, [key]: 0 }), duration);
    } catch (err) { console.error(err); showErrorToast(err, "error"); }
    finally { setLoading(false); }
  };

  const getFloorImagePath = (floorName, isActive) => floorImages[floorName] ? (isActive ? floorImages[floorName].active : floorImages[floorName].inactive) : null;

  const floors = [
    { name: "G", vKey: "v1", dKey: "d44", doorVKey: "v8", doorDKey: "d52" },
    { name: "1", vKey: "v2", dKey: "d45", doorVKey: "v9", doorDKey: "d53" },
    { name: "2", vKey: "v3", dKey: "d46", doorVKey: "v10", doorDKey: "d54" },
    { name: "3", vKey: "v4", dKey: "d47", doorVKey: "v11", doorDKey: "d55" },
  ];
  const manualControls = [{ name: "↑", vKey: "v5", dKey: "d4" }, { name: "↓", vKey: "v6", dKey: "d5" }];

  return (
    
    <div className="lift-control-container"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} >
      <h1 className="control-title">Lift Control</h1>

      {currentUser?.role === "Admin" && (
        <div className="button-group manual-controls">
          {manualControls.map((c,i) => (
            <button key={i} className={`control-button manual-button ${liftData[c.dKey]==="1"?"active":""}`}
              onClick={(e)=>{e.preventDefault(); handleButtonClick(c.vKey,liftData[c.dKey]==="0"?1:0);}}>{c.name}</button>
          ))}
        </div>
      )}

      <div className="floor-controls">
        {floors.slice(0,(customerProfile?.floors||0)+1).map((floor,i)=>{
          const isFloorActive = liftData[floor.dKey]==="1";
          const isDoorOpen = liftData[floor.doorDKey]==="1";
          const imgSrc = getFloorImagePath(floor.name,isFloorActive);
          return (
            <div className="floor-row" key={i}>
              <button className={`control-button floor-button ${isFloorActive?"active":""}`}
                onMouseDown={()=>handleButtonClick(floor.vKey,1)}
                onMouseUp={()=>handleButtonClick(floor.vKey,0)}
                onMouseLeave={()=>handleButtonClick(floor.vKey,0)}>
                {imgSrc?<img src={imgSrc} alt={floor.name}/> : <span>{floor.name}</span>}
              </button>
              <button className="door-toggle-button"
                onClick={()=>handleButtonClick(floor.doorVKey,isDoorOpen?0:1,isDoorOpen?0:300)}>
                <img src={isDoorOpen?DoorOpen:DoorClose} alt={isDoorOpen?"Open":"Close"}/>
              </button>
            </div>
          );
        })}
      </div>

      <div className="status-panel">
        <div className="status-item">
          <div className="status-label">Floor</div>
          <div className="status-value">{liftData.d18 || "N/A"}</div>
        </div>
        <div className="status-item">
          <div className="status-label">Door</div>
          <div className="status-value">
            <span className={liftData.d22==="1"?"door-status-open":"door-status-closed"}>
              {liftData.d22==="1"?"Opened":"Closed"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiftControlPage;
