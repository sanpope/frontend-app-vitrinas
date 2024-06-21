import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Modal,
} from "@chakra-ui/react";
import colors from "../theme/colors";
import Container from "../component/Container";
import ReceiptIcon from "../../src/assets/images/ReceiptIcon";
import StarIcon from "../../src/assets/images/StarIcon";
import TrophyIcon from "../../src/assets/images/TrophyIcon";
import BoxesIcon from "../../src/assets/images/BoxesIcon";
import PhoneLaptopIcon from "../../src/assets/images/PhoneLaptopIcon";
import TruckIcon from "../../src/assets/images/TruckIcon";
import FileCheckIcon from "../../src/assets/images/FileCheckIcon";
import LeftTriangleIcon from "../../src/assets/images/LeftTriangleIcon";

import axios from "axios";
import textStyles from "../theme/textStyles";
import Message from "../component/Message";
import Vitrina from "../component/Vitrina";
import GreenArrowICon from "../assets/images/GreenArrowIcon";
import ModalComponent from "../component/ModalComponent";
import StyledButton from "../component/ui/buttons/standard/index";

const url =
  "https://virtserver.swaggerhub.com/sanpope/vitrinas-app/1.0/rest/cuenta";
export default function HomePage() {
  const [name, setName] = useState("Edgar");
  const [ventasMes, setVentasMes] = useState("22.000.000");

  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  // Control del segundo modal
  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

  useEffect(() => {
    serverConexion();
  }, []);

  const serverConexion = async () => {
    axios({
      method: "get",
      url,
    })
      .then((response) => {
        console.log(response.data.groups);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  return (
    <Box
      bg={colors.mainBg}
      w={"100%"}
      height={"100%"}
      position="relative"
      flexDir={"column"}
      display={"flex"}
      gap={"20px"}
      padding={"40px"}
      overflowY={"scroll"}
    >
      <Box>
        <Text textStyle={"RobotoHeader"} color={colors.textBlack}>
          ¡Hola {name}, bienvenido! 👋🏻
        </Text>
      </Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={"30px"}
        justifyContent={"center"}
      >
        <Container
          title={"Ventas del mes"}
          icon={<ReceiptIcon width={"24px"} height={"24px"} />}
          children={
            <Box
              h={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              gap={"10px"}
            >
              <Text textStyle={"RobotoeBanner"} color={colors.textBlack}>
                $ {ventasMes}
              </Text>
              <Box display={"flex"} alignItems={"center"} columnGap={"5px"}>
                <Text textStyle={"RobotoSubSmall"} color={"success.10"}>
                  +5% con respecto al promedio
                </Text>
                <GreenArrowICon />
              </Box>
            </Box>
          }
        />
        <Container
          title={"Ventas de meses anteriores"}
          icon={<ReceiptIcon width={"24px"} height={"24px"} children={<></>} />}
        />
        <Container
          title={"Top Vitrinas del Mes"}
          icon={<StarIcon width={"24px"} height={"24px"} children={<></>} />}
        />
        <Container
          title={"Top Vitrinas"}
          icon={<TrophyIcon width={"24px"} height={"24px"} children={<></>} />}
        />
        <Container
          title={"Top Categorías"}
          icon={<StarIcon width={"24px"} height={"24px"} children={<></>} />}
        />
        <Container
          title={"Top Productos"}
          icon={<BoxesIcon width={"24px"} height={"24px"} children={<></>} />}
        />
        <Container
          title={"Dispositivos averiados"}
          icon={
            <PhoneLaptopIcon width={"24px"} height={"24px"} children={<></>} />
          }
        />
        <Container
          title={"Despachos actuales"}
          icon={<TruckIcon width={"24px"} height={"24px"} children={<></>} />}
        />
        <Container
          title={"Inventario pendiente de verificar"}
          icon={
            <FileCheckIcon width={"24px"} height={"24px"} children={<></>} />
          }
        />
      </Box>
      <Button onClick={onFirstModalOpen}>Open Modal</Button>

      {/* Modal que usa isOpen para determinar si está abierto o cerrado */}
      <Modal isOpen={isFirstModalOpen} onClose={onFirstModalClose}>
        <ModalOverlay />
        <ModalContent
          bg={colors.white}
          maxW={"850px"}
          p={"5px"}
          borderRadius={"20px"}
          left={"-55px"}
          top={"45px"}
          position="relative"
        >
          <Box position={"absolute"} left={"-45px"} top={"40px"}>
            <LeftTriangleIcon width={"60px"} height={"50px"} />
          </Box>
          <ModalBody
            display={"flex"}
            flexWrap={"wrap"}
            gap={"20px"}
            justifyContent={"center"}
            flexDir={"row"}
            w={"100%"}
            mt={"15px"}
          >
            <Vitrina city={"Bogotá"} name={"Elemento"} />
            <Vitrina city={"Medellin"} name={"Elemento"} />
            <Vitrina city={"Cali"} name={"Elemento"} />
            <Vitrina city={"Bogotá"} name={"Elemento"} />
            <Vitrina city={"Medellin"} name={"Elemento"} />
            <Vitrina city={"Cali"} name={"Elemento"} />
          </ModalBody>
          <ModalFooter m={"0px"}>
            <StyledButton
              variant={"RED_PRIMARY"}
              borderRadius="30px"
              size="14px"
              py={"5px"}
              onClick={onSecondModalOpen}
              children={
                <Text textStyle={"RobotoSubtitleRegular"}>
                  Crear una Vitrina
                </Text>
              }
            ></StyledButton>
            <Modal isOpen={isSecondModalOpen} onClose={onSecondModalClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody></ModalBody>

                <ModalFooter>
                  <StyledButton
                    variant={"BLACK_PRIMARY"}
                    borderRadius="30px"
                    py={"5px"}
                  >
                    Cancelar
                  </StyledButton>
                  <StyledButton
                    variant={"WHITE"}
                    borderRadius="30px"
                    py={"5px"}
                    onClick={onSecondModalOpen}
                  >
                    Guardar
                  </StyledButton>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
