package models

import "time"

type TutorCourseLink struct {
	ID               uint      `json:"id" gorm:"primarykey"`
	CourseID         uint      `json:"course_id"`
	TutorID          uint      `json:"tutor_id"`
	StartDate        time.Time `json:"start_date"`
	EndDate          time.Time `json:"end_date"`
	SessionFrequency string    `json:"session_frequency"`
	MaxStudents      int       `json:"max_students"`
	CurrentStudents  int       `json:"current_students"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}
