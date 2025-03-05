const PrevIcon = ({
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
      viewBox="0 0 7 10"
      fill="none"
      onClick={onClick}
      cursor={disabled ? "not-allowed" : "pointer"}
      disabled={disabled}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.06066 1.06066L5 0L0 5L5 10L6.06066 8.93934L2.12132 5L6.06066 1.06066Z"
        fill="black"
        fill-opacity="0.25"
      />
    </svg>
  );
};

export default PrevIcon;
