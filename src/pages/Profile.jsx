import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import TextInput from "../component/ui/textInput";
import EditIcon from "../assets/images/EditIcon";
import UserIcon from "../assets/images/UserIcon";
import UserCircleIcon from "../assets/images/UserCircleIcon";
import LockIcon from "../assets/images/LockIcon";
import EnvelopeIcon from "../assets/images/EnvelopeIcon";
import SetPassword from "../component/SetPassword";

import { useSelector, useDispatch } from "react-redux";

export default function Profile() {
  const name = useSelector((state) => state.userReducer.userName);
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      display={"flex"}
      p={2}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {isEditing === false ? (
        <Box
          w={"100%"}
          maxW={"480px"}
          display={"flex"}
          flexDir={"column"}
          gap={"10px"}
          bg={"white"}
          borderRadius={"20px"}
          p={"2.5rem"}
        >
          <Box
            borderBottom={"1px"}
            borderBottomColor={"mainBg"}
            py={5}
            display={"flex"}
            alignItems={"flex-start"}
          >
            <Text textStyle={"RobotoTitleBold"} color={"black"}>
              Asesor, {name}
            </Text>
          </Box>
          <Box display={"flex"} flexDir={"column"}>
            <Box display={"flex"} p={2} alignItems={"center"} py={5}>
              <UserCircleIcon width={"15px"} height={"15px"} />
              <Text textStyle={"RobotoRegular"} ml={2}>
                {name}
              </Text>
            </Box>
            <Box display={"flex"} p={2} alignItems={"center"} py={5}>
              <UserIcon width={"15px"} height={"15px"} fill={"black"} />
              <Text textStyle={"RobotoRegular"} ml={2}>
                @AlejandroPereira
              </Text>
            </Box>
            <Box display={"flex"} p={2} alignItems={"center"} py={5}>
              <EnvelopeIcon width={"15px"} height={"15px"} />
              <Text textStyle={"RobotoRegular"} ml={2}>
                AlejandroPereira@info.com
              </Text>
            </Box>
            <Box display={"flex"} p={2} alignItems={"center"} py={5}>
              <LockIcon width={"15px"} height={"15px"} />
              <Text textStyle={"RobotoRegular"} ml={2} textAlign={"center"}>
                ******
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            gap={"15px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"fit-content"}
              fontSize="14px"
              fontWeight="400"
              leftIcon={<LockIcon width={"10px"} height={"10px"} />}
              onClick={onFirstModalOpen}
            >
              Cambiar Contraseña
            </StandardButton>
            <SetPassword
              isOpen={isFirstModalOpen}
              onOpen={onFirstModalOpen}
              onClose={onFirstModalClose}
            />
            <StandardButton
              variant={"RED_PRIMARY"}
              borderRadius="20px"
              py={"17px"}
              w={"fit-content"}
              fontSize="14px"
              fontWeight="400"
              leftIcon={<EditIcon fill="white" />}
              onClick={() => setIsEditing(true)}
              size="xs"
            >
              Editar Información
            </StandardButton>
          </Box>
        </Box>
      ) : (
        <Box
          w={"100%"}
          maxW={"480px"}
          display={"flex"}
          flexDir={"column"}
          gap={"10px"}
          bg={"white"}
          borderRadius={"20px"}
        >
          <Box
            bg={"black"}
            display={"flex"}
            flexDir={"column"}
            borderTopRadius="20px"
            p={4}
          >
            <Text textStyle={"RobotoBodyBold"} color={"white"}>
              Editar Información
            </Text>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            px={6}
            py={8}
          >
            <FormControl
              w={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              onSubmit={"(e) => EditarInfor(e)"}
            >
              <FormLabel display="flex" alignItems="center">
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Nombre
              </FormLabel>
              <TextInput
                type="text"
                placeholder="example"
                required
                onChange={""}
              />

              <FormLabel display="flex" alignItems="center">
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Nombre de usuario
              </FormLabel>
              <TextInput
                type="text"
                placeholder="example"
                required
                onChange={""}
              />
              <FormLabel display="flex" alignItems="center">
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Correo electrónico
              </FormLabel>
              <TextInput
                type="text"
                placeholder="example"
                required
                onChange={""}
              />
            </FormControl>

            <Box display={"flex"} gap={"10px"} p={8}>
              <StandardButton
                variant={"WHITE_RED"}
                borderRadius="20px"
                py={"17px"}
                w={"150px"}
                fontWeight="400"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </StandardButton>
              <StandardButton
                variant={"RED_PRIMARY"}
                borderRadius="20px"
                py={"17px"}
                w={"150px"}
                fontWeight="400"
                type={"submit"}
              >
                Guardar Cambios
              </StandardButton>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
