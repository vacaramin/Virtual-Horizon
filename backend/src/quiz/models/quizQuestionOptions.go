package models

import "time"

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
