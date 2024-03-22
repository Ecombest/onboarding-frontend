"use client";

import { useContext, useState } from "react";
import SideBarBtn from "../SideBarBtn";
import AppContext from "@/context/app.context";
import optionApi from "@/api/option.api";
const CreateOption = () => {
  const { showCreateOption, setShowCreateOption } = useContext(AppContext);
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    optionApi.createOption({ name: option, image: "https://source.unsplash.com/random" }).then(() => {
      setOption("");
      setShowCreateOption(false);
    });
  };

  return (
    <div className="create-box">
      <div
        style={{
          position: "relative",
          right: 20,
          top: 20,
        }}
      >
        <SideBarBtn />
      </div>
      <div className={`create-box-content ${showCreateOption ? "open" : ""}`}>
        <div className={`create-option ${showCreateOption ? "open" : ""}`}>
          <strong>Add more option</strong>
          <input value={option} onChange={(e) => setOption(e.target.value)} placeholder="Enter option" />
          <button onClick={handleAddOption}>Add Option</button>
        </div>
      </div>
    </div>
  );
};

export default CreateOption;
