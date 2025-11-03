"use client";

import { useRouter } from "next/navigation";
// import Layout from "../../component/Layout";
import { Box, Grid, Typography, Button } from "@mui/material";
import Layout from "../component/Layout";

export default function Abha() {
  const router = useRouter();

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          position: "relative",
        }}
      >
        {/* Logo Section */}
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} display="flex" justifyContent="center">
            <Box component="img" src="/age.svg" alt="Logo 1" sx={{ width: 150 }} />
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent="center">
            <Box component="img" src="/address.svg" alt="Logo 2" sx={{ width: 150 }} />
          </Grid>
        </Grid>

        {/* Description */}
        <Box sx={{ textAlign: "center", maxWidth: 700 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ABHA - Digital Health ID
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your secure digital health identity to store & manage medical records.
          </Typography>
        </Box>

        {/* Bottom Buttons */}
        <Box
          sx={{
            position: "absolute",
            bottom: 30,
            display: "flex",
            gap: 2,
          }}
        >
          <Button variant="contained" onClick={() => router.push("/abha/register")}>
            Register
          </Button>

          <Button variant="outlined" onClick={() => router.push("/abha/login")}>
            Login
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
