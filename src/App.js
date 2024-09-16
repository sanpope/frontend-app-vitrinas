import "./App.css";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
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
  const [isLoggedIn, setLoggedIn] = useState(false); // TODO get from cache

  return (
    <>
      {isLoggedIn ? (
        <BrowserRouter>
          <Box display={"flex"} width={"100%"} height={"100%"}>
            <SideBar setLoggedIn={setLoggedIn} />
            <Box
              position={"relative"}
              height={"100%"}
              display={"flex"}
              flexGrow={1}
              overflowX={"auto"}
              flexDir={"column"}
              bg={"mainBg"}
            >
              <Header />
              <Routes>
                <Route path="*" element={<Navigate to="/" replace />} />
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
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
    label: "Cuenta",
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
