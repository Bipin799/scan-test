"use client";

import Layout from "@/app/component/Layout";
import CustomButton from "@/app/component/CustomButton";
import CustomCardTabs from "@/app/component/CustomCardTabs";
import Productdetail from "@/app/component/product-detail";
import Productdetail2 from "@/app/component/product-detail_2";

export default function ProductDetails() {
  const tabs = [
    { label: "glucose strip 50", child: <Productdetail2/> },
    { label: "BP Cough", child: <Productdetail/> },
    { label: "Lancet", child: <CustomButton label=" demo button component call here "/>},
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
