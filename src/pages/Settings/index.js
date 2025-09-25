import React, { useEffect, useState } from "react";
import Settings from "../../components/ui/Settings/Settings";
import {
  getHospitalInfo,
  getSerialNumber,
  getSettingsCounts,
} from "../../api/settings/Settings";
import FullScreeeSpinner from "../../components/common/loading/FullScreee";
import { useSelector } from "react-redux";

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState([]);
  const [serialNo, setSerialNo] = useState("");
  const [prefix, setPrefix] = useState("");
  const currentUser = useSelector((state) => state.auth);

  const getCounts = () => {
    setLoading(true);
    getSettingsCounts()
      .then((response) => {
        const data = [
          {
            label: "Admin Users",
            value: response.data.counts?.users,
            path: "admin_users",
          },
          {
            label: "Doctors",
            value: response.data.counts?.doctors,
            path: "doctors",
          },
          {
            label: "Treatments",
            value: response.data.counts?.treatments,
            path: "treatments",
          },
          {
            label: "Medicines",
            value: response.data.counts?.medicines,
            path: "medicines",
          },
          { label: "Labs", value: response.data.counts?.labs, path: "labs" },
          {
            label: "Lab Works",
            value: response.data.counts?.labWorks,
            path: "labs_works",
          },
        ];
        setCounts(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSerialNo = () => {
    setLoading(true);
    getSerialNumber()
      .then((response) => {
        setSerialNo(response.data?.data?.patient_id);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getPrefix = () => {
    setLoading(true);
    getHospitalInfo(currentUser?.companyId)
      .then((response) => {
        setPrefix(response.data?.data?.patientId_prefix);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCounts();
    getSerialNo();
    getPrefix();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <FullScreeeSpinner />
      </div>
    );
  }

  return <Settings counts={counts} serialNo={serialNo} prefix={prefix} />;
};

export default SettingsPage;
