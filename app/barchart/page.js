// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import dynamic from "next/dynamic";
// import Layout from "../component/Layout";
// import '../page.module.css';

// import {
//   Box,
//   Paper,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   Chip,
//   Stack,
//   useTheme,
//   Skeleton,
//   Fade,
//   Slide,
//   Grow,
//   Zoom,
// } from "@mui/material";

// import {
//   Refresh,
//   ZoomIn,
//   ZoomOut,
//   FilterList,
// } from "@mui/icons-material";

// const BarChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// export default function EnhancedChart() {
//   const theme = useTheme();

//   // Chart data setup
//   const dataLength = 200;
//   const visiblePoints = 200;

//   const [clientData, setClientData] = useState(null);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   // Generate new dataset when refreshing
//   useEffect(() => {
//     setIsLoading(true);

//     const timer = setTimeout(() => {
//       const newData = Array.from({ length: dataLength }, () =>
//         Math.floor(Math.random() * 100 + 1)
//       );
//       console.log(" new data values--- >", newData);
      
//       setClientData(newData);
//       setIsLoading(false);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [refreshKey, dataLength]);

//   // Chart configuration
//   const chartData = useMemo(() => {
//     if (!clientData) {
//       return {
//         series: [{ name: "Sales", data: [] }],
//         stats: { max: "—", min: "—", avg: "—" },
//         options: {
//           chart: {
//             height: 450,
//             type: "line",
//             toolbar: { show: false },
//             zoom: { enabled: false },
//             animations: {
//               enabled: true,
//               easing: "easeinout",
//               speed: 1200,
//             },
//             foreColor: theme.palette.text.secondary,
//           },
//           stroke: {
//             curve: "smooth",
//             width: 3,
//             colors: [theme.palette.primary.main],
//           },
//           fill: {
//             type: "gradient",
//             gradient: {
//               shade: "dark",
//               type: "vertical",
//               shadeIntensity: 0.5,
//               gradientToColors: [theme.palette.primary.light],
//               opacityFrom: 0.3,
//               opacityTo: 0.1,
//             },
//           },
//           grid: {
//             borderColor: theme.palette.divider,
//             strokeDashArray: 3,
//             padding: { top: 10, right: 20, bottom: 10, left: 20 },
//           },
//           xaxis: {
//             categories: Array.from({ length: dataLength }, (_, i) => `Day ${i + 1}`),
//             labels: {
//               rotate: -45,
//               style: { fontSize: "11px", colors: theme.palette.text.secondary },
//             },
//             tickAmount: visiblePoints,
//             min: 0,
//             max: visiblePoints - 1,
//             axisBorder: { show: true, color: theme.palette.divider },
//           },
//           // yaxis: {
//           //   title: { text: "Sales Units", style: { color: theme.palette.text.secondary } },
//           // },

//           yaxis: {
//   labels: {
//     show: true,
//     offsetX: 0,      // keeps labels fixed horizontally
//     offsetY: 0,      // keeps labels fixed vertically
//     style: {
//       fontSize: "12px",
//       colors: theme.palette.text.secondary
//     },
//     formatter: function (val) {
//       return val.toFixed(0); // label formatting
//     }
//   }
// },

//           title: {
//             // text: "Sales Performance Analytics",
//             align: "left",
//             style: {
//               fontSize: "20px",
//               fontWeight: 600,
//               color: theme.palette.text.primary,
//             },
//           },
//         },
//         width: dataLength * 60 * zoomLevel,
//       };
//     }

//     // Stats
//     const maxValue = Math.max(...clientData);
//     const minValue = Math.min(...clientData);
//     const avgValue = Math.round(
//       clientData.reduce((a, b) => a + b, 0) / clientData.length
//     );

