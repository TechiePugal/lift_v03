import React, { useEffect, useState } from "react";
import Switch from "../../../../common/Switch/Switch";
import { useDispatch, useSelector } from "react-redux";
import { updateHospitalInfo, updateTreatmentQty } from "../../../../../api/settings/Settings";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import {
  updateTreatmentQtyState,
  userSettings,
} from "../../../../../store/slice/auth-slice";
import { updateLabOrderToPatientState, updateShowBalanceState } from "../../../../../store/slice/hospital-info-slice";

const SendLabOrderToPatientSwitch = () => {
  const { labOrderArrivalUpdate } = useSelector((state) => {
    // console.log(state,"state pending balance")
  return state.hospitalInfo});
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const [switchOn, setSwitchOn] = useState(labOrderArrivalUpdate);
  const dispatch = useDispatch();

  const handleToggleSwitchClick = () => {
    setSwitchOn(!switchOn);
    const payload = { labOrderArrivalUpdate: !labOrderArrivalUpdate };
    updateHospitalInfo(payload, hospitalInfo?._id)
      .then(() => {
        /** Update the redux state */
        dispatch(updateLabOrderToPatientState(!labOrderArrivalUpdate));
        showSuccessToast("Updated Successfully!");
      })
      .catch((error) => {
        showErrorToast(error);
        setSwitchOn(labOrderArrivalUpdate);
      })
      .finally(() => {});
  };

  return (
    <div className=" flex justify-between bg-white rounded-15 shadow-card items-center pl-8 p-5 h-[60px] hover:cursor-pointer hover:scale-01">
      <div className="text-bodyRB text-darkgrey">Lab Order Update to Patients</div>
      <div className="flex gap-3 items-center ">
        <Switch isOn={switchOn} handleClick={handleToggleSwitchClick} />
      </div>
    </div>
  );
};

export default SendLabOrderToPatientSwitch;
