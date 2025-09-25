import React, { useEffect, useRef, useState } from "react";
import Arrow from "../../icons/Arrow";
import ReactDOM from "react-dom";
import InputBox from "./InputBox";
import SearchInput from "../search";

const InputBoxSelect = ({
  title,
  options,
  placeholder,
  onChange,
  name,
  error,
  children,
  className,
  disabled,
  value,
  handleInputChange,
  searchKey,
  searchBox,
  arrowIcon,
  selectedClassName,
  // setSelectedClassName
}) => {
  // console.log(selectedClassName,"searchkeycolroororor")
  const childCount = React.Children.count(children);
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const mainDivRef = useRef(null);
  const dropRef = useRef(null);

  const placeDropDown = () => {
    const rect = mainDivRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  };
  const handleValueChange = (e) => {
    placeDropDown();
    handleInputChange(e);
    setIsOpen(true);
  };

  const toggleDropdown = () => {
    placeDropDown();
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (mainDivRef.current && !mainDivRef.current.contains(event.target)) {
        closeDropdown();
      }
    }

    function handleScroll(event) {
      // Check if the scroll event occurred inside the dropdown
      const dropdownElement = ReactDOM.findDOMNode(dropRef.current);
      if (dropdownElement && dropdownElement.contains(event.target)) {
        return;
      }

      closeDropdown();
    }

    function handleResize() {
      placeDropDown();
    }

    if (isOpen) {
      document.addEventListener("scroll", handleScroll, true);
      document.addEventListener("click", handleClickOutside);
      window.addEventListener("resize", handleResize);
    } else {
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);
  // useEffect(() => {
  //   if (React.Children.count(children) < 0) {
  //     setSelectedClassName(false);
  //   }
  // }, [children]);

  return (
    <div
      className={`relative grid grid-flow-row h-full md:min-h-[45px] md:max-h-full max-h-[50px]   w-full `}
    >
      {title && (
        <label className="text-darkgrey text-bodyRB mb-[2px]">{title}</label>
      )}
      <div onClick={toggleDropdown} ref={mainDivRef} className={` relative `}>
        {searchBox && (
          <SearchInput
            placeholder={value}
            searchKey={searchKey}
            handleChange={handleValueChange}
            className={`${
              isOpen && React.Children.count(children) > 0
                ? `border-b-0 rounded-b-none `
                : ""
            } ${selectedClassName && React.Children.count(children) > 0? `bg-lightgray` : ``}`}
          />
        )}
        {!searchBox && (
          <InputBox
            value={value}
            placeholder={placeholder}
            onChange={handleValueChange}
            disabled={disabled}
            className={`capitalize !min-h-[45px]
            !w-full
            ${className}
          ${
            isOpen
              ? "rounded-bl-none rounded-br-none border-[1.5px]  border-[#E7EBEC]"
              : ""
          }
          ${error ? `border-danger outline-none ${className}` : ""}
          `}
          />
        )}
        {!disabled && arrowIcon && (
          <div className="absolute inset-y-0 right-0 lg:top-1.5 top-1 flex items-center pr-2 pointer-events-none rotate-90 mt-2 md:mt-0">
            <Arrow />
          </div>
        )}
      </div>
      {isOpen &&
        React.Children?.count(children) > 0 &&
        ReactDOM.createPortal(
          <div
            ref={dropRef}
            className={`${
              title ? "top-[75px]" : "top-11"
            }   bg-white shadow-card  rounded-bl-15 rounded-br-15 border-[1.5px] border-[#E7EBEC] border-t-0 max-h-[200px] overflow-auto `}
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
              zIndex: 99999, // Adjust the z-index as needed
            }}
          >
            <ul className="">
              <li className="">
                {React.Children.map(children, (child, index) => (
                  <div
                    onClick={() => {
                      setSelectedValue(child?.props?.children);
                      closeDropdown();
                      if (onChange && typeof onChange === "function") {
                        onChange(child?.props?.value);
                      }
                    }}
                    key={index}
                    className={`pl-5 border-b h-10 flex items-center capitalize text-bodyRB text-darkgrey overflow-hidden hover:text-white hover:bg-primary hover:cursor-pointer ${
                      index === childCount - 1
                        ? "rounded-br-15 rounded-bl-15"
                        : ""
                    } ${
                      selectedValue === child?.props?.children
                        ? "!bg-lightgray hover:text-darkgrey hover:cursor-default"
                        : ""
                    }`}
                  >
                    {child}
                  </div>
                ))}
              </li>
            </ul>
          </div>,
          document.body
        )}
      {error && (
        <p className="text-danger text-smallLB mx-2 my-0.5 lg:-mb-5 -mb-1 absolute bottom-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputBoxSelect;
