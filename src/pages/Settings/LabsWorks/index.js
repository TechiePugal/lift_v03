import { useEffect, useState } from "react";
import LabsWorks from "../../../components/ui/Settings/Labs_Works/LabsWorks";
import { getAllLabsWorks } from "../../../api/settings/LabsWorks/labsWorks";
import useDelayedSearch from "../../../utils/delayedsearch";

const LabsWorksPage = () => {
  const [labsWorks, setLabWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const getAllLabWorkData = () => {
    setLoading(true);
    getAllLabsWorks(searchKey)
      .then((response) => {
        setLabWorks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


    /** For delay in search hook */
    useDelayedSearch(getAllLabWorkData, 200, [searchKey]);

  return (
    <div>
      <LabsWorks
        loading={loading}
        labsWorks={labsWorks}
        getAllLabWorkData={getAllLabWorkData}
        setSearchKey={setSearchKey}
        searchKey={searchKey}
      />
    </div>
  );
};

export default LabsWorksPage;
