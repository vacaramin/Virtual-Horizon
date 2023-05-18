import React, { useState } from "react";
import "./SignupForm.css";
import { styled } from "@mui/system";
import { Stepper, Step, StepLabel } from "@mui/material";
import { withStyles } from '@material-ui/core/styles';
import { StepConnector } from '@mui/material';

import {
  Button,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { hover } from "@testing-library/user-event/dist/hover";

const Container = styled("div")({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
});
const StepperContainer = styled("div")({
  margin: "7% 0", // Adjust the margin as needed to position the steps
});

const BackButton = styled(Button)({
  marginRight: "15%",
  background: "black",
  borderRadius: "76px",
  width: "20%",
  color: "white",
  ":hover": {
    background: "#f7cb46",
    color: "black",
  },
  ":disabled": {
    background: "gray",
    color: "white",
  },
});

const NextButton = styled(Button)({
  marginRight: "0%",
  background: "black",
  borderRadius: "76px",
  color: "white",
  width: "50%",
  ":hover": {
    background: "#f7cb46",
    color: "black",
  },
});

const Instructions = styled(Typography)({
  marginTop: "10%",
  marginBottom: "20%",
});

const steps = [
  "Personal Information",
  "Contact Information",
  "Academic Information",
  "Technical Information",
  "Additional Information",
  "Present Address",
];
// Custom styles for the StepConnector
const CustomStepConnector = withStyles({
    active: {
      '& $line': {
        backgroundColor: 'red', // Color for the active (selected) step
      },
    },
    completed: {
      '& $line': {
        backgroundColor: 'green', // Color for the completed steps
      },
    },
    line: {
      height: 3, // Adjust the height of the connector line
      border: 0,
      backgroundColor: 'gray', // Color for the default (unselected) steps
      borderRadius: 1,
    },
  })(StepConnector);

const SignupForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step) => {
    const inputSpacing = {
      marginBottom: "4%",
      width: "100%",
      display: "block",
    };

    switch (step) {
      case 0:
        return (
          <div>
            <TextField id="name" label="Name" fullWidth style={inputSpacing} />
            <TextField
              id="dateOfBirth"
              label="Date of Birth"
              fullWidth
              style={inputSpacing}
            />
            <FormControl component="fieldset" style={inputSpacing}>
              <RadioGroup row aria-label="gender">
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </div>
        );
      case 1:
        return (
          <div>
            <TextField
              id="parentName"
              label="Parent/Guardian's Name"
              fullWidth
              style={inputSpacing}
            />
            <TextField
              id="parentEmail"
              label="Parent/Guardian's Email"
              fullWidth
              style={inputSpacing}
            />
            <TextField
              id="parentPhone"
              label="Parent/Guardian's Phone Number"
              fullWidth
              style={inputSpacing}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <TextField id="gradeLevel" label="Current Grade Level" fullWidth />
            <br />
            <TextField
              id="schoolName"
              label="Name of Current School"
              fullWidth
            />
          </div>
        );
      case 3:
        return (
          <div>
            <TextField id="device" label="Device" fullWidth />
            <br />
            <TextField
              id="internetConnection"
              label="Internet Connection"
              fullWidth
            />
          </div>
        );
      case 4:
        return (
          <div>
            <TextField id="specialNeeds" label="Special Needs" fullWidth />
            <br />
            <TextField id="accommodations" label="Accommodations" fullWidth />
          </div>
        );
      case 5:
        return (
          <div>
            <TextField id="presentAddress" label="Present Address" fullWidth />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <StepperContainer>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<CustomStepConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        ;
      </StepperContainer>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Instructions>
              All steps completed - Sign up successful!
            </Instructions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveStep(0)}
            >
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Instructions>{renderStepContent(activeStep)}</Instructions>
            <div>
              <BackButton disabled={activeStep === 0} onClick={handleBack}>
                Back
              </BackButton>
              <NextButton
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Sign Up" : "Next"}
              </NextButton>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SignupForm;
