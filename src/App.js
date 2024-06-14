import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Vitrinas from "./pages/Vitrinas";
import ProductosyBodega from "./pages/ProductosyBodega";
import Asesores from "./pages/Asesores";
import ErrorPage from "./pages/ErrorPage";
import SideBar from "./component/SideBar";
import Home from "./assets/images/Home";
import Store from "./assets/images/Store";
import WareHouse from "./assets/images/WareHouse";
import BriefCase from "./assets/images/BriefCase";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    label: "Inicio",
    leftIcon: <Home />,
  },
  {
    path: "/vitrinas",
    element: <Vitrinas />,
    label: "Vitrinas",
    leftIcon: <Store />,
  },
  {
    path: "/productosybodega",
    element: <ProductosyBodega />,
    label: "Productos y Bodega",
    leftIcon: <WareHouse />,
  },
  {
    path: "/asesores",
    element: <Asesores />,
    label: "Asesores",
    leftIcon: <BriefCase />,
  },
];

function App() {
  const [isLoggedIn, toggleLoggedIn] = useState(false); // TODO get from cache

  return (
    <>
      {isLoggedIn ? (
        <BrowserRouter>
          <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
            <SideBar />
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
          </div>
        </BrowserRouter>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
