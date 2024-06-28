import "./App.css";
import { useState } from "react";
import Login from "./pages/Login";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import ProductosyBodega from "./pages/ProductosyBodega";
import Asesores from "./pages/Asesores";
import ErrorPage from "./pages/ErrorPage";
import SideBar from "./component/SideBar";
import HomeIcon from "./assets/images/HomeIcon";
import StoreIcon from "./assets/images/StoreIcon";
import WareHouseIcon from "./assets/images/WareHouseIcon";
import BriefCaseIcon from "./assets/images/BriefCaseIcon";
import Header from "./component/Header";
import colors from "./theme/colors";
import Resumen from "./pages/Resumen";
import MinusIcon from "./assets/images/minusIcon";
import Inventario from "./pages/Inventario";
import Visitas from "./pages/Visitas";
import Ventas from "./pages/Ventas";
import Dispositivo from "./pages/Dispositivo";
import Mensajes from "./pages/Mensajes";
import EstaVitrina from "./pages/EstaVitrina";
import ModalVitrinas from "./pages/ModalVitrinas";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true); // TODO get from cache

  return (
    <>
      {isLoggedIn ? (
        <BrowserRouter>
          <Box style={{ display: "flex", width: "100vw", height: "100vh" }}>
            <SideBar setLoggedIn={setLoggedIn} />
            <Box
              position={"relative"}
              w={"100%"}
              height={"100%"}
              display={"flex"}
              flexDir={"column"}
              bg={colors.mainBg}
            >
              <Header />
              <Routes>
                <Route element={<Navigate to="/" replace />} />
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                    errorElement={route.errorElement}
                  />
                ))}
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </>
  );
}

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    label: "Inicio",
    leftIcon: <HomeIcon />,
  },
  {
    path: "/vitrinas",
    element: <ModalVitrinas />,
    label: "Vitrinas",
    leftIcon: <StoreIcon />,
  },
  {
    path: "/productosybodega",
    element: <ProductosyBodega />,
    label: "Productos y Bodega",
    leftIcon: <WareHouseIcon />,
  },
  {
    path: "/asesores",
    element: <Asesores />,
    label: "Asesores",
    leftIcon: <BriefCaseIcon />,
  },
  {
    path: "/resumen",
    element: <Resumen />,
    label: "Resumen",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/inventario",
    element: <Inventario />,
    label: "Inventario",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/ventas",
    element: <Ventas />,
    label: "Ventas",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/visitas",
    element: <Visitas />,
    label: "Visitas",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/dispositivo",
    element: <Dispositivo />,
    label: "Dispositivo",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/mensajes",
    element: <Mensajes />,
    label: "Mensajes",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/estaVitrina",
    element: <EstaVitrina />,
    label: "Esta Vitrina",
    leftIcon: <MinusIcon />,
  },
];

export default App;
