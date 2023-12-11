package models

import (
	"time"
)

// Quiz represents the "quiz" table
type Quiz struct {
	ID        uint      `json:"quiz_id"`
	CourseID  uint      `json:"course_id"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (Quiz) TableName() string {
	return "quiz"
}

// Quizzes is a slice of Quiz
type Quizzes []Quiz
