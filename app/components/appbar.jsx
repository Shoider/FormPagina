"use client";

import { AppBar, Box, Typography, Toolbar, Link, IconButton, SpeedDial, SpeedDialAction, styled  } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Image from "next/image";
import { theme } from "../styles/global-theme";
import HomeIcon from "@mui/icons-material/Home";
//import HomeFilledIcon from '@mui/icons-material/HomeFilled'; NO FUNCIONO
import CurrentLocation from "./currentLocation";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ReorderIcon from '@mui/icons-material/Reorder';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SpeedDialMenu from "./speedDial";
import SpeedDialMenu2 from "./speedDial2";
import AssignmentIcon from '@mui/icons-material/Assignment';


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

//Constantes para el botón flotante de pantallas pequeñas
const actions = [
  { icon: <ContentPasteIcon htmlColor="#FFFFFF" />, 
    name: 'Trámites',
    onClick: () => window.open("https://www.gob.mx/", "_blank"),
    color: "secondary", color: "secondary" },
  { icon: <AccountBalanceIcon htmlColor="#FFFFFF" />,
    name: 'Gobierno',
    onClick: () => window.open("https://www.gob.mx/gobierno", "_blank"), 
    color: "secondary" },
  { icon: <SearchSharpIcon htmlColor="#FFFFFF" />, 
    name: 'Búsqueda',
    onClick: () => window.open("https://www.gob.mx/", "_blank"),
    color: "secondary" },
];

export default function AppbarGlobal() {
  return (
    <AppBar position="sticky" sx={{ mb: 0 }}>
      <Box
        sx={{
          position: "relative", // Necesario para el posicionamiento absoluto del SpeedDialMenu
          backgroundColor: theme.palette.secondary.main,
          padding: "8px 16px",
          textAlign: "left",
        }}
      >
        
        {/* SpeedDialMenu solo en xs */}
        <Box sx={{ display: { xs: "flex", md: "none" }, position: "absolute", top: 10, right: 10, zIndex: 4000 }}>
          <SpeedDialMenu />
        </Box>

        <Grid2 container spacing={2}>
          <Grid2           
          size={{ xs: "none", md: "flex" }}
          >            
            <Box sx={{ justifyContent: "flex-start", display: "flex" }}>
              <Image
                src="/Mexico Oficial.png"
                alt="Logo Gobierno de México"
                width={270 * 0.70}
                height={90 * 0.70}
                priority
              />
            </Box>
          </Grid2>

          {/**Texto para pantallas grandes */}
          <Grid2 
          offset={{  md: "auto"}}>
            <Box sx={{ justifyContent: "right",mt:2, display:{md: "flex",xs:"none"} }}>
              <Link href="https://www.gob.mx/" underline= "none">
                <Typography
                  variant="h6" fontWeight={500}
                  color="white"
                  mr={3}
                  sx={{ cursor: "pointer", textDecoration: "none" }}
                >
                  Trámites
                </Typography>
              </Link>
              <Link href="https://www.gob.mx/" underline= "none">
                <Typography
                  variant="h6" fontWeight={500}
                  color="white"  
                  mr={3} 
                  sx={{ cursor: "pointer", textDecoration: "none" }}
                >
                  Gobierno
                </Typography>
              </Link>
              <IconButton 
              sx={{ mt:-0.5 ,color: "white", "&:hover": { color: "#000000" } }} href="https://www.gob.mx/">
                  <SearchSharpIcon />
              </IconButton>
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      {/* Franja Dorada */}
      <Box
        sx={{
          backgroundColor: theme.palette.third.main,
          padding: "8px 16px",
          textAlign: "left",
          [theme.breakpoints.up("md")]: {
            // Media query para pantallas medianas y grandes
            padding: "1px 8px", // Estilos para pantallas medianas y grandes
          },
          [theme.breakpoints.down("md")]: {
            // Media query para pantallas medianas y grandes
            padding: "1px 8px", // Estilos para pantallas medianas y grandes
          },
        }}
      >
        {/* Se oculta en pantallas pequeñas */}
        {/* <Toolbar sx={{display: { xs: "none", md: "flex" },}}> */}
        <Toolbar sx={{ display: "flex" }}>
          <Box 
          sx={{display: { xs: "none", md: "flex" }}}
          noWrap component={Link} href="/">
            <HomeIcon
              sx={{
                mr: 2,
                ml: 0.5,
                mt: 0.3,
                color: "white",
                fontSize: 36, // O 'x-large' o 36 (pixeles)
              }}
            />
          </Box>   
          <Box
          sx={{
            display: { xs: "flex", md: "flex" },
            ml: { xs: 5, md: 0 } // Aplica margen izquierdo solo en xs
          }}
          >
            <CurrentLocation />
          </Box>      
          
          {/* SpeedDialMenu solo en xs */}
        <Box sx={{ display: { xs: "flex", md: "none" }, position: "absolute", mr:12,top: 5, right: 500, left:0, zIndex: 4000 }}>
          <SpeedDialMenu2 />
        </Box>
        {/**Texto para pantallas grandes en franja dorada */}
        <Grid2 
          offset={{  md: "auto"}}>
            <Box sx={{ justifyContent: "right", display:{md: "flex",xs:"none"} }}>
              <Link href="https://red.conagua.gob.mx/" underline= "none">
                <Typography
                  variant="button" fontWeight={400}
                  color="white"
                  mr={3}
                  sx={{ cursor: "pointer", textDecoration: "none" }}
                >
                  Red CONAGUA
                </Typography>
              </Link>
              <Link href="https://red.conagua.gob.mx/GTIC/Manuales/" underline= "none">
                <Typography
                  variant="button" fontWeight={100}
                  color="white"  
                  mr={3} 
                  sx={{ cursor: "pointer", textDecoration: "none" }}
                >
                  Manuales y Formatos
                </Typography>
              </Link>
            </Box>
          </Grid2>
          
        </Toolbar>
        <Grid2>
        </Grid2>
        
        
      </Box>
    </AppBar>
  );
}
