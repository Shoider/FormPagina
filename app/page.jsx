"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  Popover,  
  Grow ,
  Paper ,
  Popper ,
  MenuItem ,
  MenuList ,
} from "@mui/material";
import Image from "next/image";

import ClickAwayListener from '@mui/material/ClickAwayListener';


export default function Home() {
  //POPOVERS
  const theme = useTheme();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handlePopoverOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };
  const open2 = Boolean(anchorEl2);

  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const handlePopoverOpen3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handlePopoverClose3 = () => {
    setAnchorEl3(null);
  };
  const open3 = Boolean(anchorEl3);

  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const handlePopoverOpen4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handlePopoverClose4 = () => {
    setAnchorEl4(null);
  };
  const open4 = Boolean(anchorEl4);

  //Constantes de SSTTS
  const options = [
    {name: 'Solicitud de cambios en cortafuegos (SdC)',
      href:"/rfc",
      onMouseEnter:handlePopoverOpen,
      onMouseLeave:handlePopoverClose},
    {name: 'Solicitud de acceso remoto a través de una red virtual (VPN)',
      href:"/vpn",
      onMouseEnter:handlePopoverOpen2,
      onMouseLeave:handlePopoverClose2},
    {name: 'Solicitud de servicios de telefonía',
      href:"/telefonia",
      onMouseEnter:handlePopoverOpen3,
      onMouseLeave:handlePopoverClose3},
    {name: 'Solicitud de ampliación del servicio de internet',
      href:"/internet",
      onMouseEnter:handlePopoverOpen4,
      onMouseLeave:handlePopoverClose4},
  ];
  //Constantes de SII
  const options2 = [
    {name: 'Solicitud de movimientos de la persona usuaria del red (Altas, bajas y cambios)',
      href:"/abc_red",},
    {name: 'Solicitud de registros DNS internos',
      href:"/dns",},    
  ];
  
  //Constantes para el menú desplegable de SSTTS
  const [open11, setOpen11] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleMenuItemClick = (event, index, href) => {
    setSelectedIndex(index);
    setOpen11(false);
    if (href) router.push(href);
  };

  const handleToggle = () => {
    setOpen11((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen11(false);
  }; 

  //Constantes para el menú desplegable de SII
  const [open12, setOpen12] = React.useState(false);
  const anchorRef2 = React.useRef(null);

  const handleMenuItemClick2 = (event, index, href) => {
    setSelectedIndex(index);
    setOpen12(false);
    if (href) router.push(href);
  };

  const handleToggle2 = () => {
    setOpen12((prevOpen) => !prevOpen);
  };

  const handleClose2 = (event) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
      return;
    }

    setOpen12(false);
  };

  return (
    
    <Container disableGutters maxWidth="xxl" sx={{ background: "#FFFFFF" }}>
      {/* Banner Responsive */}
      <Box
        sx={{
          width: "100", // Ocupa todo el ancho de la ventana gráfica
          overflow: "hidden",
          height: "240px", // Ajusta la altura según sea necesario
          [theme.breakpoints.down("md")]: {
            height: "auto", // Ajusta la altura automáticamente en pantallas pequeñas
          },
          display: { xs: "none", md: "block" },
        }}
      >
        <Image
          src="/background_Conagua_header_150.jpg" // Ruta de la imagen recortable
          alt="Imagen recortable"
          width={6000}
          height={1200}
          style={{
            maxWidth: "100vw",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          sizes="(max-width: 900px) 100vw, 1920px"
        />
      </Box>            
      {/* Imagen fija para pantallas pequeñas */}
      <Box
        sx={{
          display: { xs: "block", md: "none" }, // Mostrar solo en pantallas pequeñas
        }}
      >
        <Image
          src="/mobile_background_Icono_150.jpg" // Ruta de la imagen fija
          alt="Imagen fija"
          width={1690}
          height={1312}
          style={{
            width: "100%",
            height: "auto",
          }}
          sizes="100vw"
        />
      </Box>
      {/**Imagen fondo */}
      <Box
        sx={{
          position:"relative",
          width: "100%",
          height:"100%",
          backgroundImage: "url('/fondo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
         //backgroundRepeat: "no-repeat"
          //display: { xs: "none", md: "block" }, // Mostrar solo en pantallas pequeñas
        }}
      >
      {/* Banner Responsive Title*/}
      <Box
        sx={{
          justifyContent: "center",
          mt: 0,
          //background: "#FFFFFF",
          width: "100%",
        }}
      >
        <Box sx={{ justifyContent: "center", display: "flex", ml: 3 }}>
          {/* Title */}
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Catálogo de solicitudes de servicios
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'column' },
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        mt: 2,
        mb: 3,
      }}>
        <Button
          variant="outlined"
          sx={{
            width: { xs: '100%', md: "75%", },
            height: 'auto',
            border: theme.palette.secondary.main,
            p: 2,
            textTransform: 'none',
            color: 'white',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.palette.secondary.main,
            boxSizing: 'border-box',
            padding: '0 8px',
            fontSize: theme.typography.h4.fontSize,
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease-in-out',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            },
          }}
          ref={anchorRef}
          onClick={handleToggle}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ mt: 1, ml: 1, mr: 1 }}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
          >
            Subgerencia de Soporte Técnico, Telecomunicaciones y Seguridad (SSTTS)
          </Typography>
        </Button>

        <Button
          variant="outlined"
          sx={{
            width: { xs: '100%', md: "75%", },
            height: 'auto',
            border: theme.palette.secondary.main,
            p: 2,
            textTransform: 'none',
            color: 'white',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.palette.secondary.main,
            boxSizing: 'border-box',
            padding: '0 8px',
            fontSize: theme.typography.h4.fontSize,
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease-in-out',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            },
          }}
          ref={anchorRef2}
          onClick={handleToggle2}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ mt: 1, ml: 1, mr: 1 }}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
          >
            Subgerencia de Internet e Intranet (SII)
          </Typography>
        </Button>
      </Box>

      <Popper
        sx={{ zIndex: 1300 }}
        open={open11}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom-start"
        modifiers={[
          { name: 'offset', options: { offset: [0, 8] } },
          { name: 'preventOverflow', options: { padding: 8 } },
        ]}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper
              sx={{
                minWidth: anchorRef.current ? anchorRef.current.clientWidth : 240,
                bgcolor: 'background.paper',
                boxShadow: 4,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList sx={{ 
                  background: theme.palette.secondary.main,
                  py: 1 
                  }}>
                  {options.map((action, index) => (
                    <MenuItem
                      key={action.name}
                      onClick={(event) => handleMenuItemClick(event, index, action.href)}
                      onMouseEnter={action.onMouseEnter}
                      onMouseLeave={action.onMouseLeave}
                      sx={{
                        mt: 1, ml: 1, mr: 1,
                        color: "white",
                        fontSize: theme.typography.h5.fontSize,
                        px: 2,
                        justifyContent: 'center',
                      }}
                    >
                      {action.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Popper
        sx={{ zIndex: 1300 }}
        open={open12}
        anchorEl={anchorRef2.current}
        role={undefined}
        transition
        placement="bottom-start"
        modifiers={[
          { name: 'offset', options: { offset: [0, 10] } },
          { name: 'preventOverflow', options: { padding: 10 } },
        ]}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper
              sx={{
                minWidth: anchorRef2.current ? anchorRef2.current.clientWidth : 240,
                bgcolor: 'background.paper',
                boxShadow: 4,
              }}
            >
              <ClickAwayListener onClickAway={handleClose2}>
                <MenuList sx={{ 
                  background: theme.palette.secondary.main,
                  py: 1 
                  }}>
                  {options2.map((action, index) => (
                    <MenuItem
                      key={action.name}
                      onClick={(event) => handleMenuItemClick2(event, index, action.href)}
                      // onMouseEnter={action.onMouseEnter}
                      // onMouseLeave={action.onMouseLeave}
                      sx={{
                        mt: 1, ml: 1, mr: 1,
                        color: "white",
                        fontSize: theme.typography.h5.fontSize,
                        px: 2,
                        justifyContent: 'center',
                      }}
                    >
                      {action.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      {/* RFC */}
      
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: "none",
                boxSizing: "border-box",
                padding: "0 8px",
                "@media (min-width: 960px)": {
                  maxWidth: "70.00%",
                  width: "auto",
                  margin: "2rem auto",
                  padding: "2",
                },
                fontSize: theme.typography.h4.fontSize,
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.3s ease-in-out",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                },
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{textAlign:"center",p:2}}>
            Se utiliza para solicitar la apertura de comunicaciones de red entre
            servidores, entre 
            sistemas de cómputo de usuarios y los sistemas (servidores)
            que utilizan o para 
            acceder algún servicio de Internet que
            requiera conexión por puertos 
            distintos 
            a TCP 80 y 443.
          </Typography>
        </Popover>
      
      {/* VPN  */}
      
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: "none",
                boxSizing: "border-box",
                padding: "0 8px",
                "@media (min-width: 960px)": {
                  maxWidth: "70.00%",
                  width: "auto",
                  margin: "2rem auto",
                  padding: "2",
                },
                fontSize: theme.typography.h4.fontSize,
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.3s ease-in-out",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                },
              }}
          open={open2}
          anchorEl={anchorEl2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handlePopoverClose2}
          disableRestoreFocus
        >
          <Typography sx={{ textAlign:"center",p:2 }}>
            Permite llenar la solicitud para alta, baja o cambio de los tipos de
            servicio de 
            conexión remota permitidos para una conexión de red privada virtual
            mejor 
            conocida como VPN.
          </Typography>
        </Popover>

      {/* TELEFONIA */}
      
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: "none",
                boxSizing: "border-box",
                padding: "0 8px",
                "@media (min-width: 960px)": {
                  maxWidth: "70.00%",
                  width: "auto",
                  margin: "2rem auto",
                  padding: "2",
                },
                fontSize: theme.typography.h4.fontSize,
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.3s ease-in-out",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                },
               }}
          open={open3}
          anchorEl={anchorEl3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handlePopoverClose3}
          disableRestoreFocus
        >
          <Typography sx={{ textAlign:"center",p:2 }}>
            Permite llenar la solicitud para alta, baja o cambio del servicio y configuración de
            telefonía 
          </Typography>
        </Popover>

      {/* INTERNET */}
      
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: "none",
                boxSizing: "border-box",
                padding: "0 8px",
                "@media (min-width: 960px)": {
                  maxWidth: "70.00%",
                  width: "auto",
                  margin: "2rem auto",
                  padding: "2",
                },
                fontSize: theme.typography.h4.fontSize,
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.3s ease-in-out",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                },
              }}
          open={open4}
          anchorEl={anchorEl4}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handlePopoverClose4}
          disableRestoreFocus
        >
          <Typography sx={{ textAlign:"center", p:2}}>
            Permite llenar la solicitud para cambio de perfil de internet, es decir,
            solicitar una ampliación del servicio de internet
          </Typography>
        </Popover>

      
      </Box>
    </Container>
    
  );
}
