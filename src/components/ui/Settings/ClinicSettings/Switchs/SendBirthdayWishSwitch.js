import React, { useEffect, useState } from "react";
import Switch from "../../../../common/Switch/Switch";
import { useDispatch, useSelector } from "react-redux";
import {
  updateHospitalInfo,
  updateTreatmentQty,
} from "../../../../../api/settings/Settings";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import {
  updateTreatmentQtyState,
  userSettings,
} from "../../../../../store/slice/auth-slice";
import { updateSendBirthdayWishState } from "../../../../../store/slice/hospital-info-slice";

const SendBirthDayWishSwitch = () => {
  const { birthdayWish } = useSelector((state) => {
    console.log(state, "state brthdaywish");
    return state.hospitalInfo;
  });
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const [switchOn, setSwitchOn] = useState(birthdayWish);
  const dispatch = useDispatch();

  const handleToggleSwitchClick = () => {
    setSwitchOn(!switchOn);
    const payload = { birthdayWish: !birthdayWish };
    updateHospitalInfo(payload, hospitalInfo?._id)
      .then(() => {
        /** Update the redux state */
        dispatch(updateSendBirthdayWishState(!birthdayWish));
        showSuccessToast("Updated Successfully!");
      })
      .catch((error) => {
        showErrorToast(error);
        setSwitchOn(birthdayWish);
      })
      .finally(() => {});
  };

  return (
    <div className="flex justify-between bg-white rounded-15 shadow-card items-center pl-8 p-5 h-[60px] hover:cursor-pointer hover:scale-01">
      <div className="text-bodyRB text-darkgrey">Birthday Wishes</div>
      <div className="flex gap-3 items-center ">
        <Switch isOn={switchOn} handleClick={handleToggleSwitchClick} />
      </div>
    </div>
  );
};

export default SendBirthDayWishSwitch;
