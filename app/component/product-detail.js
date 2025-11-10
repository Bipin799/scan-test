"use client";

import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Productdetail() {

  const data = {
    product_img:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    product_name: "Glucose Strip 50",
    product_title: "Blood Sugar Monitor Strip",
    product_description:
      "This glucose test strip helps measure blood sugar levels accurately and quickly. Suitable for both home and clinical use.",
    price: "₹70",
    minQuantity: "30",
  };

  return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        >
          <Card
            sx={{
              overflow: "hidden",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderRadius: "24px",
              boxShadow: "none",
              background:
                "linear-gradient(to bottom right, #ffffff 0%, #f8f9fa 100%)",
              animation: "fadeIn 0.6s ease",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(10px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {/* Product Image Section */}
            <Box
              sx={{
                width: { xs: "100%", md: "45%" },
                position: "relative",
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              }}
            >
              <CardMedia
                component="img"
                image={data.product_img}
                alt={data.product_name}
                sx={{
                  width: "100%",
                  height: { xs: 220, md: "100%" },
                  objectFit: "cover",
                }}
              />

            </Box>

            {/* Vertical Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
                borderColor: "rgba(25,118,210,0.1)",
                width: "2px",
              }}
            />

            {/* Product Details Section */}
            <CardContent
              sx={{
                flex: 1,
                p: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Product Category Tag */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{ mb: 1 }}
              >
                {/* <Chip
                  icon={<LocalOfferIcon sx={{ fontSize: 14 }} />}
                  label="Medical Supply"
                  size="small"
                  sx={{
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "#bbdefb",
                    },
                  }}
                /> */}
              </Stack>

              {/* Product Name and Title */}
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {data.product_name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                {data.product_title}
              </Typography>

          
              {/* Product Description */}
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  lineHeight: 1.6,
                  color: "text.secondary",
                  maxWidth: "95%",
                }}
              >
                {data.product_description}
              </Typography>

              {/* Price and Quantity */}
              <Grid container spacing={2} columns={16}
              gap={15}
              sx={{mb:2, ml:3}}
              >

                <Grid size={8} sx={{width:"35%"}}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      boxShadow:
                              "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        opacity: 0.9,
                      }}
                    >
                      Price
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800, mt: 0.5 ,color: "primary.main"}}
                    >
                      {data.price}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={8} sx={{width:"35%"}}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      boxShadow:
                              "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      Minimum Quantity
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "primary.main",
                        mt: 0.5,
                      }}
                    >
                      {data.minQuantity}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Add to Cart Button */}
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                size="large"
                sx={{
                  borderRadius: "40px",
                  width: "100%",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                Add to Cart
              </Button>

             
            </CardContent>
          </Card>
        </Paper>
      </Box>
  );
}
