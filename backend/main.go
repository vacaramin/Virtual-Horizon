package main

import (
	"Virtual-Horizon/controllers"
	"Virtual-Horizon/initializers"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}
func main() {
	r := gin.Default()
	//setting routes here
	r.GET("/ping", pong)

	// listen and serve on
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "My Web Page",
			"body":  "<h1>Hello World</h1>",
		})
	})
	r.POST("/signup", controllers.Signup)
	r.Run()
	fmt.Println("Hello, world!")
}

func pong(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
