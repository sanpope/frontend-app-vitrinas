const CoinsIcon = ({ width = "18px", height = "18px", fill = "white" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C6.6875 0 4 1.125 4 2.5V4.15625C1.65625 4.5 0 5.4375 0 6.5V13.5C0 14.9062 2.6875 16 6 16C9.3125 16 12 14.9062 12 13.5V11.875C14.3125 11.5312 16 10.5938 16 9.5V2.5C16 1.125 13.3125 0 10 0ZM10.5 13.4062C10.1875 13.75 8.59375 14.5 6 14.5C3.375 14.5 1.8125 13.75 1.5 13.4062V12.1562C2.59375 12.6875 4.1875 13 6 13C7.78125 13 9.375 12.6875 10.5 12.1562V13.4062ZM10.5 10.4062C10.1875 10.75 8.59375 11.5 6 11.5C3.375 11.5 1.8125 10.75 1.5 10.4062V9C2.59375 9.625 4.1875 10 6 10C7.78125 10 9.375 9.625 10.5 9V10.4062ZM6 8.5C3.5 8.5 1.5 7.84375 1.5 7C1.5 6.1875 3.5 5.5 6 5.5C8.46875 5.5 10.5 6.1875 10.5 7C10.5 7.84375 8.46875 8.5 6 8.5ZM14.5 9.40625C14.25 9.65625 13.4062 10.0938 12 10.3438V8.84375C12.9688 8.71875 13.8125 8.46875 14.5 8.15625V9.40625ZM14.5 6.40625C14.25 6.65625 13.4062 7.09375 12 7.34375V6.5C12 6.28125 11.9062 6.0625 11.7812 5.875C12.8438 5.6875 13.7812 5.40625 14.5 5V6.40625ZM10 4.5C9.84375 4.5 9.6875 4.5 9.53125 4.5C8.71875 4.25 7.75 4.09375 6.6875 4.03125C5.96875 3.75 5.5 3.40625 5.5 3C5.5 2.1875 7.5 1.5 10 1.5C12.4688 1.5 14.5 2.1875 14.5 3C14.5 3.84375 12.4688 4.5 10 4.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default CoinsIcon;
