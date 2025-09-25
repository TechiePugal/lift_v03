import React, { useEffect, useState } from "react";
import Switch from "../../../../common/Switch/Switch";
import { useDispatch, useSelector } from "react-redux";
import { updateHospitalInfo, updateTreatmentQty } from "../../../../../api/settings/Settings";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import {
  updateTreatmentQtyState,
  userSettings,
} from "../../../../../store/slice/auth-slice";
import { updateShowBalanceState } from "../../../../../store/slice/hospital-info-slice";

const ShowPendingBalance = () => {
  const { showPendingBalance } = useSelector((state) => {
    // console.log(state,"state pending balance")
  return state.hospitalInfo});
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const [switchOn, setSwitchOn] = useState(showPendingBalance);
  const dispatch = useDispatch();

  const handleToggleSwitchClick = () => {
    setSwitchOn(!switchOn);
    const payload = { showPendingBalance: !showPendingBalance };
    updateHospitalInfo(payload, hospitalInfo?._id)
      .then(() => {
        /** Update the redux state */
        dispatch(updateShowBalanceState(!showPendingBalance));
        showSuccessToast("Updated Successfully!");
      })
      .catch((error) => {
        showErrorToast(error);
        setSwitchOn(showPendingBalance);
      })
      .finally(() => {});
  };

  return (
    <div className=" flex justify-between bg-white rounded-15 shadow-card items-center pl-8 p-5 h-[60px] hover:cursor-pointer hover:scale-01">
      <div className="text-bodyRB text-darkgrey">Show Pending Balance on Invoices</div>
      <div className="flex gap-3 items-center ">
        <Switch isOn={switchOn} handleClick={handleToggleSwitchClick} />
      </div>
    </div>
  );
};

export default ShowPendingBalance;
