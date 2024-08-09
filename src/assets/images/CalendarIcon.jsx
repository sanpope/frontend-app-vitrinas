const CalendarIcon = ({
  width = "20px",
  height = "20px",
  fill = "black",
  fillOpacity = "0.25",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_465_3541)">
        <path
          d="M12.75 1.87689H10.125V0.876892C10.125 0.808142 10.0688 0.751892 10 0.751892H9.125C9.05625 0.751892 9 0.808142 9 0.876892V1.87689H5V0.876892C5 0.808142 4.94375 0.751892 4.875 0.751892H4C3.93125 0.751892 3.875 0.808142 3.875 0.876892V1.87689H1.25C0.973438 1.87689 0.75 2.10033 0.75 2.37689V12.7519C0.75 13.0285 0.973438 13.2519 1.25 13.2519H12.75C13.0266 13.2519 13.25 13.0285 13.25 12.7519V2.37689C13.25 2.10033 13.0266 1.87689 12.75 1.87689ZM12.125 12.1269H1.875V6.18939H12.125V12.1269ZM1.875 5.12689V3.00189H3.875V3.75189C3.875 3.82064 3.93125 3.87689 4 3.87689H4.875C4.94375 3.87689 5 3.82064 5 3.75189V3.00189H9V3.75189C9 3.82064 9.05625 3.87689 9.125 3.87689H10C10.0688 3.87689 10.125 3.82064 10.125 3.75189V3.00189H12.125V5.12689H1.875Z"
          fill={fill}
          fill-opacity={fillOpacity}
        />
      </g>
      <defs>
        <clipPath id="clip0_465_3541">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CalendarIcon;
