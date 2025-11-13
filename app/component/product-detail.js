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
















// "use client";

// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   Divider,
//   Paper,
//   Chip,
//   Stack,
//   TextField,
// } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

// export default function Productdetail2() {

//   const data = {
//     product_img:
//       "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
//     product_name: "Glucose Strip 50",
//     product_title: "Blood Sugar Monitor Strip",
//     product_description:
//       "This glucose test strip helps measure blood sugar levels accurately and quickly. Suitable for both home and clinical use.",
//     price: "₹70",
//     minQuantity: "30",
//   };

//   return (
//       <Box sx={{
//         //  p: { xs: 2, md: 4 },
//        maxWidth: 1200, mx: "auto" }}>
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: "24px",
//             overflow: "hidden",
//             // border: "1px solid",
//             borderColor: "divider",
//             backgroundColor: "rgba(81, 32, 32, 0.7)",
//           }}
//         >
//           <Card
//             sx={{
//               overflow: "hidden",
//               display: "flex",
//               flexDirection: { xs: "column", md: "row" },
//               borderRadius: "24px",
//             //   boxShadow: "none",
//               background:
//                 "linear-gradient(to bottom right, #ffffff 0%, #f8f9fa 100%)",
//               animation: "fadeIn 0.6s ease",
//               "@keyframes fadeIn": {
//                 from: { opacity: 0, transform: "translateY(10px)" },
//                 to: { opacity: 1, transform: "translateY(0)" },
//               },
//             }}
//           >
//             {/* Product Image Section */}
//             <Box
//               sx={{
//                 width: { xs: "100%", md: "45%" },
//                 position: "relative",
//                 overflow: "hidden",
//                 background:
//                   "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 image={data.product_img}
//                 alt={data.product_name}
//                 sx={{
//                   width: "100%",
//                   height: { xs: 220, md: "100%" },
//                   objectFit: "cover",
//                 }}
//               />

//             </Box>

//             {/* Vertical Divider */}
//             <Divider
//               orientation="vertical"
//               flexItem
//               sx={{
//                 display: { xs: "none", md: "block" },
//                 borderColor: "rgba(25,118,210,0.1)",
//                 width: "2px",
//               }}
//             />

//             {/* Product Details Section */}
//             <CardContent
//               sx={{
//                 flex: 1,
//                 p: { xs: 2, md: 3 },
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               {/* Product Category Tag */}
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1.5}
//                 sx={{ mb: 1 }}
//               >
//               </Stack>

//               {/* Product Name and Title */}
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, fontSize: "1.8rem" }}>
//                 {data.product_name}
//               </Typography>
//               <Typography
//                 variant="subtitle1"
//                 sx={{ color: "text.secondary", mb: 1, fontSize: "1.2rem" }}
//               >
//                 {data.product_title}
//               </Typography>

          
//               {/* Product Description */}
//               <Typography
//                 variant="body2"
//                 sx={{
//                   mb: 3,
//                   lineHeight: 1.6,
//                   color: "text.secondary",
//                   fontSize:"1rem",
//                   maxWidth: "95%",
//                 }}
//               >
//                 {data.product_description}
//               </Typography>

//               {/* Price and Quantity */}
//               {/* <Grid container spacing={3} justifyContent="space-between" sx={{ mb: 3 }}>
//                 <Grid size={6} sx={{width:"35%"}}>

//                     <Typography
//                       variant="caption"
//                       sx={{
//                         color:"#1a1111eb",
//                         fontSize: "1.2rem",
//                         fontWeight: 700,
//                       }}
//                     >
//                       Price:{" "}
//                       <Box component="span" sx={{color: "#1b1ddeba"}}>
//                         {data.price}
//                       </Box>
//                     </Typography>
                    
                  
//                 </Grid>

//                 <Grid size={6} sx={{width:"35%"}}>
//                     <Typography
//                       variant="caption"
//                       sx={{
//                         color: "#1a1111eb",
//                         fontSize: "1.1rem",
//                         fontWeight: 700,
//                       }}
//                     >
//                          Minimum Quantity:{" "}
//                     <Box component="span" sx={{ color: "#1b1ddeba" }}>
//                     {data.minQuantity}
//                     </Box>
//                     </Typography>

//                 </Grid>
//               </Grid> */}

//               <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap", 
//                 // justifyContent:"space-between"
//                  }}>
//                 <Chip
//                     //icon={<MonetizationOnIcon sx={{ color: "#fff !important" }} />}
//                     label={`Price: ${data.price}`}
//                     sx={{
//                    // background: "linear-gradient(90deg, #1976d2, #42a5f5)",
//                     background:"rgb(198, 228, 251)",
//                     color: "#000",
//                     fontWeight: 400,
//                     px: 2,
//                     py: 1,
//                     fontSize: "1rem",
//                     borderRadius: "20px",
//                     }}
//                 />

//                 <Chip
//                    // icon={<ProductionQuantityLimitsIcon sx={{ color: "#fff !important" }} />}
//                     label={`Min Qty: ${data.minQuantity}`}
//                     sx={{
//                     //background: "linear-gradient(90deg, #8e24aa, #ce93d8)",
//                     background:"rgb(198, 228, 251)",
//                     color: "#000",
//                     fontWeight: 400,
//                     px: 2,
//                     py: 1,
//                     fontSize: "1rem",
//                     borderRadius: "20px",
//                     }}
//                 />
//               </Stack>

//             {/* <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     background: "linear-gradient(90deg, #e3f2fd, #bbdefb)",
//                     borderRadius: "12px",
//                     p: 2,
//                     mb: 3,
//                 }}
//                 >
//                 <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
//                     Price: <Box component="span" sx={{ color: "#1976d2" }}>{data.price}</Box>
//                 </Typography>

//                 <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: "#90caf9" }} />

//                 <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
//                     Min Qty: <Box component="span" sx={{ color: "#1976d2" }}>{data.minQuantity}</Box>
//                 </Typography>
//                 </Box> */}




//               {/* Add to Cart Button */}
//                 {/* <Box 
//                 display="flex" 
//                 justifyContent="center" 
//                 mt={2}>
//                 <Button
//                     startIcon={<ShoppingCartIcon />}
//                     sx={{
//                     borderRadius: "40px !important",
//                     width: { xs: "80%", sm: "60%", md: "40%" },
//                     fontWeight: 700,
//                     fontSize: "1rem",
//                     py: 1.5,
//                     background: "linear-gradient(90deg, #1976d2, #42a5f5)",
//                     boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//                     color: "#fff", 
//                     }}
//                 >
//                     Add to Cart
//                 </Button>
//                 </Box> */}



//                 {/* with chip button */}

//                  <Box 
//                 // display="flex" 
//                 // justifyContent="center" 
//                 mt={2}>
//                 <Button
//                     startIcon={<ShoppingCartIcon />}
//                     sx={{
//                     borderRadius: "40px !important",
//                     width:"100%",
//                     // width: { xs: "80%", sm: "60%", md: "40%" },
//                     fontWeight: 700,
//                     fontSize: "1rem",
//                     py: 1.5,
//                     background: "#1172BA",
//                     color: "#fff", 
//                     }}
//                 >
//                     Add to Cart
//                 </Button>
//                 </Box>








//             </CardContent>
//           </Card>
//         </Paper>
//       </Box>
//   );
// }
