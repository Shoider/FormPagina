"use client";

import { Box, Container, IconButton, Typography } from "@mui/material";
import XIcon from '@mui/icons-material/X';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Grid from "@mui/material/Grid2";
import { theme } from "../styles/global-theme";

export default function FooterGlobal() {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: 'auto',
        backgroundColor: theme.palette.secondary.main,
        padding: '2.5rem 0'
      }}
    >
      <Container maxWidth="lg">

        <Grid container>

          <Grid size={{xs: 12, sm: 6}}>

            <Grid container spacing={{xs: 1, sm: 4}}>
              <Grid size={{xs: 12, sm: 4}}
                sx={{
                  textAlign: {
                    xs: 'center',
                    sm: 'left'
                  },
                }}
              >
                <Typography variant="h6" fontWeight={700}
                  sx={{ 
                    mb: {
                      xs: 1,
                      sm: 2
                    },
                    color: "white"
                  }}>
                  Contacto:
                  soporte@formulario.com
                </Typography>
                
              </Grid>
            </Grid>
          </Grid>


          <Grid
            size={{xs: 12, sm: 6}}
            sx={{
              display: {
                xs: "flex",
                sm: "block"
              },
              flexDirection: "column",
              alignItems: {
                xs: "center",
                sm: "end"
              },
              justifyContent: "center"
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: {
                  xs: "center",
                  sm: "end"
                },
                textAlign: "center",
                mr: {
                  xs: 0,
                  sm: 4
                },
                mt: 2
              }}
            >
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontWeight: 600,
                  letterSpacing: ".1rem",
                  color: "white",
                  textDecoration: "none"
                }}
              >
                Síguenos en
              </Typography>
              <Box 
                sx={{ 
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <IconButton
                  sx={{
                    p: 0,
                    mr: 2,
                    color: "white",
                    "&:hover": {
                      color: "#1DA1F2" // Twitter blue
                    }
                  }}
                >
                  <XIcon />
                </IconButton>
                <IconButton
                  sx={{
                    p: 0,
                    mr: 2,
                    color: "white",
                    "&:hover": {
                      color: "#E1306C" // Instagram pink
                    }
                  }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  sx={{
                    p: 0,
                    color: "white",
                    "&:hover": {
                      color: "#4267B2" // Facebook blue
                    }
                  }}
                >
                  <FacebookIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}