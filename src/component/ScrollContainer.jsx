import React from "react";
import { Box } from "@chakra-ui/react";

export const ScrollContainer = ({
  children,
  maxHeight = "160px",
  bottomPadding = "15px",
  ...props
}) => {
  return (
    <Box
      position="relative"
      maxH={maxHeight}
      w="100%"
      overflowY="scroll"
      className="scroll-wrapper"
      {...props}
    >
      <Box pb={bottomPadding}>{children}</Box>
    </Box>
  );
};

export default ScrollContainer;
