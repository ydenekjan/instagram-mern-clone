import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import Search from "./pages/Search.jsx";
import Create from "./pages/Create.jsx";
import Reels from "./pages/Reels.jsx";
import Register from "./pages/Register.jsx";
import EditAccount from "./components/EditAccount.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/:username" element={<Account />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/reels" element={<Reels />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/:username/edit" element={<EditAccount />}></Route>
    </Routes>
  );
};

export default App;
