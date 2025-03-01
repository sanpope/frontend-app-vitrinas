import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import colors from "../theme/colors";

export default function LoadingComponent() {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner size={"lg"} />
    </Box>
  );
}
