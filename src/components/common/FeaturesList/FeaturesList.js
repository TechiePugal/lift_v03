import React from "react";
import RedX from "../../icons/RedX";
import Tick from "../../icons/Tick";

const featuresList = [
  { feature: "Appointment & Calendar", essentials: true, pro: true },
  { feature: "EMR with Image Storage", essentials: true, pro: true },
  { feature: "professional Accounting & Billing", essentials: true, pro: true },
  { feature: "Expense & Reminders Management", essentials: true, pro: true },
  { feature: "Advance Dashboards & Reports", essentials: true, pro: true },
  { feature: "Quick Prescription", essentials: true, pro: true },
  {
    feature: "Unlimited Users & Access Restrictions",
    essentials: true,
    pro: true,
  },
  { feature: "WhatsApp Automation", essentials: false, pro: true },
  { feature: "Free WhatsApp Conversations", essentials: false, pro: "5000" },
  {
    feature: "Automated Patient & Doctor Communications",
    essentials: false,
    pro: true,
  },
  { feature: "Free SMS", essentials: "2000", pro: "1000" },
  { feature: "Inventory Management", essentials: false, pro: true },
];

const FeaturesList = () => {
  return (
    <div className="shadow-card rounded-15 bg-white ">
      <div className="w-full h-[60px] bg-secondary rounded-tl-15 rounded-tr-15 grid items-center text-bodyBB text-darkgrey sticky ">
        <div className="grid grid-cols-5 ">
          <div className="col-span-3 pl-8">
            <h2>Features</h2>
          </div>
          <div className="text-center">
            <h2>Essentials</h2>
          </div>
          <div className="text-center">
            <h2>Pro</h2>
          </div>
        </div>
      </div>
      <div>
        {featuresList.map((item, index) => (
          <>
            <div className="grid grid-cols-5 h-[60px] items-center border-b-[1.5px]">
              <div className="col-span-3 pl-8 text-bodyRB  text-darkgrey">
                {item.feature}
              </div>
              <div className="flex justify-center">
                {typeof item?.essentials === "string" ? (
                  <span className="text-bodyRB text-darkgrey">
                    {item.essentials}
                  </span>
                ) : item.essentials ? (
                  <Tick />
                ) : (
                  <RedX />
                )}
              </div>
              <div className="flex justify-center">
                {typeof item?.pro === "string" ? (
                  <span className="text-bodyRB text-darkgrey">{item.pro}</span>
                ) : item.pro ? (
                  <Tick />
                ) : (
                  <RedX />
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default FeaturesList;
