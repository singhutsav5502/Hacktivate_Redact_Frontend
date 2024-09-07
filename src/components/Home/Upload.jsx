import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Stack, LinearProgress } from "@mui/material";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [redactedPreviewUrl, setRedactedPreviewUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

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
      console.log(data);
      setRedactedPreviewUrl(data.cloudinary_url); // Redacted file URL
      setUploadStatus("Upload complete!");
    } catch (error) {
      setError("Upload failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated step-wise status updates
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
            // Check if still loading before updating status
            setUploadStatus(message);
          }
        }, delay);
      });
    }
  }, [isLoading]);

  const renderPreview = (url, type) => {
    switch (true) {
      case type.includes("image"):
        return (
          <img
            src={url}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "clamp(500px,40vh,1200px)" }}
          />
        );
      case type.includes("video"):
        return (
          <video
            controls
            style={{ maxWidth: "100%", maxHeight: "clamp(500px,40vh,1200px)" }}
          >
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
            style={{ width: "100%", height: "clamp(500px,40vh,1200px)" }}
          />
        );
      default:
        return <Typography variant="body1">No preview available</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "33%" },
              p: 3, 
              bgcolor: "background.paper", 
              borderRadius: 2, 
              boxShadow: 2, 
              textAlign: "center", 
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Typography variant="h4" gutterBottom>
                Upload File
              </Typography>
              <input
                type="file"
                onChange={handleFileChange}
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  width: "80%", // Limit width for better visual balance
                }}
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              {isLoading ? (
                <Box sx={{ width: "100%", textAlign: "center" }}>
                  <LinearProgress sx={{ width: "80%", mx: "auto" }} />{" "}
                  {/* Center the progress bar */}
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {uploadStatus}
                  </Typography>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  sx={{ mt: 2, width: "50%" }} // Add some top margin and adjust button width
                >
                  Upload
                </Button>
              )}
            </Stack>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "67%" }, height: "100%" }}>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h6">Original Preview</Typography>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {previewUrl && renderPreview(previewUrl, fileType)}
              </Box>
              {redactedPreviewUrl && (
                <>
                  <Typography variant="h6">Redacted Preview</Typography>
                  <Box sx={{ height: "100%", width: "100%" }}>
                    {renderPreview(redactedPreviewUrl, fileType)}
                  </Box>
                </>
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default UploadComponent;
