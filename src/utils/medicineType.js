const Tablet_Units = [
  {
    label: "-",
    value: "0",
  },
  {
    label: "1/2",
    value: "0.5",
  },
  {
    label: "1",
    value: "1",
  },
];
const Syrup_Units = [
  {
    label: "-",
    value: "0",
  },
  {
    label: "3 ml",
    value: "3",
  },
  {
    label: "5 ml",
    value: "5",
  },
  {
    label: "10 ml",
    value: "10",
  },
  {
    label: "15 ml",
    value: "15",
  },
];

export const handleMedicineType = (e) => {
  if (
    e === "Tablet" ||
    e === "Capsule" ||
    e === "Ointment" ||
    e === "Injection" ||
    e === "Toothpaste" ||
    e === "Gel" ||
    e === "Others" ||
    e === "Toothbrush" ||
    e === "Gargle" ||
    e === "Tablet_Units"
  ) {
    return { type: e, units: Tablet_Units };
  } else if (e === "Syrup" || e === "Mouthwash" || e === "Syrup_Units") {
    return { type: e, units: Syrup_Units };
  } else {
    return { type: "", units: [] };
  }
};

const Units = {
  tablet: [
    { label: "-", value: "0" },
    { label: "1/2", value: "0.5" },
    { label: "1", value: "1" },
  ],
  syrup: [
    { label: "-", value: "0" },
    { label: "3 ml", value: "3" },
    { label: "5 ml", value: "5" },
    { label: "10 ml", value: "10" },
    { label: "15 ml", value: "15" },
  ],
};

export const getUnitLabel = (medicineType, value) => {
  let selectedUnits = [];
  try {
    if (
      medicineType === "Tablet" ||
      medicineType === "Capsule" ||
      medicineType === "Ointment" ||
      medicineType === "Injection" ||
      medicineType === "Toothpaste" ||
      medicineType === "Gel" ||
      medicineType === "Others" ||
      medicineType === "Toothbrush" ||
      medicineType === "Gargle" ||
      medicineType === "Tablet_Units"
    ) {
      selectedUnits = Units["tablet"];
    } else if (
      medicineType === "Syrup" ||
      medicineType === "Mouthwash" ||
      medicineType === "Syrup_Units"
    ) {
      selectedUnits = Units["syrup"];
    }

    const unit = selectedUnits.find(
      (unit) => parseFloat(unit?.value) === parseFloat(value)
    );

    return unit ? unit.label : "-";
  } catch {
    return "-";
  }
};
