
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














// "use client";

// import {
//   Box,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
//   TextField,
//   FormHelperText,
// } from "@mui/material";
// import CustomTextField from "./CustomTextField";
// import AgeSelector from "./test";

// export default function WeightSelector({ weight, weightUnit, onWeightChange, onUnitChange, error, touched }) {
 
//   const handleUnitChange = (event, newUnit) => {
//     if (newUnit !== null) {
//       onUnitChange(newUnit);
//     }
//   };

//   // const handleWeightInputChange = (event) => {
//   //   const value = event.target.value.replace(/\D/g, ''); // Allow only numbers
//   //   // Create synthetic event for Formik
//   //   onWeightChange(event, value ? parseInt(value) : 0);
//   // };

//   const handleWeightInputChange = (event) => {
//     let value = event.target.value.replace(/\D/g, ""); // allow only digits
//     let numericValue = Number(value);

//     const maxLimit = weightUnit === "lbs" ? 661 : 300;
//     if (numericValue > maxLimit) numericValue = maxLimit;

//     onWeightChange(event, numericValue || "");
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "1rem",
//         mt: "15px",
//       }}
//     >
//       {/* Unit Selector */}
//       <ToggleButtonGroup
//         value={weightUnit}
//         exclusive
//         onChange={handleUnitChange}
//         sx={{
//           display: "inline-flex",
//           boxShadow:
//             "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//           borderRadius: "20px",
//         }}
//       >
//         {/* <ToggleButton
//           value="kg"
//           sx={{
//             textTransform: "none",
//             border: "none",
//             padding: "10px 30px",
//             fontWeight: "bold",
//             "&.Mui-selected": {
//               backgroundColor: "#1976d2",
//               color: "#fff",
//             },
//             "&.Mui-selected:hover": {
//               backgroundColor: "#1565c0",
//             },
//           }}
//         >
//           Kg
//         </ToggleButton>
//         <ToggleButton
//           value="lbs"
//           sx={{
//             textTransform: "none",
//             border: "none",
//             padding: "10px 30px",
//             fontWeight: "bold",
//             "&.Mui-selected": {
//               backgroundColor: "#1976d2",
//               color: "#fff",
//             },
//             "&.Mui-selected:hover": {
//               backgroundColor: "#1565c0",
//             },
//           }}
//         >
//           Lbs
//         </ToggleButton> */}

//         {["kg", "lbs"].map((unit) => (
//           <ToggleButton
//             key={unit}
//             value={unit}
//             sx={{
//               textTransform: "none",
//               fontFamily: 'Roboto, Arial, sans-serif',
//               border: "none",
//               padding: "10px 30px",
//               fontWeight: "bold",
//               "&.Mui-selected": {
//                 backgroundColor: "#1976d2",
//                 color: "#fff",
//               },
//               "&.Mui-selected:hover": {
//                 backgroundColor: "#1565c0",
//               },
//             }}
//           >
//             {unit}
//           </ToggleButton>
//         ))}          

//       </ToggleButtonGroup>

//       {/* Weight Input */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "0.5rem",
//         }}
//       >
//         <CustomTextField
//           id="weight"
//           name="weight"
//           placeholder="0"
//           type="tel"
//           value={weight || ''}
//           onChange={handleWeightInputChange}
//           error={touched && Boolean(error)}
//           InputProps={{
//             endAdornment: (
//               <Typography variant="h6" sx={{ ml: 1 }}>
//                 {weightUnit}
//               </Typography>
//             ),
//           }}
//           sx={{
//             width: "250px",
//             "& .MuiOutlinedInput-root": {
//               fontWeight: 400,
//               fontFamily: "Nunito, sans-serif",
//               fontSize: "1rem",
//               lineHeight: 1.4375,
//               color: "rgba(0,0,0,0.87)",
//               paddingRight: "14px",
//               "& fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#e0e0e0",
//               },
//               "&:hover fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//             },
//           }}
//         />
//         {touched && error && (
//           <FormHelperText error>{error}</FormHelperText>
//         )}
//       </Box>
//     </Box>
//   );
// }





// "use client";

// import {
//   Box,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
//   FormHelperText,
// } from "@mui/material";
// import CustomTextField from "./CustomTextField";

// export default function WeightSelector({ weight, weightUnit, onWeightChange, onUnitChange, error, touched }) {
//   const handleUnitChange = (event, newUnit) => {
//     if (newUnit !== null) onUnitChange(newUnit);
//   };

//   const handleWeightInputChange = (event) => {
//     let value = event.target.value.replace(/\D/g, ""); // allow only digits
//     let numericValue = Number(value);

//     //  Limit based on unit
//     const maxLimit = weightUnit === "lbs" ? 661 : 300;
//     if (numericValue > maxLimit) numericValue = maxLimit;

//     //  Create synthetic event for Formik
//     onWeightChange(event, numericValue || "");
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "1rem",
//         mt: "15px",
//       }}
//     >
//       {/* Unit Selector */}
//       <ToggleButtonGroup
//         value={weightUnit}
//         exclusive
//         onChange={handleUnitChange}
//         sx={{
//           display: "inline-flex",
//           boxShadow:
//             "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//           borderRadius: "20px",
//         }}
//       >
//         {["kg", "lbs"].map((unit) => (
//           <ToggleButton
//             key={unit}
//             value={unit}
//             sx={{
//               textTransform: "none",
//               border: "none",
//               padding: "10px 30px",
//               fontWeight: "bold",
//               "&.Mui-selected": {
//                 backgroundColor: "#1976d2",
//                 color: "#fff",
//               },
//               "&.Mui-selected:hover": {
//                 backgroundColor: "#1565c0",
//               },
//             }}
//           >
//             {unit.toUpperCase()}
//           </ToggleButton>
//         ))}
//       </ToggleButtonGroup>

//       {/* Weight Input */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "0.5rem",
//         }}
//       >
//         <CustomTextField
//           id="weight"
//           name="weight"
//           placeholder="0"
//           type="tel"
//           value={weight || ""}
//           onChange={handleWeightInputChange}
//           error={touched && Boolean(error)}
//           InputProps={{
//             endAdornment: (
//               <Typography variant="h6" sx={{ ml: 1 }}>
//                 {weightUnit}
//               </Typography>
//             ),
//           }}
//           sx={{
//             width: "250px",
//             "& .MuiOutlinedInput-root": {
//               fontWeight: 400,
//               fontFamily: "Nunito, sans-serif",
//               fontSize: "1rem",
//               "& fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#e0e0e0",
//               },
//               "&:hover fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//             },
//           }}
//         />
//         {touched && error && (
//           <FormHelperText error>{error}</FormHelperText>
//         )}
//       </Box>
//     </Box>
//   );
// }



















// "use client";

// import {
//   Box,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
//   TextField,
//   FormHelperText,
// } from "@mui/material";
// import CustomTextField from "./CustomTextField";

// // Helper for ruler ticks
// const getRulerData = (min, max, step) => {
//   const ticks = [];
//   for (let i = min; i <= max; i += step) {
//     ticks.push(i);
//   }
//   return ticks;
// };

// function RulerBar({ value, min, max, step, unit }) {
//   const ticks = getRulerData(min, max, step);
//   // Calculate position for indicator (centered under ruler)
//   const percent = ((value - min) / (max - min)) * 100;

//   return (
//      <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-end",
//         width: "100%",
//         maxWidth: 450,
//         position: "relative",
//         marginTop: 24,
//         padding: "0 8px",
//       }}
//     >
//       {ticks.map((tick) => {
//         const isSelected = tick === value;
//         return (
//           <Box
//             key={tick}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "flex-end",
//               flex: "1",
//             }}
//           >
//             {/* Tick label */}
//             <Typography
//               variant="subtitle2"
//               sx={{
//                 visibility: isSelected ? "visible" : "hidden",
//                 marginBottom: "5px",
//                 fontSize: "0.75rem",
//                 width: "24px",
//                 textAlign: "center",
//                 fontWeight: isSelected ? "bold" : "normal",
//                 color: isSelected ? "#1976d2" : "#555",
//               }}
//             >
//               {tick.toFixed(2)}
//             </Typography>

//             {/* Tick line */}
//             <Box
//               sx={{
//                 width: "2px",
//                 height: isSelected ? "40px" : "25px",
//                 backgroundColor: isSelected ? "#1172ba" : "#000",
//                 transition: "all 0.2s ease",
//               }}
//             />
//           </Box>
//         );
//       })}
//     </Box>
//   );
// }


// export default function WeightSelector({ weight, weightUnit, onWeightChange, onUnitChange, error, touched }) {
 
//   const handleUnitChange = (event, newUnit) => {
//     if (newUnit !== null) {
//       onUnitChange(newUnit);
//     }
//   };

//   // const handleWeightInputChange = (event) => {
//   //   const value = event.target.value.replace(/\D/g, ''); // Allow only numbers
//   //   // Create synthetic event for Formik
//   //   onWeightChange(event, value ? parseInt(value) : 0);
//   // };

//   const handleWeightInputChange = (event) => {
//     let value = event.target.value.replace(/\D/g, ""); // allow only digits
//     let numericValue = Number(value);

//     const maxLimit = weightUnit === "lbs" ? 661 : 300;
//     if (numericValue > maxLimit) numericValue = maxLimit;

//     onWeightChange(event, numericValue || "");
//   };

//   // const min = weightUnit === "kg" ? 20 : 44; // Example min for lbs
//   // const max = weightUnit === "kg" ? 45 : 100; // Example max for lbs

//    const min = weightUnit === "kg" ? 0 : 0; // Example min for lbs
//   const max = weightUnit === "kg" ? 300 : 661; // Example max for lbs

//   const step = 5;

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "1rem",
//         mt: "15px",
//       }}
//     >
//       {/* Unit Selector */}
//       <ToggleButtonGroup
//         value={weightUnit}
//         exclusive
//         onChange={handleUnitChange}
//         sx={{
//           display: "inline-flex",
//           boxShadow:
//             "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//           borderRadius: "20px",
//         }}
//       >
//         {/* <ToggleButton
//           value="kg"
//           sx={{
//             textTransform: "none",
//             border: "none",
//             padding: "10px 30px",
//             fontWeight: "bold",
//             "&.Mui-selected": {
//               backgroundColor: "#1976d2",
//               color: "#fff",
//             },
//             "&.Mui-selected:hover": {
//               backgroundColor: "#1565c0",
//             },
//           }}
//         >
//           Kg
//         </ToggleButton>
//         <ToggleButton
//           value="lbs"
//           sx={{
//             textTransform: "none",
//             border: "none",
//             padding: "10px 30px",
//             fontWeight: "bold",
//             "&.Mui-selected": {
//               backgroundColor: "#1976d2",
//               color: "#fff",
//             },
//             "&.Mui-selected:hover": {
//               backgroundColor: "#1565c0",
//             },
//           }}
//         >
//           Lbs
//         </ToggleButton> */}

//         {["kg", "lbs"].map((unit) => (
//           <ToggleButton
//             key={unit}
//             value={unit}
//             sx={{
//               textTransform: "none",
//               fontFamily: 'Roboto, Arial, sans-serif',
//               border: "none",
//               padding: "10px 30px",
//               fontWeight: "bold",
//               "&.Mui-selected": {
//                 backgroundColor: "#1976d2",
//                 color: "#fff",
//               },
//               "&.Mui-selected:hover": {
//                 backgroundColor: "#1565c0",
//               },
//             }}
//           >
//             {unit}
//           </ToggleButton>
//         ))}          

//       </ToggleButtonGroup>

//       {/* Weight Input */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "0.5rem",
//         }}
//       >
//         <CustomTextField
//           id="weight"
//           name="weight"
//           placeholder="0"
//           type="tel"
//           value={weight || ''}
//           onChange={handleWeightInputChange}
//           error={touched && Boolean(error)}
//           InputProps={{
//             endAdornment: (
//               <Typography variant="h6" sx={{ ml: 1 }}>
//                 {weightUnit}
//               </Typography>
//             ),
//           }}
//           sx={{
//             width: "250px",
//             "& .MuiOutlinedInput-root": {
//               fontWeight: 400,
//               fontFamily: "Nunito, sans-serif",
//               fontSize: "1rem",
//               lineHeight: 1.4375,
//               color: "rgba(0,0,0,0.87)",
//               paddingRight: "14px",
//               "& fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#e0e0e0",
//               },
//               "&:hover fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//             },
//           }}
//         />
//         {touched && error && (
//           <FormHelperText error>{error}</FormHelperText>
//         )}
//       </Box>

