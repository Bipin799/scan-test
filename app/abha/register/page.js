"use client";

import { useRouter } from "next/navigation";
import { Box, Grid, Card, CardActionArea, Button } from "@mui/material";
import Layout from "@/app/component/Layout";
import CustomCard from "@/app/component/CustomCard";

export default function RegisterAbha() {
  const router = useRouter();

  const cards = [
    { label: "Mobile", link: "/abha/register/mobile" },
    { label: "AADHAAR Number", link: "/abha/register/aadhaar-number" },
    { label: "ABHA number", link: "/abha/register/abha-number" }

  ];

  return (
    <Layout>
      <CustomCard title="Select method to Register ABHA">
        <Box sx={{ p: 3 }}>
          
          <Grid 
            container 
            spacing={4} 
            justifyContent="center"
            sx={{ mt: 8, mb: 8 }}
          >

            {cards.map((item, index) => (
              <Grid 
                item 
                key={index}
                xs={12}    // Mobile: 1 per row
                sm={6}     // Tablet: 2 per row
                md={4}     // Desktop: 3 per row
                display="flex"
                justifyContent="center"
              >
                <Card
                  sx={{
                    width: { xs: "90%", sm: 280, md: 300 }, // Responsive width
                    height: { xs: 160, sm: 180, md: 200 },  // Responsive height
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    background: "#fefefeff",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
                    }
                  }}
                >
                  <CardActionArea
                    onClick={() => router.push(item.link)}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <Box textAlign="center" sx={{ fontSize: 20, fontWeight: 300 }}>
                      {item.label}
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}

          </Grid>

          <Button
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => router.push("/abha")}
            variant="outlined"
          >
            Back
          </Button>

        </Box>
      </CustomCard>
    </Layout>
  );
}
