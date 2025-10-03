
// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import dynamic from "next/dynamic";
// import Layout from "../component/Layout";
// import '../page.module.css';
// import linegraphData from "../constant/linegraph.json"; 

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
//       // console.log(" new data values--- >", newData);
      
//       setClientData(newData);
//       setIsLoading(false);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [refreshKey, dataLength]);

//   useEffect(() => {
//     console.log("Local JSON 👉", linegraphData);

//     // Example: print calibratedReading
//     if (Array.isArray(linegraphData)) {
//       linegraphData.forEach(item => console.log(item.calibratedReading));
//     } else {
//       console.log(linegraphData.calibratedReading);
//     }
//   }, []);

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
//             padding: { top: 10, right: 20, bottom: 10, left: 0 }, // Reduced left padding
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
//           yaxis: {
//             labels: {
//               show: true,
//               align: 'right',
//               minWidth: 40,
//               maxWidth: 40,
//               style: {
//                 fontSize: "12px",
//                 colors: theme.palette.text.secondary
//               },
//               formatter: function (val) {
//                 return val.toFixed(0);
//               },
//               offsetX: 0,
//               offsetY: 0,
//             },
//             axisBorder: {
//               show: true,
//               color: theme.palette.divider
//             }
//           },
//           title: {
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
//           padding: { top: 10, right: 20, bottom: 10, left: 0 }, // Reduced left padding
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
//         yaxis: {
//           labels: {
//             show: true,
//             align: 'right',
//             minWidth: 40,
//             maxWidth: 40,
//             style: {
//               fontSize: "12px",
//               colors: theme.palette.text.secondary
//             },
//             formatter: function (val) {
//               return val.toFixed(0);
//             },
//             offsetX: 0,
//             offsetY: 0,
//           },
//           axisBorder: {
//             show: true,
//             color: theme.palette.divider
//           }
//         },
//         title: {
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

//         {/* CHART with fixed Y-axis labels */}
//         <Fade in timeout={1000}>
//           <Paper
//             elevation={4}
//             sx={{
//               borderRadius: 3,
//               overflow: "hidden",
//               background: theme.palette.background.paper,
//               position: 'relative',
//             }}
//           >
//             <Box sx={{ 
//               display: "flex", 
//               height: "470px",
//               position: 'relative'
//             }}>
//               {/* Fixed Y-axis labels container */}
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
//                   minWidth: '50px',
//                   borderRight: `1px solid ${theme.palette.divider}`,
//                 }}
//               >
//                 {[100, 80, 60, 40, 20, 0].map((val) => (
//                   <Typography
//                     key={val}
//                     variant="body2"
//                     sx={{ 
//                       fontWeight: 600,
//                       textAlign: 'right',
//                       pr: 1,
//                       height: 'calc(100% / 6)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'flex-end'
//                     }}
//                   > 
//                     {val}
//                   </Typography>
//                 ))}
//               </Box>

//               {/* Scrollable chart area */}
//               <Box
//                 sx={{
//                   flex: 1,
//                   overflowX: "auto",
//                   overflowY: "hidden",
//                   "&::-webkit-scrollbar": { 
//                     height: 8,
//                   },
//                   "&::-webkit-scrollbar-track": {
//                     background: theme.palette.grey[100],
//                   },
//                   "&::-webkit-scrollbar-thumb": {
//                     background: theme.palette.grey[400],
//                     borderRadius: 4,
//                   },
//                 }}
//               >
//                 <Box sx={{ 
//                   width: `${chartData.width}px`, 
//                   minWidth: "100%",
//                   position: 'relative',
//                   left: '-1px' // Overlap with the border
//                 }}>
//                   <BarChart
//                     options={{
//                       ...chartData.options,
//                       yaxis: { 
//                         ...chartData.options.yaxis,
//                         labels: { 
//                           show: false // Hide the built-in Y-axis labels
//                         } 
//                       },
//                       grid: {
//                         ...chartData.options.grid,
//                         padding: { top: 10, right: 20, bottom: 10, left: 10 }
//                       }
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
//         </Fade>

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

