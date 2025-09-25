import React, { useState } from "react";
import Functionalities from "./Functionalities/Functionalities";
import PatientsTable from "./table";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import FullScreeeSpinner from "../../../../common/loading/FullScreee";
import NoData from "../../../../common/nodata";

const PatientDatabase = ({
  patients,
  loading,
  getAllUserData,
  setSearchKey,
  searchKey,
  setSortBy,
  sortBy,
}) => {
  return (
    <div>
      <div className="mb-2">
        <Functionalities
          setSearchKey={setSearchKey}
          searchKey={searchKey}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <FullScreeeSpinner />
        </div>
      ) : // {/* Table */}
      patients?.length >= 0 ? (
        <PatientsTable patients={patients} />
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default PatientDatabase;