//         <RulerBar
//         value={Number(weight) || min}
//         min={min}
//         max={max}
//         step={step}
//         unit={weightUnit}
//       />


//     </Box>
//   );
// }














// "use client";

// import {
//   Box,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
//   TextField,
//   FormHelperText,
// } from "@mui/material";
// import CustomTextField from "./CustomTextField";

// // Enhanced helper for ruler ticks with major/minor ticks
// const getRulerData = (min, max, step, majorStep = 5) => {
//   const ticks = [];
//   for (let i = min; i <= max; i += step) {
//     const isMajorTick = i % majorStep === 0 || i === min || i === max;
//     ticks.push({
//       value: i,
//       isMajor: isMajorTick,
//       label: isMajorTick ? i.toString() : ""
//     });
//   }
//   return ticks;
// };

// function RulerBar({ value, min, max, step, unit, onValueChange }) {
//   const majorStep = unit === "kg" ? 10 : 20;
//   const ticks = getRulerData(min, max, step, majorStep);
  
//   // Calculate position for indicator
//   const percent = ((value - min) / (max - min)) * 100;

//   const handleRulerClick = (event) => {
//     const rulerRect = event.currentTarget.getBoundingClientRect();
//     const clickX = event.clientX - rulerRect.left;
//     const rulerWidth = rulerRect.width;
//     const clickedValue = min + (clickX / rulerWidth) * (max - min);
    
//     // Snap to nearest step
//     const snappedValue = Math.round(clickedValue / step) * step;
//     const clampedValue = Math.max(min, Math.min(max, snappedValue));
    
//     onValueChange(clampedValue);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "100%",
//         maxWidth: 500,
//         position: "relative",
//         marginTop: 4,
//         padding: "0 16px",
//       }}
//     >
//       {/* Current value indicator */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: -45,
//           left: `${percent}%`,
//           transform: "translateX(-50%)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           zIndex: 2,
//         }}
//       >
//         <Box
//           sx={{
//             backgroundColor: "#1976d2",
//             color: "white",
//             padding: "4px 12px",
//             borderRadius: "12px",
//             fontSize: "0.875rem",
//             fontWeight: "bold",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {value.toFixed(1)} {unit}
//         </Box>
//         <Box
//           sx={{
//             width: 0,
//             height: 0,
//             borderLeft: "6px solid transparent",
//             borderRight: "6px solid transparent",
//             borderTop: "6px solid #1976d2",
//           }}
//         />
//       </Box>

//       {/* Ruler track */}
//       <Box
//         sx={{
//           position: "relative",
//           width: "100%",
//           height: 60,
//           cursor: "pointer",
//           "&:hover .ruler-track": {
//             backgroundColor: "#f0f8ff",
//           },
//         }}
//         onClick={handleRulerClick}
//       >
//         {/* Background track */}
//         <Box
//           className="ruler-track"
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: 0,
//             right: 0,
//             height: 8,
//             backgroundColor: "#e0e0e0",
//             borderRadius: 4,
//             transform: "translateY(-50%)",
//             transition: "background-color 0.2s ease",
//           }}
//         />

//         {/* Progress fill */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: 0,
//             width: `${percent}%`,
//             height: 8,
//             backgroundColor: "#1976d2",
//             borderRadius: "4px 0 0 4px",
//             transform: "translateY(-50%)",
//             transition: "width 0.3s ease",
//           }}
//         />

//         {/* Ticks */}
//         <Box
//           sx={{
//             position: "relative",
//             width: "100%",
//             height: "100%",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-end",
//           }}
//         >
//           {ticks.map((tick) => {
//             const tickPercent = ((tick.value - min) / (max - min)) * 100;
//             const isNearValue = Math.abs(tick.value - value) <= step;
            
//             return (
//               <Box
//                 key={tick.value}
//                 sx={{
//                   position: "absolute",
//                   left: `${tickPercent}%`,
//                   transform: "translateX(-50%)",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 {/* Tick label */}
//                 {tick.label && (
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       marginBottom: "8px",
//                       fontSize: "0.7rem",
//                       fontWeight: tick.isMajor ? "bold" : "normal",
//                       color: isNearValue ? "#1976d2" : "#666",
//                       opacity: tick.isMajor ? 1 : 0.7,
//                       transition: "all 0.2s ease",
//                     }}
//                   >
//                     {tick.label}s
//                   </Typography>
//                 )}

//                 {/* Tick line */}
//                 <Box
//                   sx={{
//                     width: tick.isMajor ? "2px" : "1px",
//                     height: tick.isMajor ? "25px" : "15px",
//                     backgroundColor: isNearValue ? "#1976d2" : "#999",
//                     transition: "all 0.2s ease",
//                     borderRadius: "1px",
//                   }}
//                 />
//               </Box>
//             );
//           })}
//         </Box>

//         {/* Interactive slider thumb */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: `${percent}%`,
//             transform: "translate(-50%, -50%)",
//             width: 24,
//             height: 24,
//             backgroundColor: "#1976d2",
//             border: "3px solid white",
//             borderRadius: "50%",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
//             cursor: "grab",
//             zIndex: 3,
//             "&:hover": {
//               backgroundColor: "#1565c0",
//               transform: "translate(-50%, -50%) scale(1.1)",
//             },
//             "&:active": {
//               cursor: "grabbing",
//               transform: "translate(-50%, -50%) scale(1.05)",
//             },
//           }}
//           onMouseDown={(e) => {
//             e.stopPropagation();
//             const startX = e.clientX;
//             const startValue = value;
//             const rulerWidth = e.currentTarget.parentElement.offsetWidth;

//             const handleMouseMove = (moveEvent) => {
//               const deltaX = moveEvent.clientX - startX;
//               const deltaValue = (deltaX / rulerWidth) * (max - min);
//               const newValue = Math.max(min, Math.min(max, startValue + deltaValue));
//               const snappedValue = Math.round(newValue / step) * step;
//               onValueChange(snappedValue);
//             };

//             const handleMouseUp = () => {
//               document.removeEventListener("mousemove", handleMouseMove);
//               document.removeEventListener("mouseup", handleMouseUp);
//             };

//             document.addEventListener("mousemove", handleMouseMove);
//             document.addEventListener("mouseup", handleMouseUp);
//           }}
//         />
//       </Box>

//       {/* Min/Max labels */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           width: "100%",
//           marginTop: 1,
//         }}
//       >
//         <Typography variant="caption" color="text.secondary">
//           {min} {unit}
//         </Typography>
//         <Typography variant="caption" color="text.secondary">
//           {max} {unit}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// export default function WeightSelector({ 
//   weight, 
//   weightUnit, 
//   onWeightChange, 
//   onUnitChange, 
//   error, 
//   touched 
// }) {
//   const handleUnitChange = (event, newUnit) => {
//     if (newUnit !== null) {
//       onUnitChange(newUnit);
      
//       // Convert weight when unit changes
//       if (weight) {
//         let convertedWeight;
//         if (newUnit === "kg") {
//           // lbs to kg
//           convertedWeight = Math.round(weight * 0.453592);
//         } else {
//           // kg to lbs
//           convertedWeight = Math.round(weight / 0.453592);
//         }
//         // Create synthetic event for the converted weight
//         const syntheticEvent = {
//           target: {
//             name: "weight",
//             value: convertedWeight
//           }
//         };
//         onWeightChange(syntheticEvent, convertedWeight);
//       }
//     }
//   };

//   const handleWeightInputChange = (event) => {
//     let value = event.target.value.replace(/\D/g, "");
//     let numericValue = Number(value);

//     const maxLimit = weightUnit === "lbs" ? 661 : 300;
//     if (numericValue > maxLimit) numericValue = maxLimit;

//     onWeightChange(event, numericValue || "");
//   };

//   const handleRulerChange = (newValue) => {
//     const syntheticEvent = {
//       target: {
//         name: "weight",
//         value: newValue
//       }
//     };
//     onWeightChange(syntheticEvent, newValue);
//   };

//   const min = 0;
//   const max = weightUnit === "kg" ? 300 : 661;
//   const step = weightUnit === "kg" ? 1 : 2;

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "1.5rem",
//         mt: "15px",
//         padding: "0 16px",
//       }}
//     >
//       {/* Unit Selector */}
//       <ToggleButtonGroup
//         value={weightUnit}
//         exclusive
//         onChange={handleUnitChange}
//         sx={{
//           display: "inline-flex",
//           boxShadow:
//             "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//           borderRadius: "20px",
//         }}
//       >
//         {["kg", "lbs"].map((unit) => (
//           <ToggleButton
//             key={unit}
//             value={unit}
//             sx={{
//               textTransform: "none",
//               fontFamily: 'Roboto, Arial, sans-serif',
//               border: "none",
//               padding: "10px 30px",
//               fontWeight: "bold",
//               fontSize: "1rem",
//               "&.Mui-selected": {
//                 backgroundColor: "#1976d2",
//                 color: "#fff",
//               },
//               "&.Mui-selected:hover": {
//                 backgroundColor: "#1565c0",
//               },
//             }}
//           >
//             {unit}
//           </ToggleButton>
//         ))}          
//       </ToggleButtonGroup>

//       {/* Weight Input */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "0.5rem",
//         }}
//       >
//         <CustomTextField
//           id="weight"
//           name="weight"
//           placeholder="0"
//           type="tel"
//           value={weight || ''}
//           onChange={handleWeightInputChange}
//           error={touched && Boolean(error)}
//           InputProps={{
//             endAdornment: (
//               <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold", color: "text.primary" }}>
//                 {weightUnit}
//               </Typography>
//             ),
//           }}
//           sx={{
//             width: "200px",
//             "& .MuiOutlinedInput-root": {
//               fontWeight: 600,
//               fontFamily: "Nunito, sans-serif",
//               fontSize: "1.25rem",
//               lineHeight: 1.4375,
//               color: "rgba(0,0,0,0.87)",
//               paddingRight: "14px",
//               "& fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#e0e0e0",
//                 borderWidth: "2px",
//               },
//               "&:hover fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//                 borderWidth: "2px",
//               },
//             },
//           }}
//         />
//         {touched && error && (
//           <FormHelperText error sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
//             {error}
//           </FormHelperText>
//         )}
//       </Box>

//       {/* Enhanced Ruler */}
//       <RulerBar
//         value={Number(weight) || min}
//         min={min}
//         max={max}
//         step={step}
//         unit={weightUnit}
//         onValueChange={handleRulerChange}
//       />
//     </Box>
//   );
// }







// "use client";

// import {
//   Box,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
//   FormHelperText,
// } from "@mui/material";
// import CustomTextField from "./CustomTextField";

// // Helper to generate ruler ticks for visible range
// const getRulerData = (centerValue, range, step, majorStep, min, max) => {
//   let start = centerValue - range;
//   let end = centerValue + range;

//   if (start < min) {
//     end += (min - start); // shift end forward to keep total range same
//     start = min;
//   }
//   if (end > max) {
//     start -= (end - max); // shift start backward
//     end = max;
//   }

//   const ticks = [];
//   for (let i = start; i <= end; i += step) {
//     const isMajorTick = i % majorStep === 0;
//     ticks.push({
//       value: i,
//       isMajor: isMajorTick,
//       label: isMajorTick ? i.toFixed(2) : "",
//     });
//   }
//   return ticks;
// };


// function RulerBar({ value, min, max, step, unit, onValueChange }) {
//   console.log("value---", value, "min----", min, "max----", max, "step----", step, "unit----", unit, );
  
//   // const majorStep = unit === "kg" ? 5 : 10;
//   const majorStep = 5;
//   // const visibleRange = unit === "kg" ? 30 : 30; // Show ±15kg or ±30lbs around current value
//   const visibleRange = unit === "kg" ? 15 : 15;
//   console.log("visible range is",visibleRange);
  
  
//   // Ensure value is within bounds
//   const currentValue = Math.max(min, Math.min(max, value));

  
//   // Generate ticks for visible range
//   // const ticks = getRulerData(currentValue, visibleRange, step, majorStep);
//   const ticks = getRulerData(currentValue, visibleRange, step, majorStep, min, max);

