import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SmallPagination from "../component/SmallPagination";
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
    <>
      {productosConPocoStock != null && productosConPocoStock?.length > 0 ? (
        <Box
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
         
        >
          <Box
            w={"100%"}
            h={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"space-between"}
           
          >
            <Box
              w={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              p={1}
              gap={1}
              flex={1}
            >
              {productosConPocoStock != null &&
              Object.keys(currentItem1 || {}) !== null &&
              Object.keys(currentItem1 || {}) !== "undefined" &&
              Object.keys(currentItem1 || {}).length > 0 ? (
                <Box width={"100%"}>
                  <Text
                    minW={"190px"}
                    textStyle={"RobotoRegular"}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
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
                <Box width={"100%"}>
                  <Text
                    minW={"190px"}
                    textStyle={"RobotoRegular"}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
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
            <Box w={"100%"} display={"flex"} justifyContent={"flex-end"} pt={4}>
              <SmallPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          height={"100%"}
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Text
            alignSelf={"center"}
            justifySelf={"center"}
            color={"grey.placeholder"}
          >
            Sin información
          </Text>
        </Box>
      )}
    </>
  );
}
