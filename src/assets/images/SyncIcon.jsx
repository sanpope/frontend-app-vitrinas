import React from "react";

const SyncIcon = ({ width = "12px", height = "12px", fill = "black" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.44796 0.479004H8.93754C8.80994 0.479004 8.71879 0.588379 8.71879 0.715983L8.75525 2.50244C7.95317 1.29932 6.56775 0.479004 5.00004 0.479004C2.77608 0.479004 0.934937 2.06494 0.552124 4.1613C0.515666 4.30713 0.625041 4.4165 0.770874 4.4165H1.28129C1.39067 4.4165 1.48181 4.36182 1.50004 4.25244C1.84639 2.64827 3.26827 1.42692 5.00004 1.42692C6.44015 1.42692 7.67973 2.30192 8.24483 3.5415L5.94796 3.48682C5.82035 3.48682 5.72921 3.57796 5.72921 3.70557V4.19775C5.72921 4.32536 5.82035 4.4165 5.94796 4.4165H9.44796C9.55733 4.4165 9.66671 4.32536 9.66671 4.19775V0.697754C9.66671 0.588379 9.55733 0.479004 9.44796 0.479004ZM9.21098 5.58317H8.70056C8.59119 5.58317 8.50004 5.65609 8.48181 5.76546C8.13546 7.36963 6.71358 8.57275 5.00004 8.57275C3.54171 8.57275 2.30212 7.71598 1.73702 6.4764L4.0339 6.53109C4.1615 6.53109 4.27087 6.43994 4.27087 6.31234V5.80192C4.27087 5.69255 4.1615 5.58317 4.05212 5.58317H0.552124C0.42452 5.58317 0.333374 5.69255 0.333374 5.80192V9.30192C0.333374 9.42952 0.42452 9.52067 0.552124 9.52067H1.04431C1.17192 9.52067 1.26306 9.42952 1.26306 9.30192L1.2266 7.51546C2.02869 8.71859 3.4141 9.52067 5.00004 9.52067C7.20577 9.52067 9.04692 7.95296 9.42973 5.85661C9.46619 5.71077 9.35681 5.58317 9.21098 5.58317Z"
        fill={fill}
      />
    </svg>
  );
};

export default SyncIcon;