"use client";

import React, { createContext } from "react";
import { Option } from "@/interface/option.interface";
export interface AppContextProps {
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  showCreateOption: boolean;
  setShowCreateOption: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default AppContext;
