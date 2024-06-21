import "./App.css";
import { useState } from "react";
import Login from "./pages/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import Vitrinas from "./pages/Vitrinas";
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





function App() {
  const [isLoggedIn, toggleLoggedIn] = useState(true); // TODO get from cache
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isLoggedIn ? (
        <BrowserRouter>
          <Box style={{ display: "flex", width: "100vw", height: "100vh" }}>
            <SideBar  isOpen={isOpen} setIsOpen={setIsOpen}/>
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
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    element={route.element}
                    errorElement={route.errorElement}
                  />
                ))}
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      ) : (
        <Login />
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
    element: <Vitrinas  />,
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
];

export default App;
