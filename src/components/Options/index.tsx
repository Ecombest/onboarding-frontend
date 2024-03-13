"use client";
import AppContext from "@/context/app.context";
import { useContext } from "react";
import Option from "../Option";
const Options = () => {
  const { options } = useContext(AppContext);
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {options?.map((option) => {
        return <Option option={option} key={option._id} />;
      })}
    </div>
  );
};

export default Options;
