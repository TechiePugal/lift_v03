import { useEffect, useRef, useState } from "react";
import Close from "../../icons/Close";
import ReactDOM from "react-dom";

const ModalWrapper = ({
  open,
  handleClose,
  children,
  title,
  className,
  restrictClickOutSide = false,
}) => {
  const handleParentClick = (e) => {
    if (e.target === e.currentTarget) {
      // Only call handleClose when clicking the parent div, not its children
      handleClose();
    }
  };

  return (
    <div className="">
      {open &&
        ReactDOM.createPortal(
          <div
            style={{ zIndex: 99999 }}
            className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none  focus:outline-none bg-opacity-30  bg-black
        `}
            onClick={!restrictClickOutSide ? handleParentClick : undefined}
          >
            <div
              className="mx-auto my-auto py-5 sm:pb-[400px] xl:pb-[100px] flex "
              onClick={!restrictClickOutSide ? handleParentClick : undefined}
            >
              <div
                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full min-h-fit bg-white outline-none focus:outline-none ${className}`}
              >
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex flex-grow justify-between">
                    <div className="flex justify-center w-full py-5 pl-10">
                      <h1 className="text-bodyEBB text-darkgrey capitalize">
                        {title}
                      </h1>
                    </div>
                    <div
                      onClick={handleClose}
                      className="hover:cursor-pointer w-fit h-fit hover:scale-105"
                    >
                      <Close />
                    </div>
                  </div>
                  <div className="">{children}</div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ModalWrapper;
