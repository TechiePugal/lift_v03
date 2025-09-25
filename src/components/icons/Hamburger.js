import React from "react";

const Hamburger = () => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2917_84)">
        <rect x="4" y="4" width="42" height="42" rx="10" fill="white" />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.7588 18.6277C15.7588 18.0491 16.2452 17.5801 16.8452 17.5801H34.2279C34.828 17.5801 35.3143 18.0491 35.3143 18.6277C35.3143 19.2063 34.828 19.6753 34.2279 19.6753H16.8452C16.2452 19.6753 15.7588 19.2063 15.7588 18.6277ZM15.7588 24.9134C15.7588 24.3348 16.2452 23.8658 16.8452 23.8658H27.7094C28.3094 23.8658 28.7958 24.3348 28.7958 24.9134C28.7958 25.492 28.3094 25.961 27.7094 25.961H16.8452C16.2452 25.961 15.7588 25.492 15.7588 24.9134ZM15.7588 31.1991C15.7588 30.6205 16.2452 30.1515 16.8452 30.1515H22.2773C22.8773 30.1515 23.3637 30.6205 23.3637 31.1991C23.3637 31.7777 22.8773 32.2467 22.2773 32.2467H16.8452C16.2452 32.2467 15.7588 31.7777 15.7588 31.1991Z"
        fill="#DE4AC4"
      />
      <defs>
        <filter
          id="filter0_d_2917_84"
          x="0"
          y="0"
          width="58"
          height="58"
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
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0784314 0 0 0 0 0.305882 0 0 0 0 0.352941 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2917_84"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2917_84"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Hamburger;
