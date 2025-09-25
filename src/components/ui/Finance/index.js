import React from "react";
import CardSmall from "../../common/card/card-small";
import SelectionInput from "../../common/input/Select";
import ExportFile from "../../icons/ExportFile";
import MultiDatePicker from "../../common/datepicker/MultiDatePicker";
import LineChartComponent from "../../common/charts/LineChart";
import DonutChart from "../../common/charts/DonutChart";

const FinanceLayout = () => {
  return (
    <div className="grid gap-5 gap-y-8 pb-20">
      {/* Cards */}
      <div className=" grid lg:grid-cols-3 gap-2 justify-items-center">
        <CardSmall
          label={"Total Appointments"}
          value={0}
          className={" bg-warning text-bodySBB"}
          valueColor={""}
        />
        <CardSmall
          label={"Total free visits"}
          value={0}
          className={" bg-primary text-bodySBB"}
          valueColor={""}
        />
        <CardSmall
          className={" bg-danger text-bodySBB"}
          label={"Outstanding till date"}
          value={0}
          valueColor={""}
        />
      </div>
      {/*  */}
      <div className="grid grid-cols-2 items-center">
        <div className=" col-start-3 ">
          <MultiDatePicker />
        </div>
      </div>
      <div className="grid md:grid-cols-1 gap-x-6 gap-y-5">
        <div className="grid grid-cols-2 items-center">
          <div className="flex gap-10">
            <h1 className="text-bodyEBB text-darkgrey min-w-max">
              Total Revenue
            </h1>
            <span className="text-bodyEBB text-[#6AB483]">24,790</span>
          </div>
        </div>
        <div className="grid items-center ">
          <LineChartComponent stroke={"#DE4AC4"} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
        <div className="grid grid-cols-2 items-center">
          <div className="flex gap-10">
            <h1 className="text-bodyEBB text-darkgrey min-w-max">Income</h1>
            <span className="text-bodyEBB text-[#6AB483]">24,790</span>
          </div>
          {/*  */}
        </div>
        <div className="grid grid-cols-2 items-center order-3 lg:order-none">
          <div className="flex gap-10">
            <h1 className="text-bodyEBB text-darkgrey">Expense</h1>
            <span className="text-bodyEBB text-[#6AB483]">790</span>
          </div>
          {/* */}
        </div>
        <div className="grid items-center order-3 lg:order-none">
          <LineChartComponent stroke={"#219FD9"} />
        </div>
        <div className="grid items-center ">
          <LineChartComponent stroke={"#DE4AC4"} />
        </div>
        <div className="grid items-center order-3 lg:order-none">
          <DonutChart />
        </div>
        <div className="grid items-center ">
          <DonutChart />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
        <div className="bg-white shadow-card rounded-15 p-3">
          {" "}
          <div className="grid md:grid-cols-2 gap-3 items-center">
            <h1 className="text-bodyBB text-darkgrey min-w-fit">
              Appointment Report
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
        <div className="bg-white shadow-card rounded-15 p-3">
          {" "}
          <div className="grid md:grid-cols-2 gap-3 items-center">
            <h1 className="text-bodyBB text-darkgrey min-w-max">
              Patient Report
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
        <div className="bg-white shadow-card rounded-15 p-3">
          <div className="grid md:grid-cols-2 items-center gap-3">
            <h1 className="text-bodyBB text-darkgrey min-w-max">
              Revenue Report
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
              <div>
                <ExportFile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceLayout;
