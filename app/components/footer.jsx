"use client";

import { Box, Container, IconButton, Typography, Grid, Link } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { theme } from "../styles/global-theme";
import Image from "next/image";

export default function FooterGlobal() {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "auto",
        backgroundColor: theme.palette.secondary.main,
        padding: "2.5rem 0",
        position: "relative",
      }}
    >
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} color="white">
              Página de desarrollo. <br/>
            </Typography>
            <Typography variant="h6" fontWeight={600} color="white">
              Reportar errores o sugerencias.
            </Typography>
            <Typography variant="body2"  color="white" sx={{ mt: 1 }}>
              Contacto: req.seguridad17@conagua.gob.mx 
            </Typography>
            
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={700} color="white">
              Enlaces
            </Typography>
            <Link href="https://red.conagua.gob.mx//" underline= "none">
              <Typography
                variant="body2"
                color="white"
                sx={{ cursor: "pointer", textDecoration: "none" }}
              >
                Red Conagua
              </Typography>
            </Link>
            <Link href="https://red.conagua.gob.mx/GTIC/Manuales/" underline= "none">
              <Typography
                variant="body2"
                color="white"
                sx={{ cursor: "pointer", textDecoration: "none" }}
              >
                Manuales y Formatos
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={700} mr={-6}color="white">
              ¿Qué es gob.mx?
            </Typography>            
            <Typography variant="body2" color="white">Es el portal único de trámites, información y particicipación ciudadana.</Typography>
            <Link href="https://www.gob.mx/que-es-gobmx/" underline= "none">
              <Typography
                variant="body2"
                color="white"
                sx={{ cursor: "pointer", textDecoration: "none" }}
              >
                Leer más.
              </Typography>
            </Link>
            <Link href="https://www.gob.mx/terminos/" underline= "none">
              <Typography
                variant="body2"
                color="white"
                sx={{ cursor: "pointer", textDecoration: "none" }}
              >
                Términos y Condiciones
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3} textAlign={{ xs: "center", md: "right" }}>
            <Typography variant="h5" fontWeight={600} color="white">
              Síguenos en
            </Typography>
            <Box mt={2} display="flex" justifyContent={{ xs: "center", md: "flex-end" }} gap={1}>
              <IconButton sx={{ color: "white", "&:hover": { color: "#000000" } }} href="https://twitter.com/GobiernoMX">
                <XIcon />
              </IconButton>
              <IconButton sx={{ color: "white", "&:hover": { color: "#E1306C" } }} href="https://www.instagram.com/gobmexico/">
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "white", "&:hover": { color: "#4267B2" } }} href="https://www.facebook.com/gobmexico">
                <FacebookIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Typography
        variant="subtitle2"
        fontWeight={500}
        color="white"
        textAlign={{ xs: "center", sm: "center" }}
        sx={{ mt:-5, mb: 3}}
      >
        © 2025 Subgerencia de Soporte Técnico, Telecomunicaciones y Seguridad (SSTTS) v1.0.5
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "50px", // Ajusta la altura según tus necesidades
          backgroundImage: 'url("/pleca.svg")',
          backgroundRepeat: "repeat-x",
          position: "absolute",
          bottom: 0,
        }}
      />
    </Box>
  );
}