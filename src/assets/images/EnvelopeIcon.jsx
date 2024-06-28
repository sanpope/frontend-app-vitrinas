const EnvelopeIcon = ({ width = "12", height = "8", fill = "#020202" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 0H1.5C0.65625 0 0 0.6875 0 1.5V10.5C0 11.3438 0.65625 12 1.5 12H14.5C15.3125 12 16 11.3438 16 10.5V1.5C16 0.6875 15.3125 0 14.5 0ZM14.5 1.5V2.78125C13.7812 3.375 12.6562 4.25 10.2812 6.125C9.75 6.53125 8.71875 7.53125 8 7.5C7.25 7.53125 6.21875 6.53125 5.6875 6.125C3.3125 4.25 2.1875 3.375 1.5 2.78125V1.5H14.5ZM1.5 10.5V4.71875C2.1875 5.28125 3.21875 6.09375 4.75 7.3125C5.4375 7.84375 6.65625 9.03125 8 9C9.3125 9.03125 10.5 7.84375 11.2188 7.3125C12.75 6.09375 13.7812 5.28125 14.5 4.71875V10.5H1.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default EnvelopeIcon;