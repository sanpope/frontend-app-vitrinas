const LeftArrowICon = ({
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
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      cursor={disabled ? "not-allowed" : "pointer"}
      disabled={disabled}
    >
      <path
        d="M9.33938 2.06621V1.03094C9.33938 0.941211 9.23625 0.891658 9.16661 0.946568L3.12911 5.66219C3.07781 5.70209 3.0363 5.75317 3.00775 5.81154C2.9792 5.86992 2.96436 5.93404 2.96436 5.99902C2.96436 6.06401 2.9792 6.12813 3.00775 6.18651C3.0363 6.24488 3.07781 6.29596 3.12911 6.33585L9.16661 11.0515C9.23759 11.1064 9.33938 11.0568 9.33938 10.9671V9.93184C9.33938 9.86621 9.30857 9.80327 9.25768 9.76309L4.43625 5.99969L9.25768 2.23496C9.30857 2.19478 9.33938 2.13184 9.33938 2.06621Z"
        fill={fill}
      />
    </svg>
  );
};

export default LeftArrowICon;
