const SmallRightArrowIcon = ({
  width = "20px",
  height = "20px",
  fill = "black",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.89046 3.04425L6.52588 3.3906C6.43473 3.48175 6.43473 3.62758 6.52588 3.7005L9.3514 6.52602H3.13525C3.00765 6.52602 2.9165 6.6354 2.9165 6.74477V7.25519C2.9165 7.38279 3.00765 7.47394 3.13525 7.47394H9.3514L6.52588 10.3177C6.43473 10.3906 6.43473 10.5364 6.52588 10.6276L6.89046 10.9739C6.96338 11.0651 7.10921 11.0651 7.20036 10.9739L11.0103 7.16404C11.1014 7.0729 11.1014 6.94529 11.0103 6.85415L7.20036 3.04425C7.10921 2.9531 6.96338 2.9531 6.89046 3.04425Z"
        fill={fill}
      />
    </svg>
  );
};

export default SmallRightArrowIcon;
