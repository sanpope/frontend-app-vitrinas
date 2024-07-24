import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SmallPagination from "../component/SmallPagination";
import BiggerThanICon from "../assets/images/BiggerThanIcon";

export default function ActualizacionesInventario({
  date = "03/04/2024",
  hour = "2:50PM",
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
        pb={1}
      >
        <Text color="grey.placeholder" textStyle={"RobotoBodyBold"}>Visita</Text>
        <Box width={"1.5px"} height="100%" bg="grey.placeholder"></Box>
        <Text color="grey.placeholder" textStyle={"RobotoBody"}>{date}</Text>
        <Box width={"1.5px"} height="100%" bg="grey.placeholder"></Box>
        <Text color="grey.placeholder" textStyle={"RobotoBody"}>{hour}</Text>
      </Box>
      <Box
        w={"100%"}
        display={"flex"}
        flexGrow={1}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="green"
            w={3}
            h={3}
            borderRadius="full"
            mr={"10px"}
            display={"inline-flex"}
          ></Box>
          <Text textStyle={"RobotoBody"}>Ingresos</Text>
          <Text textStyle={"RobotoBodyBold"} px={2}>
            + 8
          </Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="red"
            w={3}
            h={3}
            borderRadius="full"
            mr={"10px"}
            display={"inline-flex"}
          ></Box>
          <Text textStyle={"RobotoBody"}>Retiros</Text>
          <Text textStyle={"RobotoBodyBold"} px={2}>
            - 2
          </Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="#FFD80C"
            w={3}
            h={3}
            borderRadius="full"
            mr={"10px"}
            display={"inline-flex"}
          ></Box>
          <Text textStyle={"RobotoBody"}>Correcciones </Text>
          <BiggerThanICon width={"17px"} height={"15px"} />
          <Text textStyle={"RobotoBodyBold"}>5</Text>
        </Box>
      </Box>
      <Box
        w={"100%"}
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
  );
}
