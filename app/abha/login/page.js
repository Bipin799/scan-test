"use client";

import { useRouter } from "next/navigation";
import { Box, Grid, Card, CardActionArea, Button, Typography } from "@mui/material";
import Layout from "@/app/component/Layout";
import CustomCard from "@/app/component/CustomCard";

export default function LoginABHA() {
  const router = useRouter();

  const cards = [
    { label: "Mobile", link: "/abha/login/mobile" },
    { label: "ABHA Address", link: "/abha/login/abha-address" },
    { label: "ABHA number", link: "/abha/login/abha-number" }
  ];

  return (
    <Layout>
      <CustomCard title="Select method to login ABHA">
        <Box 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 },
            minHeight: { xs: "auto", sm: "400px" }
          }}
        >
          
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            alignItems="stretch"
            sx={{ 
              mt: { xs: 2, sm: 4, md: 6 },
              mb: { xs: 2, sm: 4, md: 6 }
            }}
          >
            {cards.map((item, index) => (
              <Grid 
                item 
                key={index}
                xs={12}    // Mobile: full width
                sm={6}     // Tablet: 2 per row
                md={4}     // Desktop: 3 per row
                display="flex"
                justifyContent="center"
              >
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: { xs: "100%", sm: 280, md: 320 },
                    height: { xs: 140, sm: 160, md: 180 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    background: "#fefefeff",
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "rgba(95, 157, 231, 0.6) 4px 2px 12px 0px inset, rgb(255, 255, 255) -4px -2px 12px 0px inset, 0 8px 24px rgba(0,0,0,0.12)"
                    },
                    "&:active": {
                      transform: "translateY(-2px)"
                    }
                  }}
                >
                  <CardActionArea
                    onClick={() => router.push(item.link)}
                    sx={{ 
                      width: "100%", 
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 2
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: 18, sm: 20, md: 22 },
                        fontWeight: { xs: 400, sm: 400, md: 300 },
                        textAlign: "center",
                        color: "#333",
                        letterSpacing: "0.5px"
                      }}
                    >
                      {item.label}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box 
            sx={{ 
              mt: { xs: 3, sm: 4 },
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Button
              onClick={() => router.push("/abha")}
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: 200 },
                py: { xs: 1.5, sm: 1.2 },
                px: { xs: 3, sm: 4 },
                fontSize: { xs: 14, sm: 15, md: 16 },
                fontWeight: 500,
                textTransform: "none",
                borderRadius: 2,
                borderColor: "rgba(95, 157, 231, 0.5)",
                color: "#5f9de7",
                "&:hover": {
                  borderColor: "#5f9de7",
                  backgroundColor: "rgba(95, 157, 231, 0.05)"
                }
              }}
            >
              Back
            </Button>
          </Box>

        </Box>
      </CustomCard>
    </Layout>
  );
}