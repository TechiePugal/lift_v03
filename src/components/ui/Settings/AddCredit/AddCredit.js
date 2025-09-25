import React, { useState } from "react";
import Button from "../../../common/buttons/Button";

const AddCredit = () => {
  const [addWhatsappCredit, setAddWhatsappCredit] = useState(0);
  const [showWhatsappCounter, setShowWhatsappCounter] = useState(false);

  const [addSmsCreditm, setAddSmsCreditm] = useState(0);
  const [showSmsCounted, setShowSmsCounted] = useState(false);

  const handleShowWhatsappCounter = () => {
    setShowWhatsappCounter(!showWhatsappCounter);
  };

  const handleShowSmsCounter = () => {
    setShowSmsCounted(!showSmsCounted);
  };

  const handleWhatsappCount = (e) => {
    if (e >= 0) setAddWhatsappCredit(e);
  };
  const handleSmsCount = (e) => {
    if (e >= 0) setAddSmsCreditm(e);
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <PlansCard
          color={"pink"}
          amount={"₹140"}
          heading={"WhatsApp Credits"}
          amountDescription={"1 Credit = 200 convos"}
          buttonClick={handleShowWhatsappCounter}
          showCounter={showWhatsappCounter}
          count={addWhatsappCredit}
          setCount={handleWhatsappCount}
        />
        <PlansCard
          color={"primary"}
          amount={"₹50"}
          heading={"SMS Credits"}
          amountDescription={"1 Credit = 200 sms"}
          buttonClick={handleShowSmsCounter}
          showCounter={showSmsCounted}
          count={addSmsCreditm}
          setCount={handleSmsCount}
        />
      </div>
      <div className="mt-10 w-full flex justify-center">
        <div className="w-[250px] ">
          <Button type={"primary"} className={"text-heading2B !p-2 !h-[50px]"}>
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

const PlansCard = ({
  color,
  amount,
  amountDescription,
  heading,
  buttonClick,
  showCounter,
  count,
  setCount,
}) => {
  return (
    <div
      className={`text-darkgrey w-full h-fit p-2 pl-4 pr-4 rounded-15 border border-${color} flex gap-2 items-center lg:justify-between justify-center`}
    >
      <div className="w-16 max-w-16 text-left text-darkgrey">
        {amount && (
          <>
            <p className={`text-heading2B `}>{`${amount}`}</p>
            <span>+tax</span>
          </>
        )}
      </div>

      {/* Devider */}
      <div className={`bg-${color} w-[1.5px] h-12`}></div>
      {/* Devider End*/}

      <div className="w-[100px] md:w-[150px]">
        {/* WhatsApp Credits */}
        <h6 className="text-bodyRB mb-1">
          <span className="text-bodyRB">{heading}</span>
        </h6>
        {/* 1 Credit = 200 convos */}
        <p className={`text-smallRB text-${color}`}>{amountDescription}</p>
      </div>
      {/*  */}
      <div className="">
        {showCounter ? (
          <div className="!h-[41px] !w-[95px] pt-1">
            <Counter count={count} setCount={setCount} />
          </div>
        ) : (
          <Button
            type={"success"}
            onClick={buttonClick}
            className={
              "text-bodySRB !h-[41px] !w-[95px] bg-success text-white !text-bodySRB"
            }
          >
            Add
          </Button>
        )}
      </div>
    </div>
  );
};

const Counter = ({ count, setCount }) => {
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className=" h-full w-full border border-success rounded-15">
      <div className="py-[5px] h-full w-full flex justify-center items-center ">
        <button
          onClick={decrement}
          className="text-bodySBB text-success px-2  rounded"
        >
          -
        </button>
        <span className="mx-2 text-bodySBB text-success">{count || 0}</span>
        <button
          onClick={increment}
          className="text-bodySBB text-success px-2 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddCredit;
