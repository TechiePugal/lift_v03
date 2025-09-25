import React from "react";

const ListView = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_943_32805)">
        <rect
          width="54"
          height="54"
          rx="15"
          transform="matrix(-1 0 0 1 58 4)"
          fill="white"
        />
      </g>
      <path
        d="M44 44H18V37.9763H44V44ZM44 34.4957H18V28.472H44V34.4957ZM44 25.0237H18V19H44V25.0237Z"
        fill="#DE4AC4"
      />
      <defs>
        <filter
          id="filter0_d_943_32805"
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
            result="effect1_dropShadow_943_32805"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_943_32805"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ListView;
