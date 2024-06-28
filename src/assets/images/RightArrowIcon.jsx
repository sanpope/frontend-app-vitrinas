import React from "react";

function RightArrowIcon({ width = "50px", height = "20px", fill = "black" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 55 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M49.7574 1.17373L54.5303 5.9467C54.8232 6.23959 54.8232 6.71446 54.5303 7.00736L49.7574 11.7803C49.4645 12.0732 48.9896 12.0732 48.6967 11.7803C48.4038 11.4874 48.4038 11.0126 48.6967 10.7197L52.1893 7.22703H7.9298C7.57875 9.07767 5.95279 10.477 4 10.477C1.79086 10.477 0 8.68617 0 6.47703C0 4.26789 1.79086 2.47703 4 2.47703C5.95279 2.47703 7.57875 3.87638 7.9298 5.72703H52.1893L48.6967 2.23439C48.4038 1.94149 48.4038 1.46662 48.6967 1.17373C48.9896 0.880832 49.4645 0.880832 49.7574 1.17373Z"
        fill={fill}
      />
    </svg>
  );
}

export default RightArrowIcon;
