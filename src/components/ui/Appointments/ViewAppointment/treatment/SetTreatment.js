import React from "react";
import SelectionInput from "../../../../common/input/Select";
import InputBox from "../../../../common/input/InputBox";
const SetTreatment = ({ editData }) => {
  return (
    <div className="w-[300px] md:w-full lg:w-full ">
      <div className="shadow-card rounded-15">
        <div
          className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 text-bodyBB text-darkgrey mb-3`}
        >
          Set Treatment
        </div>
        <div className="overflow-auto lg:overflow-visible">
          <table className="w-full border-separate border-spacing-y-0.5 overflow-y-scroll ">
            <thead className="border-b">
              <tr className="text-bodyBB text-darkgrey ">
                <th className="pl-3 border-b-2">Sl No</th>
                <th className="sticky left-0 bg-white border-b-2">Teeth</th>
                <th className="sticky left-0 bg-white border-b-2">Treatment</th>
                {/* <th className="sticky left-0 bg-white border-b-2">
                  Estimated Duration
                </th> */}
                <th className="border-b-2"></th>
                <th className="border-b-2"></th>
              </tr>
            </thead>
            <tbody className="">
              {editData?.next_treatment_info?.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="text-bodyRB border-b-2 ">{index + 1}</td>
                  <td className=" bg-white border-b-2 h-[100px] ">
                    <div className="flex justify-center">
                      <FourquadrantBox
                        data={editData}
                        index={index}
                        disabled={true}
                      />
                    </div>
                  </td>
                  <td className="border-b-2">
                    <SelectionInput
                      disabled={true}
                      className={"py-2 h-[55px]"}
                      placeholder={item.name}
                    >
                      <div value={"test"}>test</div>
                    </SelectionInput>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  data,
  index,
  disabled,
}) => {
  return (
    <div className="flex">
      <div className="">
        <InputBox
          className={"!w-[72px] !h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          disabled={disabled}
          name={`next_treatment_info.${index}.teeth1`}
          value={data?.next_treatment_info[index]?.teeth1}
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          disabled={disabled}
          name={`next_treatment_info.${index}.teeth3`}
          value={data?.next_treatment_info[index]?.teeth3}
        />
      </div>
      <div>
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          disabled={disabled}
          name={`next_treatment_info.${index}.teeth2`}
          value={data?.next_treatment_info[index]?.teeth2}
        />
        <InputBox
          className={"w-[72px] h-[44px] rounded-[10px] text-center"}
          type={"text"}
          placeholder={""}
          disabled={disabled}
          name={`next_treatment_info.${index}.teeth4`}
          value={data?.next_treatment_info[index].teeth4}
        />
      </div>
      {/* {data.errors.teeth1 && (
        <p className="text-danger text-smallLB mx-2 my-0.5">{error}</p>
      )} */}
    </div>
  );
};

export default SetTreatment;