//   // console.log("tick", ticks);
  

//   const handleRulerClick = (event) => {
//     const rulerRect = event.currentTarget.getBoundingClientRect();
//     const clickX = event.clientX - rulerRect.left;
//     const rulerWidth = rulerRect.width;
    
//     // Calculate which tick was clicked based on position
//     const tickWidth = rulerWidth / ticks.length;
//     const clickedIndex = Math.floor(clickX / tickWidth);
    
//     if (ticks[clickedIndex]) {
//       const clickedValue = ticks[clickedIndex].value;
//       const clampedValue = Math.max(min, Math.min(max, clickedValue));
//       onValueChange(clampedValue);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "100%",
//         maxWidth: 420,
//         position: "relative",
//         marginTop: 3,
//         padding: "0 16px",
//         // border:"2px solid black",
//       }}
//     >
//       {/* Current value indicator */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: -45,
//           // left: "50%",
//            left: `${
//       ((currentValue - ticks[0]?.value) / (ticks[ticks.length - 1]?.value - ticks[0]?.value)) *
//       100
//     }%`,
//           transform: "translateX(-50%)",
        
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           zIndex: 2,
//           // border:"2px solid black",
//         }}
//       >
//         <Box
//           sx={{
//             // backgroundColor: "#1976d2",
//             color: "#000",
//             padding: "6px 14px",
//             // borderRadius: "12px",
//             fontSize: "0.875rem",
//             fontWeight: "500",
//             // boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//             // whiteSpace: "nowrap",
//             // border:"2px solid black",
//           }}
//         >
//           {currentValue.toFixed(2)}
//         </Box>
//         <Box
//           sx={{
//             width: 0,
//             height: 0,
//             // borderLeft: "6px solid transparent",
//             // borderRight: "6px solid transparent",
//             // borderTop: "6px solid #1976d2",
//             // border:"2px solid black",
//           }}
//         />
//       </Box>

//       {/* Ruler track container */}
//       <Box
//         sx={{
//           position: "relative",
//           width: "100%",
//           height: 80,
//           cursor: "pointer",
//           overflow: "hidden",
//         }}
//         onClick={handleRulerClick}
//       >
//         {/* Ticks container */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-end",
//             position: "relative",
//             width: "100%",  
//             height: "100%",
//           }}
//         >
//           {ticks.map((tick, index) => {
//             const isCenter = Math.abs(tick.value - currentValue) < step / 2;
//             const tickPercent = (index / (ticks.length - 1)) * 100;
            
//             return (
//               <Box
//                 key={`${tick.value}-${index}`}
//                 sx={{
//                   position: "absolute",
//                   left: `${tickPercent}%`,
//                   transform: "translateX(-50%)",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   bottom: 0,
//                 }}
//               >
//                 {/* Tick label - only show for major ticks */}
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     marginBottom: "5px",
//                     fontSize: "0.75rem",
//                     fontWeight: tick.isMajor ? "500" : "500",
//                     color: isCenter ? "#1172ba" : "#000",
//                     visibility: tick.isMajor ? "visible" : "hidden",
//                     width: "auto",
//                     minWidth: "12px",
//                     textAlign: "right",
                    
//                   }}
//                 >
//                   {tick.label}
//                 </Typography>

//                 {/* Tick line */}
//                 <Box
//                   sx={{
//                     // width: tick.isMajor ? "2px" : "2px",
//                     width:"2px",
//                     // height: tick.isMajor ? "100px" : "50px",
//                      height: isCenter
//       ? "100px" // blue center line
//       : tick.isMajor
//       ? "50px"  // every 5th tick
//       : "20px", // other minor ticks
//                     backgroundColor: isCenter ? "#1172ba" : "#000",
//                     // border:"2px solid black"
//                     // borderRadius: "1px",
//                   }}
//                 />
//               </Box>
//             );
//           })}
//         </Box>

//         {/* Center indicator line (always in the middle) */}
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: 0,
//             // left: "50%",
//              left: `${
//                     ((currentValue - ticks[0]?.value) / (ticks[ticks.length - 1]?.value - ticks[0]?.value)) *
//                     100
//                   }%`,
//             transform: "translateX(-50%)",
//              backgroundColor: "rgb(17, 114, 186)",
//           width: "2px !important",                          // line width
//           height: "100px",                       // line height
//           marginTop: "8px",

            
            

//             // borderRadius: "1.5px",
//             zIndex: 3,
//             pointerEvents: "none",
//           }}
//         />

//         {/* Interactive slider thumb */}
//         <Box
//           sx={{
//             // position: "absolute",
//             // bottom: "12px",
//             // left: "50%",
//             // transform: "translateX(-50%)",
//             // width: 20,
//             // height: 20,
//             // // backgroundColor: "#1976d2",
//             // // border: "3px solid white",
//             // borderRadius: "50%",
//             // // boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
//             // cursor: "grab",
//             // zIndex: 4,
//             // "&:hover": {
//             //   // backgroundColor: "#1565c0",
//             //   transform: "translateX(-50%) scale(1.1)",
//             // },
//             // "&:active": {
//             //   cursor: "grabbing",
//             //   transform: "translateX(-50%) scale(1.05)",
//             // },
//           }}
//           onMouseDown={(e) => {
//             e.stopPropagation();
//             const startX = e.clientX;
//             const startValue = currentValue;

//             const handleMouseMove = (moveEvent) => {
//               const deltaX = moveEvent.clientX - startX;
//               // Adjust sensitivity: each pixel moves by step value
//               const pixelsPerStep = 5; // Adjust this for sensitivity
//               const deltaSteps = Math.round(deltaX / pixelsPerStep);
//               const newValue = startValue + (deltaSteps * step);
//               const clampedValue = Math.max(min, Math.min(max, newValue));
//               onValueChange(clampedValue);
//             };

//             const handleMouseUp = () => {
//               document.removeEventListener("mousemove", handleMouseMove);
//               document.removeEventListener("mouseup", handleMouseUp);
//             };

//             document.addEventListener("mousemove", handleMouseMove);
//             document.addEventListener("mouseup", handleMouseUp);
//           }}
//         />
//       </Box>

//       {/* Min/Max labels */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           width: "100%",
//           marginTop: 1,
//         }}
//       >
//         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
//           {ticks[0]?.value.toFixed(2) || min} {unit}
//         </Typography>
//         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
//           {ticks[ticks.length - 1]?.value.toFixed(2) || max} {unit}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// export default function WeightSelector({ 
//   weight, 
//   weightUnit, 
//   onWeightChange, 
//   onUnitChange, 
//   error, 
//   touched 
// }) {
//   const handleUnitChange = (event, newUnit) => {
//     if (newUnit !== null) {
//       onUnitChange(newUnit);
      
//       // Convert weight when unit changes
//       if (weight) {
//         let convertedWeight;
//         if (newUnit === "kg") {
//           // lbs to kg
//           convertedWeight = Math.round(weight * 0.453592);
//         } else {
//           // kg to lbs
//           convertedWeight = Math.round(weight / 0.453592);
//         }
//         // Create synthetic event for the converted weight
//         const syntheticEvent = {
//           target: {
//             name: "weight",
//             value: convertedWeight
//           }
//         };
//         onWeightChange(syntheticEvent, convertedWeight);
//       }
//     }
//   };

//   const handleWeightInputChange = (event) => {
//     let value = event.target.value.replace(/\D/g, "");
//     let numericValue = Number(value);

//     const maxLimit = weightUnit === "lbs" ? 661 : 300;
//     if (numericValue > maxLimit) numericValue = maxLimit;

//     onWeightChange(event, numericValue || "");
//   };

//   const handleRulerChange = (newValue) => {
//     const syntheticEvent = {
//       target: {
//         name: "weight",
//         value: newValue
//       }
//     };
//     onWeightChange(syntheticEvent, newValue);
//   };

//   const min = 0;
//   const max = weightUnit === "kg" ? 300 : 661;
//   // const step = weightUnit === "kg" ? 1 : 2;
//   const step = 1;

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "1.5rem",
//         mt: "15px",
//         padding: "0 16px",
//       }}
//     >
//       {/* Unit Selector */}
//       <ToggleButtonGroup
//         value={weightUnit}
//         exclusive
//         onChange={handleUnitChange}
//         sx={{
//           display: "inline-flex",
//           boxShadow:
//             "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//           borderRadius: "20px",
//         }}
//       >
//         {["kg", "lbs"].map((unit) => (
//           <ToggleButton
//             key={unit}
//             value={unit}
//             sx={{
//               textTransform: "none",
//               fontFamily: 'Roboto, Arial, sans-serif',
//               border: "none",
//               padding: "10px 30px",
//               fontWeight: "500",
//               fontSize: "1rem",
//               "&.Mui-selected": {
//                 backgroundColor: "#1976d2",
//                 color: "#fff",
//               },
//               "&.Mui-selected:hover": {
//                 backgroundColor: "#1565c0",
//               },
//             }}
//           >
//             {unit}
//           </ToggleButton>
//         ))}          
//       </ToggleButtonGroup>

//       {/* Weight Input */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "0.5rem",
//         }}
//       >
//         <CustomTextField
//           id="weight"
//           name="weight"
//           placeholder="0"
//           type="tel"
//           value={weight || ''}
//           onChange={handleWeightInputChange}
//           error={touched && Boolean(error)}
//           InputProps={{
//             endAdornment: (
//               <Typography variant="h6" sx={{ ml: 1, fontWeight: "500", color: "text.primary" }}>
//                 {weightUnit}
//               </Typography>
//             ),
//           }}
//           sx={{
//             width: "200px",
//             "& .MuiOutlinedInput-root": {
//               fontWeight: 500,
//               fontFamily: "Nunito, sans-serif",
//               fontSize: "1.25rem",
//               lineHeight: 1.4375,
//               color: "rgba(0,0,0,0.87)",
//               paddingRight: "14px",
//               "& fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#e0e0e0",
//                 borderWidth: "2px",
//               },
//               "&:hover fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//                 borderWidth: "2px",
//               },
//             },
//           }}
//         />
//         {touched && error && (
//           <FormHelperText error sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
//             {error}
//           </FormHelperText>
//         )}
//       </Box>

//       {/* Enhanced Ruler */}
//       <RulerBar
//         value={Number(weight) || 0}
//         min={min}
//         max={max}
//         step={step}
//         unit={weightUnit}
//         onValueChange={handleRulerChange}
//       />
//     </Box>
//   );
// }









// "use client";

// import {
//   Box,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
//   FormHelperText,
// } from "@mui/material";
// import CustomTextField from "./CustomTextField";

// const getRulerData = (centerValue, range, step, majorStep, min, max) => {
//   let start = Math.max(min, centerValue - range);
//   let end = Math.min(max, centerValue + range);

//   if (start === min && end - start < range * 2) {
//     end = Math.min(max, start + range * 2);
//   }
//   if (end === max && end - start < range * 2) {
//     start = Math.max(min, end - range * 2);
//   }

//   const ticks = [];
//   for (let i = start; i <= end; i += step) {
//     const isMajorTick = i % majorStep === 0;
//     ticks.push({
//       value: i,
//       isMajor: isMajorTick,
//       label: isMajorTick ? i.toFixed(0) : "",
//     });
//   }
//   return ticks;
// };

// function RulerBar({ value, min, max, step, unit, onValueChange }) {
//   const majorStep = 5;
//   const visibleRange = 15;
//   const currentValue = Math.max(min, Math.min(max, value));
//   const ticks = getRulerData(currentValue, visibleRange, step, majorStep, min, max);

//   const handleRulerClick = (event) => {
//     const rulerRect = event.currentTarget.getBoundingClientRect();
//     const clickX = event.clientX - rulerRect.left;
//     const rulerWidth = rulerRect.width;
//     const tickWidth = rulerWidth / ticks.length;
//     const clickedIndex = Math.floor(clickX / tickWidth);
    
//     if (ticks[clickedIndex]) {
//       const clickedValue = ticks[clickedIndex].value;
//       const clampedValue = Math.max(min, Math.min(max, clickedValue));
//       onValueChange(clampedValue);
//     }
//   };

