import React from 'react'

const LogoutIcon = () => {
  return (
    <svg
              viewBox="0 0 57 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6" filter="url(#filter0_d_1183_2748)">
                <circle cx="26.5" cy="26.5" r="22.5" fill="#EDF6F9" />
              </g>
              <path
                d="M22 20H28C28.55 20 29 19.55 29 19C29 18.45 28.55 18 28 18H22C20.9 18 20 18.9 20 20V34C20 35.1 20.9 36 22 36H28C28.55 36 29 35.55 29 35C29 34.45 28.55 34 28 34H22V20Z"
                fill="#DE4AC4"
              />
              <path
                d="M35.8562 26.681L33.0168 24.1381C32.9461 24.073 32.8552 24.0283 32.7559 24.0097C32.6565 23.9911 32.5533 23.9994 32.4593 24.0337C32.3653 24.0679 32.2849 24.1265 32.2283 24.202C32.1717 24.2774 32.1415 24.3662 32.1416 24.4571V26.0886H25.0177C24.458 26.0886 24 26.4987 24 27C24 27.5013 24.458 27.9114 25.0177 27.9114H32.1416V29.5429C32.1416 29.953 32.6912 30.1535 33.0067 29.8619L35.846 27.319C36.0496 27.1458 36.0496 26.8542 35.8562 26.681Z"
                fill="#DE4AC4"
              />
              <defs>
                <filter
                  id="filter0_d_1183_2748"
                  x="0"
                  y="0"
                  width="57"
                  height="57"
                  filterUnits="userSpaceOnUse"
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
                    result="effect1_dropShadow_1183_2748"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1183_2748"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
  )
}

export default LogoutIcon