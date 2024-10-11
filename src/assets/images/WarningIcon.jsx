const WarningIcon = ({
  width = "50px",
  height = "50px",
  borderRadius = "5px",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: borderRadius }}
    >
      <rect
        width={width}
        height={height}
        rx="5"
        fill="#F7CCD4"
        fill-opacity="0.5"
      />
      <path
        d="M20.75 20.4063L20.9687 23.9063C20.9687 24.125 21.125 24.25 21.3437 24.25H22.625C22.8437 24.25 23 24.0938 23 23.9063L23.2187 20.4063C23.2187 20.1875 23.0625 20 22.8437 20H21.125C20.9062 20 20.75 20.1875 20.75 20.4063ZM23.3125 26C23.3125 25.2813 22.7187 24.6875 22 24.6875C21.25 24.6875 20.6875 25.2813 20.6875 26C20.6875 26.75 21.25 27.3125 22 27.3125C22.7187 27.3125 23.3125 26.75 23.3125 26ZM23.2812 14.75C22.7187 13.7813 21.25 13.75 20.6875 14.75L13.1875 27.7813C12.625 28.75 13.3437 30 14.5 30H29.4687C30.625 30 31.3437 28.7813 30.7812 27.7813L23.2812 14.75ZM14.6562 28.25L21.8125 15.8125C21.9062 15.6875 22.0625 15.6875 22.1562 15.8125L29.3125 28.25C29.4062 28.375 29.3125 28.5 29.1562 28.5H14.8125C14.6562 28.5 14.5625 28.375 14.6562 28.25Z"
        fill="#E60F0F"
      />
    </svg>
  );
};

export default WarningIcon;
