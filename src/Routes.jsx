import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import SignupComponent from "./components/SignupComponent";
import UploadComponent from "./components/Home/Upload";
import ViewFilesComponent from "./components/Home/ViewFilesComponent";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import light_theme from "./light_theme";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const isDarkTheme = useSelector((state) => state.theme.theme)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <ThemeProvider theme={isDarkTheme ? theme : light_theme}>
              <LoginComponent />
            </ThemeProvider>
          }
        />
        <Route
          path="/signup"
          element={
            <ThemeProvider theme={isDarkTheme ? theme : light_theme}>
              <SignupComponent />
            </ThemeProvider>
          }
        />
        <Route
          path="/upload"
          element={
            <ThemeProvider theme={isDarkTheme ? theme : light_theme}>
              <UploadComponent />
            </ThemeProvider>
          }
        />
        <Route
          path="/view-files"
          element={
            <ThemeProvider theme={isDarkTheme ? theme : light_theme}>
              <ViewFilesComponent />
            </ThemeProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
