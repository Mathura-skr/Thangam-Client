import { BrowserRouter } from "react-router-dom";
import React from "react";
import RouteLayout from "./Routes/RouteLayout";
import "./App.css";


export default function App() {
  return (
    <BrowserRouter>
      <RouteLayout />
    </BrowserRouter>
  );
}
