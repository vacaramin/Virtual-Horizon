import React, { useState } from "react";
import QuizCSS from "./Quizzes.module.css";
import QuizPic from "./quizzes.svg";

function Quizzes() {
  const quizzesData = [
    {
      id: 1,
      topic: "Real and Complex Numbers",
      description: "Test for real and complex numbers.",
      image: "URL_TO_IMAGE_1", // Replace with actual image URL
    },
    {
      id: 2,
      topic: "Quadratic Equations",
      description: "Test for quadratic equations using different methods.",
      image: "URL_TO_IMAGE_2", // Replace with actual image URL
    },
    {
      id: 3,
      topic: "Trigonometry",
      description: "Test for trigonometric identities and their usage.",
      image: "URL_TO_IMAGE_3", // Replace with actual image URL
    },
    {
      id: 4,
      topic: "Algebra",
      description: "Test for Algebraic equations.",
      image: "URL_TO_IMAGE_4", // Replace with actual image URL
    },
    // Add more quizzes as needed
  ];

  const [showForm, setShowForm] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowForm(true);
  };

  const renderQuestionForm = () => {
    if (showForm && selectedQuiz) {
      return (
        <div className={QuizCSS.questionForm}>
          <h3>{selectedQuiz.topic} Questions</h3>
          <form>
            {/* Add your form fields */}
            <label htmlFor="question1">Question 1:</label>
            <input type="text" id="question1" name="question1" />
            
            <label htmlFor="question2">Question 2:</label>
            <input type="text" id="question2" name="question2" />

            <label htmlFor="question3">Question 3:</label>
            <input type="text" id="question3" name="question3" />
            
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
    return null;
  };

  const renderQuizCards = () => {
    if (!showForm) {
      return quizzesData.map((quiz) => (
        <div key={quiz.id} className={QuizCSS.quizCard} onClick={() => handleQuizClick(quiz)}>
          <div className={QuizCSS.topBar} style={{ backgroundColor: "goldenrod" }}>
            <img src={quiz.image} alt={`Topic ${quiz.id}`} />
          </div>
          <div className={QuizCSS.quizInfo}>
            <h3>{quiz.topic}</h3>
            <p>{quiz.description}</p>
          </div>
        </div>
      ));
    }
    return null;
  };

  return (
    <div>
      <h2>Quizzes</h2>
      <div className={QuizCSS.quizContainer}>
        {renderQuizCards()}
      </div>
      {renderQuestionForm()}
    </div>
  );
}

export default Quizzes;
