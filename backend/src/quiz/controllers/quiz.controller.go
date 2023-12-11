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

	var body struct {
		subject int
	}
	if ctx.Bind(&body) != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "failed",
			"error":  "Invalid request body",
		})
		return
	}

	var Quiz models.Quiz

	result := initializers.DB.
		Where("id = ?", body.subject).
		Find(&Quiz)

	if result.Error != nil {
		log.Println(result.Error)
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": "Success",
		"Quiz":   Quiz,
	})
}
