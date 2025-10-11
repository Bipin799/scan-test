
// "use client";

// import React, { useRef, useEffect, useState, useMemo } from "react";
// import bardata from '../constant/bardata.json';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { Box, Container, Paper, Typography, Chip } from "@mui/material";
// import Layout from "../component/Layout";


// const stickyLabelPlugin = {
//   id: "stickyLabels",
//   afterDraw: (chart) => {
//     const ctx = chart.ctx;
//     const xAxis = chart.scales.x;

//     if (!xAxis || !xAxis.ticks) return;

//     ctx.save();

//     ctx.font = "11px Arial";
//     ctx.fillStyle = "#555";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "top";

//     const labelCount = xAxis.ticks.length;

//     // Dynamic skip interval based on label count
//     const skipInterval = labelCount > 50 ? 2 : 1;
    
//     xAxis.ticks.forEach((tick, index) => {
//       if (index % skipInterval !== 0) return;

//       const x = xAxis.getPixelForTick(index);
//       const y = chart.chartArea.bottom + 10;
//       const label = tick.label || "";

//       ctx.save();
//       ctx.translate(x, y);
//       ctx.rotate(-Math.PI / 4);

//       ctx.fillText(label, 0, 0);
//       ctx.restore();
//     });

//     ctx.restore();
//   },
// };

// const rangeLinePlugin = {
//   id: "rangeLines",
//   afterDraw: (chart) => {
//     const ctx = chart.ctx;
//     const yScale = chart.scales.y;

//     const minValue = 97;
//     const maxValue = 99;

//     const minY = yScale.getPixelForValue(minValue);
//     const maxY = yScale.getPixelForValue(maxValue);

//     ctx.save();

//     // Create gradient for the range area
//     const gradient = ctx.createLinearGradient(0, maxY, 0, minY);
//     gradient.addColorStop(0, "rgba(34, 197, 94, 0.15)");
//     gradient.addColorStop(1, "rgba(34, 197, 94, 0.05)");
//     ctx.fillStyle = gradient;
//     ctx.fillRect(
//       chart.chartArea.left,
//       maxY,
//       chart.chartArea.right - chart.chartArea.left,
//       minY - maxY
//     );

//     // Draw dashed lines
//     ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
//     ctx.lineWidth = 2;
//     ctx.setLineDash([8, 4]);

//     // Min line
//     ctx.beginPath();
//     ctx.moveTo(chart.chartArea.left, minY);
//     ctx.lineTo(chart.chartArea.right, minY);
//     ctx.stroke();

//     // Max line
//     ctx.beginPath();
//     ctx.moveTo(chart.chartArea.left, maxY);
//     ctx.lineTo(chart.chartArea.right, maxY);
//     ctx.stroke();

//     ctx.restore();
//   }
// };

// ChartJS.register(CategoryScale, LinearScale, BarElement, stickyLabelPlugin, Title, Tooltip, Legend, rangeLinePlugin);

// export default function Chart() {
//   const visibleBars = 55;
//   const totalBars = bardata.length;

//   const containerRef = useRef(null);
//   const chartRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);

//   // Resize handler
//   useEffect(() => {
//     const handleResize = () => {
//       if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const barWidth = containerWidth > 0 ? containerWidth / visibleBars : 100;
//   const chartWidth = barWidth * totalBars;

//   // Helper: Convert Celsius → Fahrenheit
//   const convertToFahrenheit = (celsius) => (celsius * 9 / 5 + 32);

//   // Memoized calculations
//   const { fahrenheitData, maxval, minval, step, avgTemp, inRangeCount } = useMemo(() => {
//     const fahrenheitData = bardata.map(item => parseFloat(convertToFahrenheit(item.calibratedReading).toFixed(2)));

//     const maxReading = Math.max(...fahrenheitData);
//     const minReading = Math.min(...fahrenheitData);

//     const minval = minReading - 20;
//     const maxval = maxReading + 5;

//     const numberOfLabels = 5;
//     const step = (maxReading - minReading + 40) / (numberOfLabels - 1);

//     // Calculate average temperature
//     const avgTemp = (fahrenheitData.reduce((a, b) => a + b, 0) / fahrenheitData.length).toFixed(1);

//     // Count readings in range (97-99°F)
//     const inRangeCount = fahrenheitData.filter(temp => temp >= 97 && temp <= 99).length;

//     return { fahrenheitData, maxval, minval, step, avgTemp, inRangeCount };
//   }, [bardata]);

//   const data = useMemo(() => ({
//     labels: bardata.map(item => {
//       const date = new Date(item.testDateTime);
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       const month = monthNames[date.getMonth()];
//       const day = date.getDate();
//       return `${month} ${day}`;
//     }),
//     datasets: [
//       {
//         label: "Temperature",
//         data: fahrenheitData,
//         backgroundColor: fahrenheitData.map(temp => 
//           temp >= 97 && temp <= 99 
//             ? "rgba(34, 197, 94, 0.7)" 
//             : "rgba(239, 68, 68, 0.7)"
//         ),
//         hoverBackgroundColor: fahrenheitData.map(temp => 
//           temp >= 97 && temp <= 99 
//             ? "rgba(34, 197, 94, 1)" 
//             : "rgba(239, 68, 68, 1)"
//         ),
//         borderRadius: 2,
//       },
//     ],
//   }), [bardata, fahrenheitData]);

//   const options = useMemo(() => ({
//     responsive: true,
//     maintainAspectRatio: false,
//     layout: { padding: { bottom: 40, right: 10 } },
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//       tooltip: {
//         backgroundColor: "rgba(0, 0, 0, 0.8)",
//         padding: 12,
//         titleFont: { size: 13, weight: "600" },
//         bodyFont: { size: 12 },
//         callbacks: {
//           title: ctx => {
//             const date = bardata[ctx[0].dataIndex].testDateTime;
//             return new Date(date).toLocaleDateString('en-US', { 
//               month: 'short', 
//               day: 'numeric',
//               year: 'numeric'
//             });
//           },
//           label: ctx => {
//             const temp = ctx.parsed.y.toFixed(2);
//             const status = ctx.parsed.y >= 97 && ctx.parsed.y <= 99 ? "✓ In Range" : "⚠ Out of Range";
//             return [`Temperature: ${temp}°F`, status];
//           }
//         }
//       }
//     },
//     scales: {
//       x: { 
//         ticks: { display: false },
//         grid: { display: false }
//       },
//       y: {
//         position: "right",
//         beginAtZero: false,
//         min: minval,
//         max: maxval,
//         grid: {
//           color: "rgba(0, 0, 0, 0.05)",
//           drawBorder: false,
//         },
//         ticks: {
//           stepSize: step,
//           padding: 8,
//           font: { size: 11 },
//           color: "#666",
//           callback: value => `${value.toFixed(1)}°F`
//         }
//       }
//     }
//   }), [minval, maxval, step, bardata]);

//   // Get Y-axis tick values from the chart
//   const getYAxisTicks = () => {
//     if (!chartRef.current?.scales?.y) return [];
    
//     const yScale = chartRef.current.scales.y;
//     const ticks = yScale.ticks || [];
    
