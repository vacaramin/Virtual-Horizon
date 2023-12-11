package models

import (
	"time"
)

// Quiz represents the "quiz" table
type Quiz struct {
	ID        uint      `json:"-"`
	CourseID  uint      `json:"course_id"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Quizzes is a slice of Quiz
type Quizzes []Quiz

// QuizQuestion represents the "quiz_question" table
type QuizQuestion struct {
	ID        uint      `json:"-"`
	QuizID    uint      `json:"quiz_id"`
	Message   string    `json:"message"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// QuizQuestions is a slice of QuizQuestion
type QuizQuestions []QuizQuestion

// QuizQuestionOption represents the "quiz_question_option" table
type QuizQuestionOption struct {
	ID             uint      `json:"-"`
	QuizQuestionID uint      `json:"quiz_question_id"`
	Option         string    `json:"option"`
	Correct        bool      `json:"correct"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// QuizQuestionOptions is a slice of QuizQuestionOption
type QuizQuestionOptions []QuizQuestionOption
