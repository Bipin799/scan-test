
"use client";

import { useRouter } from "next/navigation";
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
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
          px: { xs: 2, sm: 4 },
          pt: { xs: 4, sm: 6 },
          pb: { xs: 10, sm: 6 },
          position: "relative",
        }}
      >
        {/* Logos */}
        <Grid
          container
          spacing={{ xs: 2, sm: 4 }}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: { xs: 3, sm: 5 } }}
        >
          <Grid item xs={6} sm={4} display="flex" justifyContent="center">
            <Box
              component="img"
              src="/age.svg"
              alt="Logo 1"
              sx={{ width: { xs: 100, sm: 150, md: 180 } }}
            />
          </Grid>
          <Grid item xs={6} sm={4} display="flex" justifyContent="center">
            <Box
              component="img"
              src="/address.svg"
              alt="Logo 2"
              sx={{ width: { xs: 100, sm: 150, md: 180 } }}
            />
          </Grid>
        </Grid>

        {/* Text */}
        <Box sx={{ textAlign: "center", maxWidth: 700 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "1.4rem", sm: "1.75rem" } }}
          >
            ABHA - Digital Health ID
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
          >
            Your secure digital health identity to store & manage medical records.
          </Typography>
        </Box>

        {/* Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            position: { xs: "static", sm: "absolute" },
            bottom: { sm: 30 },
            mt: { xs: 4, sm: 0 },
            width: { xs: "100%", sm: "auto" },
            px: { xs: 2, sm: 0 },
          }}
        >
          <Button
            variant="contained"
            fullWidth={{ xs: true, sm: false }}
            onClick={() => router.push("/abha/register")}
          >
            Register
          </Button>

          <Button
            variant="outlined"
            fullWidth={{ xs: true, sm: false }}
            onClick={() => router.push("/abha/login")}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}
