import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import colors from "../theme/colors";
import TrashIcon from "../assets/images/TrashIcon";

export default function Message({
  name = "Brian Cox",
  subject = "Lorem ipsum",
  message = "Lorem ipsum dolor sit amet consectetur. Urna eu mattis diam et amet id. Platea habitant tempus tortor id. Eu feugiat amet malesuada nisl ornare quisque pretium pharetra. Enim turpis posuere condimentum proin ut convallis. ",
  onClick
}) {
  const [showIcon, setShowIcon] = useState(false);
  return (
    <Box
      bg={colors.white}
      borderRadius={"20px"}
      w={"100%"}
      p={"20px"}
      display={"flex"}
      flexDir={"column"}
      gap={"15px"}
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text textStyle={"RobotoSubtitleBold"}>{name}</Text>
        {showIcon ? (
          <TrashIcon width={"1.2rem"} height={"1.2rem"} fill={"red"} onClick={onClick} />
        ) : null}
      </Box>
      <hr></hr>
      <Text textStyle={"RobotoSubtitle"}>Asunto: {subject}</Text>

      <Text textStyle={"RobotoRegular"}> {message}</Text>
    </Box>
  );
}
