import { useEffect, useState } from 'react';
import Medicines from '../../../components/ui/Settings/Medicines/Medicine'
import { getAllMedicines } from '../../../api/settings/Medicines/medicines';
import useDelayedSearch from '../../../utils/delayedsearch';

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const getAllMedicinesData = () => {
    setLoading(true);
    getAllMedicines(searchKey)
      .then((response) => {
        setMedicines(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

 

    /** For delay in search hook */
    useDelayedSearch(getAllMedicinesData, 200, [searchKey]);
  
  return (
    <div>
        <Medicines
        loading={loading}
        medicines={medicines}
        getAllMedicinesData={getAllMedicinesData}
        setSearchKey={setSearchKey}
        searchKey={searchKey}
        />
    </div>
  )
}

export default MedicinesPage