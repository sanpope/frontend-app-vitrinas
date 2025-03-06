import { Box } from "@chakra-ui/react";
import React from "react";

export const MIN_TABLE_HEIGHT = 400;

export default function Contenedor({ children }) {
  const tableHead = React.Children.toArray(children).find(
    (child) => child.type === "thead",
  );

  const tableBody = React.Children.toArray(children).find(
    (child) => child.type === "tbody",
  );

  return (
    <Box
      position="relative"
      display="flex"
      flexDir="column"
      flex={1}
      height="100%"
      borderTopLeftRadius={{ base: "0px", md: "20px" }}
      borderTopRightRadius={{ base: "0px", md: "20px" }}
      overflow="hidden"
      className="table-outer-container"
    >
      <Box
        position="relative"
        zIndex="2"
        overflow="hidden"
        className="table-header-container"
        bg="black"
        borderTopLeftRadius={{ base: "0px", md: "20px" }}
        borderTopRightRadius={{ base: "0px", md: "20px" }}
      >
        <table className="content-table header-table">{tableHead}</table>
      </Box>

      <Box
        overflow="auto"
        height="calc(100% - 60px)"
        className="table-body-container"
        position="relative"
        zIndex="1"
      >
        <table className="content-table body-table">{tableBody}</table>
      </Box>
    </Box>
  );
}
