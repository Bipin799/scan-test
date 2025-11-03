"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Layout from "../../../component/Layout";
import { Box, Typography, Modal, Slide, Paper, Grid, Card, CardActionArea, Button } from "@mui/material";
import Layout from "@/app/component/Layout";

export default function RegisterAbha() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpen(true); // auto open modal
  }, []);

  const goToMobile = () => router.push("/abha/register/mobile");

  return (
    <Layout>
      <Modal open={open} onClose={() => router.push("/abha")}>
        <Slide direction="up" in={open}>
          <Paper
            sx={{
              width: "100%",
              maxWidth: 420,
              p: 3,
              position: "fixed",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "15px 15px 0 0",
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Select method to Register ABHA
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardActionArea onClick={goToMobile}>
                    <Box p={2} textAlign="center">Mobile</Box>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardActionArea>
                    <Box p={2} textAlign="center">ABHA Address</Box>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardActionArea>
                    <Box p={2} textAlign="center">ABHA Number</Box>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>

            <Button fullWidth sx={{ mt: 2 }} onClick={() => router.push("/abha")}>
              Cancel
            </Button>
          </Paper>
        </Slide>
      </Modal>
    </Layout>
  );
}
