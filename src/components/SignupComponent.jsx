import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUsername } from "../slice/authSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent"; // Adjust the import path as needed
import PeopleIcon from "@mui/icons-material/People";

const SignupComponent = () => {
  const dispatch = useDispatch();
  const [username, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Signup failed");
      }

      const data = await response.json();
      dispatch(setToken(data.access_token));
      dispatch(setUsername(username));
      setError("");
      navigate("/upload");
    } catch (error) {
      setError("Signup failed: " + error.message);
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
      }}
    >
      <CardComponent opacity={0.85}>
        <Box 
        sx={{
          width:'100%' // Ensure the form takes full width of the card
        }}>
          <Box
            component="form"
            onSubmit={handleSignup}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "clamp(250px, 25vw, 800px)", 
              mx: "auto",
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
                variant="h4" // Adjusted for better fit on smaller screens
                sx={{
                  textAlign: "center",
                  marginBottom: "1rem",
                  marginTop: "0.5rem",
                }}
              >
                Signup
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
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Signup
            </Button>

            <Link
              component={RouterLink}
              to="/login"
              sx={{
                mt: 2,
                textDecoration: "none",
                color: "primary.main",
                alignSelf: "flex-end",
              }}
            >
              Already have an account? Login here.
            </Link>
          </Box>
        </Box>
      </CardComponent>
    </Box>
  );
};

export default SignupComponent;
