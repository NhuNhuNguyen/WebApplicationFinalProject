import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users.jsx";
import Signup from "./user/Signup.jsx";
import Menu from "./core/Menu";

import MyAccount from "./lib/MyAccount.jsx";
import ListBooks from "./lib/ListBooks.jsx";
import ManageBooks from "./book/ManageBooks.jsx";
import Home2 from "./core/Home.jsx";
import RenewBook from "./lib/Renew.jsx";
import ReturnBook from "./lib/Return.jsx";
import Signin from "./lib/Signin.jsx";
import Profile from "./user/Profile.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";
import EditProfile from "./user/EditProfile.jsx";
import DetailBook from "./lib/DetailBook.jsx";
import HomeDetail from "./lib/HomeDetail.jsx";
import AddBook from "./book/AddBook.jsx";
import UpdateBook from "./book/UpdateBook.jsx";
import DeleteBook from "./book/DeleteBook.jsx";

function MainRouter() {
  return (
    <div>
      <Menu />

      <Routes>
        <Route path="/test" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/listbooks" element={<ListBooks />} />
        <Route path="/managebooks" element={<ManageBooks />} />
        <Route path="/" element={<Home2 />} />
        <Route path="/renew" element={<RenewBook />} />
        <Route path="/return" element={<ReturnBook />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/book/:bookId" element={<DetailBook />} />
        <Route path="/bookPub/:bookId" element={<HomeDetail />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/updateBook/:bookId" element={<UpdateBook />} />
        <Route path="/deleteBook/:bookId" element={<DeleteBook />} />
        
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default MainRouter;
