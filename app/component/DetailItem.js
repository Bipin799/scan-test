import { Box, Typography } from "@mui/material";

const DetailItem = ({ label, value }) => {
  return (
    <Box display="flex" alignItems="flex-start">
      <Typography variant="body1" sx={{ whiteSpace: "nowrap" }}>
        {label} :
      </Typography>
      <Typography variant="body1" fontWeight="600" sx={{ ml: "20px", wordBreak: "break-word" }}>
        {value}
      </Typography>
    </Box>
  );
};

export default DetailItem;