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
    if (listaCategorias && listaCategorias.length > 0 && !categoria) {
      setCategoria(capitalizeFirstLetter(listaCategorias[0]));
    }

    if (listaProveedores && listaProveedores.length > 0 && !proveedor) {
      setProveedor(listaProveedores[0]);
    }
  }, [listaCategorias, listaProveedores, isOpen]);

  useEffect(() => {
    if (categoria === "" && listaCategorias && listaCategorias.length > 0) {
      setCategoria(capitalizeFirstLetter(listaCategorias[0]));
    }
    
    if (proveedor === "" && listaProveedores && listaProveedores.length > 0) {
      setProveedor(listaProveedores[0]);
    }
  }, [categoria, proveedor, listaCategorias, listaProveedores]);

  const saveName = (val) => {
    setNombre(val);
  };
  
  const saveCodigo = (val) => {
    setCodigo(val);
  };
  
  const saveCosto = (val) => {
    if (val === '') {
      setCosto(0);
      return;
    }
    
    let costoNum;
    if (typeof val === 'string') {

      if (val.includes('.')) {
        costoNum = parseInt(val.replace(/\./g, ''));
      } else {
        costoNum = parseInt(val);
      }
    } else {
      costoNum = val;
    }
    
    if (!isNaN(costoNum)) {
      setCosto(costoNum);
    } else {
     
      console.warn('saveCosto - valor no válido');
    }
  };
  
  const savePrecio = (val) => {
    
    if (val === '') {
      setPrecio(0);
      return;
    }
    
    let precioNum;
    if (typeof val === 'string') {
      if (val.includes('.')) {
        precioNum = parseInt(val.replace(/\./g, ''));
      } else {
        precioNum = parseInt(val);
      }
    } else {
      precioNum = val;
    }
    
    
    if (!isNaN(precioNum)) {
      setPrecio(precioNum);
    } else {
      console.warn('savePrecio - valor no válido');
    }
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
    const nombreValido = nombre?.length > 0;
    const codigoValido = codigo !== "" && codigo !== 0;
    const costoValido = costo !== 0;
    const precioValido = precio !== 0;
    const cantidadValida = cantidad !== 0;
    const categoriaValida = categoria !== "" && categoria !== "No existen Categorías";
    const proveedorValido = proveedor !== "" && proveedor !== "No se encontraron proveedores" && 
                            proveedor !== "No existen Proveedores";
  
    return nombreValido && codigoValido && costoValido && precioValido && 
           cantidadValida && categoriaValida && proveedorValido;
  };

  const handleSubmit = () => {
    
    const productData = {
      nombre,
      codigo,
      costo, 
      precio, 
      cantidad,
      categoria,
      proveedor,
    };
    
    addProducto(productData, handleOnClose);
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
                onChange={(costo) => saveCosto(costo)}
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
                onChange={(precio) => savePrecio(precio)}
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
                defaultValue={listaCategorias && listaCategorias.length > 0 ? capitalizeFirstLetter(listaCategorias[0]) : ""}
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
                defaultValue={listaProveedores && listaProveedores.length > 0 ? listaProveedores[0] : ""}
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