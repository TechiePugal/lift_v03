import React, { useEffect, useState } from "react";
import Switch from "../../../../common/Switch/Switch";
import { useDispatch, useSelector } from "react-redux";
import { updateTreatmentQty } from "../../../../../api/settings/Settings";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import {
  updateTreatmentQtyState,
  userSettings,
} from "../../../../../store/slice/auth-slice";

const ShowQuantity = () => {
  const { treatment_qty } = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.auth);
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const [switchOn, setSwitchOn] = useState(treatment_qty);
  const dispatch = useDispatch();

  const handleToggleSwithcClick = () => {
    setSwitchOn(!switchOn);
    const payload = { treatment_qty: !treatment_qty };
    updateTreatmentQty(payload, hospitalInfo?._id)
      .then(() => {
        /** Update the redux state */
        dispatch(updateTreatmentQtyState(!treatment_qty));
        showSuccessToast("Updated Successfully!");
      })
      .catch((error) => {
        showErrorToast(error);
        setSwitchOn(treatment_qty);
      })
      .finally(() => {});
  };

  return (
    <div className=" flex justify-between bg-white rounded-15 shadow-card items-center pl-8 p-5 h-[60px] hover:cursor-pointer hover:scale-01">
      <div className="text-bodyRB text-darkgrey">Show quantity in invoices</div>
      <div className="flex gap-3 items-center ">
        <Switch isOn={switchOn} handleClick={handleToggleSwithcClick} />
      </div>
    </div>
  );
};

export default ShowQuantity;
