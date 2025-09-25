import React from "react";
import TextAreaBox from "../../../../../../../../common/input/TextAreaBox";
import ToggleButton from "../../../../../../../../common/buttons/ToggleButton";
import Button from "../../../../../../../../common/buttons/Button";
import InputBox from "../../../../../../../../common/input/InputBox";
import Switch from "../../../../../../../../common/Switch/Switch";

const UpdateClinicalDate = ({
  dynamicFields,
  handleTextAreaChange,
  handleFourQuadrantInputChange,
  handleInputChange,
  handleBooleanClick,
  handleUpdate,
  loadingClinicalData,
  renderHeader,
}) => {
  console.log({ dynamicFields });
  return (
    <div className="relative min-w-[200px] lg:w-[750px]">
      <div>
        <p className="absolute -top-8 text-bodyBB">Update Clinical Data</p>
      </div>

      <div>
        {dynamicFields.map((group, index) => {
          return (
            /* Single card */
            <div className="mb-3">
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
                          {item.type === "input_text" && (
                            <InputBox
                              title={item.label}
                              placeholder={item.label}
                              value={item?.value}
                              onChange={(e) =>
                                handleInputChange(item.index, e.target.value)
                              }
                            />
                          )}

                          {/* Render Input Boolean */}
                          {item.type === "input_boolean" && (
                            <ToggleButton
                              isChecked={item.value}
                              handleClick={() => handleBooleanClick(item.index)}
                            >
                              {" "}
                              {item.label}
                            </ToggleButton>
                          )}

                          {/* Render Input Switch */}
                          {item.type === "input_switch" && (
                            <div className="flex flex-col  text-center pl-2 md:items-center">
                              <p className="text-darkgrey text-bodyRB mb-[1px]">
                                {item.label}
                              </p>
                              <Switch
                                handleClick={() =>
                                  handleBooleanClick(item.index)
                                }
                                isOn={item?.value}
                              />
                            </div>
                          )}

                          {/* Render Input Checkbox */}
                          {item.type === "input_checkbox" && (
                            <div className="flex flex-col items-center pl-2">
                              <p className="text-darkgrey text-bodyRB mb-[1px]">
                                {item.label}
                              </p>
                              <input
                                type="checkbox"
                                className="h-[20px] w-[20px] accent-pink  rounded focus:accent-pink-500"
                                checked={item?.value || ""}
                                onClick={() => handleBooleanClick(item.index)}
                              />
                            </div>
                          )}

                          {/* Render Input Textarea */}
                          {item.type === "input_textarea" && (
                            <div className="lg:flex-1 min-w-[270px] max-w-min ">
                              <p className="text-bodyRB text-darkgrey">
                                {item.label}
                              </p>
                              <TextAreaBox
                                type={"textarea"}
                                className={""}
                                placeholder={item.label}
                                value={item?.value || ""}
                                onChange={(e) =>
                                  handleTextAreaChange(
                                    item.index,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          )}

                          {/* Render Input Textarea Full width*/}
                          {item.type === "input_textareafull" && (
                            <div className="lg:flex-1 min-w-full max-w-min ">
                              <p className="text-bodyRB text-darkgrey">
                                {item.label}
                              </p>
                              <TextAreaBox
                                type={"textarea"}
                                className={""}
                                placeholder={item.label}
                                value={item?.value || ""}
                                onChange={(e) =>
                                  handleTextAreaChange(
                                    item.index,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          )}

                          {/* Render Four Quadrant Box */}
                          {item.type === "input_fourquadrant_box" && (
                            <div className=" bg-white ">
                              <p className="text-bodyRB text-darkgrey">
                                {item.label}
                              </p>
                              <div className="">
                                <FourquadrantBox
                                  values={item.value || ""}
                                  handleChange={(e) =>
                                    handleFourQuadrantInputChange(
                                      item.index,
                                      e.target.name,
                                      e.target.value
                                    )
                                  }
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
        {/* Single card end*/}
      </div>
      <div className="md:flex md:justify-end ">
        <div className="md:w-[200px] md:flex gap-2">
          <Button action={"button"} type={"secondary"} className={"!py-[8px]"}>
            Cancel
          </Button>
          <Button
            action={"button"}
            onClick={handleUpdate}
            type={"primary"}
            className={"!py-[8px]"}
            loading={loadingClinicalData}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

const FourquadrantBox = ({
  type,
  onChange,
  value,
  name,
  placeholder,
  error,
  className,
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
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={"tooth3"}
          value={values?.tooth3}
          onChange={handleChange}
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
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          name={"tooth4"}
          value={values?.tooth4}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UpdateClinicalDate;
