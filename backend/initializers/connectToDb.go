package initializers

import (
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDb() {
	var err error
	dsn := os.Getenv("DB")

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
}
