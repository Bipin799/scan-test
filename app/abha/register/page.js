// "use client";

// import { useRouter } from "next/navigation";
// import { Box, Typography, Grid, Card, CardActionArea, Button } from "@mui/material";
// import Layout from "@/app/component/Layout";
// import CustomCard from "@/app/component/CustomCard";

// export default function RegisterAbha() {
//   const router = useRouter();

//   const goToMobile = () => router.push("/abha/register/mobile");

//   return (
//     <Layout>
//         <CustomCard title="Select method to Register ABHA">
//         <Box sx={{ p: 3 }}>
//              <Grid container spacing={12}>
//           <Grid item xs={12}>
//             <Card>
//               <CardActionArea onClick={goToMobile}>
//                 <Box p={2} textAlign="center">Mobile</Box>
//               </CardActionArea>
//             </Card>
//           </Grid>

//           <Grid item xs={12}>
//             <Card>
//               <CardActionArea onClick={() => router.push("/abha/register/abha-address")}>
//                 <Box p={2} textAlign="center">ABHA Address</Box>
//               </CardActionArea>
//             </Card>
//           </Grid>

//           <Grid item xs={12}>
//             <Card>
//               <CardActionArea onClick={() => router.push("/abha/register/abha-number")}>
//                 <Box p={2} textAlign="center">ABHA Number</Box>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         </Grid>

//         <Button 
//           fullWidth 
//           sx={{ mt: 2}} 
//           onClick={() => router.push("/abha")}
//           variant="outlined"
//         >
//           Back
//         </Button>
//         </Box>
       
//         </CustomCard>
//     </Layout>
//   );
// }







// "use client";

// import { useRouter } from "next/navigation";
// import { Box, Typography, Grid, Card, CardActionArea, Button, Paper, alpha } from "@mui/material";
// import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// import BadgeIcon from '@mui/icons-material/Badge';
// import TagIcon from '@mui/icons-material/Tag';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import Layout from "@/app/component/Layout";
// import CustomCard from "@/app/component/CustomCard";

// export default function RegisterAbha() {
//   const router = useRouter();

//   const registrationMethods = [
//     {
//       title: "Mobile Number",
//       description: "Register using your mobile number with OTP verification",
//       icon: <PhoneAndroidIcon sx={{ fontSize: 48 }} />,
//       color: "#1976d2",
//       route: "/abha/register/mobile"
//     },
//     {
//       title: "ABHA Address",
//       description: "Register using your ABHA address identifier",
//       icon: <BadgeIcon sx={{ fontSize: 48 }} />,
//       color: "#2e7d32",
//       route: "/abha/register/abha-address"
//     },
//     {
//       title: "ABHA Number",
//       description: "Register using your 14-digit ABHA number",
//       icon: <TagIcon sx={{ fontSize: 48 }} />,
//       color: "#ed6c02",
//       route: "/abha/register/abha-number"
//     }
//   ];

//   return (
//     <Layout>
//       <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
//         <CustomCard title="Select Registration Method">
//           <Typography 
//             variant="body2" 
//             color="text.secondary" 
//             sx={{ mb: 3, textAlign: "center" }}
//           >
//             Choose your preferred method to register for ABHA (Ayushman Bharat Health Account)
//           </Typography>

//           <Grid container spacing={3}>
//             {registrationMethods.map((method, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card 
//                   elevation={0}
//                   sx={{ 
//                     height: "100%",
//                     border: "1px solid",
//                     borderColor: "divider",
//                     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                     position: "relative",
//                     overflow: "hidden",
//                     "&:hover": {
//                       borderColor: method.color,
//                       transform: "translateY(-4px)",
//                       boxShadow: `0 8px 24px ${alpha(method.color, 0.15)}`,
//                       "& .icon-wrapper": {
//                         backgroundColor: method.color,
//                         color: "white",
//                         transform: "scale(1.1)",
//                       },
//                       "& .arrow-icon": {
//                         transform: "translateX(4px)",
//                         opacity: 1,
//                       }
//                     }
//                   }}
//                 >
//                   <CardActionArea 
//                     onClick={() => router.push(method.route)}
//                     sx={{ height: "100%", p: 3 }}
//                   >
//                     <Box 
//                       className="icon-wrapper"
//                       sx={{ 
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: 80,
//                         height: 80,
//                         borderRadius: 3,
//                         backgroundColor: alpha(method.color, 0.1),
//                         color: method.color,
//                         mx: "auto",
//                         mb: 2,
//                         transition: "all 0.3s ease"
//                       }}
//                     >
//                       {method.icon}
//                     </Box>

