const RedArrowDownIcon = ({
  width = "20px",
  height = "20px",
  fill = "#FF0000",
  display,
}) => {
  return (
    <svg
      display={display}
      width={width}
      height={height}
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.8946 10.1833H13.9881V11.6439H21.4787V5.43644H19.9422V10.0641L12.1243 2.63265L7.32261 6.28411L1.08649 0.35624L0 1.38901L7.20857 8.24129L12.0102 4.58983L17.8946 10.1833Z"
        fill={fill}
      />
    </svg>
  );
};

export default RedArrowDownIcon;
