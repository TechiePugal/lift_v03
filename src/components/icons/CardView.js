import React from "react";

const CardView = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_943_32770)">
        <rect
          width="54"
          height="54"
          rx="15"
          transform="matrix(-1 0 0 1 58 4)"
          fill="white"
        />
      </g>
      <path
        d="M18 29.5556V18H29.5556V29.5556H18ZM18 44V32.4444H29.5556V44H18ZM32.4444 29.5556V18H44V29.5556H32.4444ZM32.4444 44V32.4444H44V44H32.4444Z"
        fill="#DE4AC4"
      />
      <defs>
        <filter
          id="filter0_d_943_32770"
          x="0"
          y="0"
          width="66"
          height="66"
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
            result="effect1_dropShadow_943_32770"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_943_32770"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CardView;
