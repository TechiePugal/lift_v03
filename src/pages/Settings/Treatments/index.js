import { useState } from "react";
import { useEffect } from "react";
import Treatments from "../../../components/ui/Settings/Treatments/Treatment";
import { getAllTreatments } from "../../../api/settings/Treatment/treatment";
import FullScreeeSpinner from "../../../components/common/loading/FullScreee";
import useDelayedSearch from "../../../utils/delayedsearch";

const TreatmentsPage = () => {
  const [treatments, SetTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const getTreatments = () => {
    getAllTreatments(searchKey)
      .then((response) => {
        SetTreatments(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  
  /** For delay in search hook */
  useDelayedSearch(getTreatments, 200, [searchKey]);

 
  return (
    <Treatments
      treatments={treatments}
      loading={loading}
      getTreatments={getTreatments}
      setSearchKey={setSearchKey}
      searchKey={searchKey}
    />
  );
};

export default TreatmentsPage;
