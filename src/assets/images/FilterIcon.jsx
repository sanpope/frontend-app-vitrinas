import React from "react";

export default function FilterIcon({
  width = "20px",
  height = "20px",
  fill = "black",
  cursor = "pointer",
}) {
  return (
    <svg
      cursor={cursor}
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9687 0H1.99994C0.656186 0 -0.0313137 1.625 0.937436 2.5625L5.99994 7.625V13C5.99994 13.5 6.21869 13.9375 6.59369 14.25L8.59369 15.75C9.56244 16.4062 10.9999 15.7812 10.9999 14.5312V7.625L16.0312 2.5625C16.9999 1.625 16.3124 0 14.9687 0ZM9.49994 7V14.5L7.49994 13V7L1.99994 1.5H14.9999L9.49994 7Z"
        fill={fill}
      />
    </svg>
  );
}
