import React, { useEffect, useRef, useState } from "react";
import Arrow from "../../icons/Arrow";
import ReactDOM from "react-dom";

const SelectionInput = ({
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
}) => {
  const childCount = React.Children.count(children);
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const mainDivRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    if (placeholder || (placeholder === "" && !value))
      setSelectedValue(placeholder);
    if (!placeholder && value) setSelectedValue(value);
    if (placeholder && value) setSelectedValue(value);
  }, [placeholder, value, selectedValue]);

  const toggleDropdown = () => {
    const rect = mainDivRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // const handleScroll = () => {
  //   setIsOpen(false);
  // };

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

    if (isOpen) {
      document.addEventListener("scroll", handleScroll, true);
      document.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  /** */
  const [childState, setChildState] = useState([]);
  useEffect(() => {
    // Create an array of objects representing each child and its value
    const mappedChildren = React.Children.map(children, (child) => ({
      value: child.props.value,
      label: child.props.children,
    }));
    setChildState(mappedChildren || []);
  }, [children]);

  return (
    <div className="relative grid grid-flow-row h-full min-h-[45px] w-full">
      {title && (
        <label className="text-darkgrey text-bodyRB mb-[2px]">{title}</label>
      )}
      <div
        onClick={toggleDropdown}
        ref={mainDivRef}
        className={`relative grid grid-flow-row min-w-max bg-white shadow-card  hover:cursor-pointer rounded-15  ${
          error ? "border-[1.5px]  border-danger" : "border border-[#B9B9B9]"
        } ${className} 
        ${
          isOpen
            ? "rounded-bl-none rounded-br-none border-[1.5px] border-[#E7EBEC]"
            : ""
        }
        `}
      >
        <p className="flex items-center pl-5 text-bodyRB text-darkgrey select-none capitalize min-w-max">
          {selectedValue ? selectedValue : value ? value : placeholder}
        </p>
        {!disabled && (
          <div className="absolute inset-y-0 right-0 top-2 flex items-center pr-2 pointer-events-none rotate-90">
            <Arrow />
          </div>
        )}
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={dropRef}
            className={`${
              title ? "top-[75px]" : "top-11"
            }     bg-white shadow-card  rounded-bl-15 rounded-br-15 border-[1.5px] border-[#E7EBEC] border-t-0 max-h-[200px] overflow-auto`}
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
                {childState.map((child, index) => (
                  <div
                    onClick={() => {
                      setSelectedValue(child?.label);
                      closeDropdown();
                      if (onChange && typeof onChange === "function") {
                        onChange(child?.value);
                      }
                    }}
                    key={index}
                    className={`pl-5 border-b h-10 flex items-center capitalize text-bodyRB text-darkgrey overflow-hidden hover:text-white hover:bg-primary hover:cursor-pointer ${
                      index === childCount - 1
                        ? "rounded-br-15 rounded-bl-15"
                        : ""
                    } ${
                      selectedValue === (child?.label || child?.value)
                        ? "!bg-lightgray hover:text-darkgrey hover:cursor-default"
                        : "active:bg-primary active:text-white cursor-pointer"
                    }`}
                  >
                    {child.label}
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

export default SelectionInput;

{
  /* <select
          onChange={onChange}
          name={name}
          disabled={disabled}
          className="  p-2 appearance-none bg-transparent pl-5 text-darkgrey text-bodyRB outline-none capitalize "
        >
          <option
            value=""
            disabled
            selected
            hidden
            className="text-greyedtext opacity-10"
          >
            {placeholder}
          </option>
          {children}
        </select> */
}