//   const getTickPosition = (tickValue) => {
//     const rangeStart = ticks[0]?.value || min;
//     const rangeEnd = ticks[ticks.length - 1]?.value || max;
//     return ((tickValue - rangeStart) / (rangeEnd - rangeStart)) * 100;
//   };

//   const centerPosition = getTickPosition(currentValue);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "100%",
//         maxWidth: 420,
//         position: "relative",
//         marginTop: 3,
//         padding: "0 16px",
//       }}
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: -50,
//           left: `${centerPosition}%`,
//           transform: "translateX(-50%)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           zIndex: 2,
//         }}
//       >
//         <Box
//           sx={{
//             color: "#1172ba",
//             padding: "8px 16px",
//             fontSize: "1.125rem",
//             fontWeight: "600",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {currentValue.toFixed(0)} {unit}
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           position: "relative",
//           width: "100%",
//           height: 80,
//           cursor: "pointer",
//           overflow: "hidden",
//         }}
//         onClick={handleRulerClick}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-end",
//             position: "relative",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           {ticks.map((tick, index) => {
//             const isCenter = Math.abs(tick.value - currentValue) < step / 2;
//             const tickPercent = (index / (ticks.length - 1)) * 100;
            
//             return (
//               <Box
//                 key={`${tick.value}-${index}`}
//                 sx={{
//                   position: "absolute",
//                   left: `${tickPercent}%`,
//                   transform: "translateX(-50%)",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   bottom: 0,
//                 }}
//               >
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     marginBottom: "6px",
//                     fontSize: "0.75rem",
//                     fontWeight: "500",
//                     color: isCenter ? "#1172ba" : "#000",
//                     visibility: tick.isMajor ? "visible" : "hidden",
//                     minWidth: "20px",
//                     textAlign: "center",
//                   }}
//                 >
//                   {tick.label}
//                 </Typography>

//                 <Box
//                   sx={{
//                     width: "2px",
//                     height: isCenter ? "100px" : tick.isMajor ? "50px" : "20px",
//                     backgroundColor: isCenter ? "#1172ba" : "#000",
//                     transition: "all 0.2s ease",
//                   }}
//                 />
//               </Box>
//             );
//           })}
//         </Box>

//         <Box
//           sx={{
//             position: "absolute",
//             bottom: 0,
//             left: `${centerPosition}%`,
//             transform: "translateX(-50%)",
//             backgroundColor: "#1172ba",
//             width: "3px",
//             height: "100px",
//             borderRadius: "1.5px",
//             zIndex: 3,
//             pointerEvents: "none",
//             // boxShadow: "0 0 8px rgba(17, 114, 186, 0.4)",
//           }}
//         />
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           width: "100%",
//           marginTop: 1,
//           paddingX: 1,
//         }}
//       >
//         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem", fontWeight: "500" }}>
//           {/* {ticks[0]?.value.toFixed(0) || min} {unit} */}
//         </Typography>
//         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem", fontWeight: "500" }}>
//           {/* {ticks[ticks.length - 1]?.value.toFixed(0) || max} {unit} */}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// export default function WeightSelector({ 
//   weight, 
//   weightUnit, 
//   onWeightChange, 
//   onUnitChange, 
//   error, 
//   touched 
// }) {
//   const handleUnitChange = (event, newUnit) => {
//     if (newUnit !== null) {
//       onUnitChange(newUnit);
      
//       if (weight) {
//         let convertedWeight;
//         if (newUnit === "kg") {
//           convertedWeight = (weight * 0.453592).toFixed(2);
//           console.log("conveted value", convertedWeight);
          
//         } else {
//           convertedWeight = (weight / 0.453592).toFixed(2);
//         }
        
//         const syntheticEvent = {
//           target: {
//             name: "weight",
//             value: convertedWeight
//           }
//         };
//         onWeightChange(syntheticEvent, convertedWeight);
//       }
//     }
//   };

//   const handleWeightInputChange = (event) => {
//     let value = event.target.value;
//     // .replace(/\D/g, "");
//     let numericValue = Number(value);
//     const maxLimit = weightUnit === "lbs" ? 661 : 300;
    
//     if (numericValue > maxLimit) {
//       numericValue = maxLimit;
//     }

//     onWeightChange(event, numericValue || "");
//   };

//   const handleRulerChange = (newValue) => {
//     const syntheticEvent = {
//       target: {
//         name: "weight",
//         value: newValue
//       }
//     };
//     onWeightChange(syntheticEvent, newValue);
//   };

//   const min = 0;
//   const max = weightUnit === "kg" ? 300 : 661;
//   const step = 1;

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "1.5rem",
//         mt: "15px",
//         padding: "0 16px",
//       }}
//     >
//       <ToggleButtonGroup
//         value={weightUnit}
//         exclusive
//         onChange={handleUnitChange}
//         sx={{
//           display: "inline-flex",
//           boxShadow: "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//           borderRadius: "20px",
//         }}
//       >
//         {["kg", "lbs"].map((unit) => (
//           <ToggleButton
//             key={unit}
//             value={unit}
//             sx={{
//               textTransform: "none",
//               fontFamily: 'Roboto, Arial, sans-serif',
//               border: "none",
//               padding: "10px 30px",
//               fontWeight: "500",
//               fontSize: "1rem",
//               "&.Mui-selected": {
//                 backgroundColor: "#1976d2",
//                 color: "#fff",
//               },
//               "&.Mui-selected:hover": {
//                 backgroundColor: "#1565c0",
//               },
//             }}
//           >
//             {unit}
//           </ToggleButton>
//         ))}
//       </ToggleButtonGroup>

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "0.5rem",
//         }}
//       >
//         <CustomTextField
//           id="weight"
//           name="weight"
//           placeholder="0"
//           type="number"
//           value={weight || ''}
//           onChange={handleWeightInputChange}
//           error={touched && Boolean(error)}
//           InputProps={{
//             endAdornment: (
//               <Typography variant="h6" sx={{ ml: 1, fontWeight: "500", color: "text.primary" }}>
//                 {weightUnit}
//               </Typography>
//             ),
//           }}
//           sx={{
//             width: "200px",
//             "& .MuiOutlinedInput-root": {
//               fontWeight: 500,
//               fontFamily: "Nunito, sans-serif",
//               fontSize: "1.25rem",
//               lineHeight: 1.4375,
//               color: "rgba(0,0,0,0.87)",
//               paddingRight: "14px",
//               "& fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#e0e0e0",
//                 borderWidth: "2px",
//               },
//               "&:hover fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//                 borderWidth: "2px",
//               },
//             },
//           }}
//         />
//         {touched && error && (
//           <FormHelperText error sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
//             {error}
//           </FormHelperText>
//         )}
//       </Box>

//       <RulerBar
//         value={Number(weight) || 0}
//         min={min}
//         max={max}
//         step={step}
//         unit={weightUnit}
//         onValueChange={handleRulerChange}
//       />
//     </Box>
//   );
// }




















// "use client";

// import {
//   Box,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
//   TextField,
//   FormHelperText,
// } from "@mui/material";

// export default function HeightSelector({ height, heightUnit, onHeightChange, onUnitChange, error, touched }) {
//   const handleUnitChange = (event, newUnit) => {
//     if (newUnit !== null) {
//       onUnitChange(newUnit);
//     }
//   };

//   // const handleHeightInputChange = (event) => {
//   //   const value = event.target.value;
//   //   // Allow numbers and decimal point
//   //   if (value === '' || /^\d*\.?\d*$/.test(value)) {
//   //     // Create synthetic event for Formik
//   //     onHeightChange(event, value ? parseFloat(value) : 0);
//   //   }
//   // };

//   const handleHeightInputChange = (event) =>{
//     let value =  event.target.value.replace(/\D/g,"");
//     let numericValue = Number(value);

//     const maxLimit = heightUnit === "cm" ? 250 : 98.43;
//     if (numericValue > maxLimit) numericValue = maxLimit;

//     onHeightChange(event, numericValue || "");
//   }

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "1rem",
//         mt: "15px",
//       }}
//     >
//       {/* Unit Selector */}
//       <ToggleButtonGroup
//         value={heightUnit}
//         exclusive
//         onChange={handleUnitChange}
//         sx={{
//           display: "inline-flex",
//           boxShadow:
//             "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
//           borderRadius: "20px",
//         }}
//       >
//         {/* <ToggleButton
//           value="cm"
//           sx={{
//             textTransform: "none",
//             border: "none",
//             padding: "10px 30px",
//             fontWeight: "bold",
//             "&.Mui-selected": {
//               backgroundColor: "#1976d2",
//               color: "#fff",
//             },
//             "&.Mui-selected:hover": {
//               backgroundColor: "#1565c0",
//             },
//           }}
//         >
//           cm
//         </ToggleButton>

//         <ToggleButton
//           value="inch"
//           sx={{
//             textTransform: "none",
//             border: "none",
//             padding: "10px 30px",
//             fontWeight: "bold",
//             "&.Mui-selected": {
//               backgroundColor: "#1976d2",
//               color: "#fff",
//             },
//             "&.Mui-selected:hover": {
//               backgroundColor: "#1565c0",
//             },
//           }}
//         >
//           Inch
//         </ToggleButton> */}

//         {["cm", "inch"].map((unit) => (
//           <ToggleButton
//             key={unit}
//             value={unit}
//             sx={{
//               textTransform: "none",
//               fontFamily: 'Roboto, Arial, sans-serif',
//               border: "none",
//               padding: "10px 30px",
//               fontWeight: "bold",
//               "&.Mui-selected": {
//                 backgroundColor: "#1976d2",
//                 color: "#fff",
//               },
//               "&.Mui-selected:hover": {
//                 backgroundColor: "#1565c0",
//               },
//             }}
//           >
//             {unit}
//           </ToggleButton>
//         ))}  

//       </ToggleButtonGroup>

//       {/* Height Input */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "0.5rem",
//         }}
//       >
//         <TextField
//           id="height"
//           name="height"
//           placeholder="0"
//           type="tel"
//           value={height || ''}
//           onChange={handleHeightInputChange}
//           error={touched && Boolean(error)}
//           InputProps={{
//             endAdornment: (
//               <Typography variant="h6" sx={{ ml: 1 }}>
//                 {heightUnit}
//               </Typography>
//             ),
//           }}
//           sx={{
//             width: "250px",
//             "& .MuiOutlinedInput-root": {
//               fontWeight: 400,
//               fontFamily: "Nunito, sans-serif",
//               fontSize: "1rem",
//               lineHeight: 1.4375,
//               color: "rgba(0,0,0,0.87)",
//               paddingRight: "14px",
//               "& fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#e0e0e0",
//               },
//               "&:hover fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: touched && error ? "#d32f2f" : "#1976d2",
//               },
//             },
//           }}
//         />
//         {touched && error && (
//           <FormHelperText error>{error}</FormHelperText>
//         )}
//       </Box>
//     </Box>
//   );
// }






//  -----------------------------  Extra code ------------------------------------

// "use client";

// import { Box, Paper, Typography } from "@mui/material";
// import dynamic from "next/dynamic";
// import React, { useState } from "react";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// export default function chart() {
//   const dataLength = 100;
//   const visiblePoints = 50;

//   const [chartData] = useState({
//     series: [
//       {
//         name: "Sales",
//         data: Array.from({ length: dataLength }, () =>
//           Math.floor(Math.random() * 200 + 1)
//         ),
//       },
//     ],
//       options: {
//         chart: {
//           height: 550,
//           type: "line",
//           toolbar: { show: false },
//           zoom: { enabled: false },
//         },
//         stroke: { curve: "smooth" },
//         grid: {
//           borderColor: "#ccc",
//           borderDashArray: 5, 
//           row: {
//             colors: ["transparent", "transparent"],
//             opacity: 0.5,
//           },
//           column: {
//             colors: ["transparent", "transparent"],
//             opacity: 0.5,
//           },
//         },
//         xaxis: {
//           categories: Array.from({ length: dataLength }, (_, i) => `Day ${i + 1}`),
//           labels: { rotate: -45, style: { fontSize: "12px" } },
//           tickAmount: visiblePoints,
//           min: 0,
//           max: visiblePoints - 1,
//         },
//         yaxis: {
//           title: { text: "Sales" },
//         },
//         title: {
//           text: "100 Data Points Chart with Dashed Grid",
//           align: "left",
//         },
//         dataLabels: { enabled: false },
//         tooltip: { enabled: true },
//       },
//     width: dataLength * 60,
//   });

