const EyeOffIcon = ({
  width = "18",
  height = "18",
  fill = "#020202",
  onClick,
  p,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.724 8.91927L0.822917 0.40625C0.768229 0.369792 0.695312 0.351562 0.640625 0.351562C0.53125 0.351562 0.458333 0.388021 0.403646 0.442708L0.221354 0.679688C0.184896 0.734375 0.148438 0.789063 0.148438 0.861979C0.148438 0.953125 0.203125 1.04427 0.276042 1.08073L11.1771 9.61198C11.2135 9.64844 11.2865 9.66667 11.3411 9.66667C11.4505 9.66667 11.5234 9.63021 11.5781 9.55729L11.7604 9.33854C11.7969 9.28385 11.8333 9.22917 11.8333 9.15625C11.8333 9.0651 11.7786 8.97396 11.724 8.91927ZM5.5625 3.01302L8.02344 4.92708C7.98698 3.83333 7.09375 2.95833 6 2.95833C5.85417 2.97656 5.70833 2.97656 5.5625 3.01302ZM6.41927 7.00521L3.95833 5.09115C3.99479 6.1849 4.88802 7.04167 6 7.04167C6.1276 7.04167 6.27344 7.04167 6.41927 7.00521ZM6 2.375C7.78646 2.375 9.44531 3.3776 10.3203 5C10.1016 5.41927 9.84635 5.78385 9.51823 6.11198L10.2109 6.64063C10.5937 6.23958 10.9219 5.78385 11.1771 5.27344C11.2135 5.20052 11.25 5.10938 11.25 5.01823C11.25 4.90885 11.2135 4.81771 11.1771 4.74479C10.1927 2.8125 8.22396 1.5 6 1.5C5.32552 1.5 4.6875 1.6276 4.08594 1.84635L4.92448 2.52083C5.27083 2.42969 5.63542 2.375 6 2.375ZM6 7.625C4.19531 7.625 2.53646 6.6224 1.66146 5C1.88021 4.59896 2.13542 4.23438 2.46354 3.90625L1.77083 3.3776C1.38802 3.77865 1.0599 4.23438 0.804687 4.74479C0.768229 4.81771 0.75 4.90885 0.75 5C0.75 5.10938 0.768229 5.20052 0.804687 5.27344C1.78906 7.20573 3.75781 8.5 6 8.5C6.65625 8.5 7.29427 8.3724 7.89583 8.17188L7.05729 7.4974C6.71094 7.58854 6.34635 7.625 6 7.625Z"
        fill={fill}
      />
    </svg>
  );
};

export default EyeOffIcon;
