import React from "react";

const ExclamationCircleIcon = ({
  width = "12px",
  height = "12px",
  fill = "#FEB220",
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      cursor={"pointer"}
    >
      <path
        d="M6 2C6.27614 2 6.5 2.22386 6.5 2.5V6.5C6.5 6.77614 6.27614 7 6 7C5.72386 7 5.5 6.77614 5.5 6.5V2.5C5.5 2.22386 5.72386 2 6 2Z"
        fill={fill}
      />
      <path
        d="M6 9C6.27614 9 6.5 8.77614 6.5 8.5C6.5 8.22386 6.27614 8 6 8C5.72386 8 5.5 8.22386 5.5 8.5C5.5 8.77614 5.72386 9 6 9Z"
        fill={fill}
      />
      <path
        d="M6 0C2.68661 0 0 2.68661 0 6C0 9.31339 2.68661 12 6 12C9.31339 12 12 9.31339 12 6C12 2.68661 9.31339 0 6 0ZM6 10.9821C3.24911 10.9821 1.01786 8.75089 1.01786 6C1.01786 3.24911 3.24911 1.01786 6 1.01786C8.75089 1.01786 10.9821 3.24911 10.9821 6C10.9821 8.75089 8.75089 10.9821 6 10.9821Z"
        fill={fill}
      />
    </svg>
  );
};

export default ExclamationCircleIcon;
