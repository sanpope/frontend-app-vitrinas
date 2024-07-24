const AlarmClockIcon = ({
  width = "20px",
  height = "20px",
  fill = "#E60F0F",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2.62891C4.125 2.62891 1 5.78516 1 9.62891V9.66016C1 11.2227 1.5 12.6602 2.375 13.8164L1.125 15.0977C1.03125 15.1602 0.96875 15.2852 0.96875 15.4414C0.96875 15.5664 1.03125 15.6914 1.125 15.7852L1.84375 16.5039C1.9375 16.5977 2.0625 16.6602 2.1875 16.6602C2.34375 16.6602 2.46875 16.5977 2.53125 16.5039L3.8125 15.2539C4.96875 16.1289 6.40625 16.6289 7.96875 16.6289C9.5625 16.6289 11 16.1289 12.1875 15.2539L13.4375 16.5039C13.5 16.5977 13.625 16.6289 13.7812 16.6289C13.9062 16.6289 14.0312 16.5977 14.125 16.5039L14.8438 15.7852C14.9375 15.6914 15 15.5664 15 15.4414C15 15.2852 14.9375 15.1602 14.8438 15.0977L13.5938 13.8164C14.4688 12.6602 14.9688 11.2227 14.9688 9.66016C14.9688 9.66016 15 9.66016 15 9.62891C15 5.78516 11.8438 2.62891 8 2.62891ZM8 15.1289C4.9375 15.1289 2.5 12.6914 2.5 9.62891C2.5 6.59766 4.9375 4.12891 8 4.12891C11.0312 4.12891 13.5 6.59766 13.5 9.62891C13.5 12.6914 11.0312 15.1289 8 15.1289ZM3 0.628906C1.34375 0.628906 0 2.00391 0 3.62891C0 4.22266 0.15625 4.78516 0.46875 5.25391L5.03125 1.44141C4.5 0.941406 3.78125 0.660156 3 0.628906ZM8.75 9.78516V5.87891C8.75 5.75391 8.625 5.62891 8.5 5.62891H7.5C7.34375 5.62891 7.25 5.75391 7.25 5.87891V10.0352C7.25 10.3477 7.375 10.6289 7.625 10.8164L9.625 12.4102C9.65625 12.4414 9.71875 12.4727 9.78125 12.4727H9.8125C9.875 12.4727 9.9375 12.4414 9.96875 12.3789L10.5938 11.5977C10.625 11.5664 10.6562 11.5039 10.6562 11.4414C10.6562 11.3477 10.625 11.2852 10.5625 11.2539L8.75 9.78516ZM13 0.628906C12.1875 0.660156 11.4688 0.941406 10.9375 1.44141L15.5 5.25391C15.8125 4.78516 15.9688 4.22266 16 3.62891C16 2.00391 14.625 0.628906 13 0.628906Z"
        fill={fill}
      />
    </svg>
  );
};

export default AlarmClockIcon;
