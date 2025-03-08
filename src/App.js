import "./App.css";
import { Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Spinner } from "@chakra-ui/react";
import ProtectedRoute from "./context/ProtectedRoute";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import ProductosyBodega from "./pages/ProductosyBodega";
import Asesores from "./pages/Asesores";
import ErrorPage from "./pages/ErrorPage";
import SideBar from "./component/SideBar";
import Header from "./component/Header";
import Resumen from "./pages/Resumen";
import Inventario from "./pages/Inventario";
import Visitas from "./pages/Visitas";
import Ventas from "./pages/Ventas";
import Dispositivo from "./pages/Dispositivo";
import Mensajes from "./pages/Mensajes";
import EstaVitrina from "./pages/EstaVitrina";
import ModalVitrinas from "./pages/ModalVitrinas";
import LoadingComponent from "./component/LoadingComponent";

import HomeIcon from "./assets/images/HomeIcon";
import StoreIcon from "./assets/images/StoreIcon";
import WareHouseIcon from "./assets/images/WareHouseIcon";
import BriefCaseIcon from "./assets/images/BriefCaseIcon";
import MinusIcon from "./assets/images/minusIcon";
import { useState, useEffect } from "react";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    } else if (!loading) {
      setIsLoading(false);
    }
  }, [isAuthenticated, loading]);

  if (loading || isLoading) {
    return (
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="9999"
        bg="white"
        opacity="1"
      >
        <LoadingComponent size="xl" text={"Cargando ..."} />
      </Box>
    );
  }

  if (isAuthenticated) {
    return (
      <Box display={"flex"} width={"100wh"} height={"100vh"}>
        <SideBar />
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
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute>{route.element}</ProtectedRoute>}
                errorElement={route.errorElement || <ErrorPage />}
              />
            ))}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
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
    label: "Productos y bodega",
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
