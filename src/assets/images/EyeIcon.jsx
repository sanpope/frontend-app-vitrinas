const EyeIcon = ({ width = "12", height = "8", fill = "#020202", onClick, p}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      cursor={"pointer"}
      p={p}
    >
      <path
        d="M6 1.95833C5.79948 1.97656 5.59896 1.99479 5.41667 2.04948C5.50781 2.19531 5.54427 2.3776 5.5625 2.54167C5.5625 3.10677 5.08854 3.5625 4.54167 3.5625C4.35937 3.5625 4.17708 3.52604 4.04948 3.4349C3.99479 3.61719 3.95833 3.79948 3.95833 4C3.95833 5.13021 4.86979 6.04167 6 6.04167C7.13021 6.04167 8.04167 5.13021 8.04167 4C8.04167 2.88802 7.13021 1.97656 6 1.97656V1.95833ZM11.1771 3.74479C10.1927 1.8125 8.22396 0.5 6 0.5C3.75781 0.5 1.78906 1.8125 0.804688 3.74479C0.768229 3.81771 0.75 3.90885 0.75 4C0.75 4.10937 0.768229 4.20052 0.804688 4.27344C1.78906 6.20573 3.75781 7.5 6 7.5C8.22396 7.5 10.1927 6.20573 11.1771 4.27344C11.2135 4.20052 11.2318 4.10937 11.2318 4.01823C11.2318 3.90885 11.2135 3.81771 11.1771 3.74479ZM6 6.625C4.19531 6.625 2.53646 5.6224 1.66146 4C2.53646 2.3776 4.19531 1.375 6 1.375C7.78646 1.375 9.44531 2.3776 10.3203 4C9.44531 5.6224 7.78646 6.625 6 6.625Z"
        fill={fill}
      />
    </svg>
  );
};

export default EyeIcon;
