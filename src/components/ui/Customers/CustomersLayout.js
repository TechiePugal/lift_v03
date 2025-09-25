import React, { useState } from "react";
import SearchInput from "../../common/search";
import DatePicker from "../../common/datepicker/DatePicker";
import Button from "../../common/buttons/Button";
import CustomersTable from "./table";
import { Link } from "react-router-dom";
import FullScreeeSpinner from "../../common/loading/FullScreee";
import NoData from "../../common/nodata";
import MultiDatePicker from "../../common/datepicker/MultiDatePicker";
import InputBoxSelect from "../../common/input/InputBoxSelect";
import { formatDate } from "../../../utils/date";
import useDelayedSearch from "../../../utils/delayedsearch";

const CustomersLayout = ({
  customers,
  loading,
  searchKey,
  setSearchKey,
//   setStartDate,
//   startDate,
}) => {
//   const [customers, setCustomers] = useState([]);
  const [key, setKey] = useState("");
  const [selectedClassName, setSelectedClassName] = useState(false);
  /** Searching for patient and listing */
 

  /** For delay in search hook */
//   useDelayedSearch(handleSearchPatient, 200, [key]);


  return (
    <div className="grid gap-2">
      <div className="grid lg:grid-cols-4 gap-3">
        <div className="lg:col-span-1">
          <InputBoxSelect
            searchBox={true}
            value={"Search by Name / Phone"}
            // searchKey={key}
            // handleInputChange={(e) => setKey(e)}
            selectedClassName={selectedClassName}
            // setSelectedClassName={setSelectedClassName}
          >
            {/* {patients.map((patient, pindex) => (
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
            ))} */}
          </InputBoxSelect>
        </div>
        <div
          className="lg:w-[200px]"
          style={{
            zIndex: 40, // Adjust the z-index as needed
          }}
        >
          {/* <DatePicker
            className={"!h-[50px]"}
            startDate={new Date(startDate)}
            onDateChange={(e) => setStartDate(formatDate(e))}
          /> */}
        </div>

        <Link to={"/create_customer"} className="lg:col-start-4">
          <Button type={"primary"} className={"text-bodyBB h-[50px]"}>
            Create Customer
          </Button>
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh] ">
          <FullScreeeSpinner />
        </div>
      ) : // {/* Table */}
      customers?.length >= 0 ? (
        <CustomersTable customers={customers} />
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default CustomersLayout;
