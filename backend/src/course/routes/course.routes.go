package routes

import (
	"Virtual-Horizon/src/course/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(engine *gin.Engine) {
	courseRouter := engine.Group("/courses")
	courseRouter.POST("/getTutorCourses", controllers.GetTutorRegisteredCourses)
	courseRouter.POST("/getStudentCourses", controllers.GetStudentCourses)

}
