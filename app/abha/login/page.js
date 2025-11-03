"use client";
import Layout from "@/app/component/Layout";
import { Box, Typography } from "@mui/material";

export default function LoginPage() {
  return (
  <Layout>
      <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold">Login to ABHA</Typography>
      <Typography mt={2}>This is the ABHA login page.</Typography>
      {/* You will add login form later */}
    </Box>
  </Layout>
  );
}
