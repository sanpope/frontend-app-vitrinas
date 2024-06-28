const MinusIcon = ({ width = "10px", height = "10px", fill = "white" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 0.333313C11.75 0.333313 12 0.583313 12 0.833313V1.83331C12 2.11456 11.75 2.33331 11.5 2.33331H0.5C0.21875 2.33331 0 2.11456 0 1.83331V0.833313C0 0.583313 0.21875 0.333313 0.5 0.333313H11.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default MinusIcon;
