import React, { useEffect, useState } from "react";
import Functionalities from "./Functionalities";
import LabsTable from "./table";
import FullScreeeSpinner from "../../common/loading/FullScreee";
import NoData from "../../common/nodata";
import { getAllLabs } from "../../../api/settings/Labs";

const LabsLayout = ({
  labs,
  searchKey,
  setSearchKey,
  status,
  setStatus,
  loading,
  labList,
  setSelectedLab,
  selectedLab,
  setStartDate,
  setEndDate,
  endDate,
  startDate
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <Functionalities
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        status={status}
        setStatus={setStatus}
        labList={labList}
        selectedLab={selectedLab}
        setSelectedLab={setSelectedLab}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        endDate={endDate}
        startDate={startDate}
      />
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <FullScreeeSpinner />
        </div>
      ) : labs?.length >= 0 ? (
        <>
          <LabsTable labs={labs} />
        </>
      ) : (
        <div className="h-[50vh]">
          <NoData />
        </div>
      )}
    </div>
  );
};

export default LabsLayout;
