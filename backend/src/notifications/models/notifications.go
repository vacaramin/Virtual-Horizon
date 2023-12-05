package models

import (
	"Virtual-Horizon/src/user/models"
	"time"
)

type Notification struct {
	ID        uint        `json:"enrollment_id"`
	User_ID   uint        `json:"user_id"`
	Message   string      `json:"status"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
	User      models.User `json:"-" gorm:"foreignKey:user_id"`
}

type Notifications []Notification
