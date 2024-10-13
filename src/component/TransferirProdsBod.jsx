import {
  Box,
  FormControl,
  FormLabel,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import StandardButton from "./ui/buttons/standard";
import RightArrowIcon from "../assets/images/RightArrowIcon";
import FilterIcon from "../assets/images/FilterIcon";
import SearchIcon from "../assets/images/SearchIcon";
import TextInput from "./ui/textInput/index";
import Checkbox from "./ui/checkbox";
import Product from "./Product";
import ConfirmationMessage from "./ConfirmationMessage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { parseData } from "../utils/xmlParse";
import { generateProductsListXML } from "../utils/xmlParse";
import {
  capitalizeFirstLetter,
  formatearNumero,
  formatString,
} from "../utils/formatting";
import { useMemo } from "react";

export default function TransferirProdsBod({
  isOpen,
  onOpen,
  onClose,
  totalProdcsBodega,
  displayedArticulos,
  setTotalProdcsBodega,
  setDisplayedArticulos,
}) {
  const toast = useToast();
  const [desde, setDesde] = useState("Bodega");
  const [hacia, setHacia] = useState("");
  const [totalProdcsBodegaCopy, setTotalProdcsBodegaCopy] = useState([
    ...totalProdcsBodega,
  ]);
  const [displayedArticulosCopy, setDisplayedArticulosCopy] = useState([
    ...totalProdcsBodega,
  ]);
  const [totalProductosVitrina, setTotalProductosVitrina] = useState([]);
  const [displayedProdsVitrina, setDisplayedProdsVitrina] = useState([]);
  const [busqueda, setBusqueda] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productsToShow, setProductsToShow] = useState([]);
  const [activeProdcs, setActiveProdcs] = useState([]);
  const [ciudadesVitrinas, setCiudadesVitrinas] = useState([]);

  const totalVitrinas = Object.values(ciudadesVitrinas).flat();

  const options = totalVitrinas
    .sort((a, b) => a.localeCompare(b))
    .map((city) => ({
      value: city,
    }));

  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  useEffect(() => {
    getVitrinasInfo();
  }, []);

  useEffect(() => {
    if (busqueda !== null) {
      Busqueda(busqueda);
    } else {
    }
  }, [busqueda]);

  useEffect(() => {
    if (totalProdcsBodegaCopy && totalProductosVitrina) {
      setActiveProdcs([]);
      setProductsToShow(
        desde === "Bodega" ? totalProdcsBodegaCopy : displayedProdsVitrina,
      );
    }
  }, [desde]);

  useEffect(() => {
    if (desde !== "Bodega") {
      getProductosVitrina(desde);
    }
  }, [desde]);

  const getVitrinasInfo = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      })
      .then((response) => {
        const xmlDoc = parseData(response.data);
        setCiudadesVitrinas(vitrinasData(xmlDoc));
      })
      .catch((error) => {
        console.error("Error fetching the XML data: ", error);
        return error;
      });
  };

  const vitrinasData = (xml) => {
    const vitrinasList = [];
    let DataVitrina = xml.querySelector("vitrinas");
    let totalVitrinas = DataVitrina.querySelectorAll("vitrina");
    const vitrinasObj = {};

    for (let i = 0; i < totalVitrinas.length; i++) {
      let city = totalVitrinas[i].getElementsByTagName("ciudad")[0].textContent;
      let vitrina =
        totalVitrinas[i].getElementsByTagName("nombre")[0].textContent;
      vitrinasList.push(vitrina);
      if (!(city in vitrinasObj)) {
        vitrinasObj[city] = [];
      }
      vitrinasObj[city].push(vitrina);
    }
    return vitrinasObj;
  };

  const getProductosVitrina = async (vitrina) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/inventario?vitrina=${vitrina}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
      });
      if (response.status == 200 && response.data) {
        const xmlDoc = parseData(response.data);
        setTotalProductosVitrina(productosVitrina(xmlDoc));
        setDisplayedProdsVitrina(productosVitrina(xmlDoc));
        setProductsToShow(productosVitrina(xmlDoc));
      }
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  };

  const productosVitrina = (xml) => {
    const totalProdsArr = [];
    const inventarios = xml.querySelector("inventarios");
    const listadoProds = inventarios.querySelectorAll("producto");
    if (listadoProds?.length > 0) {
      for (let i = 0; i < listadoProds.length; i++) {
        const codigo =
          listadoProds[i]?.getElementsByTagName("codigo")[0].textContent;
        let nombre = formatString(
          listadoProds[i]?.getElementsByTagName("nombre")[0].textContent,
        );
        const precio = formatearNumero(
          listadoProds[i]?.getElementsByTagName("precio")[0].textContent,
        );
        const costo = formatearNumero(
          listadoProds[i]?.getElementsByTagName("costo")[0].textContent,
        );
        const existencia =
          listadoProds[i]?.getElementsByTagName("existencias")[0].textContent;

        const exisVerificadas = listadoProds[i]?.getElementsByTagName(
          "existenciasVerificadas",
        )[0].textContent;

        const stockMin =
          listadoProds[i]?.getElementsByTagName("stockMinimo")[0].textContent;

        const stockMax =
          listadoProds[i]?.getElementsByTagName("stockMaximo")[0].textContent;
        const categoria = capitalizeFirstLetter(
          listadoProds[i]?.getElementsByTagName("categoria")[0].textContent,
        );

        const proveedor =
          listadoProds[i]?.getElementsByTagName("proveedor")[0].textContent;

        totalProdsArr.push({
          codigo,
          nombre,
          categoria,
          precio,
          costo,
          existencia,
          exisVerificadas,
          stockMin,
          stockMax,
          proveedor,
        });
      }
      return totalProdsArr;
    } else {
      return null;
    }
  };

  const Busqueda = (textToSearch) => {
    const tableToFilter =
      desde !== "Bodega"
        ? [...totalProductosVitrina, ...displayedProdsVitrina]
        : [...totalProdcsBodegaCopy];
    let result = tableToFilter?.filter((element) => {
      if (
        element?.nombre?.toLowerCase().includes(textToSearch?.toLowerCase())
      ) {
        return element;
      }
    });
    setProductsToShow(result);
  };

  const onBuscarChange = (e) => {
    setBusqueda(e);
  };

  const handleCheck = (producto) => {
    const isChecked = activeProdcs.find(
      (item) => item.codigo === producto.codigo,
    );
    if (isChecked) {
      deleteProductFromList(producto);
    } else {
      const nuevoProducto = { ...producto, cantidad: 1 };
      setActiveProdcs((prev) => [...prev, nuevoProducto]);
    }
  };

  const setProdCantidad = (val, prod) => {
    const isProdExists = activeProdcs?.find(
      (item) => item.codigo === prod.codigo,
    );
    if (isProdExists) {
      setActiveProdcs((prev) => {
        const index = prev.findIndex((item) => item.codigo === prod.codigo);
        if (index !== -1) {
          const copy = [...prev];
          copy[index]["cantidad"] = val;
          return copy;
        }
      });
    }
  };

  const deleteProductFromList = (prod) => {
    setActiveProdcs((prev) => {
      const index = prev.findIndex((item) => item.codigo === prod.codigo);
      if (index !== -1) {
        const copy = [...prev];
        copy.splice(index, 1);
        return copy;
      }
    });
  };

  const ProductListItem = useCallback(
    (product, index) => {
      const isActive = activeProdcs.find((currentProduct) => {
        return currentProduct.codigo === product.codigo;
      });

      return (
        <ListItem
          key={index}
          w={"100%"}
          borderBottom="1px"
          borderColor="gray.200"
          py={"10px"}
        >
          <Checkbox
            checked={!!isActive}
            setChecked={() => handleCheck(product)}
            text={capitalizeFirstLetter(product.nombre)}
            colorScheme={"#1890FF"}
          />
        </ListItem>
      );
    },
    [activeProdcs],
  );

  const transferirProdcs = async () => {
    setLoading(true);
    const xmlData = generateProductsListXML(activeProdcs).toString();

    const haciaVitrina = hacia !== "Bodega" ? true : false;
    const vitrinaName = desde === "Bodega" ? hacia : desde;

    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/productos/transferencia?vitrina=${vitrinaName}&haciaVitrina=${haciaVitrina}`;
    if (xmlData.length > 0) {
      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/xml" },
        body: xmlData.toString(),
      })
        .then((response) => {
          // setTotalProdcsBodega
          // setDisplayedArticulos
          if (response.status == 200) {
            if (haciaVitrina) {
              setDisplayedArticulos((prev) => {
                let copy = prev ? [...prev] : [];
                const resultado = copy.map((item1) => {
                  const matchingItems = activeProdcs.filter(
                    (item) => item.codigo === item1.codigo,
                  );
                  if (matchingItems.length > 0) {
                    const totalToSubtract = matchingItems.reduce(
                      (sum, item) => sum + Number(item.cantidad),
                      0,
                    );
                    const newCantidad =
                      Number(item1.cantidadEnBodega) - totalToSubtract;
                    //cantidadEnVitrinas
                    const newCantidadVitrinas =
                      Number(item1.cantidadEnVitrinas) + totalToSubtract;
                    return {
                      ...item1,
                      cantidadEnBodega: newCantidad,
                      cantidadEnVitrinas: newCantidadVitrinas,
                    };
                  }
                  return item1;
                });
                return resultado;
              });
              setTotalProdcsBodega((prev) => {
                let copy = prev ? [...prev] : [];
                const resultado = copy.map((item1) => {
                  const matchingItems = activeProdcs.filter(
                    (item) => item.codigo === item1.codigo,
                  );
                  if (matchingItems.length > 0) {
                    const totalToSubtract = matchingItems.reduce(
                      (sum, item) => sum + Number(item.cantidad),
                      0,
                    );
                    const newCantidad =
                      Number(item1.cantidadEnBodega) - totalToSubtract;
                    //cantidadEnVitrinas
                    const newCantidadVitrinas =
                      Number(item1.cantidadEnVitrinas) + totalToSubtract;
                    return {
                      ...item1,
                      cantidadEnBodega: newCantidad,
                      cantidadEnVitrinas: newCantidadVitrinas,
                    };
                  }
                  return item1;
                });
                return resultado;
              });
            } else {
              setDisplayedArticulos((prev) => {
                let copy = prev ? [...prev] : [];
                const resultado = copy.map((item1) => {
                  const matchingItems = activeProdcs.filter(
                    (item) => item.codigo === item1.codigo,
                  );
                  if (matchingItems.length > 0) {
                    const totalToAdd = matchingItems.reduce(
                      (sum, item) => sum + Number(item.cantidad),
                      0,
                    );
                    const newCantidad =
                      Number(item1.cantidadEnBodega) + totalToAdd;

                    const newCantidadVitrinas =
                      Number(item1.cantidadEnVitrinas) - totalToAdd;
                    return {
                      ...item1,
                      cantidadEnBodega: newCantidad,
                      cantidadEnVitrinas: newCantidadVitrinas,
                    };
                  }
                  return item1;
                });
                return resultado;
              });
              setTotalProdcsBodega((prev) => {
                let copy = prev ? [...prev] : [];
                const resultado = copy.map((item1) => {
                  const matchingItems = activeProdcs.filter(
                    (item) => item.codigo === item1.codigo,
                  );
                  if (matchingItems.length > 0) {
                    const totalToAdd = matchingItems.reduce(
                      (sum, item) => sum + Number(item.cantidad),
                      0,
                    );
                    const newCantidad =
                      Number(item1.cantidadEnBodega) + totalToAdd;

                    const newCantidadVitrinas =
                      Number(item1.cantidadEnVitrinas) - totalToAdd;
                    return {
                      ...item1,
                      cantidadEnBodega: newCantidad,
                      cantidadEnVitrinas: newCantidadVitrinas,
                    };
                  }
                  return item1;
                });
                return resultado;
              });
            }
            toast({
              status: "success",
              description: "Transferencia realizada con éxito!.",
              duration: 3000,
              position: "top-right",
              isClosable: true,
            });
          }
          setLoading(false);
          onClose();
        })
        .catch((error) => {
          console.log(error);
          toast({
            status: "error",
            description: "Error transfiriendo los productos",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        });
    } else {
    }
  };

  const CantidadTotal = useMemo(() => {
    return activeProdcs.reduce((arr, item) => {
      return arr + Number.parseInt(item.cantidad);
    }, 0);
  }, [activeProdcs]);

  const handleSelectDesde = (e) => {
    const value = e.target.value;
    setDesde(value);
    if (value !== "Bodega") {
      setHacia("Bodega");
    }
  };

  const handleSelectHacia = (e) => {
    const value = e.target.value;
    console.log("Hacia linea 502", value);
    setHacia(value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius={"20px"}
        maxW={"70%"}
        height={"auto"}
        bg={"white"}
      >
        <ModalHeader
          bg={"black"}
          display={"flex"}
          flexDir={"column"}
          borderTopRadius="20px"
        >
          <Text textStyle={"RobotoSubtitle"} color={"white"}>
            Transferir
          </Text>
        </ModalHeader>
        <ModalBody display={"flex"} flexDirection={"column"} gap={2}>
          <Box w={"100%"} display={"flex"} flexDir={"column"}>
            <Box
              w={"100%"}
              display={"flex"}
              alignContent={"center"}
              gap={2}
              justifyContent={"flex-start"}
              pb={2}
            >
              <Text
                w={"100%"}
                maxW={"250px"}
                textStyle={"RobotoSubtitleRegular"}
                color={"grey.placeholder"}
              >
                Se transferiran productos desde:
              </Text>
              <Text w={"50px"}></Text>
              <Text
                w={"100%"}
                maxW={"250px"}
                textStyle={"RobotoSubtitleRegular"}
                color={"grey.placeholder"}
              >
                Hacia:
              </Text>
            </Box>
            <Box
              display={"flex"}
              alignContent={"center"}
              gap={2}
              justifyContent={"flex-start"}
            >
              <Select
                value={desde}
                onChange={handleSelectDesde}
                minH={"40px"}
                w={"100%"}
                maxW={"250px"}
                required
                // color={"grey.placeholder"}
              >
                <option value="Bodega">Bodega</option>
                {/* Mostrar opciones de la lista */}
                {options?.map((opt, index) => (
                  <option key={index} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </Select>

              <Box
                display={{ base: "none", lg: "flex" }}
                justifyContent={"center"}
                alignItems={"center"}
                alignSelf={"center"}
              >
                <RightArrowIcon height="100%" />
              </Box>

              <Select
                onChange={handleSelectHacia}
                isDisabled={desde !== "Bodega"}
                minH={"40px"}
                w={"100%"}
                maxW={"250px"}
                required
                //color={"grey.placeholder"}
              >
                {desde === "Bodega" ? (
                  options.map((opt, index) => (
                    <option key={index} value={opt.value}>
                      {opt.value}
                    </option>
                  ))
                ) : (
                  <option value={"Bodega"}>Bodega</option>
                )}
              </Select>
            </Box>
          </Box>

          <Box
            w={"100%"}
            display={"flex"}
            flexDir={{ base: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"1.25rem"}
          >
            <Box
              w={{ base: "100%", md: "50%" }}
              height={"240px"}
              borderRadius={"20px"}
              border="1px"
              borderColor="gray.200"
              p={"0.938rem"}
            >
              <FormControl>
                <Text textStyle={"RobotoSubtitleBold"} py={"10px"}>
                  Seleccionar productos
                </Text>
                <FormLabel
                  display="flex"
                  alignItems="center"
                  justifyContent={"space-between"}
                  gap={"0.625rem"}
                >
                  <TextInput
                    placeholder={"Buscar"}
                    leftIcon={<SearchIcon />}
                    onChange={(e) => onBuscarChange(e)}
                    value={busqueda}
                  />
                  <FilterIcon />
                </FormLabel>

                <FormLabel display="flex" alignItems="center">
                  <UnorderedList
                    styleType="none"
                    w={"100%"}
                    m={0}
                    px={1}
                    height={"120px"}
                    overflowY="scroll"
                    sx={{
                      "::-webkit-scrollbar": {
                        width: "8px",
                        height: "4px",
                      },
                      "::-webkit-scrollbar-track": {
                        background: "tranparent",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "gray.200",
                        borderRadius: "10px",
                      },
                      "::-webkit-scrollbar-thumb:hover": {
                        background: "gray.200",
                      },
                    }}
                  >
                    {productsToShow?.map((product, index) => {
                      return ProductListItem(product, index);
                    })}
                  </UnorderedList>
                </FormLabel>
              </FormControl>
            </Box>
            <Box
              w={{ base: "100%", md: "50%" }}
              height={"240px"}
              borderRadius={"20px"}
              border="1px"
              borderColor="gray.200"
              p={"15px"}
            >
              {activeProdcs?.length > 0 ? (
                <FormControl
                  w={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text textStyle={"RobotoSubtitleBold"} p={"10px"}>
                    Productos a transferir
                  </Text>

                  <Box
                    alignSelf={"flex-end"}
                    mr={"12%"}
                    display={"flex"}
                    w={"50%"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                  >
                    <Text textStyle={"RobotoBody"} py={"10px"}>
                      Stock
                    </Text>
                    <Text textStyle={"RobotoBody"} py={"10px"}>
                      Cantidad
                    </Text>
                  </Box>

                  <FormLabel
                    display="flex"
                    alignItems="center"
                    flexDirection={"column"}
                    height={"120px"}
                    overflowY="scroll"
                    overflowX="hidden"
                    sx={{
                      "::-webkit-scrollbar": {
                        width: "8px",
                        height: "4px",
                      },
                      "::-webkit-scrollbar-track": {
                        background: "tranparent",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "gray.200",
                        borderRadius: "10px",
                      },
                      "::-webkit-scrollbar-thumb:hover": {
                        background: "gray.200",
                      },
                    }}
                  >
                    <UnorderedList
                      styleType="none"
                      w={"100%"}
                      height={"120px"}
                      overflowY="scroll"
                      sx={{
                        "::-webkit-scrollbar": {
                          width: "8px",
                          height: "4px",
                        },
                        "::-webkit-scrollbar-track": {
                          background: "tranparent",
                        },
                        "::-webkit-scrollbar-thumb": {
                          background: "gray.200",
                          borderRadius: "10px",
                        },
                        "::-webkit-scrollbar-thumb:hover": {
                          background: "gray.200",
                        },
                      }}
                    >
                      {activeProdcs?.map((product, index) => {
                        return (
                          <ListItem key={index}>
                            <Product
                              productName={product.nombre}
                              existencias={
                                product.existencia || product.cantidadEnBodega
                              }
                              producto={product}
                              setProdCantidad={(val) =>
                                setProdCantidad(val, product)
                              }
                              deleteProduct={deleteProductFromList}
                            />
                          </ListItem>
                        );
                      })}
                    </UnorderedList>
                  </FormLabel>
                </FormControl>
              ) : (
                <Box
                  w={"100%"}
                  h={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text textStyle={"RobotoSubtitleBold"} py={"10px"}>
                    Productos a transferir
                  </Text>
                  <Box
                    w={"100%"}
                    h={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text color={"grey.placeholder"}>
                      Porfavor seleccione los productos a transferir
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter display={"flex"} gap={"10px"}>
          <StandardButton
            variant={"WHITE_RED"}
            borderRadius="20px"
            py={"17px"}
            w={"150px"}
            fontSize="14px"
            fontWeight="400"
            onClick={onClose}
          >
            Cancelar
          </StandardButton>
          <StandardButton
            variant={activeProdcs?.length > 0 ? "RED_PRIMARY" : "DISABLED"}
            borderRadius="20px"
            py={"17px"}
            w={"150px"}
            fontSize="14px"
            fontWeight="400"
            onClick={activeProdcs?.length > 0 ? onConfirmationModalOpen : null}
            disabled={activeProdcs?.length > 0 ? false : true}
            cursor={activeProdcs?.length > 0 ? "pointer" : "not-allowed"}
            isLoading={loading}
          >
            Enviar
          </StandardButton>
          <ConfirmationMessage
            text={`Se transferirán ${CantidadTotal} productos desde ${desde} hacia ${hacia}.`}
            isOpen={isConfirmationModalOpen}
            onOpen={onConfirmationModalOpen}
            onClose={onConfirmationModalClose}
            funcConfirmar={transferirProdcs}
            isLoading={loading}
            desde={desde}
            hacia={hacia}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
