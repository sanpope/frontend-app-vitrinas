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

import TextInput from "./ui/textInput";
import StandardButton from "./ui/buttons/standard";

export default function IngresarProducto({
  desc = "Ingresar Nuevo",
  isOpen,
  onOpen,
  onClose,
}) {
  const [name, setName] = useState("");
  const [codigo, setCodigo] = useState("");
  const [costo, setCosto] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [proveedor, setProveedor] = useState("");

  const saveName = (e) => {
    setName(e);
  };
  const saveCodigo = (e) => {
    setCodigo(e.target.value);
  };
  const saveCosto = (e) => {
    setCosto(e.target.value);
  };
  const savePrecio = (e) => {
    setPrecio(e.target.value);
  };
  const saveCantidad = (e) => {
    setCantidad(e.target.value);
  };
  const saveCategoria = (e) => {
    setCategoria(e.target.value);
  };
  const saveProveedor = (e) => {
    setProveedor(e.target.value);
  };

  const handleSubmit = (e) => {
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
            {desc} Producto
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
            <FormControl onSubmit={(e) => handleSubmit(e)}>
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
                placeholder="Camisetas"
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
                Código
              </FormLabel>
              <TextInput
                type="text"
                placeholder="Camisetas010"
                required
                onChange={(e) => saveCodigo(e)}
                value={codigo}
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
                Costo
              </FormLabel>
              <TextInput
                type="text"
                placeholder="1233,00"
                required
                onChange={(e) => saveCosto(e)}
                value={costo}
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
                Precio
              </FormLabel>
              <TextInput
                type="text"
                placeholder="12336,00"
                required
                onChange={(e) => savePrecio(e)}
                value={precio}
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
                Cantidad
              </FormLabel>
              <TextInput
                type="text"
                placeholder="350 pza"
                required
                onChange={(e) => saveCantidad(e)}
                value={cantidad}
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
                Categoría
              </FormLabel>
              <Select
                required
                placeholder="Seleccionar"
                onChange={(e) => saveCategoria(e)}
              >
                <option>Cat 1</option>
                <option>Cat 2</option>
                <option>Cat 3</option>
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
                Proveedor
              </FormLabel>
              <Select
                required
                placeholder="Seleccionar"
                onChange={(e) => saveProveedor(e)}
              >
                <option>Opt 1</option>
                <option>Opt 2</option>
                <option>Opt 3</option>
              </Select>
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
            Confirmar
          </StandardButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
