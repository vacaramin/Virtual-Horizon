package models

import "time"

type Enrollment struct {
	ID             uint      `json:"enrollment_id"`
	StudentID      uint      `json:"student_id"`
	LinkID         uint      `json:"link_id"`
	EnrollmentDate time.Time `json:"enrollment_date"`
	Status         string    `json:"status"`
	Grade          string    `json:"grade"`
	Comment        string    `json:"comment"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

type Enrollments []Enrollment
