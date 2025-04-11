"use client";

import { Box, Container, IconButton, Typography, Grid } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { theme } from "../styles/global-theme";

export default function FooterGlobal() {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "auto",
        backgroundColor: theme.palette.secondary.main,
        padding: "2.5rem 0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              fontWeight={700}
              color="white"
              textAlign={{ xs: "center", sm: "left" }}
            >
              En Desarrollo... Reportar errores o sugerencias.
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              color="white"
              textAlign={{ xs: "center", sm: "left", mt: 10 }}
            >
              Contacto: req.seguridad17@conagua.gob.mx
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
              >
                <XIcon />
              </IconButton>

              <IconButton
                sx={{ color: "white", "&:hover": { color: "#E1306C" } }}
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                sx={{ color: "white", "&:hover": { color: "#4267B2" } }}
              >
                <FacebookIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
