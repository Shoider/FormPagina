"use client";

import {
  AppBar,
  Box,
  Typography,
} from "@mui/material";
import Grid2 from '@mui/material/Grid2';
import Image from "next/image"; 
import { theme } from "../styles/global-theme";

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
          <Grid2 xs={12} md={6}>
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
        }}
      >
      </Box>

    </AppBar>
  );
}