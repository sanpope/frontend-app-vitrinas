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
    }),
  },
});
