import { Box, Text, useTheme } from "@chakra-ui/react";
import React from "react";
// import Alert from "../../../images/svgs/alert";

export default function ErrorMessage({
  children,
  color,
}) {
  const theme = useTheme();

  return (
    <Box display="flex" columnGap="0.5rem" alignItems="flex-start" mt="0.5rem">
      {children && (
        <>
          <Box h="14px" mt="1px" width={"14px"}>
            {/* <Alert width={14} color={theme.colors.alert.error} /> */}
          </Box>
          <Text mt="0" color={color ?? "black"} textStyle="InterTiny">
            {children}
          </Text>
        </>
      )}
    </Box>
  );
}
