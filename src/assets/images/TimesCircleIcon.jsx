const TimesCircleIcon = ({
  width = "20px",
  height = "20px",
  fill = "black",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.33301 0.25C4.05176 0.25 0.583008 3.71875 0.583008 8C0.583008 12.2812 4.05176 15.75 8.33301 15.75C12.6143 15.75 16.083 12.2812 16.083 8C16.083 3.71875 12.6143 0.25 8.33301 0.25ZM8.33301 14.25C4.86426 14.25 2.08301 11.4688 2.08301 8C2.08301 4.5625 4.86426 1.75 8.33301 1.75C11.7705 1.75 14.583 4.5625 14.583 8C14.583 11.4688 11.7705 14.25 8.33301 14.25ZM11.4893 6.0625C11.6455 5.9375 11.6455 5.6875 11.4893 5.53125L10.8018 4.84375C10.6455 4.6875 10.3955 4.6875 10.2705 4.84375L8.33301 6.78125L6.36426 4.84375C6.23926 4.6875 5.98926 4.6875 5.83301 4.84375L5.14551 5.53125C4.98926 5.6875 4.98926 5.9375 5.14551 6.0625L7.08301 8L5.14551 9.96875C4.98926 10.0938 4.98926 10.3438 5.14551 10.5L5.83301 11.1875C5.98926 11.3438 6.23926 11.3438 6.36426 11.1875L8.33301 9.25L10.2705 11.1875C10.3955 11.3438 10.6455 11.3438 10.8018 11.1875L11.4893 10.5C11.6455 10.3438 11.6455 10.0938 11.4893 9.96875L9.55176 8L11.4893 6.0625Z"
        fill={fill}
      />
    </svg>
  );
};

export default TimesCircleIcon;