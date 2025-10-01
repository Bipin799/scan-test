
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
      labelCount > 50 ? 2 :
      labelCount < 30 ? 1 : 1;
    
    xAxis.ticks.forEach((tick, index) => {
      if (index % skipInterval !== 0) return;

      const x = xAxis.getPixelForTick(index);
      const y = chart.chartArea.bottom + 7;
      const label = tick.label || "";

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-Math.PI / 4); // Rotate labels for better fit

      // Draw label
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

    ctx.save();

    const badgePadding = 2;
    const badgeHeight = 22;
    const badgeRadius = 4;

    const drawBadge = (label, y, offsetY = 0) => {
      ctx.font = "300 14px Arial";
      const textWidth = ctx.measureText(label).width;
      const x = chart.chartArea.left;

      ctx.fillStyle = "#000";
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y - badgeHeight / 2 + offsetY, textWidth + badgePadding * 2, badgeHeight, badgeRadius);
      } else {
        ctx.rect(x, y - badgeHeight / 2 + offsetY, textWidth + badgePadding * 2, badgeHeight);
      }
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.shadowColor = "transparent";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x + badgePadding, y + offsetY);
    };


    drawBadge(" Min Range (97°F) ", minY,badgeHeight );
    drawBadge(" Max: Range (99°F) ", maxY,  -badgeHeight);

    ctx.restore();
  }
};

ChartJS.register(CategoryScale, LinearScale, BarElement, stickyLabelPlugin, Title, Tooltip, Legend, rangeLinePlugin);

export default function Chart() {
  const visibleBars = 55;
  const totalBars = bardata.length;

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    const step = (maxReading - minReading + 40) / (numberOfLabels-1);

    const customLabels = Array.from({ length: numberOfLabels }, (_, i) =>
      parseFloat((minReading + step * i).toFixed(2))
    );
    

    return { fahrenheitData, maxval, minval, step, customLabels };
  }, [bardata]);

  const data = useMemo(() => ({
    //labels: bardata.map((_, i) => `sep${i + 1}`),
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
        beginAtZero: false,
        min: minval,
        max: maxval,
        ticks: {
          stepSize: step,
          callback: value => `${value.toFixed(2)} °F`
        }
      }
    }
  }), [minval, maxval, step]);

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

            {/* Chart */}
            <Box sx={{ position: "relative", display:"flex", width: "100%", borderRadius: 3, bgcolor: "#fafafa" }}>


               {/* <Box
    sx={{
      position: "sticky",
      left: 0,
      background: "#fafafa",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "16px",
      borderRight: "1px solid #ddd"
    }}
  >
    {customLabels.slice().reverse().map((label, index) => (
      <Typography key={index} variant="body2" sx={{ lineHeight: "1.2em" }}>
        {label} °F
      </Typography>
    ))}
  </Box> */}



              <Box
                ref={containerRef}
                sx={{
                  overflowX: "auto",
                  width: "100%",
                  p: 2,
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                <Box sx={{ width: `${chartWidth}px`, height: 400 }}>
                  <Bar data={data} options={options} />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
}
