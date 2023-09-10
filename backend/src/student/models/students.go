package models

import (
	"Virtual-Horizon/src/user/models"
	"time"
)

type Student struct {
	models.User
	ParentGuardianName  string    `json:"parent_guardian_name"`
	ParentGuardianEmail string    `json:"parent_guardian_email"`
	ParentGuardianPhone string    `json:"parent_guardian_phone"`
	GradeLevel          string    `json:"grade_level"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}
