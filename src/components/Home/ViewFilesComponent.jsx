import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CssBaseline,
  useTheme
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
  
  const theme = useTheme(); // Accessing the current theme
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
    <Box sx={{ display: "flex", alignItems: "center", bgcolor: theme.palette.background.default }}>
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
        <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.primary }}>
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
                  md: "calc(33.33% - 10.67px)"
                },
                  cursor: "pointer",
                  opacity: 0.7,
                  transition: "opacity 0.3s ease-in-out",
                  "&:hover": {
                    opacity: 1,
                  },
                  bgcolor: theme.palette.background.paper,
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
                    color: theme.palette.text.primary,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      whiteSpace: "normal",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.8rem",
                        md: "1rem",
                      },
                      color: theme.palette.text.primary,
                    }}
                  >
                    {file.original_filename}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {new Date(file.created_at).toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                      color: theme.palette.text.secondary,
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
                    color: theme.palette.primary.main,
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
