import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
const RedactionCustomisation = ({
  setLevelOfRedaction,
  setSpecialCustomisationModal,
  specialCustomisationModal,
  setSpecialInstructions,
  specialInstructions,
}) => {
  const [redactionSliderLevel, setRedactionSliderLevel] = useState(2);

  const theme = useTheme();
  const redactionLevels = {
    low: ["low"],
    medium: ["low", "medium"],
    high: ["low", "medium", "high"],
  };

  const RedactionSlider = () => {
    const handleChange = (event, newValue) => {
      setRedactionSliderLevel((prevVal) => {
        return newValue;
      });
      setLevelOfRedaction(
        redactionLevels[Object.keys(redactionLevels)[newValue]]
      );
    };

    const handleCommit = (event, newValue) => {
      setLevelOfRedaction(
        redactionLevels[Object.keys(redactionLevels)[newValue]]
      );
    };
    return (
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          gutterBottom
          color={theme.palette.text.secondary}
        >
          Redaction Level: {Object.keys(redactionLevels)[redactionSliderLevel]}
        </Typography>
        <Slider
          value={redactionSliderLevel}
          min={0}
          max={2}
          step={1}
          onChange={handleChange}
          onChangeCommitted={handleCommit}
          sx={{ marginTop: "-2vh" }}
        />
      </Box>
    );
  };
  const handleClose = () => {
    setSpecialCustomisationModal((prev) => false);
  };
  const handleInputChange = (event) => {
    setSpecialInstructions(event.target.value);
  };

  return (
    <>
      <Modal
        open={specialCustomisationModal}
        onClose={handleClose}
        aria-labelledby="redaction-modal-title"
        aria-describedby="redaction-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "55%",
            transform: "translate(-50%, -50%)",
            width: "30vw",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            sx={{
              marginBottom: "3vh",
            }}
          >
            <Typography variant="h3" color={theme.palette.text.secondary}>
              Document Redaction Settings
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              color={theme.palette.text.secondary}
              sx={{ opacity: 0.75 }}
            >
              Adjust the redaction level and provide any special instructions.
            </Typography>
          </Box>
          <RedactionSlider />
          <Box sx={{ width: "100%", marginBottom: 2 }}>
            <Typography
              gutterBottom
              variant="h6"
              color={theme.palette.text.secondary}
            >
              Special Instructions
            </Typography>
            <TextField
              fullWidth
              label="Enter Special Instructions"
              variant="outlined"
              value={specialInstructions}
              onChange={handleInputChange}
              multiline
              rows={1}
              slotProps={{
                input: {
                  sx: {
                    color: `${theme.palette.text.secondary}`, // Change text color here
                  },
                },
                inputLabel: {
                  sx: {
                    color: `${theme.palette.text.secondary}`, // Change label color here
                  },
                },
              }}
              sx={{
                marginTop: "0.2vh",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: `${theme.palette.text.secondary}`, // Change border color here
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.dark", // Change border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: `${theme.palette.text.secondary}`, // Change border color when focused
                  },
                },
              }}
            />
          </Box>
          <Button
            onClick={handleClose}
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
          >
            Save and Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default RedactionCustomisation;
