"use client";

import { Box, Container, IconButton, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
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
                <Typography
                component={Link}
                color="inherit"
                href="/about"
                variant="body2"
                sx={{ 
                  mb: {
                    xs: 1,
                    sm: 3
                  }, 
                  textDecoration: "none", 
                  display: "block", 
                  '&:hover': { color: '#FF1B6B' }
                }}>
                  
                </Typography>
                <Typography
                component={Link}
                color="inherit"
                href="/contact"
                variant="body2"
                sx={{ 
                  mb: {
                    xs: 1,
                    sm: 3
                  }, 
                  textDecoration: "none", 
                  display: "block", 
                  '&:hover': { color: '#FF1B6B' }
                }}>
                  
                </Typography>
                <Typography
                component={Link}
                color="inherit"
                href="/work"
                variant="body2"
                sx={{ 
                  mb: {
                    xs: 1,
                    sm: 3
                  }, 
                  textDecoration: "none", 
                  display: "block", 
                  '&:hover': { color: '#FF1B6B' }
                }}>
                  
                </Typography>
              </Grid>

              <Grid size={{xs: 12, sm: 4}}
                sx={{
                  textAlign: {
                    xs: 'center',
                    sm: 'left'
                  }
                }}
              >
                <Typography variant="h6" fontWeight={700} 
                  sx={{ 
                    mb: {
                      xs: 1,
                      sm: 2
                    },
                  }}
                >
                  
                </Typography>
                <Typography
                component={Link}
                color="inherit"
                href="/services"
                variant="body2"
                sx={{ 
                  mb: {
                    xs: 1,
                    sm: 3
                  }, 
                  textDecoration: "none", 
                  display: "block", 
                  '&:hover': { color: '#FF1B6B' }
                }}>
                  
                </Typography>
                <Typography
                component={Link}
                color="inherit"
                href="/pricing"
                variant="body2"
                sx={{ 
                  mb: {
                    xs: 1,
                    sm: 3
                  }, 
                  textDecoration: "none", 
                  display: "block", 
                  '&:hover': { color: '#FF1B6B' }
                }}>
                  
                </Typography>
                <Typography
                component={Link}
                color="inherit"
                href="faq"
                variant="body2"
                sx={{ 
                  mb: {
                    xs: 1,
                    sm: 3
                  }, 
                  textDecoration: "none", 
                  display: "block", 
                  '&:hover': { color: '#FF1B6B' }
                }}>
                  
                </Typography>
              </Grid>

              <Grid size={{xs: 12, sm: 4}}
                sx={{
                  textAlign: {
                    xs: 'center',
                    sm: 'left'
                  }
                }}
              >
                <Typography variant="h6" fontWeight={700}
                  sx={{ 
                    mb: {
                      xs: 1,
                      sm: 2
                    }
                  }}
                >
                  
                </Typography>
                <Typography
                component={Link}
                color="inherit"
                href="/terms"
                variant="body2"
                sx={{ 
                  mb: {
                    xs: 1,
                    sm: 3
                  }, 
                  textDecoration: "none", 
                  display: "block", 
                  '&:hover': { color: '#FF1B6B' }
                }}>
                  
                </Typography>
                <Typography
                component={Link}
                color="inherit"
                href="/cookie"
                variant="body2"
                sx={{ 
                  mb: {
                    xs: 1,
                    sm: 3
                  }, 
                  textDecoration: "none", 
                  display: "block", 
                  '&:hover': { color: '#FF1B6B' }
                }}>
                  
                </Typography>
                <Typography
                component={Link}
                color="inherit"
                href="/privacy"
                variant="body2"
                sx={{ mb: 3, textDecoration: "none", display: "block", '&:hover': { color: '#FF1B6B' }}}>
                  
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
                  letterSpacing: ".4rem",
                  color: "white",
                  textDecoration: "none"
                }}
              >
                Follow Us
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
                    "&:hover": {
                      color: "#1DA1F2" // Twitter blue
                    }
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  sx={{
                    p: 0,
                    mr: 2,
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