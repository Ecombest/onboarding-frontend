"use client";
import ListCampaign from "@/components/Campaigns/listCampaigns";
import React from "react";

export default function Home() {
    const [isRefesh, setIsRefesh] = React.useState(false);
    return (
        <>
            <ListCampaign setIsRefesh={setIsRefesh} isRefesh={isRefesh}></ListCampaign>
        </>
    );
}