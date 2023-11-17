import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";

function MainRouter() {
  return (
    <div>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
