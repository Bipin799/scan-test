"use client";

import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const ToggleSwitch = styled("div")({
  position: "relative",
  display: "inline-block",
  width: "60px",
  height: "30px",
});

const ToggleInput = styled("input")({
  display: "none",
});

const ToggleLabel = styled("label")({
  display: "block",
  overflow: "hidden",
  cursor: "pointer",
  borderRadius: "30px",
  margin: 0,
});

const ToggleInner = styled("span")(({ checked }) => ({
  display: "block",
  width: "200%",
  marginLeft: checked ? "0" : "-100%",
  transition: "margin 0.3s ease-in 0s",
}));

const ToggleInnerBefore = styled("span")({
  display: "block",
  float: "left",
  width: "50%",
  height: "30px",
  padding: 0,
  lineHeight: "30px",
  fontSize: "14px",
  color: "white",
  fontFamily: "inherit",
  fontWeight: 400,
  boxSizing: "border-box",
  paddingLeft: "10px",
  backgroundColor: "#1976d2",
});

const ToggleInnerAfter = styled("span")({
  display: "block",
  float: "left",
  width: "50%",
  height: "30px",
  padding: 0,
  lineHeight: "30px",
  fontSize: "14px",
  color: "white",
  fontFamily: "inherit",
  fontWeight: 400,
  boxSizing: "border-box",
  paddingRight: "10px",
  backgroundColor: "#ccc",
  textAlign: "right",
});

const ToggleSwitchCircle = styled("span")(({ checked }) => ({
  display: "block",
  width: "18px",
  margin: "6px",
  background: "white",
  position: "absolute",
  top: 0,
  bottom: 0,
  right: checked ? "0px" : "30px",
  borderRadius: "50%",
  transition: "all 0.3s ease-in 0s",
}));

export default function CustomToggles({ values, setFieldValue }) {

  // const [toggles, setToggles] = useState({
  //   maritalStatus: false,
  //   isDiabetic: false,
  //   isHypertension: false,
  // });

  // const handleToggle = (name) => {
  //   setToggles((prev) => ({ ...prev, [name]: !prev[name] }));
  // };

  const handleToggle = (name) => {
    setFieldValue(name, !values[name]);
  };


  const toggleData = [
    { label: "Are you married?", name: "isMarried" },
    { label: "Do you have diabetes?", name: "hasDiabetes" },
    { label: "Do you have hypertension?", name: "hasHypertension" },
  ];

  return (
    <Stack
      spacing={2}
      sx={{
        fontFamily: "Nunito, sans-serif",
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
        color: "rgba(0,0,0,0.87)",
      }}
    >
      {toggleData.map((item) => (
        <Box
          key={item.name}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              lineHeight: "inherit",
              color: "inherit",
            }}
          >
            {item.label}
          </Typography>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              name={item.name}
              id={item.name}
              checked={values[item.name]}
              onChange={() => handleToggle(item.name)}
            />
            <ToggleLabel htmlFor={item.name}>
              <ToggleInner checked={values[item.name]}>
                <ToggleInnerBefore>Yes</ToggleInnerBefore>
                <ToggleInnerAfter>No</ToggleInnerAfter>
              </ToggleInner>
              <ToggleSwitchCircle checked={values[item.name]} />
            </ToggleLabel>
          </ToggleSwitch>
        </Box>
      ))}
    </Stack>
  );
}