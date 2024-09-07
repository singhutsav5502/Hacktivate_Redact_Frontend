import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Sidebar from "./Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
const getFileIcon = (fileType) => {
  switch (fileType) {
    case "application/pdf":
      return <PictureAsPdfIcon />;
    case "image/jpeg":
    case "image/png":
      return <ImageIcon />;
    case "video/mp4":
    case "video/avi":
      return <VideoCameraFrontIcon />;
    case "audio/mp3":
    case "audio/wav":
      return <MusicNoteIcon />;
    default:
      return <FileCopyIcon />;
  }
};

const ViewFilesComponent = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.token || !auth.username) {
      toast.error("User not logged in!");
      navigate("/login");
    }
  }, [auth.token, auth.username, navigate]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/user/files`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        setError("Failed to fetch files: " + error.message);
      }
    };

    fetchFiles();
  }, [auth.token]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          View Redacted Files
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            width: "100%",
            padding: "1rem",
          }}
        >
          {files?.reverse().map((file) => (
            <Card
              key={file.stored_filename}
              sx={{
                display: "flex",
                alignItems: "center",
                width: {
                  xs: "100%",
                  sm: "calc(50% - 8px)",
                  md: "calc(33.33% - 10.67px)",
                  cursor: "pointer",
                  opacity: 0.7,
                  transition: "opacity 0.3s ease-in-out",
                  "&:hover": {
                    opacity: 1,
                  },
                },
              }}
              onClick={() => {
                window.open(file.cloudinary_url, "_blank");
              }}
            >
              <CardContent
                sx={{
                  flex: "1 0 auto",
                  px: 2,
                  py: 1,
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    width: "100%", // Adjusted width to allow wrapping
                    textAlign: "left",
                    whiteSpace: "normal", // Allows text to wrap
                    overflow: "hidden", // Handles overflow
                    textOverflow: "ellipsis", // Adds ellipsis if text overflows (optional)
                    fontSize: {
                      xs: "0.75rem", // Smaller font size for extra-small screens
                      sm: "0.8rem", // Medium font size for small screens and up
                      md: "1rem", // Larger font size for medium screens and up
                    },
                  }}
                >
                  {file.original_filename}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: "0.75rem", // Smaller font size for extra-small screens
                      sm: "0.875rem", // Medium font size for small screens and up
                      md: "1rem", // Larger font size for medium screens and up
                    },
                  }}
                >
                  {new Date(file.created_at).toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: "0.75rem", // Smaller font size for extra-small screens
                      sm: "0.875rem", // Medium font size for small screens and up
                      md: "1rem", // Larger font size for medium screens and up
                    },
                  }}
                >
                  {file.type.split("/")[1]}
                </Typography>
              </CardContent>
              <CardMedia
                sx={{
                  width: 150,
                  height: 100,
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {getFileIcon(file.type)}
              </CardMedia>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewFilesComponent;
