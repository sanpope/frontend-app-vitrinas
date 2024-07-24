const tableStyles = {
  components: {
    Table: {
      variants: {
        custom: {
          th: {
            fontSize: "14px", // Tamaño de fuente para el encabezado
            bg: "red",
            color: "white",
            textTransform: "capitalize",
          },
          td: {
            fontSize: "10px", // Tamaño de fuente para las celdas
            bg: "gray.700",
            color: "white",
          },
        },
      },
    },
  },
};

export default tableStyles;
