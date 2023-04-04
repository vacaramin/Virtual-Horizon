package services

import (
	"Virtual-Horizon/backend/domain/users"
	"Virtual-Horizon/backend/utils/errors"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(user users.User) (*users.User, *errors.RestErr) {
	if err := user.Validate(); err != nil {
		return nil, err
	}
	// encrypt the Password
	pwSlice, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		return nil, errors.NewBadRequestError("failed to encrypt password")
	}
	user.Password = string(pwSlice[:])
	user.Save()
}
