import React, { useEffect, useState } from "react";
import Doctors from "../../../components/ui/Settings/Doctors/Doctors";
import { getAllDoctors } from "../../../api/settings/Doctors/doctors";
import useDelayedSearch from "../../../utils/delayedsearch";

const DoctorsPage = () => {
  const [doctors, SetDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const getAllDoctorsData = () => {
    setLoading(true);
    getAllDoctors(searchKey)
      .then((response) => {
        SetDoctors(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  /** For delay in search hook */
  useDelayedSearch(getAllDoctorsData, 200, [searchKey]);

  return (
    <Doctors
      doctors={doctors}
      loading={loading}
      getAllDoctorsData={getAllDoctorsData}
      setSearchKey={setSearchKey}
      searchKey={searchKey}
    />
  );
};

export default DoctorsPage;
