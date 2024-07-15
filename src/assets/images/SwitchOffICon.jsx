const SwitchOffIcon = ({
  width = "15px",
  height = "15px",
  fill = "black",
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      onClick={onClick}
      cursor={"pointer"}
      viewBox="0 0 30 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="0.5" width="28" height="16" rx="8" fill="#BFBFBF" />
      <g
        clip-path="url(#clip0_11920_15887)"
        filter="url(#filter0_d_11920_15887)"
      >
        <rect x="4" y="2.5" width="12" height="12" rx="6" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_11920_15887"
          x="0"
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
            result="effect1_dropShadow_11920_15887"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11920_15887"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_11920_15887">
          <rect
            width="12"
            height="12"
            fill="white"
            transform="translate(4 2.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SwitchOffIcon;
