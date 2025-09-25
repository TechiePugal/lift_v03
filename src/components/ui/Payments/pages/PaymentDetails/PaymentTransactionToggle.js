import React from "react";

const PaymentTransactionToggle = ({ children, toggle, setToggle, pendingInv, paymentHistory }) => {
  const handleToggleClick = (e) => {
    setToggle(e);
  };
  return (
    <div>
      <div className="min-h-full shadow-card rounded-15 overflow-x-auto lg:max-h-[300px] overflow-y-auto">
        <div className=" flex justify-between gap-1">
          <div
            className={`w-full shadow-card rounded-tl-15 rounded-tr-15 sticky top-0 p-3  text-darkgrey mb-2 cursor-pointer
            ${toggle === "Payment History" ? "bg-secondary text-bodyBB text-[#4D4D4D]" : "text-bodyRB bg-secondary opacity-[60%]"}
            `}
            onClick={() => handleToggleClick("Payment History")}
          >
            Payment History ({paymentHistory?.length})
          </div>
          <div
            className={`w-full shadow-card rounded-tl-15 rounded-tr-15  bg-opacity-[30%] sticky top-0 p-3   mb-2 cursor-pointer
            ${toggle === "Pending Bills" ? "bg-[#DE4AC4] text-bodyBB text-darkgrey" : "bg-[#DE4AC4] text-[#4D4D4D] opacity-[60%]"}
            `}
            onClick={() => handleToggleClick("Pending Bills")}
          >
            Pending Bills ({pendingInv?.length})
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PaymentTransactionToggle;