//     return ticks.map(tick => ({
//       value: tick.value,
//       label: `${tick.value.toFixed(1)}°F`,
//       pixelPosition: yScale.getPixelForValue(tick.value)
//     }));
//   };

//   // Helper function to get pixel position for specific value
//   const yScaleForValue = (val) => {
//     return chartRef.current?.scales?.y?.getPixelForValue(val) ?? 0;
//   };

//   const [yAxisTicks, setYAxisTicks] = useState([]);
//   const [minRangePosition, setMinRangePosition] = useState(0);
//   const [maxRangePosition, setMaxRangePosition] = useState(0);

//   useEffect(() => {
//     // Update Y-axis ticks and range positions after chart renders
//     const timer = setTimeout(() => {
//       setYAxisTicks(getYAxisTicks());
//       setMinRangePosition(yScaleForValue(97));
//       setMaxRangePosition(yScaleForValue(99));
//     }, 100);
    
//     return () => clearTimeout(timer);
//   }, [data, options]);

//   const inRangePercentage = ((inRangeCount / totalBars) * 100).toFixed(1);

//   return (
//     <Layout>
//       <Box>
//         <Container maxWidth="xl">
//           <Paper elevation={3} sx={{ borderRadius: 3, p: 4, backgroundColor: "white", maxWidth: "1200px" }}>
//             {/* Header with Stats */}
//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h4" fontWeight="700" color="text.primary" gutterBottom>
//                 Temperature Monitoring Dashboard
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                 Real-time temperature readings and analytics
//               </Typography>

//               {/* Stats Cards */}
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                 <Chip 
//                   label={`Total Readings: ${totalBars}`}
//                   sx={{ 
//                     px: 1, 
//                     fontWeight: 600,
//                     backgroundColor: "#f3f4f6",
//                     fontSize: "13px"
//                   }}
//                 />
//                 <Chip 
//                   label={`Avg Temp: ${avgTemp}°F`}
//                   sx={{ 
//                     px: 1, 
//                     fontWeight: 600,
//                     backgroundColor: "#dbeafe",
//                     color: "#1e40af",
//                     fontSize: "13px"
//                   }}
//                 />
//                 <Chip 
//                   label={`In Range: ${inRangeCount} (${inRangePercentage}%)`}
//                   sx={{ 
//                     px: 1, 
//                     fontWeight: 600,
//                     backgroundColor: "#dcfce7",
//                     color: "#166534",
//                     fontSize: "13px"
//                   }}
//                 />
//                 <Chip 
//                   label={`Target Range: 97-99°F`}
//                   sx={{ 
//                     px: 1, 
//                     fontWeight: 600,
//                     backgroundColor: "#fef3c7",
//                     color: "#92400e",
//                     fontSize: "13px"
//                   }}
//                 />
//               </Box>
//             </Box>

//             <Box
//               sx={{
//                 position: "relative",
//                 display: "flex",
//                 width: "100%",
//                 borderRadius: 2,
//                 bgcolor: "#fafafa",
//                 border: "1px solid #e5e7eb",
//               }}
//             >
//               {/* Sticky Y-Axis Labels on Right */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   right: 8,
//                   top: 16,
//                   bottom: 56,
//                   width: "70px",
//                   zIndex: 10,
//                   pointerEvents: "none",
//                 }}
//               >
//                 {yAxisTicks.map((tick, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       position: "absolute",
//                       top: `${tick.pixelPosition}px`,
//                       transform: "translateY(-50%)",
//                       backgroundColor: "rgba(255, 255, 255, 0.98)",
//                       px: 1,
//                       py: 0.3,
//                       borderRadius: 0.5,
//                       fontSize: "11px",
//                       fontWeight: 600,
//                       color: "#374151",
//                       boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
//                       border: "1px solid rgba(0,0,0,0.08)",
//                     }}
//                   >
//                     {tick.label}
//                   </Box>
//                 ))}
//               </Box>

//               {/* Max Range Label - Above max line */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   right: 90,
//                   top: `${maxRangePosition - 8}px`,
//                   zIndex: 11,
//                   pointerEvents: "none",
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     background: "linear-gradient(135deg, #166534 0%, #22c55e 100%)",
//                     color: "white",
//                     borderRadius: "6px",
//                     px: 1.5,
//                     py: 0.5,
//                     fontSize: "11px",
//                     fontWeight: 700,
//                     boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
//                     whiteSpace: "nowrap",
//                     letterSpacing: "0.3px",
//                   }}
//                 >
//                   ↑ MAX: 99°F
//                 </Typography>
//               </Box>

//               {/* Min Range Label - Below min line */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   right: 90,
//                   top: `${minRangePosition + 20}px`,
//                   zIndex: 11,
//                   pointerEvents: "none",
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     background: "linear-gradient(135deg, #166534 0%, #22c55e 100%)",
//                     color: "white",
//                     borderRadius: "6px",
//                     px: 1.5,
//                     py: 0.5,
//                     fontSize: "11px",
//                     fontWeight: 700,
//                     boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
//                     whiteSpace: "nowrap",
//                     letterSpacing: "0.3px",
//                   }}
//                 >
//                   ↓ MIN: 97°F
//                 </Typography>
//               </Box>

//               <Box
//                 ref={containerRef}
//                 sx={{
//                   overflowX: "auto",
//                   width: "100%",
//                   p: 2,
//                   scrollbarWidth: "thin",
//                   scrollbarColor: "rgba(0,0,0,0.2) transparent",
//                   "&::-webkit-scrollbar": {
//                     height: "6px",
//                   },
//                   "&::-webkit-scrollbar-track": {
//                     background: "transparent",
//                   },
//                   "&::-webkit-scrollbar-thumb": {
//                     backgroundColor: "rgba(0,0,0,0.2)",
//                     borderRadius: "3px",
//                     "&:hover": {
//                       backgroundColor: "rgba(0,0,0,0.3)",
//                     }
//                   },
//                   position: "relative",
//                 }}
//               >
//                 <Box sx={{ 
//                   width: `${chartWidth}px`,
//                   height: 420,
//                   position: "relative"
//                 }}>
//                   <Bar ref={chartRef} data={data} options={options} />
//                 </Box>
//               </Box>
//             </Box>

//             {/* Legend */}
//             <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 3 }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Box sx={{ 
//                   width: 16, 
//                   height: 16, 
//                   borderRadius: 0.5, 
//                   backgroundColor: "rgba(34, 197, 94, 0.7)" 
//                 }} />
//                 <Typography variant="body2" color="text.secondary" fontSize="12px">
//                   Within Range (97-99°F)
//                 </Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Box sx={{ 
//                   width: 16, 
//                   height: 16, 
//                   borderRadius: 0.5, 
//                   backgroundColor: "rgba(239, 68, 68, 0.7)" 
//                 }} />
//                 <Typography variant="body2" color="text.secondary" fontSize="12px">
//                   Out of Range
//                 </Typography>
//               </Box>
//             </Box>
//           </Paper>
//         </Container>
//       </Box>
//     </Layout>
//   );
// }











// "use client";

// import React, { useRef, useEffect, useState, useMemo } from "react";
// import bardata from '../constant/bardata.json';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { Box, Container, Button, ButtonGroup, Paper, Typography } from "@mui/material";
// import Layout from "../component/Layout";


