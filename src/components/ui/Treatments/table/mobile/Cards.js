import React from "react";
import { ListCard, ListItem } from "../../../../common/card/list-card/ListCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../../common/buttons/Button";

const Cards = ({ treatmentsData, columns }) => {
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  /** For getting values on mobile view */
  const getColumnValue = (treatment, column) => {
    switch (column) {
      case "Sl No":
        return treatment.sno;
      case "Patient ID":
        return (
          <Link to={`/patient_profile?id=${treatment.patient_id}`}>
            <div className={"text-primary underline cursor-pointer"}>
              {hospitalInfo?.patientId_prefix + treatment.patientId}
            </div>
          </Link>
        );
      case "Patient Name":
        return treatment.name;
      case "Mobile Number":
        return treatment.phone;
      case "Treatment":
        return treatment.treatment;
      case "Doctor's Name":
        return treatment.doctor;
      case "Actions":
        // Implement the logic for the "Actions"
        return (
          <div>
            {treatment?.currentTreatmentId ? (
              <Link
                to={`/edit_treatment_details?id=${treatment?.currentTreatmentId}&edit=true`}
              >
                <Button
                  className={
                    "bg-danger text-white h-[30px] w-[76px] text-bodySRB"
                  }
                >
                  Edit
                </Button>
              </Link>
            ) : (
              <Link to={`/treatment_details?id=${treatment?.appointment_id}`}>
                <Button
                  className={
                    "bg-[#6AB483] text-white h-[30px] w-[76px] text-bodySRB"
                  }
                >
                  Add
                </Button>
              </Link>
            )}
          </div>
        );
      default:
        // Handle the case when the column is not recognized
        return "";
    }
  };

  return (
    <div>
      {treatmentsData?.map((treatment, index) => (
        <div key={index} className="cursor-pointer">
          <ListCard>
            {columns.map((column, columnIndex) => (
              <ListItem
                key={columnIndex}
                title={column}
                value={getColumnValue(treatment, column)}
              />
            ))}
          </ListCard>
        </div>
      ))}
    </div>
  );
};

export default Cards;