import React, { useRef, useEffect, useState, useMemo } from "react";
import bardata from '../constant/linegraph.json';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Container, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import Layout from "../component/Layout";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const stickyLabelPlugin = {
  id: "stickyLabels",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const xAxis = chart.scales.x;

    if (!xAxis || !xAxis.ticks) return;

    ctx.save();

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    const labelCount = xAxis.ticks.length;

    console.log("the values of lab---->", labelCount);
    

    // Dynamic skip interval based on label count
    const skipInterval =
      labelCount > 50 ? 3: 1;
    
    xAxis.ticks.forEach((tick, index) => {
      if (index % skipInterval !== 0) return;

      const x = xAxis.getPixelForTick(index);
      const y = chart.chartArea.bottom + 7;
      const label = tick.label || "";

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-Math.PI / 4);

      ctx.fillText(label, 0, 0);
      ctx.restore();
    });

    ctx.restore();
  },
};

const rangeLinePlugin = {
  id: "rangeLines",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const yScale = chart.scales.y;

    const minValue = 70;
    const maxValue = 90;

    const minY = yScale.getPixelForValue(minValue);
    const maxY = yScale.getPixelForValue(maxValue);

    ctx.save();

    const gradient = ctx.createLinearGradient(0, maxY, 0, minY);
    // gradient.addColorStop(0, "rgba(255, 0, 0, 0.1)");
    // gradient.addColorStop(0.5, "rgba(255, 255, 0, 0.1)");
    // gradient.addColorStop(1, "rgba(0, 255, 0, 0.1)");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(
      chart.chartArea.left,
      maxY,
      chart.chartArea.right - chart.chartArea.left,
      minY - maxY
    );

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 4]);

    ctx.beginPath();
    ctx.moveTo(chart.chartArea.left, minY);
    ctx.lineTo(chart.chartArea.right, minY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(chart.chartArea.left, maxY);
    ctx.lineTo(chart.chartArea.right, maxY);
    ctx.stroke();

    ctx.restore();
  }
};

ChartJS.register(stickyLabelPlugin, rangeLinePlugin);

