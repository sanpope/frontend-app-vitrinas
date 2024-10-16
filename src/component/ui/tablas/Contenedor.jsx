import { Box } from "@chakra-ui/react";

export const MIN_TABLE_HEIGHT = 400;

export default function Contenedor({ children }) {
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
      <Box overflow="auto" height="100%" className="table-inner-container">
        <table className="content-table">{children}</table>
      </Box>
    </Box>
  );
}
