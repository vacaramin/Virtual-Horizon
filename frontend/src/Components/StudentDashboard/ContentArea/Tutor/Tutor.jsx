// Tutor.js

import React, { useState } from "react";
import "./Tutor.css";
import "./Modal.css";

function TutorCard({ tutor, onSelectTutor }) {
  return (
    <div className="card" onClick={() => onSelectTutor(tutor)}>
      <div className="top-part">
        <div className="profile-pic">
          <img
            src="https://avatars.githubusercontent.com/u/94608299?v=4"
            alt={`${tutor.name}'s profile`}
          />
        </div>
        <div>
          <h4>{tutor.name}</h4>
          <h3>{tutor.subject}</h3>
        </div>
      </div>
      <div className="bottom-part">
        <p className="course-description">Experience: {tutor.experience}</p>
      </div>
    </div>
  );
}

function Modal({ onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function Tutor() {
  const [isHireTutor, setIsHireTutor] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showConfirmationMenu, setShowConfirmationMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    experience: "",
  });

  const [confirmationStep, setConfirmationStep] = useState(1);

  const handleHireTutor = () => {
    setIsHireTutor(true);
  };

  const handleBecomeTutor = () => {
    setIsHireTutor(false);
  };

  const handleSelectTutor = (tutor) => {
    setSelectedTutor(tutor);
  };

  const handleConfirmTutor = () => {
    // Perform confirmation logic here
    setShowConfirmationMenu(true);
  };

  const handleCloseModal = () => {
    if (confirmationStep > 1) {
      setConfirmationStep((prevStep) => prevStep - 1);
    } else {
      setShowConfirmationMenu(false);
      setConfirmationStep(1); // Reset confirmation step when closing modal
    }
  };

  const handleBackStep = () => {
    setConfirmationStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleNextStep = () => {
    setConfirmationStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const renderConfirmationStep = () => {
    switch (confirmationStep) {
      case 1:
        return (
          <div>
            <h3>Tutor Availability</h3>
            <p>Days: {selectedTutor.availability.days}</p>
            <p>Time: {selectedTutor.availability.time}</p>
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Payment Options</h3>
            <p>Choose a payment method:</p>
            {/* Add payment options here */}
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Confirmation</h3>
            <p>Course Fee: $XXX</p>
            <p>Qualification: {selectedTutor.qualification}</p>

            {/* Additional details and options for confirmation */}
          </div>
        );
      default:
        return null;
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      experience: "",
    });
  };

  const availableTutors = [
    {
      id: 1,
      name: "Awais Mohammad",
      subject: "Math",
      experience: "5 years",
      qualification: "Ph.D. in Mathematics",
      availability: {
        days: "Mon, Wed, Fri",
        time: "10:00 AM - 2:00 PM",
      },
    },
    {
      id: 2,
      name: "Waqar Amin",
      subject: "Science",
      experience: "3 years",
      qualification: "M.Sc. in Physics",
      availability: {
        days: "Tue, Thu",
        time: "2:00 PM - 6:00 PM",
      },
    },
    {
      id: 3,
      name: "Muhammad Aqib",
      subject: "English",
      experience: "4 years",
      qualification: "MA in English Literature",
      availability: {
        days: "Mon, Wed, Fri",
        time: "3:00 PM - 7:00 PM",
      },
    },
    {
      id: 4,
      name: "Muhammad Karim",
      subject: "Chemistry",
      experience: "3.5 years",
      qualification: "M.Sc. in Chemistry",
      availability: {
        days: "Tue, Thu",
        time: "10:00 AM - 1:00 PM",
      },
    },
  ];

  return (
    <div className="tutor-container">
      {isHireTutor ? (
        <div className="available-tutors">
          <div className="cards-container">
            {availableTutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                onSelectTutor={handleSelectTutor}
              />
            ))}
          </div>
          {selectedTutor && (
            <div className="selected-tutor">
              <h3>Selected Tutor:</h3>
              <p>Name: {selectedTutor.name}</p>
              <p>Subject: {selectedTutor.subject}</p>
              <p>Experience: {selectedTutor.experience}</p>
              <div className="confirm-tutor-button">
                <button onClick={handleConfirmTutor}>Confirm Tutor</button>
              </div>
              {showConfirmationMenu && (
                <Modal onClose={handleCloseModal}>
                  <div>
                    <h3>Confirmation Details</h3>
                    <p>Course Fee: $XXX</p>
                    <p>Qualification: {selectedTutor.qualification}</p>

                    {renderConfirmationStep()}

                    {/* Navigation Buttons */}
                    <div className="confirm-tutor-button">
                      <button onClick={handleCloseModal}>
                        {confirmationStep === 1 ? "Close" : "Back"}
                      </button>
                      {confirmationStep < 3 && (
                        <button onClick={handleNextStep}>Next</button>
                      )}
                      {confirmationStep === 3 && (
                        <button onClick={handleConfirmTutor}>Confirm</button>
                      )}
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="become-tutor-form">
          <h2>Become a Tutor</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />

            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleFormChange}
            />

            <label htmlFor="experience">Experience</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleFormChange}
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Tutor;