// const stickyLabelPlugin = {
//   id: "stickyLabels",
//   afterDraw: (chart) => {
//     const ctx = chart.ctx;
//     const xAxis = chart.scales.x;

//     if (!xAxis || !xAxis.ticks) return;

//     ctx.save();

//     ctx.font = "12px Arial";
//     ctx.fillStyle = "black";
//     ctx.textAlign = "right";
//     ctx.textBaseline = "middle";

//     const labelCount = xAxis.ticks.length;


//     // Dynamic skip interval based on label count
//     const skipInterval =
//       labelCount > 50 ? 2 :
//       labelCount < 30 ? 1 : 1;
    
//     xAxis.ticks.forEach((tick, index) => {
//       if (index % skipInterval !== 0) return;

//       const x = xAxis.getPixelForTick(index);
//       const y = chart.chartArea.bottom + 7;
//       const label = tick.label || "";

//       ctx.save();
//       ctx.translate(x, y);
//       ctx.rotate(-Math.PI / 4); // Rotate labels for better fit

//       // Draw label
//       ctx.fillText(label, 0, 0);
//       ctx.restore();
//     });

//     ctx.restore();
//   },
// };

// const rangeLinePlugin = {
//   id: "rangeLines",
//   afterDraw: (chart) => {
//     const ctx = chart.ctx;
//     const yScale = chart.scales.y;

//     const minValue = 97;
//     const maxValue = 99;

//     const minY = yScale.getPixelForValue(minValue);
//     const maxY = yScale.getPixelForValue(maxValue);

//     ctx.save();

//     const gradient = ctx.createLinearGradient(0, maxY, 0, minY);
//     ctx.fillStyle = gradient;
//     ctx.fillRect(
//       chart.chartArea.left,
//       maxY,
//       chart.chartArea.right - chart.chartArea.left,
//       minY - maxY
//     );

//     ctx.strokeStyle = "#000000";
//     ctx.lineWidth = 1;
//     ctx.setLineDash([8, 4]);

//     ctx.beginPath();
//     ctx.moveTo(chart.chartArea.left, minY);
//     ctx.lineTo(chart.chartArea.right, minY);
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.moveTo(chart.chartArea.left, maxY);
//     ctx.lineTo(chart.chartArea.right, maxY);
//     ctx.stroke();

//     ctx.restore();

//     ctx.save();

//     const badgePadding = 2;
//     const badgeHeight = 22;
//     const badgeRadius = 4;

//     const drawBadge = (label, y, offsetY = 0) => {
//       ctx.font = "300 14px Arial";
//       const textWidth = ctx.measureText(label).width;
//       const x = chart.chartArea.left;

//       ctx.fillStyle = "#000";
//       ctx.shadowColor = "rgba(0,0,0,0.3)";
//       ctx.shadowBlur = 4;
//       ctx.shadowOffsetX = 1;
//       ctx.shadowOffsetY = 1;

//       ctx.beginPath();
//       if (ctx.roundRect) {
//         ctx.roundRect(x, y - badgeHeight / 2 + offsetY, textWidth + badgePadding * 2, badgeHeight, badgeRadius);
//       } else {
//         ctx.rect(x, y - badgeHeight / 2 + offsetY, textWidth + badgePadding * 2, badgeHeight);
//       }
//       ctx.fill();

//       ctx.fillStyle = "#fff";
//       ctx.shadowColor = "transparent";
//       ctx.textBaseline = "middle";
//       ctx.fillText(label, x + badgePadding, y + offsetY);
//     };


//     // drawBadge(" Min Range (97°F) ", minY,badgeHeight );
//     // drawBadge(" Max: Range (99°F) ", maxY,  -badgeHeight);

//     ctx.restore();
//   }
// };

// ChartJS.register(CategoryScale, LinearScale, BarElement, stickyLabelPlugin, Title, Tooltip, Legend, rangeLinePlugin);

// export default function Chart() {
//   const visibleBars = 55;
//   const totalBars = bardata.length;

//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);

//   // Resize handler
//   useEffect(() => {
//     const handleResize = () => {
//       if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const barWidth = containerWidth > 0 ? containerWidth / visibleBars : 100;
//   const chartWidth = barWidth * totalBars;

//   // Helper: Convert Celsius → Fahrenheit
//   const convertToFahrenheit = (celsius) => (celsius * 9 / 5 + 32);

//   // Memoized calculations
//   const { fahrenheitData, maxval, minval, step, customLabels } = useMemo(() => {
//     const fahrenheitData = bardata.map(item => parseFloat(convertToFahrenheit(item.calibratedReading).toFixed(2)));

//     const maxReading = Math.max(...fahrenheitData);
//     const minReading = Math.min(...fahrenheitData);

//     const minval = minReading - 20;
//     const maxval = maxReading + 5;

//     const numberOfLabels = 5;
//     const step = (maxReading - minReading + 40) / (numberOfLabels-1);

//     const customLabels = Array.from({ length: numberOfLabels }, (_, i) =>
//       parseFloat((minReading + step * i).toFixed(2))
//     );
    

//     return { fahrenheitData, maxval, minval, step, customLabels };
//   }, [bardata]);

//   const data = useMemo(() => ({
//     //labels: bardata.map((_, i) => `sep${i + 1}`),
//      labels: bardata.map(item => {
//     const date = new Date(item.testDateTime);
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const month = monthNames[date.getMonth()];
//     const day = date.getDate();
//     return `${month} ${day}`;
//   }),
//     datasets: [
//       {
//         label: "",
//         data: fahrenheitData,
//         backgroundColor: "rgba(59, 130, 246, 0.85)",
//         hoverBackgroundColor: "rgba(59, 130, 246, 1)",
//       },
//     ],
//   }), [bardata, fahrenheitData]);

//   const options = useMemo(() => ({
//     responsive: true,
//     maintainAspectRatio: false,
//     layout: { padding: { bottom: 30 } },
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//       tooltip: {
//         callbacks: {
//           label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} °F`
//         }
//       }
//     },
//     scales: {
//       x: { ticks: { display: false } },
//       y: {
//         // position: "right",
//         beginAtZero: false,
//         min: minval,
//         max: maxval,
//         ticks: {
//           stepSize: step,
//           callback: value => `${value.toFixed(2)} °F`
//         }
//       }
//     }
//   }), [minval, maxval, step]);


//   const chartRef = useRef();

// <Bar ref={chartRef} data={data} options={options} />

// // helper
// const yScaleForValue = (val) =>
//   chartRef.current?.scales?.y?.getPixelForValue(val) ?? 0;


//   return (
//     <Layout>
//       <Box>
//         <Container maxWidth="xl">
//           <Paper elevation={8} sx={{ borderRadius: 5, p: 4, backgroundColor: "white", width: "1084px" }}>

//             {/* Header */}
//             <Box sx={{ ml: 30, mb: 4 }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
//                 <Typography variant="h3" fontWeight="bold" color="text.primary">
//                   Temperature Monitoring
//                 </Typography>
//               </Box>
//               <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
//                 Real-time temperature readings and analytics
//               </Typography>
//             </Box>

