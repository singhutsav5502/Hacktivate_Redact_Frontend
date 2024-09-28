import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  LinearProgress,
  Collapse,
  IconButton,
  Card,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import CustomizeIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import RedactionCustomisation from "./RedactionCustomisation";

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
  const [isDragAndDrop, setIsDragAndDrop] = useState(false); // Track drag-and-drop
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [levelOfRedaction, setLevelOfRedaction] = useState([
    "low",
    "medium",
    "high",
  ]);
  const [specialCustomisationModal, setSpecialCustomisationModal] =
    useState(false);


  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const theme = useTheme();
  const isDarkTheme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    if (!auth.token || !auth.username) {
      toast.error("User not logged in!");
      navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (selectedFile) {
      // Call handleUpload only if the file was dragged and dropped
      if (isDragAndDrop) {
        handleUpload();
        setIsDragAndDrop(false); // Reset after handling drag-and-drop
      }
    }
  }, [selectedFile, isDragAndDrop]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFileType(file.type);
      // Set to false as it is not a drag-and-drop action
      setIsDragAndDrop(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }
    setRedactedPreviewUrl(null);
    setIsLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("special_instructions", specialInstructions);
    levelOfRedaction.forEach((level) => {
      formData.append("level_of_redaction", level);
    });
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
              width: "clamp(200px , 33vw, 90vw)",
              height: "clamp(500px,45vh,1200px)",
            }}
          />
        );
      default:
        return <Typography variant="body1">No preview available</Typography>;
    }
  };
  const ButtonInput = () => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1vw",
            width: "50%",
          }}
        >
          <Button
            variant="outlined"
            component="label"
            sx={{
              width: "70%",
              padding: theme.spacing(1),
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main, // Set text color directly
              "&:hover": {
                borderColor: theme.palette.primary.dark, // Ensure the border color changes on hover
                color: theme.palette.primary.dark, // Ensure text color changes on hover
              },
              "&.Mui-disabled": {
                color: theme.palette.action.disabled,
                borderColor: theme.palette.action.disabled,
              },
            }}
          >
            Choose File
            <input
              type="file"
              onChange={handleFileChange}
              hidden
              accept=".png,.jpg,.jpeg,.gif,.pdf,.doc,.docx,.txt,video/*"
            />
          </Button>

          <Button
            variant="outlined"
            component="label"
            onClick={() => {
              setSpecialCustomisationModal((prevVal) => true);
            }}
            sx={{
              width: "auto",
              padding: {
                xs: theme.spacing(0.5), // Smaller padding for mobile devices
                sm: theme.spacing(1), // Normal padding for small screens and up
              },
              fontSize: {
                xs: "0.8rem", // Smaller font size for mobile
                sm: "1rem", // Normal font size for small screens and up
              },
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                color: theme.palette.primary.dark,
              },
              "&.Mui-disabled": {
                color: theme.palette.action.disabled,
                borderColor: theme.palette.action.disabled,
              },
            }}
            startIcon={<CustomizeIcon />}
          >
            Customise Redaction
          </Button>
        </Box>
      </>
    );
  };
  const UploadSection = () => {
    return (
      <>
        {isLoading ? (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <LinearProgress
              sx={{
                width: "80%",
                mx: "auto",
                bgcolor: theme.palette.secondary.light,
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
      </>
    );
  };
  const ErrorBlock = () => {
    if (error) {
      return (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      );
    } else {
      return <></>;
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation(); // Ensure the event does not propagate
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFileType(file.type);
      setIsDragAndDrop(true); // Set to true for drag-and-drop action
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default drag behavior
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.background.paper,
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <RedactionCustomisation
          setLevelOfRedaction={setLevelOfRedaction}
          specialInstructions={specialInstructions}
          setSpecialInstructions={setSpecialInstructions}
          specialCustomisationModal={specialCustomisationModal}
          setSpecialCustomisationModal={setSpecialCustomisationModal}
        />
        <Stack
          direction="column"
          spacing={10}
          sx={{ height: "100%", width: "100%" }}
        >
          {!selectedFile ? (
            <Box
              sx={{
                width: { xs: "100%", md: "100%" },
                height: "100%",
                p: 3,
                bgcolor: theme.palette.background.default,
                borderRadius: 2,
                boxShadow: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Typography variant="h1" color={theme.palette.primary.sharp}>
                RE-DACT Files
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ marginBottom: "3vh" }}
                color={theme.palette.primary.sharp}
              >
                Obfuscate personal data in seconds.
              </Typography>
              <ButtonInput />
              <ErrorBlock />

              <UploadSection />
              {/* Drag and Drop Area */}
              <Box
                sx={{
                  width: "100%",
                  height: "40vh",
                  p: 3,
                  mt: 2,
                  bgcolor: theme.palette.background.default,
                  borderRadius: 2,
                  border: `2px dashed ${theme.palette.divider}`,
                  color: theme.palette.text.disabled,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h3">
                  Drag and drop files here to upload.
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  width: "100%",
                  p: 3,
                  bgcolor: theme.palette.background.default,
                  borderRadius: 2,
                  boxShadow: 2,
                }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Stack spacing={2} alignItems="center">
                  <ButtonInput />
                  <ErrorBlock />
                  <UploadSection />
                </Stack>
              </Box>
              <Stack
                direction={{ xs: "column", md: "row" }}
                sx={{
                  width: "100%",
                  gap: { xs: 2, md: 10 },
                }}
              >
                {/* Original Preview */}
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "auto",
                    bgcolor: `${
                      isDarkTheme
                        ? theme.palette.background.default
                        : theme.palette.background.paper
                    }`,
                  }}
                >
                  <Stack
                    alignItems="center"
                    sx={{
                      padding: theme.spacing(2),
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography
                        variant="h6"
                        color={theme.palette.text.secondary}
                      >
                        Original Preview
                      </Typography>
                      <IconButton
                        onClick={() =>
                          setIsOriginalPreviewOpen((prev) => !prev)
                        }
                        color="secondary"
                      >
                        {isOriginalPreviewOpen ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
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
                </Card>
                {/* Redacted Preview */}
                {redactedPreviewUrl && (
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      width: "auto",
                      bgcolor: `${
                        isDarkTheme
                          ? theme.palette.background.default
                          : theme.palette.background.paper
                      }`,
                    }}
                  >
                    <Stack
                      alignItems="center"
                      sx={{
                        padding: theme.spacing(2),
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                          variant="h6"
                          color={theme.palette.text.secondary}
                        >
                          Redacted Preview
                        </Typography>
                        <IconButton
                          onClick={() =>
                            setIsRedactedPreviewOpen((prev) => !prev)
                          }
                          color="secondary"
                        >
                          {isRedactedPreviewOpen ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
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
                  </Card>
                )}
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default UploadComponent;
