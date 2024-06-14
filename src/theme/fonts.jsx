import React from "react";
import { Global } from "@emotion/react";

export const font = {
  heading: "Roboto",
  body: "Roboto"
};

export const Fonts = () => (
  <Global
    styles={`
            @font-face {
                font-family: 'Roboto';
                src: url('/fonts/Roboto/Roboto-Regular.ttf') format('truetype');
            }           
        `}
  />
);

export default font;
