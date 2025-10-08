// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Box, Grid, Avatar, Typography, Button } from "@mui/material";
// import MaleIcon from "../../public/male.svg";
// import MaleDisable from "../../public/maleDisable.svg";
// import FemaleIcon from "../../public/female.svg";
// import FemaleDisableIcon from "../../public/femaleDisable.png";
// import LGBTQIcon from "../../public/lgbtq.webp";
// import LGBTQDisableIcon from "../../public/lgbtqDisable.svg";
// import NotSayIcon from "../../public/notTosay.svg";
// import NotSayDisableIcon from "../../public/notTosayDisable.svg";
// // import GenderAvatar from "@/public/gender.svg";

// const genders = [
//   {
//     label: "Male",
//     icon: MaleIcon,
//     disabledIcon: MaleDisable,
//   },
//   {
//     label: "Female",
//     icon: FemaleIcon,
//     disabledIcon: FemaleDisableIcon,
//   },
//   {
//     label: "LGBTQIA+",
//     icon: LGBTQIcon,
//     disabledIcon: LGBTQDisableIcon,
//   },
//   {
//     label: "Prefer not to say",
//     icon: NotSayIcon,
//     disabledIcon: NotSayDisableIcon,
//   },
// ];

// export default function GenderSelector() {
//   const [selectedGender, setSelectedGender] = useState("Male");

//   return (
//     <Box sx={{ p: 3 }}>
//       <Grid container spacing={1} justifyContent="center">
//         {genders.map((item) => {
//           const isSelected = selectedGender === item.label;
//           return (
//             <Grid item xs={6} key={item.label}>
//               <Button
//                 fullWidth
//                 variant={isSelected ? "contained" : "outlined"}
//                 color="primary"
//                 onClick={() => setSelectedGender(item.label)}
//                 sx={{
//                   flexDirection: "column",
//                   py: 2,
//                   borderRadius: 2,
//                   textTransform: "none",
//                   height: "90%",
//                   width:"200px",
//                   display: "flex",
//                   backgroundColor: isSelected ? "primary.main" : "transparent",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     position: "relative",
//                     width: { xs: 10, sm: 80 },
//                     height: { xs: 65, sm: 85 },
//                     mb: 1,
//                   }}
//                 >
//                   <Image
//                     src={isSelected ? item.icon : item.disabledIcon}
//                     alt={item.label}
//                     fill
//                     style={{
//                       objectFit: "contain",
//                       opacity: isSelected ? 1 : 0.5,
//                     }}
//                   />
//                 </Box>

//                 <Typography
//                   variant="body1"
//                   sx={{
//                     mt: 1,
//                     fontWeight: isSelected ? 600 : 400,
//                     color: isSelected ? "white" : "text.primary",
//                   }}
//                 >
//                   {item.label}
//                 </Typography>
//               </Button>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// }


















"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, Grid, Typography, Button } from "@mui/material";

import MaleIcon from "../../public/male.svg";
import MaleDisable from "../../public/maleDisable.svg";
import FemaleIcon from "../../public/female.svg";
import FemaleDisableIcon from "../../public/femaleDisable.png";
import LGBTQIcon from "../../public/lgbtq.webp";
import LGBTQDisableIcon from "../../public/lgbtqDisable.svg";
import NotSayIcon from "../../public/notTosay.svg";
import NotSayDisableIcon from "../../public/notTosayDisable.svg";

const genders = [
  { label: "Male", icon: MaleIcon, disabledIcon: MaleDisable },
  { label: "Female", icon: FemaleIcon, disabledIcon: FemaleDisableIcon },
  { label: "LGBTQIA+", icon: LGBTQIcon, disabledIcon: LGBTQDisableIcon },
  { label: "Prefer not to say", icon: NotSayIcon, disabledIcon: NotSayDisableIcon },
];

export default function GenderSlector() {
  const [selectedGender, setSelectedGender] = useState("Male");
  const [isPregnant, setIsPregnant] = useState(false);

  return (
    <Box sx={{ p: 3  }}>
      {/* Gender Selection */}
      <Grid container spacing={0} justifyContent="center">
        {genders.map((item) => {
          const isSelected = selectedGender === item.label;

          return (
            <Grid
              item
              xs={6}
              key={item.label}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexBasis: "50%",
                maxWidth: "50%",
                // border:"2px solid black",
              }}
            >
              <Button
                onClick={() => setSelectedGender(item.label)}
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
                  // border: "none",
                  textTransform: "none",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.87)",
                  boxShadow: isSelected
                    ? "4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF"
                    : "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  borderColor: isSelected ? "2px solid #007BFF" : "transparent",
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
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? "#1976d2" : "inherit",
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
      {selectedGender === "Female" && (
        <Box
          sx={{
            mt: 2,
            padding: "10px",
            // width:"100% !important",
            borderRadius: "20px",
            boxShadow:
              "4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF",
            borderColor: "#007BFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // width: "fit-content",
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
              onChange={() => setIsPregnant((prev) => !prev)}
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

