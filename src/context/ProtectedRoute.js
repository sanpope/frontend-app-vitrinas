import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Box } from "@chakra-ui/react";
import LoadingComponent from "../component/LoadingComponent";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
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
        <LoadingComponent size="xl" />
        <Box textAlign="center" mt="-12" fontSize="lg" fontWeight="medium">
          Cargando...
        </Box>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
