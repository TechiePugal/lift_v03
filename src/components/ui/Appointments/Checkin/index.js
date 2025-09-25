import React from "react";
import Button from "../../../common/buttons/Button";

const CheckIn = ({
  name,
  hangleConfirmCheckIn,
  handleRejectCheckIn,
  loadingCheckIn,
}) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
        Are you sure
        <span className="text-bodyBB pl-1 pr-1 text-darkgrey">{name}</span>
        has checked-in for the consultation?
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleRejectCheckIn}
          type={"danger"}
          className={"text-heading2B"}
        >
          No
        </Button>
        <Button
          action={"button"}
          onClick={hangleConfirmCheckIn}
          type={"yes"}
          className={"text-heading2B"}
          loading={loadingCheckIn}
        >
          Yes
        </Button>
      </div>
    </div>
  );
};

export default CheckIn;
