// "use client";

// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   Paper,
//   Chip,
//   Stack,
// } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
   
//           <Card
//             sx={{
//               overflow: "hidden",
//               display: "flex",
//               flexDirection: { xs: "column", md: "row" },
//               borderRadius: "24px",
//             }}
//           >
//             {/* Product Image Section */}
//             <Box
//               sx={{
//                 width: { xs: "100%", md: "45%" },
//                 position: "relative",
//                 overflow: "hidden",
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
//                 sx={{
//                      mb: 1, 
//                      fontSize: "1.2rem"
//                      }}
//               >
//                 {data.product_title}
//               </Typography>

          
//               {/* Product Description */}
//               <Typography
//                 variant="body2"
//                 sx={{
//                   mb: 3,
//                   lineHeight: 1.6,
//                   fontSize:"1rem",
//                   maxWidth: "95%",
//                 }}
//               >
//                 {data.product_description}
//               </Typography>

//               <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap"}}>
//                 <Chip
//                     label={`Price: ${data.price}`}
//                     sx={{
//                     background:"rgb(198, 228, 251)",
//                     color: "#000",
//                     fontWeight: 400,
//                     fontSize: "1rem",
//                     }}
//                 />

//                 <Chip
//                     label={`Min Qty: ${data.minQuantity}`}
//                     sx={{
//                     background:"rgb(198, 228, 251)",
//                     fontSize: "1rem",
//                     }}
//                 />
//               </Stack>


//                  <Box  mt={2}>
//                 <Button
//                     startIcon={<ShoppingCartIcon />}
//                     sx={{
//                     borderRadius: "40px !important",
//                     width:"100%",
//                     alignContent:"flex-end",
//                     background: "#1172BA",
//                     color: "#fff", 
//                     }}
//                 >
//                     Add to Cart
//                 </Button>
//                 </Box>

//             </CardContent>
//           </Card>
//   );
// }






"use client";

import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Productdetail2() {
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
    <Card
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        borderRadius: "24px",
      }}
    >
      {/* ✅ Move image box inside CardContent but keep layout same */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Image Section wrapped inside Box */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            borderRadius: "16px",
            overflow: "hidden",
            mr: { md: 3 },
            mb: { xs: 2, md: 0 },
            flexShrink: 0,
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

        {/* Product Details Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Product Name & Title */}
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 0.5, fontSize: "1.8rem" }}
          >
            {data.product_name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, fontSize: "1.2rem" }}
          >
            {data.product_title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              mb: 3,
              lineHeight: 1.6,
              fontSize: "1rem",
              maxWidth: "95%",
            }}
          >
            {data.product_description}
          </Typography>

          {/* Price & Min Qty */}
          <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap" }}>
            <Chip
              label={`Price: ${data.price}`}
              sx={{
                background: "rgb(198, 228, 251)",
                color: "#000",
                fontWeight: 400,
                fontSize: "1rem",
              }}
            />
            <Chip
              label={`Min Qty: ${data.minQuantity}`}
              sx={{
                background: "rgb(198, 228, 251)",
                color: "#000",
                fontWeight: 400,
                fontSize: "1rem",
              }}
            />
          </Stack>

          {/* Add to Cart Button — Always at End */}
          <Box mt="auto">
            <Button
              startIcon={<ShoppingCartIcon />}
              sx={{
                borderRadius: "40px",
                width: "100%",
                background: "#1172BA",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                py: 1.5,
                "&:hover": {
                  background: "#0d5a97",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}











// "use client";

// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   Chip,
//   Stack,
// } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
//     <Card
//       sx={{
//         display: "flex",
//         flexDirection: { xs: "column", md: "row" },
//         borderRadius: "24px",
//         overflow: "hidden",
//       }}
//     >
//       <CardContent
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           width: "100%",
//         }}
//       >
//         {/* Image Section */}
//         <Box
//           sx={{
//             width: { xs: "100%", md: "45%" },
//             borderRadius: "16px",
//             overflow: "hidden",
//             mr: { md: 3 },
//             mb: { xs: 2, md: 0 },
//           }}
//         >
//           <CardMedia
//             component="img"
//             image={data.product_img}
//             alt={data.product_name}
//             sx={{
//               width: "100%",
//               height: { xs: 220, md: "100%" },
//               objectFit: "cover",
//             }}
//           />
//         </Box>

//         {/* Details Section */}
//         <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
//           <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
//             {data.product_name}
//           </Typography>

//           <Typography variant="subtitle1" sx={{ mb: 1 }}>
//             {data.product_title}
//           </Typography>

//           <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
//             {data.product_description}
//           </Typography>

//           <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap" }}>
//             <Chip
//               label={`Price: ${data.price}`}
//               sx={{
//                 background: "rgb(198, 228, 251)",
//                 fontSize: "1rem",
//               }}
//             />
//             <Chip
//               label={`Min Qty: ${data.minQuantity}`}
//               sx={{
//                 background: "rgb(198, 228, 251)",
//                 fontSize: "1rem",
//               }}
//             />
//           </Stack>

//           <Box mt="auto">
//             <Button
//               startIcon={<ShoppingCartIcon />}
//               sx={{
//                 borderRadius: "40px",
//                 width: "100%",
//                 background: "#1172BA",
//                 color: "#fff",
//                 fontWeight: 700,
//                 py: 1.2,
//               }}
//             >
//               Add to Cart
//             </Button>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

