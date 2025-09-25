import React from "react";
import Button from "../../../common/buttons/Button";

const CheckOut = ({
  name,
  hangleConfirmCheckOut,
  handleRejectCheckOut,
  loadingCheckOut,
}) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-bodySRB w-[313px] h-[25px] text-center text-darkgrey">
        Are you sure
        <span className="text-bodyBB pl-1 pr-1 text-darkgrey">{name}</span>
        has checked-Out ?
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleRejectCheckOut}
          type={"danger"}
          className={"text-heading2B"}
        >
          No
        </Button>
        <Button
          onClick={hangleConfirmCheckOut}
          type={"yes"}
          loading={loadingCheckOut}
          className={"text-heading2B"}
        >
          Yes
        </Button>
      </div>
    </div>
  );
};

export default CheckOut;
