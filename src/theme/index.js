import { extendTheme } from "@chakra-ui/react";
import { SolidVariant, SubtleVariant } from "./alerts";
import colors from "./colors";
import fonts from "./fonts";
import textStyles from "./textStyles";
import tableStyles from "./tableStyles";

export * from "./colors";
export * from "./fonts";
export * from "./textStyles";
export * from "./tableStyles";

export default extendTheme({
  colors,
  fonts,
  textStyles,
  tableStyles,
  components: {
    Alert: {
      // Toasts are considered Alerts under the hood
      variants: {
        subtle: SubtleVariant,
        solid: SolidVariant,
      },
    },
  },
  styles: {
    // Props injected by Chakra UI
    global: ({ colorMode }) => ({
      button: {
        display: "flex",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
      },
      ".chakra-form__required-indicator": {
        color: "#3D65F6 !important",
      },
      "html, body": {
        fontSize: "clamp(10px, 1vw + 1rem, 16px)", // Ajuste de tamaño de fuente responsivo
      },
      "@media (max-width: 1200px)": {
        "html, body": {
          fontSize: "clamp(10px, 1.5vw, 15px)",
        },
      },
      "@media (max-width: 992px)": {
        "html, body": {
          fontSize: "clamp(10px, 1.5vw, 14px)",
        },
      },
      "@media (max-width: 768px)": {
        "html, body": {
          fontSize: "clamp(10px, 1.5vw, 13px)",
        },
      },
      "@media (max-width: 576px)": {
        "html, body": {
          fontSize: "clamp(10px, 1.5vw, 12px)",
        },
      },
    }),
  },
});
