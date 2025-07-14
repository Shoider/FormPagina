"use client";

import { Box, Container, IconButton, Typography, Grid } from "@mui/material";
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              fontWeight={700}
              color="white"
              textAlign={{ xs: "center", sm: "left" }}
            >
              En Desarrollo.
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              color="white"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Reportar errores o sugerencias.
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              color="white"
              textAlign={{ xs: "center", sm: "left" }}
              sx={{ mt: 2 }}
            >
              Contacto: req.seguridad17@conagua.gob.mx
            </Typography>
            <Typography
              variant="button"
              fontWeight={700}
              color="white"
              textAlign={{ xs: "center", sm: "left" }}
              sx={{ mt: 20 }}
            >
              v0.7.0.11 (Beta)
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} textAlign={{ xs: "center", sm: "right" }}>
            <Typography variant="h5" fontWeight={600} color="white">
              Síguenos en
            </Typography>
            <Box
              mt={2}
              display="flex"
              justifyContent="right"
              alignItems="center"
              gap={1}
            >
              <IconButton
                sx={{ color: "white", "&:hover": { color: "#000000" } }}
                href="https://twitter.com/GobiernoMX"
              >
                <XIcon />
              </IconButton>

              <IconButton
                sx={{ color: "white", "&:hover": { color: "#E1306C" } }}
                href="https://www.instagram.com/gobmexico/"
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                sx={{ color: "white", "&:hover": { color: "#4267B2" } }}
                href="https://www.facebook.com/gobmexico"
              >
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
        © 2025 Subgerencia de Soporte Técnico, Telecomunicaciones y Seguridad (SSTTyS)
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
