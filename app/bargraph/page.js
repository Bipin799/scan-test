"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import bardata from '../constant/bardata.json';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Container, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import Layout from "../component/Layout";


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

    

    // Dynamic skip interval based on label count
    const skipInterval =
      labelCount > 50 ? 1: 1;
      // labelCount < 30 ? 1 : 1;
    
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

    const minValue = 97;
    const maxValue = 99;

    const minY = yScale.getPixelForValue(minValue);
    const maxY = yScale.getPixelForValue(maxValue);

    ctx.save();

    const gradient = ctx.createLinearGradient(0, maxY, 0, minY);
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

ChartJS.register(CategoryScale, LinearScale, BarElement, stickyLabelPlugin, Title, Tooltip, Legend, rangeLinePlugin);

export default function Chart() {
  const visibleBars = 45;
  const totalBars = bardata.length;

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

  const barWidth = containerWidth > 0 ? containerWidth / visibleBars : 100;
  const chartWidth = barWidth * totalBars;

  // Helper: Convert Celsius → Fahrenheit
  const convertToFahrenheit = (celsius) => (celsius * 9 / 5 + 32);

  // Memoized calculations
  const { fahrenheitData, maxval, minval, step, customLabels } = useMemo(() => {
    const fahrenheitData = bardata.map(item => parseFloat(convertToFahrenheit(item.calibratedReading).toFixed(2)));

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
        label: "",
        data: fahrenheitData,
        backgroundColor: "rgba(59, 130, 246, 0.85)",
        hoverBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  }), [bardata, fahrenheitData]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { bottom: 30 } },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} °F`
        }
      }
    },
    scales: {
      x: { ticks: { display: false } },
      y: {
        // position: "right",
        beginAtZero: false,
        min: minval,
        max: maxval,
        ticks: {
          stepSize: step,
          callback: value => `${value.toFixed(2)} °F`,
          display: false,
        }
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
      label: `${tick.value.toFixed(2)} °F`,
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
      setMinRangePosition(yScaleForValue(97));
      setMaxRangePosition(yScaleForValue(99));
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
                      // backgroundColor: "rgba(255, 255, 255, 0.95)",
                      px: 1,
                      py: 0.5,
                      // borderRadius: 1,
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
                Max Range (99°F)
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
                Min Range (97°F)
              </Typography>

              <Box
                ref={containerRef}
                sx={{
                  overflowX: "auto",
                  width: "95%",
                  p: 2,
                  ml:4,
                  // border:"2px solid black",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                  position: "relative",

                }}
              >
                <Box sx={{ 
                  width: `${chartWidth}px`,
                  height: 400,
                  position: "relative"
                }}>
                  <Bar ref={chartRef} data={data} options={options} plugins={[rangeLinePlugin]}  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
}