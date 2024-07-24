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
      <StandardButton variant={"RED_SECUNDARY"} borderRadius="md" px={1}>
        {currentPage}
      </StandardButton>
      <Text px={2}>de</Text>
      <Text>{totalPages}</Text>
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
