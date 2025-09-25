import React, { useEffect, useState } from "react";

import Button from "../../../../common/buttons/Button";
import InputBox from "../../../../common/input/InputBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getHospitalInfo,
  updateHospitalInfo,
  updateSerialNumberApi,
} from "../../../../../api/settings/Settings";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import { setHospitalData } from "../../../../../store/slice/hospital-info-slice";
import ShowQuantity from "../Switchs/ShowQuantity";

const RegNumber = ({ serialNo, prefix }) => {
  const currentUser = useSelector((state) => state.auth);
  const [clinicEdit, setClinicEdit] = useState(false);
  const [serialNumber, setSerialNumber] = useState(serialNo);
  const [prefixValue, setPrefixValue] = useState(prefix);
  const [loadingPrefix, setLoadingPrefix] = useState(false);
  const [loadingSno, setLoadingSno] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setSerialNumber(serialNo);
  }, [serialNo]);

  const handleEditClinicData = (e) => {
    e.stopPropagation();
    setClinicEdit(!clinicEdit);
  };

  /** Get Hospital Info */
  const getHospitalInfoData = () => {
    /** pass company id */
    if (currentUser?.companyId)
      getHospitalInfo(currentUser?.companyId)
        .then((response) => {
          dispatch(setHospitalData(response?.data?.data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
  };

  const updateSerialNumber = () => {
    setLoadingSno(true);
    const payload = { value: parseInt(serialNumber) };
    updateSerialNumberApi(payload)
      .then((response) => {
        setClinicEdit(false);
        getHospitalInfoData();
        showSuccessToast("Successfully updated");
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error);
      })
      .finally(() => {
        setLoadingSno(false);
      });
  };
  const updatePrefix = () => {
    setLoadingPrefix(true);
    const payload = { patientId_prefix: prefixValue };
    updateHospitalInfo(payload, currentUser?.companyId)
      .then((response) => {
        showSuccessToast("Successfully updated");
        getHospitalInfoData();
        setClinicEdit(false);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error);
      })
      .finally(() => {
        setLoadingPrefix(false);
      });
  };
  return (
    <div className="shadow-card rounded-15 p-5 bg-white">
      <div className="flex items-center gap-3">
        <div className="pt-4">
          <h1 className="mb-4 text-bodyBB text-darkgrey">Clinic Settings</h1>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="pt-4">
          <h1 className="mb-4 text-bodyBB text-darkgrey min-w-max">
            Patient Registration Number
          </h1>
        </div>
        <div className=" cursor-pointer text-primary flex w-full justify-end">
          {clinicEdit ? (
            <div className="flex gap-2">
              <p onClick={handleEditClinicData}>Cancel</p>
            </div>
          ) : (
            <p onClick={handleEditClinicData}>Edit</p>
          )}
        </div>
      </div>
      <div>
        <div className="max-w-[500px] flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <InputBox
              title={"Prefix"}
              name={"prefix"}
              value={prefixValue}
              disabled={!clinicEdit}
              onChange={(e) => setPrefixValue(e.target?.value)}
              className={`w-[100px] h-[42px]`}
            />
            {clinicEdit && (
              <div className="mt-5">
                <Button
                  type={"primary"}
                  action={"button"}
                  className={"!h-[42px] !w-[100px] !py-[5px]"}
                  onClick={updatePrefix}
                  loading={loadingPrefix}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <InputBox
              name={"value"}
              value={serialNumber}
              disabled={!clinicEdit}
              onChange={(e) => setSerialNumber(e.target.value)}
              type={"number"}
              className={`w-[100px] h-[42px]`}
              title={"Starting Number"}
            />
            {clinicEdit && (
              <div className="mt-5 xl:-ml-7">
                <Button
                  type={"primary"}
                  action={"button"}
                  className={"!h-[42px] !w-[100px] !py-[5px]"}
                  onClick={updateSerialNumber}
                  loading={loadingSno}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
        <ShowQuantity />
      </div>
      </div>
      {/* Toggle Switch */}
      

      {/* Toggle Switch end */}
    </div>
  );
};

export default RegNumber;
