package models

import (
	"Virtual-Horizon/src/user/models"
	"time"
)

type Tutor struct {
	models.User
	Subject    string    `json:"subject"`
	Experience string    `json:"experience"`
	Rating     string    `json:"rating"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
