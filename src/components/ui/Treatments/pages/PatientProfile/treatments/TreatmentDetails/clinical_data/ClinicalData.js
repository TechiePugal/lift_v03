import React, { useEffect, useState } from "react";
import Button from "../../../../../../../common/buttons/Button";
import InputBox from "../../../../../../../common/input/InputBox";
import TextAreaBox from "../../../../../../../common/input/TextAreaBox";
import ToggleButton from "../../../../../../../common/buttons/ToggleButton";
import ModalWrapper from "../../../../../../../common/modal/ModalWrapper";
import UpdateClinicalDate from "./update/UpdateClinicalDate";
import Arrow from "../../../../../../../icons/Arrow";
import { groupClinicalData } from "../../../../../../../../utils/clinicalData";
import Switch from "../../../../../../../common/Switch/Switch";

const ClinicalData = ({
  clinicalData,
  setClinicalData,
  updateClinicalDataInfo,
  loadingClinicalData,
}) => {
  const [open, setOpen] = useState(false);
  const [dynamicFields, setDynamicFields] = useState([]);
  const handleUpdateDate = () => {
    setOpen(!open);
  };
  const [collaps, setCollaps] = useState(true);
  const handleCollaps = () => {
    setCollaps(!collaps);
  };
  useEffect(() => {
    const dynamicFields = groupClinicalData({ clinicalData: clinicalData });
    setDynamicFields(dynamicFields);
  }, [clinicalData]);

  const handleTextAreaChange = (itemIndex, newValue) => {
    const updatedConfig = [...clinicalData]; // Create a shallow copy of the clinicalData

    // Update the value of the specific input
    updatedConfig[itemIndex] = {
      ...updatedConfig[itemIndex],
      value: newValue,
    };

    setClinicalData(updatedConfig);
  };

  const handleFourQuadrantInputChange = (itemIndex, tooth, newValue) => {
    const updatedConfig = [...clinicalData]; // Create a shallow copy of the config

    // Update the value of the specific quadrant input
    updatedConfig[itemIndex].value[tooth] = newValue;

    setClinicalData(updatedConfig);
  };

  const handleInputChange = (itemIndex, newValue) => {
    const updatedConfig = [...clinicalData]; // Create a shallow copy of the config

    // Update the value of the specific input
    updatedConfig[itemIndex] = {
      ...updatedConfig[itemIndex],
      value: newValue,
    };

    setClinicalData(updatedConfig);
  };

  const handleBooleanClick = (itemIndex) => {
    const updatedConfig = [...clinicalData]; // Create a shallow copy of the config

    // Toggle the isActive value
    updatedConfig[itemIndex] = {
      ...updatedConfig[itemIndex],
      value: !updatedConfig[itemIndex].value,
    };

    setClinicalData(updatedConfig);
  };

  const handleUpdate = () => {
    updateClinicalDataInfo();
  };

  return (
    <div className="bg-[#A6D9F0] bg-opacity-[20%]  rounded-15 shadow-card p-1 lg:p-4">
      <div className="flex flex-wrap justify-between items-center mb-2">
        <p className="text-bodyBB">Clinical Data</p>
        <div className="w-[200px] flex gap-5 items-center">
          <Button
            onClick={handleUpdateDate}
            type={"primary"}
            className={"py-[8px] text-bodyBB"}
            action={"button"}
          >
            Update
          </Button>
          <div onClick={handleCollaps}>
            <div
              className={`${
                collaps ? "rotate-90" : "rotate-[270deg]"
              } duration-300`}
            >
              <Arrow />
            </div>
          </div>
        </div>
      </div>
      {!collaps && (
        <div className="">
          {/* Single card */}
          {dynamicFields.map((group, index) => {
            // Check if the group has any non-empty values
            const hasValues = group.some(
              (item) =>
                item.value &&
                Object.values(item.value).some((val) => val !== "")
            );

            // Skip rendering if the group has no non-empty values
            if (!hasValues) {
              return null;
            }
            return (
              /* Single card */
              <div key={index} className="mb-3">
                {/* For rendering single Heading */}
                {group.length === 1 && renderHeader(group)}

                {/* Rendesing heading that have >1 group */}
                {group.length > 1 && (
                  <div className="w-full bg-[#6AB483] h-[45px] bg-opacity-[20%] rounded-tl-15 rounded-tr-15 mb-1 flex items-center pl-5">
                    <div key={index} className="group">
                      {renderHeader(group)}
                    </div>
                  </div>
                )}
                <div>
                  {group.length > 1 && (
                    <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px]">
                      <div className="w-full p-2 lg:p-5 flex gap-3 flex-wrap ">
                        {group.map((item, index) => (
                          <React.Fragment key={index}>
                            {/* Render Input Text */}
                            {item.type === "input_text" && item.value && (
                              <InputBox
                                title={item.label}
                                placeholder={item.label}
                                value={item?.value}
                                disabled={true}
                              />
                            )}

                            {/* Render Input Boolean */}
                            {item.type === "input_boolean" && item.value && (
                              <ToggleButton isChecked={item.value}>
                                {" "}
                                {item.label}
                              </ToggleButton>
                            )}

                            {/* Render Input Switch */}
                            {item.type === "input_switch" && item.value && (
                              <div className="flex flex-col  text-center pl-2 md:items-center">
                                <p className="text-darkgrey text-bodyRB mb-[1px]">
                                  {item.label}
                                </p>
                                <Switch isOn={item?.value} disabled={true} />
                              </div>
                            )}

                            {/* Render Input Checkbox */}
                            {item.type === "input_checkbox" && item.value && (
                              <div className="flex flex-col items-center pl-2">
                                <p className="text-darkgrey text-bodyRB mb-[1px]">
                                  {item.label}
                                </p>
                                <input
                                  type="checkbox"
                                  className="h-[20px] w-[20px] accent-pink  rounded focus:accent-pink-500"
                                  checked={item?.value || ""}
                                  disabled={true}
                                />
                              </div>
                            )}

                            {/* Render Input Textarea */}
                            {item.type === "input_textarea" && item.value && (
                              <div className="lg:flex-1 min-w-[270px] max-w-min ">
                                <p className="text-bodyRB text-darkgrey">
                                  {item.label}
                                </p>
                                <TextAreaBox
                                  type={"textarea"}
                                  className={""}
                                  placeholder={item.label}
                                  value={item?.value || ""}
                                  disabled={true}
                                />
                              </div>
                            )}

                            {/* Render Input Textarea Full width*/}
                            {item.type === "input_textareafull" &&
                              item.value && (
                                <div className="lg:flex-1 min-w-full max-w-min ">
                                  <p className="text-bodyRB text-darkgrey">
                                    {item.label}
                                  </p>
                                  <TextAreaBox
                                    type={"textarea"}
                                    className={""}
                                    placeholder={item.label}
                                    value={item?.value || ""}
                                    disabled={true}
                                  />
                                </div>
                              )}

                            {/* Render Four Quadrant Box */}
                            {item.type === "input_fourquadrant_box" &&
                              Object.values(item?.value).some(
                                (value) => value
                              ) && (
                                <div className=" bg-white ">
                                  <p className="text-bodyRB text-darkgrey">
                                    {item.label}
                                  </p>
                                  <div className="">
                                    <FourquadrantBox
                                      values={item.value || ""}
                                      disabled={true}
                                    />
                                  </div>
                                </div>
                              )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Update Clinical Data Modal */}
      <ModalWrapper
        className={"!bg-[#E8F5FA]"}
        open={open}
        handleClose={handleUpdateDate}
      >
        <UpdateClinicalDate
          dynamicFields={dynamicFields}
          handleTextAreaChange={handleTextAreaChange}
          handleFourQuadrantInputChange={handleFourQuadrantInputChange}
          handleInputChange={handleInputChange}
          handleBooleanClick={handleBooleanClick}
          handleUpdate={handleUpdate}
          loadingClinicalData={loadingClinicalData}
          renderHeader={renderHeader}
        />
      </ModalWrapper>
    </div>
  );
};

/** Function for rendering heading */
const renderHeader = (group) => {
  switch (group[0]?.type) {
    case "h1_header":
      return <h1>{group[0].label}</h1>;
    case "h2_header":
      return <h2>{group[0].label}</h2>;
    case "h3_header":
      return (
        <div className="">
          <h1 className="text-bodyBB text-darkgrey">{group[0].label}</h1>
        </div>
      );
    case "h4_header":
      return <h1 className="text-bodyRB text-darkgrey">{group[0].label}</h1>;
    case "h5_header":
      return <h1 className="text-bodyLB text-darkgrey">{group[0].label}</h1>;
    case "divider":
      return <div className="border-[1.5px] border-[#B9B9B9] h-2 w-full"></div>;
    default:
      return null;
  }
};
const FourquadrantBox = ({
  type,
  onChange,
  value,
  name,
  placeholder,
  error,
  className,
  disabled,
  values,
  handleChange,
}) => {
  return (
    <div className="flex">
      <div className="">
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={"tooth1"}
          value={values?.tooth1}
          onChange={handleChange}
          disabled={disabled}
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={"tooth3"}
          value={values?.tooth3}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      <div>
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={"tooth2"}
          value={values?.tooth2}
          onChange={handleChange}
          disabled={disabled}
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={"tooth4"}
          value={values?.tooth4}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ClinicalData;
