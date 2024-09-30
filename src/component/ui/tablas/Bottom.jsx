import { Box, Text } from "@chakra-ui/react";
import Pagination from "../../Pagination";

export default function BottomTable({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
}) {
  return (
    <Box
      bg={"#d7d7d7"}
      borderBottomLeftRadius={{ base: "0px", md: "20px" }}
      borderBottomRightRadius={{ base: "0px", md: "20px" }}
      color={"black"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      columnGap={"1rem"}
      h="60px"
      p={1}
    >
      <Text
        textStyle={"RobotoRegularBold"}
        display={{ base: "none", md: "inline-flex" }}
      >
        {totalResults} Elementos
      </Text>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Box>
  );
}
