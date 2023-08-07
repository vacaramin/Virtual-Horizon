package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Email               string `gorm:"unique"`
	Password            string
	Name                string
	Dob                 string
	Gender              string
	ParentGuardianName  string
	ParentGuardianEmail string
	ParentGuardianPhone string
	GradeLevel          string
	CurrentSchool       string
	Device              string
	InternetConnection  string
	SpecialNeeds        string
	Accomodations       string
	PresentAddress      string
}
