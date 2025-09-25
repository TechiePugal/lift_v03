import React, { useEffect, useRef, useState } from "react";
import SearchInput from "../../../../../common/search";
import Button from "../../../../../common/buttons/Button";
import SelectionInput from "../../../../../common/input/Select";

const Functionalities = ({ setSearchKey, searchKey, setSortBy, sortBy }) => {
  const [selectedSort, setSelectedSort] = useState("Sort by Reg. Date");
  const handleSort = (e) => {
    setSelectedSort(e);

    const sortingOptions = {
      "Sort by Reg. Date": "regDate",
      "Sort by PIN": "pin",
      // Add more sorting options if needed
    };

    setSortBy(sortingOptions[e]);
  };
  
  return (
    <div className="grid lg:grid-flow-col lg:grid-cols-5 gap-5 items-center">
      <div className="lg:col-span-2 lg:w-[360px]">
        {/* Search */}
        <SearchInput
          className={"h-[50px]"}
          searchKey={searchKey}
          handleChange={setSearchKey}
          placeholder={"Search by P.ID / Name / Mobile"}
        />
      </div>
      <div className="md:col-start-5">
        <SelectionInput
          onChange={(e) => handleSort(e)}
          value={selectedSort}
          className={"h-[50px]"}
        >
          <div value={"Sort by Reg. Date"}>Sort by Reg. Date</div>
          <div value={"Sort by PIN"}>Sort by PIN</div>
        </SelectionInput>
      </div>
    </div>
  );
};

export default Functionalities;
