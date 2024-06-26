import React from "react";

const CloseIcon = ({ width = "20px", height = "20px", fill = "black" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.46875 5.5L10.8438 2.15625C11.0312 1.96875 11.0312 1.625 10.8438 1.4375L10.0625 0.65625C9.875 0.46875 9.53125 0.46875 9.34375 0.65625L6 4.03125L2.625 0.65625C2.4375 0.46875 2.09375 0.46875 1.90625 0.65625L1.125 1.4375C0.9375 1.625 0.9375 1.96875 1.125 2.15625L4.5 5.5L1.125 8.875C0.9375 9.0625 0.9375 9.40625 1.125 9.59375L1.90625 10.375C2.09375 10.5625 2.4375 10.5625 2.625 10.375L6 7L9.34375 10.375C9.53125 10.5625 9.875 10.5625 10.0625 10.375L10.8438 9.59375C11.0312 9.40625 11.0312 9.0625 10.8438 8.875L7.46875 5.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default CloseIcon;
