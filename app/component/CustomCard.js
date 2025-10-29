// import React from "react";
// import { Box, Paper, Typography } from "@mui/material";

// export default function CustomCard({ title, children, sx = {} }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         // py: 6,
//       }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           width: "100% !important",
//         //   maxWidth: "600px",
//           backgroundColor: "#fff",
//           borderRadius: "12px",
//           // border: "1px solid #f0f0f0",
//           // boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 3px",
//           overflow: "hidden",
//           ...sx,
//         }}
//       >
//         {title && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               padding: "16px",
//               borderRadius: "8px",
//               // border:"2px solid black",
//               backgroundColor: "#eee",
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 margin: 0,
//                 fontWeight: 500,
//                 fontSize: "1rem",
//                 lineHeight: 1.5,
//                 fontFamily: "Nunito, sans-serif",
//                 display: "block",
//               }}
//             >
//               {title}
//             </Typography>
//           </Box>
//         )}

//         <Box sx={{ p: 1 }}>{children}</Box>
//       </Paper>
//     </Box>
//   );
// }






import React from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomCard({ title, children, sx = {}, onClose }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100% !important",
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          ...sx,
        }}
      >
        {title && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // <-- space out title and close btn
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "#eee",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: 1.5,
                fontFamily: "Nunito, sans-serif",
              }}
            >
              {title}
            </Typography>

            {onClose && (
              <IconButton
                size="small"
                onClick={onClose}
                sx={{
                  color: "#555",
                  "&:hover": { color: "#000" },
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        )}

        <Box sx={{ p: 1 }}>{children}</Box>
      </Paper>
    </Box>
  );
}
