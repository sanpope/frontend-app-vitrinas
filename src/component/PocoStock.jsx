import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SmallPagination from "../component/SmallPagination";
import BiggerThanICon from "../assets/images/BiggerThanIcon";
import { capitalizeFirstLetter } from "../utils/formatting";

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
      gap={1}
    >
      {productosConPocoStock != null && productosConPocoStock?.length > 0 ? (
        <>
          <Box>
            <Text textStyle={"RobotoBody"} py={1}>
              {capitalizeFirstLetter(currentItem1?.nombre)}
            </Text>
            <Box
              display={"flex"}
              flexGrow={1}
              width="100%"
              justifyContent={"space-center"}
              alignItems={"center"}
              gap={1}
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
                <Text textStyle={"RobotoBody"} flexGrow={1}>
                  {currentItem1?.existenciasActuales}
                </Text>
              </Box>
              <Box
                display={"flex"}
                flexGrow={1}
                justifyContent={"space-around"}
              >
                <Text
                  textStyle={"RobotoBody"}
                  flexGrow={1}
                  textAlign={"end"}
                  color={"grey.placeholder"}
                >
                  Mínimo
                </Text>
                <Text
                  textStyle={"RobotoBody"}
                  textAlign={"end"}
                  flexGrow={1}
                >
                  {currentItem1?.cantidadMinima}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box>
            <Text textStyle={"RobotoBody"} py={1}>
              {capitalizeFirstLetter(currentItem2?.nombre)}
            </Text>
            <Box
              display={"flex"}
              flexGrow={1}
              justifyContent={"space-between"}
              alignItems={"center"}
              width="100%"
              gap={1}
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
                <Text textStyle={"RobotoBody"} flexGrow={1}>
                  {currentItem2?.existenciasActuales}
                </Text>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-around"}
                flexGrow={1}
              >
                <Text
                  textStyle={"RobotoBody"}
                  flexGrow={1}
                  textAlign={"end"}
                  color={"grey.placeholder"}
                >
                  Mínimo
                </Text>
                <Text
                  textStyle={"RobotoBody"}
                  flexGrow={1}
                  textAlign={"end"}
                >
                  {currentItem2?.cantidadMinima}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            position={"absolute"}
            bottom={1}
            right={1}
            w={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
            m={1}
          >
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
