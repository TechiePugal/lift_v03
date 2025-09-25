import React, { useEffect, useState } from "react";
import Labs from "../../../components/ui/Settings/Labs/Labs";
import { getAllLabs } from "../../../api/settings/Labs";
import useDelayedSearch from "../../../utils/delayedsearch";

const LabsPage = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const getAllLabsData = () => {
    setLoading(true);
    getAllLabs(searchKey)
      .then((response) => {
        setLabs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  /** For delay in search hook */
  useDelayedSearch(getAllLabsData, 200, [searchKey]);

  return (
    <div>
      <Labs
        loading={loading}
        labs={labs}
        getAllLabsData={getAllLabsData}
        setSearchKey={setSearchKey}
        searchKey={searchKey}
      />
    </div>
  );
};

export default LabsPage;
