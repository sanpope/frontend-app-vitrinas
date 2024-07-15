const SwitchOnIcon = ({ width = "15px", height = "15px", onClick }) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      onClick={onClick}
      cursor={"pointer"}
      viewBox="0 0 30 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="28" height="16" rx="8" fill="#E60F0F" />
      <g filter="url(#filter0_d_552_1855)">
        <g clip-path="url(#clip0_552_1855)">
          <rect x="14" y="2.5" width="12" height="12" rx="6" fill="white" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_552_1855"
          x="10"
          y="0.5"
          width="20"
          height="20"
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
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.137255 0 0 0 0 0.0431373 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_552_1855"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_552_1855"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_552_1855">
          <rect x="14" y="2.5" width="12" height="12" rx="6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SwitchOnIcon;
