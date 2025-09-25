import React from "react";
import Functionalities from "./Functionalities";
import PaymetsTable from "./table";
import FullScreeeSpinner from "../../common/loading/FullScreee";
import NoData from "../../common/nodata";

const PaymentsLayout = ({
  invoices,
  searchKey,
  setSearchKey,
  status,
  setStatus,
  loading,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Functionalities
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        status={status}
        setStatus={setStatus}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <FullScreeeSpinner />
        </div>
      ) : invoices?.length >= 0 ? (
        <>
          {/* List Table */}
          <PaymetsTable invoices={invoices} />
        </>
      ) : (
        <div className="">
          <NoData />
        </div>
      )}
    </div>
  );
};

export default PaymentsLayout;
