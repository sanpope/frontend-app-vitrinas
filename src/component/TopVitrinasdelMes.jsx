/*import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Text, Flex } from "@chakra-ui/react";
Chart.register(ArcElement, Tooltip, Legend);

const TopVitrinasdelMes = () => {
  const data = {
    labels: ["Corales de Indias", "Double Tree Bogotá", "Double Tree Bogotá"],
    datasets: [
      {
        data: [2100000, 800000, 500000],
        backgroundColor: ["#000000", "#555555", "#BBBBBB"],
        hoverBackgroundColor: ["#000000", "#555555", "#BBBBBB"],
      },
    ],
  };

  return (
    <Box
      bg="white"
      p={5}
      borderRadius="md"
      boxShadow="sm"
      maxWidth="400px"
      mx="auto"
    >
      <Flex alignItems="center" mb={4}></Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Flex alignItems="center" mb={2}>
            <Box
              bg="#000000"
              w={3}
              h={3}
              borderRadius="full"
              display="inline-block"
              mr={2}
            />
            <Text>Corales de Indias</Text>
            <Text fontWeight="bold" ml="auto">
              $2.100.000
            </Text>
          </Flex>
          <Flex alignItems="center" mb={2}>
            <Box
              bg="#555555"
              w={3}
              h={3}
              borderRadius="full"
              display="inline-block"
              mr={2}
            />
            <Text>Double Tree Bogotá</Text>
            <Text fontWeight="bold" ml="auto">
              $800.000
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Box
              bg="#BBBBBB"
              w={3}
              h={3}
              borderRadius="full"
              display="inline-block"
              mr={2}
            />
            <Text>Double Tree Bogotá</Text>
            <Text fontWeight="bold" ml="auto">
              $500.000
            </Text>
          </Flex>
        </Box>
        <Box w="50%">
          <Doughnut data={data} />
        </Box>
      </Flex>
    </Box>
  );
};

export default TopVitrinasdelMes;*/
