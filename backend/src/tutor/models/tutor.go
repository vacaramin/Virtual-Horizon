package models

import (
	"Virtual-Horizon/src/user/models"
	"time"
)

type Tutor struct {
	ID         uint        `gorm:"primarykey"`
	Subject    string      `json:"subject"`
	Experience string      `json:"experience"`
	Rating     string      `json:"rating"`
	CreatedAt  time.Time   `json:"created_at"`
	UpdatedAt  time.Time   `json:"updated_at"`
	User       models.User `json:"user" gorm:"foreignKey:ID"`
}
