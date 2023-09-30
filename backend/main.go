package main

import (
	"Virtual-Horizon/docs"
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/routes"
	"net/http"

	"log"
	"os"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"     // swagger embed files
	ginSwagger "github.com/swaggo/gin-swagger" // gin-swagger middleware
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}
func main() {
	r := gin.Default()
	docs.SwaggerInfo.BasePath = "/"
	v1 := r.Group("/")
	{
		eg := v1.Group("/example")
		{
			eg.GET("/helloworld", Helloworld)
		}
	}
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	routes.SetupRoutes(r) // Call the function to set up routes

	if err := r.Run(os.Getenv("PORT")); err != nil {
		log.Fatal("Error Running Server")
	}

}

// @BasePath /

// PingExample godoc
// @Summary ping example
// @Schemes
// @Description do ping
// @Tags example
// @Accept json
// @Produce json
// @Success 200 {string} Helloworld
// @Router /example/helloworld [get]
func Helloworld(g *gin.Context) {
	g.JSON(http.StatusOK, "helloworld")
}
