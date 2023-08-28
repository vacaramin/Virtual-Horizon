package models

import "time"

type Student struct {
	ID                  uint      `json:"id" gorm:"primaryKey"`
	UserID              uint      `json:"user_id"`
	ParentGuardianName  string    `json:"parent_guardian_name"`
	ParentGuardianEmail string    `json:"parent_guardian_email"`
	ParentGuardianPhone string    `json:"parent_guardian_phone"`
	GradeLevel          string    `json:"grade_level"`
	CurrentSchool       string    `json:"current_school"`
	Device              string    `json:"device"`
	InternetConnection  string    `json:"internet_connection"`
	SpecialNeeds        string    `json:"special_needs"`
	Accomodations       string    `json:"accomodations"`
	PresentAddress      string    `json:"present_address"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}
