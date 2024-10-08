import React, { useState } from "react";
import { ChakraProvider, Box, Button, Text } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import LeftArrowICon from "../assets/images/LeftArrowIcon";
import BiggerThanIcon from "../assets/images/BiggerThanIcon";

function SmallPagination({ currentPage, totalPages, onPageChange }) {
  const isDisabledLeft = currentPage === 1;
  const isDisabledRight = currentPage === totalPages;

  return (
    <Box display="flex" alignItems="center">
      <Box pr={1}>
        <LeftArrowICon
          width={"16px"}
          height={"14px"}
          fill={isDisabledLeft ? "grey" : "black"}
          onClick={() => onPageChange(currentPage - 1)}
        />
      </Box>
      <Text textStyle={"RobotoRegularBold"} p={1} px={3} borderWidth={1} borderColor={"red.100"} borderRadius={5} color={"red.100"}>
        {currentPage}
      </Text>
      <Text px={2} textStyle={"RobotoRegular"}>
        de
      </Text>
      <Text textStyle={"RobotoRegular"}>{totalPages}</Text>
      <Box pl={2}>
        <BiggerThanIcon
          width={"16px"}
          height={"14px"}
          fill={isDisabledRight ? "grey" : "black"}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </Box>
    </Box>
  );
}

export default SmallPagination;
