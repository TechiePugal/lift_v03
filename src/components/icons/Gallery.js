import React from "react";

const Gallery = () => {
  return (
    <svg
      width="66"
      height="66"
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_963_5025)">
        <rect
          width="54"
          height="54"
          rx="15"
          transform="matrix(-1 0 0 1 58 4)"
          fill="white"
        />
      </g>
      <path
        d="M23.0001 30C24.6547 30 26 28.6545 26 27C26 25.3455 24.6547 24 23.0001 24C21.3456 24 20 25.3455 20 27C20 28.6545 21.3456 30 23.0001 30Z"
        fill="#DE4AC4"
      />
      <path
        d="M42.2498 19H19.7499C17.6831 19 16 20.7532 16 22.9064V40.0936C16 42.2468 17.6831 44 19.7499 44H42.2498C44.3169 44 46 42.2468 46 40.0936V22.9064C46 20.7532 44.3169 19 42.2498 19ZM19.7499 22.1251H42.2498C42.664 22.1251 42.9999 22.475 42.9999 22.9064V33.9985L38.2615 28.239C37.7589 27.6251 37.0313 27.2969 36.2499 27.2783C35.4729 27.2829 34.744 27.6422 34.246 28.2642L28.6749 35.2296L26.86 33.3436C25.8341 32.275 24.1645 32.275 23.14 33.3436L19.0001 37.6546V22.9064C19.0001 22.475 19.336 22.1251 19.7499 22.1251Z"
        fill="#DE4AC4"
      />
      <defs>
        <filter
          id="filter0_d_963_5025"
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
            result="effect1_dropShadow_963_5025"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_963_5025"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Gallery;
