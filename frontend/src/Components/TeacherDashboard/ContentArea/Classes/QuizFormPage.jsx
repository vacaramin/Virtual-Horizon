// QuizFormPage.js
import React from "react";
import QuizForm from "./QuizForm";

function QuizFormPage({ onSave, onCancel }) {
  return (
    <div className="quiz-form-page">
      <h1>Add Quiz</h1>
      <QuizForm onSave={onSave} onCancel={onCancel} />
    </div>
  );
}

export default QuizFormPage;
