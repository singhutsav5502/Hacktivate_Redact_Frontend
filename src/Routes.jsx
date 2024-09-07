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
const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={
          <ThemeProvider theme={theme}>
            <LoginComponent />
          </ThemeProvider>
        }
      />
      <Route
        path="/signup"
        element={
          <ThemeProvider theme={theme}>
            <SignupComponent />
          </ThemeProvider>
        }
      />
      <Route path="/upload" element={<UploadComponent />} />
      <Route path="/view-files" element={<ViewFilesComponent />} />
    </Routes>
  </Router>
);

export default AppRoutes;
