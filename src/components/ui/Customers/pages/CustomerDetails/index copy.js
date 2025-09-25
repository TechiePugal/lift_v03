import React, { useEffect, useState, useRef } from "react";

import Button from "../../../../common/buttons/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useLocation, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import {
  formatDateToString,
  formatToSearchDate,
} from "../../../../../utils/date";
import DatePicker from "../../../../common/datepicker/DatePicker";
import Switch from "../../../../common/Switch/Switch";
import Switch1 from "../../../../common/Switch/Switch1";

import {
  getSingleCustomer,
  sendtodevice,
  getSingleCustomerlift,
} from "../../../../../api/Customers";

import moment from "moment";

import png1 from "./1.png";
import activepng1 from "./1 (Active).png";
import png2 from "./2.png";
import activepng2 from "./2 (Active).png";
import png3 from "./3.png";
import activepng3 from "./3 (Active).png";
import pngG from "./G.png";
import activepngG from "./G (Active).png";
import upInch from "./Up Arrow (Red).png";
import activeupInch from "./Up Arrow (Green).png";
import downInch from "./Down arrow (Red).png";
import activedownInch from "./Down Arrow (Green).png";
import light from "./Red.png";
import acitvelight from "./Red (2).png";

const CustomerDetails = ({ details, prescriptionDetails }) => {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [searchMedicines, setSearchMedicines] = useState("");
  const [edit, setEdit] = useState(true);

  const [prescriptionSendSuccess, setPrescriptionSendSuccess] = useState(false);
  const [prescriptionLoading, setPrescriptionLoading] = useState(false);
  const [loadingPrintPrescription, setLoadingPrintPrescription] =
    useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const prevUpdatedAtRef = useRef(null); // Ref to hold the previous updatedAt value

  const [customerProfile, setCustomerProfile] = useState("");

  const [mlight, setMlight] = useState(false);
  const [mlightcurtain, setMlightcurtain] = useState(false);
  const [mliftservice, setMliftservice] = useState(false);

  const [liftdata, setLiftdata] = useState("");
  const [connectionError, setConnectionError] = useState(false);
  // const initialValues = {
  //   notes: details?.notes,
  // };

  // Get the current location
  const location = useLocation();
  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const getCustomerData = () => {
    setLoading(true);
    getSingleCustomer(id)
      .then((response) => {
        setCustomerProfile(response.data.data);
        // console.log(response.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getSingleCustomerlift1 = () => {
    setLoading(true);
    getSingleCustomerlift(id)
      .then((response) => {
        setLiftdata(response.data.data);
        // console.log(response.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCustomerData();
    // getSingleCustomerlift();
  }, [id]);

  useEffect(() => {
    const fetchData = () => {
      getSingleCustomerlift1();
    };

    fetchData(); // Call initially

    const intervalId = setInterval(fetchData, 500); // Call every 2 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const handleFloorButtonClick = (key, value) => {
    console.log(customerProfile);
    const payload = {
      imei: customerProfile.IMEI,
      [key]: value, // Dynamically set the version and floor number
    };
    setLoading(true);
    sendtodevice(payload)
      .then(() => {
        // showSuccessToast("sendtodevice Successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

  return (
    <div className="flex flex-col h-full">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ marginRight: "20px" }}>
          {customerProfile.name} : {customerProfile.phone}
        </p>{" "}
      </div>
      <div>
        {" "}
        <p style={{ marginRight: "20px" }}>
          Last Updated:{" "}
          {moment(liftdata.updatedAt).format("DD MM YYYY hh:mm:ss A")}
        </p>
      </div>

      {/* <div className="">
        <div className="w-full bg-[#E45353] h-[50px] bg-opacity-[20%] rounded-tl-15 rounded-tr-15 mb-1 flex items-center pl-5 justify-between">
          <h1 className="text-bodyBB text-darkgrey">Status</h1>
        </div>
        <div className="flex flex-wrap justify-center mb-1">
          <div className="flex flex-wrap justify-center mb-2">
            <div className="flex">
              <div className="w-full sm:w-auto bg-white shadow-md rounded-lg px-4 py-2 mx-2 my-1 hover:shadow-lg flex flex-col items-center">
                <div
                  className="bg-red-500 text-bodyBB px-4 py-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  G-FLOOR USAGE
                </div>
                <div className="text-bodyBB">{liftdata.d30}</div>
              </div>

              <div className="w-full sm:w-auto bg-white shadow-md rounded-lg px-4 py-2 mx-2 my-1 hover:shadow-lg flex flex-col items-center">
                <div
                  className="bg-red-500 text-bodyBB px-4 py-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  1-FLOOR USAGE
                </div>
                <div className="text-bodyBB">{liftdata.d32}</div>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto bg-white shadow-md rounded-lg px-4 py-2 mx-2 my-1 hover:shadow-lg flex flex-col items-center">
            <div
              className="bg-red-500 text-bodyBB px-4 py-2"
              style={{ whiteSpace: "nowrap" }}
            >
              CABIN UP USAGE IN TIME (Mins)
            </div>
            <div className="text-bodyBB">{liftdata.d38}</div>
          </div>

          <div className="w-full sm:w-auto bg-white shadow-md rounded-lg px-4 py-2 mx-2 my-1 hover:shadow-lg flex flex-col items-center">
            <div
              className="bg-red-500 text-bodyBB px-4 py-2"
              style={{ whiteSpace: "nowrap" }}
            >
              CABIN DOWN USAGE IN TIME (Mins)
            </div>
            <div className="text-bodyBB">{liftdata.d40}</div>
          </div>
        </div>
      </div> */}

      <div className="w-full bg-[#DE4AC4] h-[55px] bg-opacity-[50%] rounded-tl-15 rounded-tr-15 mb-2 flex items-center pl-5">
        <h1 className="text-bodyBB text-darkgrey">Control</h1>
      </div>
      <div className="flex flex-wrap justify-around mb-1">
        <div className="flex flex-wrap justify-center mb-2">
          <div className="flex">
            <img
              src={liftdata.d44 === "1" ? activepngG : pngG} // Use activePngG1 when pressed, otherwise use pngG1
              alt="Floor Usage"
              className="px-4 py-2 mx-2 my-1 w-24 h-24"
              onMouseDown={() => {
                setIsPressed(true);
                handleFloorButtonClick("v1", 1);
              }}
              onMouseUp={() => {
                setIsPressed(false);
                handleFloorButtonClick("v1", 0);
              }}
            />

            <img
              src={liftdata.d45 === "1" ? activepng1 : png1}
              // src={png1} // Use the imported image variable
              alt="Floor Usage" // Alternative text for screen readers
              className="px-4 py-2 mx-2 my-1 w-24 h-24"
              style={{ width: "100px", height: "100px" }} // Set width and height
              onMouseDown={() => handleFloorButtonClick("v2", 1)} // Send 1 when pressed
              onMouseUp={() => handleFloorButtonClick("v2", 0)} // Send 0 when released
            />

            <img
              src={liftdata.d46 === "1" ? activepng2 : png2}
              // src={png1} // Use the imported image variable
              alt="Floor Usage" // Alternative text for screen readers
              className="px-4 py-2 mx-2 my-1 w-24 h-24"
              style={{ width: "100px", height: "100px" }} // Set width and height
              onMouseDown={() => handleFloorButtonClick("v3", 1)} // Send 1 when pressed
              onMouseUp={() => handleFloorButtonClick("v3", 0)} // Send 0 when released
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center mb-2">
          <div className="flex">
            <img
              src={liftdata.d4 === "1" ? activeupInch : upInch}
              // src={upInch} // Use the imported image variable
              alt="Floor Usage" // Alternative text for screen readers
              className="px-4 py-2 mx-2 my-1 w-24 h-24"
              style={{ width: "100px", height: "100px" }} // Set width and height
              onMouseDown={() => handleFloorButtonClick("v5", 1)} // Send 1 when pressed
              onMouseUp={() => handleFloorButtonClick("v5", 0)} // Send 0 when released
            />
            <img
              src={liftdata.d5 === "1" ? activedownInch : downInch}
              // src={downInch} // Use the imported image variable
              alt="Floor Usage" // Alternative text for screen readers
              className="px-4 py-2 mx-2 my-1 w-24 h-24"
              style={{ width: "100px", height: "100px" }} // Set width and height
              onMouseDown={() => handleFloorButtonClick("v6", 1)} // Send 1 when pressed
              onMouseUp={() => handleFloorButtonClick("v6", 0)} // Send 0 when released
            />{" "}
          </div>
        </div>

        <div className="px-4 py-2 mx-2 my-1 h-14 flex flex-col items-center">
          <div className="flex items-center justify-between w-full">
            <Button
              type="primary"
              className="px-4 py-2"
              onClick={() => {
                console.log("Mouse down event occurred3");
                handleFloorButtonClick("v8", 1);

                // After 300 milliseconds, execute handleFloorButtonClick("v8", 0)
                setTimeout(() => {
                  console.log("Mouse down event occurred4");
                  handleFloorButtonClick("v8", 0);
                }, 300);
              }}
            >
              G-FLOOR DOOR OPEN
            </Button>

            <div className="flex flex-col">
              <span style={{ color: "red", marginLeft: "10px" }}>STATUS</span>
              <span style={{ marginLeft: "10px" }}>
                {liftdata.d52 === "0" ? "CLOSED" : "OPENED"}
              </span>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 mx-2 my-1 h-14 flex items-center justify-between">
          <Button
            type="primary"
            className="px-4 py-2"
            onClick={() => {
              console.log("Mouse down event occurred3");
              handleFloorButtonClick("v9", 1);

              // After 300 milliseconds, execute handleFloorButtonClick("v8", 0)
              setTimeout(() => {
                console.log("Mouse down event occurred4");
                handleFloorButtonClick("v9", 0);
              }, 300);
            }}
          >
            1-FLOOR DOOR OPEN
          </Button>
          <span style={{ marginLeft: "10px" }}>
            {liftdata.d53 === "0" ? "CLOSED" : "OPENED"}
          </span>
        </div>

        <div className="px-4 py-2 mx-2 my-1 h-14 flex items-center justify-between">
          <Button
            type="primary"
            className="px-4 py-2"
            onClick={() => {
              console.log("Mouse down event occurred3");
              handleFloorButtonClick("v10", 1);

              // After 300 milliseconds, execute handleFloorButtonClick("v8", 0)
              setTimeout(() => {
                console.log("Mouse down event occurred4");
                handleFloorButtonClick("v10", 0);
              }, 300);
            }}
          >
            2-FLOOR DOOR OPEN
          </Button>
          <span style={{ marginLeft: "10px" }}>
            {liftdata.d53 === "0" ? "CLOSED" : "OPENED"}
          </span>
        </div>

        <div className="flex flex-wrap justify-around mb-1">
          {/* First section */}
          <div className="flex justify-between bg-white rounded-15 shadow-card items-center pl-4 p-5 my-1 h-14">
            <div className="text-bodyRB text-darkgrey mr-3">LIGHT</div>
            <div className="flex gap-3 items-center">
              <Switch
                isOn={liftdata.d6 === "1"}
                handleClick={() => {
                  if (liftdata.d6 === "0") {
                    handleFloorButtonClick("v7", 1); // Turn light on
                  } else {
                    handleFloorButtonClick("v7", 0); // Turn light off
                  }
                }}
              />
            </div>
          </div>

          {/* Second section */}
          <div className="flex justify-between bg-white rounded-15 shadow-card items-center pl-8 p-5 my-1 h-14">
            <div className="text-bodyRB text-darkgrey mr-3">
              LIGHT CURTAIN BYPASS
            </div>
            <div className="flex gap-3 items-center">
              <Switch
                isOn={liftdata.d11 === "1"}
                handleClick={() => {
                  if (liftdata.d11 === "0") {
                    handleFloorButtonClick("v12", 1); // Turn light on
                  } else {
                    handleFloorButtonClick("v12", 0); // Turn light off
                  }
                }}
              />
            </div>
          </div>

          <div className="flex justify-between bg-white rounded-15 shadow-card items-center pl-8 p-5 my-1 h-14">
            <div className="text-bodyRB text-darkgrey mr-3">
              LIFT
            </div>
            <div className="flex gap-3 items-center">
              <Switch1
                isOn={liftdata.d11 === "1"}
                handleClick={() => {
                  if (liftdata.d11 === "0") {
                    handleFloorButtonClick("v13", 1); // Turn light on
                  } else {
                    handleFloorButtonClick("v13", 0); // Turn light off
                  }
                }}
              />
            </div>
          </div>

          {/* Third section */}
          {/* <div className="flex justify-between bg-white rounded-15 shadow-card items-center pl-8 p-5 my-1 h-14">
            <div className="text-bodyRB text-darkgrey mr-3">LIFT SERVICE</div>
            <div className="flex gap-3 items-center">
              <Switch
                isOn={liftdata.d12 === "1"}
                handleClick={() => {
                  if (liftdata.d12 === "0") {
                    handleFloorButtonClick("v13", 1); // Turn light on
                  } else {
                    handleFloorButtonClick("v13", 0); // Turn light off
                  }
                }}
              />
            </div>
          </div> */}
        </div>
      </div>

      {/* Alarm Section */}
      <div className="w-full bg-secondary h-[55px] rounded-tl-15 rounded-tr-15 mb-2 flex items-center pl-5">
        <h1 className="text-bodyBB text-darkgrey">Alarm</h1>
      </div>
      <div className="flex justify-around mb-1">
        <h1 className="text-bodyBB">{getLiftStatusMessage(liftdata.d42)}</h1>
      </div>
      {liftdata.d48 === "1" && (
        <div
          className="fixed bottom-0 left-0 w-full bg-gray-500 p-4 text-white text-center border border-white rounded-t-lg"
          style={{ zIndex: 9999 }}
        >
          CABIN IN G-FLOOR
        </div>
      )}
      {liftdata.d49 === "1" && (
        <div
          className="fixed bottom-0 left-0 w-full bg-gray-500 p-4 text-white text-center border border-white rounded-t-lg"
          style={{ zIndex: 9999 }}
        >
          CABIN IN 1-FLOOR
        </div>
      )}
      {/* {liftdata.d47 === "0" && (
        <div
          className="fixed bottom-0 left-0 w-full bg-gray-500 p-4 text-white text-center border border-white rounded-t-lg"
          style={{ zIndex: 9999 }}
        >
          CONNECTION ERROR
        </div>
      )} */}

      {liftdata.communicationError == "1" && (
        <div
          className="fixed bottom-0 left-0 w-full bg-gray-500 p-4 text-white text-center border border-white rounded-t-lg"
          style={{ zIndex: 9999 }}
        >
          CONNECTION ERROR
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;
