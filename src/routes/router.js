import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Details from '../pages/Details';
import PokeLists from '../pages/PokeLists';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PokeLists />} path="/home" />
        <Route element={<Navigate to="/home" />} path="*" />
        <Route element={<Details />} path="/pokemon/:id" />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
