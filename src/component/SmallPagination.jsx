import React, { useState } from "react";
import { ChakraProvider, Box, Button, Text } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import LeftArrowICon from "../assets/images/LeftArrowIcon";
import BiggerThanIcon from "../assets/images/BiggerThanIcon";

function SmallPagination({ currentPage, totalPages, onPageChange }) {
  const isDisabledLeft = currentPage === 1;
  const isDisabledRight = currentPage === totalPages;

  return (
    <Box display="flex" alignItems="center" m={1}>
      <StandardButton
        variant={"BORDERLESS"}
        isDisabled={isDisabledLeft}
        _disabled={{ color: "gray.300" }}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <LeftArrowICon
          width={"18px"}
          height={"16px"}
          fill={isDisabledLeft ? "grey" : "black"}
        />
      </StandardButton>
      <StandardButton
        variant={"RED_SECUNDARY"}
        borderRadius="md"
        px={"5px"}
        fontSize={"12px"}
      >
        {currentPage}
      </StandardButton>
      <Text px={2} textStyle={"RobotoRegular"}>
        de
      </Text>
      <Text textStyle={"RobotoRegular"}>{totalPages}</Text>
      <StandardButton
        variant={"BORDERLESS"}
        isDisabled={isDisabledRight}
        _disabled={{ color: "gray.300" }}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <BiggerThanIcon
          width={"18px"}
          height={"16px"}
          fill={isDisabledRight ? "grey" : "black"}
        />
      </StandardButton>
    </Box>
  );
}

export default SmallPagination;
