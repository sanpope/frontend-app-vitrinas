const DoubleCheckIcon = ({
  width = "14px",
  height = "12px",
  fill = "black",
  onClick,
  disabled,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.875 4.21875C13.9375 4.28125 14 4.375 13.9688 4.46875C13.9688 4.59375 13.9375 4.65625 13.875 4.75L4.6875 13.9375C4.625 14 4.5625 14 4.4375 14C4.34375 14 4.25 14 4.1875 13.9375L0.09375 9.8125C0.03125 9.78125 0 9.6875 0 9.59375C0 9.46875 0.03125 9.375 0.09375 9.3125L0.96875 8.4375C1.03125 8.375 1.125 8.34375 1.25 8.34375C1.34375 8.34375 1.40625 8.375 1.46875 8.4375L4.4375 11.4062L12.5 3.34375C12.5625 3.28125 12.625 3.25 12.7188 3.25C12.8438 3.25 12.9375 3.28125 13 3.34375L13.875 4.21875ZM4.09375 7.9375L1.09375 4.90625C1.03125 4.84375 1 4.75 1 4.65625C1 4.53125 1.03125 4.4375 1.09375 4.375L1.96875 3.5C2.0625 3.4375 2.15625 3.375 2.25 3.375C2.34375 3.375 2.4375 3.4375 2.5 3.5L4.375 5.40625L9.625 0.09375C9.6875 0.03125 9.78125 0 9.875 0C10 0 10.0938 0.03125 10.1562 0.09375L11.0312 1C11.0938 1.0625 11.1562 1.15625 11.1562 1.25C11.1562 1.34375 11.0938 1.4375 11.0312 1.53125L4.625 7.9375C4.5625 8 4.5 8 4.375 8C4.28125 8 4.1875 8 4.09375 7.9375Z"
        fill={fill}
      />
    </svg>
  );
};

export default DoubleCheckIcon;
