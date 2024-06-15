import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import CreateNote from "./Components/CreateNote";
import Update from "./Components/Update";
import Note from "./Components/Note";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";

import Footer from "./Components/Footer";
const App = () => {
  return (
    <>
      <div className="bg">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/notes" element={<Note />} />
            <Route exact path="/notes/add" element={<CreateNote />} />
            <Route exact path="/notes/:id" element={<Update />} />
            <Route exact path="/user/signup" element={<Signup />} />
            <Route exact path="/user/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
};

export default App;
