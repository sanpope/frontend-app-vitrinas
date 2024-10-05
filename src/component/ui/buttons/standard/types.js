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
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
  },
  RED_PRIMARY_OPT2: {
    normal: {
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
    hover: {
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
    disabled: {
      bg: "grey.100",
      borderColor: "grey.100",
      color: "white",
    },
    active: {
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
  },
  RED_SECUNDARY: {
    normal: {
      bg: "white",
      borderColor: "red.100",
      color: "red.100",
    },
    hover: {
      bg: "white",
      borderColor: "black",
      color: "black",
    },
    disabled: {
      bg: "bluePurple.60",
      borderColor: "bluePurple.60",
      color: "white",
    },
    active: {
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
  },
  RED_GREY: {
    normal: {
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
    hover: {
      bg: "#535253",
      borderColor: "black",
      color: "white",
    },
    disabled: {
      bg: "bluePurple.60",
      borderColor: "bluePurple.60",
      color: "white",
    },
    active: {
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
  },
  BORDERLESS: {
    normal: {
      bg: "transparent",
      borderColor: "transparent",
      color: "black",
    },
    hover: {
      bg: "transparent",
      borderColor: "transparent",
      color: "placeholder",
    },
    disabled: {
      bg: "transparent",
      borderColor: "transparent",
      color: "grey",
    },
    active: {
      bg: "transparent",
      borderColor: "transparent",
      color: "red",
    },
  },
  WHITE: {
    normal: {
      bg: "white",
      borderColor: "black",
      color: "black",
    },
    hover: {
      bg: "white",
      borderColor: "red.100",
      color: "black",
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
  WHITE_BLACK: {
    normal: {
      bg: "white",
      borderColor: "black",
      color: "black",
    },
    hover: {
      bg: "white",
      borderColor: "black",
      color: "black",
    },
    disabled: {
      bg: "white",
      borderColor: "mainBg",
      color: "mainBg",
    },
    active: {
      bg: "red.100",
      borderColor: "red.100",
      color: "white",
    },
  },
  WHITE_RED: {
    normal: {
      bg: "white",
      borderColor: "black",
      color: "black",
    },
    hover: {
      bg: "white",
      borderColor: "red.100",
      color: "red.100",
    },
    disabled: {
      bg: "white",
      borderColor: "bluePurple.50",
      color: "bluePurple.50",
    },
    active: {
      bg: "white",
      borderColor: "black",
      color: "black",
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
      bg: "#535253",
      borderColor: "black",
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
  DARK_GREY: {
    normal: {
      bg: "black",
      borderColor: "black",
      color: "white",
    },
    hover: {
      bg: "#535253",
      borderColor: "#535253",
      color: "white",
    },
    disabled: {
      bg: "grey.60",
      borderColor: "grey.60",
      color: "white",
    },
    active: {
      bg: "#1b1b1b",
      borderColor: "#1b1b1b",
      color: "white",
    },
  },
  DARK_GREY_OPT2: {
    normal: {
      bg: "#1b1b1b",
      borderColor: "#1b1b1b",
      color: "white",
    },
    hover: {
      bg: "#535253",
      borderColor: "#535253",
      color: "white",
    },
    disabled: {
      bg: "grey.60",
      borderColor: "grey.60",
      color: "white",
    },
    active: {
      bg: "#1b1b1b",
      borderColor: "#1b1b1b",
      color: "white",
    },
  },
  DISABLED: {
    normal: {
      bg: "grey",
      borderColor: "grey",
      color: "grey.placeholder",
    },
    hover: {
      bg: "#535253",
      borderColor: "#535253",
      color: "white",
    },
    disabled: {
      bg: "grey.60",
      borderColor: "grey.60",
      color: "white",
    },
    active: {
      bg: "#1b1b1b",
      borderColor: "#1b1b1b",
      color: "white",
    },
  },
  VERIFIED: {
    normal: {
      bg: "#F6FFED",
      borderColor: "#B7EB8F",
      color: "#52C41A",
    },
    hover: {
      bg: "#F6FFED",
      borderColor: "#B7EB8F",
      color: "#52C41A",
    },
    disabled: {
      bg: "#F6FFED",
      borderColor: "#B7EB8F",
      color: "#52C41A",
    },
    active: {
      bg: "#F6FFED",
      borderColor: "#B7EB8F",
      color: "#52C41A",
    },
  },
  NO_VERIFIED: {
    normal: {
      bg: "#FFF1F0",
      borderColor: "#FFA39E",
      color: "#F5222D",
    },
    hover: {
      bg: "#FFF1F0",
      borderColor: "#FFA39E",
      color: "#F5222D",
    },
    disabled: {
      bg: "#FFF1F0",
      borderColor: "#FFA39E",
      color: "#F5222D",
    },
    active: {
      bg: "#FFF1F0",
      borderColor: "#FFA39E",
      color: "#F5222D",
    },
  },
  INFO: {
    normal: {
      bg: "#E6F7FF",
      borderColor: "#91D5FF",
      color: "black",
    },
    hover: {
      bg: "#E6F7FF",
      borderColor: "#91D5FF",
      color: "black",
    },
    disabled: {
      bg: "#E6F7FF",
      borderColor: "#91D5FF",
      color: "black",
    },
    active: {
      bg: "#E6F7FF",
      borderColor: "#91D5FF",
      color: "black",
    },
  },
  REVERT: {
    normal: {
      bg: "#FFFBE6",
      borderColor: "#FEB220",
      color: "#FEB220",
    },
    hover: {
      bg: "#FFFBE6",
      borderColor: "#FEB220",
      color: "#FEB220",
    },
    disabled: {
      bg: "#FFFBE6",
      borderColor: "#FEB220",
      color: "#FEB220",
    },
    active: {
      bg: "#FFFBE6",
      borderColor: "#FEB220",
      color: "#FEB220",
    },
  },
};

export default BUTTON_VARIANTS;
