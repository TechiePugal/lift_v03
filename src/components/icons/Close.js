import React from "react";

const Close = ({ className }) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="10" fill="#DE4AC4" />
      <g filter="url(#filter0_d_1027_18747)">
        <path
          d="M15 4C8.87143 4 4 8.87143 4 15C4 21.1286 8.87143 26 15 26C21.1286 26 26 21.1286 26 15C26 8.87143 21.1286 4 15 4ZM19.2429 20.5L15 16.2571L10.7571 20.5L9.5 19.2429L13.7429 15L9.5 10.7571L10.7571 9.5L15 13.7429L19.2429 9.5L20.5 10.7571L16.2571 15L20.5 19.2429L19.2429 20.5Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1027_18747"
          x="0"
          y="0"
          width="34"
          height="34"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1027_18747"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1027_18747"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Close;
