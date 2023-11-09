import React from "react";
import QuizCSS from "./Quizzes.module.css";
import QuizPic from "./Quiz.svg"

function Quizzes() {
  // Sample data for quizzes
  const quizzesData = [
    {
      id: 1,
      topic: "Topic 1",
      description: "Description for Topic 1",
      image: {QuizPic}, // or provide URL
    },
    {
      id: 2,
      topic: "Topic 2",
      description: "Description for Topic 2",
      image: {QuizPic}, // or provide URL
    },
    {
      id: 3,
      topic: "Topic 3",
      description: "Description for Topic 3",
      image: {QuizPic}, // or provide URL
    },
    // Add more quizzes as needed
  ];

  // Render quiz cards
  const renderQuizCards = () => {
    return quizzesData.map((quiz) => (
      <div key={quiz.id} className={QuizCSS.quizCard}>
        <img src={quiz.image} alt={`Topic ${quiz.id}`} />
        <div className={QuizCSS.quizInfo}>
          <h3>{quiz.topic}</h3>
          <p>{quiz.description}</p>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h2>Quizzes</h2>
      <div className={QuizCSS.quizContainer}>{renderQuizCards()}</div>
    </div>
  );
}

export default Quizzes;
