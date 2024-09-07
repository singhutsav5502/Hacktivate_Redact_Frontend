import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import Sidebar from "./Sidebar"; // Adjust the import path as needed
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.token || !auth.username) {
      toast.error("User not logged in!");
      navigate("/login");
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
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
      setPreviewUrl(
        `${data.cloudinary_url}`
      );
      setError("");
    } catch (error) {
      setError("Upload failed: " + error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <Sidebar />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Upload File
      </Typography>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Preview:</Typography>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mt: 2 }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default UploadComponent;
