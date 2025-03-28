import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import colors from "../theme/colors";

const newDate = new Date();

export default function DispositivoContainer({
  minH = "220px",
  maxW = "340px",
  icon,
  title = "Título",
  emoji,
  description = null,
  date = null,
  text2 = null,
  description2 = null,
}) {
  return (
    <>
      {description !== null &&
      date !== null &&
      text2 !== null &&
      description2 !== null ? (
        <Box
          flex={`0 1 ${maxW}`}
          minH={minH}
          bg="white"
          display="flex"
          flexDirection="column"
          alignItems="center"
          borderRadius="30px"
          py={2}
          px={4}
        >
          <Box w="100%" mb={2}>
            {icon}
          </Box>
          <Box w="100%" flex="1">
            <Text textStyle="RobotoBodyBold" color="black">
              {title}
            </Text>
          </Box>
          <Box w="100%" flex="1">
            <HStack spacing="5px" alignItems="center">
              {emoji}
              <Text
                textStyle="RobotoBodyBold"
                color="grey.placeholder"
                textAlign="justify"
              >
                {description}
              </Text>
            </HStack>
          </Box>
          <Box w="100%" flex="1" display="flex" alignItems="center">
            <HStack spacing="5px">
              <Text textStyle="RobotoBodyBold" display="flex">
                {text2}
              </Text>
              <Text textStyle="RobotoBodyBold" color="grey.placeholder">
                {description2}
              </Text>
            </HStack>
          </Box>
          <Box w="100%" flex="1" display="flex" alignItems="flex-end">
            <Text py={1} textStyle="RobotoTinyBold" color={colors.grey[60]}>
              {date}
            </Text>
          </Box>
        </Box>
      ) : (
        <Box
          flex={`0 1 ${maxW}`}
          minH={minH}
          bg={"white"}
          display="flex"
          flexDirection={"column"}
          borderRadius={"30px"}
          p={3}
        >
          <Box w={"100%"} mb={2}>
            {icon}
          </Box>
          <Box
            w={"100%"}
            h={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={2}
            py={1}
          >
            <Text textStyle={"RobotoBodyBold"} color={"black"}>
              {title}
            </Text>
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                textStyle={"RobotoBody"}
                color={"grey.placeholder"}
                textAlign={"center"}
              >
                No hay datos para mostrar.
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
