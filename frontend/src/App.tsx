import React from 'react';
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/UsersSlice";
import AppToolbar from "./components/UI/AppToolBar/AppToolBar";
import {Route, Routes} from "react-router-dom";
import {CssBaseline, Typography} from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import CocktailsPage from "./features/CocktailsPage/CocktailsPage";
import CocktailForm from "./features/CocktailsPage/components/CocktailForm";

function App() {
  const user = useAppSelector(selectUser);
  return (
      <>
        <CssBaseline />
        <AppToolbar />
        <Routes>
          <Route path="*" element={<Typography variant='h1'>Page not found!</Typography>}/>
          <Route path="/" element={<CocktailsPage />} />
          <Route
              path="/cocktails/new"
              element={
                <ProtectedRoute isAllowed={Boolean(user)}>
                  <CocktailForm />
                </ProtectedRoute>
              }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
  );
}

export default App;
