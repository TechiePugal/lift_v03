import React, { useEffect, useRef, useState } from "react";
import Calendar from "../../icons/Calendar";
import SelectionInput from "../../common/input/Select";
import SearchInput from "../../common/search";
import { Link } from "react-router-dom";
import Button from "../../common/buttons/Button";
import DatePicker from "../../common/datepicker/DatePicker";
import MultiDatePicker from "../../common/datepicker/MultiDatePicker";
import { getAllPatients } from "../../../api/Treatments/PatientDatabase/PatientDatabase";
import InputBoxSelect from "../../common/input/InputBoxSelect";
import useDelayedSearch from "../../../utils/delayedsearch";

const Functionalities = ({
  setSearchKey,
  setStatus,
  status,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const [patients, setPatients] = useState([]);
  const [key, setKey] = useState("");
  const [selectedClassName,setSelectedClassName]=useState(false)
  /** Searching for patient and listing */
  const handleSearchPatient = () => {
    if (key) {
      getAllPatients(key)
        .then((response) => {
          setPatients(response.data.data);
        })
        .catch(() => {})
        .finally(() => {});
    } else {
      setPatients([]);
      setSearchKey("");
    }
  };

  useDelayedSearch(handleSearchPatient, 200, [key]);

  /** Selection of patient from list */
  const handleSelectPatient = (patient) => {
    setKey(patient?.name);
    setSearchKey(patient?._id);
    setSelectedClassName(true)
  };

  return (
    <div className="grid lg:grid-flow-col gap-2 h-fit items-center">
      {/* Search */}
      <div className="">
        <InputBoxSelect
          searchBox={true}
          value={"Search by P.ID / Name / Mobile"}
          searchKey={key}
          handleInputChange={(e) => setKey(e)}
          selectedClassName={selectedClassName}
        >
          {patients.map((patient, pindex) => (
            <div
              key={pindex}
              onClick={() => handleSelectPatient(patient)}
              className="flex w-full justify-between"
            >
              <p>{patient?.name}</p>
              <p className="text-[13px] mr-5">
                Id:
                {patient?.patient_id}
              </p>
            </div>
          ))}
        </InputBoxSelect>
      </div>

      <div className="flex lg:flex-row flex-col gap-2  ">
        {/* Date picker Section */}
        <div className="">
          <MultiDatePicker
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        {/* Date picker Section End*/}

        {/* Filter by Status */}
        <div className=" h-[54px] min-w-[200px] lg:max-w-min  ">
          <SelectionInput
            onChange={(e) => setStatus(e)}
            placeholder={"Filter by Status"}
            value={status || "All Status"}
          >
            <div value="" className="">
              All Status
            </div>
            <div value="Pending" className="">
              Pending
            </div>
            <div value="Paid" className="">
              Paid
            </div>
            <div value="Partially-Paid" className="">
              Partially-Paid
            </div>
            <div value="Free Visit" className="">
              Free Visit
            </div>
          </SelectionInput>
        </div>
      </div>

      <div className="">
        <Link to={"/expense"}>
          <Button className={"bg-pink-gradient text-white text-heading2B "}>
            Expenses
          </Button>
        </Link>
      </div>
      <div className="">
        <Link to={"/create_invoice"}>
          <Button type={"primary"} className={"text-heading2B "}>
            Create Invoice
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Functionalities;
