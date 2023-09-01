package models

type User struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Dob      string `json:"dob"`
	Gender   string `json:"gender"`
}
