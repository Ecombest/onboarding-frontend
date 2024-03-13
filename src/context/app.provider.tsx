"use client";

import { ReactNode, useEffect, useState } from "react";
import AppContext, { AppContextProps } from "./app.context";
import { Option } from "@/interface/option.interface";
import optionApi from "@/api/option.api";
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [showCreateOption, setShowCreateOption] = useState(false);
  useEffect(() => {
    optionApi.getOptions().then((data) => {
      setOptions(data);
    });
  }, []);
  return (
    <AppContext.Provider
      value={
        {
          options,
          setOptions,
          showCreateOption,
          setShowCreateOption,
        } as AppContextProps
      }
    >
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        {children}
      </div>
    </AppContext.Provider>
  );
};

export default AppProvider;
