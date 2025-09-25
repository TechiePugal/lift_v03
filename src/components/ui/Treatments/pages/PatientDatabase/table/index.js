import React from "react";
import RowItems from "./row";
import { APPOINMENTS } from "../../../../../../__mocks__/user_data";
import TableHeadLayout from "../../../../../common/table/TableHeadLayout";
import { useNavigate } from "react-router-dom";
import Cards from "./mobile/Cards";

const columns = [
  "Sl No",
  "Reg. Date",
  "Patient ID",
  "Patient Name",
  "Mobile Number",
  "Age",
  "Gender",
  "Address",
];

const PatientsTable = ({
  appointment,
  handleCheckOut,
  handleCheckIn,
  handleViewAppointment,
  patients,
}) => {
  const navigation = useNavigate();
  const handleClick = (id) => {
    navigation(`/patient_profile?id=${id}`);
  };

  return (
    <div>
      <div className="overflow-y-auto md:h-[75vh] overflow-auto hidden md:block">
        {/* Heading */}
        <TableHeadLayout columns={columns}>
          {/* Rows */}
          {patients.map((patient, index) => {
            return (
              <tr
                className="text-center cursor-pointer rounded-15 shadow-card min-h-[50px] mb-2 
            hover:bg-bluishgrey "
                onClick={() => handleClick(patient._id)}
                key={index}
              >
                {/* Rows */}
                <RowItems
                  index={index}
                  handleViewAppointment={handleViewAppointment}
                  patient={patient}
                />
              </tr>
            );
          })}
        </TableHeadLayout>
      </div>
      {/* Show only on mobile view */}
      <div className="block md:hidden">
        <Cards patients={patients} columns={columns}  handleViewAppointment={handleViewAppointment}/>
      </div>
    </div>
  );
};

export default PatientsTable;
