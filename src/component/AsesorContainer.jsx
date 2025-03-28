import { Box, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import TrashIcon from "../assets/images/TrashIcon";
import EditIcon from "../assets/images/EditIcon";
import EditarAsesor from "./EditarAsesor";
import ConfirmationMessage from "./ConfirmationMessage";
import WarningIcon from "../assets/images/WarningIcon";

export default function AsesorContainer({
  vitrinaName,
  asesor,
  currentAsesor,
  setCurrentAsesor,
  Editar,
  Eliminar,
  isLoading,
}) {
  const {
    isOpen: isEditarModalOpen,
    onOpen: onEditarModalOpen,
    onClose: onEditarModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const handleEditModalClose = () => {
    onEditarModalClose();
    setCurrentAsesor(null);
  };

  const handleOpenModal = () => {
    setCurrentAsesor({ ...asesor });
    onEditarModalOpen();
  };

  const handleDeleteOpenModal = () => {
    setCurrentAsesor({ ...asesor });
    onDeleteModalOpen();
  };

  useEffect(() => {
    if (
      isEditarModalOpen &&
      currentAsesor &&
      currentAsesor.nombre === asesor.nombre
    ) {
      setCurrentAsesor({ ...asesor });
    }
  }, [asesor, isEditarModalOpen]);

  return (
    <Box
      w={"100%"}
      maxW={"280px"}
      flexGrow={1}
      bg={"white"}
      display="flex"
      flexDirection={"column"}
      alignItems={"space-between"}
      justifyContent="center"
      borderRadius={"30px"}
      boxShadow="1px 0px 11px -5px rgba(66, 68, 90, 1)"
      p={1}
    >
      <Box
        borderBottom="1px"
        borderBottomColor={"mainBg"}
        h={"25%"}
        px={"25px"}
        py={"15px"}
      >
        <Text textStyle={"RobotoBodyBold"}>{asesor?.nombre}</Text>
      </Box>
      <Box
        h={"60%"}
        display={"flex"}
        flexDir={"column"}
        alignContent={"flex-start"}
        justifyContent={"center"}
        px={"25px"}
        py={"15px"}
        gap={"10px"}
      >
        <Text textStyle={"RobotoBody"}>
          Usuario:
          <span
            textStyle={"RobotoBody"}
            style={{ color: "#AEAEB2", paddingLeft: "5px" }}
          >
            {asesor?.usuario}
          </span>
        </Text>
        <Text textStyle={"RobotoBody"}>
          Contraseña:
          <span
            textStyle={"RobotoBody"}
            style={{ color: "#AEAEB2", paddingLeft: "5px" }}
          >
            {asesor?.contraseña}
          </span>
        </Text>
      </Box>
      <Box
        w={"100%"}
        h={"20%"}
        borderTop="1px"
        borderTopColor={"mainBg"}
        p={1}
        display={"flex"}
      >
        <Box
          w={"50%"}
          borderRight={"1px"}
          borderRightColor={"mainBg"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TrashIcon
            height={"20px"}
            width={"20px"}
            onClick={handleDeleteOpenModal}
          />
        </Box>
        <Box
          w={"50%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <EditIcon height={"20px"} width={"20px"} onClick={handleOpenModal} />
        </Box>
      </Box>

      <EditarAsesor
        vitrinaName={vitrinaName}
        asesor={asesor}
        setCurrentAsesor={setCurrentAsesor}
        isOpen={isEditarModalOpen}
        onOpen={onEditarModalOpen}
        onClose={handleEditModalClose}
        Editar={Editar}
        isLoading={isLoading}
      />

      <ConfirmationMessage
        isOpen={isDeleteModalOpen}
        onOpen={handleDeleteOpenModal}
        onClose={onDeleteModalClose}
        icon={<WarningIcon />}
        text={`¿Estás seguro que desea eliminar el asesor ${asesor?.nombre} ?`}
        text2={
          "Esta acción eliminará permanentemente los registros de este asesor de tu sistema"
        }
        colorText2={"red.100"}
        buttonText={"Continuar"}
        funcConfirmar={() => Eliminar(asesor?.nombre)}
        focusRow={asesor?.nombre}
        products={null}
        isLoading={isLoading}
      />
    </Box>
  );
}
