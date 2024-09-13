import { Box, keyframes } from "@chakra-ui/react";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LdsDualRing = () => {
  return (
    <Box
      display="inline-block"
      width="80px"
      height="80px"
      position="relative"
      _after={{
        content: '""',
        display: "block",
        width: "64px",
        height: "64px",
        margin: "8px",
        borderRadius: "50%",
        border: "6.4px solid",
        borderColor: "#1c4c5b transparent #1c4c5b transparent",
        animation: `${spin} 1.2s linear infinite`,
      }}
    />
  );
};

export default LdsDualRing;
