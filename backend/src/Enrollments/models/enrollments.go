package models

import (
	"Virtual-Horizon/src/course/models"
	studentmodel "Virtual-Horizon/src/student/models"
	"time"
)

type Enrollment struct {
	ID             uint                   `json:"enrollment_id"`
	StudentID      uint                   `json:"-"`
	LinkID         uint                   `json:"-"`
	EnrollmentDate time.Time              `json:"enrollment_date"`
	Status         string                 `json:"status"`
	Grade          string                 `json:"grade"`
	Comment        string                 `json:"comment"`
	CreatedAt      time.Time              `json:"created_at"`
	UpdatedAt      time.Time              `json:"updated_at"`
	Link           models.TutorCourseLink `json:"link" gorm:"foreignKey:LinkID"`
	Student        studentmodel.Student   `json:"-" gorm:"foreignKey:StudentID"`
}

type Enrollments []Enrollment
