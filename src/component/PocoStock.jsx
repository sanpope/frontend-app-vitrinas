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
        <Box
          w={"100%"}
          h={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Box
            w={"100%"}
            height={"80%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
            gap={2}
          >
            {productosConPocoStock != null &&
            Object.keys(currentItem1 || {}) !== null &&
            Object.keys(currentItem1 || {}) !== "undefined" &&
            Object.keys(currentItem1 || {}).length > 0 ? (
              <Box gap={1}>
                <Text textStyle={"RobotoRegular"}>
                  {capitalizeFirstLetter(currentItem1?.nombre)}
                </Text>
                <Box
                  display={"flex"}
                  flexGrow={1}
                  width="100%"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    display={"flex"}
                    flexGrow={1}
                    borderRightWidth={2}
                    borderRightColor={"grey.placeholder"}
                  >
                    <Text
                      textStyle={"RobotoRegular"}
                      flexGrow={1}
                      color={"grey.placeholder"}
                    >
                      Actual
                    </Text>
                    <Text textStyle={"RobotoRegular"} flexGrow={1}>
                      {currentItem1?.existenciasActuales}
                    </Text>
                  </Box>
                  <Box
                    display={"flex"}
                    flexGrow={1}
                    justifyContent={"space-around"}
                  >
                    <Text
                      textStyle={"RobotoRegular"}
                      flexGrow={1}
                      textAlign={"end"}
                      color={"grey.placeholder"}
                    >
                      Mínimo
                    </Text>
                    <Text
                      textStyle={"RobotoRegular"}
                      textAlign={"end"}
                      flexGrow={1}
                    >
                      {currentItem1?.cantidadMinima}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ) : (
              <></>
            )}

            {productosConPocoStock != null &&
            Object.keys(currentItem2 || {}) !== null &&
            Object.keys(currentItem2 || {}) !== "undefined" &&
            Object.keys(currentItem2 || {}).length > 0 ? (
              <Box gap={1}>
                <Text textStyle={"RobotoRegular"}>
                  {capitalizeFirstLetter(currentItem2?.nombre)}
                </Text>
                <Box
                  display={"flex"}
                  flexGrow={1}
                  justifyContent={"space-around"}
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
                      textStyle={"RobotoRegular"}
                      flexGrow={1}
                      color={"grey.placeholder"}
                    >
                      Actual
                    </Text>
                    <Text textStyle={"RobotoRegular"} flexGrow={1}>
                      {currentItem2?.existenciasActuales}
                    </Text>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-around"}
                    flexGrow={1}
                  >
                    <Text
                      textStyle={"RobotoRegular"}
                      flexGrow={1}
                      textAlign={"end"}
                      color={"grey.placeholder"}
                    >
                      Mínimo
                    </Text>
                    <Text
                      textStyle={"RobotoRegular"}
                      flexGrow={1}
                      textAlign={"end"}
                    >
                      {currentItem2?.cantidadMinima}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Box
            w={"100%"}
            h={"15%"}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <SmallPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </Box>
      ) : (
        <Text
          w={"100%"}
          alignSelf={"center"}
          mt={"50px"}
          color={"grey.placeholder"}
        >
          No se encontraron productos con poco stock
        </Text>
      )}
    </Box>
  );
}
