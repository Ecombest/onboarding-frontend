"use client";

import AppContext from "@/context/app.context";
import { useContext } from "react";

const SiteBarBtn = () => {
  const { showCreateOption, setShowCreateOption } = useContext(AppContext);
  return (
    <div
      className={`side-bar-btn ${showCreateOption ? "open" : ""}`}
      onClick={() => setShowCreateOption(!showCreateOption)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SiteBarBtn;