//     return {
//       series: [{ name: "Sales", data: clientData }],
//       stats: { max: maxValue, min: minValue, avg: avgValue },
//       options: {
//         chart: {
//           height: 450,
//           type: "line",
//           toolbar: { show: false },
//           zoom: { enabled: false },
//           animations: {
//             enabled: true,
//             easing: "easeinout",
//             speed: 1200,
//             animateGradually: { enabled: true, delay: 150 },
//             dynamicAnimation: { enabled: true, speed: 800 },
//           },
//           foreColor: theme.palette.text.secondary,
//         },
//         stroke: {
//           curve: "smooth",
//           width: 3,
//           colors: [theme.palette.primary.main],
//         },
//         fill: {
//           type: "gradient",
//           gradient: {
//             shade: "dark",
//             type: "vertical",
//             shadeIntensity: 0.5,
//             gradientToColors: [theme.palette.primary.light],
//             opacityFrom: 0.3,
//             opacityTo: 0.1,
//           },
//         },
//         grid: {
//           borderColor: theme.palette.divider,
//           strokeDashArray: 3,
//           padding: { top: 10, right: 20, bottom: 10, left: 20 },
//         },
//         xaxis: {
//           categories: Array.from({ length: dataLength }, (_, i) => `Day ${i + 1}`),
//           labels: {
//             rotate: -45,
//             style: { fontSize: "11px", colors: theme.palette.text.secondary },
//           },
//           tickAmount: visiblePoints,
//           min: 0,
//           max: visiblePoints - 1,
//           axisBorder: { show: true, color: theme.palette.divider },
//         },
//         // yaxis: {
//         //   title: { text: "Sales Units", style: { color: theme.palette.text.secondary } },
//         //    labels: {
//         //     // show: true,
//         //      offsetY: -10,
//         //   }
//         // },

//         yaxis: {
//   labels: {
//     show: true,
//     offsetX: 0,      // keeps labels fixed horizontally
//     offsetY: 0,      // keeps labels fixed vertically
//     style: {
//       fontSize: "12px",
//       colors: theme.palette.text.secondary
//     },
//     formatter: function (val) {
//       return val.toFixed(0); // label formatting
//     }
//   }
// },

//         title: {
//           // text: "Sales Performance Analytics",
//           align: "left",
//           style: {
//             fontSize: "20px",
//             fontWeight: 600,
//             color: theme.palette.text.primary,
//           },
//         },
//         dataLabels: { enabled: false },
//         tooltip: { theme: theme.palette.mode },
//         markers: {
//           size: 4,
//           strokeColors: theme.palette.primary.main,
//           strokeWidth: 2,
//           hover: { size: 6 },
//         },
//       },
//       width: dataLength * 60 * zoomLevel,
//     };
//   }, [clientData, zoomLevel, theme, dataLength, visiblePoints]);

//   // Handlers
//   const handleRefresh = () => setRefreshKey((prev) => prev + 1);
//   const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2));
//   const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));

//   return (
//     <Layout>
//       <Box
//         sx={{
//           width: "1200px",
//           p: { xs: 1, sm: 3 },
//           background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
//           transition: "all 0.5s ease-in-out",
//         }}
//       >
//         {/* HEADER */}
//         <Fade in timeout={800}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "280px",
//               borderRadius: 3,
//               mb: 4,
//               p: 3,
//               position: "relative",
//               overflow: "hidden",
//               background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
//               transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
//               "&:hover": {
//                 transform: "translateY(-2px)",
//                 boxShadow: theme.shadows[12],
//               },
//             }}
//           >
//             <Zoom in timeout={1000}>
//               <Paper
//                 elevation={8}
//                 sx={{
//                   p: 4,
//                   width: "100%",
//                   maxWidth: 800,
//                   textAlign: "center",
//                   borderRadius: 4,
//                   background: "rgba(255, 255, 255, 0.95)",
//                   backdropFilter: "blur(10px)",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                 }}
//               >
//                 <Slide direction="down" in timeout={1200}>
//                   <Typography
//                     variant="h4"
//                     gutterBottom
//                     sx={{
//                       fontWeight: 700,
//                       background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                       backgroundClip: "text",
//                       WebkitBackgroundClip: "text",
//                       color: "transparent",
//                     }}
//                   >
//                     Advanced Analytics Dashboard
//                   </Typography>
//                 </Slide>

//                 <Slide direction="up" in timeout={1400}>
//                   <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
//                     Real-time Sales Performance Metrics & Insights
//                   </Typography>
//                 </Slide>

