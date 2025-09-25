import React from "react";
import BellIcon from "../../../icons/BellIcon";
import InventoryIcon from "../../../icons/InventoryIcon";

const Notifications = () => {
  return (
    <div className="grid gap-4">
      <div className="w-full h-[95px] rounded-15 shadow-card bg-white items-center flex justify-between pl-3 pr-3 gap-2">
        <div className="flex gap-5 items-center">
          <div className="min-w-fit">
            <BellIcon />
          </div>
          <div className="text-darkgrey grid gap-2">
            <h3 className="text-bodyBB">Admin Reminder</h3>
            <h6 className="text-bodyRB">Pay electricity bill</h6>
          </div>
        </div>
        <span className="text-bodyLB min-w-fit">1 min ago</span>
      </div>
      <div className="w-full h-[95px] rounded-15 shadow-card bg-white items-center flex justify-between pl-3 pr-3 gap-2">
        <div className="flex gap-5 items-center">
          <div className="min-w-fit">
            <InventoryIcon />
          </div>
          <div className="text-darkgrey grid gap-2">
            <h3 className="text-bodyBB">Inventory Limit Reached</h3>
            <h6 className="text-bodyRB">
              The item ‘Disposable Gloves’ under Category ‘’Medical Supplies’
              has reached the RoL. Re-order the item soon
            </h6>
          </div>
        </div>
        <span className="text-bodyLB min-w-fit">1 min ago</span>
      </div>
    </div>
  );
};

export default Notifications;
