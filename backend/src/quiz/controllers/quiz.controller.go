package controllers

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/src/quiz/models"
	"Virtual-Horizon/src/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type QuizController struct{}

type QuizFunctions interface {
	GetQuiz(*gin.Context)
}

func (*QuizController) GetQuiz(ctx *gin.Context) {
	// Finding User From Token Pretty much useless just for authorization
	_, err := utils.GetUserFromToken(ctx)
	if err != nil {
		log.Println(err)
	}

	var Body struct {
		Subject *int
	}
	requestBody, _ := ctx.GetRawData()
	log.Println("Raw Request Body:", string(requestBody))

	if ctx.Bind(&Body) != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "failed",
			"error":  "Invalid request body",
		})
		return
	}

	var Quiz models.Quizzes
	log.Println("Body Subject", Body.Subject)
	log.Println("Executing query for course_id:", Body.Subject)
	result := initializers.DB.Where("course_id = ?", Body.Subject).Find(&Quiz)
	log.Println("Query executed:", result.Dialector.Explain(result.Statement.SQL.String(), result.Statement.Vars...))

	if result.Error != nil {
		log.Println(result.Error)
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": "Success",
		"Quiz":   Quiz,
	})
}
