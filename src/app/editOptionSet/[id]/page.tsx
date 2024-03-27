"use client";
import ListOption from "@/components/AdminCreateOption/listOption";
import React from "react";

export default function Home({ params }: { params: { id: string } }) {
  const [isRefesh, setIsRefesh] = React.useState(false);
  return (
    <>
      <ListOption id={params.id} setIsRefesh={setIsRefesh} isRefesh={isRefesh}></ListOption>
    </>
  );
}