//                     <Typography 
//                       variant="h6" 
//                       align="center" 
//                       gutterBottom
//                       sx={{ 
//                         fontWeight: 600,
//                         color: "text.primary",
//                         mb: 1
//                       }}
//                     >
//                       {method.title}
//                     </Typography>

//                     <Typography 
//                       variant="body2" 
//                       align="center" 
//                       color="text.secondary"
//                       sx={{ 
//                         minHeight: 40,
//                         mb: 2,
//                         lineHeight: 1.5
//                       }}
//                     >
//                       {method.description}
//                     </Typography>

//                     <Box 
//                       sx={{ 
//                         display: "flex", 
//                         alignItems: "center", 
//                         justifyContent: "center",
//                         color: method.color,
//                         fontWeight: 500,
//                         fontSize: "0.875rem"
//                       }}
//                     >
//                       <span>Get Started</span>
//                       <ArrowForwardIcon 
//                         className="arrow-icon"
//                         sx={{ 
//                           ml: 0.5, 
//                           fontSize: 18,
//                           transition: "all 0.3s ease",
//                           opacity: 0.7
//                         }} 
//                       />
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
//             <Button 
//               fullWidth 
//               variant="outlined"
//               size="large"
//               onClick={() => router.push("/abha")}
//               sx={{ 
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: 500,
//                 py: 1.5,
//                 "&:hover": {
//                   backgroundColor: alpha("#000", 0.04)
//                 }
//               }}
//             >
//               Back to ABHA Services
//             </Button>
//           </Box>
//         </CustomCard>
//       </Box>
//     </Layout>
//   );
// }













// "use client";

// import { useRouter } from "next/navigation";
// import { Box, Typography, Grid, Card, CardActionArea, Button } from "@mui/material";
// import Layout from "@/app/component/Layout";
// import CustomCard from "@/app/component/CustomCard";

// export default function RegisterAbha() {
//   const router = useRouter();

//   return (
//     <Layout>
//       <CustomCard title="Select method to Register ABHA">
          
//           <Grid container spacing={2}>
            
//             {[ 
//               { label: "Mobile", path: "/abha/register/mobile" },
//               { label: "ABHA Address", path: "/abha/register/abha-address" },
//               { label: "ABHA Number", path: "/abha/register/abha-number" }
//             ].map((item, i) => (
//               <Grid 
//                 key={i} 
//                 item 
//                 xs={12} 
//                 sm={12}
//                 md={12}
//                 sx={{ display: "flex" }}    
//               >
//                 <Card sx={{ borderRadius: 2, width: "100%", height: "100%" }}>
//                   <CardActionArea onClick={() => router.push(item.path)}>
//                     <Box p={2} py={3} textAlign="center">
//                       <Typography fontWeight={600}>{item.label}</Typography>
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             ))}
          
//           </Grid>

//           <Button
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={() => router.push("/abha")}
//             variant="outlined"
//           >
//             Back
//           </Button>
//       </CustomCard>
//     </Layout>
//   );
// }



















// "use client";

// import { useRouter } from "next/navigation";
// import { Box, Typography, Grid, Card, CardActionArea, Button } from "@mui/material";
// import Layout from "@/app/component/Layout";
// import CustomCard from "@/app/component/CustomCard";

// export default function RegisterAbha() {
//   const router = useRouter();

//   const goToMobile = () => router.push("/abha/register/mobile");

//   return (
//     <Layout>
//       <CustomCard title="Select method to Register ABHA">
//         <Box sx={{ p: 3 }}>
//           <Grid container spacing={4} justifyContent="center"sx={{ mt:10, mb:10}}>
            
//             {/* Card Item */}
//             {[
//               { label: "Mobile", link: "/abha/register/mobile" },
//               { label: "ABHA Address", link: "/abha/register/abha-address" },
//               { label: "ABHA Number", link: "/abha/register/abha-number" }
//             ].map((item, index) => (
//               <Grid item key={index} >
//                 <Card sx={{ width: 300, height: 200, display: "flex", alignItems: "center", justifyContent: "center",
//                    boxShadow: "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//                     border: "2px solid rgba(255, 255, 255, 0.2)",
//                     background:"#fefefeff",
//                  }}>
//                   <CardActionArea
//                     onClick={() => router.push(item.link)}
//                     sx={{ width: "100%", height: "100%" }}
//                   >
//                     <Box textAlign="center" sx={{ fontSize: 20, fontWeight: 300,            
//                     }}>
//                       {item.label}
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             ))}

//           </Grid>

//           <Button
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={() => router.push("/abha")}
//             variant="outlined"
//           >
//             Back
//           </Button>
//         </Box>
//       </CustomCard>
//     </Layout>
//   );
// }















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
