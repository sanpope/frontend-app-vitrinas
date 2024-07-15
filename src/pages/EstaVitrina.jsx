import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import Editar from "../component/Editar";
import ConfirmationMessage from "../component/ConfirmationMessage";
import EditIcon from "../assets/images/EditIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import PlusCircleIcon from "../assets/images/PlusCircleIcon";
import AgregarAsesor from "../component/AgregarAsesor";
import AsesorContainer from "../component/AsesorContainer";

export default function EstaVitrina() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

  const {
    isOpen: isThirdModalOpen,
    onOpen: onThirdModalOpen,
    onClose: onThirdModalClose,
  } = useDisclosure();

  const {
    isOpen: isFourthModalOpen,
    onOpen: onFourthModalOpen,
    onClose: onFourthModalClose,
  } = useDisclosure();

  const {
    isOpen: isFifthModalOpen,
    onOpen: onFifthModalOpen,
    onClose: onFifthModalClose,
  } = useDisclosure();

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={"1.25rem"}
      px={"2.5rem"}
      py={"1.25rem"}
      overflowY={"scroll"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Text textStyle={" RobotoBody"}>{city}</Text>
        <Box
          display={"flex"}
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text textStyle={"RobotoTitleBold"}>Esta Vitrina</Text>
          <Box
            display={"flex"}
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent={{ base: "flex-start", md: "center" }}
            alignItems={"center"}
            gap={"10px"}
          >
            <StandardButton
              variant={"WHITE_BLACK"}
              borderRadius="20px"
              py={"17px"}
              w={"10.25rem"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onFirstModalOpen}
              leftIcon={<EditIcon />}
            >
              Editar Vitrina
            </StandardButton>

            <Editar
              isOpen={isFirstModalOpen}
              onOpen={onFirstModalOpen}
              onClose={onFirstModalClose}
              onClick={onFirstModalClose}
              desc={"Vitrina"}
              desc2={"Vitrina"}
            />
            <StandardButton
              variant={"WHITE_BLACK"}
              borderRadius="20px"
              py={"17px"}
              w={"10.25rem"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onSecondModalOpen}
              leftIcon={<TrashIcon />}
            >
              Eliminar Vitrina
            </StandardButton>
            <ConfirmationMessage
              isOpen={isSecondModalOpen}
              onOpen={onSecondModalOpen}
              onClose={onSecondModalClose}
              icon={<WarningIcon />}
              text={"¿Estás seguro que desea eliminar a esta vitrina?"}
              text2={
                "Esta acción eliminará permanentemente los registros de esta vitrina de tu sistema"
              }
              colorText2={"red.100"}
              buttonText={"Continuar"}
            />
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} flexDir={"column"} gap={"20px"}>
        <Box display={"flex"} flexWrap={"wrap"} gap={"20px"}>
          <AsesorContainer
            isFirstModalOpen={isFourthModalOpen}
            onFirstModalOpen={onFourthModalOpen}
            onFirstModalClose={onFourthModalClose}
            isSecondModalOpen={isFifthModalOpen}
            onSecondModalOpen={onFifthModalOpen}
            onSecondModalClose={onFifthModalClose}
          />
        </Box>

        <StandardButton
          variant={"RED_PRIMARY"}
          borderRadius="20px"
          py={"17px"}
          w={"fit-content"}
          fontSize={"14px"}
          fontWeight={"400"}
          onClick={onThirdModalOpen}
          leftIcon={<PlusCircleIcon />}
        >
          Agregar Asesor
        </StandardButton>
        <AgregarAsesor
          isOpen={isThirdModalOpen}
          onOpen={onThirdModalOpen}
          onClose={onThirdModalClose}
        />
      </Box>
    </Box>
  );
}