//                 <Stack
//                   direction={{ xs: "column", sm: "row" }}
//                   spacing={2}
//                   justifyContent="center"
//                 >
//                   {[
//                     { label: "Peak Sales", value: chartData.stats.max, color: "success" },
//                     { label: "Average", value: chartData.stats.avg, color: "info" },
//                     { label: "Lowest", value: chartData.stats.min, color: "warning" },
//                   ].map((stat, i) => (
//                     <Grow in timeout={1600 + i * 200} key={stat.label}>
//                       <Card
//                         sx={{
//                           minWidth: 120,
//                           background: theme.palette[stat.color].light,
//                           cursor: "pointer",
//                           "&:hover": {
//                             transform: "translateY(-4px) scale(1.05)",
//                             background: theme.palette[stat.color].main,
//                             boxShadow: theme.shadows[8],
//                           },
//                         }}
//                       >
//                         <CardContent sx={{ textAlign: "center", p: 2 }}>
//                           {stat.value && !isLoading ? (
//                             <Typography
//                               variant="h6"
//                               color={`${stat.color}.dark`}
//                               sx={{ fontWeight: "bold" }}
//                             >
//                               {stat.value}
//                             </Typography>
//                           ) : (
//                             <Skeleton variant="text" width={60} animation="wave" />
//                           )}
//                           <Typography
//                             variant="caption"
//                             color={`${stat.color}.dark`}
//                             sx={{ fontWeight: 500 }}
//                           >
//                             {stat.label}
//                           </Typography>
//                         </CardContent>
//                       </Card>
//                     </Grow>
//                   ))}
//                 </Stack>
//               </Paper>
//             </Zoom>
//           </Box>
//         </Fade>

//         {/* CONTROLS */}
//         <Slide direction="up" in timeout={600}>
//           <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 flexWrap: "wrap",
//                 gap: 2,
//               }}
//             >
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                 Sales Trend Analysis
//               </Typography>
//               <Stack direction="row" spacing={1} alignItems="center">
//                 <Chip
//                   icon={<FilterList />}
//                   label="Last 100 Days"
//                   variant="outlined"
//                   size="small"
//                 />
//                 <IconButton onClick={handleZoomOut} size="small" color="primary">
//                   <ZoomOut />
//                 </IconButton>
//                 <Typography variant="body2" sx={{ minWidth: 60, textAlign: "center" }}>
//                   {Math.round(zoomLevel * 100)}%
//                 </Typography>
//                 <IconButton onClick={handleZoomIn} size="small" color="primary">
//                   <ZoomIn />
//                 </IconButton>
//                 <IconButton
//                   onClick={handleRefresh}
//                   size="small"
//                   color="primary"
//                   disabled={isLoading}
//                   sx={{
//                     ...(isLoading && {
//                       animation: "spin 1s linear infinite",
//                     }),
//                     "@keyframes spin": {
//                       "0%": { transform: "rotate(0deg)" },
//                       "100%": { transform: "rotate(360deg)" },
//                     },
//                   }}
//                 >
//                   <Refresh />
//                 </IconButton>
//               </Stack>
//             </Box>
//           </Paper>
//         </Slide>

//         {/* CHART */}
//         <Fade in timeout={1000}>
//           <Paper
//             elevation={4}
//             sx={{
//               borderRadius: 3,
//               overflow: "hidden",
//               background: theme.palette.background.paper,
//             }}
//           >
          
          
            
//             {/* <Box
//               sx={{
//                 overflowX: "auto",
//                 "&::-webkit-scrollbar": { display: "none" },
//                 overflowY: "hidden",
//                 paddingLeft: "10px",
//               }}
//             >
//               <Box sx={{ width: `${chartData.width}px`, minWidth: "100%" }}>
//                 <Typography variant="h6" sx={{ p: 2 }}>
//                   Line Chart
//                 </Typography>
//                 <BarChart
//                   options={chartData.options}
//                   series={chartData.series}
//                   type="line"
//                   height={450}
//                   width={chartData.width}
//                 />
//               </Box>
//             </Box> */}

//             <Box sx={{ display: "flex", height: "470px" }}>
//   {/* Fixed Y-axis labels */}
//   <Box
//     sx={{
//       position: "sticky",
//       left: 0,
//       background: theme.palette.background.paper,
//       zIndex: 10,
//       padding: "16px 8px",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",
//       height: "100%",
//     }}
//   >
//     {[100, 80, 60, 40, 20, 0].map((val) => (
//       <Typography key={val} variant="body2" sx={{ fontWeight: 600 }}>
//         {val}
//       </Typography>
//     ))}
//   </Box>

