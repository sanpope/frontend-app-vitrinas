import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import Editar from "../component/Editar";
import ConfirmationMessage from "../component/ConfirmationMessage";
import EditIcon from "../assets/images/EditIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import PlusCircleIcon from "../assets/images/PlusCircleIcon";
import AgregarAsesor from "../component/AgregarAsesor";
import AsesorContainer from "../component/AsesorContainer";
import MensajeInfoEstaVitrina from "../component/MensajeInfoEstaVitrina";
import xmlToJSON from "../services/XmlToJsonConverter";
import estaVitrina from "../services/estaVitrina";
import { parseData } from "../utils/xmlParse";
import axios from "axios";
import MensajeInfo from "../component/MensajeInfo";
import { setCity, setName, setCiudadesVitrinas } from "../store/slices/vitrina";
import { useNavigate } from "react-router-dom";
import EditarAsesor from "../component/EditarAsesor";

export default function EstaVitrina() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.vitrinaReducer.name);
  const city = useSelector((state) => state.vitrinaReducer.city);
  const ciudadesVitrinas = useSelector(
    (state) => state.vitrinaReducer.ciudadesVitrinas,
  );

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedCity, setUpdatedCity] = useState(city);

  const [infoTotalVitrina, setInfoTotalVitrina] = useState(null);
  const [asesor, setAsesor] = useState("");
  const [asesorNombre, setAsesorNombre] = useState("");

  useEffect(() => {
    getInfoVitrina();
  }, []);

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

  const {
    isOpen: isFourthModalOpen,
    onOpen: onFourthModalOpen,
    onClose: onFourthModalClose,
  } = useDisclosure();

  const {
    isOpen: isFifthModalOpen,
    onOpen: onFifthModalOpen,
    onClose: onFifthModalClose,
  } = useDisclosure();

  const getInfoVitrina = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/info?vitrina=${name}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );

      const xmlDoc = parseData(response.data);
      const infoVitrina = getInfoEstaVitrina(xmlDoc);
      setInfoTotalVitrina(infoVitrina);
      console.log(getInfoEstaVitrina(xmlDoc));
      setUpdatedCity(infoVitrina.ciudadDeVitrina);
    } catch (error) {
      console.log(error);
    } finally {
      onSecondModalClose();
    }
  };

  const getInfoEstaVitrina = (xml) => {
    const estaVitrina = xml.querySelector("estaVitrina");
    const asesores = xml.querySelector("asesores");
    const totalAsesores = asesores.querySelectorAll("asesor");
    let asesoresArr = [];
    for (let i = 0; i < totalAsesores?.length; i++) {
      asesoresArr.push({
        nombre:
          totalAsesores[i]?.getElementsByTagName("nombre")[0]?.textContent,
        usuario:
          totalAsesores[i]?.getElementsByTagName("usuario")[0]?.textContent,
        contraseña:
          totalAsesores[i]?.getElementsByTagName("contraseña")[0]?.textContent,
      });
    }
    const infoVitrina = {
      ciudadDeVitrina:
        estaVitrina.getElementsByTagName("ciudadDeVitrina")[0]?.textContent,
      fechaDeCreacion:
        estaVitrina.getElementsByTagName("fechaDeCreacion")[0]?.textContent,
      mensaje: estaVitrina.getElementsByTagName("mensaje")[0]?.textContent,
      nombreDeVitrina:
        estaVitrina.getElementsByTagName("nombreDeVitrina")[0]?.textContent,
      asesores: asesoresArr,
    };

    return infoVitrina;
  };

  const updateVitrina = async (nombre, ciudad) => {
    console.log(ciudadesVitrinas);

    const vitrinaUpdated = new URLSearchParams();
    vitrinaUpdated.append("nuevoNombre", `${nombre}`);
    vitrinaUpdated.append("nuevaCiudad", `${ciudad}`);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina?nombre=${name}`,
        vitrinaUpdated,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      console.log(response);
      if (response) {
        console.log(response);
        setUpdatedName(nombre);
        setUpdatedCity(ciudad);

        const copy = { ...ciudadesVitrinas };
        const updatedCityArray = [...copy[city]];
        const index = updatedCityArray.findIndex((item) => item === name);
        console.log(index);
        if (index !== -1) {
          if (city === ciudad) {
            const updatedCopy = { ...copy };
            const updatedCityArray = [...updatedCopy[city]];
            updatedCityArray.splice(index, 1, nombre);
            updatedCopy[city] = updatedCityArray;
            dispatch(setCiudadesVitrinas(updatedCopy));
            dispatch(setName(nombre));
          } else {
            const updatedCopy = { ...copy };
            updatedCopy[city] = updatedCopy[city].filter(
              (item) => item !== name,
            );
            updatedCopy[ciudad] = [...updatedCopy[ciudad], nombre];

            dispatch(setCiudadesVitrinas(updatedCopy));
            dispatch(setName(nombre));
            dispatch(setCity(ciudad));
          }
        } else {
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      alert("La vitrina se ha actualizado correctamente");
      onFirstModalClose();
    }
  };

  const deleteVitrina = async (nombre) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina?nombre=${nombre}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      console.log(response);
      if (response) {
        //Eliminar vitrina de la lista de vitrinas
        const copy = { ...ciudadesVitrinas };
        const index = copy[city].findIndex((item) => item === name);
        console.log(index);
        if (index !== -1) {
          copy[city] = copy[city].filter((item) => item !== name);
        }
        console.log(copy);

        dispatch(setCiudadesVitrinas(copy));
        alert("Vitrina Eliminada, Serás redirigido a la pantalla de Inicio");
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.status,
        );
        console.error("Detalles:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error en la solicitud:", error.message);
      }
    } finally {
      onSecondModalClose();
      navigate("/");
    }
  };

  const createAsesor = async (newAsesor) => {
    const nuevoAsesor = new URLSearchParams();
    nuevoAsesor.append("nombre", `${newAsesor.nombre}`);
    nuevoAsesor.append("usuarioApp", `${newAsesor.usuarioApp}`);
    nuevoAsesor.append("claveApp", `${newAsesor.claveApp}`);
    newAsesor?.vitrinas?.map((vitrina) => {
      return nuevoAsesor.append("vitrinas", `${vitrina}`);
    });
    nuevoAsesor.append("habilitado", `${newAsesor.habilitado}`);
    console.log(newAsesor);
    console.log(nuevoAsesor);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/asesores`,
        nuevoAsesor,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      console.log(response.data);
      if (response) {
        const index = infoTotalVitrina?.asesores?.findIndex(
          (item) => item.nombre === newAsesor.nombre,
        );
        if (index === -1) {
          setInfoTotalVitrina((prev) => {
            const copy = { ...prev };
            copy["asesores"] = [
              ...copy["asesores"],
              {
                nombre: newAsesor.nombre,
                usuario: newAsesor.usuarioApp,
                contraseña: newAsesor.claveApp,
              },
            ];
            return copy;
          });
        }
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.status,
        );
        console.error("Detalles:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error en la solicitud:", error.message);
      }
    } finally {
      onThirdModalClose();
    }
  };

  const editAsesor = () => {};

  const deleteAsesor = async (nombreAsesor) => {
    console.log(nombreAsesor);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/asesores?nombre=${nombreAsesor}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      console.log(response);
      if (response) {
        setInfoTotalVitrina((prev) => {
          const copy = { ...prev };
          const index = copy?.asesores?.findIndex(
            (item) => item.nombre === nombreAsesor,
          );
          console.log(index);
          if (index !== -1) {
            const result = copy?.asesores?.filter(
              (item) => item.nombre !== nombreAsesor,
            );
            copy.asesores = result;
          }
          return copy;
        });
        alert("Asesor Eliminado correctamente");
      }
    } catch (error) {
      console.log(error);
    } finally {
      alert("esto es finally");
      onFourthModalClose();
    }
  };

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={"20px"}
      p={"20px"}
      overflowY={"scroll"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Box
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "space-between" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <Box display={"flex"} flexDirection={"column"} p={1}>
            <Text textStyle={"RobotoBodyBold"}>{name}</Text>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
              gap={"10px"}
            >
              <Text textStyle={"RobotoBodyBold"}>Ciudad:</Text>
              <Text textStyle={"RobotoBody"}>{city}</Text>
              <Text textStyle={"RobotoBodyBold"}>Fecha de creación:</Text>
              <Text textStyle={"RobotoBody"}>
                {infoTotalVitrina?.fechaDeCreacion}
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent={{ base: "flex-start", md: "center" }}
            alignItems={"center"}
            gap={"10px"}
          >
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"10.25rem"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onFirstModalOpen}
            >
              Editar Vitrina
            </StandardButton>

            <Editar
              isOpen={isFirstModalOpen}
              onOpen={onFirstModalOpen}
              onClose={onFirstModalClose}
              onClick={onFirstModalClose}
              desc={"Vitrina"}
              desc2={"Vitrina"}
              name={updatedName}
              setName={setUpdatedName}
              city={updatedCity}
              setCity={setUpdatedCity}
              Editar={updateVitrina}
            />
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"10.25rem"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onSecondModalOpen}
            >
              Eliminar Vitrina
            </StandardButton>
            <ConfirmationMessage
              isOpen={isSecondModalOpen}
              onOpen={onSecondModalOpen}
              onClose={onSecondModalClose}
              icon={<WarningIcon />}
              text={"¿Estás seguro que desea eliminar a esta vitrina?"}
              text2={
                "Esta acción eliminará permanentemente los registros de esta vitrina de tu sistema"
              }
              colorText2={"red.100"}
              buttonText={"Continuar"}
              funcConfirmar={() => {
                console.log("Eliminar");
                deleteVitrina(name);
              }}
              products={null}
            />
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} flexDir={"column"} gap={"20px"}>
        <Text textStyle={"RobotoBodyBold"}>Asesores:</Text>

        <Box display={"flex"} flexWrap={"wrap"} gap={"20px"}>
          {infoTotalVitrina != null ? (
            infoTotalVitrina?.asesores?.map((asesor, index) => (
              <AsesorContainer
                key={index}
                asesor={asesor.nombre}
                email={asesor.usuario}
                password={asesor.contraseña}
                openModal={onFourthModalOpen}
                setAsesor={setAsesorNombre}
              />
            ))
          ) : (
            <Text>No se encontraron Asesores asignados a esta vitrina.</Text>
          )}
          <ConfirmationMessage
            isOpen={isFourthModalOpen}
            onOpen={onFourthModalOpen}
            onClose={onFourthModalClose}
            icon={<WarningIcon />}
            text={`¿Estás seguro que desea eliminar el asesor ${asesorNombre} ?`}
            text2={
              "Esta acción eliminará permanentemente los registros de este asesor de tu sistema"
            }
            colorText2={"red.100"}
            buttonText={"Continuar"}
            funcConfirmar={deleteAsesor}
            focusRow={asesorNombre}
            products={null}
          />
          <EditarAsesor
            isOpen={isFifthModalOpen}
            onOpen={onFifthModalOpen}
            onClose={onFifthModalClose}
          />
        </Box>

        <StandardButton
          variant={"RED_PRIMARY"}
          borderRadius="20px"
          py={"17px"}
          w={"fit-content"}
          fontSize={"14px"}
          fontWeight={"400"}
          onClick={onThirdModalOpen}
          leftIcon={<PlusCircleIcon />}
        >
          Agregar Asesor
        </StandardButton>
        <AgregarAsesor
          isOpen={isThirdModalOpen}
          onOpen={onThirdModalOpen}
          onClose={onThirdModalClose}
          asesor={asesor}
          setDeleteAsesor={setAsesor}
          addAsesor={createAsesor}
        />
      </Box>

      {infoTotalVitrina?.mensaje?.length > 0 ? (
        <MensajeInfo mensaje={infoTotalVitrina?.mensaje} />
      ) : (
        <></>
      )}
    </Box>
  );
}
