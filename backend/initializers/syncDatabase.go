package initializers

import (
	"Virtual-Horizon/src/user/models"
	"log"
)

func SyncDatabase() {
	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("sync Database failed", err)
	}
}
