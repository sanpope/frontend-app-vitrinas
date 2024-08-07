const ArrowDownIcon = ({
  width = "20px",
  height = "20px",
  fill = "black",
  fillOpacity = "0.25",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor={"pointer"}
    >
      <path
        d="M16.8934 8.57141H15.8889C15.8206 8.57141 15.7563 8.60489 15.7161 8.6598L11.9112 13.9044L8.10632 8.6598C8.06614 8.60489 8.00186 8.57141 7.93355 8.57141H6.92909C6.84204 8.57141 6.79114 8.67052 6.84204 8.7415L11.5644 15.2518C11.7358 15.4875 12.0867 15.4875 12.2568 15.2518L16.9791 8.7415C17.0313 8.67052 16.9804 8.57141 16.8934 8.57141Z"
        fill={fill}
        fill-opacity={fillOpacity}
      />
    </svg>
  );
};

export default ArrowDownIcon;
