import React from "react";

const NoData = () => {
  return (
    <div className="text-bodyRR text-darkgrey flex flex-col items-center justify-center relative  select-none">
      <img src="/empty-box.png" className="w-[200px] h-[200px] opacity-70" />
      <div className="absolute mt-7 ml-2 text-bodyBB -bottom-5">
        No Data Found
      </div>
    </div>
  );
};

export default NoData;
