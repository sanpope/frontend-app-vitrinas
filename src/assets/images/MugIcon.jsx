const ShoppingBagIcon = ({
  width = "20px",
  height = "20px",
  fill = "black",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.005 0H1.505C0.942505 0 0.505005 0.46875 0.505005 1V9C0.505005 10.6562 1.84875 12 3.505 12H9.505C11.13 12 12.505 10.6562 12.505 9V7H14.005C15.9113 7 17.505 5.4375 17.505 3.5C17.505 1.59375 15.9113 0 14.005 0ZM11.005 9C11.005 9.84375 10.3175 10.5 9.505 10.5H3.505C2.66125 10.5 2.005 9.84375 2.005 9V1.5H11.005V9ZM14.005 5.5H12.505V1.5H14.005C15.0988 1.5 16.005 2.40625 16.005 3.5C16.005 4.625 15.0988 5.5 14.005 5.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default ShoppingBagIcon;
