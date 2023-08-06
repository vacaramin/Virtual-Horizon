import React, { useState } from "react";
import "./SignupForm.css";
import { styled } from "@mui/system";
import { Stepper, Step, StepLabel } from "@mui/material";

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [Name, setName] = useState("");
const [Dob, setDob] = useState(""); // Assuming you'll handle date using a date picker
const [Gender, setGender] = useState("");
const [ParentGuardianName, setParentGuardianName] = useState("");
const [ParentGuardianEmail, setParentGuardianEmail] = useState("");
const [ParentGuardianPhone, setParentGuardianPhone] = useState("");
const [GradeLevel, setGradeLevel] = useState("");
const [CurrentSchool, setCurrentSchool] = useState("");
const [Device, setDevice] = useState("");
const [InternetConnection, setInternetConnection] = useState("");
const [SpecialNeeds, setSpecialNeeds] = useState("");
const [Accomodations, setAccomodations] = useState("");
const [PresentAddress, setPresentAddress] = useState("");

import {
  Button,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

const Container = styled("div")({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
});
const StepperContainer = styled("div")({
  margin: "7%",
});

const BackButton = styled(Button)({
  marginRight: "15%",
  background: "#243047",
  borderRadius: "76px",
  width: "20%",
  color: "white",
  "&:hover": {
    background: "#f7cb46",
    color: "black",
  },
  "&:disabled": {
    background: "gray",
    color: "white",
  },
});

const NextButton = styled(Button)({
  marginRight: "0%",
  background: "#243047",
  borderRadius: "76px",
  color: "white",
  width: "50%",
  "&:hover": {
    background: "#f7cb46",
    color: "black",
  },
});

const Instructions = styled(Typography)({
  marginTop: "10%",
  marginBottom: "20%",
});

const payload = {
  email,
  password,
  Name,
  Dob,
  Gender,
  ParentGuardianName,
  ParentGuardianEmail,
  ParentGuardianPhone,
  GradeLevel,
  CurrentSchool,
  Device,
  InternetConnection,
  SpecialNeeds,
  Accomodations,
  PresentAddress,
};

const steps = [
  "Personal Information",
  "Contact Information",
  "Academic Information",
  "Technical Information",
  "Additional Information",
  "Present Address",
];

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
            <TextField
              id="name"
              label="Name"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="email"
              label="email"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="dateOfBirth"
              label="Date of Birth"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setDob(e.target.value)}
            />
            <FormControl component="fieldset" style={inputSpacing}>
              <RadioGroup row aria-label="gender">
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={(e) => setGender(e.target.value)}
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
              onChange={(e) => setParentGuardianName(e.target.value)}
            />
            <TextField
              id="parentEmail"
              label="Parent/Guardian's Email"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setParentGuardianEmail(e.target.value)}
            />
            <TextField
              id="parentPhone"
              label="Parent/Guardian's Phone Number"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setParentGuardianPhone(e.target.value)}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <TextField
              id="gradeLevel"
              label="Current Grade Level"
              fullWidth
              onChange={(e) => setGradeLevel(e.target.value)}
            />
            <br />
            <TextField
              id="schoolName"
              label="Name of Current School"
              fullWidth
              onChange={(e) => setCurrentSchool(e.target.value)}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <TextField
              id="device"
              label="Device"
              fullWidth
              onChange={(e) => setDevice(e.target.value)}
            />
            <br />
            <TextField
              id="internetConnection"
              label="Internet Connection"
              fullWidth
              onChange={(e) => setInternetConnection(e.target.value)}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <TextField
              id="specialNeeds"
              label="Special Needs"
              fullWidth
              onChange={(e) => setSpecialNeeds(e.target.value)}
            />
            <br />
            <TextField
              id="accommodations"
              label="Accommodations"
              fullWidth
              onChange={(e) => setAccomodations(e.target.value)}
            />
          </div>
        );
      case 5:
        return (
          <div>
            <TextField
              id="presentAddress"
              label="Present Address"
              fullWidth
              onChange={(e) => setPresentAddress(e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <StepperContainer>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
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
              onClick={() => {
                setActiveStep(0);
                fetch("https://localhost:4000/signup", {
                  method: "POST",
                  mode: "cors",
                  body: JSON.stringify(payload),
                });
              }}
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
