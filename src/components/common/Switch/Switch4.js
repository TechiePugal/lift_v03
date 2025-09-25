const Switch4 = ({ isOn, handleClick }) => {
  return (
    <div
      className={`relative flex items-center w-[120px] hover:cursor-pointer  h-[50px] ${
        isOn ? "bg-success" : "bg-danger"
      } rounded-full p-1`}
      onClick={handleClick}
    >
      <button
        type="button"
        className={`absolute  w-[22px] h-[22px] bg-white rounded-full transition-transform select-none  transform ${
          isOn ? "translate-x-[150%]" : ""
        }`}
      >
        <span
          className={`block absolute top-1/2 -mx-4 ml-8 transform  -translate-y-1/2 text-xs text-white ${
            isOn ? "" : "hidden"
          }`}
        >
          INCH DOWN
        </span>
        <span
          className={`block absolute top-1/2 mx-10  transform -translate-y-1/2 text-xs text-white ${
            isOn ? "hidden" : ""
          }`}
        >
          INCH DOWN
        </span>
      </button>
    </div>
  );
};

export default Switch4;
