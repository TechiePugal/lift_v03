import React from "react";
import LineChartComponent from "../../../common/charts/LineChart";
import DonutChart from "../../../common/charts/DonutChart";
import SelectionInput from "../../../common/input/Select";
import ExportFile from "../../../icons/ExportFile";

const Charts = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
        <div className="grid grid-cols-2 items-center">
          <div className="flex gap-10 mx-2">
            <h1 className="text-bodyEBB text-darkgrey min-w-max">
              New Registrations
            </h1>
            <span className="text-bodyEBB text-[#6AB483]">24</span>
          </div>
          <div className="w-[100px] col-start-3">
            <SelectionInput placeholder={""} className={"h-[40px] mt-1"}>
              <div></div>
            </SelectionInput>
          </div>
          {/*  */}
        </div>
        <div className="grid grid-cols-2 items-center order-3 lg:order-none">
          <div className="flex gap-10">
            <h1 className="text-bodyEBB text-darkgrey mx-2">Appointments</h1>
            <span className="text-bodyEBB text-[#6AB483]">790</span>
          </div>
          <div className="w-[100px] col-start-3">
            <SelectionInput className={"h-[40px] mt-1"}>
              <div></div>
            </SelectionInput>
          </div>
          {/* */}
        </div>
        <div className="grid items-center order-3 lg:order-none">
          <LineChartComponent stroke={"#219FD9"} />
        </div>
        <div className="grid items-center ">
          <LineChartComponent stroke={"#DE4AC4"} />
        </div>
        <div className="grid grid-cols-2 items-center order-3 lg:order-none">
          <div className="flex gap-10">
            <h1 className="text-bodyEBB text-darkgrey mx-2">Top Treatments</h1>
            {/* <span className="text-bodyEBB text-[#6AB483]">790</span> */}
          </div>
          <div className="w-[100px] col-start-3">
            <SelectionInput className={"h-[40px] mt-1"}>
              <div></div>
            </SelectionInput>
          </div>
          {/* */}
        </div>
        <div className="grid grid-cols-2 items-center order-4 lg:order-none">
          <div className="flex gap-10">
            {/* <h1 className="text-bodyEBB text-darkgrey mx-2">Appointments</h1>
            <span className="text-bodyEBB text-[#6AB483]">790</span> */}
          </div>
          <div className="w-[100px] col-start-3">
            <SelectionInput className={"h-[40px] mt-1"}>
              <div></div>
            </SelectionInput>
          </div>
          {/* */}
        </div>
        <div className="grid items-center order-3 lg:order-none">
          <DonutChart />
        </div>
        <div className="order-4 ">
          <div className="bg-white shadow-card rounded-15 p-3">
            {" "}
            <div className="grid md:grid-cols-2 gap-3 items-center">
              <h1 className="text-bodyBB text-darkgrey min-w-fit">
                Average Treatment Time
              </h1>
              <div className="flex gap-2 items-center ">
                <div className="flex-1">
                  <SelectionInput className={""} placeholder={"Month"}>
                    <div>Month</div>
                  </SelectionInput>
                </div>
                <div className="flex-1">
                  <SelectionInput placeholder={"Year"}>
                    <div>1</div>
                  </SelectionInput>
                </div>
                <div className="">
                  <ExportFile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