//             {/* <Box sx={{ position: "relative", display:"flex", width: "100%", borderRadius: 3, bgcolor: "#fafafa" }}>
//               <Box
//                 ref={containerRef}
//                 sx={{
//                   overflowX: "auto",
//                   width: "100%",
//                   p: 2,
//                   scrollbarWidth: "none",
//                   msOverflowStyle: "none",
//                   "&::-webkit-scrollbar": { display: "none" },
//                 }}
//               >
//                 <Box sx={{ width: `${chartWidth}px`, height: 400 }}>
//                   <Bar data={data} options={options} />
//                 </Box>
//               </Box>
//             </Box> */}


//           <Box
//               sx={{
//                 position: "relative",
//                 display: "flex",
//                 width: "100%",
//                 borderRadius: 3,
//                 bgcolor: "#fafafa",
//               }}
//             >
//             <Box
//               ref={containerRef}
//               sx={{
//                 overflowX: "auto",
//                 width: "100%",
//                 p: 2,
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//                 "&::-webkit-scrollbar": { display: "none" },
//               }}
//             >
//               <Box sx={{ 
//                 width: `${chartWidth}px`,
//                 height: 400,
//                 position: "relative"
//               }}>

//                 <Bar data={data} options={options} />

//                 {/* <Typography
//                   sx={{
//                     position: "sticky",
//                     left: 870,
//                     width:"130px",
//                     top: `${yScaleForValue(97)}px`, 
//                     background: "black",
//                     color: "white",
//                     borderRadius: "4px",
//                     px: 1,
//                     py: 0.5,
//                     fontSize: "12px",
                    
//                     marginTop:"-260px",
//                   }}
//                 >
//                   Min Range (97°F)
//                 </Typography>

//                 <Typography
//                   sx={{
//                     position: "sticky",
//                     width:"130px",
//                     left: 870,
//                     top: `${yScaleForValue(99)}px`,
//                     background: "black",
//                     color: "white",
//                     borderRadius: "4px",
//                     px: 1,
//                     py: 0.5,
//                     fontSize: "12px",
//                     marginTop:"-69px",
//                   }}
//                 >
//                   Max Range (99°F)
//                 </Typography> */}

//               </Box>
//             </Box>
//           </Box>




//           </Paper>
//         </Container>
//       </Box>
//     </Layout>
//   );
// }
















// "use client";

// import React, { useRef, useEffect, useState, useMemo } from "react";
// import bardata from '../constant/bardata.json';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { Box, Container, Button, ButtonGroup, Paper, Typography } from "@mui/material";
// import Layout from "../component/Layout";


// const stickyLabelPlugin = {
//   id: "stickyLabels",
//   afterDraw: (chart) => {
//     const ctx = chart.ctx;
//     const xAxis = chart.scales.x;

//     if (!xAxis || !xAxis.ticks) return;

//     ctx.save();

//     ctx.font = "12px Arial";
//     ctx.fillStyle = "black";
//     ctx.textAlign = "right";
//     ctx.textBaseline = "middle";

//     const labelCount = xAxis.ticks.length;

//     // Dynamic skip interval based on label count
//     const skipInterval =
//       labelCount > 50 ? 2 :
//       labelCount < 30 ? 1 : 1;
    
//     xAxis.ticks.forEach((tick, index) => {
//       if (index % skipInterval !== 0) return;

//       const x = xAxis.getPixelForTick(index);
//       const y = chart.chartArea.bottom + 7;
//       const label = tick.label || "";

//       ctx.save();
//       ctx.translate(x, y);
//       ctx.rotate(-Math.PI / 4);

//       ctx.fillText(label, 0, 0);
//       ctx.restore();
//     });

//     ctx.restore();
//   },
// };

// const rangeLinePlugin = {
//   id: "rangeLines",
//   afterDraw: (chart) => {
//     const ctx = chart.ctx;
//     const yScale = chart.scales.y;

//     const minValue = 97;
//     const maxValue = 99;

//     const minY = yScale.getPixelForValue(minValue);
//     const maxY = yScale.getPixelForValue(maxValue);

//     ctx.save();

//     const gradient = ctx.createLinearGradient(0, maxY, 0, minY);
//     ctx.fillStyle = gradient;
//     ctx.fillRect(
//       chart.chartArea.left,
//       maxY,
//       chart.chartArea.right - chart.chartArea.left,
//       minY - maxY
//     );

//     ctx.strokeStyle = "#000000";
//     ctx.lineWidth = 1;
//     ctx.setLineDash([8, 4]);

//     ctx.beginPath();
//     ctx.moveTo(chart.chartArea.left, minY);
//     ctx.lineTo(chart.chartArea.right, minY);
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.moveTo(chart.chartArea.left, maxY);
//     ctx.lineTo(chart.chartArea.right, maxY);
//     ctx.stroke();

//      // drawBadge(" Min Range (97°F) ", minY,badgeHeight );
//      // drawBadge(" Max: Range (99°F) ", maxY,  -badgeHeight);

//     ctx.restore();
//   }
// };

// ChartJS.register(CategoryScale, LinearScale, BarElement, stickyLabelPlugin, Title, Tooltip, Legend, rangeLinePlugin);

// export default function Chart() {
//   const visibleBars = 55;
//   const totalBars = bardata.length;

//   const containerRef = useRef(null);
//   const chartRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   // Resize handler
//   useEffect(() => {
//     const handleResize = () => {
//       if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Scroll handler
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       setScrollLeft(container.scrollLeft);
//     };

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//   const barWidth = containerWidth > 0 ? containerWidth / visibleBars : 100;
//   const chartWidth = barWidth * totalBars;

//   // Helper: Convert Celsius → Fahrenheit
//   const convertToFahrenheit = (celsius) => (celsius * 9 / 5 + 32);

//   // Memoized calculations
//   const { fahrenheitData, maxval, minval, step, customLabels } = useMemo(() => {
//     const fahrenheitData = bardata.map(item => parseFloat(convertToFahrenheit(item.calibratedReading).toFixed(2)));

//     const maxReading = Math.max(...fahrenheitData);
//     const minReading = Math.min(...fahrenheitData);

//     const minval = minReading - 20;
//     const maxval = maxReading + 5;

//     const numberOfLabels = 5;
//     const step = (maxReading - minReading + 40) / (numberOfLabels - 1);

//     const customLabels = Array.from({ length: numberOfLabels }, (_, i) =>
//       parseFloat((minReading + step * i).toFixed(2))
//     );

//     return { fahrenheitData, maxval, minval, step, customLabels };
//   }, [bardata]);

//   const data = useMemo(() => ({
//     labels: bardata.map(item => {
//       const date = new Date(item.testDateTime);
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       const month = monthNames[date.getMonth()];
//       const day = date.getDate();
//       return `${month} ${day}`;
//     }),
//     datasets: [
//       {
//         label: "",
//         data: fahrenheitData,
//         backgroundColor: "rgba(59, 130, 246, 0.85)",
//         hoverBackgroundColor: "rgba(59, 130, 246, 1)",
//       },
//     ],
//   }), [bardata, fahrenheitData]);