export default function Chart() {
  const visiblePoints = 10;
  const totalPoints = bardata.length;

  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
      return () => {
        ChartJS.unregister(rangeLinePlugin); 
      };
    }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollLeft(container.scrollLeft);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const pointWidth = containerWidth > 0 ? containerWidth / visiblePoints : 100;
  const chartWidth = pointWidth * totalPoints;

  // Helper: Convert Celsius → Fahrenheit
  // const convertToFahrenheit = (celsius) => (celsius * 9 / 5 + 32);

  // Memoized calculations
  const { fahrenheitData, maxval, minval, step, customLabels } = useMemo(() => {
    // const fahrenheitData = bardata.map(item => parseFloat(convertToFahrenheit(item.calibratedReading).toFixed(2)));
      const fahrenheitData = bardata.map(item => parseFloat(item.calibratedReading).toFixed(2));


    const maxReading = Math.max(...fahrenheitData);
    const minReading = Math.min(...fahrenheitData);

    const minval = minReading - 20;
    const maxval = maxReading + 5;

    const numberOfLabels = 5;
    const step = (maxReading - minReading + 40) / (numberOfLabels - 1);

    const customLabels = Array.from({ length: numberOfLabels }, (_, i) =>
      parseFloat((minReading + step * i).toFixed(2))
    );

    return { fahrenheitData, maxval, minval, step, customLabels };
  }, [bardata]);

  const data = useMemo(() => ({
    labels: bardata.map(item => {
      const date = new Date(item.testDateTime);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      return `${month} ${day}`;
    }),
    datasets: [
      {
        label: "Temperature",
        data: fahrenheitData,
        borderColor: "rgba(59, 130, 246, 0.85)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        pointBackgroundColor: "rgba(59, 130, 246, 0.8)",
        pointBorderColor: "rgba(59, 130, 246, 1)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4, // Smooth curve (0 for straight lines, 0.4 for smooth curves)
        borderWidth: 3,
      },
    ],
  }), [bardata, fahrenheitData]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { bottom: 30 } },
    plugins: {
      rangeLines: rangeLinePlugin,
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} bpm`
        }
      }
    },
    scales: {
      x: { 
        ticks: { display: false },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)"
        }
      },
      y: {
        beginAtZero: false,
        min: minval,
        max: maxval,
        ticks: {
          stepSize: step,
          callback: value => `${value.toFixed(2)} bpm`,
          display: false,
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)"
        }
      }
    },
    elements: {
      line: {
        tension: 0.4 // Smooth curves
      }
    }
  }), [minval, maxval, step]);

  // Get Y-axis tick values from the chart
  const getYAxisTicks = () => {
    if (!chartRef.current?.scales?.y) return [];
    
    const yScale = chartRef.current.scales.y;
    const ticks = yScale.ticks || [];
    
    return ticks.map(tick => ({
      value: tick.value,
      label: `${tick.value.toFixed(2)} bpm`,
      pixelPosition: yScale.getPixelForValue(tick.value)
    }));
  };

  // Helper function to get pixel position for specific value
  const yScaleForValue = (val) => {
    return chartRef.current?.scales?.y?.getPixelForValue(val) ?? 0;
  };

  const [yAxisTicks, setYAxisTicks] = useState([]);
  const [minRangePosition, setMinRangePosition] = useState(0);
  const [maxRangePosition, setMaxRangePosition] = useState(0);

  useEffect(() => {
    // Update Y-axis ticks and range positions after chart renders
    const timer = setTimeout(() => {
      setYAxisTicks(getYAxisTicks());
      setMinRangePosition(yScaleForValue(70));
      setMaxRangePosition(yScaleForValue(90));
    }, 100);
    
    return () => clearTimeout(timer);
  }, [data, options]);

  return (
    <Layout>
      <Box>
        <Container maxWidth="xl">
          <Paper elevation={8} sx={{ borderRadius: 5, p: 4, backgroundColor: "white", width: "1084px" }}>
            {/* Header */}
            <Box sx={{ ml: 30, mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Typography variant="h3" fontWeight="bold" color="text.primary">
                  Temperature Monitoring
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
                Real-time temperature readings and analytics
              </Typography>
            </Box>

            <Box
              sx={{
                position: "relative",
                display: "flex",
                width: "100%",
                borderRadius: 3,
                bgcolor: "#fafafa",
              }}
            >
              {/* Sticky Y-Axis Labels on Right */}
              <Box
                sx={{
                  position: "absolute",
                  left: -22,
                  top: 16,
                  bottom: 46,
                  width: "80px",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                
                {yAxisTicks.map((tick, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "absolute",
                      top: `${tick.pixelPosition}px`,                    
                      transform: "translateY(-50%)",
                      px: 1,
                      py: 0.5,
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "text.primary",
                    }}
                  >
                    {tick.label}
                  </Box>
                ))}
                
              </Box>

              {/* Max Range Label - Sticky on right, above max line */}
              <Typography
                sx={{
                  position: "absolute",
                  right: 22,
                  width: "140px",
                  background: "black",
                  color: "white",
                  borderRadius: "4px",
                  px: 1,
                  py: 0.5,
                  fontSize: "12px",
                  top: `${maxRangePosition - 14}px`,
                  zIndex: 11,
                  pointerEvents: "none",
                }}
              >
                Max Range (90 bpm)
              </Typography>

              {/* Min Range Label - Sticky on right, below min line */}
              <Typography
                sx={{
                  position: "absolute",
                  right: 22,
                  width: "140px",
                  background: "black",
                  color: "white",
                  borderRadius: "4px",
                  px: 1,
                  py: 0.5,
                  fontSize: "12px",
                  top: `${minRangePosition + 20}px`,
                  zIndex: 11,
                  pointerEvents: "none",
                }}
              >
                Min Range (70 bpm)
              </Typography>

              <Box
                ref={containerRef}
                sx={{
                  overflowX: "auto",
                  width: "95%",
                  p: 2,
                  ml:4,
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                  position: "relative",
                }}
              >
                <Box sx={{ 
                  width: `${chartWidth}px`,
                  // width:"100%",
                  height: 400,
                  position: "relative"
                }}>
                  <Line ref={chartRef} data={data} options={options} plugins={[rangeLinePlugin]}  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
}