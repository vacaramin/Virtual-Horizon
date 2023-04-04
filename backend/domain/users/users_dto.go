package users

import (
	"Virtual-Horizon/backend/utils/errors"
	"strings"
)

type User struct {
	ID        int64  `json:"ID"`
	FirstName string `json:"first-name"`
	LastName  string `json:"last-name"`
	Password  string `json:"password"`
	Email     string `json:"email"`
}

func (user *User) Validate() *errors.RestErr {
	user.FirstName = strings.TrimSpace(user.FirstName)
	user.LastName = strings.TrimSpace(user.LastName)
	user.Email = strings.TrimSpace(user.Email)
	if user.Email == "" {
		return errors.NewBadRequestError("Invalid Email Address")
	}
	user.Password = strings.TrimSpace(user.Password)
	if user.Password == "" {
		return errors.NewBadRequestError("Invalid Password")
	}
	return nil
}
