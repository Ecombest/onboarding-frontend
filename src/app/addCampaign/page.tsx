"use client";
import AddCampaign from "@/components/Campaigns";
import React from "react";

export default function Home() {
    const [isRefesh, setIsRefesh] = React.useState(false);
    return (
        <AddCampaign setIsRefesh={setIsRefesh} isRefesh={isRefesh}></AddCampaign>
    )
}