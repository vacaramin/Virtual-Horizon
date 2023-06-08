package initializers

import (
	"Virtual-Horizon/models"
	"log"
)

func SyncDatabase() {
	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("sync Database failed", err)
	}
}
