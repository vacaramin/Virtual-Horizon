package models

import (
	"time"
)

type Student struct {
	ID                  uint      `gorm:"primaryKey"`
	ParentGuardianName  string    `json:"parent_guardian_name"`
	ParentGuardianEmail string    `json:"parent_guardian_email"`
	ParentGuardianPhone string    `json:"parent_guardian_phone"`
	GradeLevel          string    `json:"grade_level"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
	DeletedAt           time.Time `json:"deleted-at"`
}
