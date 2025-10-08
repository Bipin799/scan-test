"use client";

import { useState } from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TextField,
} from "@mui/material";

export default function WeightSelector() {
  const [unit, setUnit] = useState("kg");
  const [weight, setWeight] = useState("");

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) setUnit(newUnit);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const rulerMarks = Array.from({ length: 16 }, (_, i) => i); // 0 to 15

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        mt: "15px",
      }}
    >
      {/* Unit Selector */}
      <ToggleButtonGroup
        value={unit}
        exclusive
        onChange={handleUnitChange}
        sx={{
          display: "inline-flex",
          boxShadow:
            "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
          borderRadius: "20px",
        }}
      >
        <ToggleButton
          value="kg"
          sx={{
              textTransform: "none",
            border: "none",
            padding: "10px 30px",
            fontWeight: "bold",
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Kg
        </ToggleButton>
        <ToggleButton
          value="lbs"
          sx={{
              textTransform: "none",
            border: "none",
            padding: "10px 30px",
            fontWeight: "bold",
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Lbs
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Weight Input */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <TextField
          id="weight"
          name="weight"
          placeholder="0"
          type="tel"
          value={weight}
          onChange={handleWeightChange}
          InputProps={{
            endAdornment: (
              <Typography variant="h6" sx={{ ml: 1 }}>
                {unit}
              </Typography>
            ),
          }}
          sx={{
            width: "250px",
            "& .MuiOutlinedInput-root": {
              fontWeight: 400,
              fontFamily: "Nunito, sans-serif",
              fontSize: "1rem",
              lineHeight: 1.4375,
              color: "rgba(0,0,0,0.87)",
              paddingRight: "14px",
            },
          }}
        />

        {/* Ruler Marks */}
        {/* <Box sx={{ display: "flex", gap: "5px" }}>
          {rulerMarks.map((mark, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  visibility:
                    mark % 5 === 0 ? "visible" : "hidden",
                  marginBottom: "5px",
                  width: "12px",
                  fontSize: "0.8rem",
                }}
              >
                {mark}.00
              </Typography>
              <Box
                sx={{
                  width: "4px",
                  height: "20px",
                  backgroundColor:
                    mark % 5 === 0 ? "rgb(17, 114, 186)" : "black",
                }}
              />
            </Box>
          ))}
        </Box> */}

      </Box>
    </Box>
  );
}























// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   ToggleButton,
//   ToggleButtonGroup,
//   Paper,
// } from "@mui/material";

// function WeightSelector({
//   value,
//   onChange,
//   unit = "kg",
//   onUnitChange,
//   minWeight = 0,
//   maxWeight = 300,
//   showRuler = true,
// }) {
//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
//       {/* Unit Selector */}
//       <Paper
//         elevation={3}
//         sx={{
//           display: "inline-flex",
//           borderRadius: "50px",
//           overflow: "hidden",
//         }}
//       >
//         <ToggleButtonGroup
//           value={unit}
//           exclusive
//           onChange={(e, newUnit) => newUnit && onUnitChange(newUnit)}
//           sx={{ border: "none" }}
//         >
//           <ToggleButton value="kg" sx={{ px: 4, py: 1 }}>
//             Kg
//           </ToggleButton>
//           <ToggleButton value="lbs" sx={{ px: 4, py: 1 }}>
//             Lbs
//           </ToggleButton>
//         </ToggleButtonGroup>
//       </Paper>

//       {/* Weight Input */}
//       <Box position="relative">
//         <TextField
//           id="weight"
//           name="weight"
//           type="number"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder="0"
//           inputProps={{
//             min: minWeight,
//             max: maxWeight,
//             style: { textAlign: "center", fontSize: "1rem" },
//           }}
//           sx={{
//             width: 200,
//             "& input": { padding: "12px" },
//           }}
//         />
//         <Typography
//           variant="subtitle1"
//           sx={{
//             position: "absolute",
//             right: 10,
//             top: "50%",
//             transform: "translateY(-50%)",
//             fontWeight: 600,
//           }}
//         >
//           {unit}
//         </Typography>
//       </Box>

//       {/* Current Weight Display */}
//       {showRuler && (
//         <Typography variant="h6">{Number(value || 0).toFixed(2)}</Typography>
//       )}
//     </Box>
//   );
// }

// function CuttingPattern({ weight, maxWeight = 300 }) {
//   const scrollContainerRef = useRef(null);
//   const currentMarkRef = useRef(null);

//   const marks = [];
//   for (let i = 0; i <= maxWeight; i += 5) marks.push(i);

//   const currentWeight = parseFloat(weight) || 0;
//   const nearestMark = Math.round(currentWeight / 5) * 5;

//   useEffect(() => {
//     if (scrollContainerRef.current && currentMarkRef.current) {
//       const container = scrollContainerRef.current;
//       const currentMark = currentMarkRef.current;
//       const scrollLeft =
//         currentMark.offsetLeft - container.clientWidth / 2 + currentMark.clientWidth / 2;

//       container.scrollTo({
//         left: scrollLeft,
//         behavior: "smooth",
//       });
//     }
//   }, [nearestMark]);

//   return (
//     <Box sx={{ width: "100%", overflowX: "auto", py: 2 }}>
//       <Box display="flex" alignItems="flex-end" gap={2} sx={{ minWidth: "max-content" }} ref={scrollContainerRef}>
//         {marks.map((mark, index) => {
//           const isLargeLine = index % 5 === 0;
//           const isHighlighted = mark === nearestMark;
//           const isPassed = mark < nearestMark;

//           return (
//             <Box
//               key={mark}
//               ref={isHighlighted ? currentMarkRef : null}
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               minWidth={30}
//             >
//               {/* Label */}
//               <Typography
//                 variant="caption"
//                 sx={{
//                   visibility: isLargeLine ? "visible" : "hidden",
//                   color: isHighlighted ? "primary.main" : isPassed ? "primary.main" : "#333",
//                   fontWeight: isHighlighted ? "bold" : isPassed ? 600 : 500,
//                   mb: 1,
//                   textAlign: "center",
//                 }}
//               >
//                 {mark}.00
//               </Typography>

//               {/* Line */}
//               <Box
//                 sx={{
//                   width: isHighlighted ? 5 : isPassed ? 3 : 2,
//                   height: isLargeLine ? 40 : 24,
//                   backgroundColor: isHighlighted ? "primary.main" : isPassed ? "primary.main" : "black",
//                   borderRadius: "1px",
//                   transition: "all 0.3s ease",
//                   boxShadow: isHighlighted
//                     ? "0 0 12px rgba(17, 114, 186, 0.8)"
//                     : isPassed
//                     ? "0 0 6px rgba(17, 114, 186, 0.4)"
//                     : "none",
//                 }}
//               />
//             </Box>
//           );
//         })}
//       </Box>

//       {/* Current weight indicator */}
//       {nearestMark >= 0 && nearestMark <= maxWeight && (
//         <Box display="flex" justifyContent="center" mt={3}>
//           <Typography
//             variant="h6"
//             sx={{
//               bgcolor: "primary.main",
//               color: "white",
//               px: 3,
//               py: 1,
//               borderRadius: 2,
//               fontWeight: "bold",
//               boxShadow: 3,
//             }}
//           >
//             Current Weight: {nearestMark}.00 kg
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default function WeightSelectorApp() {
//   const [unit, setUnit] = useState("kg");
//   const [weight, setWeight] = useState("60");

//   const handleWeightChange = (value) => {
//     if (value === "") {
//       setWeight("");
//       return;
//     }
//     const numValue = parseFloat(value);
//     if (!isNaN(numValue) && numValue >= 0 && numValue <= 300) {
//       setWeight(value);
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       minHeight="100vh"
//       bgcolor="#f9fafb"
//       py={8}
//       px={4}
//     >
//       {/* <Typography variant="h4" fontWeight="bold" mb={2}>
//         Weight
//       </Typography> */}

//       {/* Weight Selector */}
//       <WeightSelector
//         value={weight}
//         onChange={handleWeightChange}
//         unit={unit}
//         onUnitChange={setUnit}
//         minWeight={0}
//         maxWeight={300}
//         showRuler={true}
//       />

//       {/* Cutting Pattern */}
//       <CuttingPattern weight={weight} maxWeight={300} />

//       {/* Info */}

//       {/* <Box mt={6} textAlign="center" maxWidth={500}>
//         <Typography variant="body2" mb={1}>
//           <strong>Pattern Logic:</strong> 4 small lines, then 1 large line (repeating)
//         </Typography>
//         <Typography variant="body2" mb={1}>
//           <strong>Intervals:</strong> Only multiples of 5 (0, 5, 10, 15, 20...)
//         </Typography>
//         <Typography variant="body2">
//           Type any weight from 0-300 kg. The UI will auto-scroll and highlight the nearest mark!
//         </Typography>
//       </Box> */}

//     </Box>
//   );
// }
