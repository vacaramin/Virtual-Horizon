package main

import (
	"Virtual-Horizon/initializers"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
}
func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
			"email":   "awais@gmail.com",
		})
	})
	// listen and serve on
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "My Web Page",
			"body":  "<h1>Hello World</h1>",
		})
	})
	r.Run()
	fmt.Println("Hello, world!")
}
