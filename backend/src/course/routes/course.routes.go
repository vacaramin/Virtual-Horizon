package routes

import (
	"Virtual-Horizon/src/course/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(engine *gin.Engine, controller controllers.CourseFunctions) {
	courseRouter := engine.Group("/courses")
	courseRouter.POST("/getTutorCourses", controller.GetTutorRegisteredCourses)
	courseRouter.POST("/getStudentCourses", controller.GetStudentCourses)
}
