import React from "react";
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
  } from "react-router-dom";
import Home from "./core/Home";

const MainRouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path='/' Component={Home}/>
            </Routes>
        </div>
    )
}

export default MainRouter