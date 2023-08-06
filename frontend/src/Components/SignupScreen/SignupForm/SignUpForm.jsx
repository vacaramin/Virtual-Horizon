import React, { useState } from "react";
import "./SignupForm.css";

import { styled } from "@mui/system";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import ErrorNotification from "../../ErrorNotification/ErrorNotification";

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


const steps = [
  "Personal Information",
  "Contact Information",
  "Academic Information",
  "Technical Information",
  "Additional Information",
  "Present Address",
];

const SignupForm = () => {

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
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");

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
  
  const handleNext = () => {
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length -1 ){
      fetch("http://localhost:4000/signup", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                }).then((response) => response.json())
                .then((data) => {
                  //if responsce is ok
                  console.log(data)
                })
                .catch((error) => {
                  console.log(error);
                  setError(error);
                });
    }
    
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
              value={Name}
            />
            <TextField
              id="email"
              label="email"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              id="password"
              label="Password"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            <TextField
              id="dateOfBirth"
              label="Date of Birth"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setDob(e.target.value)}
              value={Dob}
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
              value={ParentGuardianName}
            />
            <TextField
              id="parentEmail"
              label="Parent/Guardian's Email"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setParentGuardianEmail(e.target.value)}
              value = {ParentGuardianEmail}
            />
            <TextField
              id="parentPhone"
              label="Parent/Guardian's Phone Number"
              fullWidth
              style={inputSpacing}
              onChange={(e) => setParentGuardianPhone(e.target.value)}
              value={ParentGuardianPhone}
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
              value = {GradeLevel}
            />
            <br />
            <TextField
              id="schoolName"
              label="Name of Current School"
              fullWidth
              onChange={(e) => setCurrentSchool(e.target.value)}
              value={CurrentSchool}
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
              value = {Device}
            />
            <br />
            <TextField
              id="internetConnection"
              label="Internet Connection"
              fullWidth
              onChange={(e) => setInternetConnection(e.target.value)}
              value = {InternetConnection}
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
              value = {SpecialNeeds}
            />
            <br />
            <TextField
              id="accommodations"
              label="Accommodations"
              fullWidth
              onChange={(e) => setAccomodations(e.target.value)}
              value = {Accomodations}
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
              value = {PresentAddress}
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
               }
              }
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
      <ErrorNotification error={error} color = "red" /> 
      
    </Container>
    
  );
};

export default SignupForm;