//   return (
//     <>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           width: "100%",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "200px",
//           bgcolor: "#1e7810ff",
//           p: 2,
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             p: 3,
//             width: "100%",
//             maxWidth: 600,
//             textAlign: "center",
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             This is test chart/graph
//           </Typography>
//         </Paper>
//       </Box>

//       {/* Chart with hidden scrollbar */}
//       <Box
//         sx={{
//           overflowX: "auto", // enables horizontal scrolling
//           width: "100%",
//           msOverflowStyle: "none", // IE & Edge
//           scrollbarWidth: "none", // Firefox
//           "&::-webkit-scrollbar": {
//             display: "none", // Chrome, Safari, Opera
//           },
//         }}
//       >
//         <Box sx={{ width: `${dataLength * 60}px` }}>
//           <Chart
//             options={chartData.options}
//             series={chartData.series}
//             type="line"
//             height={550}
//             width={dataLength * 60}
//           />
//         </Box>
//       </Box>
//     </>
//   );
// }













// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import dynamic from "next/dynamic";
// import {
//   Box, Paper, Typography, Card, CardContent, IconButton,
//   Chip, Stack, useTheme, Skeleton
// } from "@mui/material";
// import { Refresh, ZoomIn, ZoomOut, FilterList } from "@mui/icons-material";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// export default function EnhancedChart() {
//   const theme = useTheme();
//   const dataLength = 100;
//   const visiblePoints = 50;

//   // zoom / refresh state (refreshKey triggers regeneration)
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [refreshKey, setRefreshKey] = useState(0);

//   // CLIENT-ONLY data state: start as `null` so server and initial client render match
//   const [clientData, setClientData] = useState(null);

//   // Generate data on the client only (runs on mount and when refreshKey changes)
//   useEffect(() => {
//     const newData = Array.from({ length: dataLength }, () => Math.floor(Math.random() * 200 + 1));
//     setClientData(newData);
//   }, [refreshKey, dataLength]);

//   // Build chart config from clientData. If data is null show placeholders / empty series.
//   const chartData = useMemo(() => {
//     if (!clientData) {
//       // initial placeholder config (no data yet)
//       return {
//         series: [{ name: "Sales", data: [] }],
//         stats: { max: "—", min: "—", avg: "—" },
//         options: {
//           chart: { height: 450, type: "line", toolbar: { show: false }, zoom: { enabled: false }, animations: { enabled: true }, foreColor: theme.palette.text.secondary },
//           stroke: { curve: "smooth", width: 3, colors: [theme.palette.primary.main] },
//           fill: { type: "gradient", gradient: { shade: "dark", type: "vertical", shadeIntensity: 0.5, gradientToColors: [theme.palette.primary.light], inverseColors: false, opacityFrom: 0.3, opacityTo: 0.1 } },
//           grid: { borderColor: theme.palette.divider, strokeDashArray: 3, row: { colors: ["transparent", "transparent"], opacity: 0.2 }, column: { colors: ["transparent", "transparent"], opacity: 0.2 }, padding: { top: 10, right: 20, bottom: 10, left: 20 } },
//           xaxis: { categories: Array.from({ length: dataLength }, (_, i) => `Day ${i + 1}`), labels: { rotate: -45, style: { fontSize: "11px", colors: theme.palette.text.secondary } }, tickAmount: visiblePoints, min: 0, max: visiblePoints - 1, axisBorder: { show: true, color: theme.palette.divider } },
//           yaxis: { title: { text: "Sales Units", style: { color: theme.palette.text.secondary } }, labels: { style: { colors: theme.palette.text.secondary } } },
//           title: { text: "Sales Performance Analytics", align: "left", style: { fontSize: "20px", fontWeight: "600", color: theme.palette.text.primary }, margin: 20 },
//           // dataLabels: { enabled: false },
//           // tooltip: { enabled: true, theme: theme.palette.mode, style: { fontSize: '12px' }, x: { show: true } },
//           // markers: { size: 4, strokeColors: theme.palette.primary.main, strokeWidth: 2, hover: { size: 6 } },
//         },
//         width: dataLength * 60 * zoomLevel,
//       };
//     }

//     // when we have clientData, compute stats normally
//     const data = clientData;
//     console.log("---------------------");
    
//     console.log("values of data is", data);
    
//     const maxValue = Math.max(...data);
//     console.log("max value is:", maxValue);
    
//     const minValue = Math.min(...data);
//     console.log("min value", minValue);
    
//     const avgValue = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
//     console.log("avg values:", avgValue);
    

//     return {
//       series: [{ name: "Sales", data }],
//       stats: { max: maxValue, min: minValue, avg: avgValue },
//       options: {
//         chart: { height: 450, type: "line", toolbar: { show: false }, zoom: { enabled: false }, animations: { enabled: true, easing: 'easeinout', speed: 800 }, foreColor: theme.palette.text.secondary },
//         stroke: { curve: "smooth", width: 3, colors: [theme.palette.primary.main] },
//         fill: { type: "gradient", gradient: { shade: "dark", type: "vertical", shadeIntensity: 0.5, gradientToColors: [theme.palette.primary.light], inverseColors: false, opacityFrom: 0.3, opacityTo: 0.1 } },
//         grid: { borderColor: theme.palette.divider, strokeDashArray: 3, row: { colors: ["transparent", "transparent"], opacity: 0.2 }, column: { colors: ["transparent", "transparent"], opacity: 0.2 }, padding: { top: 10, right: 20, bottom: 10, left: 20 } },
//         xaxis: { categories: Array.from({ length: dataLength }, (_, i) => `Day ${i + 1}`), labels: { rotate: -45, style: { fontSize: "11px", colors: theme.palette.text.secondary } }, tickAmount: visiblePoints, min: 0, max: visiblePoints - 1, axisBorder: { show: true, color: theme.palette.divider } },
//         yaxis: { title: { text: "Sales Units", style: { color: theme.palette.text.secondary } }, labels: { style: { colors: theme.palette.text.secondary } } },
//         title: { text: "Sales Performance Analytics", align: "left", style: { fontSize: "20px", fontWeight: "600", color: theme.palette.text.primary }, margin: 20 },
//         dataLabels: { enabled: false },
//         tooltip: { enabled: true, theme: theme.palette.mode, style: { fontSize: '12px' }, x: { show: true, format: 'dd MMM yyyy' } },
//         markers: { size: 4, strokeColors: theme.palette.primary.main, strokeWidth: 2, hover: { size: 6 } },
//       },
//       width: dataLength * 60 * zoomLevel,
//     };
//   }, [clientData, zoomLevel, theme, dataLength, visiblePoints]);

//   // Handlers
//   const handleRefresh = () => setRefreshKey(prev => prev + 1);
//   const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2));
//   const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));

//   return (
//     <Box sx={{ minHeight: "100vh", background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`, p: { xs: 1, sm: 3 } }}>
//       {/* Header */}
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "280px", background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, borderRadius: 3, mb: 4, p: 3, position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 50%)' } }}>
//         <Paper elevation={8} sx={{ p: 4, width: "100%", maxWidth: 800, textAlign: "center", borderRadius: 4, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
//           <Typography variant="h4" gutterBottom sx={{ fontWeight: "700", background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', mb: 2 }}>
//             Advanced Analytics Dashboard
//           </Typography>
//           <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>Real-time Sales Performance Metrics & Insights</Typography>

//           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
//             <Card sx={{ minWidth: 120, background: theme.palette.success.light }}>
//               <CardContent sx={{ textAlign: 'center', p: 2 }}>
//                 {clientData ? (
//                   <Typography variant="h6" color="success.dark">{chartData.stats.max}</Typography>
//                 ) : (
//                   <Skeleton variant="text" width={60} />
//                 )}
//                 <Typography variant="caption" color="success.dark">Peak Sales</Typography>
//               </CardContent>
//             </Card>

//             <Card sx={{ minWidth: 120, background: theme.palette.info.light }}>
//               <CardContent sx={{ textAlign: 'center', p: 2 }}>
//                 {clientData ? (
//                   <Typography variant="h6" color="info.dark">{chartData.stats.avg}</Typography>
//                 ) : (
//                   <Skeleton variant="text" width={40} />
//                 )}
//                 <Typography variant="caption" color="info.dark">Average</Typography>
//               </CardContent>
//             </Card>

//             <Card sx={{ minWidth: 120, background: theme.palette.warning.light }}>
//               <CardContent sx={{ textAlign: 'center', p: 2 }}>
//                 {clientData ? (
//                   <Typography variant="h6" color="warning.dark">{chartData.stats.min}</Typography>
//                 ) : (
//                   <Skeleton variant="text" width={40} />
//                 )}
//                 <Typography variant="caption" color="warning.dark">Lowest</Typography>
//               </CardContent>
//             </Card>
//           </Stack>
//         </Paper>
//       </Box>

//       {/* Controls */}
//       <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <Typography variant="h6" sx={{ fontWeight: 600 }}>Sales Trend Analysis</Typography>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Chip icon={<FilterList />} label="Last 100 Days" variant="outlined" size="small" />
//             <IconButton onClick={handleZoomOut} size="small" color="primary"><ZoomOut /></IconButton>
//             <Typography variant="body2" sx={{ minWidth: 60, textAlign: 'center' }}>{Math.round(zoomLevel * 100)}%</Typography>
//             <IconButton onClick={handleZoomIn} size="small" color="primary"><ZoomIn /></IconButton>
//             <IconButton onClick={handleRefresh} size="small" color="primary"><Refresh /></IconButton>
//           </Stack>
//         </Box>
//       </Paper>

//       {/* Chart */}
//       <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden', background: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
//         <Box sx={{ overflowX: "auto", width: "100%", msOverflowStyle: "none", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" }, background: `linear-gradient(to right, ${theme.palette.background.paper} 0%, transparent 10%, transparent 90%, ${theme.palette.background.paper} 100%)` }}>
//           <Box sx={{ width: `${chartData.width}px`, transition: 'width 0.3s ease-in-out', minWidth: '100%' }}>
//             <Chart 
//               options={chartData.options}
//               series={chartData.series}
//               // type="line"
//               // type="area"
//               // type="bar"
//               // type="histogram"
//               // type="pie"
//               // type="donut"
//               // type="radialBar"
//               // type="scatter"
//               // type="bubble"
//               // type="heatmap"
//               // type="treemap"
//               // type="candlestick"
//               // type="boxPlot"
//               // type="radar"
//               // type="polarArea"
//               // type="rangeBar"
//              height={550}
//              width={chartData.width}
//             />
//           </Box>
//         </Box>
//       </Paper>

//       <Box sx={{ textAlign: 'center', mt: 3, mb: 2 }}>
//         <Typography variant="caption" color="text.secondary">• Hover over points for detailed information • Scroll horizontally to explore full dataset •</Typography>
//       </Box>
//     </Box>
//   );
// }































// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import dynamic from "next/dynamic";
// import {
//   Box, Paper, Typography, Card, CardContent, IconButton,
//   Chip, Stack, useTheme, Skeleton, Fade, Slide, Grow, Zoom
// } from "@mui/material";
// import { Refresh, ZoomIn, ZoomOut, FilterList } from "@mui/icons-material";
// import Layout from "../component/Layout";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// export default function EnhancedChart() {
//   const theme = useTheme();
//   const dataLength = 50;
//   const visiblePoints = 19;

//   // zoom / refresh state (refreshKey triggers regeneration)
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [refreshKey, setRefreshKey] = useState(0);

//   // CLIENT-ONLY data state: start as `null` so server and initial client render match
//   const [clientData, setClientData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Generate data on the client only (runs on mount and when refreshKey changes)
//   useEffect(() => {
//     setIsLoading(true);
//     // Add a slight delay to show loading transitions
//     const timer = setTimeout(() => {
//       const newData = Array.from({ length: dataLength }, () => Math.floor(Math.random() * 100 + 1));
//       setClientData(newData);
//       setIsLoading(false);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [refreshKey, dataLength]);

