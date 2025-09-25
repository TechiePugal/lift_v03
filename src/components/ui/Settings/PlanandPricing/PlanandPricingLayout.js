import React from "react";
import Plans from "./Plans/Plans";
import FeaturesList from "../../../common/FeaturesList/FeaturesList";

const PlanandPricingLayout = () => {
  return (
    <div className=" pb-10">
      <div className="flex lg:flex-row flex-col gap-3">
        <div className="md:w-[60%]">
          <FeaturesList />
        </div>
        <div className="md:w-[40%]">
          <Plans />
        </div>
      </div>
      <div className="flex w-full justify-end mt-8">
        <p className="text-bodyRB text-darkgrey text-right">
          No upgrade / downgrade charges.
          <br />
          Taxes as applicable.
          <br />
          tnc apply*
          <br />
          credits valid till subscription expiry*
        </p>
      </div>
    </div>
  );
};

export default PlanandPricingLayout;
