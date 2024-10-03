import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SmallPagination from "../component/SmallPagination";
import BiggerThanICon from "../assets/images/BiggerThanIcon";

export default function PocoStock({ productosConPocoStock }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(productosConPocoStock?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItem1 = productosConPocoStock?.[startIndex];
  const currentItem2 = productosConPocoStock?.[startIndex + 1];

  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      flexGrow={1}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      {productosConPocoStock != null ? (
        <>
          <Box>
            <Text textStyle={"RobotoSubtitleBold"}>{currentItem1?.nombre}</Text>
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
                  textStyle={"RobotoBody"}
                  flexGrow={1}
                  color={"grey.placeholder"}
                >
                  Actual
                </Text>
                <Text textStyle={"RobotoBodyBold"} flexGrow={1}>
                  {currentItem1?.existenciasActuales}
                </Text>
              </Box>
              <Box
                display={"flex"}
                flexGrow={1}
                justifyContent={"space-around"}
              >
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
                  {currentItem1?.cantidadMinima}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box>
            <Text textStyle={"RobotoSubtitleBold"}>{currentItem2?.nombre}</Text>
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
                  {currentItem2?.existenciasActuales}
                </Text>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-around"}
                flexGrow={1}
              >
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
                  {currentItem2?.cantidadMinima}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box w={"100%"} display={"flex"} justifyContent={"flex-end"} m={2}>
            <SmallPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </>
      ) : (
        <Text
          w={"100%"}
          alignSelf={"center"}
          mt={"50px"}
          color={"grey.placeholder"}
        >
          No se encontraron productos con poco Stock
        </Text>
      )}
    </Box>
  );
}
