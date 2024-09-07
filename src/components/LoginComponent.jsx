import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearAll, setToken, setUsername } from "../slice/authSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent";
import PeopleIcon from "@mui/icons-material/People";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearAll());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();
      dispatch(setToken(data.access_token));
      dispatch(setUsername(username));
      setError("");
      navigate("/upload");
    } catch (error) {
      setError("Login failed: " + error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
      }}
    >
      <CardComponent opacity={0.85}>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "clamp(250px, 25vw, 800px)", // Adjust width to match the SignupComponent
            mx: "auto",
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              color="secondary"
              sx={{
                backgroundColor: "black",
                borderRadius: "50%",
                padding: "10px",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              <PeopleIcon />
            </IconButton>
            <Typography
              variant="h4" // Adjusted to match SignupComponent
              sx={{
                textAlign: "center",
                marginBottom: "1rem",
                marginTop: "0.5rem",
              }}
            >
              Login
            </Typography>
          </Box>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>

          <Link
            component={RouterLink}
            to="/signup"
            sx={{
              mt: 2,
              textDecoration: "none",
              color: "primary.main",
              alignSelf: "flex-end", // Align to the right for consistency
            }}
          >
            Don't have an account? Sign up here.
          </Link>
        </Box>
      </CardComponent>
    </Box>
  );
};

export default LoginComponent;
