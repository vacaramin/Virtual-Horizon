import React, { useState } from "react";
import "./Tutor.css";

function Tutor() {
  const [isHireTutor, setIsHireTutor] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    experience: "",
  });

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
    console.log("Tutor confirmed:", selectedTutor);
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
    { id: 1, name: "Tutor 1", subject: "Math", experience: "5 years" },
    { id: 2, name: "Tutor 2", subject: "Science", experience: "3 years" },
    { id: 3, name: "Tutor 3", subject: "English", experience: "4 years" },
  ];

  return (
    <div className="tutor-container">
      <div className="tutor-buttons">
        <button
          className={isHireTutor ? "active" : ""}
          onClick={handleHireTutor}
        >
          Hire a Tutor
        </button>
        <button
          className={!isHireTutor ? "active" : ""}
          onClick={handleBecomeTutor}
        >
          Become a Tutor
        </button>
      </div>

      {isHireTutor ? (
        <div className="available-tutors">
          <h2>Available Tutors</h2>
          <ul>
            {availableTutors.map((tutor) => (
              <li key={tutor.id} onClick={() => handleSelectTutor(tutor)}>
                {tutor.name}
              </li>
            ))}
          </ul>
          {selectedTutor && (
            <div className="selected-tutor">
              <h3>Selected Tutor:</h3>
              <p>Name: {selectedTutor.name}</p>
              <p>Subject: {selectedTutor.subject}</p>
              <p>Experience: {selectedTutor.experience}</p>
              <div className="confirm-tutor-button">
                <button onClick={handleConfirmTutor}>Confirm Tutor</button>
              </div>
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
