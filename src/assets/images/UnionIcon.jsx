import React from "react";

export default function UnionIcon({
  width = "20px",
  height = "20px",
  fill = "white",
  cursor = "pointer",
  onClick,
}) {
  return (
    <svg
      cursor={cursor}
      width={width}
      height={height}
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M3.08977 8.51562C3.08977 8.72305 3.25617 8.89062 3.46242 8.89062H6.53743C6.74368 8.89062 6.91008 8.72305 6.91008 8.51562V6.21875H3.08977V8.51562ZM9.3136 0.5H0.686253C0.399143 0.5 0.219847 0.812891 0.363987 1.0625L2.95735 5.46875H7.04485L9.63821 1.0625C9.78 0.812891 9.60071 0.5 9.3136 0.5Z"
        fill={fill}
      />
    </svg>
  );
}
