// QuizForm.js
import React, { useState } from "react";

function QuizForm({ onSave }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [weights, setWeights] = useState(["", "", ""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = value;
    setWeights(newWeights);
  };

  const handleSave = () => {
    const quizData = {
      question,
      options,
      weights,
    };

    onSave(quizData);

    // Reset the form after saving
    setQuestion("");
    setOptions(["", "", ""]);
    setWeights(["", "", ""]);
  };

  return (
    <div className="quiz-form">
      <h3>Add Quiz</h3>
      <label>
        Question:
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </label>

      <div>
        {options.map((option, index) => (
          <div key={index}>
            <label>
              Option {index + 1}:
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </label>
            <label>
              Weight:
              <input
                type="number"
                value={weights[index]}
                onChange={(e) => handleWeightChange(index, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleSave}>Save Quiz</button>
    </div>
  );
}

export default QuizForm;
