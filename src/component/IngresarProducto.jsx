import React, { useState, useEffect } from "react";
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import TextInput from "./ui/textInput";
import StandardButton from "./ui/buttons/standard";
import NumberInputFloat from "./NumberInputFloat";
import { capitalizeFirstLetter } from "../utils/formatting";

export default function IngresarProducto({
  desc = "Ingresar Nuevo",
  isOpen,
  onOpen,
  onClose,
  listaCategorias,
  listaProveedores,
  isLoading,
  addProducto,
}) {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [costo, setCosto] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [proveedor, setProveedor] = useState("");

  useEffect(() => {
    if (listaCategorias && listaCategorias.length > 0) {
      setCategoria(capitalizeFirstLetter(listaCategorias[0]));
    }

    if (listaProveedores && listaProveedores.length > 0) {
      setProveedor(listaProveedores[0]);
    }
  }, [listaCategorias, listaProveedores]);

  const saveName = (val) => {
    setNombre(val);
  };
  const saveCodigo = (val) => {
    setCodigo(val);
  };
  const saveCosto = (val) => {
    setCosto(val);
  };
  const savePrecio = (val) => {
    setPrecio(val);
  };
  const saveCantidad = (val) => {
    setCantidad(val);
  };
  const saveCategoria = (val) => {
    setCategoria(val.target.value);
  };
  const saveProveedor = (val) => {
    setProveedor(val.target.value);
  };

  const checkFileds = () => {
    if (
      nombre?.length > 0 &&
      codigo !== "" &&
      codigo !== 0 &&
      costo !== 0 &&
      precio !== 0 &&
      cantidad !== 0 &&
      categoria !== "" &&
      categoria !== "No existen Categorías" &&
      proveedor !== "" &&
      proveedor !== "No se encontraron proveedores"
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    addProducto(
      {
        nombre,
        codigo,
        costo,
        precio,
        cantidad,
        categoria,
        proveedor,
      },
      handleOnClose,
    );

    handleOnClose();
  };

  const handleOnClose = () => {
    setNombre("");
    setCodigo("");
    setCosto(0);
    setPrecio(0);
    setCantidad(0);

    if (listaCategorias && listaCategorias.length > 0) {
      setCategoria(capitalizeFirstLetter(listaCategorias[0]));
    } else {
      setCategoria("");
    }

    if (listaProveedores && listaProveedores.length > 0) {
      setProveedor(listaProveedores[0]);
    } else {
      setProveedor("");
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent borderRadius={"20px"} marginTop={"15px"}>
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
            <Box width={"100%"}>
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
                placeholder="Ingrese Nombre del producto"
                required
                onChange={(e) => saveName(e)}
                value={nombre}
              />

              <FormLabel display="flex" alignItems="center" mt={3}>
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
              <NumberInput
                min={1}
                size="md"
                maxW={"100%"}
                required
                borderRadius={"5px"}
                onChange={(val) => saveCodigo(val)}
                value={codigo}
              >
                <NumberInputField
                  placeholder={"1234"}
                  fontSize={"16px"}
                  textAlign={"left"}
                  w={"100%"}
                />
              </NumberInput>
              <FormLabel display="flex" alignItems="left" mt={3}>
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
              <NumberInputFloat
                value={costo}
                onChange={(costo) => saveCosto(parseFloat(costo))}
              />

              <FormLabel display="flex" alignItems="center" mt={3}>
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

              <NumberInputFloat
                value={precio}
                onChange={(costo) => savePrecio(parseFloat(costo))}
              />

              <FormLabel display="flex" alignItems="center" mt={3}>
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

              <NumberInput
                min={0}
                size="md"
                maxW={"100%"}
                required
                borderRadius={"5px"}
                onChange={(val) => saveCantidad(val)}
                value={cantidad}
              >
                <NumberInputField
                  fontSize={"16px"}
                  textAlign={"left"}
                  w={"100%"}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormLabel display="flex" alignItems="center" mt={3}>
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
                onChange={(e) => saveCategoria(e)}
                value={categoria}
              >
                {listaCategorias !== null && listaCategorias?.length > 0 ? (
                  listaCategorias?.map((cat, index) => (
                    <option key={index} value={capitalizeFirstLetter(cat)}>
                      {capitalizeFirstLetter(cat)}
                    </option>
                  ))
                ) : (
                  <option value="No existen Categorías">
                    No existen Categorías
                  </option>
                )}
              </Select>
              <FormLabel display="flex" alignItems="center" mt={3}>
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
                onChange={(e) => saveProveedor(e)}
                value={proveedor}
              >
                {listaProveedores && listaProveedores.length > 0 ? (
                  listaProveedores.map((prov, index) => (
                    <option key={index} value={prov}>
                      {prov}
                    </option>
                  ))
                ) : (
                  <option value="No existen Proveedores">
                    No existen Proveedores
                  </option>
                )}
              </Select>
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
            variant={checkFileds() ? "RED_PRIMARY" : "DISABLED"}
            borderRadius="20px"
            py={"17px"}
            w={"50%"}
            fontSize="14px"
            fontWeight="400"
            type={"submit"}
            onClick={checkFileds() ? handleSubmit : null}
            disabled={checkFileds() ? false : true}
            cursor={checkFileds() ? "pointer" : "not-allowed"}
            isLoading={isLoading}
          >
            Confirmar
          </StandardButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