//   // Build chart config from clientData. If data is null show placeholders / empty series.
//   const chartData = useMemo(() => {
//     if (!clientData) {
//       // initial placeholder config (no data yet)
//       return {
//         series: [{ name: "Sales", data: [] }],
//         stats: { max: "—", min: "—", avg: "—" },
//         options: {
//           chart: { 
//             height: 450, 
//             type: "line", 
//             toolbar: { show: false }, 
//             zoom: { enabled: false }, 
//             animations: { enabled: true, easing: 'easeinout', speed: 1200 }, 
//             foreColor: theme.palette.text.secondary 
//           },
//           stroke: { curve: "smooth", width: 3, colors: [theme.palette.primary.main] },
//           fill: { 
//             type: "gradient", 
//             gradient: { 
//               shade: "dark", 
//               type: "vertical", 
//               shadeIntensity: 0.5, 
//               gradientToColors: [theme.palette.primary.light], 
//               inverseColors: false, 
//               opacityFrom: 0.3, 
//               opacityTo: 0.1 
//             } 
//           },
//           grid: { 
//             borderColor: theme.palette.divider, 
//             strokeDashArray: 3, 
//             row: { colors: ["transparent", "transparent"], opacity: 0.2 }, 
//             column: { colors: ["transparent", "transparent"], opacity: 0.2 }, 
//             padding: { top: 10, right: 20, bottom: 10, left: 20 } 
//           },
//           xaxis: { 
//             categories: Array.from({ length: dataLength }, (_, i) => `Day ${i + 1}`), 
//             labels: { rotate: -45, style: { fontSize: "11px", colors: theme.palette.text.secondary } }, 
//             tickAmount: visiblePoints, 
//             min: 0, 
//             max: visiblePoints - 1, 
//             axisBorder: { show: true, color: theme.palette.divider } 
//           },
//           yaxis: { 
//             title: { text: "Sales Units", style: { color: theme.palette.text.secondary } }, 
//             labels: { style: { colors: theme.palette.text.secondary } } 
//           },
//           title: { 
//             text: "Sales Performance Analytics", 
//             align: "left", 
//             style: { fontSize: "20px", fontWeight: "600", color: theme.palette.text.primary }, 
//             margin: 20 
//           },
//         },
//         width: dataLength * 60 * zoomLevel,
//       };
//     }

//     // when we have clientData, compute stats normally
//     const data = clientData;
//     const maxValue = Math.max(...data);
//     console.log("max values", maxValue);
    
//     const minValue = Math.min(...data);
//     console.log("min values", minValue);
    
//     const avgValue = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
//     console.log("the values of sales data",data);
    

//     return {
//       series: [{ name: "Sales", data }],
//       stats: { max: maxValue, min: minValue, avg: avgValue },
//       options: {
//         chart: { 
//           height: 450, 
//           type: "line", 
//           toolbar: { show: false }, 
//           zoom: { enabled: false }, 
//           animations: { 
//             enabled: true, 
//             easing: 'easeinout', 
//             speed: 1200,
//             animateGradually: {
//               enabled: true,
//               delay: 150
//             },
//             dynamicAnimation: {
//               enabled: true,
//               speed: 800
//             }
//           }, 
//           foreColor: theme.palette.text.secondary 
//         },
//         stroke: { curve: "smooth", width: 3, colors: [theme.palette.primary.main] },
//         fill: { 
//           type: "gradient", 
//           gradient: { 
//             shade: "dark", 
//             type: "vertical", 
//             shadeIntensity: 0.5, 
//             gradientToColors: [theme.palette.primary.light], 
//             inverseColors: false, 
//             opacityFrom: 0.3, 
//             opacityTo: 0.1 
//           } 
//         },
//         grid: { 
//           borderColor: theme.palette.divider, 
//           strokeDashArray: 3, 
//           row: { colors: ["transparent", "transparent"], opacity: 0.2 }, 
//           column: { colors: ["transparent", "transparent"], opacity: 0.2 }, 
//           padding: { top: 10, right: 20, bottom: 10, left: 20 } 
//         },
//         xaxis: { 
//           categories: Array.from({ length: dataLength }, (_, i) => `Day ${i + 1}`), 
//           labels: { rotate: -45, style: { fontSize: "11px", colors: theme.palette.text.secondary } }, 
//           tickAmount: visiblePoints, 
//           min: 0, 
//           max: visiblePoints - 1, 
//           axisBorder: { show: true, color: theme.palette.divider } 
//         },
//         yaxis: { 
//           title: { text: "Sales Units", style: { color: theme.palette.text.secondary } }, 
//           labels: { style: { colors: theme.palette.text.secondary } } 
//         },
//         title: { 
//           text: "Sales Performance Analytics", 
//           align: "left", 
//           style: { fontSize: "20px", fontWeight: "600", color: theme.palette.text.primary }, 
//           margin: 20 
//         },
//         dataLabels: { enabled: false },
//         tooltip: { 
//           enabled: true, 
//           theme: theme.palette.mode, 
//           style: { fontSize: '12px' }, 
//           x: { show: true, format: 'dd MMM yyyy' } 
//         },
//         markers: { 
//           size: 4, 
//           strokeColors: theme.palette.primary.main, 
//           strokeWidth: 2, 
//           hover: { size: 6 } 
//         },
//       },
//       width: dataLength * 60 * zoomLevel,
//     };
//   }, [clientData, zoomLevel, theme, dataLength, visiblePoints]);

//   // Handlers with smooth state transitions
//   const handleRefresh = () => {
//     setRefreshKey(prev => prev + 1);
//   };
  
//   const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2));
//   const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));

//   return (
//     <Layout>
//         <Box sx={{ 
//       minHeight: "100vh", 
//       background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`, 
//       p: { xs: 1, sm: 3 },
//       transition: 'all 0.5s ease-in-out'
//     }}>
      
//       {/* Header with enhanced animations */}
//       <Fade in timeout={800}>
//         <Box sx={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           alignItems: "center", 
//           minHeight: "280px", 
//           background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, 
//           borderRadius: 3, 
//           mb: 4, 
//           p: 3, 
//           position: 'relative', 
//           overflow: 'hidden',
//           transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
//           transform: 'translateY(0)',
//           '&:hover': {
//             transform: 'translateY(-2px)',
//             boxShadow: theme.shadows[12],
//           },
//           '&::before': { 
//             content: '""', 
//             position: 'absolute', 
//             top: 0, 
//             left: 0, 
//             right: 0, 
//             bottom: 0, 
//             background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 50%)',
//             transition: 'opacity 0.3s ease'
//           }
//         }}>
//           <Zoom in timeout={1000}>
//             <Paper elevation={8} sx={{ 
//               p: 4, 
//               width: "100%", 
//               maxWidth: 800, 
//               textAlign: "center", 
//               borderRadius: 4, 
//               background: 'rgba(255, 255, 255, 0.95)', 
//               backdropFilter: 'blur(10px)', 
//               border: '1px solid rgba(255, 255, 255, 0.2)',
//               transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//               '&:hover': {
//                 transform: 'scale(1.01)',
//                 background: 'rgba(255, 255, 255, 0.98)',
//               }
//             }}>
//               <Slide direction="down" in timeout={1200}>
//                 <Typography variant="h4" gutterBottom sx={{ 
//                   fontWeight: "700", 
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, 
//                   backgroundClip: 'text', 
//                   WebkitBackgroundClip: 'text', 
//                   color: 'transparent', 
//                   mb: 2,
//                   transition: 'all 0.3s ease'
//                 }}>
//                   Advanced Analytics Dashboard
//                 </Typography>
//               </Slide>
              
//               <Slide direction="up" in timeout={1400}>
//                 <Typography variant="h6" color="text.secondary" sx={{ 
//                   mb: 3,
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     color: theme.palette.text.primary
//                   }
//                 }}>
//                   Real-time Sales Performance Metrics & Insights
//                 </Typography>
//               </Slide>

//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
//                 {[
//                   { 
//                     label: 'Peak Sales', 
//                     value: clientData ? chartData.stats.max : null, 
//                     color: 'success',
//                     delay: 1600 
//                   },
//                   { 
//                     label: 'Average', 
//                     value: clientData ? chartData.stats.avg : null, 
//                     color: 'info',
//                     delay: 1800 
//                   },
//                   { 
//                     label: 'Lowest', 
//                     value: clientData ? chartData.stats.min : null, 
//                     color: 'warning',
//                     delay: 2000 
//                   }
//                 ].map((stat, index) => (
//                   <Grow key={stat.label} in timeout={stat.delay}>
//                     <Card sx={{ 
//                       minWidth: 120, 
//                       background: theme.palette[stat.color].light,
//                       transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//                       cursor: 'pointer',
//                       '&:hover': {
//                         transform: 'translateY(-4px) scale(1.05)',
//                         boxShadow: theme.shadows[8],
//                         background: theme.palette[stat.color].main,
//                       }
//                     }}>
//                       <CardContent sx={{ textAlign: 'center', p: 2 }}>
//                         {stat.value !== null && !isLoading ? (
//                           <Fade in timeout={300}>
//                             <Typography variant="h6" color={`${stat.color}.dark`} sx={{
//                               transition: 'all 0.3s ease',
//                               fontWeight: 'bold'
//                             }}>
//                               {stat.value}
//                             </Typography>
//                           </Fade>
//                         ) : (
//                           <Skeleton variant="text" width={60} animation="wave" />
//                         )}
//                         <Typography variant="caption" color={`${stat.color}.dark`} sx={{
//                           transition: 'all 0.3s ease',
//                           fontWeight: 500
//                         }}>
//                           {stat.label}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Grow>
//                 ))}
//               </Stack>
//             </Paper>
//           </Zoom>
//         </Box>
//       </Fade>

//       {/* Controls with smooth transitions */}
//       <Slide direction="up" in timeout={600}>
//         <Paper elevation={2} sx={{ 
//           p: 2, 
//           mb: 3, 
//           borderRadius: 3,
//           transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//           '&:hover': {
//             elevation: 4,
//             boxShadow: theme.shadows[4],
//           }
//         }}>
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center', 
//             flexWrap: 'wrap', 
//             gap: 2 
//           }}>
//             <Typography variant="h6" sx={{ 
//               fontWeight: 600,
//               transition: 'color 0.3s ease',
//               '&:hover': {
//                 color: theme.palette.primary.main
//               }
//             }}>
//               Sales Trend Analysis
//             </Typography>
            
//             <Stack direction="row" spacing={1} alignItems="center">
//               <Chip 
//                 icon={<FilterList />} 
//                 label="Last 100 Days" 
//                 variant="outlined" 
//                 size="small" 
//                 sx={{
//                   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                   '&:hover': {
//                     backgroundColor: theme.palette.primary.light,
//                     color: theme.palette.primary.contrastText,
//                     transform: 'scale(1.05)'
//                   }
//                 }}
//               />
              
//               <IconButton 
//                 onClick={handleZoomOut} 
//                 size="small" 
//                 color="primary"
//                 sx={{
//                   transition: 'all 0.2s ease',
//                   '&:hover': {
//                     transform: 'scale(1.1) rotate(-5deg)',
//                     backgroundColor: theme.palette.primary.light,
//                   }
//                 }}
//               >
//                 <ZoomOut />
//               </IconButton>
              
//               <Typography variant="body2" sx={{ 
//                 minWidth: 60, 
//                 textAlign: 'center',
//                 transition: 'all 0.3s ease',
//                 fontWeight: 600,
//                 color: theme.palette.primary.main
//               }}>
//                 {Math.round(zoomLevel * 100)}%
//               </Typography>
              
//               <IconButton 
//                 onClick={handleZoomIn} 
//                 size="small" 
//                 color="primary"
//                 sx={{
//                   transition: 'all 0.2s ease',
//                   '&:hover': {
//                     transform: 'scale(1.1) rotate(5deg)',
//                     backgroundColor: theme.palette.primary.light,
//                   }
//                 }}
//               >
//                 <ZoomIn />
//               </IconButton>
              
