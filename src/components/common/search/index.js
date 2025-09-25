import React from "react";

const SearchInput = ({ placeholder, handleChange, searchKey, className }) => {
  return (
    <div className="w-full ">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.24444 14.4835C8.85331 14.4835 10.4162 13.9467 11.6854 12.9579L16.474 17.7472C16.8317 18.0927 17.4018 18.0828 17.7472 17.725C18.0843 17.376 18.0843 16.8228 17.7472 16.4738L12.9587 11.6845C15.4118 8.52609 14.8406 3.97672 11.6827 1.52317C8.52476 -0.930387 3.97612 -0.359039 1.52294 2.79935C-0.930246 5.95774 -0.358985 10.5071 2.79892 12.9607C4.07027 13.9485 5.63452 14.4843 7.24444 14.4835ZM3.39686 3.39461C5.52185 1.26927 8.96712 1.26923 11.0921 3.39453C13.2172 5.51983 13.2172 8.96563 11.0922 11.091C8.96724 13.2163 5.52196 13.2164 3.39694 11.0911C3.3969 11.091 3.39698 11.0911 3.39694 11.0911C1.27196 8.98124 1.25936 5.54792 3.36886 3.42262C3.37818 3.41325 3.3875 3.40393 3.39686 3.39461Z"
              fill="#A6D9F0"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class={`${className} shadow-card block w-full   p-4 pl-12 text-sm text-darkgrey text-bodyRB focus:border-primary border border-[#B9B9B9] bg-gray-50 rounded-15 focus:outline-none focus:ring-primary focus:ring-1`}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          value={searchKey}
        />
      </div>
    </div>
  );
};

export default SearchInput;
