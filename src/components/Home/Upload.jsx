import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  LinearProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const UploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [redactedPreviewUrl, setRedactedPreviewUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isOriginalPreviewOpen, setIsOriginalPreviewOpen] = useState(true);
  const [isRedactedPreviewOpen, setIsRedactedPreviewOpen] = useState(true);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const theme = useTheme();

  useEffect(() => {
    if (!auth.token || !auth.username) {
      toast.error("User not logged in!");
      navigate("/login");
    }
  }, [auth, navigate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFileType(file.type);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }
    setRedactedPreviewUrl("");
    setIsLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploadStatus("Uploading file...");
      const response = await fetch(`${process.env.REACT_APP_SERVER}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setRedactedPreviewUrl(data.cloudinary_url); // Redacted file URL
      setUploadStatus("Upload complete!");
    } catch (error) {
      setError("Upload failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const statusUpdates = [
        { message: "Redacting file...", delay: 2000 },
        { message: "Compressing file...", delay: 4000 },
        { message: "Uploading to cloud...", delay: 6000 },
      ];

      statusUpdates.forEach(({ message, delay }) => {
        setTimeout(() => {
          if (isLoading) {
            setUploadStatus(message);
          }
        }, delay);
      });
    }
  }, [isLoading]);

  const renderPreview = (url, type) => {
    switch (true) {
      case type.includes("image"):
        return <img src={url} alt="Preview" style={{ maxWidth: "100%" }} />;
      case type.includes("video"):
        return (
          <video controls style={{ maxWidth: "100%" }}>
            <source src={url} type={type} />
            Your browser does not support the video tag.
          </video>
        );
      case type.includes("audio"):
        return (
          <audio controls style={{ width: "100%" }}>
            <source src={url} type={type} />
            Your browser does not support the audio element.
          </audio>
        );
      case type.includes("pdf"):
        return (
          <embed
            src={url}
            type="application/pdf"
            style={{
              width: "clamp(400px , 40vw, 90vw)",
              height: "clamp(500px,45vh,1200px)",
            }}
          />
        );
      default:
        return <Typography variant="body1">No preview available</Typography>;
    }
  };

  return (
    <Box
      sx={{ display: "flex", backgroundColor: theme.palette.background.main }}
    >
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
        <Stack
          direction={{ xs: "column", md: "row" }} // Responsive direction
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              p: 3,
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 2,
              textAlign: "center",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Typography
                variant="h4"
                gutterBottom
                color={theme.palette.text.primary}
              >
                Upload File
              </Typography>
              <input
                type="file"
                onChange={handleFileChange}
                style={{
                  padding: "8px",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "4px",
                  width: "80%",
                }}
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              {isLoading ? (
                <Box sx={{ width: "100%", textAlign: "center" }}>
                  <LinearProgress
                    sx={{
                      width: "80%",
                      mx: "auto",
                      backgroundColor: theme.palette.secondary.main,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: theme.palette.text.secondary }}
                  >
                    {uploadStatus}
                  </Typography>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  sx={{ mt: 2, width: "50%" }}
                >
                  Upload
                </Button>
              )}
            </Stack>
          </Box>
          <Stack
            sx={{
              maxHeight: "100vh",
              overflowY: "auto",
              width: "100%",
            }}
          >
            {/* Original Preview */}
            <Stack
              alignItems="center"
              sx={{
                bgcolor: theme.palette.background.paper,
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6" color={theme.palette.text.primary}>
                  Original Preview
                </Typography>
                <IconButton
                  onClick={() => setIsOriginalPreviewOpen((prev) => !prev)}
                  color="secondary"
                >
                  {isOriginalPreviewOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Stack>
              <Collapse
                in={isOriginalPreviewOpen}
                sx={{
                  maxWidth: "100vw",
                  width: "100%", // Ensure the Collapse takes full width
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    maxWidth: "100vw",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {previewUrl && renderPreview(previewUrl, fileType)}
                </Box>
              </Collapse>
            </Stack>

            {/* Redacted Preview */}
            {redactedPreviewUrl && (
              <Stack
                alignItems="center"
                sx={{
                  bgcolor: theme.palette.background.paper,
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h6" color={theme.palette.text.primary}>
                    Redacted Preview
                  </Typography>
                  <IconButton
                    onClick={() => setIsRedactedPreviewOpen((prev) => !prev)}
                    color="secondary"
                  >
                    {isRedactedPreviewOpen ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Stack>
                <Collapse
                  in={isRedactedPreviewOpen}
                  sx={{
                    maxWidth: "100vw",
                    width: "100%", // Ensure the Collapse takes full width
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      maxWidth: "100vw",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {renderPreview(redactedPreviewUrl, fileType)}
                  </Box>
                </Collapse>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default UploadComponent;
