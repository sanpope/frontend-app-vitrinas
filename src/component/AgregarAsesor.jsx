import React, { useCallback, useState } from "react";
import {
  Box,
  Text,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  FormLabel,
  Select as ChakraSelect,
  Input,
} from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";

import TextInput from "../component/ui/textInput";
import StandardButton from "../component/ui/buttons/standard";
import { useSelector, useDispatch } from "react-redux";

export default function AgregarAsesor({
  vitrinaName,
  isOpen,
  onOpen,
  onClose,
  asesor,
  setAsesor,
  addAsesor,
  isLoading
}) {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [habilitado, setHabilitado] = useState("");
  const [selectedVitrinas, setSelectedVitrinas] = useState([vitrinaName]);
  const ciudadesVitrinas = useSelector(
    (state) => state.vitrinaReducer.ciudadesVitrinas,
  );

  const totalVitrinas = Object.values(ciudadesVitrinas).flat();

  const options = totalVitrinas
    .sort((a, b) => a.localeCompare(b))
    .map((city) => ({
      label: city,
      value: city,
    }));

  const saveName = (e) => {
    setName(e);
  };

  const saveUser = (e) => {
    setUser(e);
  };
  const savePassword = (e) => {
    setPassword(e);
  };

  const saveHabilitado = (e) => {
    setHabilitado(e);
  };

  const saveVitrinas = (selectedOptions) => {
    let arrVit = [];
    setSelectedVitrinas(() => {
      selectedOptions.map((opt) => {
        arrVit.push(opt.label);
      });
      return arrVit;
    });
  };

  const handleOnClik = () => {
    addAsesor({
      nombre: name,
      usuarioApp: user,
      claveApp: password,
      vitrinas: selectedVitrinas,
      habilitado: habilitado,
    });
    setAsesor({
      nombre: name,
      usuarioApp: user,
      claveApp: password,
      vitrinas: selectedVitrinas,
      habilitado: habilitado,
    });

    handleModalClose();
  };

  const handleModalClose = () => {
    onClose();
    setName("");
    setUser("");
    setPassword("");
    setHabilitado("true");
    // saveVitrinas([]);
  };

  const checkFlieds = () => {
    if (
      name?.length > 0 &&
      user?.length > 0 &&
      password?.length > 0 &&
      habilitado?.length > 0 &&
      selectedVitrinas?.length
    ) {
      return true;
    }
    return false;
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
                placeholder="Ingrese el nombre del Asesor"
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
              {/* <ReactSelect
                options={options}
                isMulti
                closeMenuOnSelect={false}
                placeholder="Selecciona las vitrinas"
                onChange={saveVitrinas}
              ></ReactSelect> */}

              <Input
                type="text"
                placeholder={vitrinaName}
                required
                value={vitrinaName}
                disabled={true}
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
                placeholder="Ingrese Usuario"
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
                placeholder="Ingrese contraseña"
                required
                onChange={(e) => savePassword(e)}
                value={password}
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
            onClick={handleModalClose}
          >
            Cancelar
          </StandardButton>
          <StandardButton
            variant={checkFlieds() ? "RED_PRIMARY" : "DISABLED"}
            borderRadius="20px"
            py={"17px"}
            w={"50%"}
            fontSize="14px"
            fontWeight="400"
            type={"button"}
            onClick={checkFlieds() ? handleOnClik : null}
            disabled={checkFlieds() ? false : true}
            cursor={checkFlieds() ? "pointer" : "not-allowed"}
            isLoading={isLoading}
          >
            Agregar
          </StandardButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
