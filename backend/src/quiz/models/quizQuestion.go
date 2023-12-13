package models

import (
	"time"
)

// QuizQuestion represents the "quiz_question" table
type QuizQuestion struct {
	ID        uint                `json:"-"`
	QuizID    uint                `json:"quiz_id"`
	Message   string              `json:"message"`
	Options   QuizQuestionOptions `json:"options"`
	Question  string              `json:"question"`
	CreatedAt time.Time           `json:"created_at"`
	UpdatedAt time.Time           `json:"updated_at"`
}

// QuizQuestions is a slice of QuizQuestion
type QuizQuestions []QuizQuestion
