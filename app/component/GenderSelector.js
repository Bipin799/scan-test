
"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, Grid, Typography, Button, FormHelperText } from "@mui/material";

import MaleIcon from "../../public/male.svg";
import MaleDisable from "../../public/maleDisable.svg";
import FemaleIcon from "../../public/female.svg";
import FemaleDisableIcon from "../../public/femaleDisable.png";
import LGBTQIcon from "../../public/lgbtq.webp";
import LGBTQDisableIcon from "../../public/lgbtqDisable.svg";
import NotSayIcon from "../../public/notTosay.svg";
import NotSayDisableIcon from "../../public/notTosayDisable.svg";

const genders = [
  { label: "Male", value: "male", icon: MaleIcon, disabledIcon: MaleDisable },
  { label: "Female", value: "female", icon: FemaleIcon, disabledIcon: FemaleDisableIcon },
  { label: "LGBTQIA+", value: "LGBTQIA+", icon: LGBTQIcon, disabledIcon: LGBTQDisableIcon },
  { label: "Prefer not to say", value: "prefer_not_to_say", icon: NotSayIcon, disabledIcon: NotSayDisableIcon },
];

export default function GenderSelector({ value, onChange, onPregnantChange, error, isPregnant, setFieldValue }) {

  const handleGenderClick = (genderValue) => {
    setFieldValue("gender", genderValue);

    // Reset pregnancy if gender changes
    if (genderValue !== "female") {
      setFieldValue("isPregnant", false);
    }
  };

  const handlePregnantToggle = () => {
    setFieldValue("isPregnant", !isPregnant);
  };


  return (
    <Box sx={{ p: 3 }}>
      {/* Gender Selection */}

      {/* Error Message */}
      {error && (
        <FormHelperText error sx={{ textAlign: "center", }}>
          {error}
        </FormHelperText>
      )}

      <Grid container spacing={0} justifyContent="center">
        {genders.map((item) => {
          const isSelected = value === item.value;

          return (
            <Grid
              item
              xs={6}
              key={item.value}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexBasis: "50%",
                maxWidth: "50%",
              }}
            >
              <Button
                onClick={() => handleGenderClick(item.value)}
                variant="outlined"
                sx={{
                  width: "230px",
                  height: "130px",
                  margin: "8px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "#f4fbff",
                  borderRadius: "5%",
                  textTransform: "none",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 200,
                  fontSize: "1rem",
                  lineHeight: 1,
                  color: "rgba(0,0,0,0.87)",
                  boxShadow: isSelected
                    ? "4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF"
                    : "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  borderColor: isSelected ? "#007BFF" : "transparent",
                  borderWidth: isSelected ? "2px" : "1px",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <Box sx={{ position: "relative", width: 80, height: 85, mb: 1 }}>
                  <Image
                    src={isSelected ? item.icon : item.disabledIcon}
                    alt={item.label}
                    fill
                    style={{
                      objectFit: "contain",
                      opacity: isSelected ? 1 : 0.5,
                    }}
                  />
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    // fontWeight: isSelected ? 600 : 400,
                    forntWeight: 200,
                    // color: isSelected ? "#1976d2" : "inherit",
                    color: "#1976d2",
                  }}
                >
                  {item.label}
                </Typography>
              </Button>
            </Grid>
          );
        })}
      </Grid>

      

      {/* Custom "Are you pregnant?" toggle */}
      {value === "female" && (
        <Box
          sx={{
            mt: 2,
            padding: "10px",
            borderRadius: "20px",
            boxShadow:
              "4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF",
            borderColor: "#007BFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Nunito, sans-serif",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "rgba(0, 0, 0, 0.87)",
          }}
        >
          <span>Are you pregnant?</span>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "60px",
              height: "35px",
              marginLeft: "20px",
            }}
          >
            <input
              type="checkbox"
              id="isPregnant"
              checked={isPregnant}
              onChange={handlePregnantToggle}
              style={{ display: "none" }}
            />
            <label
              htmlFor="isPregnant"
              style={{
                display: "block",
                overflow: "hidden",
                cursor: "pointer",
                borderRadius: "30px",
                margin: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "200%",
                  marginLeft: isPregnant ? "0" : "-100%",
                  transition: "margin 0.3s ease-in 0s",
                }}
              >
                <span
                  style={{
                    display: "block",
                    float: "left",
                    width: "50%",
                    height: "30px",
                    lineHeight: "30px",
                    fontSize: "14px",
                    color: "white",
                    fontWeight: 400,
                    backgroundColor: "#1976d2",
                    paddingLeft: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  Yes
                </span>
                <span
                  style={{
                    display: "block",
                    float: "left",
                    width: "50%",
                    height: "30px",
                    lineHeight: "30px",
                    fontSize: "14px",
                    color: "white",
                    fontWeight: 400,
                    backgroundColor: "#ccc",
                    textAlign: "right",
                    paddingRight: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  No
                </span>
              </span>
              <span
                style={{
                  display: "block",
                  width: "18px",
                  height: "18px",
                  margin: "6px",
                  background: "white",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: isPregnant ? "0px" : "30px",
                  borderRadius: "50%",
                  transition: "all 0.3s ease-in 0s",
                }}
              ></span>
            </label>
          </div>
        </Box>
      )}
    </Box>
  );
}
