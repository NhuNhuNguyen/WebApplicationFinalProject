import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Borrow from "./lib/Borrow.jsx";

function MainRouter() {
  return (
    <div>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/borrow" element={<Borrow />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
