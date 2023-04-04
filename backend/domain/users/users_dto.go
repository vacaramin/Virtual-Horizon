package users

type User struct {
	ID        int64  `json:"ID"`
	FirstName string `json:"first-name"`
	LastName  string `json:"last-name"`
	Password  string `json:"password"`
	Email     string `json:"email"`
}
