"use client";


import { Box, Grid, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";

export default function Productdetail() {
  const data = {
    product_img: "/address.svg",
    product_name: "Glucose 50",
    product_title: "Blood Sugar Monitor Strip",
    product_description: "This glucose test strip helps measure blood sugar levels accurately and quickly. Suitable for both home and clinical use.",
    price: "₹70",
    minQuantity: "30",
  };

  return (
      <Box sx={{  p: 3 }}>
        <Card
        sx={{
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Product Image */}
          <CardMedia
            component="img"
            image={data.product_img}
            alt={data.product_name}
            sx={{
              width: { xs: "100%", md: "40%" },
              height: { xs: 250, md: "auto" },
              objectFit: "cover",
              backgroundColor: "#f5f5f5",
            }}
          />

          {/* Product Details */}
          <CardContent sx={{ flex: 1, p: 4 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {data.product_name}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {data.product_title}
            </Typography>

            <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
              {data.product_description}
            </Typography>

            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Price: <Typography component="span" fontWeight={600}>{data.price}</Typography>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Min Qty: <Typography component="span" fontWeight={600}>{data.minQuantity}</Typography>
                </Typography>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Add to cart
            </Button>
          </CardContent>
        </Card>
      </Box>
  );
}
