const Switch3 = ({ isOn, handleClick }) => {
  return (
    <div
      className={`relative flex items-center w-[120px] h-[60px] cursor-pointer ${
        isOn ? "bg-green-500" : "bg-gray-300"
      } rounded-full p-1`}
      onClick={handleClick}
      style={{ transition: "background-color 0.2s ease" }}
    >
      <button
        type="button"
        className={`absolute w-[50px] h-[50px] bg-white rounded-full transition-transform select-none transform ${
          isOn ? "translate-x-[100%]" : ""
        }`}
        style={{ transition: "transform 0.2s ease" }}
      >
        <span
          className={`block absolute top-1/2 -mx-12 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white ${
            isOn ? "" : "hidden"
          }`}
        >
          UP
        </span>
        <span
          className={`block absolute top-1/2 mx-14 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white ${
            isOn ? "hidden" : ""
          }`}
        >
          UP
        </span>
      </button>
    </div>
  );
};

export default Switch3;
