const TshirtIcon = ({
  width = "20px",
  height = "20px",
  fill = "black",
  fillOpacity = "0.25",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.6075 3.78125C20.4825 3.5 20.2638 3.25 19.9825 3.09375L13.795 0C13.4825 0.4375 12.8888 1.59375 10.67 1.59375C8.38878 1.59375 7.79503 0.40625 7.51378 0L1.32628 3.09375C1.04503 3.25 0.826276 3.5 0.732526 3.78125C0.607526 4.09375 0.638776 4.4375 0.795026 4.71875L2.45128 8.03125C2.73253 8.65625 3.48253 8.875 4.04503 8.59375L4.79503 8.25C4.98253 8.15625 5.17003 8.28125 5.17003 8.46875V14.25C5.17003 15.2188 5.95128 16 6.92003 16H14.42C15.3888 16 16.17 15.2188 16.17 14.25V8.46875C16.17 8.28125 16.3575 8.15625 16.5138 8.25L17.2638 8.59375C17.8575 8.90625 18.5763 8.65625 18.8888 8.0625L20.545 4.71875C20.67 4.4375 20.7013 4.09375 20.6075 3.78125ZM17.67 7.125L15.3575 6.03125C15.045 5.875 14.67 6.125 14.67 6.5V14.25C14.67 14.4062 14.545 14.5 14.42 14.5H6.92003C6.76378 14.5 6.67003 14.4062 6.67003 14.25V6.5C6.67003 6.125 6.26378 5.875 5.95128 6.03125L3.67003 7.125L2.26378 4.3125L7.10753 1.90625C7.95128 2.65625 9.23253 3.09375 10.67 3.09375C12.0763 3.09375 13.3575 2.65625 14.2013 1.90625L19.045 4.3125L17.67 7.125Z"
        fill={fill}
      />
    </svg>
  );
};

export default TshirtIcon;