//   const options = useMemo(() => ({
//     responsive: true,
//     maintainAspectRatio: false,
//     layout: { padding: { bottom: 30, left: 80 } }, // Add left padding for sticky labels
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//       tooltip: {
//         callbacks: {
//           label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} °F`
//         }
//       }
//     },
//     scales: {
//       x: { ticks: { display: false } },
//       y: {
//         beginAtZero: false,
//         min: minval,
//         max: maxval,
//         ticks: {
//           stepSize: step,
//           callback: value => `${value.toFixed(2)} °F`,
//           display: false
//         }
//       }
//     }
//   }), [minval, maxval, step]);

//   // Get Y-axis tick values from the chart
//   const getYAxisTicks = () => {
//     if (!chartRef.current?.scales?.y) return [];
    
//     const yScale = chartRef.current.scales.y;
//     const ticks = yScale.ticks || [];
    
//     return ticks.map(tick => ({
//       value: tick.value,
//       label: `${tick.value.toFixed(2)} °F`,
//       pixelPosition: yScale.getPixelForValue(tick.value)
//     }));
//   };

//   const [yAxisTicks, setYAxisTicks] = useState([]);

//   useEffect(() => {
//     // Update Y-axis ticks after chart renders
//     const timer = setTimeout(() => {
//       setYAxisTicks(getYAxisTicks());
//     }, 100);
    
//     return () => clearTimeout(timer);
//   }, [data, options]);

//   return (
//     <Layout>
//       <Box>
//         <Container maxWidth="xl">
//           <Paper elevation={8} sx={{ borderRadius: 5, p: 4, backgroundColor: "white", width: "1084px" }}>
//             {/* Header */}
//             <Box sx={{ ml: 30, mb: 4 }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
//                 <Typography variant="h3" fontWeight="bold" color="text.primary">
//                   Temperature Monitoring
//                 </Typography>
//               </Box>
//               <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
//                 Real-time temperature readings and analytics
//               </Typography>
//             </Box>

//             <Box
//               sx={{
//                 position: "relative",
//                 display: "flex",
//                 width: "100%",
//                 borderRadius: 3,
//                 bgcolor: "#fafafa",
//               }}
//             >
//               {/* Sticky Y-Axis Labels */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   right: -16,
//                   top: 16,
//                   bottom: 46,
//                   width: "70px",
//                   zIndex: 10,
//                   pointerEvents: "none",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 {yAxisTicks.map((tick, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       position: "absolute",
//                       top: `${tick.pixelPosition}px`,
//                       transform: "translateY(-50%)",
//                       backgroundColor: "rgba(255, 255, 255, 0.95)",
//                       px: 1,
//                       py: 0.5,
//                       borderRadius: 1,
//                       fontSize: "12px",
//                       fontWeight: 500,
//                       color: "text.primary",
//                       boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                       border: "1px solid rgba(0,0,0,0.1)",
//                     }}
//                   >
//                     {tick.label}
//                   </Box>
//                 ))}
//               </Box>

//               <Box
//                 ref={containerRef}
//                 sx={{
//                   overflowX: "auto",
//                   width: "94%",
//                   p: 2,
//                   scrollbarWidth: "none",
//                   msOverflowStyle: "auto",
//                   "&::-webkit-scrollbar": {
//                     height: "8px",
//                   },
//                   "&::-webkit-scrollbar-thumb": {
//                     backgroundColor: "rgba(0,0,0,0.2)",
//                     borderRadius: "4px",
//                   },
//                 }}
//               >
//                 <Box sx={{ 
//                   width: `${chartWidth}px`,
//                   height: 400,
//                   position: "relative"
//                 }}>
//                   <Bar ref={chartRef} data={data} options={options} />
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>
//         </Container>
//       </Box>
//     </Layout>
//   );
// }

























// "use client";

// import React, { useRef, useEffect, useState, useMemo } from "react";
// import bardata from '../constant/bardata.json';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { Box, Container, Button, ButtonGroup, Paper, Typography } from "@mui/material";
// import Layout from "../component/Layout";


// const stickyLabelPlugin = {
//   id: "stickyLabels",
//   afterDraw: (chart) => {
//     const ctx = chart.ctx;
//     const xAxis = chart.scales.x;

//     if (!xAxis || !xAxis.ticks) return;

//     ctx.save();

//     ctx.font = "12px Arial";
//     ctx.fillStyle = "black";
//     ctx.textAlign = "right";
//     ctx.textBaseline = "middle";

//     const labelCount = xAxis.ticks.length;

//     // Dynamic skip interval based on label count
//     const skipInterval =
//       labelCount > 50 ? 2 :
//       labelCount < 30 ? 1 : 1;
    
//     xAxis.ticks.forEach((tick, index) => {
//       if (index % skipInterval !== 0) return;

//       const x = xAxis.getPixelForTick(index);
//       const y = chart.chartArea.bottom + 7;
//       const label = tick.label || "";

//       ctx.save();
//       ctx.translate(x, y);
//       ctx.rotate(-Math.PI / 4);

//       ctx.fillText(label, 0, 0);
//       ctx.restore();
//     });

//     ctx.restore();
//   },
// };

// const rangeLinePlugin = {
//   id: "rangeLines",
//   afterDraw: (chart) => {
//     const ctx = chart.ctx;
//     const yScale = chart.scales.y;

//     const minValue = 97;
//     const maxValue = 99;

//     const minY = yScale.getPixelForValue(minValue);
//     const maxY = yScale.getPixelForValue(maxValue);

//     ctx.save();

//     const gradient = ctx.createLinearGradient(0, maxY, 0, minY);
//     ctx.fillStyle = gradient;
//     ctx.fillRect(
//       chart.chartArea.left,
//       maxY,
//       chart.chartArea.right - chart.chartArea.left,
//       minY - maxY
//     );

//     ctx.strokeStyle = "#000000";
//     ctx.lineWidth = 1;
//     ctx.setLineDash([8, 4]);

//     ctx.beginPath();
//     ctx.moveTo(chart.chartArea.left, minY);
//     ctx.lineTo(chart.chartArea.right, minY);
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.moveTo(chart.chartArea.left, maxY);
//     ctx.lineTo(chart.chartArea.right, maxY);
//     ctx.stroke();

//     ctx.restore();
//   }
// };

// ChartJS.register(CategoryScale, LinearScale, BarElement, stickyLabelPlugin, Title, Tooltip, Legend, rangeLinePlugin);

// export default function Chart() {
//   const visibleBars = 55;
//   const totalBars = bardata.length;

//   const containerRef = useRef(null);
//   const chartRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   // Resize handler
//   useEffect(() => {
//     const handleResize = () => {
//       if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Scroll handler
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       setScrollLeft(container.scrollLeft);
//     };

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//   const barWidth = containerWidth > 0 ? containerWidth / visibleBars : 100;
//   const chartWidth = barWidth * totalBars;

//   // Helper: Convert Celsius → Fahrenheit
//   const convertToFahrenheit = (celsius) => (celsius * 9 / 5 + 32);

//   // Memoized calculations
//   const { fahrenheitData, maxval, minval, step, customLabels } = useMemo(() => {
//     const fahrenheitData = bardata.map(item => parseFloat(convertToFahrenheit(item.calibratedReading).toFixed(2)));

//     const maxReading = Math.max(...fahrenheitData);
//     const minReading = Math.min(...fahrenheitData);

//     const minval = minReading - 20;
//     const maxval = maxReading + 5;

