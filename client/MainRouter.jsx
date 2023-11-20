import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Borrow from "./lib/Borrow.jsx";
import MyAccount from "./lib/MyAccount.jsx";
import ListBooks from "./lib/ListBooks.jsx";
import RenewBook from "./lib/Renew.jsx";
import ReturnBook from "./lib/Return.jsx";

function MainRouter() {
  return (
    <div>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/listbooks" element={<ListBooks />} />
        <Route path="/renew" element={<RenewBook />} />
        <Route path="/return" element={<ReturnBook />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
