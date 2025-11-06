"use client";

import Layout from "@/app/component/Layout";
import CustomButton from "@/app/component/CustomButton";
import CustomCardTabs from "@/app/component/CustomCardTabs";
import { Box, Typography } from "@mui/material";
import Productdetail from "@/app/component/product-detail";

export default function ProductDetails() {
  const tabs = [
    { label: "glucose strip 50", child: <Productdetail/> },
    { label: "BP Cough", child: <CustomButton label="Click Me" /> },
    { label: "Lancet", child: <CustomButton label=" demo button component call here  --- "/>},
  ];

  return (
    <Layout>
      <CustomCardTabs
        items={tabs} 
        title="Product Details" 
        sx={{ height: "100%", mt: 2 }}
      />
    </Layout>
  );
}
