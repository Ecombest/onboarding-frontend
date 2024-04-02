"use client";
import EditCampaign from "@/components/Campaigns/editCampaign";
import React from "react";

export default function Home({ params }: { params: { id: string } }) {
  const [isRefesh, setIsRefesh] = React.useState(false);
  return (
    <>
      <EditCampaign id={params.id} setIsRefesh={setIsRefesh} isRefesh={isRefesh}></EditCampaign>
    </>
  );
}
