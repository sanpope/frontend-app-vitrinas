import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SmallPagination from "../component/SmallPagination";
import BiggerThanICon from "../assets/images/BiggerThanIcon";

export default function PocoStock({
  producto1 = "Camisetas de Colombia",
  cantidad1 = 8,
  producto2 = "Gorras de Colombia",
  cantidad2 = 8,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      flexGrow={1}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Box>
        <Text textStyle={"RobotoSubtitleBold"}>{producto1}</Text>
        <Box
          display={"flex"}
          flexGrow={1}
          width="100%"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            flexGrow={1}
            borderRightWidth={2}
            borderRightColor={"grey.placeholder"}
          >
            <Text
              textStyle={"RobotoSubtitle"}
              flexGrow={1}
              color={"grey.placeholder"}
            >
              Actual
            </Text>
            <Text textStyle={"RobotoSubtitleBold"} flexGrow={1}>
              {" "}
              {cantidad1}
            </Text>
          </Box>
          <Box display={"flex"} flexGrow={1} justifyContent={"space-around"}>
            <Text
              textStyle={"RobotoSubtitle"}
              flexGrow={1}
              textAlign={"end"}
              color={"grey.placeholder"}
            >
              Mínimo
            </Text>
            <Text
              textStyle={"RobotoSubtitleBold"}
              textAlign={"end"}
              flexGrow={1}
            >
              {" "}
              2
            </Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text textStyle={"RobotoSubtitleBold"}>{producto2}</Text>
        <Box
          display={"flex"}
          flexGrow={1}
          justifyContent={"space-between"}
          alignItems={"center"}
          width="100%"
        >
          <Box
            display={"flex"}
            flexGrow={1}
            borderRightWidth={2}
            borderRightColor={"grey.placeholder"}
          >
            <Text
              textStyle={"RobotoSubtitle"}
              flexGrow={1}
              color={"grey.placeholder"}
            >
              Actual
            </Text>
            <Text textStyle={"RobotoSubtitleBold"} flexGrow={1}>
              {cantidad2}
            </Text>
          </Box>
          <Box display={"flex"} justifyContent={"space-around"} flexGrow={1}>
            <Text
              textStyle={"RobotoSubtitle"}
              flexGrow={1}
              textAlign={"end"}
              color={"grey.placeholder"}
            >
              Mínimo
            </Text>
            <Text
              textStyle={"RobotoSubtitleBold"}
              flexGrow={1}
              textAlign={"end"}
            >
              2
            </Text>
          </Box>
        </Box>
      </Box>
      <Box w={"100%"} display={"flex"} justifyContent={"flex-end"}>
        <SmallPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
