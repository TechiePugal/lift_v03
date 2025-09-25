import React, { useEffect, useRef, useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../../icons/Calendar";
import ArrowBackward from "../../../icons/ArrowBackward";
import ArrowForward from "../../../icons/ArrowForward";
import SelectionInput from "../../../common/input/Select";
import Button from "../../../common/buttons/Button";
import { formatDateOneWeekRange } from "../../../../utils/date";
import SearchInput from "../../../common/search";
import { Link } from "react-router-dom";
import MultiDatePicker from "../../../common/datepicker/MultiDatePicker";
import DatePicker from "../../../common/datepicker/DatePicker";

const Functionalities = ({
  setSearchKey,
  searchKey,
  category,
  setCategory,
  selectedCategory,
  setSelectedCategory,
  generatingId,
  handleCategoryButton,
  handleAddItemButton,
  handleSupplierButton
 
}) => {
  return (
    <div className="grid lg:grid-flow-col gap-2 h-fit">
      {/* Search */}
      <div className=" md:col-span-1 col-span-4">
        <SearchInput
          handleChange={(e) => {
            setSearchKey(e);
          }}
          searchKey={searchKey}
          placeholder={"Search by Item Name"}
        />
      </div>

      {/* Filter by Category */}
      <div className="w-full lg:w-[241px] h-[54px] ">
        <SelectionInput
          placeholder={selectedCategory || "Filter by Category"}
          onChange={(e) => setSelectedCategory(e)}
        >
          <div value="" className="">
            Filter by Category
          </div>
          {category?.map((each, index) => {
            return (
              <div key={index} value={each.name} className="">
                {each.name}
              </div>
            );
          })}
        </SelectionInput>
      </div>
      {/* Filter by Category end*/}
      {/* buttons */}
      <div className="grid md:grid-flow-col col-span-4 md:col-span-1 gap-2">
        <Button
          type={"green"}
          loading={generatingId}
          className={"text-heading2B !h-[54px]"}
          onClick={handleCategoryButton}
        >
          Category
        </Button>
        <Button
          type={"purple"}
          loading={generatingId}
          className={"text-heading2B !h-[54px]"}
          onClick={handleSupplierButton}
        >
          Supplier
        </Button>
        <Button
          type={"pink"}
          loading={generatingId}
          className={"text-heading2B !h-[54px]"}
          onClick={handleAddItemButton}
        >
          Add Item
        </Button>
        
      </div>
      
    </div>
  );
};

export default Functionalities;
