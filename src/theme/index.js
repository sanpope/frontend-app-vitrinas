import { extendTheme } from "@chakra-ui/react";
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
});
