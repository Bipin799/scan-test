"use client";

import React, { useState } from "react";

export default function CustomToggles() {
  const [toggles, setToggles] = useState({
    maritalStatus: false,
    isDiabetic: false,
    isHypertension: false,
  });

  const handleToggle = (name) => {
    setToggles((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleData = [
    { label: "Are you married?", name: "maritalStatus" },
    { label: "Do you have diabetes?", name: "isDiabetic" },
    { label: "Do you have hypertension?", name: "isHypertension" },
  ];

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    fontFamily: "Nunito, sans-serif",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    color: "rgba(0,0,0,0.87)",
  };

  const containerToggleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const toggleSwitchStyle = {
    position: "relative",
    display: "inline-block",
    width: "60px",
    height: "30px",
  };

  const checkboxStyle = {
    display: "none",
  };

  const labelStyle = {
    display: "block",
    overflow: "hidden",
    cursor: "pointer",
    borderRadius: "30px",
    margin: 0,
  };

  const innerStyle = {
    display: "block",
    width: "200%",
    marginLeft: "-100%",
    transition: "margin 0.3s ease-in 0s",
  };

  const innerBeforeAfterStyle = {
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
  };

  const innerBeforeStyle = {
    paddingLeft: "10px",
    backgroundColor: "#1976d2",
  };

  const innerAfterStyle = {
    paddingRight: "10px",
    backgroundColor: "#ccc",
    textAlign: "right",
  };

  const switchStyle = {
    display: "block",
    width: "18px",
    margin: "6px",
    background: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: "30px",
    borderRadius: "50%",
    transition: "all 0.3s ease-in 0s",
  };

  return (
    <div style={containerStyle}>
      {toggleData.map((item) => (
        <div key={item.name} style={containerToggleStyle}>
          <span>{item.label}</span>
          <div style={toggleSwitchStyle}>
            <input
              type="checkbox"
              style={checkboxStyle}
              name={item.name}
              id={item.name}
              checked={toggles[item.name]}
              onChange={() => handleToggle(item.name)}
            />
            <label style={labelStyle} htmlFor={item.name}>
              <span
                style={{
                  ...innerStyle,
                  marginLeft: toggles[item.name] ? "0" : "-100%",
                  display: "block",
                }}
                data-yes="Yes"
                data-no="No"
              >
                <span style={{ ...innerBeforeAfterStyle, ...innerBeforeStyle }}>
                  Yes
                </span>
                <span style={{ ...innerBeforeAfterStyle, ...innerAfterStyle }}>
                  No
                </span>
              </span>
              <span
                style={{
                  ...switchStyle,
                  right: toggles[item.name] ? "0px" : "30px",
                }}
              ></span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
