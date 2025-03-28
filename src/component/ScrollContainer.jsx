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
      marginBottom="15px"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none",
        scrollbarWidth: "none",
      }}
      {...props}
    >
      {children}

      <Box
        height={bottomPadding}
        width="100%"
        display="block"
        position="static"
        zIndex="1"
        backgroundColor="transparent"
        marginTop="5px"
      />
    </Box>
  );
};

export default ScrollContainer;
