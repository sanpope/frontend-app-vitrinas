const LockRedIcon = ({
  width = "44px",
  height = "44px",
  fill = "#F7CCD4",
  fillPath = "#E60F0F",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width={width}
        height={height}
        rx="5"
        fill={fill}
        fill-opacity="0.5"
      />
      <path
        d="M27.5 20H26.5V18.5625C26.5 16.0625 24.5 14.0312 22 14C19.5 14 17.5 16.0312 17.5 18.5V20H16.5C15.6562 20 15 20.6875 15 21.5V28.5C15 29.3438 15.6562 30 16.5 30H27.5C28.3125 30 29 29.3438 29 28.5V21.5C29 20.6875 28.3125 20 27.5 20ZM19 18.5C19 16.875 20.3438 15.5 22 15.5C23.625 15.5 25 16.875 25 18.5V20H19V18.5ZM27.5 28.5H16.5V21.5H27.5V28.5Z"
        fill={fillPath}
      />
    </svg>
  );
};

export default LockRedIcon;
