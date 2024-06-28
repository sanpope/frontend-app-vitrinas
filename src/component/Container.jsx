import React from "react";
import { Box, Text } from "@chakra-ui/react";
import colors from "../theme/colors";
import ReceiptIcon from "../assets/images/ReceiptIcon";

export default function Container({
  maxW = "400px",
  icon = <ReceiptIcon width={"24px"} height={"24px"} />,
  title,
  children,
}) {
  return (
    <Box
      w="100%"
      maxW={maxW}
      h={"225px"}
      bg={colors.white}
      display="flex"
      flexDirection={"column"}
      borderRadius={"30px"}
      p={"20px"}
    >
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        columnGap="6px"
      >
        {icon}
        {title ? (
          <Text textStyle={"RobotoSubtitle"} color={colors.black}>
            {title}
          </Text>
        ) : null}
      </Box>
      {children}
    </Box>
  );
}
