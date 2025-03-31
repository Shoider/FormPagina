"use client";

import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  Link,
} from "@mui/material";
import Grid2 from '@mui/material/Grid2';
import Image from "next/image"; 
import { theme } from "../styles/global-theme";
import HomeIcon from '@mui/icons-material/Home';
//import HomeFilledIcon from '@mui/icons-material/HomeFilled'; NO FUNCIONO
import CurrentLocation from "./currentLocation";

export default function AppbarGlobal() {

  return (
    <AppBar position="sticky" sx={{ mb: 0 }}>
      {/* Franja Magenta */}
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          padding: '8px 16px',
          textAlign: 'left',
        }}
      >
        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box sx={{ justifyContent: "flex-start", display: "flex" }}>
              <Image
                src="/Mexico Oficial.png"
                alt="Logo Gobierno de México"
                width={270 * 0.75}
                height={90 * 0.75}
                priority
              />
            </Box>
          </Grid2>
        </Grid2>

      </Box>

      {/* Franja Dorada */}
      <Box
        sx={{
          backgroundColor: theme.palette.third.main,
          padding: '8px 16px',
          textAlign: 'left',
          [theme.breakpoints.up('md')]: { // Media query para pantallas medianas y grandes
            padding: '1px 8px', // Estilos para pantallas medianas y grandes
          },
          [theme.breakpoints.down('md')]: { // Media query para pantallas medianas y grandes
            padding: '1px 8px', // Estilos para pantallas medianas y grandes
          },
        }}
      >
        {/* Se oculta en pantallas pequeñas */}
        {/* <Toolbar sx={{display: { xs: "none", md: "flex" },}}> */}
        <Toolbar sx={{display: "flex"}}>
          <Box noWrap component={Link} href="/" >
            <HomeIcon 
              sx={{ 
                mr: 2,
                ml: 0.5, 
                color: "white",
                fontSize: 30, // O 'x-large' o 36 (pixeles)
              }}
            />
          </Box>
          <CurrentLocation />
        </Toolbar>
      </Box>

    </AppBar>
  );
}