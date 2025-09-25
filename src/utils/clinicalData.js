// clinicalDataUtils.js

export const groupClinicalData = ({ clinicalData }) => {
  const data = clinicalData;
  const groupedData = [];
  let currentGroup = [];

  const addToGroup = (item, index) => {
    currentGroup.push({ ...item, index });
  };

  const handleHeaderType = (item, index) => {
    if (currentGroup.length > 0) {
      groupedData.push(currentGroup);
      currentGroup = [];
    }
    addToGroup(item, index);
  };

  const handleDividerType = (item, index) => {
    if (currentGroup.length > 0) {
      groupedData.push(currentGroup);
      currentGroup = [];
    }
    groupedData.push([{ ...item, index }]);
  };

  for (let index = 0; index < data?.length; index++) {
    const item = data[index];

    switch (item?.type) {
      case "h1_header":
      case "h2_header":
      case "h3_header":
      case "h4_header":
      case "h5_header":
        handleHeaderType(item, index);
        break;
      case "divider":
        handleDividerType(item, index);
        break;
      default:
        addToGroup(item, index);
        break;
    }
  }

  if (currentGroup.length > 0) {
    groupedData.push(currentGroup);
  }

  return groupedData;
};
