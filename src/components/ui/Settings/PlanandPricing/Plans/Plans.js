import React from "react";
import { useSelector } from "react-redux";
import CardSmall from "../../../../common/card/card-small";
import Button from "../../../../common/buttons/Button";
import { updateSubscription } from "../../../../../api/settings/Settings";

const Plans = () => {
  return (
    <div className=" justify-center shadow-card rounded-15 bg-white p-5  pt-8">
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col gap-4 sticky bg-white">
          <h1 className="text-center text-heading2B">Select Your Plan</h1>
          {/* Small card */}
          <div className="">
            <div
              className={`w-full min-w-[200px] h-[60px] p-5 rounded-[15px] gap-[31px] flex justify-between items-center bg-opacity-[25%] shadow-card bg-primary`}
            >
              <div className="text-Heading2B text-primary">Free Trial</div>
              <div className="flex gap-1 items-center">
                <span className="text-bodyRB">Ends on</span>
                <div className={`text-bodyBB text-danger`}>10.12.2023</div>
              </div>
            </div>
          </div>
        </div>
        {/* Essentials */}
        <div className="w-full h-full bg-warning bg-opacity-[30%] rounded-15 p-3 pt-4 pb-4">
          <h1 className="text-center text-heading2B text-[#CFBB00] mb-3">
            Essentials
          </h1>
          <div className="flex flex-col gap-y-3">
            <PlansCard
              color={"pink"}
              duration={"3 Year"}
              save={"Save 15%"}
              upto={"upto ₹4773"}
              amountPerMonth={"637"}
              amountDescription={"₹22,919 billed every 3 years"}
              variant="Essentials"
            />
            <PlansCard
              color={"primary"}
              duration={"Yearly"}
              save={"Save 10%"}
              upto={"upto ₹1061"}
              amountPerMonth={"674"}
              amountDescription={"₹8,089 billed every year"}
              variant="Essentials"
            />
            <PlansCard
              color={"gold"}
              duration={"Monthly"}
              save={""}
              upto={""}
              amountPerMonth={"749"}
              amountDescription={"₹5,089 billed every year"}
              variant="Essentials"
            />
          </div>
        </div>
        {/* Essentials Plans End*/}

        {/* Pro Plans*/}
        <div className="w-full h-full bg-[#6AB483] bg-opacity-[25%] rounded-15 p-3 pt-4 pb-4">
          <h1 className="text-center text-heading2B text-success mb-3">Pro</h1>
          <div className="flex flex-col gap-y-3">
            <PlansCard
              color={"pink"}
              duration={"3 Year"}
              save={"Save 15%"}
              upto={"upto ₹4773"}
              amountPerMonth={"637"}
              amountDescription={"₹22,919 billed every 3 years"}
              currentPlan={true}
              variant="Pro"
            />
            <PlansCard
              color={"primary"}
              duration={"Yearly"}
              save={"Save 10%"}
              upto={"upto ₹1061"}
              amountPerMonth={"674"}
              amountDescription={"₹8,089 billed every year"}
              variant="Pro"
            />
            <PlansCard
              color={"gold"}
              duration={"Monthly"}
              save={""}
              upto={""}
              amountPerMonth={"749"}
              amountDescription={"₹5,089 billed every year"}
              variant="Pro"
            />
          </div>
        </div>
        {/* Pro Plans End*/}
      </div>
    </div>
  );
};

const PlansCard = ({
  color,
  duration,
  save,
  upto,
  amountPerMonth,
  amountDescription,
  currentPlan,
  variant,
}) => {
  const currentUser = useSelector((state) => state.auth);

  // Define a map of colors to border classes
  const colorBorderMap = {
    pink: "border-pink",
    primary: "border-primary",
    gold: "border-gold",
    // Add more colors as needed
  };
  // Get the appropriate border class based on the color prop
  const borderColorClass = colorBorderMap[color] || "border-default"; // Fallback class if color not found

  const getThisPlan = (duration, variant) => {
    /** Need to update the payload dummy datas */
    const payload = {
      "subscription[id]": currentUser?.subscription,
      "subscription_items[item_price_id][0]": duration + "-" + variant,
    };
    /** Once the api call done, will get payment link , need to open the link */
    // updateSubscription()
    //   .then(() => {})
    //   .catch(() => {})
    //   .finally(() => {});
  };

  return (
    <div
      className={`text-darkgrey w-full h-fit p-2 pl-4 pr-4 rounded-15 border ${borderColorClass} flex gap-2 items-center lg:justify-between justify-center`}
    >
      <div className="w-16 max-w-16 text-left">
        {/* 3 Year */}
        <h6 className="text-bodyRB text">{duration}</h6>

        {save && (
          <p className={`text-[10px] font-normal text-${color}`}>
            {/* Save 15% */}
            {save} <br />
            {/* upto ₹4773 */}
          </p>
        )}
        {upto && (
          <p className={`text-[10px] font-normal text-${color}`}>
            {`(${upto})`}
          </p>
        )}
      </div>

      {/* Devider */}
      <div className={` border ${borderColorClass}  h-12`}></div>
      {/* Devider End*/}

      <div className="w-[165px]">
        {/* ₹637 /Month */}
        <h6 className="text-bodyRB">
          <span className="text-heading2B">₹</span>
          <span className="text-heading2B">{amountPerMonth}</span> / Month
        </h6>

        {/* ₹22,919 billed every 3 years */}
        <p className="text-smallRB ">{amountDescription}</p>
      </div>
      {/*  */}
      <div className="">
        {currentPlan ? (
          <p
            className={`text-smallRB font-normal text-${color} w-[95px] text-center`}
          >
            Current Plan
          </p>
        ) : (
          <Button
            type={color}
            className={"text-bodySRB !h-[41px] !w-[95px]"}
            onClick={() => getThisPlan(duration, variant)}
          >
            Get Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default Plans;
