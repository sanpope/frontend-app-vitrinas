import { Box, Text } from "@chakra-ui/react";
import React from "react";

import EditIcon from "../assets/images/EditIcon";
import TrashIcon from "../assets/images/TrashIcon";

export default function ListaItem({
  desc,
  setCurrentItem,
  onEditarModalOpen,
  onEliminarModalOpen,
}) {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      py={3}
    >
      <Text textStyle={"RobotoBody"} color={"black"}>
        {desc}
      </Text>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"5px"}
      >
        <EditIcon
          width={"20px"}
          height={"17px"}
          onClick={() => {
            setCurrentItem(desc);
            onEditarModalOpen();
          }}
        />
        <TrashIcon
          width={"20px"}
          height={"17px"}
          onClick={() => {
            setCurrentItem(desc);
            onEliminarModalOpen();
          }}
        />
      </Box>
    </Box>
  );
}