//               <IconButton 
//                 onClick={handleRefresh} 
//                 size="small" 
//                 color="primary"
//                 disabled={isLoading}
//                 sx={{
//                   transition: 'all 0.2s ease',
//                   '&:hover': {
//                     transform: 'scale(1.1)',
//                     backgroundColor: theme.palette.secondary.light,
//                   },
//                   '&:active': {
//                     transform: 'scale(0.95) rotate(180deg)',
//                   },
//                   ...(isLoading && {
//                     animation: 'spin 1s linear infinite',
//                   }),
//                   '@keyframes spin': {
//                     '0%': {
//                       transform: 'rotate(0deg)',
//                     },
//                     '100%': {
//                       transform: 'rotate(360deg)',
//                     },
//                   },
//                 }}
//               >
//                 <Refresh />
//               </IconButton>
//             </Stack>
//           </Box>
//         </Paper>
//       </Slide>

//       {/* Chart with enhanced transitions */}
//       {/* <Fade in timeout={1000}>
//         <Paper elevation={4} sx={{ 
//           borderRadius: 3, 
//           overflow: 'hidden', 
//           background: theme.palette.background.paper, 
//           border: `1px solid ${theme.palette.divider}`,
//           transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//           '&:hover': {
//             boxShadow: theme.shadows[8],
//             transform: 'translateY(-1px)',
//           }
//         }}>
//           <Box sx={{ 
//             overflowX: "auto", 
//             width: "100%", 
//             msOverflowStyle: "none", 
//             scrollbarWidth: "none", 
//             "&::-webkit-scrollbar": { display: "none" }, 
//             background: `linear-gradient(to right, ${theme.palette.background.paper} 0%, transparent 10%, transparent 90%, ${theme.palette.background.paper} 100%)`,
//             transition: 'all 0.3s ease'
//           }}>
//             <Box sx={{ 
//               width: `${chartData.width}px`, 
//               transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)', 
//               minWidth: '100%',
//               opacity: isLoading ? 0.6 : 1,
//             }}>
//               <Chart 
//                 options={chartData.options}
//                 series={chartData.series}
//                 height={550}
//                 width={chartData.width}
//               />
//             </Box>
//           </Box>
//         </Paper>
//       </Fade> */}


//       {/* Chart with enhanced transitions */}
//       <Fade in timeout={1000}>
//         <Paper elevation={4} sx={{ 
//           borderRadius: 3, 
//           overflow: 'hidden', 
//           background: theme.palette.background.paper, 
//           border: `1px solid ${theme.palette.divider}`,
//           transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//           '&:hover': {
//             boxShadow: theme.shadows[8],
//             transform: 'translateY(-1px)',
//           }
//         }}>
//           <Box sx={{ overflowX: "auto", width: "100%", msOverflowStyle: "none", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
//             <Box sx={{ width: `${chartData.width}px`, minWidth: '100%' }}>
              
//               {/* Line Chart */}
//               <Typography variant="h6" sx={{ p: 2 }}>Line Chart</Typography>
//               <Chart
//                 options={chartData.options}
//                 series={chartData.series}
//                 type="line"
//                 height={450}
//                 width={chartData.width}
//               />

//               {/* Bar Chart */}
//               {/* <Typography variant="h6" sx={{ p: 2 }}>Bar Chart</Typography>
//               <Chart
//                 options={chartData.options}
//                 series={chartData.series}
//                 type="bar"
//                 height={450}
//                 width={chartData.width}
//               /> */}

//             </Box>
//           </Box>
//         </Paper>
//       </Fade>


//       {/* Footer with smooth entrance */}
//       <Slide direction="up" in timeout={1200}>
//         <Box sx={{ textAlign: 'center', mt: 3, mb: 2 }}>
//           <Typography variant="caption" color="text.secondary" sx={{
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               color: theme.palette.text.primary,
//               transform: 'scale(1.02)'
//             }
//           }}>
//             • Hover over points for detailed information • Scroll horizontally to explore full dataset •
//           </Typography>
//         </Box>
//       </Slide>
//     </Box>
//     </Layout>
  
//   );
// }











// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import dynamic from "next/dynamic";
// import {
//   Box, Paper, Typography, Card, CardContent, IconButton,
//   Chip, Stack, useTheme, Skeleton, Fade, Slide, Grow, Zoom,
//   LinearProgress, Avatar, Tooltip, Badge, Divider, ButtonGroup,
//   Switch, FormControlLabel, Accordion, AccordionSummary, AccordionDetails
// } from "@mui/material";
// import {
//   Refresh, ZoomIn, ZoomOut, FilterList, TrendingUp, TrendingDown,
//   Analytics, Timeline, BarChart, ShowChart, PieChart, Assessment,
//   Speed, Insights, DataUsage, ExpandMore, Settings, Fullscreen,
//   GetApp, Share, Notifications, Star, BookmarkBorder
// } from "@mui/icons-material";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// export default function EnhancedChart() {
//   const theme = useTheme();
//   const dataLength = 100;
//   const visiblePoints = 50;

//   // Enhanced state management
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [clientData, setClientData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chartType, setChartType] = useState("line");
//   const [showDataLabels, setShowDataLabels] = useState(false);
//   const [animationsEnabled, setAnimationsEnabled] = useState(true);
//   const [isDarkMode, setIsDarkMode] = useState(theme.palette.mode === 'dark');

//   // Generate enhanced data with trends
//   useEffect(() => {
//     setIsLoading(true);
//     const timer = setTimeout(() => {
//       const baseValue = 100;
//       const newData = Array.from({ length: dataLength }, (_, i) => {
//         const trend = Math.sin(i / 10) * 30;
//         const randomVariation = (Math.random() - 0.5) * 40;
//         const seasonality = Math.cos(i / 25) * 20;
//         return Math.max(10, Math.floor(baseValue + trend + randomVariation + seasonality));
//       });
//       setClientData(newData);
//       setIsLoading(false);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [refreshKey, dataLength]);

//   // Enhanced chart configuration
//   const chartData = useMemo(() => {
//     if (!clientData) {
//       return {
//         series: [{ name: "Sales", data: [] }],
//         stats: { max: "—", min: "—", avg: "—", trend: "—", growth: "—" },
//         options: {},
//         width: dataLength * 60 * zoomLevel,
//       };
//     }

//     const data = clientData;
//     const maxValue = Math.max(...data);
//     const minValue = Math.min(...data);
//     const avgValue = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
//     // const recentGrowth = ((data[data.length - 1] - data[0]) / data[0] * 100).toFixed(1);
//     // const trend = recentGrowth > 0 ? "up" : "down";

//     const baseOptions = {
//       chart: {
//         height: 450,
//         type: chartType,
//         toolbar: { show: false },
//         zoom: { enabled: false },
//         animations: {
//           enabled: animationsEnabled,
//           easing: 'easeinout',
//           speed: 1000,
//           animateGradually: { enabled: true, delay: 100 },
//           dynamicAnimation: { enabled: true, speed: 600 }
//         },
//         foreColor: theme.palette.text.secondary,
//         background: 'transparent',
//         dropShadow: {
//           enabled: true,
//           color: theme.palette.primary.main,
//           top: 0,
//           left: 0,
//           blur: 3,
//           opacity: 0.1
//         }
//       },
//       stroke: {
//         curve: "smooth",
//         width: chartType === 'line' ? 4 : 2,
//         colors: [theme.palette.primary.main, theme.palette.secondary.main]
//       },
//       fill: {
//         type: chartType === 'area' ? "gradient" : "solid",
//         gradient: {
//           shade: theme.palette.mode,
//           type: "vertical",
//           shadeIntensity: 0.4,
//           gradientToColors: [theme.palette.primary.light],
//           inverseColors: false,
//           opacityFrom: 0.8,
//           opacityTo: 0.1,
//           stops: [0, 50, 100]
//         },
//         colors: [theme.palette.primary.main, theme.palette.secondary.main]
//       },
//       grid: {
//         borderColor: theme.palette.divider,
//         strokeDashArray: 2,
//         padding: { top: 20, right: 30, bottom: 20, left: 30 },
//         xaxis: { lines: { show: true } },
//         yaxis: { lines: { show: true } }
//       },
//       xaxis: {
//         categories: Array.from({ length: dataLength }, (_, i) => `Day ${i + 1}`),
//         labels: {
//           rotate: -45,
//           style: { fontSize: "10px", colors: theme.palette.text.secondary }
//         },
//         tickAmount: visiblePoints,
//         min: 0,
//         max: visiblePoints - 1,
//         axisBorder: { show: true, color: theme.palette.divider }
//       },
//       yaxis: {
//         title: {
//           text: "Sales Performance",
//           style: { color: theme.palette.text.secondary, fontSize: '14px', fontWeight: 600 }
//         },
//         labels: {
//           style: { colors: theme.palette.text.secondary },
//           formatter: (value) => `${value}K`
//         }
//       },
//       title: {
//         text: "Advanced Sales Analytics Dashboard",
//         align: "left",
//         style: {
//           fontSize: "18px",
//           fontWeight: "700",
//           color: theme.palette.text.primary
//         },
//         margin: 25
//       },
//       subtitle: {
//         text: `Tracking ${dataLength} days of performance data`,
//         align: "left",
//         style: {
//           fontSize: "12px",
//           color: theme.palette.text.secondary
//         }
//       },
//       dataLabels: { enabled: showDataLabels },
//       tooltip: {
//         enabled: true,
//         theme: theme.palette.mode,
//         style: { fontSize: '12px' },
//         x: { show: true },
//         y: {
//           formatter: (value) => `${value} units`,
//           title: { formatter: () => "Sales: " }
//         },
//         marker: { show: true }
//       },
//       markers: {
//         size: chartType === 'line' ? 5 : 0,
//         strokeColors: theme.palette.background.paper,
//         strokeWidth: 2,
//         hover: { size: 8 }
//       },
//       legend: {
//         show: true,
//         position: 'top',
//         horizontalAlign: 'right',
//         fontSize: '12px',
//         fontWeight: 600
//       },
//       responsive: [{
//         breakpoint: 600,
//         options: {
//           chart: { height: 300 },
//           legend: { position: 'bottom' }
//         }
//       }]
//     };

//     return {
//       series: [{ name: "Sales Performance", data }],
//       // stats: { max: maxValue, min: minValue, avg: avgValue, trend, growth: recentGrowth },
//       options: baseOptions,
//       width: dataLength * 60 * zoomLevel,
//     };
//   }, [clientData, zoomLevel, theme, dataLength, visiblePoints, chartType, showDataLabels, animationsEnabled]);

//   // Enhanced handlers
//   const handleRefresh = () => setRefreshKey(prev => prev + 1);
//   const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
//   const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.25));

//   const chartTypes = [
//     { type: 'line', icon: ShowChart, label: 'Line' },
//     { type: 'area', icon: Timeline, label: 'Area' },
//     { type: 'bar', icon: BarChart, label: 'Bar' }
//   ];

//   return (
//     <Box sx={{
//       minHeight: "100vh",
//       background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 50%, ${theme.palette.primary.light}10 100%)`,
//       p: { xs: 1, sm: 2, md: 3 },
//       transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
//       position: 'relative',
//       '&::before': {
//         content: '""',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main}08 0%, transparent 50%)`,
//         pointerEvents: 'none'
//       }
//     }}>

//       {/* Enhanced Header Section */}
      
//       {/* <Fade in timeout={800}>
//         <Box sx={{
//           position: 'relative',
//           background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 40%, ${theme.palette.secondary.main} 100%)`,
//           borderRadius: { xs: 2, md: 4 },
//           mb: 3,
//           overflow: 'hidden',
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
//           }
//         }}>
//           <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
            

//             <Box sx={{ flex: 1 }}>
//               <Stack direction="row" alignItems="center" spacing={2} mb={3}>
//                 <Zoom in timeout={1000}>
//                   <Avatar sx={{
//                     background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
//                     width: 56,
//                     height: 56,
//                     boxShadow: theme.shadows[8]
//                   }}>
//                     <Analytics sx={{ fontSize: 28 }} />
//                   </Avatar>
//                 </Zoom>
                
//                 <Box>
//                   <Slide direction="right" in timeout={1200}>
//                     <Typography variant="h3" sx={{
//                       fontWeight: 800,
//                       color: 'white',
//                       mb: 0.5,
//                       textShadow: '0 2px 4px rgba(0,0,0,0.3)'
//                     }}>
//                       Analytics Hub
//                     </Typography>
//                   </Slide>
                  
//                   <Slide direction="right" in timeout={1400}>
//                     <Typography variant="h6" sx={{
//                       color: 'rgba(255,255,255,0.9)',
//                       fontWeight: 400
//                     }}>
//                       Advanced Performance Dashboard
//                     </Typography>
//                   </Slide>
//                 </Box>

