package models

import (
	"fmt"
	"github.com/go-playground/validator"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       uint   `json:"id" gorm:"primaryKey"`
	Email    string `json:"email" gorm:"unique;not null" validate:"email"`
	Password string `json:"-"`
	Name     string `json:"name"`
	Dob      string `json:"dob"`
	Gender   string `json:"gender"`
}
type Gender string

const (
	Male     Gender = "male"
	Female   Gender = "female"
	intersex Gender = "intersex"
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
