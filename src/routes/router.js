import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import PokeLists from "../pages/PokeLists";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PokeLists />} path="/home" />
        <Route element={<Navigate to="/home" />} path="*" />
        {/* <Route element={} path="/pokemon/:id" /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
