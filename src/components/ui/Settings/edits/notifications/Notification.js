import React from "react";
import Close from "../../../../icons/Close";
import Button from "../../../../common/buttons/Button";
import Arrow from "../../../../icons/Arrow";

const Notification = () => {
  return (
    <div className="lg:w-[509px] lg:h-[250px] flex justify-center mt-5">
      <div className="">
        <label className="text-darkgrey text-bodyRB ">Select Time</label>
        <div className="flex gap-x-[24px] mt-2 mb-10">
          <input
            type="number"
            className="rounded-15 border-2 w-[74px] text-center h-[54px] text-darkgrey text-bodyRB"
          />
          <input
            className="border-2 rounded-15 w-[74px] h-[54px] text-center text-darkgrey text-bodyRB"
            type="number"
          />
          <div className="relative">
            <select
              name=""
              className="rounded-15 border-2 p-2 w-[99px] h-[54px] appearance-none bg-transparent pl-5 pr-8 text-darkgrey text-bodyRB"
              id=""
            >
              <div value="">AM</div>
              <div value="">PM</div>
            </select>
            <div className="absolute inset-y-0 right-2 top-1.5 flex items-center pr-2 pointer-events-none rotate-90">
              <Arrow />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button type={"secondary"} className={"text-heading2B"}>Close</Button>
          <Button type={"primary"} className={"text-heading2B"}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
