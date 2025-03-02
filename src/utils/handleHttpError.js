const handleHttpError = (
  error,
  customHandlers = {},
  defaultHandler = null,
  setErrorState = null,
) => {
  let errorInfo = {
    status: null,
    message: "Error desconocido",
    data: null,
  };

  if (error.response) {
    const statusCode = error.response.status;
    errorInfo.status = statusCode;
    errorInfo.data = error.response.data;

    switch (statusCode) {
      case 400:
        errorInfo.message = "Solicitud incorrecta";
        break;
      case 401:
        errorInfo.message = "No autorizado";
        break;
      case 403:
        errorInfo.message = "Prohibido";
        break;
      case 404:
        errorInfo.message = "Recurso no encontrado";
        break;
      case 500:
        errorInfo.message = "Error del servidor";
        break;
      default:
        errorInfo.message = `Error ${statusCode}`;
    }

    console.error(`Error ${statusCode}:`, error.response.data);

    if (
      customHandlers[statusCode] &&
      typeof customHandlers[statusCode] === "function"
    ) {
      customHandlers[statusCode](errorInfo);
    } else if (defaultHandler && typeof defaultHandler === "function") {
      defaultHandler(errorInfo);
    }
  } else if (error.request) {
    errorInfo.message = "Error de conexión";
    console.error("Error de red:", error.request);

    if (
      customHandlers.network &&
      typeof customHandlers.network === "function"
    ) {
      customHandlers.network(errorInfo);
    } else if (defaultHandler && typeof defaultHandler === "function") {
      defaultHandler(errorInfo);
    }
  } else {
    errorInfo.message = error.message;
    console.error("Error:", error.message);

    if (defaultHandler && typeof defaultHandler === "function") {
      defaultHandler(errorInfo);
    }
  }

  if (setErrorState && typeof setErrorState === "function") {
    setErrorState(errorInfo);
  }

  return errorInfo;
};

export default handleHttpError;
