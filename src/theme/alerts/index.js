import { AlertProps } from "@chakra-ui/react";
import { SMALL_SCREEN_WIDTH } from "../consts";

/*
  NOTE in addition to these overrides, there is also related css in '../style-overrides.scss' to help out
*/

// come on Chakra. why you make me do this
function getAlertSvg(status) {
  // warning svg TBD
  switch (status) {
    case "error":
      return "url(\"data:image/svg+xml;utf8,<svg width='24' height='24' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.41699 8.74984H7.58366V9.9165H6.41699V8.74984ZM6.41699 4.08317H7.58366V7.58317H6.41699V4.08317ZM7.00033 1.1665C3.77449 1.1665 1.16699 3.7915 1.16699 6.99984C1.16699 8.54693 1.78157 10.0307 2.87554 11.1246C3.41721 11.6663 4.06027 12.096 4.76801 12.3891C5.47574 12.6823 6.23428 12.8332 7.00033 12.8332C8.54742 12.8332 10.0312 12.2186 11.1251 11.1246C12.2191 10.0307 12.8337 8.54693 12.8337 6.99984C12.8337 6.23379 12.6828 5.47525 12.3896 4.76752C12.0965 4.05978 11.6668 3.41672 11.1251 2.87505C10.5834 2.33337 9.94038 1.90369 9.23265 1.61054C8.52491 1.31739 7.76637 1.1665 7.00033 1.1665ZM7.00033 11.6665C5.76265 11.6665 4.57566 11.1748 3.70049 10.2997C2.82532 9.4245 2.33366 8.23751 2.33366 6.99984C2.33366 5.76216 2.82532 4.57518 3.70049 3.70001C4.57566 2.82484 5.76265 2.33317 7.00033 2.33317C8.238 2.33317 9.42499 2.82484 10.3002 3.70001C11.1753 4.57518 11.667 5.76216 11.667 6.99984C11.667 8.23751 11.1753 9.4245 10.3002 10.2997C9.42499 11.1748 8.238 11.6665 7.00033 11.6665Z' fill='black' /></svg>\")";
    case "info":
      return "url(\"data:image/svg+xml;utf8,<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z' fill='black' /></svg>\")";
    case "success":
      return "url(\"data:image/svg+xml;utf8,<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z' fill='black' /></svg>\")";
    default:
      return "none";
  }
}

export const SubtleVariant = (props) => {
  const { status } = props;
  const bgColor =
    status === "success"
      ? "blue.20"
      : status === "error"
      ? "red.70.pale"
      : status === "warning"
      ? "yellow"
      : status === "info"
      ? "blue.20"
      : "gray";
  return {
    container: {
      bg: bgColor,
      paddingTop: "1rem",
      paddingBottom: "1rem",
      "& svg": {
        display: "none",
      },
      "& button": {
        fontSize: "12px",
        top: "0.75rem",
        right: "0.75rem",
      },
      "& button svg": {
        display: "flex !important",
      },
      color: "black",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "1rem 1rem",
      backgroundImage: getAlertSvg(status),
      borderRadius: "4px",
    },
  };
};

export const SolidVariant = (props) => {
  const { status } = props;
  const bgColor =
    status === "success"
      ? "blue.20"
      : status === "error"
      ? "red.70.pale"
      : status === "warning"
      ? "yellow"
      : status === "info"
      ? "blue.20"
      : "gray";
  return {
    container: {
      bg: bgColor,
      boxShadow:
      "0px 14px 35px 0px rgba(0, 0, 0, 0.26), 0px -1px 0px 0px rgba(219, 222, 224, 0.90) inset",
      color: "black",
      "& svg": {
        display: "none",
      },
      "& button": {
        fontSize: "12px",
        top: "0.75rem",
        right: "0.75rem",
      },
      "& button svg": {
        display: "flex !important",
      },
      paddingTop: "1rem",
      paddingBottom: "1rem",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "1rem 1rem",
      backgroundImage: getAlertSvg(status),
      borderRadius: "4px",
    },
  };
};
