import React from "react";

export default function SearchIcon({
  width = "10px",
  height = "10px",
  fill = "black",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.59391 8.88281L7.38818 6.67708C7.3335 6.64062 7.27881 6.60416 7.22412 6.60416H6.98714C7.55225 5.94791 7.91683 5.07291 7.91683 4.125C7.91683 2.04687 6.20329 0.333328 4.12516 0.333328C2.02881 0.333328 0.333496 2.04687 0.333496 4.125C0.333496 6.22135 2.02881 7.91666 4.12516 7.91666C5.07308 7.91666 5.92985 7.57031 6.60433 7.0052V7.24218C6.60433 7.29687 6.62256 7.35156 6.65902 7.40625L8.86475 9.61197C8.95589 9.70312 9.10173 9.70312 9.17464 9.61197L9.59391 9.1927C9.68506 9.11979 9.68506 8.97395 9.59391 8.88281ZM4.12516 7.04166C2.50277 7.04166 1.2085 5.74739 1.2085 4.125C1.2085 2.52083 2.50277 1.20833 4.12516 1.20833C5.72933 1.20833 7.04183 2.52083 7.04183 4.125C7.04183 5.74739 5.72933 7.04166 4.12516 7.04166Z"
        fill={fill}
      />
    </svg>
  );
}
