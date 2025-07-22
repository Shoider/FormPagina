"use client";

import { Box, SpeedDial, SpeedDialAction, styled  } from "@mui/material";
//import HomeFilledIcon from '@mui/icons-material/HomeFilled'; NO FUNCIONO
import ReorderIcon from '@mui/icons-material/Reorder';
import WaterDamageOutlinedIcon from '@mui/icons-material/WaterDamageOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HomeIcon from "@mui/icons-material/Home";


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
  { icon: <HomeIcon htmlColor="#FFFFFF" />, 
    name: 'Menú',
    onClick: () => window.open("/", "_blank"),
    color: "secondary", color: "secondary" },
  { icon: <WaterDamageOutlinedIcon htmlColor="#FFFFFF" />, 
    name: 'Red CONAGUA',
    onClick: () => window.open("https://red.conagua.gob.mx/", "_blank"),
    color: "secondary", color: "secondary" },
  { icon: <AssignmentOutlinedIcon htmlColor="#FFFFFF" />, 
    name: 'Manuales y formatos',
    onClick: () => window.open("https://red.conagua.gob.mx/GTIC/Manuales/", "_blank"),
    color: "secondary", color: "secondary" },
  
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
          backgroundColor: 'third.main',
          '&:hover': {
            backgroundColor: 'third.main',
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
