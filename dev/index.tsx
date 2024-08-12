import React from "react";
import { createRoot } from "react-dom/client";
import MyComponent from "../src/index";

const root = createRoot(document.getElementById("root")!);

root.render(<MyComponent name="CDG" />);
