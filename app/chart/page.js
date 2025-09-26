"use client";

import React, { useRef, useEffect, useState } from "react";
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
import { Box } from "@mui/material";
import Layout from "../component/Layout";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart() {
  const visibleBars = 15; // Number of bars visible without scroll
  const totalBars = 25; // Total bars in chart

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure container width dynamically
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const barWidth = containerWidth / visibleBars; // width of each bar
  const chartWidth = barWidth * totalBars; // total chart width

  const data = {
    labels: Array(totalBars).fill(""), // totalBars labels
    datasets: [
      {
        label: "Sales",
        data: [
          12, -19, 3, -5, 2, -3, 10, -8, 5, -12,
          7, -4, 6, -9, 11, -6, 8, -7, 4, -2,
          9, -10, 13, -1, 0
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Revenue",
        data: [
          -8, 15, -5, 10, -7, 6, -9, 12, -4, 8,
          -6, 9, -3, 7, -2, 5, -10, 11, -1, 4,
          -8, 14, -2, 3, -5
        ],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const options = {
    // responsive: false, // important to use custom width
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales & Revenue",
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          drawTicks: false,
        },
      },
      y: {
        ticks: {
          stepSize: 10,
        },
        min: -20,
        max: 20,
      },
    },
  };

  return (
    <Layout>
      <Box
        ref={containerRef}
        sx={{
          overflowX: "auto", // horizontal scroll
          width: "100%", // container always full width
        }}
      >
        <Box sx={{ width: chartWidth, height: 500 }}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
    </Layout>
  );
}