//                 <Box sx={{ ml: 'auto', display: { xs: 'none', sm: 'flex' } }}>
//                   <Stack direction="row" spacing={1}>
//                     {[Notifications, Star, BookmarkBorder].map((Icon, i) => (
//                       <Tooltip key={i} title={['Notifications', 'Favorites', 'Bookmarks'][i]}>
//                         <IconButton sx={{
//                           color: 'white',
//                           background: 'rgba(255,255,255,0.1)',
//                           backdropFilter: 'blur(10px)',
//                           '&:hover': {
//                             background: 'rgba(255,255,255,0.2)',
//                             transform: 'scale(1.1)'
//                           }
//                         }}>
//                           <Badge badgeContent={i === 0 ? 3 : 0} color="error">
//                             <Icon />
//                           </Badge>
//                         </IconButton>
//                       </Tooltip>
//                     ))}
//                   </Stack>
//                 </Box>
//               </Stack>

//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//                 {[
//                   {
//                     label: 'Peak Performance',
//                     value: clientData ? chartData.stats.max : null,
//                     icon: TrendingUp,
//                     color: 'success',
//                     delay: 1600
//                   },
//                   {
//                     label: 'Average Sales',
//                     value: clientData ? chartData.stats.avg : null,
//                     icon: Speed,
//                     color: 'info',
//                     delay: 1800
//                   },
//                   {
//                     label: 'Growth Rate',
//                     value: clientData ? `${chartData.stats.growth}%` : null,
//                     icon: chartData.stats?.trend === 'up' ? TrendingUp : TrendingDown,
//                     color: chartData.stats?.trend === 'up' ? 'success' : 'warning',
//                     delay: 2000
//                   },
//                   {
//                     label: 'Data Points',
//                     value: dataLength,
//                     icon: DataUsage,
//                     color: 'primary',
//                     delay: 2200
//                   }
//                 ].map((stat, index) => (
//                   <Grow key={stat.label} in timeout={stat.delay}>
//                     <Card sx={{
//                       background: 'rgba(255,255,255,0.95)',
//                       backdropFilter: 'blur(20px)',
//                       border: '1px solid rgba(255,255,255,0.2)',
//                       borderRadius: 3,
//                       flex: 1,
//                       transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//                       cursor: 'pointer',
//                       '&:hover': {
//                         transform: 'translateY(-8px) scale(1.02)',
//                         boxShadow: theme.shadows[12],
//                         background: 'rgba(255,255,255,1)',
//                       }
//                     }}>
//                       <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                           <Avatar sx={{
//                             background: `linear-gradient(45deg, ${theme.palette[stat.color].main}, ${theme.palette[stat.color].light})`,
//                             width: 40,
//                             height: 40,
//                             mr: 1.5
//                           }}>
//                             <stat.icon sx={{ fontSize: 20 }} />
//                           </Avatar>
                          
//                           {stat.value !== null && !isLoading ? (
//                             <Typography variant="h5" sx={{
//                               fontWeight: 700,
//                               color: theme.palette[stat.color].main,
//                               textShadow: '0 1px 2px rgba(0,0,0,0.1)'
//                             }}>
//                               {stat.value}
//                             </Typography>
//                           ) : (
//                             <Skeleton variant="text" width={60} height={32} animation="wave" />
//                           )}
//                         </Box>
                        
//                         <Typography variant="caption" sx={{
//                           color: theme.palette.text.secondary,
//                           fontWeight: 600,
//                           textTransform: 'uppercase',
//                           letterSpacing: '0.5px'
//                         }}>
//                           {stat.label}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Grow>
//                 ))}
//               </Stack>
//             </Box>
//           </Stack>
//         </Box>
//       </Fade> */}

//       {/* Enhanced Control Panel */}
//       <Slide direction="up" in timeout={600}>
//         <Paper elevation={6} sx={{
//           p: 3,
//           mb: 3,
//           borderRadius: 4,
//           background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
//           border: `1px solid ${theme.palette.divider}`,
//           backdropFilter: 'blur(10px)',
//           transition: 'all 0.4s ease'
//         }}>
//           <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
            
            
//             <Box sx={{ flex: 1 }}>
//               <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
//                 <Typography variant="h6" sx={{
//                   fontWeight: 700,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: 'text',
//                   WebkitBackgroundClip: 'text',
//                   color: 'transparent'
//                 }}>
//                   Chart Configuration
//                 </Typography>
                
//                 <Divider orientation="vertical" flexItem />
                
//                 <ButtonGroup size="small" variant="outlined">
//                   {chartTypes.map(({ type, icon: Icon, label }) => (
//                     <Tooltip key={type} title={`${label} Chart`}>
//                       <IconButton
//                         onClick={() => setChartType(type)}
//                         color={chartType === type ? 'primary' : 'default'}
//                         sx={{
//                           transition: 'all 0.2s ease',
//                           ...(chartType === type && {
//                             background: theme.palette.primary.main,
//                             color: 'white',
//                             '&:hover': {
//                               background: theme.palette.primary.dark,
//                             }
//                           })
//                         }}
//                       >
//                         <Icon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                   ))}
//                 </ButtonGroup>
//               </Stack>
//             </Box>

//             <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
//               <Chip
//                 icon={<Assessment />}
//                 label={`${dataLength} Data Points`}
//                 variant="filled"
//                 color="primary"
//                 sx={{
//                   fontWeight: 600,
//                   '&:hover': { transform: 'scale(1.05)' }
//                 }}
//               />

//               <Tooltip title="Toggle Data Labels">
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={showDataLabels}
//                       onChange={(e) => setShowDataLabels(e.target.checked)}
//                       color="primary"
//                     />
//                   }
//                   label="Labels"
//                   sx={{ m: 0 }}
//                 />
//               </Tooltip>

//               <Stack direction="row" spacing={0.5} alignItems="center">
//                 <IconButton onClick={handleZoomOut} size="small" color="primary">
//                   <ZoomOut />
//                 </IconButton>
//                 <Typography variant="body2" sx={{ minWidth: 50, textAlign: 'center', fontWeight: 600 }}>
//                   {Math.round(zoomLevel * 100)}%
//                 </Typography>
//                 <IconButton onClick={handleZoomIn} size="small" color="primary">
//                   <ZoomIn />
//                 </IconButton>
//               </Stack>

            
//               <Stack direction="row" spacing={1}>
//                 {[
//                   { icon: Refresh, action: handleRefresh, tooltip: 'Refresh Data', loading: isLoading },
//                   { icon: GetApp, action: () => {}, tooltip: 'Export Data' },
//                   { icon: Share, action: () => {}, tooltip: 'Share Chart' },
//                   { icon: Fullscreen, action: () => {}, tooltip: 'Fullscreen' }
//                 ].map(({ icon: Icon, action, tooltip, loading }) => (
//                   <Tooltip key={tooltip} title={tooltip}>
//                     <IconButton
//                       onClick={action}
//                       disabled={loading}
//                       sx={{
//                         background: theme.palette.primary.light + '20',
//                         transition: 'all 0.2s ease',
//                         '&:hover': {
//                           background: theme.palette.primary.main,
//                           color: 'white',
//                           transform: 'scale(1.1)'
//                         },
//                         ...(loading && {
//                           animation: 'pulse 1.5s ease-in-out infinite'
//                         })
//                       }}
//                     >
//                       <Icon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 ))}
//               </Stack>
//             </Stack>
//           </Stack>

          
//           {isLoading && (
//             <Box sx={{ mt: 2 }}>
//               <LinearProgress
//                 variant="indeterminate"
//                 sx={{
//                   borderRadius: 1,
//                   height: 4,
//                   background: theme.palette.primary.light + '30'
//                 }}
//               />
//             </Box>
//           )}
//         </Paper>
//       </Slide>

//       {/* Enhanced Chart Container */}
//       <Fade in timeout={1000}>
//         <Paper elevation={8} sx={{
//           borderRadius: 4,
//           overflow: 'hidden',
//           background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default}05)`,
//           border: `1px solid ${theme.palette.divider}`,
//           backdropFilter: 'blur(20px)',
//           boxShadow: `0 20px 40px -12px ${theme.palette.primary.main}20`,
//           transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//           position: 'relative',
//           '&:hover': {
//             boxShadow: `0 25px 50px -12px ${theme.palette.primary.main}30`,
//             transform: 'translateY(-2px)'
//           }
//         }}>
          
//           {/* Chart Header */}
//           <Box sx={{
//             p: 2,
//             background: `linear-gradient(90deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
//             borderBottom: `1px solid ${theme.palette.divider}`
//           }}>
//             <Stack direction="row" justifyContent="space-between" alignItems="center">
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                 Performance Visualization
//               </Typography>
//               <Chip
//                 label={chartType.toUpperCase()}
//                 size="small"
//                 color="primary"
//                 variant="outlined"
//               />
//             </Stack>
//           </Box>

//           <Box sx={{
//             overflowX: "auto",
//             width: "100%",
//             scrollbarWidth: "thin",
//             scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
//             '&::-webkit-scrollbar': {
//               height: 6,
//             },
//             '&::-webkit-scrollbar-track': {
//               background: theme.palette.background.default,
//             },
//             '&::-webkit-scrollbar-thumb': {
//               background: theme.palette.primary.main,
//               borderRadius: 4,
//             }
//           }}>
//             <Box sx={{
//               width: `${chartData.width}px`,
//               // transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//               minWidth: '100%',
//               opacity: isLoading ? 0.7 : 1,
//               filter: isLoading ? 'blur(1px)' : 'none',
//               position: 'relative'
//             }}>
//               <Chart
//                 options={chartData.options}
//                 series={chartData.series}
//                 type={chartType}
//                 height={600}
//                 width={chartData.width}
//               />
              
//               {isLoading && (
//                 <Box sx={{
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%, -50%)',
//                   background: theme.palette.background.paper + 'CC',
//                   borderRadius: 2,
//                   p: 2,
//                   backdropFilter: 'blur(10px)'
//                 }}>
//                   <Stack alignItems="center" spacing={1}>
//                     <Skeleton variant="circular" width={40} height={40} />
//                     <Typography variant="body2">Loading data...</Typography>
//                   </Stack>
//                 </Box>
//               )}
//             </Box>
//           </Box>
//         </Paper>
//       </Fade>

//       {/* Enhanced Settings Panel */}
//       {/* <Slide direction="up" in timeout={1200}>
//         <Box sx={{ mt: 3 }}>
//           <Accordion
//             sx={{
//               background: theme.palette.background.paper,
//               borderRadius: 2,
//               '&:before': { display: 'none' }
//             }}
//           >
//             <AccordionSummary expandIcon={<ExpandMore />}>
//               <Stack direction="row" alignItems="center" spacing={1}>
//                 <Settings />
//                 <Typography variant="h6">Advanced Settings</Typography>
//               </Stack>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={animationsEnabled}
//                       onChange={(e) => setAnimationsEnabled(e.target.checked)}
//                     />
//                   }
//                   label="Enable Animations"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={showDataLabels}
//                       onChange={(e) => setShowDataLabels(e.target.checked)}
//                     />
//                   }
//                   label="Show Data Labels"
//                 />
//               </Stack>
//             </AccordionDetails>
//           </Accordion>
//         </Box>
//       </Slide> */}

//       {/* Enhanced Footer */}
//       {/* <Slide direction="up" in timeout={1400}>
//         <Box sx={{
//           textAlign: 'center',
//           mt: 4,
//           mb: 2,
//           p: 3,
//           background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}10, transparent)`,
//           borderRadius: 2
//         }}>
//           <Typography variant="body2" color="text.secondary" sx={{
//             fontStyle: 'italic',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               color: theme.palette.primary.main,
//               transform: 'scale(1.02)'
//             }
//           }}>
//             ✨ Interactive dashboard with real-time data visualization • Hover for insights • Zoom and explore ✨
//           </Typography>
//         </Box>
//       </Slide> */}
//     </Box>
//   );
// }




















// "use client"; 

// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Providers from './Providers';
// import { store } from "./redux/store";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // export const metadata = {
// //   title: "Create Next App",
// //   description: "Generated by create next app",
// // };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <Providers store = {store} >
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }














