const BUTTON_VARIANTS = {
  RED_PRIMARY: {
    normal: {
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
    hover: {
      bg: "black",
      borderColor: "black",
      color: "white",
    },
    disabled: {
      bg: "bluePurple.60",
      borderColor: "bluePurple.60",
      color: "white",
    },
    active: {
      bg: "blue.80",
      borderColor: "blue.80",
      color: "white",
    },
  },
  DARK_PURPLE_BORDERLESS: {
    normal: {
      bg: "transparent",
      borderColor: "transparent",
      color: "darkPurple.100",
    },
    hover: {
      bg: "transparent",
      borderColor: "transparent",
      color: "blue.100",
    },
    disabled: {
      bg: "transparent",
      borderColor: "transparent",
      color: "bluePurple.50",
    },
    active: {
      bg: "darkPurple.100",
      borderColor: "darkPurple.100",
      color: "blue.70",
    },
  },
  WHITE: {
    normal: {
      bg: "white",
      borderColor: "darkPurple.100",
      color: "darkPurple.100",
    },
    hover: {
      bg: "blue.100",
      borderColor: "blue.100",
      color: "white",
    },
    disabled: {
      bg: "white",
      borderColor: "bluePurple.50",
      color: "bluePurple.50",
    },
    active: {
      bg: "blue.70",
      borderColor: "blue.70",
      color: "white",
    },
  },
  WHITE_BORDERLESS: {
    normal: {
      bg: "transparent",
      borderColor: "transparent",
      color: "darkPurple.100",
    },
    hover: {
      bg: "white",
      borderColor: "white",
      color: "blue.100",
    },
    disabled: {
      bg: "transparent",
      borderColor: "transparent",
      color: "bluePurple.50",
    },
    active: {
      bg: "white",
      borderColor: "white",
      color: "blue.70",
    },
  },
  BLACK_PRIMARY: {
    normal: {
      bg: "black",
      borderColor: "black",
      color: "white",
    },
    hover: {
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
    disabled: {
      bg: "grey.60",
      borderColor: "grey.60",
      color: "white",
    },
    active: {
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
  },
};

export default BUTTON_VARIANTS;
