package routes

import (
	"Virtual-Horizon/src/quiz/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, controller controllers.QuizFunctions) {
	quizRoutes := r.Group("quiz")
	quizRoutes.GET("getquiz", controller.GetQuiz)
	quizRoutes.POST("quiz", controller.AddQuiz)
	quizRoutes.DELETE("quiz", controller.GetQuiz)

}
