import React from "react";
import CountTile from "./counts/CountTile";
import Notifications from "./notifications/Notifications";
import Charts from "./charts/Charts";

const Dashboard = () => {
  return (
    <div className="grid gap-5 lg:mx-5 pb-10">
      <div className="grid gap-5">
        <h1 className="text-headingBB text-darkgrey">
          Welcome Concepto Clinic
        </h1>
        <div className="mx-8 md:mx-0">
        <CountTile />
        </div>
      </div>
      {/*  */}
      <div className="grid gap-5 mt-10">
        <h1 className="text-headingBB text-darkgrey">Recent Notifications</h1>
        <Notifications />
      </div>
      {/*  */}

      <div className="my-16">
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;
