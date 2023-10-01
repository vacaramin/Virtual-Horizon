package models

import (
	"fmt"
	"github.com/go-playground/validator"
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	Email    string    `json:"email" gorm:"unique;not null" validate:"email"`
	Password string    `json:"-"`
	Name     string    `json:"name"`
	Dob      time.Time `json:"dob"`
	Gender   Gender    `json:"gender"`
	About    string    `json:"about"`
	Role     Role      `json:"role"`
}
type Gender string
type Role string

const (
	Male     Gender = "male"
	Female   Gender = "female"
	Intersex Gender = "intersex"
)

const (
	Admin   Role = "admin"
	Student Role = "student"
	Tutor   Role = "tutor"
)

func (u *User) Validate() error {
	validate := validator.New()
	err := validate.Struct(u)
	if err != nil {
		for _, e := range err.(validator.ValidationErrors) {
			fmt.Printf("Field %s, Error %s\n", e.Field(), e.Tag())
		}
		return err
	} else {
		return nil
	}
}
