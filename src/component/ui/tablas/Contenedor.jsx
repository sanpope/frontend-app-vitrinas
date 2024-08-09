import { Box } from "@chakra-ui/react";

export default function Contenedor({ maxHeight = "600px", children }) {
  return (
    <Box
      position="relative"
      width="100%"
      display="flex"
      flexDir="column"
      flexGrow={1}
    >
      <Box
        overflowY={"auto"}
        height="100%"
        maxHeight={maxHeight}
        borderTopLeftRadius={{ base: "0px", md: "20px" }}
        borderTopRightRadius={{ base: "0px", md: "20px" }}
      >
        <table className="content-table" style={{ height: "100%" }}>
          {children}
        </table>
      </Box>
    </Box>
  );
}
