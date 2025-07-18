"use client";

import { Box, SpeedDial, SpeedDialAction, styled  } from "@mui/material";
//import HomeFilledIcon from '@mui/icons-material/HomeFilled'; NO FUNCIONO
import CurrentLocation from "./currentLocation";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ReorderIcon from '@mui/icons-material/Reorder';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

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
    onClick: () => window.open("https://www.gob.mx/", "_blank"), 
    color: "secondary" },
  { icon: <SearchSharpIcon htmlColor="#FFFFFF" />, 
    name: 'Búsqueda',
    onClick: () => window.open("https://www.gob.mx/", "_blank"),
    color: "secondary" },
];

export default function SpeedDialMenu() {
  return (
    <StyledSpeedDial
      ariaLabel="Opciones de búsqueda"
      icon={<ReorderIcon />}
      direction={"down"}
      sx={{
        position: "static",
        '& .MuiFab-root': {
          backgroundColor: 'dial.secondary',
          '&:hover': {
            backgroundColor: 'dial.main',
          }
        }
      }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </StyledSpeedDial>
  );
}
