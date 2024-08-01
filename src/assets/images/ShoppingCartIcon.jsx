const ShoppingCartIcon = ({
  width = "20px",
  height = "20px",
  fill = "#E60F0F",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.7187 2.62891H5L4.71875 1.25391C4.65625 0.910156 4.34375 0.628906 4 0.628906H0.875C0.65625 0.628906 0.5 0.816406 0.5 1.00391V1.75391C0.5 1.97266 0.65625 2.12891 0.875 2.12891H3.375L5.53125 13.2539C5.1875 13.6289 5 14.0977 5 14.6289C5 15.7539 5.875 16.6289 7 16.6289C8.09375 16.6289 9 15.7539 9 14.6289C9 14.2852 8.875 13.9414 8.71875 13.6289H13.25C13.0937 13.9414 13 14.2852 13 14.6289C13 15.7539 13.875 16.6289 15 16.6289C16.0937 16.6289 17 15.7539 17 14.6289C17 14.0664 16.75 13.5664 16.375 13.1914L16.4062 13.0664C16.5 12.5977 16.1562 12.1289 15.6562 12.1289H6.84375L6.5625 10.6289H16.3125C16.6875 10.6289 16.9687 10.4102 17.0625 10.0664L18.4687 3.56641C18.5625 3.09766 18.2187 2.62891 17.7187 2.62891ZM7 15.3789C6.5625 15.3789 6.25 15.0664 6.25 14.6289C6.25 14.2227 6.5625 13.8789 7 13.8789C7.40625 13.8789 7.75 14.2227 7.75 14.6289C7.75 15.0664 7.40625 15.3789 7 15.3789ZM15 15.3789C14.5625 15.3789 14.25 15.0664 14.25 14.6289C14.25 14.2227 14.5625 13.8789 15 13.8789C15.4062 13.8789 15.75 14.2227 15.75 14.6289C15.75 15.0664 15.4062 15.3789 15 15.3789ZM15.7187 9.12891H6.25L5.28125 4.12891H16.8125L15.7187 9.12891Z"
        fill={fill}
      />
    </svg>
  );
};

export default ShoppingCartIcon;