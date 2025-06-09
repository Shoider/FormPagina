"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5393ff", //Azul
    },
    secondary: {
      main: "#611232", //Magenta
    },
    third: {
      main: "#a57f2c", //Dorado
    },
    forty: {
      main: "#98989A", //Gris Claro
    },
    lighter: {
      main: "#C5DBEB",
    },
    cards: {
      main: "#0E4AFA",
    },
    footer: {
      main: "#000000",
    },
    text: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Noto Sans",
  },
});
