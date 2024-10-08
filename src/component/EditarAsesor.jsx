import React, { useState } from "react";
import {
  Box,
  Text,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  FormControl,
  FormLabel,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import { useSelector, useDispatch } from "react-redux";

import TextInput from "../component/ui/textInput";
import StandardButton from "../component/ui/buttons/standard";

export default function EditarAsesor({
  vitrinaName,
  asesor,
  isOpen,
  onOpen,
  onClose,
  Editar,
  isLoading,
}) {
  console.log(asesor);
  const [newName, setNewName] = useState(asesor?.nombre);
  const [newUser, setNewUser] = useState(asesor?.usuario);
  const [newPassword, setNewPassword] = useState(asesor?.contraseña);
  const [habilitado, setHabilitado] = useState("false");
  const [selectedVitrinas, setSelectedVitrinas] = useState([vitrinaName]);
  const ciudadesVitrinas = useSelector(
    (state) => state.vitrinaReducer.ciudadesVitrinas,
  );

  const totalVitrinas = Object.values(ciudadesVitrinas).flat();

  const options = totalVitrinas.map((city) => ({
    label: city,
    value: city,
  }));

  const saveName = (val) => {
    setNewName(val);
  };
  const saveUser = (val) => {
    setNewUser(val);
  };
  const savePassword = (val) => {
    setNewPassword(val);
  };
  const saveHabilitado = (val) => {
    setHabilitado(val);
  };

  const handleOnClose = () => {
    onClose();
    setNewName(asesor?.nombre);
    setNewUser(asesor?.usuario);
    setNewPassword(asesor?.contraseña);
    setHabilitado("false");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay bg={"rgba(0, 0, 0, 0.2)"} />
      <ModalContent borderRadius={"20px"}>
        <ModalHeader
          bg={"black"}
          display={"flex"}
          flexDir={"column"}
          borderTopRadius="20px"
        >
          <Text textStyle={"RobotoSubtitle"} color={"white"}>
            Editar asesor
          </Text>
        </ModalHeader>
        <ModalBody
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            w={"100%"}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box w={"100%"}>
              <FormLabel display="flex" alignItems="center" mt={2}>
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
                required
                onChange={(val) => saveName(val)}
                value={newName}
              />

              <FormLabel display="flex" alignItems="center" mt={2}>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Usuario
              </FormLabel>
              <TextInput
                type="text"
                required
                onChange={(val) => saveUser(val)}
                value={newUser}
              />
              <FormLabel display="flex" alignItems="center" mt={2}>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Contraseña
              </FormLabel>
              <TextInput
                type="text"
                required
                onChange={(val) => savePassword(val)}
                value={newPassword}
              />
              <FormLabel display="flex" alignItems="center" mt={2}>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Habilitado
              </FormLabel>
              <ChakraSelect
                value={habilitado}
                onChange={(e) => saveHabilitado(e.target.value)}
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </ChakraSelect>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter display={"flex"} gap={"10px"}>
          <StandardButton
            variant={"WHITE_RED"}
            borderRadius="20px"
            py={"17px"}
            w={"50%"}
            fontSize="14px"
            fontWeight="400"
            onClick={handleOnClose}
          >
            Cancelar
          </StandardButton>
          <StandardButton
            variant={"RED_PRIMARY"}
            borderRadius="20px"
            py={"17px"}
            w={"50%"}
            fontSize="14px"
            fontWeight="400"
            onClick={() => {
              Editar(
                {
                  nombre: newName,
                  usuarioApp: newUser,
                  claveApp: newPassword,
                  vitrinas: selectedVitrinas,
                  habilitado: habilitado,
                },
                handleOnClose,
              );
            }}
            isLoading={isLoading}
          >
            Guardar Cambios
          </StandardButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
