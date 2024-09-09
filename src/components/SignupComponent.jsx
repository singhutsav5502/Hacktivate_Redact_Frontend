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
  useTheme,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent";
import PeopleIcon from "@mui/icons-material/People";

const SignupComponent = () => {
  const dispatch = useDispatch();
  const [username, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme(); // Access the theme

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
        background: `linear-gradient(to right, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
      }}
    >
      <CardComponent opacity={0.85}>
        <Box
          component="form"
          onSubmit={handleSignup}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "clamp(250px, 25vw, 800px)",
            mx: "auto",
            p: 3,
          }}
        >
                  <Typography
          variant="h1" 
          sx={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize:{xs:'1 em',md:"2.9em"},
            fontWeight: 900,
            color: theme,
            textAlign: "center",
            marginBottom: 1.5,
            letterSpacing:1
          }}
        >
          RE-DACT
        </Typography>  
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
                backgroundColor: theme.palette.primary.main,
                borderRadius: "50%",
                padding: 1,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              <PeopleIcon />
            </IconButton>
            <Typography
              variant="h4" // Adjusted to match LoginComponent
              sx={{
                textAlign: "center",
                marginBottom: 2,
                marginTop: 1,
                color: theme.palette.text.primary,
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
            sx={{
              "& .MuiInputLabel-root": { color: theme.palette.text.primary },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.secondary.main },
                "&:hover fieldset": { borderColor: theme.palette.primary.main },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
              "& .MuiInputBase-input": { color: theme.palette.text.primary },
            }}
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
            sx={{
              "& .MuiInputLabel-root": { color: theme.palette.text.primary },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.secondary.main },
                "&:hover fieldset": { borderColor: theme.palette.primary.main },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
              "& .MuiInputBase-input": { color: theme.palette.text.primary },
            }}
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
            sx={{
              "& .MuiInputLabel-root": { color: theme.palette.text.primary },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.secondary.main },
                "&:hover fieldset": { borderColor: theme.palette.primary.main },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
              "& .MuiInputBase-input": { color: theme.palette.text.primary },
            }}
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
              color: theme.palette.primary.contrastText,
              alignSelf: "flex-end", // Align to the right for consistency
            }}
          >
          <Typography variant="body1"> Already have an account? Login here.</Typography>
          </Link>
        </Box>
      </CardComponent>
    </Box>
  );
};

export default SignupComponent;
