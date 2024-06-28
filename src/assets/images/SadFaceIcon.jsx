const SadFaceIcon = ({ width = "20px", height = "20px", fill = "#FEB220" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.72765 0.958435C4.47313 0.958435 0.21582 5.00531 0.21582 10.0001C0.21582 14.9949 4.47313 19.0418 9.72765 19.0418C14.9822 19.0418 19.2395 14.9949 19.2395 10.0001C19.2395 5.00531 14.9822 0.958435 9.72765 0.958435ZM9.72765 17.2918C5.47034 17.2918 2.05682 14.047 2.05682 10.0001C2.05682 5.98969 5.47034 2.70844 9.72765 2.70844C13.9466 2.70844 17.3985 5.98969 17.3985 10.0001C17.3985 14.047 13.9466 17.2918 9.72765 17.2918ZM6.65932 9.41677C7.31134 9.41677 7.88665 8.90635 7.88665 8.2501C7.88665 7.63031 7.31134 7.08344 6.65932 7.08344C5.96895 7.08344 5.43199 7.63031 5.43199 8.2501C5.43199 8.90635 5.96895 9.41677 6.65932 9.41677ZM12.796 7.08344C12.1056 7.08344 11.5687 7.63031 11.5687 8.2501C11.5687 8.90635 12.1056 9.41677 12.796 9.41677C13.448 9.41677 14.0233 8.90635 14.0233 8.2501C14.0233 7.63031 13.448 7.08344 12.796 7.08344ZM9.72765 11.7501C8.15513 11.7501 6.73603 12.4064 5.73882 13.5366C5.39363 13.9011 5.47034 14.448 5.85388 14.7761C6.23742 15.0678 6.81274 15.0314 7.15792 14.6668C7.77159 13.9376 8.73044 13.5001 9.72765 13.5001C10.6865 13.5001 11.6454 13.9376 12.259 14.6668C12.6042 14.9949 13.1795 15.1043 13.5631 14.7761C13.9466 14.448 14.0233 13.9011 13.6781 13.5366C12.7193 12.4064 11.2618 11.7501 9.72765 11.7501Z"
        fill={fill}
      />
    </svg>
  );
};

export default SadFaceIcon;