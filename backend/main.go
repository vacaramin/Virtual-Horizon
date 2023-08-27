package main

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/routes"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}
func main() {
	r := gin.Default()
	routes.SetupRoutes(r) // Call the function to set up routes
	if err := r.Run(os.Getenv("PORT")); err != nil {
		log.Fatal("Error Running Server")
	}

}