//     const numberOfLabels = 5;
//     const step = (maxReading - minReading + 40) / (numberOfLabels - 1);

//     const customLabels = Array.from({ length: numberOfLabels }, (_, i) =>
//       parseFloat((minReading + step * i).toFixed(2))
//     );

//     return { fahrenheitData, maxval, minval, step, customLabels };
//   }, [bardata]);

//   const data = useMemo(() => ({
//     labels: bardata.map(item => {
//       const date = new Date(item.testDateTime);
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       const month = monthNames[date.getMonth()];
//       const day = date.getDate();
//       return `${month} ${day}`;
//     }),
//     datasets: [
//       {
//         label: "",
//         data: fahrenheitData,
//         backgroundColor: "rgba(59, 130, 246, 0.85)",
//         hoverBackgroundColor: "rgba(59, 130, 246, 1)",
//       },
//     ],
//   }), [bardata, fahrenheitData]);

//   const options = useMemo(() => ({
//     responsive: true,
//     maintainAspectRatio: false,
//     layout: { padding: { bottom: 30 } },
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//       tooltip: {
//         callbacks: {
//           label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} °F`
//         }
//       }
//     },
//     scales: {
//       x: { ticks: { display: false } },
//       y: {
//         position: "right",
//         beginAtZero: false,
//         min: minval,
//         max: maxval,
//         ticks: {
//           stepSize: step,
//           callback: value => `${value.toFixed(2)} °F`
//         }
//       }
//     }
//   }), [minval, maxval, step]);

//   // Get Y-axis tick values from the chart
//   const getYAxisTicks = () => {
//     if (!chartRef.current?.scales?.y) return [];
    
//     const yScale = chartRef.current.scales.y;
//     const ticks = yScale.ticks || [];
    
//     return ticks.map(tick => ({
//       value: tick.value,
//       label: `${tick.value.toFixed(2)} °F`,
//       pixelPosition: yScale.getPixelForValue(tick.value)
//     }));
//   };

//   // Helper function to get pixel position for specific value
//   const yScaleForValue = (val) => {
//     return chartRef.current?.scales?.y?.getPixelForValue(val) ?? 0;
//   };

//   const [yAxisTicks, setYAxisTicks] = useState([]);
//   const [minRangePosition, setMinRangePosition] = useState(0);
//   const [maxRangePosition, setMaxRangePosition] = useState(0);

//   useEffect(() => {
//     // Update Y-axis ticks and range positions after chart renders
//     const timer = setTimeout(() => {
//       setYAxisTicks(getYAxisTicks());
//       setMinRangePosition(yScaleForValue(97));
//       setMaxRangePosition(yScaleForValue(99));
//     }, 100);
    
//     return () => clearTimeout(timer);
//   }, [data, options]);

//   return (
//     <Layout>
//       <Box>
//         <Container maxWidth="xl">
//           <Paper elevation={8} sx={{ borderRadius: 5, p: 4, backgroundColor: "white", width: "1084px" }}>
//             {/* Header */}
//             <Box sx={{ ml: 30, mb: 4 }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
//                 <Typography variant="h3" fontWeight="bold" color="text.primary">
//                   Temperature Monitoring
//                 </Typography>
//               </Box>
//               <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
//                 Real-time temperature readings and analytics
//               </Typography>
//             </Box>

//             <Box
//               sx={{
//                 position: "relative",
//                 display: "flex",
//                 width: "100%",
//                 borderRadius: 3,
//                 bgcolor: "#fafafa",
//               }}
//             >
//               {/* Sticky Y-Axis Labels on Right */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   right: 16,
//                   top: 16,
//                   bottom: 46,
//                   width: "80px",
//                   zIndex: 10,
//                   pointerEvents: "none",
//                 }}
//               >
//                 {yAxisTicks.map((tick, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       position: "absolute",
//                       top: `${tick.pixelPosition}px`,
//                       transform: "translateY(-50%)",
//                       backgroundColor: "rgba(255, 255, 255, 0.95)",
//                       px: 1,
//                       py: 0.5,
//                       borderRadius: 1,
//                       fontSize: "12px",
//                       fontWeight: 500,
//                       color: "text.primary",
//                       boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                       border: "1px solid rgba(0,0,0,0.1)",
//                     }}
//                   >
//                     {tick.label}
//                   </Box>
//                 ))}
//               </Box>

//               <Box
//                 ref={containerRef}
//                 sx={{
//                   overflowX: "auto",
//                   width: "100%",
//                   p: 2,
//                   scrollbarWidth: "none",
//                   msOverflowStyle: "none",
//                   "&::-webkit-scrollbar": { display: "none" },
//                 }}
//               >
//                 <Box sx={{ 
//                   width: `${chartWidth}px`,
//                   height: 400,
//                   position: "relative"
//                 }}>
//                   <Bar ref={chartRef} data={data} options={options} />

//                   {/* Max Range Label - Above the max line */}
//                   <Typography
//                     sx={{
//                       position: "sticky",
//                       left: 120,
//                       width: "140px",
//                       background: "black",
//                       color: "white",
//                       borderRadius: "4px",
//                       px: 1,
//                       py: 0.5,
//                       fontSize: "12px",
//                       top: `${maxRangePosition - 30}px`,
//                       transform: "translateX(100%)",
//                       zIndex: 5,
//                     }}
//                   >
//                     Max Range (99°F)
//                   </Typography>

//                   {/* Min Range Label - Below the min line */}
//                   <Typography
//                     sx={{
//                       position: "absolute",
//                       left: 120,
//                       width: "140px",
//                       background: "black",
//                       color: "white",
//                       borderRadius: "4px",
//                       px: 1,
//                       py: 0.5,
//                       fontSize: "12px",
//                       top: `${minRangePosition + 8}px`,
//                       transform: "translateX(100%)",
//                       zIndex: 5,
//                     }}
//                   >
//                     Min Range (97°F)
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>
//         </Container>
//       </Box>
//     </Layout>
//   );
// }













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















// // ProfileForm.jsx
// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   Button,
//   Typography,
//   Avatar,
//   Stepper,
//   Step,
//   StepLabel,
//   InputAdornment,
//   FormControlLabel,
//   Switch,
//   Paper,
//   Card,
//   CardContent,
//   Grid,
//   Slider,
//   ButtonGroup,
//   FormLabel,
//   RadioGroup,
//   Radio
// } from '@mui/material';
// import Layout from '../component/Layout';
// import CustomToggles from '../component/CustomToggle';
// import CustomStepper from '../component/CustomStepper';
// import ProfileStepOne from '../component/ProfileForm';
// import CustomTextField from '../component/CustomTextField';
// import GenderSelector from '../component/GenderSelector';
// import NextButton from '../component/CustomButton';
// import BackButton from '../component/BackButton';
// import AgeSection from '../component/AgeSection';
// import WeightSelector from '../component/WeightSelector';
// import HeightSelector from '../component/HeightSelector';
// import CustomButton from '../component/CustomButton';


// // Indian Flag Component
// const IndianFlag = () => (
//   <Box
//     component="svg"
//     viewBox="0 0 225 150"
//     sx={{ width: 30, height: 20, mr: 1 }}
//   >
//     <rect fill="#FF9933" width="225" height="50" />
//     <rect fill="#FFF" y="50" width="225" height="50" />
//     <rect fill="#138808" y="100" width="225" height="50" />
//     <circle fill="#000080" cx="112.5" cy="75" r="20" />
//   </Box>
// );

