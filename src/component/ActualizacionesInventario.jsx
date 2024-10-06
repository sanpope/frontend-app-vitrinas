import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SmallPagination from "../component/SmallPagination";
import BiggerThanICon from "../assets/images/BiggerThanIcon";

export default function ActualizacionesInventario({
  actualizacionesInventarioNV,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = actualizacionesInventarioNV.length;
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const currentItem = actualizacionesInventarioNV[currentPage - 1];

  return (
    <>
      {actualizacionesInventarioNV !== null &&
      actualizacionesInventarioNV?.length > 0 ? (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            w={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderBottomWidth={1}
          >
            <Text
              px={1}
              color="grey.placeholder"
              textStyle={"RobotoBodyBold"}
              textAlign={"center"}
            >
              Visita
            </Text>

            <Text
              px={1}
              color="grey.placeholder"
              textStyle={"RobotoBody"}
              borderRightWidth={"2px"}
              borderRightColor={"grey.placeholder"}
              borderLeftWidth={"2px"}
              borderLeftColor={"grey.placeholder"}
              textAlign={"center"}
            >
              {currentItem?.fecha}
            </Text>

            <Text
              px={1}
              color="grey.placeholder"
              textStyle={"RobotoBody"}
              textAlign={"center"}
            >
              {currentItem?.hora}
            </Text>
          </Box>
          <Box
            w={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"flex-start"}
            p={1}
            gap={1}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                bg="green"
                w={3}
                h={3}
                borderRadius="full"
                mr={1}
                display={"inline-flex"}
              ></Box>
              <Text textStyle={"RobotoBody"}>Ingresos</Text>
              <Text textStyle={"RobotoBodyBold"} px={2}>
                + {currentItem?.cantidadProductosIngresados}
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                bg="red"
                w={3}
                h={3}
                borderRadius="full"
                mr={1}
                display={"inline-flex"}
              ></Box>
              <Text textStyle={"RobotoBody"}>Retiros</Text>
              <Text textStyle={"RobotoBodyBold"} px={2}>
                - {currentItem?.cantidadProductosRetirados}
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                bg="#FFD80C"
                w={3}
                h={3}
                borderRadius="full"
                mr={1}
                display={"inline-flex"}
              ></Box>
              <Text textStyle={"RobotoBody"}>Correcciones </Text>
              <BiggerThanICon width={"17px"} height={"15px"} />
              <Text textStyle={"RobotoBodyBold"}>
                {currentItem?.cantidadDeCorrecciones}
              </Text>
            </Box>
          </Box>

          <Box
            bottom={1}
            right={1}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <SmallPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </Box>
      ) : (
        <Box
          w={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text color={"grey.placeholder"} alignSelf={"center"}>
            No existen registros para mostrar.
          </Text>
        </Box>
      )}
    </>
  );
}
