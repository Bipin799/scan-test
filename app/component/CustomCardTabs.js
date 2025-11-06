"use client";

import { useEffect, useState } from "react";
import { Box, Stack, Tabs, Tab } from "@mui/material";
// import CustomCard from "../baseCard/CustomCard";
import CustomTabPanel from "./CustomTabPanel";
import CustomCard from "./CustomCard";

const CustomCardTabs = ({
  items = [],            // 👈 array of { label, icon, child }
  title = "Card Title",  // optional static title prefix
  defaultValue = 0,
  sx = {},
}) => {
  const [tabValue, setTabValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setTabValue(defaultValue);
    } else {
      setTabValue(0);
    }
  }, [defaultValue]);

  // if no tabs provided, return nothing
  if (items.length === 0) return null;

  // card title — combines static title with active tab label
  const cardTitle = `${title} - ${items[tabValue].label}`;

  return (
    <CustomCard title={cardTitle} sx={{ m: 0, ...sx }}>
      <Stack spacing={2} height="100%">
        {/* Tab Header Section */}
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              scrollButtons="auto"
              variant="scrollable"
              sx={{
                "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.common.white,
                  borderRadius: "8px 8px 0 0",
                },
                "& .MuiTabs-indicator": { display: "none" },
              }}
            >
              {items.map((t, i) => (
                <Tab
                  key={i}
                  label={t.label}
                  icon={t.icon}
                  iconPosition="start"
                  disabled={t.disabled}
                  sx={{ color: "black", minHeight: 48 }}
                />
              ))}
            </Tabs>
          </Box>
        </Box>

        {/* Tab Panels */}
        {items.map((t, i) => (
          <CustomTabPanel key={i} value={tabValue} index={i}>
            {t.child}
          </CustomTabPanel>
        ))}
      </Stack>
    </CustomCard>
  );
};

export default CustomCardTabs;