// // Main Component
// export default function ProfileForm() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({
//     title: 'Mr.',
//     phoneNumber:"",
//     firstName: '',
//     lastName: '',
//     isMarried: false,
//     hasDiabetes: false,
//     hasHypertension: false,
//     addressType: 'Register',
//     zipCode: '',
//     city: '',
//     state: '',
//     country: '',
//     address1: '',
//     address2: '',
//     gender: '',
//     birthdate: '',
//     age: '',
//     weightUnit: 'kg',
//     weight: 50,
//     heightUnit: 'cm',
//     height: 2,
//     bloodGroup: "",
//   });

//   const [errors, setErrors] = useState({
//     zipCode: false
//   });

//   const steps = ['1', '2', '3', '4', '5', '6', '7'];

//   const validateStep = () => {
//     if (activeStep === 1) {
//       if (!formData.zipCode) {
//         setErrors({ zipCode: true });
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleNext = () => {
//     if (validateStep() && activeStep < steps.length - 1) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//       setErrors({ zipCode: false });
//     }
//   };

//   const handleBack = () => {
//     if (activeStep > 0) {
//       setActiveStep((prevActiveStep) => prevActiveStep - 1);
//       setErrors({ zipCode: false });
//     }
//   };

//   const handleTitleChange = (event) => {
//     setFormData({
//       ...formData,
//       title: event.target.value
//     });
//   };

//   const handleAddressTypeChange = (event) => {
//     setFormData({
//       ...formData,
//       addressType: event.target.value
//     });
//   };

//   const handleInputChange = (field) => (event) => {
//     setFormData({
//       ...formData,
//       [field]: event.target.value
//     });
//     if (field === 'zipCode' && errors.zipCode) {
//       setErrors({ zipCode: false });
//     }
//   };

//   const calculateAge = (birthdate) => {
//     const today = new Date();
//     const birth = new Date(birthdate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const monthDiff = today.getMonth() - birth.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//       age--;
//     }
    
//     return age;
//   };

//   const handleBirthdateChange = (event) => {
//     const birthdate = event.target.value;
//     const calculatedAge = birthdate ? calculateAge(birthdate) : '';
    
//     setFormData({
//       ...formData,
//       birthdate: birthdate,
//       age: calculatedAge
//     });
//   };

//   const handleAgeChange = (event) => {
//     setFormData({
//       ...formData,
//       age: event.target.value
//     });
//   };

//   const handleWeightUnitChange = (unit) => {
//     let convertedWeight = formData.weight;
    
//     if (unit === 'lbs' && formData.weightUnit === 'kg') {
//       convertedWeight = Math.round(formData.weight * 2.20462);
//     } else if (unit === 'kg' && formData.weightUnit === 'lbs') {
//       convertedWeight = Math.round(formData.weight / 2.20462);
//     }
    
//     setFormData({
//       ...formData,
//       weightUnit: unit,
//       weight: convertedWeight
//     });
//   };

//   const handleWeightChange = (event, newValue) => {
//     setFormData({
//       ...formData,
//       weight: newValue
//     });
//   };

//   const handleHeightUnitChange = (unit) => {
//     let convertedHeight = formData.height;
    
//     if (unit === 'inch' && formData.heightUnit === 'cm') {
//       convertedHeight = Math.round((formData.height / 2.54) * 10) / 10;
//     } else if (unit === 'cm' && formData.heightUnit === 'inch') {
//       convertedHeight = Math.round(formData.height * 2.54 * 10) / 10;
//     }
    
//     setFormData({
//       ...formData,
//       heightUnit: unit,
//       height: convertedHeight
//     });
//   };

//   const handleHeightChange = (event, newValue) => {
//     setFormData({
//       ...formData,
//       height: newValue
//     });
//   };

//   const handleChange = (e) => {
//     // Allow only numbers
//     const value = e.target.value.replace(/\D/g, "");
//     setPhone(value);
//   };

//   const handleBloodGroupChange = (event) => {
//     setFormData((prev) => ({
//       ...prev,
//       bloodGroup: event.target.value,
//     }));
//   };

//   const handleSubmit = () => {
//     console.log("Form submitted successfully with data:", formData);

//     // Optionally: send formData to your backend API
//     // fetch("/api/profile", {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify(formData),
//     // })
//     //   .then((res) => res.json())
//     //   .then((data) => console.log("Server Response:", data))
//     //   .catch((err) => console.error("Error submitting form:", err));
//   };

//   return (
//     <Layout>

//     <Container maxWidth="sm" 
//       sx={{
//         py: 6
//         }}>

//       {/* Stepper */}
//       <CustomStepper steps={steps} activeStep={activeStep} />

//       <Box elevation={0}>

//         {activeStep === 0 && (
//           <>
//           <ProfileStepOne
//             formData={formData}
//             handleTitleChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//             handleInputChange={(field) => (e) =>
//               setFormData({ ...formData, [field]: e.target.value })}
//           />

//             <Box sx={{ mb: 3 }}>        
//               <TextField
//                   fullWidth
//                   value={formData.phoneNumber || ""}
//                   onChange={handleInputChange("phoneNumber")}
//                   // onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">    
//                         <IndianFlag />  +91&nbsp;
//                       </InputAdornment>
//                     )
//                   }}
//                 />           
//             </Box>

//           <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//             <FormControl sx={{ minWidth: 120 }}>
//               <Select
//                 value={formData.title}
//                 onChange={handleTitleChange}
//                 displayEmpty
//                 variant="outlined"
//               >
//                 <MenuItem value="Mr.">Mr.</MenuItem>
//                 <MenuItem value="Miss.">Miss.</MenuItem>
//                 <MenuItem value="Mrs.">Mrs.</MenuItem>
//                 <MenuItem value="Ms.">Ms.</MenuItem>
//                 <MenuItem value="Baby">Baby</MenuItem>
//                 <MenuItem value="Dr.">Dr.</MenuItem>
//                 <MenuItem value="Master">Master</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               fullWidth
//               placeholder="First Name*"
//               value={formData.firstName}
//               onChange={handleInputChange("firstName")}
//             />
//           </Box>

//           <Box sx={{ mb: 4 }}>
//             <CustomTextField
//               fullWidth
//               value={formData.lastName}
//               onChange={handleInputChange("lastName")}
//               placeholder="Last Name*"
//               variant="outlined"  
//             />
//           </Box>

//           {/* Questions with Switches */}
//           <CustomToggles/>

//           </>
//         )}

//         {activeStep === 1 && (
//           <>
//            <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 // mb: 4
//               }}
//             >
//             <Avatar
//               sx={{
//                 width: 100,
//                 height: 100,
//                 backgroundColor: "#fff",
//                 mb: 2,
//                 p:1,
//                 boxShadow:
//                   "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//                 border: "4px solid #fff"
//               }}
//               src="/address.svg" 
//             />

//             <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
//               Address
//             </Typography>
//           </Box>

//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="caption"
//                 sx={{ color: '#fff', mb: 0.5, display: 'block', pl: 1 }}
//               >
//                 Select Address Type*
//               </Typography>
//               <FormControl fullWidth>
//                 <Select
//                   value={formData.addressType}
//                   onChange={handleAddressTypeChange}
//                 >
//                   <MenuItem value="Register">Register</MenuItem>
//                   <MenuItem value="Primary">Primary</MenuItem>
//                   <MenuItem value="Secondary">Secondary</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>

//             <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//               <Box sx={{ flex: 1 }}>
//                 <CustomTextField
//                   fullWidth
//                   placeholder="ZipCode*"
//                   value={formData.zipCode}
//                   onChange={handleInputChange('zipCode')}
//                   error={errors.zipCode}
//                   helperText={errors.zipCode ? 'This field is required' : ''}
//                   FormHelperTextProps={{
//                     sx: { color: '#d32f2f' }
//                   }}
//                 />
//               </Box>
//               <Box sx={{ flex: 1 }}>
//                 <CustomTextField
//                   fullWidth
//                   placeholder="City"
//                   value={formData.city}
//                   onChange={handleInputChange('city')}
//                 />
//               </Box>
//             </Box>

//             <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>

//               <Box sx={{ flex: 1 }}>
//                 <CustomTextField
//                   fullWidth
//                   placeholder="State"
//                   value={formData.state}
//                   onChange={handleInputChange('state')}
//               />
//             </Box>
              
//             <Box sx={{ flex: 1 }}>
//                 <CustomTextField
//                   fullWidth
//                   placeholder="Country"
//                   value={formData.country}
//                   onChange={handleInputChange('country')}
//               />
//             </Box>
              
              
//             </Box>

//             <Box sx={{ mb: 3 }}>
//               <CustomTextField
//                 fullWidth
//                 placeholder="Address 1*"
//                 value={formData.address1}
//                 onChange={handleInputChange('address1')}
//               />
//             </Box>

//             <Box sx={{ mb: 3 }}>
//               <CustomTextField
//                 fullWidth
//                 placeholder="Address 2"
//                 value={formData.address2}
//                 onChange={handleInputChange('address2')}
//               />
//             </Box>
//           </>
//         )}

//         {activeStep === 2 && (
//           <>
//             {/* Gender Header */}
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 // mb: 4
//               }}
//             >
//             <Avatar
//               sx={{
//                 width: 100,
//                 height: 100,
//                 backgroundColor: "#fff",
//                 mb: 2,
//                 p:2,
//                 boxShadow:
//                   "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//                 border: "4px solid #fff"
//               }}
//               src="/gender.svg" 
//             />

//             <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
//               Gender
//             </Typography>
//             </Box>

//             <GenderSelector/>
//           </>
//         )}

//         {activeStep === 3 && (
//           <>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 // mb: 4
//               }}
//             >
//             <Avatar
//               sx={{
//                 width: 100,
//                 height: 100,
//                 backgroundColor: "#fff",
//                 mb: 2,
//                 p:1,
//                 boxShadow:
//                   "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//                 border: "4px solid #fff"
//               }}
//               src="/age.svg" 
//             />

//             <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
//               Age
//             </Typography>
//           </Box>

//             <AgeSection/>

//           </>
//         )}

//         {activeStep === 4 && (
//           <>
//             {/* Weight Header */}
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 // mb: 4
//               }}
//             >
//             <Avatar
//               sx={{
//                 width: 100,
//                 height: 100,
//                 backgroundColor: "#fff",
//                 mb: 1,
//                 p:2,
//                 boxShadow:
//                   "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//                 border: "4px solid #fff"
//               }}
//               src="/weight.svg" 
//             />

//             <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
//               Weight
//             </Typography>
//             </Box>

//             <WeightSelector/>
//           </>
//         )}

//         {activeStep === 5 && (
//           <>
//             {/* Height Header */}
//              <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 // mb: 4
//               }}
//             >
//             <Avatar
//               sx={{
//                 width: 100,
//                 height: 100,
//                 backgroundColor: "#fff",
//                 mb: 1,
//                 p:2,
//                 boxShadow:
//                   "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//                 border: "4px solid #fff"
//               }}
//               src="/height.svg" 
//             />

//             <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
//               Height
//             </Typography>
//             </Box>

//             <HeightSelector/>

//           </>
//         )} 

//         {activeStep === 6 && (
//         <>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               mb: 4,
//               px: { xs: 2, sm: 4 },
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: { xs: 80, sm: 100 },
//                 height: { xs: 80, sm: 100 },
//                 backgroundColor: "#fff",
//                 p: 1,
//                 pl: 1.5,
//                 boxShadow:
//                   "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//                 border: "4px solid #fff",
//               }}
//               src="/bloodGroup.svg"
//             />
//             <Typography
//               variant="h5"
//               sx={{
//                 fontWeight: 200,
//                 color: "#333",
//                 fontSize: { xs: "1.2rem", sm: "1.5rem" },
//               }}
//             >
//               Blood Group
//             </Typography>
//           </Box>

//           <FormControl fullWidth>
//             <RadioGroup value={formData.bloodGroup} onChange={handleBloodGroupChange}>
//               <Grid container spacing={1} justifyContent="center">
//                 {[
//                   ["A+", "A-"],
//                   ["B+", "B-"],
//                   ["O+", "O-"],
//                   ["AB+", "AB-"],
//                 ].map((row, rowIndex) => (
//                   <Grid item xs={12} key={rowIndex}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: { xs: 1, sm: 2 },
//                         flexWrap: "wrap",
//                       }}
//                     >
//                       {row.map((group) => (
//                         <FormControlLabel
//                           key={group}
//                           value={group}
//                           control={<Radio />}
//                           label={group}
//                           sx={{
//                             width: { xs: "120px", sm: "250px" },
//                             backgroundColor: "#f9fcff",
//                             justifyContent: "center",
//                           }}
//                         />
//                       ))}
//                     </Box>
//                   </Grid>
//                 ))}

//                 <Grid item xs={12}>
//                   <Box sx={{ display: "flex", justifyContent: "center" }}>
//                     <FormControlLabel
//                       value="unknown"
//                       control={<Radio />}
//                       label="I don't know"
//                       sx={{
//                         width: { xs: "100%", sm: "528px" },
//                         borderRadius: "20px",
//                         backgroundColor: "#f9fcff",
//                         justifyContent: "center",
//                       }}
//                     />
//                   </Box>
//                 </Grid>
//               </Grid>
//             </RadioGroup>
//           </FormControl>
//         </>
//         )} 

//         {/* Navigation Buttons */}
//         <Box 
//         sx={{
//            display: 'flex',
//           justifyContent: 'flex-end',
//           mt: 2, 
//           gap: 1,
//         }}>
//           <BackButton
//             variant="text"
//             onClick={handleBack}
//             disabled={activeStep === 0}
//           >
//             Back
//           </BackButton>

//           {activeStep === steps.length - 1 ? (
//             <CustomButton
//               onClick={handleSubmit}
//               label="Submit"
//             />
//           ) : (
//             <CustomButton
//               onClick={handleNext}
//               label="Next"
//             />
//           )}
          
//         </Box>

//       </Box>

//     </Container>

//     </Layout>
//   );
// }



s














