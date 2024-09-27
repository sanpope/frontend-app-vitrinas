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

export default function EditarAsesor({ isOpen, onOpen, onClose }) {
  const [newName, setNewName] = useState("");
  const [newUser, setNewUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedVitrinas, setSelectedVitrinas] = useState([]);
  const ciudadesVitrinas = useSelector(
    (state) => state.vitrinaReducer.ciudadesVitrinas,
  );

  const totalVitrinas = Object.values(ciudadesVitrinas).flat();

  const options = totalVitrinas.map((city) => ({
    label: city,
    value: city,
  }));

  const saveName = (e) => {
    setNewName(e);
  };
  const saveUser = (e) => {
    setNewUser(e.target.value);
  };
  const savePassword = (e) => {
    setNewPassword(e.target.value);
  };

  const EditarAsesor = (e) => {
    e.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
                onChange={(e) => saveName(e)}
                value={newName}
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
                Usuario
              </FormLabel>
              <TextInput
                type="text"
                placeholder="example"
                required
                onChange={(e) => saveUser(e)}
                value={newUser}
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
                Contraseña
              </FormLabel>
              <TextInput
                type="text"
                placeholder="example"
                required
                onChange={(e) => savePassword(e)}
                value={newPassword}
              />
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
            onClick={onClose}
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
            type={"submit"}
          >
            Guardar Cambios
          </StandardButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