//   {/* Scrollable chart */}
//   <Box
//     sx={{
//       overflowX: "auto",
//       overflowY: "hidden",
//       "&::-webkit-scrollbar": { display: "none" },
//     }}
//   >
//     <Box sx={{ width: `${chartData.width}px`, minWidth: "100%" }}>
//       <BarChart
//         options={{
//           ...chartData.options,
//           yaxis: { labels: { show: false } }, // hide ApexCharts labels
//         }}
//         series={chartData.series}
//         type="line"
//         height={450}
//         width={chartData.width}
//       />
//     </Box>
//   </Box>
// </Box>




            
//           </Paper>
//         </Fade>

//         {/* CHART with fixed Y-axis labels */}
//         {/* <Fade in timeout={1000}>
//           <Paper
//             elevation={4}
//             sx={{
//               borderRadius: 3,
//               overflow: "hidden",
//               background: theme.palette.background.paper,
//             }}
//           >
//             <Box sx={{ display: "flex", height: "470px" }}>
//               <Box
//                 sx={{
//                   position: "sticky",
//                   left: 0,
//                   background: theme.palette.background.paper,
//                   zIndex: 10,
//                   padding: "16px 8px",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   height: "100%",
//                 }}
//               >
//                 {[100, 80, 60, 40, 20, 0].map((val) => (
//                   <Typography
//                     key={val}
//                     variant="body2"
//                     height={10}
//                     sx={{ fontWeight: 600 }}
//                   > 
//                     {val}
//                   </Typography>
//                 ))}
//               </Box>

//               <Box
//                 sx={{
//                   overflowX: "auto",
//                   overflowY: "hidden",
//                   "&::-webkit-scrollbar": { display: "none" },
//                 }}
//               >
//                 <Box sx={{ width: `${chartData.width}px`, minWidth: "100%" }}>
//                   <BarChart
//                     options={{
//                       ...chartData.options,
//                       yaxis: { labels: { show: false } }, 
//                     }}
//                     series={chartData.series}
//                     type="line"
//                     height={450}
//                     width={chartData.width}
//                   />
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>
//         </Fade> */}


//         {/* FOOTER */}
//         <Slide direction="up" in timeout={1200}>
//           <Box sx={{ textAlign: "center", mt: 3, mb: 2 }}>
//             <Typography variant="caption" color="text.secondary">
//               • Hover over points for detailed information • Scroll horizontally
//               to explore full dataset •
//             </Typography>
//           </Box>
//         </Slide>
//       </Box>
//     </Layout>
//   );
// }









"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Layout from "../component/Layout";
import '../page.module.css';

import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  Stack,
  useTheme,
  Skeleton,
  Fade,
  Slide,
  Grow,
  Zoom,
} from "@mui/material";

import {
  Refresh,
  ZoomIn,
  ZoomOut,
  FilterList,
} from "@mui/icons-material";

const BarChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function EnhancedChart() {
  const theme = useTheme();

  // Chart data setup
  const dataLength = 200;
  const visiblePoints = 200;

  const [clientData, setClientData] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Generate new dataset when refreshing
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const newData = Array.from({ length: dataLength }, () =>
        Math.floor(Math.random() * 100 + 1)
      );
      // console.log(" new data values--- >", newData);
      
      setClientData(newData);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [refreshKey, dataLength]);

  // Chart configuration
  const chartData = useMemo(() => {
    if (!clientData) {
      return {
        series: [{ name: "Sales", data: [] }],
        stats: { max: "—", min: "—", avg: "—" },
        options: {
          chart: {
            height: 450,
            type: "line",
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 1200,
            },
            foreColor: theme.palette.text.secondary,
          },
          stroke: {
            curve: "smooth",
            width: 3,
            colors: [theme.palette.primary.main],
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "vertical",
              shadeIntensity: 0.5,
              gradientToColors: [theme.palette.primary.light],
              opacityFrom: 0.3,
              opacityTo: 0.1,
            },
          },
          grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 3,
            padding: { top: 10, right: 20, bottom: 10, left: 0 }, // Reduced left padding
          },
          xaxis: {
            categories: Array.from({ length: dataLength }, (_, i) => `Day ${i + 1}`),
            labels: {
              rotate: -45,
              style: { fontSize: "11px", colors: theme.palette.text.secondary },
            },
            tickAmount: visiblePoints,
            min: 0,
            max: visiblePoints - 1,
            axisBorder: { show: true, color: theme.palette.divider },
          },
          yaxis: {
            labels: {
              show: true,
              align: 'right',
              minWidth: 40,
              maxWidth: 40,
              style: {
                fontSize: "12px",
                colors: theme.palette.text.secondary
              },
              formatter: function (val) {
                return val.toFixed(0);
              },
              offsetX: 0,
              offsetY: 0,
            },
            axisBorder: {
              show: true,
              color: theme.palette.divider
            }
          },
          title: {
            align: "left",
            style: {
              fontSize: "20px",
              fontWeight: 600,
              color: theme.palette.text.primary,
            },
          },
        },
        width: dataLength * 60 * zoomLevel,
      };
    }

    // Stats
    const maxValue = Math.max(...clientData);
    const minValue = Math.min(...clientData);
    const avgValue = Math.round(
      clientData.reduce((a, b) => a + b, 0) / clientData.length
    );

    return {
      series: [{ name: "Sales", data: clientData }],
      stats: { max: maxValue, min: minValue, avg: avgValue },
      options: {
        chart: {
          height: 450,
          type: "line",
          toolbar: { show: false },
          zoom: { enabled: false },
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 1200,
            animateGradually: { enabled: true, delay: 150 },
            dynamicAnimation: { enabled: true, speed: 800 },
          },
          foreColor: theme.palette.text.secondary,
        },
        stroke: {
          curve: "smooth",
          width: 3,
          colors: [theme.palette.primary.main],
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.5,
            gradientToColors: [theme.palette.primary.light],
            opacityFrom: 0.3,
            opacityTo: 0.1,
          },
        },
        grid: {
          borderColor: theme.palette.divider,
          strokeDashArray: 3,
          padding: { top: 10, right: 20, bottom: 10, left: 0 }, // Reduced left padding
        },
        xaxis: {
          categories: Array.from({ length: dataLength }, (_, i) => `Day ${i + 1}`),
          labels: {
            rotate: -45,
            style: { fontSize: "11px", colors: theme.palette.text.secondary },
          },
          tickAmount: visiblePoints,
          min: 0,
          max: visiblePoints - 1,
          axisBorder: { show: true, color: theme.palette.divider },
        },
        yaxis: {
          labels: {
            show: true,
            align: 'right',
            minWidth: 40,
            maxWidth: 40,
            style: {
              fontSize: "12px",
              colors: theme.palette.text.secondary
            },
            formatter: function (val) {
              return val.toFixed(0);
            },
            offsetX: 0,
            offsetY: 0,
          },
          axisBorder: {
            show: true,
            color: theme.palette.divider
          }
        },
        title: {
          align: "left",
          style: {
            fontSize: "20px",
            fontWeight: 600,
            color: theme.palette.text.primary,
          },
        },
        dataLabels: { enabled: false },
        tooltip: { theme: theme.palette.mode },
        markers: {
          size: 4,
          strokeColors: theme.palette.primary.main,
          strokeWidth: 2,
          hover: { size: 6 },
        },
      },
      width: dataLength * 60 * zoomLevel,
    };
  }, [clientData, zoomLevel, theme, dataLength, visiblePoints]);

  // Handlers
  const handleRefresh = () => setRefreshKey((prev) => prev + 1);
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));

  return (
    <Layout>
      <Box
        sx={{
          width: "1200px",
          p: { xs: 1, sm: 3 },
          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
          transition: "all 0.5s ease-in-out",
        }}
      >
        {/* HEADER */}
        <Fade in timeout={800}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "280px",
              borderRadius: 3,
              mb: 4,
              p: 3,
              position: "relative",
              overflow: "hidden",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[12],
              },
            }}
          >
            <Zoom in timeout={1000}>
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  width: "100%",
                  maxWidth: 800,
                  textAlign: "center",
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Slide direction="down" in timeout={1200}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Advanced Analytics Dashboard
                  </Typography>
                </Slide>

                <Slide direction="up" in timeout={1400}>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                    Real-time Sales Performance Metrics & Insights
                  </Typography>
                </Slide>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="center"
                >
                  {[
                    { label: "Peak Sales", value: chartData.stats.max, color: "success" },
                    { label: "Average", value: chartData.stats.avg, color: "info" },
                    { label: "Lowest", value: chartData.stats.min, color: "warning" },
                  ].map((stat, i) => (
                    <Grow in timeout={1600 + i * 200} key={stat.label}>
                      <Card
                        sx={{
                          minWidth: 120,
                          background: theme.palette[stat.color].light,
                          cursor: "pointer",
                          "&:hover": {
                            transform: "translateY(-4px) scale(1.05)",
                            background: theme.palette[stat.color].main,
                            boxShadow: theme.shadows[8],
                          },
                        }}
                      >
                        <CardContent sx={{ textAlign: "center", p: 2 }}>
                          {stat.value && !isLoading ? (
                            <Typography
                              variant="h6"
                              color={`${stat.color}.dark`}
                              sx={{ fontWeight: "bold" }}
                            >
                              {stat.value}
                            </Typography>
                          ) : (
                            <Skeleton variant="text" width={60} animation="wave" />
                          )}
                          <Typography
                            variant="caption"
                            color={`${stat.color}.dark`}
                            sx={{ fontWeight: 500 }}
                          >
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grow>
                  ))}
                </Stack>
              </Paper>
            </Zoom>
          </Box>
        </Fade>

        {/* CONTROLS */}
        <Slide direction="up" in timeout={600}>
          <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Sales Trend Analysis
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  icon={<FilterList />}
                  label="Last 100 Days"
                  variant="outlined"
                  size="small"
                />
                <IconButton onClick={handleZoomOut} size="small" color="primary">
                  <ZoomOut />
                </IconButton>
                <Typography variant="body2" sx={{ minWidth: 60, textAlign: "center" }}>
                  {Math.round(zoomLevel * 100)}%
                </Typography>
                <IconButton onClick={handleZoomIn} size="small" color="primary">
                  <ZoomIn />
                </IconButton>
                <IconButton
                  onClick={handleRefresh}
                  size="small"
                  color="primary"
                  disabled={isLoading}
                  sx={{
                    ...(isLoading && {
                      animation: "spin 1s linear infinite",
                    }),
                    "@keyframes spin": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                  }}
                >
                  <Refresh />
                </IconButton>
              </Stack>
            </Box>
          </Paper>
        </Slide>

        {/* CHART with fixed Y-axis labels */}
        <Fade in timeout={1000}>
          <Paper
            elevation={4}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              background: theme.palette.background.paper,
              position: 'relative',
            }}
          >
            <Box sx={{ 
              display: "flex", 
              height: "470px",
              position: 'relative'
            }}>
              {/* Fixed Y-axis labels container */}
              <Box
                sx={{
                  position: "sticky",
                  left: 0,
                  background: theme.palette.background.paper,
                  zIndex: 10,
                  padding: "16px 8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  minWidth: '50px',
                  borderRight: `1px solid ${theme.palette.divider}`,
                }}
              >
                {[100, 80, 60, 40, 20, 0].map((val) => (
                  <Typography
                    key={val}
                    variant="body2"
                    sx={{ 
                      fontWeight: 600,
                      textAlign: 'right',
                      pr: 1,
                      height: 'calc(100% / 6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}
                  > 
                    {val}
                  </Typography>
                ))}
              </Box>

              {/* Scrollable chart area */}
              <Box
                sx={{
                  flex: 1,
                  overflowX: "auto",
                  overflowY: "hidden",
                  "&::-webkit-scrollbar": { 
                    height: 8,
                  },
                  "&::-webkit-scrollbar-track": {
                    background: theme.palette.grey[100],
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: theme.palette.grey[400],
                    borderRadius: 4,
                  },
                }}
              >
                <Box sx={{ 
                  width: `${chartData.width}px`, 
                  minWidth: "100%",
                  position: 'relative',
                  left: '-1px' // Overlap with the border
                }}>
                  <BarChart
                    options={{
                      ...chartData.options,
                      yaxis: { 
                        ...chartData.options.yaxis,
                        labels: { 
                          show: false // Hide the built-in Y-axis labels
                        } 
                      },
                      grid: {
                        ...chartData.options.grid,
                        padding: { top: 10, right: 20, bottom: 10, left: 10 }
                      }
                    }}
                    series={chartData.series}
                    type="line"
                    height={450}
                    width={chartData.width}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* FOOTER */}
        <Slide direction="up" in timeout={1200}>
          <Box sx={{ textAlign: "center", mt: 3, mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              • Hover over points for detailed information • Scroll horizontally
              to explore full dataset •
            </Typography>
          </Box>
        </Slide>
      </Box>
    </Layout>
  );
}
