package models

import (
	"time"
)

type TutorCourseLink struct {
	ID               uint      `json:"id" gorm:"primarykey"`
	CourseID         uint      `json:"-"`
	TutorID          uint      `json:"-"`
	StartDate        time.Time `json:"start_date"`
	EndDate          time.Time `json:"end_date"`
	SessionFrequency string    `json:"session_frequency"`
	MaxStudents      int       `json:"max_students"`
	CurrentStudents  int       `json:"current_students"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
	//	Course           Course       `json:"course" gorm:"foreignKey:CourseID"`
	//	Tutor            models.Tutor `json:"tutor" gorm:"foreignKey:TutorID"`

}
type TutorCourseLinks []TutorCourseLink
