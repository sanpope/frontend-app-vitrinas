import { Box } from "@chakra-ui/react";

export default function Contenedor({ children }) {
  return (
    <Box
      position="relative"
      display="flex"
      flexDir="column"
      flex={1}
      height={"100%"}
      overflow="auto"
      borderTopLeftRadius={{ base: "0px", md: "20px" }}
      borderTopRightRadius={{ base: "0px", md: "20px" }}
    >
      <table className="content-table" style={{ height: "100%" }}>
        {children}
      </table>
    </Box>
  );
}
