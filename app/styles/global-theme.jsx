"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5393ff",
    },
    secondary: {
      main: "#611232",  //9F2241
    },
    third: {
      main: "#a57f2c",  //BC955C
    },
    forty: {
      main: "#98989A",
    },
    lighter: {
      main: "#C5DBEB",
    },
    cards: {
      main: "#0E4AFA",
    },
    footer: {
      main: "#000",
    },
    text: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Noto Sans, sans-serif",
  },
});
