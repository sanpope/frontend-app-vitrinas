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
  Select,
} from "@chakra-ui/react";

import TextInput from "../component/ui/textInput";
import StandardButton from "../component/ui/buttons/standard";
import { useSelector, useDispatch } from "react-redux";

export default function AgregarAsesor({ isOpen, onOpen, onClose }) {
  const [name, setName] = useState(null);
  const [vitrina, setVitrina] = useState(null);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  const totalVitrinas = useSelector(
    (state) => state.vitrinaReducer.listaDeVitrinas,
  );

  const saveName = (e) => {
    setName(e);
  };
  const saveVitrina = (e) => {
    setVitrina(e.target.value);
  };
  const saveUser = (e) => {
    setUser(e.target.value);
  };
  const savePassword = (e) => {
    setPassword(e.target.value);
  };

  const EditarAsesor = (e) => {
    e.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={"20px"}>
        <ModalHeader
          bg={"black"}
          display={"flex"}
          flexDir={"column"}
          borderTopRadius="20px"
        >
          <Text textStyle={"RobotoSubtitle"} color={"white"}>
            Agregar asesor
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
            <FormControl onSubmit={(e) => EditarAsesor(e)} isRequired>
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
                value={name}
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
                Vitrina
              </FormLabel>
              <Select>
                {totalVitrinas?.map((vit) => (
                  <option>{vit}</option>
                ))}
              </Select>

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
                value={user}
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
                value={password}
              />
            </FormControl>
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
            Agregar
          </StandardButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
