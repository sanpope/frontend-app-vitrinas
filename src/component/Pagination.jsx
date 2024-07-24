import React from "react";
import { Box, Text } from "@chakra-ui/react";
import LeftArrowICon from "../assets/images/LeftArrowIcon";
import BiggerThanIcon from "../assets/images/BiggerThanIcon";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const siblingCount = 1; // Número de páginas a mostrar a los lados de la página actual
    const totalPageNumbers = siblingCount * 2 + 5; // Número total de páginas a mostrar (ajustable)

    if (totalPages <= totalPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages,
      );

      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages - 2;

      const firstPageIndex = 1;
      const lastPageIndex = totalPages;

      if (!showLeftDots && showRightDots) {
        for (let i = 1; i < 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (showLeftDots && !showRightDots) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else if (showLeftDots && showRightDots) {
        pages.push(1);
        pages.push("...");
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = React.useMemo(getPageNumbers, [currentPage, totalPages]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"1rem"}
    >
      <LeftArrowICon
        onClick={currentPage === 1 ? null : () => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {pages.map((page, index) => (
        <Text
          key={index}
          onClick={() => {
            if (page === "...") {
              if (index === 1) {
                // Al hacer clic en los puntos a la izquierda, ir a la página anterior
                onPageChange(currentPage - 1);
              } else {
                // Al hacer clic en los puntos a la derecha, ir a la página siguiente
                onPageChange(currentPage + 1);
              }
            } else {
              onPageChange(page);
            }
          }}
          disabled={page === "..."}
          backgroundColor={"transparent"}
          color={page === currentPage ? "red" : "black"}
          borderWidth={page === currentPage ? "1px" : "0px"}
          borderColor={page === currentPage ? "red" : "transparent"}
          py={"3px"}
          px={"10px"}
          cursor={page === "..." ? "default" : "pointer"}
          _hover={{ bg: "transparent" }}
        >
          {page}
        </Text>
      ))}

      <BiggerThanIcon
        onClick={
          currentPage === totalPages
            ? null
            : () => onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      />
    </Box>
  );
};

export default Pagination;
