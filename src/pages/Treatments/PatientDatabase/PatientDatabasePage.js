import React, { useEffect, useState } from "react";
import PatientDatabase from "../../../components/ui/Treatments/pages/PatientDatabase/PatientDatabase";
import { getAllPatients } from "../../../api/Treatments/PatientDatabase/PatientDatabase";
import { showErrorToast } from "../../../utils/toaster";
import Pagination from "../../../components/common/pagination/Pagination";
import useDelayedSearch from "../../../utils/delayedsearch";

const PatientDatabasePage = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("regDate")
  const PageSize = 8;
  const [count, setCount] = useState(0);

  const getPatientsData = () => {
    setLoading(true);
    getAllPatients(searchKey, sortBy)
      .then((response) => {
        console.log({ response });
        setPatientsData(response?.data?.data);
        setCount(response?.data?.count);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // useEffect(() => {
  //   getPatientsData();
  // }, []);

    /** For delay in search hook */
    useDelayedSearch(getPatientsData, 200, [searchKey, sortBy]);

  return (
    <div>
      <PatientDatabase
        patients={patientsData}
        loading={loading}
        getPatientsData={getPatientsData}
        setSearchKey={setSearchKey}
        searchKey={searchKey}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
      {/* <Pagination
        currentPage={currentPage}
        totalCount={count}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      /> */}
    </div>
  );
};

export default PatientDatabasePage;
