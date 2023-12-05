package models

import (
	"time"
)

type Notification struct {
	ID        uint      `json:"-"`
	User_ID   uint      `json:"-"`
	Message   string    `json:"message"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Notifications []Notification
